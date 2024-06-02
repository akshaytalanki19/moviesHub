import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import { checkAuthStatus, loginUser,signupUser } from '../helpers/api-communicator';

type User ={
    name:string;
    email:string;
}

type playList={
  userid:string;
  imdbid:string;
}

type UserAuth={
    isLoggedIn: boolean;
    user:User|null;
    login:(email:string,password:string)=>Promise<void>;
    signup:(name:string,email:string,password:string)=>Promise<void>;
    logout:()=>Promise<void>
    addPlayList:(userid:string,imdbid:string)=>Promise<void>;
}
const AuthContext =createContext<UserAuth |null>(null);
export const AuthProvider=({children}:{children:ReactNode})=>{
  const [user,setUser]=useState<User |null>(null);
  const [isLoggedIn,setIsloggedIn]= useState(false);
  
  useEffect(()=>{
    //fetch if the user's cookies are valid then skip login
    async function checkStatus(){
      const data=await checkAuthStatus();
      if(data){
        setUser({email:data.email,name:data.name});
        setIsloggedIn(true);
      }
    }
    checkStatus();
  },[]);
  const login=async(email:string,password:string)=>{
    const data=await loginUser(email,password);
    if(data){
      setUser({email:data.email,name:data.name});
      setIsloggedIn(true);
    }
  };
  const signup=async(name:string,email:string,password:string)=>{
    const data=await signupUser(name,email,password);
    if(data){
      setUser({email:data.email,name:data.name});
      setIsloggedIn(true);
    }
  };
  const logout=async()=>{};
  
   const addPlayList=async(userid:string,imdbID:string)=>{
    const data=await addPlayList(userid,imdbID);
   };
  const value={
    user,isLoggedIn,login,logout,signup,addPlayList,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth=()=>useContext(AuthContext);