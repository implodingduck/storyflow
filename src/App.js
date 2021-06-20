//import logo from './logo.svg';
import './App.css';
import dragon from './stories/dragon.json'

import Story from './Story'
import Editor from './Editor'

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  
  const storyjson = (localStorage.getItem('editorstory')) ? JSON.parse(localStorage.getItem('editorstory')) : dragon 

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/editor">
            <Link to={"/preview"}>Preview</Link>
            <Editor ></Editor>
          </Route>
          <Route path="/preview">
            <Link to={"/editor"}>Edit</Link><br />
            <button onClick={ () => window.location.reload() }>Refresh</button>
            <Story story={storyjson.story}></Story>
          </Route>
          <Route path="/:flowhash?">
            <Link to={"/editor"}>Play around with your own story...</Link>
            <Story story={dragon.story}></Story>
          </Route>
        </Switch>
      </Router>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
