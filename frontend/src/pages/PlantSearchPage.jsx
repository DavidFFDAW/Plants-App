import { useState } from 'react';
import PlantList from '../components/PlantList';
import { MostViewedCarrousel } from '../components/Carrousel';
import { LoadingComponent } from "../components/LoadingComponent";
import { searchPlantByName } from '../services/plants.service';
import useAuth from '../hooks/useAuth';

export default function PlantSearchPage () {

    const [ inputData, setInputData ] = useState({});
    const [ filteredPlants, setFilteredPlants ] = useState([]);
    const [ response, setResponse ] = useState({ loading: false, received: false });
    const { isLogged } = useAuth();

    const handleSend = _ => {
        setResponse({ ...response, loading: true });
        const formData = new FormData();
        formData.append('name', inputData.name);
        
        searchPlantByName(formData).then(resp => {
            if (resp.error) {
                console.error('ERROR: ',resp.message);
                return 0;
            }
            setFilteredPlants(resp.plants || []);
            setResponse({...response, received: true, loading: false });
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    }

    return (
        <div className="flex center">
            <div className="content-container">
                
                <div className="down">
                    <MostViewedCarrousel />                
                </div>

                <div className="down">
                    <h1 className="title-body">Buscar</h1>
                </div>

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
                    { response.loading && <LoadingComponent/> }
                    { response.received && <PlantList
                        plants={ filteredPlants }
                        editButton={ isLogged }
                        toTopScroll={ true }
                    /> }
                </div>
            </div>
        </div>
    );
}