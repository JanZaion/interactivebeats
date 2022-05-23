import { groupParams } from '../constants/fixedParams';
import * as Tone from 'tone'; //maybe only import individual methods

const makeAnimation = (playPad, prevPlayPad, group) => {
  // if (playPad === prevPlayPad) return '';

  const animationName = `${group}Anim`;
  const animationTime = '1s';
  // const animationDirrection = playPad ? 'forwards' : 'backwards';
  let animationDirrection;
  if (playPad === true && prevPlayPad === false)
    return { animation: `${animationName} ${animationTime} forwards`, background: '' };
  if (playPad === false && prevPlayPad === true)
    return { animation: `${animationName} ${animationTime} forwards`, background: 'yellow' };
  if (playPad === prevPlayPad) return { animation: ``, background: '' };

  // return `${animationName} ${animationTime} ${animationDirrection}`;
};

const Pad = ({ player, id, group, playPad, prevPlayPad }) => {
  const { animation, background } = makeAnimation(playPad, prevPlayPad, group);

  return (
    <button className="pad" onClick={() => player(group, id, groupParams)} style={{ animation, background }}>
      <div className={playPad ? 'square' : 'triangle'} />
    </button>
  );
};

export default Pad;
