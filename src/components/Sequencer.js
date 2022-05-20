import InstrumentGroup from './InstrumentGroup';
import { useState, useEffect } from 'react';
import * as Tone from 'tone';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

Tone.Transport.bpm.value = parseFloat(142);

const topLoop = new Tone.Loop((time) => {
  console.log(Tone.Transport.position);
}, '8n').start('1m');

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

    const { drums, bass, chords, melody } = updatedPlay;
    setTransportRunning([...drums, ...bass, ...chords, ...melody].some((e) => e));
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
