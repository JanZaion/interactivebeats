import Header from './components/Header';
import Sequencer from './components/Sequencer';
import Intro from './components/Intro';

function App() {
  return (
    <>
      <Header />
      <main className="appContainer">
        <Intro />
        <Sequencer />
      </main>
    </>
  );
}

export default App;
