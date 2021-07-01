import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = () => {
    const appState = useContext(AppContext);

    return (
        <header className="bg-dark py-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#!">PC Accembly</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                            <NavLink className="nav-link text-dark" to="/parts">Parts</NavLink>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#!">All Products</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <NavLink className="nav-link text-dark" to="/map">Map</NavLink>
                                    <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                                </ul>
                            </li>
                        </ul>
                        <li className="btn btn-outline-dark">
                            <NavLink className="text-dark" to="/cart">Cart</NavLink>
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{appState.items.length}</span>
                        </li>
                    </div>
                </div>
            </nav>
            {/* <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">React</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to="/parts">Parts</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to="/cart">Cart {appState.items.length}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to="/map">Map</NavLink>
                            </li>
                        </ul>
                  </div>
                </div>
            </nav> */}
            
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Shop in style</h1>
                    <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                </div>
            </div>
        </header>

    );
}

export default Header;