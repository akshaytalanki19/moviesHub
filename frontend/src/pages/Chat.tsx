import { Box, Avatar, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CustomizedInput from '../components/shared/CustomizedInput';
import { toast } from 'react-hot-toast';
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
    imdbID: string;
}

const Chat = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("movie-name") as string;
        try {
            toast.success("Searching movie", { id: "search" });
            const result = await fetch(`https://www.omdbapi.com/?t=${name}&apikey=54af7829`);
            const movieDetails = await result.json();
            setMovieDetails(movieDetails);
            toast.success("Movie found", { id: "Ok" });
        } catch (error) {
            console.log(error);
            toast.error("Movie not found", { id: "no" });
        }
    };

    const handleAddToPlaylist = async (movieData: { imdbID: string }) => {
        const userId = auth?.user?.email || "";
        const imdbID = movieData.imdbID;
        try {
            await auth?.addPlayList(userId, imdbID);
            toast.success("Added to playlist", { id: "Ok" });
        } catch (error) {
            console.log(error);
            toast.error("Failed to add to playlist", { id: "no" });
        }
    };

    useEffect(() => {
        if (!auth?.user) {
            navigate("/login");
        }
    }, [auth, navigate]);

    return (
        <div>
            <main>
                <div>
                    <form onSubmit={handleSubmit}>
                        <CustomizedInput type="text" name="movie-name" label="Type Movie Name" />
                        <Button type="submit" sx={{
                            px: 2, py: 2, mt: 2, width: "40px", height: "60px", borderRadius: 2, bgcolor: "#00fffc", margin: 'normal', marginTop: 0.1,
                            ":hover": {
                                bgcolor: "white",
                                color: "black"
                            },
                        }}>
                            <FaSearch size={20} />
                        </Button>
                    </form>
                </div>
            </main>
            {movieDetails && movieDetails.Response === 'True' ? (
                <div className="wrapper">
                    <style>
                        {`
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
                        .info2 {
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
                        }
                        .movie-info {
                            list-style: none;
                            padding: 0;
                            margin: 0;
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
                        .movie-info3 p {
                            margin: 5px 0;
                        }
                        .line1 {
                            font-weight: bold;
                        }
                        .line2 {
                            margin-left: 10px;
                        }
                        `}
                    </style>
                    <div className="movie-poster">
                        <img src={movieDetails.Poster} alt="Loading..." />
                    </div>
                    <div className="info">
                        <div className="movie-info-1">
                            <h1 className="movie-title">Name of a Movie: {movieDetails.Title}</h1>
                        </div>
                        <div className="info2">
                            <ul className="movie-info">
                                <li className="line line1">Year: {movieDetails.Year}</li>
                                <li className="line line1">Released: {movieDetails.Released}</li>
                                <li className="line line1">Country: {movieDetails.Country}</li>
                            </ul>
                        </div>
                        <div className="movie-info-2">
                            <p className="genre">
                                <span className="line line1">Genre:</span>
                                <span className="line line2">{movieDetails.Genre}</span><br />
                            </p>
                            <p className="actors">
                                <span className="line line1">Actors: </span>
                                <span className="line line2">{movieDetails.Actors}</span>
                            </p>
                            <p className="writers">
                                <span className="line line1">Writer: </span>
                                <span className="line line2">{movieDetails.Writer}</span>
                            </p>
                            <p className="language">
                                <span className="line line1">Language:</span>
                                <span className="line line2">{movieDetails.Language}</span>
                            </p>
                        </div>
                        <div className="movie-info3">
                            <p className="imdbRating">
                                <span className="line line1">IMDB Rating:</span>
                                <span className="line line2">{movieDetails.imdbRating}</span>
                            </p>
                        </div>
                        <Button onClick={() => handleAddToPlaylist(movieDetails)}>Add to Playlist</Button>
                    </div>
                </div>
            ) : (
                movieDetails && <p>Movie not found</p>
            )}
        </div>
    );
};

export default Chat;
