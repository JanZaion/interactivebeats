import InstrumentGroup from './InstrumentGroup';
import { useState } from 'react';

const Sequencer = () => {
  const [play, setPlay] = useState({
    drums: [false, false, false, false],
    bass: [false, false, false, false],
    melody: [false, false, false, false],
    chords: [false, false, false, false],
  });

  const [metro, setMetro] = useState(false);

  const player = (group, id) => {
    const nowPlay = [false, false, false, false];
    nowPlay[id] = !play[group][id];
    const newPlay = { ...play, [group]: nowPlay };
    setPlay(newPlay);

    const { drums, bass, chords, melody } = newPlay;
    setMetro([...drums, ...bass, ...chords, ...melody].filter((state) => state === true).length > 0);
  };

  return (
    <main className="appContainer">
      <div className="sequencerBox">
        {Object.keys(play).map((group, index) => (
          <InstrumentGroup key={index} group={group} player={player} groupStates={play[group]} />
        ))}
      </div>
      <div>{JSON.stringify(play)}</div>
      <div>{`isplaying: ${metro}`}</div>
    </main>
  );
};

export default Sequencer;
