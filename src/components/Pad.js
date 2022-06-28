import { Transport, Time } from 'tone';

const pickAnimation = (activePad, queuedPad, group, color) => {
  const measureInSeconds = Time(Transport.seconds === 0 ? 0 : '2m').toSeconds(); //2m is a fixed measure controlling animation length.
  const transportPositionRemainder = Transport.seconds % measureInSeconds;
  const animationSeconds = measureInSeconds - transportPositionRemainder;
  const padStates = `${JSON.stringify(activePad)} ${JSON.stringify(queuedPad)}`;

  switch (padStates) {
    case 'false false':
      return { animation: ``, background: `` };
    case 'true true':
      return { animation: ``, background: `${color}` };
    case 'true false':
      return { animation: `${group}StartAnim ${animationSeconds}s`, background: `${color}` };
    case 'false true':
      return { animation: `${group}StopAnim ${animationSeconds}s`, background: `` };
    default:
      return;
  }
};

const Pad = ({ handlePadClick, id, group, activePad, queuedPad, color }) => {
  const { animation, background } = pickAnimation(activePad, queuedPad, group, color);

  return (
    <button className="pad" onClick={() => handlePadClick(group, id)} style={{ animation, background }}>
      <div className={activePad ? 'square' : 'triangle'} />
    </button>
  );
};

export default Pad;
