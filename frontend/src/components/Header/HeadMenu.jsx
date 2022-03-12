import { Link } from 'react-router-dom';
import { FaImages, FaSearch, FaHome, FaPlusSquare } from 'react-icons/fa';
import { RiDashboard2Line } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';


export default function HeadMenu ({ isOpen, closeMenu, logged, handleLogout }) {
    
    return (
        <>
            { isOpen && <div className="head-menu">
                    <Link to={ '/' } className="link" onClick={closeMenu}><FaHome/> Home</Link>
                    <Link to={ '/plant/searcher' } className="link" onClick={closeMenu}><FaSearch/> Buscar</Link>
                    <Link to={ '/plant/gallery' } className="link" onClick={closeMenu}><FaImages/> Galería</Link>
                    <Link to={ '/plant/create/new' } className="link" onClick={closeMenu}><FaPlusSquare/> Crear Planta</Link>
                    <Link to={ '/admin/plants' } className="link" onClick={closeMenu}><RiDashboard2Line/> Admin</Link>
                    { logged && <button className="link" onClick={handleLogout}><BiLogOut/> Logout</button> }
            </div> }
        </>
    );
}