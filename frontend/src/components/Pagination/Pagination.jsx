// import { useState } from 'react';
import { ROUTES } from '../../constants/routes';
import { paginate } from '../../services/plants.service';

export function PaginationComponent({ limit, callback, plants, page, redirector, offset }) {

    const nextButton = () => plants.original.length > page * limit;

    const next = () => {
        if (page * limit < plants.original.length) {
            const paginated = paginate(plants.original, limit, offset + limit);
            plants.current = paginated;
            callback(plants);
            redirector.replace(`${ROUTES.plants}${+page + 1}`);
        }
    }
    const prev = () => {
        if (page > 1) {
            const paginated = paginate(plants.original, limit, offset - limit);
            plants.current = paginated;
            callback(plants);
            redirector.replace(`${ROUTES.plants}${+page - 1}`);
        }
    }

    return (
        <>
            <div className="down flex between">
                { page > 1 ? <button className="btn btn-secondary" onClick={ prev }> &lt; </button> : <div></div> }
                <div>Pagina: { page }</div>
                { nextButton() ? <button className="btn btn-secondary" onClick={ next }> &gt; </button> : <div></div> }
            </div>
        </>
    );
}