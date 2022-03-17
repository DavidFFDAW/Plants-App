import { useState } from 'react';
import { Divide as Hamburger } from 'hamburger-react';
import HeadMenu from './HeadMenu';
import useAuth from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';

export default function Header() {

    const [ isMenuOpened, setOpenMenu ] = useState(false);
    const { isLogged, logout } = useAuth();
    const url = useLocation();
    const hist = useHistory();

    const closeMenu = _ => {
        setOpenMenu(false);
    }

    const handleLogout = () => {
        logout();
        closeMenu();
        hist.push('/login');
    }

    const getButtonOrName = () => {
        if (url.pathname !== '/') {
            return <button className='btn' onClick={ _ => hist.goBack() }>&lt;</button>
        }
        return <h1 style={{ margin: 0, color: '#FFF' }}>Plant-App</h1>
    }


    return (
        <header className="flex between head">
            <div>
                { getButtonOrName() }
            </div>
            <div style={{ margin: 0, color: '#FFF', fontSize: 20, letterSpacing: 2 }}>v 1.2.0</div>
            <div>
                <Hamburger toggled={ isMenuOpened } color={'#FFF'} toggle={ setOpenMenu } size={30} label="Show Menu" hideOutline={true} rounded />
            </div>
            
            <HeadMenu 
                isOpen={ isMenuOpened } 
                closeMenu={ closeMenu }
                logged={ isLogged }
                handleLogout={ handleLogout }
            />
        </header>
    );
}