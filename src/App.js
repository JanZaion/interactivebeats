import Header from './components/Header';
import Sequencer from './components/Sequencer';
import Intro from './components/Intro';
import Outro from './components/Outro';
import { groupParams } from './constants/fixedParams';

//single source of truth for pad colors, once tracks are loadable, put it somwhere where they are being loaded
Object.keys(groupParams).forEach((group) =>
  document.documentElement.style.setProperty(`--pad-${group}-background-color`, groupParams[group].color)
);

function App() {
  return (
    <>
      {/* <Header /> */}
      <main className="appContainer">
        <Intro />
        <Sequencer />
        <Outro />
      </main>
    </>
  );
}

export default App;