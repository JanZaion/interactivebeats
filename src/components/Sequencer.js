import InstrumentGroup from './InstrumentGroup';
import { useState, useEffect } from 'react';
import * as Tone from 'tone';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

Tone.Transport.bpm.value = parseFloat(142);

// const topLoop = new Tone.Loop((time) => {
//   console.log(Tone.Transport.position);
// }, '8n').start('1m');

const numOfPads = [0, 1, 2, 3];
const createLoop = (group, id) => {
  //'4n' should prly nto be the same for all groups. perform a check here that will decide this based on group
  return new Tone.Loop(() => {
    console.log(group, id);
  }, '4n');
};

const loops = {
  drums: [...numOfPads].map((id) => createLoop('drums', id)),
  bass: [...numOfPads].map((id) => createLoop('bass', id)),
  melody: [...numOfPads].map((id) => createLoop('melody', id)),
  chords: [...numOfPads].map((id) => createLoop('chords', id)),
};

const startLoop = (loops, id, group, startMeasure) => {
  //start measure might not need to be arg, maybe just figure it out by group
  //prev state will be important here, coz we need to stop the loop that playd before
  loops[group][id].start(startMeasure);
};

const stopLoop = (loops, id, group, stopMeasure) => {
  loops[group][id].stop(stopMeasure);
};

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
    const updatedGroup = [false, false, false, false];
    updatedGroup[id] = !play[group][id];
    const updatedPlay = { ...play, [group]: updatedGroup };
    setPlay(updatedPlay);

    //maybe SRP this
    const { drums, bass, chords, melody } = updatedPlay;
    setTransportRunning([...drums, ...bass, ...chords, ...melody].some((e) => e));

    startLoop(loops, id, group, '4n');
    stopLoop(loops, id, group, '1m');
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
