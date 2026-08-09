import axios from 'axios'
import Movie from '../models/Movie.js'
import Show from '../models/Show.js'

// Get 
export const getNowPlayingMovies = async (req, res) => {
    try {
        const {data} = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`}
        });

        const movies = data.results;
        res.json({success: true, movies: movies});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}


// add a new show to db
export const addShow = async (req, res) => {
    try {
        const body = req.body || {};
        const { movieId, showsInput, showPrice } = body;

        if (!movieId || !Array.isArray(showsInput) || showsInput.length === 0 || showPrice === undefined || showPrice === null || showPrice === '') {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields. Expecting movieId, showsInput, and showPrice.'
            });
        }

        let movie = await Movie.findById(movieId);

        if(!movie) {
            // Fetch movie details and credits from TMDB API
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`}
        }),
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`}
        })
            ]);

        const movieApiData = movieDetailsResponse.data;
        const movieCreditData = movieCreditsResponse.data;

        const movieDetails = {
            _id: movieId,
            title: movieApiData.title,
            overview: movieApiData.overview || "",
            poster_path: movieApiData.poster_path || "",
            backdrop_path: movieApiData.backdrop_path || "",
            release_date: movieApiData.release_date || "",
            original_language: movieApiData.original_language || "",
            tagline: movieApiData.tagline || "",
            genres: movieApiData.genres?.map((genre) => genre.name) || [],
            casts: movieCreditData.cast?.slice(0, 10).map((cast) => cast.name) || [],
            vote_average: movieApiData.vote_average ?? 0,
            runtime: movieApiData.runtime ?? 0
        }

        // Add movie to DB
        await Movie.create(movieDetails);
        }

        const showsToCreate = [];
        showsInput.forEach(show => {
            const showDate = show.date;
            show.time.forEach((time) => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                })
            })
        });

        if(showsToCreate.length > 0) {
            await Show.insertMany(showsToCreate);
        }

        res.json({success: true, message: "Show added successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}


// APT to get all shows from DB
export const getShows = async (req, res) => {
    try {
        const shows = await Show.find({showDateTime: {$gte: new Date()}}).populate
        ('movie').sort({showDateTime: 1});

        // filter unique shows
        const uniqueShows = new Set(shows.map(show => show.movie));

        res.json({success: true, shows: Array.from(uniqueShows)});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// APT to get a single show from DB
export const getShow = async (req, res) => {
    try {
        const {movieId} = req.params;
        // get all upcoming
        const shows = await Show.find({movie: movieId, showDateTime: {$gte: new Date()}});

        const movie = await Movie.findById(movieId);
        const datetTime = {};

        shows.forEach((show) => {
            const data = show.showDateTime.toISOString().split("T")[0];
            if(!datetTime[date]) {
                dateTime[date] = [];
            }
            dateTime[date].push({time: show.showDateTime, showId: show._id});

        });
        res.json({success: true, movie, dateTime});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}