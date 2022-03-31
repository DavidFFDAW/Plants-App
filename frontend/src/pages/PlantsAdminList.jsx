import { useEffect, useState, useRef } from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { Link } from 'react-router-dom';
import { apiURL } from '../constants/config'
import { formatDate } from '../services/date.services';
import { deletePlant } from '../services/plants.service';
import { BiSearchAlt2, BiTrash } from 'react-icons/bi';
import { ROUTES } from '../constants/routes';

export default function PlantAdminList ({ showAlert }) {
    const [plants, setPlants] = useState([]); 
    const [originalPlants, setOriginalPlants] = useState([]);
    const reference = useRef(null);

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

    const deleteThisPlant = (id,name) => {
        if (window.confirm(`¿Estás seguro de eliminar ${name}?`)) {
            deletePlant(id).then(resp => {
                if (resp.error) {
                    showAlert(resp.message);
                }
                setPlants(plants.filter(i => i.id !== id));
            });
        }
    }

    const searchPlant = (ev) => {
        const search = ev.target.value.toLowerCase();
        setPlants(originalPlants.filter(i => i.name.toLowerCase().includes(search)));
    }

    const deleteSearch = () => {
        reference.current.value = '';
        setPlants(originalPlants);
    }

    return (
        <>
            <ContentContainer title="LISTADO ADMIN" center={false} extraCss={ { width: '90%', margin: '0 auto' } }>
                <div className="sticky">
                    <div className='down flex between'>
                        <div>
                            <Link to={ROUTES.create} className="btn btn-principal">Crear Nueva Planta</Link>
                        </div>
                        <div className='flex center'>
                            <div className="relative">
                                <input type="text" ref={reference} className='general-input' onInput={ searchPlant }/>
                                <button type='button' onClick={ deleteSearch } className="btn-admin-delete-form"><BiTrash/></button>
                            </div>
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
                </div>
                { plants.map(it => (
                    <div key={it.id} className="box flex between" style={{ width: '100%', boxSizing: 'border-box', margin: '20px 0' }}>
                        <p style={{ width: 75 }}>{ it.name }</p>
                        <p style={{ width: 75 }}>{ it.location }</p>
                        <p style={{ width: 75 }}>{ formatDate(it.created_at) }</p>
                        <div className="flex between" style={{ width: 200 }}>
                            <Link to={`/admin/update/plants/${it.id}`} className="btn btn-secondary-static">Editar</Link>
                            <button className="btn btn-principal-static" onClick={ _ => deleteThisPlant(it.id,it.name) }>Borrar</button>
                        </div>
                    </div>
                )) }
            </ContentContainer>
        </>
    )
}