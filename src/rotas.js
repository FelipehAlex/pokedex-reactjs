
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Header from './components/Header';

function Rotas() {
    return(
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/details/:id" element={<Details/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;