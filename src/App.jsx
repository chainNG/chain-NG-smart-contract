import "./index.css";
import "./App.css";
import ProtectedRoute from "./Reusables/ProtectedRoute"
import { Home,
        Login,
        Signup, 
        Contact,
        About,
        Analytics } from "./pages/index"
import {Routes,Route} from 'react-router-dom'
function App() {


  return (
    
    <div className="flex    items-center justify-center w-full h-screen ">
            <Routes>
        <Route path='/' element={<ProtectedRoute>
          <Home/>
        </ProtectedRoute>}/>
        <Route path="/login" element={ <Login/>}/>
        <Route path="/signup" element={ <Signup/>}/>
         <Route path='/analytics' element={<Analytics/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/about' element={<About/>}/>
        </Routes>
     </div>
  
  )
}

export default App
