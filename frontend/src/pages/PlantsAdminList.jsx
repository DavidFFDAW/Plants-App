import { useEffect, useState } from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { Link } from 'react-router-dom';
import { apiURL } from '../constants/config'
import { formatDate } from '../services/date.services';

export default function PlantAdminList () {
    const [plants, setPlants] = useState([]);    

    useEffect(_ => {
        fetch(`${ apiURL }getPlants.php`)
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
                <div className="box flex between" style={{ width: '100%', boxSizing: 'border-box', margin: '10px 0px', padding: '0px 26px', background: '#7fad64', color: '#fff' }}>
                        <p style={{ width: '50%', color: '#FFF', fontWeight: 700 }}>NOMBRE</p>
                        <p style={{ width: '55%', color: '#FFF', fontWeight: 700 }}>LOCALIZACION</p>
                        <p style={{ width: '65%', color: '#FFF', fontWeight: 700 }}>FECHA CREACIÓN</p>
                        <div style={{ width: '25%', color: '#FFF', fontWeight: 700 }}>
                            <p style={{ color: '#FFF', fontWeight: 700 }}>ACCIONES</p>
                        </div>
                </div>
                { plants.map(it => (
                    <div key={it.id} className="box flex between" style={{ width: '100%', boxSizing: 'border-box', margin: '20px 0' }}>
                        <p>{ it.name }</p>
                        <p>{ it.location }</p>
                        <p>{ formatDate(it.created_at) }</p>
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