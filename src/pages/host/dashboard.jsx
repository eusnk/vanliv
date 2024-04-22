import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsStarFill } from 'react-icons/bs'
import { getAuth } from 'firebase/auth'
import { getHostVans, deleteVan } from '/services/firebase'

export default function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [vans, setVans] = useState([])
  const [error, setError] = useState(null)

  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
      getHostVans()
        .then((data) => setVans(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }, 500)
  }, [])

  function handleDelete(van) {
    deleteVan(van)
  }

  function renderVanElements(vans) {
    const hostVansEls = vans.map((van) => (
      <div className="host-van" key={van.id}>
        <img src={van.imageUrl} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
        <a className="delete-button" onClick={() => handleDelete(van.id)}>
          Delete
        </a>
      </div>
    ))
    return (
      <div className="host-vans-list">
        {hostVansEls.length > 0 ? <section>{hostVansEls}</section> : <span>No vans yet...</span>}
      </div>
    )
  }

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <section>
      <div className="host-dashboard-earnings">
        <div className="info">
          {user && <img className="profile-photo" src={user.photoURL} />}
          {user && <h1>Welcome, {user.displayName}!</h1>}
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to="income">Details</Link>
      </div>
      <div className="host-dashboard-reviews">
        <h2>Review score</h2>

        <BsStarFill className="star" />

        <p>
          <span>5.0</span>/5
        </p>
        <Link to="reviews">Details</Link>
      </div>
      <div className="host-dashboard-vans">
        <div className="top">
          <h2 className="left">Your listed vans</h2>
          <Link className="submit-link" to="submit">
            Submit a van
          </Link>
        </div>
        {loading && !vans ? <h1>Loading...</h1> : <>{renderVanElements(vans)}</>}
      </div>
    </section>
  )
}
