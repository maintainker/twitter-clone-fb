import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default ({refreshUser,userObj}) => {
    const histroy = useHistory ();
    const [newDisplayName, setDisplayName] =useState(userObj.displayName? userObj.displayName:"")
    const onLogOutClick = () => {
        authService.signOut();
        histroy.push("/");
    };
    const onChange =(e)=>{
        const {target:{value}}= e;
        setDisplayName(value);
    }
    const getMyNweets = async () =>{
        const nweets = await dbService.collection("nweets")
        .where("creatorId","==",userObj.uid)
        .orderBy("createdAt")
        .get();
        console.log(nweets.docs.map(doc=>doc.data()))
    }
    useEffect(()=>{
        getMyNweets();
    },[]);
    const onSubmit = async (e)=>{
        e.preventDefault()
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName :newDisplayName
            })
        }
        refreshUser();
    }
    return <>
        <form onSubmit={onSubmit}>
            <input type="text" value={newDisplayName} onChange={onChange} placeholder="Display name" />
            <input type="submit"  value="Update Profile" />
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
}