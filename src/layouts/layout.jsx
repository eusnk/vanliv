import { Link, NavLink, Outlet } from 'react-router-dom'
import { FaRegUserCircle } from 'react-icons/fa'

export default function Layout() {
  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  }

  return (
    <div className="site-wrapper">
      <header>
        <Link className="site-logo" to="/">
          <img src="/logo.png" />
        </Link>
        <nav>
          <NavLink to="/host" style={({ isActive }) => (isActive ? activeStyles : null)}>
            Host
          </NavLink>
          <NavLink to="/about" style={({ isActive }) => (isActive ? activeStyles : null)}>
            About
          </NavLink>
          <NavLink to="/vans" style={({ isActive }) => (isActive ? activeStyles : null)}>
            Vans
          </NavLink>
          <Link to="/login" className="login-link">
            <FaRegUserCircle />
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>&#169; vanliv, all rights reserved.</footer>
    </div>
  )
}
