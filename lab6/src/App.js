import logo from './logo.svg';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div >
      <h1>Snake game</h1>
      <div style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Board />
      </div>
    </div>
  );
}

export default App;
