import logo from './logo.svg';
import './App.css';

import Welcome from './components/Welcome';
import Search from './components/search_form';

// import Greet from './components/Greet';

function App() {
  return (
    <div className="App">
      <Search/>
      <Welcome/>
    </div>
  );
}

export default App;
