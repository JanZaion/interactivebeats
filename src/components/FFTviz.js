import { useRef, useEffect } from 'react';
import { FFT, Transport } from 'tone';

const FFTcenter = 80;
const initialxOffset = 3;
const FFTlinesWidth = 2;
const FFTdensity = 16 * 2;
const fft = new FFT(FFTdensity);
const upperBound = 110;
const lowerBound = 70;

const FFTviz = ({ players }) => {
  players.forEach((player) => player.fan(fft));
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
    idleFFT();
  }, []); //eslint-disable-line

  useEffect(() => {
    Transport.state === 'stopped' && drawFFT();
  }, [Transport.state]); //eslint-disable-line

  const calculateXoffset = () => (canvasRef.current.offsetWidth + canvasRef.current.offsetWidth / 2) / FFTdensity;

  const idleFFT = () => {
    const ctxr = ctxRef.current;

    let xOffset = initialxOffset;
    for (let i = 0; i < FFTdensity; i++) {
      ctxr.lineWidth = FFTlinesWidth;
      ctxr.beginPath();
      ctxr.strokeStyle = 'white';
      ctxr.moveTo(xOffset, FFTcenter);
      ctxr.lineTo(xOffset, upperBound);
      ctxr.lineTo(xOffset, lowerBound);
      ctxr.stroke();
      xOffset += calculateXoffset();
    }
  };

  const drawFFT = () => {
    requestAnimationFrame(drawFFT);
    const fftVals = fft.getValue();
    const ctxr = ctxRef.current;

    ctxr.clearRect(0, 0, 1000, 1000);

    const lines = [];
    for (let i = FFTdensity / 8; i < FFTdensity; i++) lines.push(fftVals[i]);

    let xOffset = initialxOffset;
    for (let i = 0; i < FFTdensity; i++) {
      ctxr.lineWidth = FFTlinesWidth;
      ctxr.beginPath();
      ctxr.strokeStyle = 'white';
      ctxr.moveTo(xOffset, FFTcenter);
      const fftVal1 = lines[i] * -1;
      ctxr.lineTo(xOffset, fftVal1 > upperBound ? upperBound : fftVal1);
      const fftVal2 = lines[i] + 160;
      ctxr.lineTo(xOffset, fftVal2 < lowerBound ? lowerBound : fftVal2);
      ctxr.stroke();
      xOffset += calculateXoffset();
    }
  };

  return <div className="contentBox">{<canvas ref={canvasRef} className="fft" />}</div>;
};

export default FFTviz;
