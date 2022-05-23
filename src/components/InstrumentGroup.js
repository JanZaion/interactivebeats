import Pad from './Pad';

const InstrumentGroup = ({ group, player, prevPlayGroup, playGroup }) => {
  return (
    <div className="instrumentGroup">
      <div className="instrumentGroupName">{group}</div>
      {playGroup.map((state, index) => (
        <Pad key={index} id={index} group={group} player={player} playPad={state} prevPlayPad={prevPlayGroup[index]} />
      ))}
    </div>
  );
};

export default InstrumentGroup;
