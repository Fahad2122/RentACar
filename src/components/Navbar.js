import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">RentACar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">Link</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            City
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/cityKarachi">karachi</Link></li>
            <li><Link className="dropdown-item" to="/cityLahore">Lahore</Link></li>
            <li><Link className="dropdown-item" to="/cityGujranwala">Gujranwala</Link></li>
            <li><Link className="dropdown-item" to="/cityPeshawar">Peshawar</Link></li>
          </ul>
        </li>
      </ul>
      <form className="d-flex navbar-nav mb-2 mb-lg-0">
        <Link className="nav-link active" aria-current="page" to="/login">login</Link>
        <Link className="nav-link active" aria-current="page" to="/signup">signup</Link>
      </form>
    </div>
  </div>
</nav>
  )
}
