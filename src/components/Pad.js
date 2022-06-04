import { groupParams } from '../constants/fixedParams';
import { Transport, Time } from 'tone';

const pickAnimation = (activePad, queuedPad, group, groupParams) => {
  const measureInSeconds = Time(Transport.seconds === 0 ? 0 : groupParams[group].measure).toSeconds();
  const transportPositionRemainder = Transport.seconds % measureInSeconds;
  const animationSeconds = measureInSeconds - transportPositionRemainder;

  if (activePad === false && queuedPad === false) return { animation: ``, background: `` };
  if (activePad === true && queuedPad === true) return { animation: ``, background: `${groupParams[group].color}` };
  if (activePad === true && queuedPad === false)
    return { animation: `${group}StartAnim ${animationSeconds}s`, background: `${groupParams[group].color}` };
  if (activePad === false && queuedPad === true)
    return { animation: `${group}StopAnim ${animationSeconds}s`, background: `` };
};

const Pad = ({ handlePadClick, id, group, activePad, queuedPad }) => {
  const { animation, background } = pickAnimation(activePad, queuedPad, group, groupParams);

  return (
    <button className="pad" onClick={() => handlePadClick(group, id)} style={{ animation, background }}>
      <div className={activePad ? 'square' : 'triangle'} />
    </button>
  );
};

export default Pad;
