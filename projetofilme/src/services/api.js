import axios from 'axios';


// Base da URL: https://api.themoviedb.org/3/
// URL DA API: movie/now_playing?api_key=1ee00a9aabf892b7b93a652c4a443991&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;