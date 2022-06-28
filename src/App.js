import Header from './components/Header';
import TrackSelector from './components/TrackSelector';
import Intro from './components/Intro';
import Outro from './components/Outro';

function App() {
  return (
    <>
      {/* <Header /> */}
      <main className="appContainer">
        <Intro />
        <TrackSelector />
        <Outro />
      </main>
    </>
  );
}

export default App;
