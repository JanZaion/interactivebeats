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
    const cc = ctxRef.current;

    cc.clearRect(0, 0, 500, 500);

    let p = 0;
    for (let i = 0; i < 16; i++) {
      p += canvasRef.current.getBoundingClientRect().width / 16;
      cc.fillStyle = 'green';
      const up = fftVals[i] * -1 + i * 2;
      cc.fillRect(0, up, p, 100);
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
      <button onClick={() => click()}>click</button>
      <canvas ref={canvasRef} className="fft" />
    </div>
  );
};

export default FFTviz;
