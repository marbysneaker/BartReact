import { createContext, useContext} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, getAuth} from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import {setDoc, doc} from 'firebase/firestore'
import {db} from '../firebase'

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({});

    const signIn = (email, password) =>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
            const user = userCredential.user;
            setUser(user);
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                uid: user.uid,
                favorites: []
            })



            console.log("Logged in",user);
             } )}
    const createUser = (email, password) =>{
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
            const user = userCredential.user;
            setUser(user);
            setDoc(doc(db, "users",email), {
                favorites: []
            })
            console.log("Logged in",user);
                } )}    


                
    const logOut = () => {
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
        <UserContext.Provider value={{createUser, signIn, user, logOut}}>
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

