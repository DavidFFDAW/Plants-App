import { useEffect, useState } from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { Link } from 'react-router-dom';
import { apiURL } from '../constants/config'

export default function PlantAdminList () {
    const [plants, setPlants] = useState([]);

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
            <ContentContainer title="Admin Listado">
                { plants.map(it => (
                    <div key={it.id} className="box flex between">
                        <p>{ it.name }</p>
                        <p>{ it.location }</p>
                        <p>{ it.created_at }</p>
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