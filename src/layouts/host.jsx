import { useState, useEffect } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

export default function Host() {
  const auth = getAuth()
  const user = auth.currentUser

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  }

  if (!user) {
    return loading ? (
      <h1>Loading...</h1>
    ) : (
      <div className="host-error">
        <h1>You must sign in first.</h1>
        <Link className="link-button" to="/login">
          Click here to continue
        </Link>
      </div>
    )
  }
  return (
    <>
      <nav className="host-nav">
        <NavLink to="." end style={({ isActive }) => (isActive ? activeStyles : null)}>
          Dashboard
        </NavLink>
        <NavLink to="income" style={({ isActive }) => (isActive ? activeStyles : null)}>
          Income
        </NavLink>
        <NavLink to="reviews" style={({ isActive }) => (isActive ? activeStyles : null)}>
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}
