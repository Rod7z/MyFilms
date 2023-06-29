import { useEffect, useState } from "react";
import api from '../../services/api'
import { Link } from 'react-router-dom';
import './slider.css';

import { Swiper, SwiperSlide } from 'swiper/react'

// URL DA API: movie/now_playing?api_key=1ee00a9aabf892b7b93a652c4a443991&language=pt-BR

function Slider(){
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
            <h1>Slider com React JS - Swiper</h1>

            <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
            >    
                    {filmes.map((filme) => (
                        <SwiperSlide key={filme.id}>
                            <img 
                                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} 
                                alt={filme.title} 
                                className="slide-image"
                            />
                        </SwiperSlide>                    
                    ))}
            </Swiper>
        </div>

    );
}

export default Slider;