// import React, { useState } from 'react';
// import "./CSS/LoginSignUp.css";

// const LoginSignUp = () => {
//   const [state, setState] = useState("Login");
//   const [formData, setFormData] = useState({
//     name: "",
//     password: "",
//     email: "",
//     agree: false,
//   });
//   const [loading, setLoading] = useState(false);

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   const checkboxHandler = () => {
//     setFormData({ ...formData, agree: !formData.agree });
//   };

//   const login = async () => {
//     setLoading(true);

//     try {
//       console.log("Login Request Payload:", JSON.stringify(formData));

//       const response = await fetch("http://localhost:4000/api/v1/login", {
//         method: "POST",
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`Network response was not ok. Status: ${response.status}`);
//       }

//       const responseData = await response.json();

//       if (responseData.success) {
//         localStorage.setItem("auth-token", responseData.token);
//         window.location.replace("/");
//       } else {
//         alert(responseData.errors);
//       }
//     } catch (error) {
//       console.error("Error during login:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signUp = async () => {
//     if (state === "Sign Up" && !formData.agree) {
//       alert("Please check the agreement checkbox before creating an account.");
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       console.log("Request Payload:", JSON.stringify(formData));
  
//       const response = await fetch("http://localhost:4000/api/v1/signup", {
//         method: "POST",
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
  
//       if (!response.ok) {
//         const errorMessage = await response.json();
//         if (response.status === 400 && errorMessage.errors) {
//           // Handle specific case of existing user with the provided email
//           alert(errorMessage.errors);
//         } else {
//           throw new Error(`Network response was not ok. Status: ${response.status}, Message: ${JSON.stringify(errorMessage)}`);
//         }
//       }
  
//       const responseData = await response.json();
  
//       if (responseData.success) {
//         localStorage.setItem("auth-token", responseData.token);
//         window.location.replace("/");
//       } else {
//         alert(responseData.errors);
//       }
//     } catch (error) {
//       console.error("Error during signup:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className='loginsignup'>
//       <div className="loginsignup-container">
//         <h1>{state}</h1>
//         {state === "Sign Up" && (
//           <div className="loginsignup-fields">
//             <input name="name" value={formData.name} onChange={changeHandler} type="text" placeholder='Your Name' />
//           </div>
//         )}
//         <div className="loginsignup-fields">
//           <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
//           <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
//         </div>
//         {state === "Sign Up" && (
//           <div className="loginsignup-agree">
//             <input type="checkbox" name="agree" id="agreeCheckbox" checked={formData.agree} onChange={checkboxHandler} />
//             <label htmlFor="agreeCheckbox">By continuing, I agree to the terms of use & privacy policy.</label>
//           </div>
//         )}
//         <button onClick={() => { state === "Login" ? login() : signUp() }} disabled={loading}>
//           Continue
//         </button>
//         {state === "Sign Up" ? (
//           <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>
//         ) : (
//           <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default LoginSignUp;


import React, { useState } from 'react';
import "./CSS/LoginSignUp.css";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const checkboxHandler = () => {
    setFormData({ ...formData, agree: !formData.agree });
  };

  const login = async () => {
    setLoading(true);

    try {
      console.log("Login Request Payload:", JSON.stringify(formData));

      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    if (state === "Sign Up" && !formData.agree) {
      alert("Please check the agreement checkbox before creating an account.");
      return;
    }
  
    setLoading(true);
  
    try {
      console.log("Request Payload:", JSON.stringify(formData));
  
      const response = await fetch("http://localhost:4000/api/v1/signup", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        if (response.status === 400 && errorMessage.errors) {
          // Handle specific case of an existing user with the provided email
          alert(errorMessage.errors);
        } else {
          throw new Error(`Network response was not ok. Status: ${response.status}, Message: ${JSON.stringify(errorMessage)}`);
        }
      }
  
      const responseData = await response.json();
  
      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const buttonLabel = state === "Login" ? "Login" : "Create an Account";

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {state === "Sign Up" && (
          <div className="loginsignup-fields">
            <input name="name" value={formData.name} onChange={changeHandler} type="text" placeholder='Your Name' />
          </div>
        )}
        <div className="loginsignup-fields">
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        {state === "Sign Up" && (
          <div className="loginsignup-agree">
            <input type="checkbox" name="agree" id="agreeCheckbox" checked={formData.agree} onChange={checkboxHandler} />
            <label htmlFor="agreeCheckbox">By continuing, I agree to the terms of use & privacy policy.</label>
          </div>
        )}
        <button onClick={() => (state === "Login" ? login() : signUp())} disabled={loading}>
          {buttonLabel}
        </button>
        {state === "Sign Up" ? (
          <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>
        ) : (
          <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
        )}
      </div>
    </div>
  );
}

export default LoginSignUp;
