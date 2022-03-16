import { getPlantsCustomURL } from '../../services/plants.service.js';

export function PaginationComponent({ limit, list, baseUrl, offset, setOffset, callback }) {

    const previousPage = () => {
        getPlantsCustomURL(list.prev).then(pl => callback(pl));
    }
    const nextPage = () => {
        getPlantsCustomURL(list.prev).then(pl => callback(pl));
    }

    return (
        <>
            <div className="flex between"></div>
            { list.prev ? <button className="btn btn-secondary" onClick={ previousPage }>Pagina anterior</button> : <div></div> }
            { list.next && <button className="btn btn-secondary" onClick={ nextPage }>Pagina siguiente</button> }
        </>
    );
}