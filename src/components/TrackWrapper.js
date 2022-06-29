import Sequencer from './Sequencer';
import Loading from './Loading';
import TrackMetadata from './TrackMetadata';
import { useState, useEffect } from 'react';

const TrackWrapper = ({ track, loops }) => {
  const { groupParams, BPM, tick, producer, genre, folder } = track;
  const [areTracksLoaded, setAreTracksLoaded] = useState(false);

  Object.keys(groupParams).forEach((group) =>
    document.documentElement.style.setProperty(`--pad-${group}-background-color`, groupParams[group].color)
  );

  useEffect(() => {
    (async () => {
      setAreTracksLoaded(false);
      await Promise.all(loops.map((loop, index) => loop.load(require(`../tracks/${folder}/${index}.opus`))));
      setAreTracksLoaded(true);
    })();
  }, [track]);

  return (
    <>
      <TrackMetadata producer={producer} genre={genre} />
      {areTracksLoaded ? (
        <Sequencer
          BPM={BPM}
          tick={tick}
          groupParams={groupParams}
          loops={{
            group1: [loops[0], loops[1], loops[2], loops[3]],
            group2: [loops[4], loops[5], loops[6], loops[7]],
            group3: [loops[8], loops[9], loops[10], loops[11]],
            group4: [loops[12], loops[13], loops[14], loops[15]],
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TrackWrapper;
