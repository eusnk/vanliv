import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '/layouts/layout'
import Home from '/pages/home'
import About from '/pages/about'
import Vans from '/pages/products/vans'
import Details from '/pages/products/details'
import Checkout from '/pages/products/checkout'
import Login from '/pages/login'
import Host from '/layouts/host'
import Dashboard from '/pages/host/dashboard'
import Income from '/pages/host/income'
import Reviews from '/pages/host/reviews'
import Submit from '/pages/host/submit'
import NotFound from '/pages/notfound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans">
            <Route index element={<Vans />} />
            <Route path=":id" element={<Details />} />
            <Route path=":id/checkout" element={<Checkout />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="host" element={<Host />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="submit" element={<Submit />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
