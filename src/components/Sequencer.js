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
    const nowPlaying = [false, false, false, false];
    setPlay({ ...play, [group]: nowPlaying });

    nowPlaying[id] = !play[group][id];
    setPlay({ ...play, [group]: nowPlaying });

    return !play[group][id];
  };

  return (
    <main className="appContainer">
      <div className="sequencerBox">
        {/* <InstrumentGroup group={'drums'} player={player} groupStates={play['drums']} />
        <InstrumentGroup group={'bass'} player={player} />
        <InstrumentGroup group={'melody'} player={player} />
        <InstrumentGroup group={'chords'} player={player} /> */}
        {Object.keys(play).map((group, index) => (
          <InstrumentGroup key={index} group={group} player={player} groupStates={play[group]} />
        ))}
      </div>
      <div>{`isplaying: ${JSON.stringify(play)}`}</div>
    </main>
  );
};

export default Sequencer;
