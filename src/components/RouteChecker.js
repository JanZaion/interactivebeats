import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tracks } from '../tracks/tracks';
import TrackLoader from './TrackLoader';
import NotFound from './NotFound';

const RouteChecker = ({ players, setActiveTrack, setSelectDisabled }) => {
  const { route } = useParams();
  const track = tracks.find((track) => track.route === route);
  const trackIndex = tracks.indexOf(track);

  useEffect(() => {
    setActiveTrack(trackIndex);
  }, [trackIndex]); //eslint-disable-line

  return (
    <>
      {track ? (
        <TrackLoader players={players} track={track} setSelectDisabled={setSelectDisabled} />
      ) : (
        <NotFound route={route} />
      )}
    </>
  );
};

export default RouteChecker;
