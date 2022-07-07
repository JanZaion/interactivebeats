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
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
          <span className="part"></span>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
