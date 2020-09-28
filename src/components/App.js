import React,{ useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';

function App() {
    const [init,setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
      authService.onAuthStateChanged((user)=>{
        console.log(user)
        if(user){
          setIsLoggedIn(true);
          setUserObj({
            displayName : user.displayName,
            uid:user.uid,
            updateProfile: (arg) => user.updateProfile(arg)
          });
        }else{
          setUserObj(null);
          setIsLoggedIn(false);
        }
        setInit(true)
      })
    }, [])
    const refreshUser = () =>{
      const user = authService.currentUser;
      setUserObj({
        displayName : user.displayName,
        uid:user.uid,
        updateProfile: (arg) => user.updateProfile(arg)
      });
    }
  return (
  <>
    {init? <AppRouter refreshUser={refreshUser} isLoggedIn ={isLoggedIn} userObj ={userObj}/> : "Initializing...."}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
  );
}

export default App;
