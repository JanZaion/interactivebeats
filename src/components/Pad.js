import { groupParams } from '../constants/fixedParams';
import { Transport, Time } from 'tone';

const pickAnimation = (playPad, prevPlayPad, group, groupParams) => {
  const measureInSeconds = Time(Transport.seconds === 0 ? 0 : groupParams[group].measure).toSeconds();
  const transportPositionRemainder = Transport.seconds % measureInSeconds;
  const animationSeconds = measureInSeconds - transportPositionRemainder;

  if (playPad === false && prevPlayPad === false) return { animation: ``, background: `` };
  if (playPad === true && prevPlayPad === true) return { animation: ``, background: `${groupParams[group].color}` };
  if (playPad === true && prevPlayPad === false)
    return { animation: `${group}StartAnim ${animationSeconds}s`, background: `${groupParams[group].color}` };
  if (playPad === false && prevPlayPad === true)
    return { animation: `${group}StopAnim ${animationSeconds}s`, background: `` };
};

const Pad = ({ handlePadClick, id, group, playPad, prevPlayPad }) => {
  const { animation, background } = pickAnimation(playPad, prevPlayPad, group, groupParams);

  return (
    <button className="pad" onClick={() => handlePadClick(group, id)} style={{ animation, background }}>
      <div className={playPad ? 'square' : 'triangle'} />
    </button>
  );
};

export default Pad;
