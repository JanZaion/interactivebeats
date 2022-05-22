import { groupParams } from '../constants/fixedParams';

const Pad = ({ player, id, group, toggle }) => {
  return (
    <button className="pad" onClick={() => player(group, id, groupParams)}>
      <div className={toggle ? 'square' : 'triangle'} />
    </button>
  );
};

export default Pad;
