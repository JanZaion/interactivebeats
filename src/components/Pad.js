const Pad = ({ player, id, group, toggle }) => {
  return (
    <button className="pad" onClick={() => player(group, id)}>
      <div className={toggle ? 'square' : 'triangle'} />
    </button>
  );
};

export default Pad;
