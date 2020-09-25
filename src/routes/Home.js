import { dbService } from 'fbase';
import React, { useState, useEffect } from 'react';

const Home = () =>{
    const [nweet, setNweet] = useState("");
    const [nweets,setNweets] = useState([]);
    const getNweets = async () =>{
        
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach(doc=>{
            const nweets
            setNweets(prev => [doc.data(),...prev]);
        });
    }
    useEffect(() => {
        getNweets();
    }, [])
    const onSubmit = async (e) =>{
        e.preventDefault();
        await dbService.collection("nweets").add({
        nweet,
        createdAt : Date.now(),
        });
        setNweet("")
    }
    const onChange = (e) =>{
        const {target:{value}} = e;
        setNweet(value);
    }
    console.log(nweets);
    return ( <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
            <input type="submit" value="Nweet"/>
        </form>
    </div>)}


 export default Home;