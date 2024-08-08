
import ProtectedRoute from "./Reusables/ProtectedRoute"
import { Home ,Login,Signup,Analytics} from "./pages/index"
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
         <Route path='analytics' element={<Analytics/>}/>
        </Routes>
     </div>
  
  )
}

export default App
