import { tracks } from '../tracks/tracks';
import TrackWrapper from './TrackWrapper';
import { Routes, Route, useNavigate } from 'react-router-dom';

const TrackSelector = ({ players }) => {
  const navigate = useNavigate();

  return (
    <>
      <select //add selected option based on current route or whatever
        className="dropdown"
        onChange={(e) => navigate(`bossequencer/${tracks[e.target.value].route}`)}
      >
        {tracks.map((track, index) => (
          <option key={index} value={index}>
            {track.title}
          </option>
        ))}
      </select>
      <Routes>
        <Route path={`bossequencer/:route`} element={<TrackWrapper players={players} />} />
      </Routes>
    </>
  );
};

export default TrackSelector;
