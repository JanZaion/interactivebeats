import Sequencer from './Sequencer';
import Loading from './Loading';
import TrackMetadata from './TrackMetadata';
import { useState, useEffect } from 'react';

const TrackWrapper = ({ track, players }) => {
  const { groupParams, BPM, producer, genre, folder } = track;
  const [areTracksLoaded, setAreTracksLoaded] = useState(false);

  Object.keys(groupParams).forEach((group) =>
    document.documentElement.style.setProperty(`--pad-${group}-background-color`, groupParams[group].color)
  );

  useEffect(() => {
    (async () => {
      setAreTracksLoaded(false);
      await Promise.all(players.map((loop, index) => loop.load(require(`../tracks/${folder}/${index}.opus`))));
      setAreTracksLoaded(true);
    })();
  }, [folder, players]);

  return (
    <>
      <TrackMetadata producer={producer} genre={genre} />
      {areTracksLoaded ? <Sequencer BPM={BPM} groupParams={groupParams} players={players} /> : <Loading />}
    </>
  );
};

export default TrackWrapper;
