import Footer from './components/Footer';
import TrackSelector from './components/TrackSelector';
import FFTviz from './components/FFTviz';
import { Player } from 'tone';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const players = [];
  for (let i = 0; i < 16; i++) {
    const loop = new Player().toDestination();
    loop.loop = true;
    players.push(loop);
  }

  return (
    <BrowserRouter bassname="/bossequencer">
      <main className="appContainer">
        <FFTviz players={players} />
        <TrackSelector players={players} />
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
