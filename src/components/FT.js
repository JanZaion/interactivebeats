import { useState, useEffect } from 'react';
import { Player } from 'tone';

const FT = () => {
  const [fimg, setFimg] = useState();

  const bs = () => {
    fimg && fimg.dispose();
    setFimg(new Player(require('../tracks/bass_3.opus')).toDestination());
  };
  const ds = () => {
    fimg && fimg.dispose();
    setFimg(new Player(require('../tracks/drums_3.opus')).toDestination());
  };

  const play = () => {
    fimg.start();
  };

  return (
    <div>
      <button onClick={() => bs()}>bs</button>
      <button onClick={() => ds()}>ds</button>
      <button onClick={() => play()}>play</button>
      <img src={fimg} alt="asd" />
    </div>
  );
};

export default FT;
