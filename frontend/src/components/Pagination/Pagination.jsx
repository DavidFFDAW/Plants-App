import { useState } from 'react';
import { getPlantsCustomURL } from '../../services/plants.service.js';

export function PaginationComponent({ limit, list, callback }) {

    const [ off, setOff ] = useState({ show: true, offset: list.plants.length });

    console.log(list);
    const previousPage = () => {
        console.log('Siguiente URL: ', list.prev);

        getPlantsCustomURL(list.prev).then(pl => {
            console.log('La respuesta previa: ', pl);
            callback(pl);
            window.scrollTo({ top: 0, behavior: 'smooth' })
        });
    }
    const nextPage = () => {
        console.log('Siguiente URL: ', list.next);
        if (+list.next.replace('http://vps-f87b433e.vps.ovh.net/plants/api/getPlants.php?limit=10&offset=','') > off.offset) {
            setOff({ show: false });
        }

        getPlantsCustomURL(list.next).then(pl => {
            console.log('La respuesta siguiente: ', pl);
            callback(pl);
            window.scrollTo({ top: 0, behavior: 'smooth' })
        });
    }

    return (
        <>
            <div className="down flex between">
                { list.prev ? <button className="btn btn-secondary" onClick={ previousPage }> &lt; </button> : <div></div> }
                { off.show && <button className="btn btn-secondary" onClick={ nextPage }> &gt; </button> }
            </div>
        </>
    );
}