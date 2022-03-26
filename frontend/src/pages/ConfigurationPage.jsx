export default function PlantCreationPage({ showAlert }) {

    const handleSaveConfig = (key,param) => {
        const storageConfs = JSON.parse(localStorage.getItem('configs')) || {};
        storageConfs[key] = param;
        localStorage.setItem('configs', JSON.stringify(storageConfs));
    }
    

    return (
        <>
            <div className="flex center">
                <div className="content-container">
                    <h1 className="title-body">Configuraciones de Dispositivo</h1>
                    
                    <div className="down box-no-padding-total">                          
                            
                        <div className="down">                        
                            <div className="down-little">
                                <label className="form-label block">Plantas por página <span className="optional"> ¿Cuántas plantas quieres que se muestren por cada página?</span></label>
                                <input type="number" className="general-input" placeholder="6" onChange={ ev => {
                                    handleSaveConfig('perPage', +(ev.target.value));
                                }} />
                            </div>
                            <div className="down-little">
                                <label className="form-label block">Tema de la aplicación <span className="optional"> ¿Prefieres un tema claro u oscuro?</span></label>
                                <select className="general-input" defaultValue={"Claro"} onChange={ ev => handleSaveConfig('theme', ev.target.value) }>
                                    <option value="Claro">Claro</option>
                                    <option value="Oscuro">Oscuro</option>
                                </select>
                            </div>
                            <div className="down">
                                <span>...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
