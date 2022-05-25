import { groupParams } from '../constants/fixedParams';
import * as Tone from 'tone'; //maybe only import individual methods

const pickAnimation = (playPad, prevPlayPad, group, groupParams) => {
  const measureInSeconds = Tone.Time(groupParams[group].measure).toSeconds();
  const transportPositionRemainder = Tone.Transport.seconds % measureInSeconds;
  const animationSeconds = measureInSeconds - transportPositionRemainder;

  if (playPad === false && prevPlayPad === false) return { animation: ``, background: `` };
  if (playPad === true && prevPlayPad === true) return { animation: ``, background: `${groupParams[group].color}` };
  if (playPad === true && prevPlayPad === false)
    return { animation: `${group}StartAnim ${animationSeconds}s`, background: `${groupParams[group].color}` };
  if (playPad === false && prevPlayPad === true)
    return { animation: `${group}StopAnim ${animationSeconds}s`, background: `` };
};

const Pad = ({ playLoop, id, group, playPad, prevPlayPad }) => {
  const { animation, background } = pickAnimation(playPad, prevPlayPad, group, groupParams);

  return (
    <button className="pad" onClick={() => playLoop(group, id, groupParams)} style={{ animation, background }}>
      <div className={playPad ? 'square' : 'triangle'} />
    </button>
  );
};

export default Pad;
