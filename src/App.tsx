import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Sensilet from './Sensilet';
import Panda from './Panda';

function Home() {

  const navigate = useNavigate()

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => navigate('/sensilet')}>Sensilet Wallet</button>
        <br />
        <button onClick={() => navigate('/panda')}>Panda Wallet</button>
      </header>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/sensilet" element={<Sensilet />} />
        <Route path="/panda" element={<Panda />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
