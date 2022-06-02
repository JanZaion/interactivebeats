import InstrumentGroup from './InstrumentGroup';
import { useState, useRef } from 'react';
import { BPM, tick } from '../constants/fixedParams';
import { loops } from '../constants/loopsMetadata';
import * as Tone from 'tone';
const { Loop, Transport } = Tone;

Transport.bpm.value = BPM;

const switchLoops = (queuedLoops, activeLoops, loops, time) => {
  Object.keys(queuedLoops).forEach((group) => {
    const queudLoopsGroup = queuedLoops[group];
    const activeLoopsGroup = activeLoops[group];
    if (JSON.stringify(queudLoopsGroup) === JSON.stringify(activeLoopsGroup)) return;

    const stopLoopID = activeLoopsGroup.indexOf(true);
    stopLoopID !== -1 && loops[group][stopLoopID].stop();

    const startLoopID = queudLoopsGroup.indexOf(true);
    startLoopID !== -1 && loops[group][startLoopID].start(time);
  });
};

const Sequencer = () => {
  const playPadsOnInit = {
    drums: [false, false, false, false],
    bass: [false, false, false, false],
    melody: [false, false, false, false],
    chords: [false, false, false, false],
  };

  const [activeLoops, setActiveLoops] = useState({ ...playPadsOnInit });
  const activeLoopsRef = useRef({ ...playPadsOnInit });
  const [queuedLoops, setQueuedLoops] = useState({ ...playPadsOnInit });
  const queuedLoopsRef = useRef({ ...playPadsOnInit });

  const Clock = new Loop((time) => {
    const qls = queuedLoopsRef.current;
    switchLoops(qls, activeLoopsRef.current, loops, time);

    setActiveLoops({ ...qls });
    activeLoopsRef.current = { ...qls };

    const willTransportStop = ![...qls.drums, ...qls.bass, ...qls.chords, ...qls.melody].some((isQued) => isQued);
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
    <main className="appContainer">
      <div className="sequencerBox">
        {Object.keys(playPadsOnInit).map((group, index) => (
          <InstrumentGroup
            key={index}
            group={group}
            handlePadClick={handlePadClick}
            queuedLoopsGroup={queuedLoopsRef.current[group]}
            activeLoopsGroup={activeLoops[group]}
          />
        ))}
      </div>
    </main>
  );
};

export default Sequencer;
