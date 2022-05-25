import Pad from './Pad';

const InstrumentGroup = ({ group, playLoop, prevPlayGroup, playGroup }) => {
  return (
    <div className="instrumentGroup">
      <div className="instrumentGroupName">{group}</div>
      {playGroup.map((state, index) => (
        <Pad
          key={index}
          id={index}
          group={group}
          playLoop={playLoop}
          playPad={state}
          prevPlayPad={prevPlayGroup[index]}
        />
      ))}
    </div>
  );
};

export default InstrumentGroup;
