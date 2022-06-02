// const ctx = new (window.AudioContext || window.webkitAudioContext)();
import InstrumentGroup from './InstrumentGroup';
import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone'; //maybe only import individual methods
import { BPM, numOfPads, groupParams, tick } from '../constants/fixedParams';

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
  const initialState = {
    drums: [false, false, false, false],
    bass: [false, false, false, false],
    melody: [false, false, false, false],
    chords: [false, false, false, false],
  };

  const [activeLoops, setActiveLoops] = useState({ ...initialState });
  const activeLoopsRef = useRef({ ...initialState });
  const [queuedLoops, setQueuedLoops] = useState({ ...initialState });
  const queuedLoopsRef = useRef({ ...initialState });
  const [transportIsRunning, setTransportIsRunning] = useState(false);

  const Ticker = new Tone.Loop((time) => {
    switchLoops(queuedLoopsRef.current, activeLoopsRef.current, loops, time);

    setActiveLoops({ ...queuedLoopsRef.current });
    activeLoopsRef.current = { ...queuedLoopsRef.current };

    const { drums, bass, chords, melody } = queuedLoopsRef.current;
    setTransportIsRunning([...drums, ...bass, ...chords, ...melody].some((isLoopScheduled) => isLoopScheduled));
  }, tick);

  useEffect(() => {
    transportIsRunning ? Tone.Transport.start() : (Tone.Transport.stop().position = 0);
  }, [transportIsRunning]);

  const playLoop = (group, id, groupParams) => {
    Tone.Transport.state !== 'started' && Tone.start(); //Abstract with something
    Tone.Transport.state !== 'started' && Ticker.start();
    Tone.Transport.state !== 'started' && Tone.Transport.start(); //abstract with useEffect check

    const updatedGroup = [false, false, false, false];
    updatedGroup[id] = !queuedLoops[group][id];
    setQueuedLoops({ ...queuedLoops, [group]: updatedGroup });
    queuedLoopsRef.current = { ...queuedLoops, [group]: updatedGroup };

    // const trackPlaying = play[group].indexOf(true);
    // trackPlaying !== -1 && stopLoop(loops, trackPlaying, group, groupParams[group].measure);
    // setPrevPlay({ ...play });
    // const updatedGroup = [false, false, false, false];
    // updatedGroup[id] = !play[group][id];
    // const updatedPlay = { ...play, [group]: updatedGroup };
    // setPlay(updatedPlay);
    // const { drums, bass, chords, melody } = updatedPlay;
    // setTransportIsRunning([...drums, ...bass, ...chords, ...melody].some((e) => e));
    // const startMeasure = transportIsRunning ? groupParams[group].measure : 0;
    // trackPlaying !== id && startLoop(loops, id, group, startMeasure);
  };

  return (
    <main className="appContainer">
      <div className="sequencerBox">
        {Object.keys(initialState).map((group, index) => (
          <InstrumentGroup
            key={index}
            group={group}
            playLoop={playLoop}
            prevPlayGroup={queuedLoopsRef.current[group]}
            playGroup={activeLoops[group]}
          />
        ))}
      </div>
      {/* clean these when done */}
      <div>{JSON.stringify(queuedLoops)}</div>
      <div>{JSON.stringify(activeLoops)}</div>
      <br />
      <div>{`isplaying: ${transportIsRunning}`}</div>
    </main>
  );
};

export default Sequencer;
