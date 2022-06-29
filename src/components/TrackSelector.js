import { useState, useCallback } from 'react';
import { tracks } from '../tracks/tracks';
import TrackWrapper from './TrackWrapper';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TrackSelector = ({ players }) => {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const navigate = useNavigate();
  const { route } = useParams();

  // const goTo = useCallback(
  //   () => navigate(`bossequencer/${selectedTrack.title}`, { replace: true }),
  //   [selectedTrack.title]
  // );
  // const goTo = (destination) => navigate(`bossequencer/${tracks[e.target.value].title}`);

  return (
    <>
      {/* <select className="dropdown" onChange={(e) => setSelectedTrack(tracks[e.target.value])}> */}
      <select
        className="dropdown"
        onChange={(e) => {
          setSelectedTrack(tracks[e.target.value]);
          navigate(`bossequencer/${tracks[e.target.value].route}`);
        }}
      >
        {tracks.map((track, index) => (
          <option key={index} value={index}>
            {track.title}
          </option>
        ))}
      </select>
      <Routes>
        <Route
          // path={`bossequencer/${selectedTrack.route}`}
          path={`bossequencer/:route`}
          element={<TrackWrapper track={selectedTrack} players={players} />}
        />
      </Routes>
      <button onClick={() => console.log(route)}>rout</button>
    </>
  );
};

export default TrackSelector;
