import { useState } from 'react';
import { tracks } from '../tracks/tracks';
import TrackWrapper from './TrackWrapper';

const TrackSelector = ({ players }) => {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

  return (
    <>
      <select className="dropdown" onChange={(e) => setSelectedTrack(tracks[e.target.value])}>
        {tracks.map((track, index) => (
          <option key={index} value={index}>
            {track.title}
          </option>
        ))}
      </select>
      <TrackWrapper track={selectedTrack} players={players} />
    </>
  );
};

export default TrackSelector;
