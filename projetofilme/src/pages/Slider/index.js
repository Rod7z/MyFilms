import { useEffect, useState } from "react";
import api from '../../services/api'
import { Link } from 'react-router-dom';
import './slider.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import 'swiper/css/scrollbar';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";

import Footer from '../../components/Footer'

// URL DA API: movie/now_playing?api_key=1ee00a9aabf892b7b93a652c4a443991&language=pt-BR

function Slider(){
    const [filmes, setFilmes] = useState([]);
    const [bestFilms, setBestFilms] = useState([]);
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
            setFilmes(response.data.results.slice(0, 16));
            setLoading(false);
        }

        loadFilmes();

    }, [])

    useEffect(() => {

        async function loadBestFilms(){
            const response = await api.get('movie/top_rated', {
                params:{
                    api_key: '1ee00a9aabf892b7b93a652c4a443991',
                    language: 'pt-BR',
                    page: 1,
                }
            })

            setBestFilms(response.data.results.slice(0, 16));
            setLoading(false);
        }

        loadBestFilms();

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
            <h1>Filmes em cartaz:</h1>

            <Swiper className="swiper"
                slidesPerView={8}
                spaceBetween={0}
                breakpoints={{ /*width tela: Xpx{
                    slidesPerView: x,
                    spaceBetween: x,
                    }*/
                }}
                loop={true}
                navigation={true}
                modules={[Navigation]}
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
            
            <h1>Top Filmes:</h1>

            <Swiper className="swiper"
                slidesPerView={8}
                spaceBetween={0}
                breakpoints={{ /*width tela: Xpx{
                    slidesPerView: x,
                    spaceBetween: x,
                    }*/
                }}
                loop={true}
                navigation={true}
                modules={[Navigation]}
            >
                    {bestFilms.map((bestFilmes) => (
                        <SwiperSlide key={bestFilmes.id}>
                            <img 
                                src={`https://image.tmdb.org/t/p/original/${bestFilmes.poster_path}`} 
                                alt={bestFilmes.title} 
                                className="slide-image"
                            />
                        </SwiperSlide>                    
                    ))}
            </Swiper>
            
            <Footer></Footer>
        </div>

    );
}

export default Slider;