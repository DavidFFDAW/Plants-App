import { useEffect, useState } from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { Link } from 'react-router-dom';
import { apiURL } from '../constants/config'
import { formatDate } from '../services/date.services';
import { deletePlant } from '../services/plants.service';
import { BiSearchAlt2 } from 'react-icons/bi';

export default function PlantAdminList ({ showAlert }) {
    const [plants, setPlants] = useState([]); 
    const [originalPlants, setOriginalPlants] = useState([]); 

    useEffect(_ => {
        fetch(`${ apiURL }getPlants.php`)
        .then(res => res.json())
        .then(res => {
              if ( res.error ) {
                    alert(res.message);
                    return 0;
              }
              setPlants(res.plants);
              setOriginalPlants(res.plants);
        });
    }, []);

    const deleteThisPlant = id => {
        deletePlant(id).then(resp => {
            if (resp.error) {
                showAlert(resp.message);
            }
            setPlants(plants.filter(i => i.id !== id));
        })
    }

    const searchPlant = (ev) => {
        const search = ev.target.value.toLowerCase();
        setPlants(originalPlants.filter(i => i.name.toLowerCase().includes(search)));
    }

    return (
        <>
            <ContentContainer title="LISTADO ADMIN" center={false} extraCss={ { width: '90%', margin: '0 auto' } }>
                <div className='down flex between'>
                    <div>
                        <Link to={'/plant/create/new'} className="btn btn-principal">Crear Nueva Planta</Link>
                    </div>
                    <div className='flex center'>
                        <input type="text" className='general-input' onInput={ searchPlant }/>
                        <span className='icon-search-input'><BiSearchAlt2 className=''/></span>
                    </div>
                </div>
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
                            <Link to={`/admin/update/plants/${it.id}`} className="btn btn-secondary-static">Editar</Link>
                            <button className="btn btn-principal-static" onClick={ _ => deleteThisPlant(it.id) }>Borrar</button>
                        </div>
                    </div>
                )) }
            </ContentContainer>
        </>
    )
}