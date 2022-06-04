import { Player } from 'tone';

import drums_1 from '../tracks/drums_1.mp3';
import drums_2 from '../tracks/drums_2.mp3';
import drums_3 from '../tracks/drums_3.mp3';
import drums_4 from '../tracks/drums_4.mp3';
import bass_1 from '../tracks/bass_1.mp3';
import bass_2 from '../tracks/bass_2.mp3';
import bass_3 from '../tracks/bass_3.mp3';
import bass_4 from '../tracks/bass_4.mp3';
import melody_1 from '../tracks/melody_1.mp3';
import melody_2 from '../tracks/melody_2.mp3';
import melody_3 from '../tracks/melody_3.mp3';
import melody_4 from '../tracks/melody_4.mp3';
import chords_1 from '../tracks/chords_1.mp3';
import chords_2 from '../tracks/chords_2.mp3';
import chords_3 from '../tracks/chords_3.mp3';
import chords_4 from '../tracks/chords_4.mp3';

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
