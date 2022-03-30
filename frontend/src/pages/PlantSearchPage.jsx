import { useState } from 'react';
import PlantList from '../components/PlantList';
import { MostViewedCarrousel } from '../components/Carrousel';
import { searchPlantByName } from '../services/plants.service';
import { useAuth } from '../hooks/useAuth';

export default function PlantSearchPage () {

    const [ inputData, setInputData ] = useState({});
    const [ filteredPlants, setFilteredPlants ] = useState([]);
    const [ receivedResponse, setReceivedResponse ] = useState(false);
    const { isLogged } = useAuth();

    const handleSend = _ => {
        searchPlantByName(inputData.name).then(resp => {
            if (resp.error) {
                console.error('ERROR: ',resp.message);
                return 0;
            }
            setFilteredPlants(resp.plants || []);
            setReceivedResponse(true);
        });
    }

    return (
        <div className="flex center">
            <div className="content-container">
                <h1 className="title-body">Crear nueva planta</h1>
                    
                <div className="down box-no-padding-total">                      
                    <div>
                        <label className="form-label block">Nombre</label>
                        <input type="text" required className="general-input" placeholder="Peperomnia" max={ 50 } onChange={ ev => {
                            setInputData({ ...inputData, name: ev.target.value });
                        }} />
                    </div>

                    <button style={{ width: '100%' }} className="down btn btn-primary" type="button" onClick={ handleSend }>Buscar</button>
                </div>
                
                <div className="down">
                    <MostViewedCarrousel />
                </div>

                <div className="down">
                    { receivedResponse && <PlantList
                        plants={ filteredPlants }
                        editButton={ isLogged }
                        toTopScroll={ true }
                    /> }
                </div>
            </div>
        </div>
    );
}