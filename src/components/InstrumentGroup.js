import Pad from './Pad';

const InstrumentGroup = ({ group, groupName, handlePadClick, queuedLoopsGroup, activeLoopsGroup }) => {
  return (
    <div className="instrumentGroup">
      <div className="instrumentGroupName">{groupName}</div>
      {activeLoopsGroup.map((play, index) => (
        <Pad
          key={index}
          id={index}
          group={group}
          handlePadClick={handlePadClick}
          activePad={play}
          queuedPad={queuedLoopsGroup[index]}
        />
      ))}
    </div>
  );
};

export default InstrumentGroup;
