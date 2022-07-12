import { useState, useRef, useEffect } from 'react';
import { FFT, Analyser } from 'tone';

const fft = new FFT(16);

const FFTviz = ({ players }) => {
  players.forEach((player) => player.fan(fft));
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    draw();
  }, []);

  const draw = () => {
    requestAnimationFrame(draw);
    const fftVals = fft.getValue();
    const ctxr = ctxRef.current;

    ctxr.clearRect(0, 0, 500, 500);

    const dots = [];
    // const dots2 = [];
    for (let i = 0; i < 6; i++) dots.push(fftVals[i]);
    // for (let i = 8; i > 0; i--) dots2.push(fftVals[i]);
    // const dots2 = [...dots];
    // dots2.reverse();
    // const dotsFinal = dots2.concat(dots);
    const dots2 = [...dots].reverse();
    const dotsFinal = [];
    for (let i = 0; i < 6; i++) {
      dotsFinal.push(dots[i]);
      dotsFinal.push(dots2[i]);
    }

    const c = () => canvasRef.current.getBoundingClientRect().width / 16;
    let p = c();
    const connections = 12;
    for (let i = 0; i < connections; i++) {
      let prep = p;
      // i % 2 === 0 ? (ctxr.fillStyle = 'green') : (ctxr.fillStyle = 'purple');
      // const up = Math.log(fftVals[i] * -1) * 20;
      // const up = i%2===0?
      // ctxr.fillRect(0, fftVals[i] * -1, p, 500);
      ctxr.lineWidth = 2;
      ctxr.beginPath();
      ctxr.strokeStyle = 'white';
      ctxr.moveTo(p, 80);
      if (i + 1 !== connections) {
        ctxr.lineTo(prep + c() / 2, dotsFinal[i] * -1);
        ctxr.lineTo(prep + c(), 80);
      }
      ctxr.stroke();
      p += c();
    }
  };

  const click = () => {
    const fftVals = fft.getValue();
    // console.log(canvasRef.current.getBoundingClientRect().width);
    console.log(fftVals);

    // draw();
  };

  return (
    <div className="contentBox">
      {/* <button onClick={() => click()}>click</button> */}
      <canvas ref={canvasRef} className="fft" />
    </div>
  );
};

export default FFTviz;
