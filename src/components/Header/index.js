import './header.css';
import logo from '../../assets/logo.svg';


function Header() {
    return(
        <header>
            <img src={logo} alt='Logo Pokedex' />
        </header>
    )
}

export default Header;