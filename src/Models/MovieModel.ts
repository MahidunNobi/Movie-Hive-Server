import mongoose, {Schema} from "mongoose"

const movieSchema = new Schema({
    movie_name: String,
    published_year: Number,
    story: String,
    movie_geners: [String],
    movie_ratting: Number
})

const Movie = mongoose.model("movie", movieSchema);

export default Movie;