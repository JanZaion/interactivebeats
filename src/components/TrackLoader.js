import Sequencer from './Sequencer';
import Loading from './Loading';
import TrackMetadata from './TrackMetadata';
import { useState, useEffect } from 'react';

const TrackLoader = ({ players, track, setSelectDisabled }) => {
  const [areTracksLoaded, setAreTracksLoaded] = useState(false);
  const { groupParams, BPM, producer, genre, folder, opusSize, wavSize } = track;
  const UA = navigator.userAgent;
  const apple = UA.indexOf('Macintosh') !== -1 || UA.indexOf('iPhone') !== -1 || UA.indexOf('iPad') !== -1;
  const audioFormat = apple ? 'wav' : 'opus';

  Object.keys(groupParams).forEach((group) =>
    document.documentElement.style.setProperty(`--pad-${group}-background-color`, groupParams[group].color)
  );

  useEffect(() => {
    (async () => {
      setSelectDisabled(true);
      setAreTracksLoaded(false);
      await Promise.all(
        players.map((loop, index) => loop.load(require(`../tracks/${folder}/${index}.${audioFormat}`)))
      );
      setAreTracksLoaded(true);
      setSelectDisabled(false);
    })();
  }, [folder, players, audioFormat]); //eslint-disable-line

  return (
    <>
      <TrackMetadata producer={producer} genre={genre} size={apple ? wavSize : opusSize} />
      {areTracksLoaded ? <Sequencer BPM={BPM} groupParams={groupParams} players={players} /> : <Loading />}
    </>
  );
};

export default TrackLoader;
