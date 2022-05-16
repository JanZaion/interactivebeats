import Pad from './Pad';

const InstrumentGroup = (props) => {
  const { group } = props;

  return (
    <div className="instrumentGroup">
      <div className="instrumentGroupName">{group}</div>
      <Pad />
      <Pad />
      <Pad />
      <Pad />
    </div>
  );
};

export default InstrumentGroup;
