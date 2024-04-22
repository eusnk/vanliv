import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { getVanDetails } from '/services/firebase'

export default function Details() {
  const [van, setVan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { id } = useParams()
  const location = useLocation()

  const search = location.state?.search || ''
  const type = location.state?.type || 'all'

  useEffect(() => {
    async function loadVans() {
      setLoading(true)
      try {
        const data = await getVanDetails(id)
        setVan(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadVans()
  }, [id])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
      {van && (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <Link className="link-button" to={`../${van.id}/checkout`}>
            Rent this van{' '}
          </Link>
        </div>
      )}
    </div>
  )
}
