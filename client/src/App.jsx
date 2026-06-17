import { BrowserRouter, Routes, Route } from "react-router-dom";  //BrowserRouter enables routing in our React app , Routes the containers that holds all our routes, Route 

import Signup from "./pages/signup";                 // imports fom particular files 
import Login from "./pages/login";
import Home from "./pages/home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {                             //App component 
  return (              
    <BrowserRouter>               
      <Routes>

        <Route path="/signup" element={<Signup />} />                        

        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;