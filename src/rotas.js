
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';

function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/details" element={<Details/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;