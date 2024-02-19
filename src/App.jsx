import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./pages/Login"
import Home from "./pages/Home";
import Protected from "./components/Protected";
import CartDetails from "./components/cart/CartDetails";
import 'react-toastify/dist/ReactToastify.min.css'
import PageNotFound from "./components/PageNotFound";
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/home" element={
            <Protected>
              <Home />
            </Protected>
          }></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/cart" element={<CartDetails />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
