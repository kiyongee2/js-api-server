
import './App.css'
import ProductList from './products/ProductList'
import Header from './layouts/Header'
import Home from './layouts/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddProduct from './products/AddProduct'
import ProductInfo from './products/ProductInfo'
import UpdateProduct from './products/UpdateProduct'

function App() {

  return (
    <>
      <section id="center">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<AddProduct />} />
            <Route path="/products/:id" element={<ProductInfo />} />
            <Route path="/products/update/:id" element={<UpdateProduct />} />
          </Routes>
        </BrowserRouter>
      </section>
    </>
  )
}

export default App

