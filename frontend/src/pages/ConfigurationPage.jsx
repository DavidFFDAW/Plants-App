import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { apiURL } from "../constants/config";
import ImageUpload from "../components/ImageUpload";
import TokenService from '../services/token.service';
import { ROUTES } from "../constants/routes";

export default function PlantCreationPage({ showAlert }) {

    const handleSaveConfig = (key,param) => {
        const storageConfs = localStorage.getItem('configs') || {};
        const final = { ...storageConfs, [key]: param };
        localStorage.setItem('configs', JSON.stringify(final));
    }
    

    return (
        <>
            <div className="flex center">
                <div className="content-container">
                    <h1 className="title-body">Configuraciones de Dispositivo</h1>
                    
                    <div className="down box-no-padding-total">                          
                            
                        <div className="down grid-images">                        
                            <div>
                                <label className="form-label block">Plantas por página <span className="optional"> ¿Cuántas plantas quieres que se muestren por cada página?</span></label>
                                <input type="number" className="general-input" placeholder="6" onChange={ ev => {
                                    if (ev.target.value === '' || ev.target.value === 0) return ev.target.value = 6;
                                    handleSaveConfig('perPage',ev.target.value);
                                }} />
                            </div>
                            <div>
                                <label className="form-label block">Tema de la aplicación <span className="optional"> ¿Prefieres un tema claro u oscuro?</span></label>
                                <select className="general-input" defaultValue={"Claro"} onChange={ ev => handleSaveConfig('theme', ev.target.value) }>
                                    <option value="Claro">Claro</option>
                                    <option value="Oscuro">Oscuro</option>
                                </select>
                            </div>
                            <div>
                                <span>...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
