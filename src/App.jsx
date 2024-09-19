import './index.css';
import './App.css';
import ProtectedRoute from './Reusables/ProtectedRoute'
import { Home,
        Login,
        Signup, 
        Analytics } from './pages/index'
import {Routes,Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from "./components/Topbar";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";

function App() {


  return (
    
    <div className='flex    items-center justify-center w-full h-screen '>
            <Routes>
        <Route path='/' element={<ProtectedRoute>
          <Home/>
        </ProtectedRoute>}/>
        <Route path='/login' element={ <Login/>}/>
        <Route path='/signup' element={ <Signup/>}/>
         <Route path='/analytics' element={<Analytics/>}/>

         <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
        </Routes>
     </div>
  
  )
}

export default App
