import { Link } from 'react-router-dom';
import { FaImages, FaSearch, FaHome, FaPlusSquare } from 'react-icons/fa';


export default function HeadMenu ({ isOpen, closeMenu }) {
    
    return (
        <>
            { isOpen && <div className="head-menu">
                    <Link to={ '/' } className="link" onClick={closeMenu}><FaHome/> Home</Link>
                    <Link to={ '/plant/searcher' } className="link" onClick={closeMenu}><FaSearch/> Buscar</Link>
                    <Link to={ '/plant/gallery' } className="link" onClick={closeMenu}><FaImages/> Galería</Link>
                    <Link to={ '/plant/create/new' } className="link" onClick={closeMenu}><FaPlusSquare/> Crear Planta</Link>
            </div> }
        </>
    );
}