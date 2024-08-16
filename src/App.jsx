import './index.css';
import './App.css';
import ProtectedRoute from './Reusables/ProtectedRoute'
import { Home,
       LandingPage,
        Login,
        Signup, 
        ContactPage,
        AboutPage,
        Analytics } from './pages/index'
import {Routes,Route} from 'react-router-dom'
function App() {


  return (
    
    <div className='flex    items-center justify-center w-full h-screen '>
            <Routes>
        <Route path='/' element={<ProtectedRoute>
          <Home/>
        </ProtectedRoute>}/>
        <Route path='/main' element={<ProtectedRoute>
          <LandingPage/>
        </ProtectedRoute>}/>
        <Route path='/login' element={ <Login/>}/>
        <Route path='/signup' element={ <Signup/>}/>
         <Route path='/analytics' element={<Analytics/>}/>
         <Route path='/contact' element={<ContactPage/>}/>
         <Route path='/about' element={<AboutPage/>}/>
        </Routes>
     </div>
  
  )
}

export default App
