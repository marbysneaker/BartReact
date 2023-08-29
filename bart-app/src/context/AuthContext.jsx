import { createContext } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";

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

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
    const user = userCredential.user;
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    })

export default UserContext;
