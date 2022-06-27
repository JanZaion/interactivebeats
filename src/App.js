import Header from './components/Header';
import TrackSelector from './components/TrackSelector';
import Intro from './components/Intro';
import Outro from './components/Outro';
import FT from './components/FT';

function App() {
  return (
    <>
      {/* <Header /> */}
      <main className="appContainer">
        <Intro />
        <TrackSelector />
        <Outro />
        <FT />
      </main>
    </>
  );
}

export default App;
