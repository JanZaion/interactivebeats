import { useState } from 'react';
import { tracks } from '../tracks/tracks';
import RouteChecker from './RouteChecker';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TrackLoader from './TrackLoader';

const TrackSelector = ({ players }) => {
  const navigate = useNavigate();
  const [activeTrack, setActiveTrack] = useState(0);
  const [selectDisabled, setSelectDisabled] = useState(false);

  return (
    <>
      <div className="contentBox" id="trackSelector">
        <select
          className="dropdown"
          onChange={(e) => navigate(`bossequencer/${tracks[e.target.value].route}`)}
          value={activeTrack}
          disabled={selectDisabled}
        >
          {tracks.map((track, index) => (
            <option key={index} value={index}>
              {track.title}
            </option>
          ))}
        </select>
      </div>
      <Routes>
        <Route
          path={`bossequencer/:route`}
          element={
            <RouteChecker players={players} setActiveTrack={setActiveTrack} setSelectDisabled={setSelectDisabled} />
          }
        />
        <Route
          path={`bossequencer/`}
          element={<TrackLoader players={players} track={tracks[0]} setSelectDisabled={setSelectDisabled} />}
        />
      </Routes>
    </>
  );
};

export default TrackSelector;
