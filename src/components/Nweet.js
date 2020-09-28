import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';

const Nweet = ({nweetObj,isOwner}) =>{
    const [editing ,setEditing] =useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () =>{
        const ok = window.confirm("Are you sure you want to delete this nweet?")
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }
    const toggleEditClick = () =>{
        setEditing(prev => !prev)
    }
    const onChangeNewNweet = (e) =>{
        const {target:{value}} = e;
        setNewNweet(value);
    }
    const onSubmit =async (e)=>{
        e.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        })
        setEditing(false);
    }
    return(
    <div>{
        editing? (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What is your nweet?" onChange={onChangeNewNweet} value={newNweet} required/>
                <input type="submit" value="Update Nweet"/>
            </form>
            <button onClick={toggleEditClick}>Cancel</button>
        </>
        ):
        <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="느위트 사진"/>}
            {isOwner &&
            <>
                <button onClick={onDeleteClick}>Delete Nweet</button>
                <button onClick={toggleEditClick}>Edit Nweet</button>
            </>}
        </>
        }
    </div>);
}
export default Nweet;