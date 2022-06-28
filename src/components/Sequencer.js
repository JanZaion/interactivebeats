import InstrumentGroup from './InstrumentGroup';
import { useState, useRef } from 'react';
import * as Tone from 'tone';
const { Loop, Transport } = Tone;

const switchAudioLoops = (queuedLoops, activeLoops, loops, time) => {
  Object.keys(queuedLoops).forEach((group) => {
    const queudLoopsGroup = queuedLoops[group];
    const activeLoopsGroup = activeLoops[group];
    if (JSON.stringify(queudLoopsGroup) === JSON.stringify(activeLoopsGroup)) return;

    const stopLoopID = activeLoopsGroup.indexOf(true);
    stopLoopID !== -1 && loops[group][stopLoopID].stop(time);

    const startLoopID = queudLoopsGroup.indexOf(true);
    startLoopID !== -1 && loops[group][startLoopID].start(time);
  });
};

const Sequencer = ({ BPM, tick, groupParams, loops }) => {
  const playPadsOnInit = {
    group1: [false, false, false, false],
    group2: [false, false, false, false],
    group3: [false, false, false, false],
    group4: [false, false, false, false],
  };

  Transport.bpm.value = BPM;

  const [activeLoops, setActiveLoops] = useState({ ...playPadsOnInit });
  const activeLoopsRef = useRef({ ...playPadsOnInit });
  const [queuedLoops, setQueuedLoops] = useState({ ...playPadsOnInit });
  const queuedLoopsRef = useRef({ ...playPadsOnInit });

  const Clock = new Loop((time) => {
    const qls = queuedLoopsRef.current;
    switchAudioLoops(qls, activeLoopsRef.current, loops, time);

    setActiveLoops({ ...qls });
    activeLoopsRef.current = { ...qls };

    const willTransportStop = ![...qls.group1, ...qls.group2, ...qls.group3, ...qls.group4].some((isQued) => isQued);
    if (willTransportStop) Transport.stop().position = 0;
  }, tick);

  const startOnFirstClick = () => {
    if (Transport.state === 'started') return;
    Tone.start();
    Clock.start();
    Transport.start();
  };

  const queLoopsOnClick = (group, id) => {
    const updatedGroup = [false, false, false, false];
    updatedGroup[id] = !queuedLoops[group][id];
    setQueuedLoops({ ...queuedLoops, [group]: updatedGroup });
    queuedLoopsRef.current = { ...queuedLoops, [group]: updatedGroup };
  };

  const handlePadClick = (group, id) => {
    startOnFirstClick();
    queLoopsOnClick(group, id);
  };

  return (
    <div className="sequencerBox">
      {Object.keys(playPadsOnInit).map((group, index) => (
        <InstrumentGroup
          key={index}
          group={group}
          groupName={groupParams[group].name}
          color={groupParams[group].color}
          handlePadClick={handlePadClick}
          queuedLoopsGroup={queuedLoopsRef.current[group]}
          activeLoopsGroup={activeLoops[group]}
        />
      ))}
    </div>
  );
};

export default Sequencer;
