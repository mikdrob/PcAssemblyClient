import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logo from "../assets/ShoppingCartLogo.png"


const Header = () => {
    const appState = useContext(AppContext);

    return (
        <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <div className="navbar-header"></div>
                <a className="navbar-brand" href="/">PC Accembly</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                        <NavLink className="nav-link text-dark" to="/parts">Parts</NavLink>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                            <div className="dropdown-menu dropdown-menu-right animate slideIn" aria-labelledby="navbarDropdown">
                                <NavLink className="nav-link text-dark" to="/parts">All Products</NavLink>
                                <NavLink className="nav-link text-dark" to="/map">Map</NavLink>
                            </div>
                        </li>
                    </ul>
                    <NavLink className="btn btn-outline-dark" to="/cart" id="cart-button">
                        <i className="bi-cart-fill me-1"></i>
                        <img src={logo} style={{height: "1.5rem"}} alt="Cart"></img>
                        <span className="badge bg-dark text-white ms-1 rounded-pill">{appState.items.length}</span>
                    </NavLink>
                </div>
            </div>
        </nav>
        </header>



    );
}

export default Header;