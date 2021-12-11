import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import CreateStudent from './CreateStudent';
import GetStudents from './GetStudents';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/getstudents" exact element={<GetStudents />} />
          <Route path="/createstudent" exact element={<CreateStudent />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
