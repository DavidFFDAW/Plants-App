import { useState } from "react";

export default function PlantCreationPage() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    }); 

    const handleSend = (event) => {
        const frm = new FormData();
        frm.append("name", formData.name);
        frm.append("description", formData.description);
        frm.append("file", formData.image);

        fetch('http://146.59.159.40/plants_images/api/upload.php',{ mode: 'cors', method: 'POST', body: frm })
        .then(res => res.json())
        .then(res => console.log(res));
    }

    return (
        <div className="content-container">
            <div className="box-no-padding-total">
                <div className="col-12">
                    <h1>Crear nueva planta</h1>
                </div>

                <div className="down-little pad-20">
                    <div>
                        <label className="form-label block">Nombre</label>
                        <input type="text" className="general-input" placeholder={formData.name} onChange={ ev => {
                            setFormData({ ...formData, name: ev.target.value });
                        }} required />
                    </div>
                    <div className="down-little">
                        <label className="form-label block">Description <span className="optional"> Opcional</span></label>
                        <textarea className="general-input" name="alias" placeholder="Planta verde" onChange={ ev => {
                            setFormData({ ...formData, description: ev.target.value });
                        }}></textarea>
                    </div>
                    <div className="down-little">
                        <label className="form-label block">Imagen</label>
                        <input type="file" className="general-input" capture="camera" accept="image/*" required onChange={ ev => {
                            setFormData({ ...formData, image: ev.target.files[0] });
                        }} />
                    </div>
                </div>
                <button className="btn btn-primary" type="button" onClick={ handleSend }>Mandar</button>
            </div>
        </div>
    );
}