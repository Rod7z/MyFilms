import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: '',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();


        return() => {           
            console.log(`Componente foi desmontado!!!`)
        }
    }, [navigate, id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@myfilms");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme já está na lista!!!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@myfilms", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!!!")

    }

    if(loading){
        return(
            <div className='filme-info' >
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return(
        <div className='filme-info' >
            <div className='title-filme'>
                <Link to='/'><FontAwesomeIcon icon={faLeftLong} /></Link>
                <h1>{filme.title}</h1>
            </div>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse:</h3>
            <span>{filme.overview}</span>
            
            <strong>Avaliação: {filme.vote_average.toFixed(2)} / 10</strong>

            <div className='area-buttons' key={filme.id}>
                
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    );
}

export default Filme;
