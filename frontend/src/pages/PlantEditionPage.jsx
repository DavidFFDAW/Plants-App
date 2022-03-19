import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import ImageUpload from "../components/ImageUpload";
import { LoadingComponent } from "../components/LoadingComponent";
import { ROUTES } from "../constants/routes";
import { getEmptyPlantObject, getPlantByID, updatePlantById } from "../services/plants.service";

export function PlantEditionPage({ showAlert }) {
    
    const histoire = useHistory();
    const { id } = useParams();
    const [ formData, setFormData ] = useState(_ => getEmptyPlantObject());
    const [ isLoading, setLoading ] = useState(true);

    const setImage = (receivedFile) => {        
        setFormData({ ...formData, image: receivedFile });
    }

    useEffect(() => {
        getPlantByID(id).then(res => {
            if (res.error) {
                showAlert(res.message);
            }
            console.log(res);
            setFormData(res.plant);
            setLoading(false);
        }).catch(err => {
            showAlert(err.message);
        });
    }, [  ]);

    if (isLoading) {
        return (
            <LoadingComponent type='spokes'/>
        );
    }

    const updatePlant = () => {
        updatePlantById(id, formData).then(res => {
            console.log(res);
            if (res.error) {
                showAlert(res.message);
            }
            showAlert(res.message);
            histoire.push(ROUTES.admin);
        });
    }

    return (
        <>
            <div className="flex center">
                <div className="content-container">
                    <h1 className="title-body">Editar { formData.name }</h1>
                    
                    <div className="down box-no-padding-total">
                        <div className="flex between">
                            <div className="flex center">
                                <ImageUpload setFile={ setImage } showAlert={ showAlert } initialImage={formData.image}/>
                            </div>
                            <div className="img-form-side">
                                <div>
                                    <label className="form-label block">Nombre</label>
                                    <input type="text" className="general-input" 
                                        placeholder="Senecio Silvery" value={ formData.name } onChange={ ev => {
                                            setFormData({ ...formData, name: ev.target.value });
                                        }} required 
                                    />                                    
                                </div>                                
                                <div className="down">
                                    <label className="form-label block">Nombre Científico</label>
                                    <input type="text" className="general-input" 
                                        placeholder="Asteraceae (The Aster Family)" value={ formData.real_name }                                    
                                        onChange={ ev => {
                                            setFormData({ ...formData, real_name: ev.target.value });
                                        }} required 
                                    />
                                </div>
                                <div className="down">
                                    <label className="form-label block">Description <span className="optional"> Opcional</span></label>
                                    <textarea style={{ minHeight: 120 }} className="general-input" 
                                        placeholder="Planta con tonos grises y con tacto de 'terciopelo'" value={ formData.description || '' } 
                                            onChange={ ev => {
                                            setFormData({ ...formData, description: ev.target.value });
                                        }}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="down grid-images">                        
                            <div>
                                <label className="form-label block">Cantidad <span className="optional"> Opcional</span></label>
                                <input type="number" className="general-input" 
                                    placeholder="1" value={ formData.quantity || 1 }
                                    onChange={ ev => {
                                        setFormData({ ...formData, quantity: ev.target.value });
                                    }} 
                                />
                            </div>
                            <div>
                                <label className="form-label block">Tipo <span className="optional"> Opcional</span></label>
                                <input className="general-input" value={ formData.type || '' }                                 
                                    placeholder="Sol, Humedad, ..." 
                                    onChange={ ev => {
                                        setFormData({ ...formData, type: ev.target.value });
                                    }} 
                                />
                            </div>
                            <div>
                                <label className="form-label block">Regado <span className="optional"> Cada x dias</span></label>
                                <input type="number" className="general-input" 
                                    placeholder="2" value={ formData.water_quantity || '' }
                                    onChange={ ev => {
                                        setFormData({ ...formData, waterQt: ev.target.value });
                                    }} 
                                />
                            </div>
                            <div>
                                <label className="form-label block">Localización <span className="optional"> Opcional</span></label>
                                <select className="general-input" value={ formData.location }  onChange={ ev => {
                                        setFormData({ ...formData, location: ev.target.value });
                                    }}
                                >
                                    <option value="Cocina">Cocina</option>
                                    <option value="Baño">Baño</option>
                                    <option value="Balcón">Balcón</option>
                                </select>
                            </div>
                            <div>
                                <label className="form-label block">Localización Extra <span className="optional"> Opcional</span></label>
                                <input type="text" className="general-input" 
                                    placeholder="Estructura metálica" value={ formData.extra_location || '' } onChange={ ev => {
                                        setFormData({ ...formData, extra_location: ev.target.value });
                                    }} 
                                />
                            </div>
                        </div>

                        <button style={{ width: '100%' }} className="down btn btn-primary" type="button" onClick={ updatePlant }>Mandar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
