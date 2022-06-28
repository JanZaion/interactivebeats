import React, { useState, Suspense } from 'react';
import { tracks } from '../tracks/tracks';
import loadable from '@loadable/component';
// import { Transport } from 'tone';

// const TrackComponent = React.lazy(() => import('../tracks/Phonk'));

const TrackSelector = () => {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0].componentName); //fetched twice on initial load for some reason, look into it

  const TrackComponent = loadable((props) => import(`../tracks/${props.track}`), {
    cacheKey: (props) => props.track,
  });

  const dropdownSelect = (e) => {
    setSelectedTrack(e.target.value);
  };

  return (
    <>
      <select className="dropdown" onChange={(e) => dropdownSelect(e)}>
        {tracks.map((track, index) => (
          <option key={index} value={track.componentName}>
            {track.trackName}
          </option>
        ))}
      </select>
      <TrackComponent track={selectedTrack} fallback={<div>Loading...</div>} />
    </>
  );
};

export default TrackSelector;
