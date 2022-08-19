import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Add from './routes/Add';
import Edit from './routes/Edit';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
