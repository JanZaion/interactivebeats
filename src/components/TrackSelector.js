import { useState } from 'react';
import { tracks } from '../tracks/tracks';
import RouteChecker from './RouteChecker';
import { Routes, Route, useNavigate } from 'react-router-dom';

const TrackSelector = ({ players }) => {
  const navigate = useNavigate();
  const [activeTrack, setActiveTrack] = useState(0);

  return (
    <>
      <select //add selected option based on current route or whatever
        className="dropdown"
        onChange={(e) => navigate(`bossequencer/${tracks[e.target.value].route}`)}
        value={activeTrack}
      >
        {tracks.map((track, index) => (
          <option key={index} value={index}>
            {track.title}
          </option>
        ))}
      </select>
      <Routes>
        <Route
          path={`bossequencer/:route`}
          element={<RouteChecker players={players} setActiveTrack={setActiveTrack} />}
        />
      </Routes>
    </>
  );
};

export default TrackSelector;
