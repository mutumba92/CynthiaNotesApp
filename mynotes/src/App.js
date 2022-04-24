import {
  BrowserRouter as Router,
  Route,
  

} from "react-router-dom";
import './App.css';
import Header from './components/header';
import NotesListPages from './pages/NotesListPages';
import NotePage from './pages/NotePage';


function App() {
  return (
    
    <Router>
    <div className="container dark">
      <div className="app">
      <Header/>
      
        
        <Route path="/note/:id" exact component={NotePage}/>
        <Route path="/" exact component={NotesListPages}/>
      </div>
    </div>
    </Router>
    );
}

export default App;
