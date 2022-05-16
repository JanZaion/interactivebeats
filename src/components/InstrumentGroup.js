import Pad from './Pad';

const InstrumentGroup = (props) => {
  const { group, player } = props;

  return (
    <div className="instrumentGroup">
      <div className="instrumentGroupName">{group}</div>
      <Pad player={player} id={0} group={group} />
      <Pad player={player} id={1} group={group} />
      <Pad player={player} id={2} group={group} />
      <Pad player={player} id={3} group={group} />
    </div>
  );
};

export default InstrumentGroup;
