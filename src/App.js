import Footer from './components/Footer';
import TrackSelector from './components/TrackSelector';
import Intro from './components/Intro';
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
    <BrowserRouter>
      <div className="appContainer">
        <main className="frontContent">
          <Intro />
          <TrackSelector players={players} />
          <Footer />
        </main>
        <div className="bcgAnim">
          <div class="light x1"></div>
          <div class="light x2"></div>
          <div class="light x3"></div>
          <div class="light x4"></div>
          <div class="light x5"></div>
          <div class="light x6"></div>
          <div class="light x7"></div>
          <div class="light x8"></div>
          <div class="light x9"></div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
