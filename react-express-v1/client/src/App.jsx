import './App.css'
import ProductList from './products/ProductList'
import Header from './layouts/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddProduct from './products/AddProduct'
import ProductInfo from './products/ProductInfo'
import UpdateProduct from './products/UpdateProduct'
import Main from './layouts/Main'
import SignIn from './users/SignIn'
import { useState } from 'react'

function App() {
  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인한 사용자 ID 관리
  const [username, setUsername] = useState("");

  // 로그인 함수
  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username); //로그인한 사용자 상태(ID) 저장
  }

  // 로그아웃 핸들러 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    <>
      <section className="app">
        <BrowserRouter>
          <Header 
            isLoggedIn={isLoggedIn} 
            username={username}
            onLogout={handleLogout}
          />
          <div className="container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/new" element={<AddProduct />} />
              <Route path="/products/:id" element={<ProductInfo />} />
              <Route path="/products/update/:id" element={<UpdateProduct />} />
              <Route path='/signin' element={<SignIn onLogin={handleLogin} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </section>
    </>
  )
}

export default App

