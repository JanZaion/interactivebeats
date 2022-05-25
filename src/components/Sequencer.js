import InstrumentGroup from './InstrumentGroup';
import { useState, useEffect } from 'react';
import * as Tone from 'tone'; //maybe only import individual methods
import { BPM, numOfPads, groupParams } from '../constants/fixedParams';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

const createLoops = (group, numOfPads, measure) => {
  return numOfPads.map(
    (id) =>
      new Tone.Loop(() => {
        console.log(group, id);
      }, measure)
  );
};

//refac to make programmaticaly
const loops = {
  drums: createLoops('drums', [...numOfPads], groupParams.drums.measure),
  bass: createLoops('bass', [...numOfPads], groupParams.bass.measure),
  melody: createLoops('melody', [...numOfPads], groupParams.melody.measure),
  chords: createLoops('chords', [...numOfPads], groupParams.chords.measure),
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

  const player = (group, id, groupParams) => {
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

    trackPlaying !== id && startLoop(loops, id, group, groupParams[group].measure);
  };

  return (
    <main className="appContainer">
      <div className="sequencerBox">
        {Object.keys(initialPlay).map((group, index) => (
          <InstrumentGroup
            key={index}
            group={group}
            player={player}
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
