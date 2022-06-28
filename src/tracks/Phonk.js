import Sequencer from '../components/Sequencer';
import TrackMetadata from '../components/TrackMetadata';
import { makeLoops } from '../auxFunctions/makeLoops';

//variable data goes here
import sample11 from './phonk/drums_1.opus';
import sample12 from './phonk/drums_2.opus';
import sample13 from './phonk/drums_3.opus';
import sample14 from './phonk/drums_4.opus';
import sample21 from './phonk/bass_1.opus';
import sample22 from './phonk/bass_2.opus';
import sample23 from './phonk/bass_3.opus';
import sample24 from './phonk/bass_4.opus';
import sample31 from './phonk/melody_1.opus';
import sample32 from './phonk/melody_2.opus';
import sample33 from './phonk/melody_3.opus';
import sample34 from './phonk/melody_4.opus';
import sample41 from './phonk/chords_1.opus';
import sample42 from './phonk/chords_2.opus';
import sample43 from './phonk/chords_3.opus';
import sample44 from './phonk/chords_4.opus';

export const BPM = 125;

export const tick = '1n';

export const groupParams = {
  group1: { name: 'drums', color: '#f6f47b' },
  group2: { name: 'bass', color: '#192f95' },
  group3: { name: 'melody', color: '#0a9c8f' },
  group4: { name: 'chords', color: '#9b52aa' },
};

export const producer = 'Zaion';

export const genre = 'phunk';

// const size = 10mb???
//variable data ends here

Object.keys(groupParams).forEach((group) =>
  document.documentElement.style.setProperty(`--pad-${group}-background-color`, groupParams[group].color)
);

const Phonk = () => {
  return (
    <>
      <TrackMetadata producer={producer} genre={genre} />
      <Sequencer
        BPM={BPM}
        tick={tick}
        groupParams={groupParams}
        loops={makeLoops(
          [sample11, sample12, sample13, sample14],
          [sample21, sample22, sample23, sample24],
          [sample31, sample32, sample33, sample34],
          [sample41, sample42, sample43, sample44]
        )}
      />
    </>
  );
};

export default Phonk;
