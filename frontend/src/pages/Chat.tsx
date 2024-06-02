import { Box,Avatar,Button } from '@mui/material'
import React, {   useEffect, useLayoutEffect, useRef  } from 'react'
import { useAuth } from '../context/AuthContext'
import CustomizedInput from '../components/shared/CustomizedInput';
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

interface MovieDetails {
    Title: string;
    Year: string;
    Released: string;
    Genre: string;
    Runtime: string;
    Actors: string;
    Writer: string;
    Language: string;
    Poster: string;
    imdbRating: string;
    Plot: string;
    Country: string;
    Response: string;
  }


const Chat = () => {
    const navigate = useNavigate();
  const auth=useAuth();
  let Name=" "
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); 
    const formData =new FormData(e.currentTarget);
    const name=formData.get("movie-name") as string;
    try{
        toast.success("Searching movie",{id:"search"});
        const result = await fetch(`https://www.omdbapi.com/?t=${(name)}&apikey=54af7829`);
        const MovieDetails = await result.json();
          showDetails(MovieDetails);
          // handleSubmit1(MovieDetails);
        toast.success("movie found",{id:"Ok"});
      }catch(error){
        console.log(error);
         toast.error("movie not found",{id:"no"});
      }
    
};
const handleAddToPlaylist =async (movieData: { imdbID: any; })=>{
    const userid = await auth?.user?.name||"";
    console.log(userid);
    const imdbID= movieData.imdbID;
    try{
      await auth?.addPlayList(userid,imdbID);

      toast.success("added to playlist",{id:"Ok"});
    }catch(error){
      console.log(error);
       toast.error("failed to add to playlist",{id:"no"});
    }
};
useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

const showDetails = (info: MovieDetails) => {
    const result = document.getElementById('result');
    if (result) {
      if (info.Response === 'True') {
        result.innerHTML = `
        <style>
       
        
        .wrapper {
          display: flex;
          background-color: #000;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .movie-poster img {
          max-width: 200px;
          border-radius: 10px;
          margin-right: 20px;
        }
        
        .info {
          display: flex;
          flex-direction: column;
          width: 100%;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .info 2{
          display: flex;
          flex-direction: column;
          width: 100%;
          justify-content: space-between;
          flex-wrap: wrap;
          margin: 5px 0;
        }
        .movie-title {
          font-size: 24px;
          margin: 0 0 10px 0;
          // display: flex;
          // flex-wrap: wrap;
        }
        
        .movie-info {
          list-style: none;
          padding: 0;
          margin: 0;
          // display: flex;
          // flex-wrap: wrap;
          
        }
        
        .movie-info li {
          margin: 5px 0;
          display: flex;
          flex-wrap: wrap;

        }
        
        .movie-info-1,
        .movie-info-2,
        .movie-info3 {
          display: flex;
         flex-wrap: wrap;
         
        }
        .movie-info li,
    .movie-info-2 p,
    .movie-info3 p{
        margin: 5px 0;
    }
        .line1 {
          font-weight: bold;
        }
        
        .line2 {
          margin-left: 10px;
        }
        
        </style>
          <div class="wrapper">
            <div class="movie-poster">
              <img src="${info.Poster}" alt="Loading..." >
            </div>
         
          <div class="info">
            <div class="movie-info-1">
              <h1 class="movie-title">Name of a Movie : ${info.Title}</h1>
              
            </div>
           <div class="info2">
           <ul class="movie-info">
           <li class="line line1">Year: ${info.Year}</li>
           <li class="line line1">Released: ${info.Released}</li>
           <li class="line line1">Country: ${info.Country}</li>
         </ul>
           </div>
            <div class="movie-info-2">
           
              <p class="genre">
                <span class="line line1">Genre:</span> 
                <span class=" line line2">${info.Genre}</span><br>
              </p>
             
              <p class="actors">
                <span class="line line1">Actors: </span>
                <span class="line line2">${info.Actors}</span>
              </p>
              <p class="writers">
                <span class="line line1">Writer: </span>
                <span class="line line2">${info.Writer}</span>
              </p>
              <p class="language">
                <span class="line line1">Language:</span>
                <span class="line line2">${info.Language}</span>
              </p>
              
              
             
            </div>
            <div class="movie-info3">
            <p class="imdbRating">
                <span class="line line1">IMDB Rating:</span>
                <span class="line line2">${info.imdbRating}</span>
              </p>
              </div>
          
            <Button onClick={(handleAddToPlaylist(info))} >add to playlist</Button>
         
          </div> 
          </div>
         
        `;
      } else {
        throw new Error("Movie not found");
        handleAddToPlaylist;
      }
    }
  };

 
  return (
    <div >
    <main>
        <div >
          <form onSubmit={(handleSubmit)}>
            <CustomizedInput type="text" name="movie-name" label="Type Movie Name"/>
            <Button type="submit" sx={{px:2,py:2,mt:2,width:"40px",height:"60px",borderRadius:2,bgcolor:"#00fffc",margin:'noraml', marginTop:0.1,
              ":hover":{
                bgcolor:"white",
                color:"black"
              },
            }}
            
            ><FaSearch size={20}/></Button>
            </form>
        </div>
    </main>
    <div id="result"></div>
    </div>
   
  );
};

<script src="..\script\script.js"></script>
export default Chat
