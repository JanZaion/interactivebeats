import InstrumentGroup from './InstrumentGroup';
import { useState, useEffect } from 'react';
import * as Tone from 'tone';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

Tone.Transport.bpm.value = parseFloat(142);

const numOfPads = [0, 1, 2, 3];

const createLoops = (group, numOfPads, measure) => {
  return numOfPads.map(
    (id) =>
      new Tone.Loop(() => {
        console.log(group, id);
      }, measure)
  );
};

const loops = {
  drums: createLoops('drums', [...numOfPads], '4n'),
  bass: createLoops('bass', [...numOfPads], '4n'),
  melody: createLoops('melody', [...numOfPads], '4n'),
  chords: createLoops('chords', [...numOfPads], '4n'),
};

const startLoop = (loops, id, group, startMeasure) => loops[group][id].start(startMeasure);

const stopLoop = (loops, id, group, stopMeasure) => loops[group][id].stop(stopMeasure);

//This should stay here, the stuff above should be moved to a different file
const Sequencer = () => {
  const [play, setPlay] = useState({
    drums: [false, false, false, false],
    bass: [false, false, false, false],
    melody: [false, false, false, false],
    chords: [false, false, false, false],
  });

  const [transportRunning, setTransportRunning] = useState(false);

  useEffect(() => {
    transportRunning ? Tone.Transport.start() : (Tone.Transport.stop().position = 0);
  }, [transportRunning]);

  const player = (group, id) => {
    Tone.start(); //ctx keeps saying suspended for some reason. Hopefuly not a problem
    const trackPlaying = play[group].indexOf(true);
    trackPlaying !== -1 && stopLoop(loops, trackPlaying, group, '4n');

    const updatedGroup = [false, false, false, false];
    updatedGroup[id] = !play[group][id];
    const updatedPlay = { ...play, [group]: updatedGroup };
    setPlay(updatedPlay);

    //maybe SRP this
    const { drums, bass, chords, melody } = updatedPlay;
    setTransportRunning([...drums, ...bass, ...chords, ...melody].some((e) => e));

    trackPlaying !== id && startLoop(loops, id, group, '4n');
  };

  return (
    <main className="appContainer">
      <div className="sequencerBox">
        {Object.keys(play).map((group, index) => (
          <InstrumentGroup key={index} group={group} player={player} groupStates={play[group]} />
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
