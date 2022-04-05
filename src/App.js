import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Pages/homepage/hompage.component';

const HatsPage = () => <div>hello</div>;
function App() {
  return (
    <div>
      <Switch>
        <Route excat path='/' component={HomePage} />
        <Route path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
