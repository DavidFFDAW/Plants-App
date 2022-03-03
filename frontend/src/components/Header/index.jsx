// import leaf from '../../leaf.png';
import { Link } from "react-router-dom";

export default function Header() {

    // const [search, setSearch] = useState('');

    return (
        <header className="flex center head">
            <div>
                {/* <img src={ leaf } alt="" width="30" height="30"/> */}
                <Link to="/plant/create/new" className='btn btn-principal-static'>Crear nueva planta</Link>
                <Link to="/plant/gallery" className='btn btn-principal-static'>Gallery</Link>
            </div>

            {/* <div className="last input-div">
                <input className="text-search" type="text" value={ search } placeholder="Senecio Silvery" onChange={ ev => setSearch(ev.target.value) } />
                <button className="btn btn-search" type="button">Buscar</button>
            </div> */}
        </header>
    );
}