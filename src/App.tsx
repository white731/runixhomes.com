import React, { useEffect, useState } from 'react';
import './App.css';
import GoogleButton from 'react-google-button'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBFmXpDJkOFigewKHjL1ByAqe9UpYxji_0",
  authDomain: "authentication-example-3107a.firebaseapp.com",
  projectId: "authentication-example-3107a",
  storageBucket: "authentication-example-3107a.appspot.com",
  messagingSenderId: "591515814813",
  appId: "1:591515814813:web:e537722234d372af10fd74",
  measurementId: "G-VCPP48ZM6T"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth(app)


type User = {
  name: string | null,
  email: string | null
} | null


// Initialize Firebase

function App() {

  useEffect(()=>{
    if(localStorage.getItem('email') != null || localStorage.getItem('email') != "null"){
      setUser({name:localStorage.getItem("name"),email: localStorage.getItem("email")})
    }
  })

  const [user, setUser] = useState<User>()

  const signIn = () => {
    signInWithPopup(auth, provider).then(
      (result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        console.log(user)
        localStorage.setItem("name",user.displayName ? user.displayName : "null")
        localStorage.setItem("email",user?.email ? user?.email : "null")
        localStorage.setItem("photoUrl",user?.photoURL ? user?.photoURL : "null")
        setUser({name:user.displayName, email: user.email})
  
      }
    ).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
    })
  }

  const logout = () =>{
    localStorage.clear()
    setUser(null)
  }

  const showUser = () => {

    let name = localStorage.getItem('name')
    let email = localStorage.getItem('email')

    return(

    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
    )

  }

  return (

    <>

      <GoogleButton
         onClick={signIn}
      />
      <button onClick={()=>logout()}>
        Logout
      </button>
      {showUser()}
    </>

  );
}

export default App;
