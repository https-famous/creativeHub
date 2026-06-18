import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
const handleLogout= () =>{
  localStorage.removeItem("token");
   navigate("/login");
}

  return (
  <>
      <h2>Welcome to CreativeHub</h2>
      <button onClick={handleLogout} width >Logout</button>
  </>                                          // react fragments 
  )

}
export default Home;