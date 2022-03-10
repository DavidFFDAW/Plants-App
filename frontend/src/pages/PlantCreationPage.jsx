import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { apiURL } from "../constants/config";
import ImageUpload from "../components/ImageUpload";

export default function PlantCreationPage({ showAlert }) {
    
    const histoire = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: 'Cocina'
    });

    const setImage = (receivedFile) => {        
        setFormData({ ...formData, image: receivedFile });
        console.log('Image must have been setted up');
        console.log('Image: ', formData.image);
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
            if (res.error) {
                showAlert(res.message);
            }
        });
    }

    return (
        <>
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
                        </div>
                        <ImageUpload setFile={ setImage } showAlert={ showAlert } />

                        <button style={{ width: '100%' }} className="down btn btn-primary" type="button" onClick={ handleSend }>Mandar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
