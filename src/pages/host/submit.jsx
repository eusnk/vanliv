import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { submitNewVan } from '/services/firebase'

export default function Submit() {
  const [addVanFormData, setAddVanFormData] = useState({
    name: '',
    description: '',
    price: '',
    type: '',
    imageUrl: '',
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  const host = location.state?.from || '/host'

  function handleSubmit(e) {
    e.preventDefault()
    if (
      addVanFormData.name &&
      addVanFormData.description &&
      addVanFormData.price &&
      addVanFormData.type &&
      addVanFormData.imageUrl
    ) {
      setStatus('submitting')
      submitNewVan(addVanFormData)
        .then(() => {
          setError(null)
        })
        .catch((err) => {
          setError(err)
          console.log(error)
        })
        .finally(() => {
          setStatus('idle')
          navigate(host, { replace: true })
        })
    } else {
      setError('All fields are required.')
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setAddVanFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back</span>
      </Link>
      <div className="login-container submit-van">
        <h1>Submit a new van</h1>
        <p style={{ lineHeight: '1.5' }}>Great! We just need some information about your van.</p>
        <form onSubmit={handleSubmit} className="form">
          <h6>van name</h6>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            maxLength="12"
            placeholder="think of a unique name, something eye-catching."
            value={addVanFormData.name}
          />
          <h6>van description</h6>
          <input
            name="description"
            onChange={handleChange}
            type="text"
            maxLength="300"
            placeholder="add a description for your van, the more detailed, the better."
            value={addVanFormData.description}
          />
          <h6>$ price / day</h6>
          <input
            className="price-input"
            name="price"
            onChange={handleChange}
            type="number"
            maxLength="3"
            min="0"
            placeholder="0 – 999"
            value={addVanFormData.price}
          />
          <h6>van type</h6>
          <select name="type" onChange={handleChange} value={addVanFormData.type}>
            <option value="---">---</option>
            <option value="simple">simple</option>
            <option value="rugged">rugged</option>
            <option value="luxury">luxury</option>
          </select>
          <h6>
            Upload your image to
            {' '}
            <a href="https://postimages.org" target="_blank">postimages</a>
            {' '}
            and paste the <i>direct link</i> here.
          </h6>
          <input
            name="imageUrl"
            onChange={handleChange}
            type="url"
            placeholder="https://i.postimg.cc/..."
            pattern="https://i.postimg.cc/.*"
            value={addVanFormData.imageUrl}
          />
          <button className="submit-button" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Submitting...' : 'Submit'}
          </button>
          {error ? <h3 className="login-error">{error}</h3> : null}
        </form>
      </div>
    </section>
  )
}
