import { useState } from 'react';

export default function ImageUpload({ setFile, showAlert, initialImage }) {

    const initialImageSrc = initialImage || "https://via.placeholder.com/350x360.png"; 
    const [imageSrc,setImageSrc] = useState(_ => initialImageSrc);
    // This could be simply done with state and probably will move to that after all
    const previewAndSetImage = (e) => {
        const file = e.target.files[0];
        alert(file.type);
        if (!['image/jpeg', 'image/png','image/jpg'].includes(file.type)){
            showAlert('Tipo de imagen no permitido');
            return 0;
        }
        const reader = new FileReader();
        reader.onload = _ => {
            setImageSrc(reader.result);
        }
        reader.readAsDataURL(file);

        setFile(file);
    }

    return (
        <div className="down-little">
            <label className="form-label block">Imagen</label>
            <div style={{ width: '100%' }}>
                <img className="upload-img" src={ imageSrc } alt="Upload preview" />
            </div> 
            <button type="button" className="btn btn-secondary file-btn">
                <input type="file" className="file-inpt" accept="image/*" onChange={ previewAndSetImage }/>
                Subir Imagen                            
            </button>
        </div>
    );
    
}