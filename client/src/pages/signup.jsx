import { useState } from "react";     //This import useState from react which lets React store and update data inside the component.

function Signup() {                  // This creates our signup page component, everything inside here is what will show and do
  const [form, setForm] = useState({    //This creates state (memory) for the form  form =initial value setForm=function to update it 
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {    //Function that runs whenever user types in an input
    setForm({                    //Copy everything already inside form
      ...form,
      [e.target.name]: e.target.value      //update only the field your being typed into
    });
  };

  const handleSubmit = (e) => {         //Runs when user clicks “Sign Up”
    e.preventDefault();                 // Stops page from reloading (default browser behavior)
    console.log(form);                 //Prints form data to console (for testing)
  };

  return (                           // this is what shows on our screen
    <div>
      <h2>Signup</h2>
                                                                
      <form onSubmit={handleSubmit}>           
        <input                                         //When form is submitted, run handleSubmit
          name="username"                              //connects it to form.username
          placeholder="Username"                 
          onChange={handleChange}                      //updates state when typing
        />

        <input
          name="email"                
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"                           // hides text
          placeholder="Password"
          onChange={handleChange}
        />                                                             
 
        <button type="submit">Sign Up</button>              
      </form>                                                   
    </div>
  );
}

export default Signup;