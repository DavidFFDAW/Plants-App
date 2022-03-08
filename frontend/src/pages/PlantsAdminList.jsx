import { useEffect, useState } from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { Link } from 'react-router-dom';
import { apiURL } from '../constants/config'

export default function PlantAdminList () {
    const [plants, setPlants] = useState([]);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(_ => {
        fetch(`${ apiURL }getPlants.php?`)
        .then(res => res.json())
        .then(res => {
              if ( res.error ) {
                    alert(res.message);
                    return 0;
              }
              setPlants(res.plants);
        });
    }, []);

    return (
        <>
            <ContentContainer title="LISTADO ADMIN" center={false} extraCss={ { width: '90%', margin: '0 auto' } }>
                { plants.map(it => (
                    <div key={it.id} className="box flex between" style={{ width: '100%', boxSizing: 'border-box', margin: '20px 0' }}>
                        <p>{ it.name }</p>
                        <p>{ it.location }</p>
                        <p>{ new Date(it.created_at).toLocaleDateString('es-ES', options) }</p>
                        <div className="flex between">
                            <Link to={`/plant/update/${it.id}`} className="btn btn-secondary-static">Editar</Link>
                            <Link to={`/plant/delete/${it.id}`} className="btn btn-principal-static">Borrar</Link>
                        </div>
                    </div>
                )) }
            </ContentContainer>
        </>
    )
}