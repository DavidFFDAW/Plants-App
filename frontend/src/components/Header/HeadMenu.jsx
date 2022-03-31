import { Link } from 'react-router-dom';
import { FaImages, FaSearch, FaHome, FaPlusSquare } from 'react-icons/fa';
import { RiDashboard2Line } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';
import { GoGear } from 'react-icons/go';
import { ROUTES } from '../../constants/routes';


export default function HeadMenu ({ isOpen, closeMenu, logged, handleLogout }) {

    const logoutClickEvent = ev => {
        ev.preventDefault();
        handleLogout();
    }
    
    return (
        <>
            { isOpen && <div className="head-menu">
                    <Link to={ ROUTES.home } className="link" onClick={closeMenu}><FaHome/> Home</Link>
                    <Link to={ ROUTES.search } className="link" onClick={closeMenu}><FaSearch/> Buscar</Link>
                    <Link to={ ROUTES.gallery } className="link" onClick={closeMenu}><FaImages/> Galería</Link>
                    <Link to={ ROUTES.configs } className="link" onClick={closeMenu}><GoGear/> Configuración</Link>
                    <label className="label-adm">Admins</label>
                    <Link to={ ROUTES.create } className="link" onClick={closeMenu}><FaPlusSquare/> Crear Planta</Link>
                    <Link to={ ROUTES.admin } className="link" onClick={closeMenu}><RiDashboard2Line/> Admin</Link>
                    <Link to={ ROUTES.searchs } className="link" onClick={closeMenu}><FaSearch/> Búsquedas</Link>
                    { logged && <Link className="link" to={'#'} onClick={ logoutClickEvent }><BiLogOut/> Logout</Link> }
            </div> }
        </>
    );
}