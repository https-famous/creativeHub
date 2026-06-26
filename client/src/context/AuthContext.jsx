import { createContext, useContext, useState } from "react";    // createcontext will be used to create a container, useContext is how a component opens the container object

const AuthContext = createContext(null);      // empty value in our container with the variable name AuthContext

export function AuthProvider({ children }) {                   // so Authprovider fills the container and holds it open for anyone to reach into it the { children } if for the components nested inside AuthProvider to be able to access the login token 
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (                                  // .PROVIDER This is automatically created when you call createContext(). Every context comes with a .Provider
                                        // value is the important part — whatever you put in value is what every component gets access to. In this case token, login, and logout.
    <AuthContext.Provider value={{ token, login, logout }}>     
      {children}            //
    </AuthContext.Provider>
  );
}

export function useAuth() {           
  return useContext(AuthContext);
}
