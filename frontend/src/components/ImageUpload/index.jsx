import { useState, useRef } from 'react';

export default function ImageUpload({ setFile, showAlert }) {

    const [showImage,setShowImage] = useState(false);
    // This could be simply done with state and probably will move to that after all
    const imgReference = useRef(null);

    const previewAndSetImage = (e) => {
        const file = e.target.files[0];
        if (!['image/jpeg', 'image/png','image/jpg'].includes(file.type)){
            showAlert('Tipo de imagen no permitido');
            return 0;
        }
        const reader = new FileReader();
        reader.onload = _ => {
            setShowImage(true);
            imgReference.current.src = reader.result;
        }
        reader.readAsDataURL(file);

        setFile(file);
    }

    return (
        <div>
            <label className="form-label block">Imagen</label>
            { showImage && <div>
                <img ref={imgReference} style={{ width: '350px', height: '360px' }} />
            </div> }
            <button type="button" className="btn btn-secondary file-btn">
                <input type="file" className="file-inpt" accept="image/*" onChange={ previewAndSetImage }/>
                Subir Imagen                            
            </button>
        </div>
    );
    
}