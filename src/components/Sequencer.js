// const ctx = new (window.AudioContext || window.webkitAudioContext)();
import InstrumentGroup from './InstrumentGroup';
import { useState, useEffect } from 'react';
import * as Tone from 'tone'; //maybe only import individual methods
import { BPM, numOfPads, groupParams } from '../constants/fixedParams';

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
1) not by different looping methods, like player.loop
2) prly by making 2 loops follow each other, coz when switching it does not sound shitty
some errors about loops following each other and start time must be strictly greater or whatever. Look into it
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
  numOfPads.map((p, i) => new Tone.Loop(() => players[i].start(), measure));

//refac to make programmaticaly
const loops = {
  drums: createLoops(numOfPads, drumTracks, groupParams.drums.measure),
  bass: createLoops(numOfPads, bassTracks, groupParams.bass.measure),
  melody: createLoops(numOfPads, melodyTracks, groupParams.melody.measure),
  chords: createLoops(numOfPads, chordTracks, groupParams.chords.measure),
};

const startLoop = (loops, id, group, startMeasure) => loops[group][id].start(startMeasure);

const stopLoop = (loops, id, group, stopMeasure) => loops[group][id].stop(stopMeasure);

//This should stay here, the stuff above should be moved to a different file
Tone.Transport.bpm.value = BPM;

const Sequencer = () => {
  const initialPlay = {
    drums: [false, false, false, false],
    bass: [false, false, false, false],
    melody: [false, false, false, false],
    chords: [false, false, false, false],
  };

  const [play, setPlay] = useState({ ...initialPlay });
  const [prevPlay, setPrevPlay] = useState({ ...initialPlay });
  const [transportRunning, setTransportRunning] = useState(false);

  useEffect(() => {
    transportRunning ? Tone.Transport.start() : (Tone.Transport.stop().position = 0);
  }, [transportRunning]);

  const playLoop = (group, id, groupParams) => {
    Tone.start(); //ctx keeps saying suspended for some reason. Hopefuly not a problem
    const trackPlaying = play[group].indexOf(true);
    trackPlaying !== -1 && stopLoop(loops, trackPlaying, group, groupParams[group].measure);

    setPrevPlay({ ...play });
    const updatedGroup = [false, false, false, false];
    updatedGroup[id] = !play[group][id];
    const updatedPlay = { ...play, [group]: updatedGroup };
    setPlay(updatedPlay);

    //maybe SRP this
    const { drums, bass, chords, melody } = updatedPlay;
    setTransportRunning([...drums, ...bass, ...chords, ...melody].some((e) => e));

    //add start time eval here. If no other thing playing, then it should start right away, not after the measure
    trackPlaying !== id && startLoop(loops, id, group, groupParams[group].measure);
  };

  return (
    <main className="appContainer">
      <div className="sequencerBox">
        {Object.keys(initialPlay).map((group, index) => (
          <InstrumentGroup
            key={index}
            group={group}
            playLoop={playLoop}
            prevPlayGroup={prevPlay[group]}
            playGroup={play[group]}
          />
        ))}
      </div>
      {/* clean these when done */}
      <div>{JSON.stringify(play)}</div>
      <br />
      <div>{`isplaying: ${transportRunning}`}</div>
    </main>
  );
};

export default Sequencer;
