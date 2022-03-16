import { getPlantsCustomURL } from '../../services/plants.service.js';

export function PaginationComponent({ limit, list, callback }) {

    console.log(list);
    const previousPage = () => {
        console.log('Siguiente URL: ', list.prev);

        getPlantsCustomURL(list.prev).then(pl => {
            console.log('La respuesta previa: ',pl);
            callback(pl.plants);
        });
    }
    const nextPage = () => {
        console.log('Siguiente URL: ', list.next);

        getPlantsCustomURL(list.next).then(pl => {
            console.log('La respuesta siguiente: ',pl);
            callback(pl.plants);
        });
    }

    return (
        <>
            <div className="flex between">
                { list.prev ? <button className="btn btn-secondary" onClick={ previousPage }>Pagina anterior</button> : <div></div> }
                { list.next && <button className="btn btn-secondary" onClick={ nextPage }>Pagina siguiente</button> }
            </div>
        </>
    );
}