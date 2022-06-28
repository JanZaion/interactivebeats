import { Player } from 'tone';

export const makeLoops = (group1, group2, group3, group4) => {
  const makeGroups = (tracks) => {
    const loops = tracks.map((track) => {
      const Loop = new Player(track).toDestination();
      Loop.loop = true;
      return Loop;
    });

    return loops;
  };

  return {
    group1: makeGroups(group1),
    group2: makeGroups(group2),
    group3: makeGroups(group3),
    group4: makeGroups(group4),
  };
};
