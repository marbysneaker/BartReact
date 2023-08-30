import { createContext, useContext} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, getAuth} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    return (
        <UserContext.Provider value={{createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut}}>
            {children}
        </UserContext.Provider>
    )
    
}

export const UserAuth = () => {
    return useContext(UserContext)
}


const createUser = (email, password) =>{
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
        const user = userCredential.user;
        console.log("new user",user);
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
}

const signIn = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
        const user = userCredential.user;
        console.log("Logged in",user);
        }
        )
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        }
        )
}


export default UserContext;
export {createUser, signIn};
