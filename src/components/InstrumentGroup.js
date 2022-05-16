import Pad from './Pad';

const InstrumentGroup = (props) => {
  const { group, player } = props;
  const ids = [0, 1, 2, 3];

  return (
    <div className="instrumentGroup">
      <div className="instrumentGroupName">{group}</div>
      {/* <Pad player={player} id={0} group={group} />
      <Pad player={player} id={1} group={group} />
      <Pad player={player} id={2} group={group} />
      <Pad player={player} id={3} group={group} /> */}
      {Object.keys(ids).map((id) => (
        <Pad key={id} id={id} group={group} player={player} />
      ))}
    </div>
  );
};

export default InstrumentGroup;
