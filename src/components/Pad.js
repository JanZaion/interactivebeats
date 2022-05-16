const Pad = (props) => {
  const { player, id, group, toggle } = props;

  return (
    <button className="pad" onClick={() => player(group, id)}>
      <div className={toggle ? 'square' : 'triangle'} />
    </button>
  );
};

export default Pad;
