import Pad from './Pad';

const InstrumentGroup = ({ group, player, groupStates }) => {
  return (
    <div className="instrumentGroup">
      <div className="instrumentGroupName">{group}</div>
      {groupStates.map((state, index) => (
        <Pad key={index} id={index} group={group} player={player} toggle={state} />
      ))}
    </div>
  );
};

export default InstrumentGroup;
