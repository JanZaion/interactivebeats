import { useState } from 'react';

const Pad = (props) => {
  const [play, setPlay] = useState(false);
  const { player, id, group } = props;

  return (
    <button
      className="pad"
      onClick={() => {
        const thisPadState = player(group, id);
        setPlay(thisPadState);
      }}
    >
      <div className={play ? 'square' : 'triangle'} />
    </button>
  );
};

export default Pad;
