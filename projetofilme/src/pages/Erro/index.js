import { Link } from "react-router-dom";
import './erro.css'

function Erro(){
    return(
        <div className="not-found" >
            <h1>404</h1>
            <h2>Ops! Não encontramos essa página.</h2>
            <Link to='/' >Voltar a página inicial</Link>
        </div>
    );
}

export default Erro;