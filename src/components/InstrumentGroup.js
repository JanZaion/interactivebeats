import Pad from './Pad';

const InstrumentGroup = ({ group, groupName, handlePadClick, queuedLoopsGroup, activeLoopsGroup, color }) => {
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
          color={color}
        />
      ))}
    </div>
  );
};

export default InstrumentGroup;
