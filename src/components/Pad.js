import { groupParams } from '../constants/fixedParams';
import { Transport, Time } from 'tone';

const pickAnimation = (activePad, queuedPad, group, groupParams) => {
  const measureInSeconds = Time(Transport.seconds === 0 ? 0 : groupParams[group].measure).toSeconds();
  const transportPositionRemainder = Transport.seconds % measureInSeconds;
  const animationSeconds = measureInSeconds - transportPositionRemainder;
  const padStates = `${JSON.stringify(activePad)} ${JSON.stringify(queuedPad)}`;

  switch (padStates) {
    case 'false false':
      return { animation: ``, background: `` };
    case 'true true':
      return { animation: ``, background: `${groupParams[group].color}` };
    case 'true false':
      return { animation: `${group}StartAnim ${animationSeconds}s`, background: `${groupParams[group].color}` };
    case 'false true':
      return { animation: `${group}StopAnim ${animationSeconds}s`, background: `` };
    default:
      return;
  }
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
