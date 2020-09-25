import { authService,firebaseInstance } from 'fbase';
import React, { useState } from 'react';
const Auth =  () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccout, setNewAcount] = useState(true);
    const [error, setError] =useState("");
    const onChange = (e) =>{
        const {target:{name,value}} = e;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async e =>{
        e.preventDefault();
        try{
            let data;
            if(newAccout){
                data = await authService.createUserWithEmailAndPassword(email,password);
            }else{
                data = await authService.signInWithEmailAndPassword(email,password);
            }
            console.log(data);
        }catch(e){
            setError(e.message)
            console.log("error", e.message);
        }
    }

    const toggleAccount = () =>{
        setNewAcount(prev => !prev)
    }
    const onSocialClick = async (e)=>{
        const {target:{name}} = e;
        let provider ;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data)
    }
    return (<div>
        <form onSubmit ={onSubmit}>
            <input type="email" name="email" placeholder="Email" required value={email} onChange={onChange}/>
            <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccout? "Create Account": "Log In"}/>
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccout? "Lon in": "Create Account"}</span>
        <div>
            <button onClick={onSocialClick} name="google">Continue With Google</button>
            <button onClick={onSocialClick} name="github">Continue With Github</button>
        </div>
    </div>);
}

 
export default Auth;