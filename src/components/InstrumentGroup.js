import Pad from './Pad';

const InstrumentGroup = (props) => {
  const { group, player, groupStates } = props;

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
