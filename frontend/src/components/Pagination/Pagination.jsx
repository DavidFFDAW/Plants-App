import { useState } from 'react';
import { getPlantsCustomURL } from '../../services/plants.service.js';

export function PaginationComponent({ limit, list, callback, redirector, page }) {

    const [ off, setOff ] = useState({ show: true, offset: list.plants.length });

    const previousPage = _ => {
        const nextPage = `/${ page + 1}`;
        redirector.push(nextPage);
    }

    
    console.log(list);
    const previousPage = () => {
        const nextPage = `/${ page + 1}`;
        redirector.push(nextPage);
        
    }
    const nextPage = () => {
        if (+list.next.replace(`http://vps-f87b433e.vps.ovh.net/plants/api/getPlants.php?limit=${ limit }&offset=`,'') > off.offset * off.currentPage) {
            setOff({ show: false });
        }
        redirector.push(`/${ +page + 1}`);
    }
    

    return (
        <>
            <div className="down flex between">
                { list.prev ? <button className="btn btn-secondary" onClick={ previousPage }> &lt; </button> : <div></div> }
                <div>Pagina: { page }</div>
                { off.show && <button className="btn btn-secondary" onClick={ nextPage }> &gt; </button> }
            </div>
        </>
    );
}