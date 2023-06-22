import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons';

function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem("@myfilms");
        setFilmes(JSON.parse(minhaLista) || [])

    },[])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (item) => {
            return(item.id !== id);
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@myfilms", JSON.stringify(filtroFilmes) )
        toast.success("Filme removido com sucesso!!!")
    }

    return(
        <div className='meus-favoritos' >

            {filmes.length >= 1 &&  <h1>Favoritos <FontAwesomeIcon icon={faHeart} style={{color:'#e74c3c'}}/></h1>}

            {filmes.length === 0 && <span className='aviso'>Você não possui nenhum filme favorito!!! <Link className='homePage' to={"/"} >Voltar a página inicial</Link></span>}

            <ul>
                {filmes.map((item) => {
                    return(
                            <li key={item.id} >
                                <span>{item.title}</span>
                                <div>
                                    <Link to={`/filme/${item.id}`} >Ver detalhes</Link>
                                    <button onClick={() => excluirFilme(item.id)}>
                                        <FontAwesomeIcon icon={faX} style={{color: "fff" }} />
                                    </button>
                                </div>
                            </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Favoritos;