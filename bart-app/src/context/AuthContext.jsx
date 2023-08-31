import { createContext, useContext} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, getAuth} from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({});

    const signIn = (email, password) =>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
            const user = userCredential.user;
            setUser(user);
            console.log("Logged in",user);
             } )}
    const createUser = (email, password) =>{
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
            const user = userCredential.user;
            setUser(user);
            console.log("Logged in",user);
                } )}
    const signOut = () => {
        signOut(auth)
    }
    
    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        });
        return()=>{
            unsubscribe();
        }
    })

    



    return (
        <UserContext.Provider value={{createUser, signIn, user, signOut}}>
            {children}
        </UserContext.Provider>
    )
    
}

export const UserAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Components using UserAuth must be wrapped within AuthContextProvider");
    }
    return context;
};

