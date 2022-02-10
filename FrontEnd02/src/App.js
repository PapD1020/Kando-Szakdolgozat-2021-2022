import logo from './logo.svg';
import './App.css';
//packageJson-t importálni kell, hogy a benne lévő adatokat itt használhassam
import packageJson from 'C:/Users/Tanulo/Desktop/Kand-Szakdolgozat2021-2022/FrontEnd/package.json';
const {proxy} = packageJson;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          A simple React app....
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/*Összekötés bemutatása*/}
        <form action="../../post" method="post" className="form">
          <button type="submit" onClick={onClickAlerts}>Connected?</button>
        </form>
      </header>
    </div>
  );
}

/*package.json-ból "proxy"-ban lévő adat feldolgozása*/
function onClickAlerts(){
  let pieces = [];
  pieces = proxy.split(':');
    alert("Connected on port: " + pieces[2]);
}

export default App;
