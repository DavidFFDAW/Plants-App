import { Link } from 'react-router-dom';

export default function HeadMenu ({ isOpen, closeMenu }) {
    
    return (
        <>
            { isOpen && <div className="head-menu">
                    <Link to={ '/' } className="link" onClick={closeMenu}>Home</Link>
                    <Link to={ '/plant/searcher' } className="link" onClick={closeMenu}>Buscar</Link>
                    <Link to={ '/plant/gallery' } className="link" onClick={closeMenu}>Galería</Link>
                    <Link to={ '/plant/create/new' } className="link" onClick={closeMenu}>Crear Planta</Link>
            </div> }
        </>
    );
}