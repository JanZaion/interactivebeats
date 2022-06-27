import Sequencer from './Sequencer';
import TrackMetadata from './TrackMetadata';
import { makeLoops } from '../constants/makeLoops';

//variable data goes here
import sample11 from '../tracks/drums_1.opus';
import sample12 from '../tracks/drums_2.opus';
import sample13 from '../tracks/drums_3.opus';
import sample14 from '../tracks/drums_4.opus';
import sample21 from '../tracks/bass_1.opus';
import sample22 from '../tracks/bass_2.opus';
import sample23 from '../tracks/bass_3.opus';
import sample24 from '../tracks/bass_4.opus';
import sample31 from '../tracks/melody_1.opus';
import sample32 from '../tracks/melody_2.opus';
import sample33 from '../tracks/melody_3.opus';
import sample34 from '../tracks/melody_4.opus';
import sample41 from '../tracks/chords_1.opus';
import sample42 from '../tracks/chords_2.opus';
import sample43 from '../tracks/chords_3.opus';
import sample44 from '../tracks/chords_4.opus';

export const BPM = 125;

export const tick = '1n';

export const groupParams = {
  group1: { name: 'drums', color: '#f6f47b' },
  group2: { name: 'bass', color: '#192f95' },
  group3: { name: 'melody', color: '#0a9c8f' },
  group4: { name: 'chords', color: '#9b52aa' },
};

const producer = 'Zaion';

const genre = 'phunk';

// const size = 10mb???
//variable data ends here

const WrapPlaceholder = () => {
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

export default WrapPlaceholder;
