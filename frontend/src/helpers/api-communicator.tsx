import axios from "axios"

export const loginUser= async(email:string,password:string)=>{
    const res=await axios.post("/user/login",{email,password});
    if(res.status!==200){
        throw  new Error("Unable to login");
    }
    const data=await res.data;
    return data;
};

export const signupUser= async(name:string,email:string,password:string)=>{
    const res=await axios.post("/user/signup",{name,email,password});
    if(res.status!==201){
        throw  new Error("Unable to signup");
    }
    const data=await res.data;
    return data;
};

export const addToPlayList=async(userId:string,imdbid:string)=>{
    const res=await axios.post("/user/addplaylist",{userId,imdbid});
    console.log(userId);
    if(res.status!==201){
        throw  new Error("unable to add to the playlist");
    }
    const data=await res.data;
    return data;
}

export const checkAuthStatus= async()=>{
    const res=await axios.get("/user/auth-status");
    if(res.status!==200){
        throw  new Error("Unable to Authenticate");
    }
    const data=await res.data;
    return data;
};

export const sendChatRequest= async(message:string)=>{
    const res=await axios.post("/chat/new",{message});
    if(res.status!==200){
        throw  new Error("Unable to send chat");
    }
    const data=await res.data;
    return data;
};