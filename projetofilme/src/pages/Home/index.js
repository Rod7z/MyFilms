import { useEffect, useState } from "react";
import api from '../../services/api'
import { Link } from 'react-router-dom';
import './home.css';

// URL DA API: movie/now_playing?api_key=1ee00a9aabf892b7b93a652c4a443991&language=pt-BR

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilmes(){
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: '1ee00a9aabf892b7b93a652c4a443991',
                    language: 'pt-BR',
                    page: 1,
                }
            })
            //console.log(response);
            setFilmes(response.data.results.slice(0, 15));
            setLoading(false);
        }

        loadFilmes();

    }, [])


    if(loading){
        return(
            <div className="loading" >
                <h2>Carregando filmes...</h2>
            </div>
        );
    }

    return(
        <div className="container">
            <h1>Em cartaz:</h1>
            <div className="lista-filmes" >
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id} >
                            <strong>{filme.title}</strong><br/>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                        <Link to={`/filme/${filme.id}`} >Descubra mais</Link>
                        </article>
                    )
                })}
            </div>
        </div>

    );
}

export default Home;