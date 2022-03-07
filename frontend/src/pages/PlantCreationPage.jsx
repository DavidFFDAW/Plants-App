import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { apiURL } from "../constants/config";
import Alert from "../components/Alert";

export default function PlantCreationPage() {
    
    const histoire = useHistory();
    const [alertInfo, setAlertInfo] = useState({ show: false, message: "" });
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: 'Cocina'
    }); 

    const setImage = (e) => {
        const file = e.target.files[0];
        if (!['image/jpeg', 'image/png','image/jpg'].includes(file.type)){
            setAlertInfo({ 
                show: true, 
                message: 'Tipo de imagen no permitido',
                seconds: 4,
                showButton: true
            });
            return 0;
        }
        setFormData({ ...formData, image: e.target.files[0] });
    }

    const handleSend = () => {
        const frm = new FormData();
        frm.append("name", formData.name);
        frm.append("description", formData.description);
        frm.append("location", formData.location);
        frm.append("real_name", formData.real_name);
        frm.append("type", formData.type);
        frm.append("file", formData.image);

        fetch(`${apiURL}create.php`, {
            mode: 'cors',
            method: 'POST',
            body: frm,
        })
        .then(res => res.json())
        .then(res => {
            if (res.code === 201) {
                histoire.push('/');
                return 0;
            }
            setAlertInfo({ 
                show: true, 
                message: res.code+': '+res.message,
                seconds: 5,
                showButton: true
             });
            if (res.error) {
                setAlertInfo({ show: true, message: res.message });
            }
        });
    }

    return (
        <>
            <Alert
                show={alertInfo.show} 
                message={alertInfo.message} 
                setAlertInfo={setAlertInfo} 
                seconds={alertInfo.seconds || 4}
                acceptButton={ alertInfo.showButton || true}
            />
            <div className="flex center">
                <div className="content-container">
                    <h1 className="title-body">Crear nueva planta</h1>
                    
                    <div className="down box-no-padding-total">
                        <div className="grid-images">
                            <div >
                                <label className="form-label block">Nombre</label>
                                <input type="text" className="general-input" placeholder="Senecio Silvery" onChange={ ev => {
                                    setFormData({ ...formData, name: ev.target.value });
                                }} required />
                                {/* <datalist id="list-location">
                                    { JSON.parse(localStorage.getItem('plants')).map(plant => (
                                        <option key={plant.id} value={plant.name} />
                                    ))}
                                </datalist> */}
                            </div>
                            <div >
                                <label className="form-label block">Nombre Científico</label>
                                <input type="text" className="general-input" placeholder="Asteraceae (The Aster Family)" onChange={ ev => {
                                    setFormData({ ...formData, real_name: ev.target.value });
                                }} required />
                            </div>
                            <div >
                                <label className="form-label block">Description <span className="optional"> Opcional</span></label>
                                <textarea className="general-input" placeholder="Planta con tonos grises y con tacto de 'terciopelo'" onChange={ ev => {
                                    setFormData({ ...formData, description: ev.target.value });
                                }}></textarea>
                            </div>
                            <div >
                                <label className="form-label block">Tipo <span className="optional"> Opcional</span></label>
                                <input className="general-input" placeholder="Sol, Humedad, ..." onChange={ ev => {
                                    setFormData({ ...formData, type: ev.target.value });
                                }} />
                            </div>
                            <div >
                                <label className="form-label block">Localización <span className="optional"> Opcional</span></label>
                                <select className="general-input" defaultValue={"Cocina"} onChange={ ev => {
                                    setFormData({ ...formData, location: ev.target.value });
                                }}>
                                    <option value="Cocina">Cocina</option>
                                    <option value="Baño">Baño</option>
                                    <option value="Balcón">Balcón</option>
                                </select>
                            </div>
                            <div >
                                <label className="form-label block">Imagen</label>
                                <button type="button" className="btn btn-secondary file-btn">
                                    <input type="file" className="file-inpt" accept="image/*" onChange={ setImage }/>
                                    Subir Imagen                            
                                </button>
                            </div>
                        </div>
                        <button style={{ width: '100%' }} className="down btn btn-primary" type="button" onClick={ handleSend }>Mandar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
