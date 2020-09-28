import { dbService } from 'fbase';
import React, { useState, useEffect } from 'react';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({userObj}) =>{
    const [nweets,setNweets] = useState([]);
    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot)=>{
            const nweetArr = snapshot.docs.map(doc=>({id:doc.id,...doc.data()}))
            setNweets(nweetArr)
        })
    }, [])
    return ( <div>
        <NweetFactory userObj={NweetFactory}/>
        <div>
            {nweets.map(nweet=>(
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid}/>
            ))}
        </div>
    </div>)}


 export default Home;