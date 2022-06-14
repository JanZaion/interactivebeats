import { Player } from 'tone';

import drums_1 from '../tracks/drums_1.opus';
import drums_2 from '../tracks/drums_2.opus';
import drums_3 from '../tracks/drums_3.opus';
import drums_4 from '../tracks/drums_4.opus';
import bass_1 from '../tracks/bass_1.opus';
import bass_2 from '../tracks/bass_2.opus';
import bass_3 from '../tracks/bass_3.opus';
import bass_4 from '../tracks/bass_4.opus';
import melody_1 from '../tracks/melody_1.opus';
import melody_2 from '../tracks/melody_2.opus';
import melody_3 from '../tracks/melody_3.opus';
import melody_4 from '../tracks/melody_4.opus';
import chords_1 from '../tracks/chords_1.opus';
import chords_2 from '../tracks/chords_2.opus';
import chords_3 from '../tracks/chords_3.opus';
import chords_4 from '../tracks/chords_4.opus';

const makeLoops = (tracks) => {
  const loops = tracks.map((track) => {
    const Loop = new Player(track).toDestination();
    Loop.loop = true;
    return Loop;
  });

  return loops;
};

export const loops = {
  group1: makeLoops([drums_1, drums_2, drums_3, drums_4]),
  group2: makeLoops([bass_1, bass_2, bass_3, bass_4]),
  group3: makeLoops([melody_1, melody_2, melody_3, melody_4]),
  group4: makeLoops([chords_1, chords_2, chords_3, chords_4]),
};
