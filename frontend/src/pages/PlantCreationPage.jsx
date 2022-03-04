import { useState } from "react";
import { useHistory } from 'react-router-dom';
import Alert from "../components/Alert";

export default function PlantCreationPage() {
    
    const histoire = useHistory();
    const [alertInfo, setAlertInfo] = useState({ show: false, message: "" });
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    }); 

    const handleSend = () => {
        const frm = new FormData();
        frm.append("name", formData.name);
        frm.append("description", formData.description);
        frm.append("location", formData.location);
        frm.append("real_name", formData.real_name);
        frm.append("type", formData.type);
        frm.append("file", formData.image);

        console.log(frm);

        fetch('http://146.59.159.40/plants_images/api/upload.php',{ mode: 'cors', method: 'POST', body: frm })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                setAlertInfo({ show: true, message: res.message });
            }
            if (res.code === 201) {
                histoire.push('/');
            }
        });
    }

    return (
        <>
            <Alert
                show={alertInfo.show} 
                message={alertInfo.message} 
                setAlertInfo={setAlertInfo} 
                seconds={4} 
            />
            <div className="content-container">
                <div className="box-no-padding-total">
                    <div className="col-12">
                        <h1>Crear nueva planta</h1>
                    </div>

                    <div className="down-little pad-20">
                        <div>
                            <label className="form-label block">Nombre</label>
                            <input type="text" className="general-input" placeholder="Senecio Silvery" onChange={ ev => {
                                setFormData({ ...formData, name: ev.target.value });
                            }} required />
                        </div>
                        <div className="down-little">
                            <label className="form-label block">Nombre Científico</label>
                            <input type="text" className="general-input" placeholder="Asteraceae (The Aster Family)" onChange={ ev => {
                                setFormData({ ...formData, real_name: ev.target.value });
                            }} required />
                        </div>
                        <div className="down-little">
                            <label className="form-label block">Description <span className="optional"> Opcional</span></label>
                            <textarea className="general-input" placeholder="Planta con tonos grises y con tacto de 'terciopelo'" onChange={ ev => {
                                setFormData({ ...formData, description: ev.target.value });
                            }}></textarea>
                        </div>
                        <div className="down-little">
                            <label className="form-label block">Tipo <span className="optional"> Opcional</span></label>
                            <input className="general-input" placeholder="Sol, Humedad, ..." onChange={ ev => {
                                setFormData({ ...formData, type: ev.target.value });
                            }} />
                        </div>
                        <div className="down-little">
                            <label className="form-label block">Localización <span className="optional"> Opcional</span></label>
                            <select className="general-input" defaultValue={"Cocina"} onChange={ ev => {
                                setFormData({ ...formData, location: ev.target.value });
                            }}>
                                <option value="Cocina">Cocina</option>
                                <option value="Baño">Baño</option>
                                <option value="Balcón">Balcón</option>
                            </select>
                        </div>
                        <div className="down-little">
                            <label className="form-label block">Imagen</label>
                            <input type="file" className="general-input" accept="image/*" required onChange={ ev => {
                                setFormData({ ...formData, image: ev.target.files[0] });
                            }} />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="button" onClick={ handleSend }>Mandar</button>
                </div>
            </div>
        </>
    );
}
