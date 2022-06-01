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

/*how to solve shit sounding looping?
Tone.Transport.scheduleRepeat((time) => Player.start(time).stop(time + 4), 4);
*/

const drumTracks = [
  new Tone.Player(drums_1).toDestination(),
  new Tone.Player(drums_2).toDestination(),
  new Tone.Player(drums_3).toDestination(),
  new Tone.Player(drums_4).toDestination(),
];

const melodyTracks = [
  new Tone.Player(melody_1).toDestination(),
  new Tone.Player(melody_2).toDestination(),
  new Tone.Player(melody_3).toDestination(),
  new Tone.Player(melody_4).toDestination(),
];

const chordTracks = [
  new Tone.Player(chords_1).toDestination(),
  new Tone.Player(chords_2).toDestination(),
  new Tone.Player(chords_3).toDestination(),
  new Tone.Player(chords_4).toDestination(),
];

const bassTracks = [
  new Tone.Player(bass_1).toDestination(),
  new Tone.Player(bass_2).toDestination(),
  new Tone.Player(bass_3).toDestination(),
  new Tone.Player(bass_4).toDestination(),
];

const createLoops = (numOfPads, players, measure) =>
  numOfPads.map((p) => new Tone.Loop((time) => players[p].start(time), measure));

//refac to make programmaticaly
const loops = {
  drums: createLoops(numOfPads, drumTracks, groupParams.drums.measure),
  bass: createLoops(numOfPads, bassTracks, groupParams.bass.measure),
  melody: createLoops(numOfPads, melodyTracks, groupParams.melody.measure),
  chords: createLoops(numOfPads, chordTracks, groupParams.chords.measure),
};

const startLoop = (loops, id, group, startMeasure) => loops[group][id].start(startMeasure);

const stopLoop = (loops, id, group) => loops[group][id].cancel();

const switchLoops = (queuedLoops, activeLoops, loops, group) => {
  if (JSON.stringify(queuedLoops) === JSON.stringify(activeLoops)) return;

  const stopLoopID = activeLoops.indexOf(true);
  stopLoopID !== -1 && loops[group][stopLoopID].stop();

  const startLoopID = queuedLoops.indexOf(true);
  startLoopID !== -1 && loops[group][startLoopID].start();
  //stop loop
  //stop player on time
  //start new loop
};

//This should stay here, the stuff above should be moved to a different file
Tone.Transport.bpm.value = BPM;

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

  const Ticker = new Tone.Loop(() => {
    for (const group of Object.keys(queuedLoopsRef.current))
      switchLoops(queuedLoopsRef.current[group], activeLoopsRef.current[group], loops, group);

    setActiveLoops({ ...queuedLoopsRef.current });
    activeLoopsRef.current = { ...queuedLoopsRef.current };

    //handle transport here, prly via ref and useffect again. Or maybe just stop it right away

    // console.log(queuedLoops.drums);
    // setCount((prevState) => prevState + 1);
  }, tick);

  // useEffect(() => {}, [activeLoops]);

  // useEffect(() => {
  //   transportIsRunning ? Tone.Transport.start() : (Tone.Transport.stop().position = 0);
  // }, [transportIsRunning]);

  const playLoop = (group, id, groupParams) => {
    Tone.start(); //Abstract with something
    Tone.Transport.state !== 'started' && Ticker.start();
    Tone.Transport.start(); //abstract with useEffect check

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
