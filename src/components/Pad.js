import { groupParams } from '../constants/fixedParams';
import * as Tone from 'tone'; //maybe only import individual methods

const pickAnimation = (playPad, prevPlayPad, group, groupParams) => {
  const animationTime = '1s';
  if (playPad === false && prevPlayPad === false) return { animation: ``, background: `` };
  if (playPad === true && prevPlayPad === true) return { animation: ``, background: `${groupParams[group].color}` };
  if (playPad === true && prevPlayPad === false)
    return { animation: `${group}StartAnim ${animationTime}`, background: `${groupParams[group].color}` };
  if (playPad === false && prevPlayPad === true)
    return { animation: `${group}StopAnim ${animationTime}`, background: `` };
};

const Pad = ({ player, id, group, playPad, prevPlayPad }) => {
  const { animation, background } = pickAnimation(playPad, prevPlayPad, group, groupParams);

  return (
    <button className="pad" onClick={() => player(group, id, groupParams)} style={{ animation, background }}>
      <div className={playPad ? 'square' : 'triangle'} />
    </button>
  );
};

export default Pad;
