import InstrumentGroup from './InstrumentGroup';

const Sequencer = () => {
  return (
    <main className="appContainer">
      <div className="sequencerBox">
        <InstrumentGroup group={'drums'} />
        <InstrumentGroup group={'bass'} />
        <InstrumentGroup group={'melody'} />
        <InstrumentGroup group={'chords'} />
      </div>
      <div>{`status: isplaying`}</div>
    </main>
  );
};

export default Sequencer;
