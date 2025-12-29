import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export const Header = () => {
    const navi = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const queryTerm = e.target.search.value;
        e.target.reset();
        return navi(`/search?q=${queryTerm}`)
    }
    return (
        <nav className='navbar navbar-expand-md fixed-top bg-primary navbar-dark'>
            <div className='container-fluid'>
                <NavLink to="/" className='navbar-brand' href="#">
                    <i className="bi bi-film"></i>
                    MovieHunt</NavLink>
                <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id="menu">
                    <ul className='navbar-nav me-auto mb-3 mb-md-0'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/">Home</NavLink>
                        </li>
                        <li className='nav-item'><NavLink className='nav-link' to="/movies/top">Top Rated</NavLink></li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/movies/popular">Popular</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/movies/upcoming">Upcoming</NavLink>
                        </li>
                    </ul>
                    <form onSubmit={handleSubmit}>
                        <input className='form-control form-control' name='search' type="text" placeholder='Search' />
                    </form>
                </div>
            </div>
        </nav>
    )
}

