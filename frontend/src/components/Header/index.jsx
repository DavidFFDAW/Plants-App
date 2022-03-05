import { useState } from 'react';
import { Divide as Hamburger } from 'hamburger-react';
import HeadMenu from './HeadMenu';

export default function Header() {

    const [ isMenuOpened, setOpenMenu ] = useState(false);

    const closeMenu = _ => {
        setOpenMenu(false);
    }

    return (
        <header className="flex between head">
            <div>
                <h1 style={{ margin: 0, color: '#FFF' }}>Plant-App</h1>
            </div>
            <div>
                <Hamburger toggled={ isMenuOpened } color={'#FFF'} toggle={ setOpenMenu } size={30} label="Show Menu" hideOutline={true} rounded />
            </div>
            
            <HeadMenu 
                isOpen={ isMenuOpened } 
                closeMenu={ closeMenu }
            />
        </header>
    );
}