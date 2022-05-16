import InstrumentGroup from './InstrumentGroup';
import { useState } from 'react';

const Sequencer = () => {
  const [play, setPlay] = useState({
    drums: [false, false, false, false],
    bass: [false, false, false, false],
    melody: [false, false, false, false],
    chords: [false, false, false, false],
  });

  const player = (group, id) => {
    const nowPlay = [false, false, false, false];
    nowPlay[id] = !play[group][id];
    setPlay({ ...play, [group]: nowPlay });
  };

  return (
    <main className="appContainer">
      <div className="sequencerBox">
        {Object.keys(play).map((group, index) => (
          <InstrumentGroup key={index} group={group} player={player} groupStates={play[group]} />
        ))}
      </div>
      <div>{JSON.stringify(play)}</div>
      <div>{`isplaying: ${play}`}</div>
    </main>
  );
};

export default Sequencer;
