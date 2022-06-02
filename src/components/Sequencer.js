import InstrumentGroup from './InstrumentGroup';
import { useState, useRef } from 'react';
import * as Tone from 'tone'; //maybe only import individual methods

import { BPM, tick } from '../constants/fixedParams';

import drums_1 from '../tracks/drums_1.mp3';
import drums_2 from '../tracks/drums_2.mp3';
import drums_3 from '../tracks/drums_3.mp3';
import drums_4 from '../tracks/drums_4.mp3';
import bass_1 from '../tracks/bass_1.mp3';
import bass_2 from '../tracks/bass_2.mp3';
import bass_3 from '../tracks/bass_3.mp3';
import bass_4 from '../tracks/bass_4.mp3';
import melody_1 from '../tracks/melody_1.mp3';
import melody_2 from '../tracks/melody_2.mp3';
import melody_3 from '../tracks/melody_3.mp3';
import melody_4 from '../tracks/melody_4.mp3';
import chords_1 from '../tracks/chords_1.mp3';
import chords_2 from '../tracks/chords_2.mp3';
import chords_3 from '../tracks/chords_3.mp3';
import chords_4 from '../tracks/chords_4.mp3';

const makeLoops = (tracks) => {
  const loops = tracks.map((track) => {
    const loop = new Tone.Player(track).toDestination();
    loop.loop = true;
    return loop;
  });

  return loops;
};

const loops = {
  drums: makeLoops([drums_1, drums_2, drums_3, drums_4]),
  bass: makeLoops([bass_1, bass_2, bass_3, bass_4]),
  melody: makeLoops([melody_1, melody_2, melody_3, melody_4]),
  chords: makeLoops([chords_1, chords_2, chords_3, chords_4]),
};

//This should stay here, the stuff above should be moved to a different file
Tone.Transport.bpm.value = BPM;

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

  const Ticker = new Tone.Loop((time) => {
    const qls = queuedLoopsRef.current;
    switchLoops(qls, activeLoopsRef.current, loops, time);

    setActiveLoops({ ...qls });
    activeLoopsRef.current = { ...qls };

    const willTransportStop = ![...qls.drums, ...qls.bass, ...qls.chords, ...qls.melody].some((isQued) => isQued);
    if (willTransportStop) Tone.Transport.stop().position = 0;
  }, tick);

  const startOnFirstClick = () => {
    if (Tone.Transport.state === 'started') return;
    Tone.start();
    Ticker.start();
    Tone.Transport.start();
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
      {/* clean these when done */}
      <div>{JSON.stringify(queuedLoops)}</div>
      <div>{JSON.stringify(activeLoops)}</div>
    </main>
  );
};

export default Sequencer;
