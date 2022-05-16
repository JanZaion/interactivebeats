import { useState } from 'react';

const Pad = () => {
  const [play, setPlay] = useState(false);
  //move this state to the top of the component hierarchy
  return (
    <button className="pad" onClick={() => setPlay(!play)}>
      <div className={play ? 'square' : 'triangle'} />
      <div />
    </button>
  );
};

export default Pad;
