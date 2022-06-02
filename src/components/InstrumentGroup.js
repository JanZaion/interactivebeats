import Pad from './Pad';

const InstrumentGroup = ({ group, handlePadClick, queuedLoopsGroup, activeLoopsGroup }) => {
  return (
    <div className="instrumentGroup">
      <div className="instrumentGroupName">{group}</div>
      {activeLoopsGroup.map((play, index) => (
        <Pad
          key={index}
          id={index}
          group={group}
          handlePadClick={handlePadClick}
          playPad={play}
          prevPlayPad={queuedLoopsGroup[index]}
        />
      ))}
    </div>
  );
};

export default InstrumentGroup;
