export default function PlantCreationPage({ showAlert }) {

    const handleSaveConfig = (key,param) => {
        const storageConfs = JSON.parse(localStorage.getItem('configs')) || {};
        storageConfs[key] = param;
        localStorage.setItem('configs', JSON.stringify(storageConfs));
    }

    const getKey = k => {
        const storageConfs = JSON.parse(localStorage.getItem('configs')) || {};
        return storageConfs[k];
    }
    

    return (
        <>
            <div className="flex center">
                <div className="content-container">
                    <h1 className="title-body">Configuraciones de Dispositivo</h1>
                    
                    <div className="down box-no-padding-total">                          
                            
                        <div className="down">                        
                            <div className="down">
                                <label className="form-label block">Plantas por página <span className="optional"> ¿Cuántas plantas quieres que se muestren por cada página?</span></label>
                                <input type="number" className="general-input" placeholder="6" onChange={ ev => {
                                    handleSaveConfig('perPage', +(ev.target.value));
                                }} />
                            </div>
                            <div className="down">
                                <label className="form-label block">Tema de la aplicación <span className="optional"> ¿Prefieres un tema claro u oscuro?</span></label>
                                <select className="general-input" defaultValue={"Claro"} onChange={ ev => handleSaveConfig('theme', ev.target.value) }>
                                    <option value="Claro">Claro</option>
                                    <option value="Oscuro">Oscuro</option>
                                </select>
                            </div>
                            <div className="down">
                                <label className="form-label block">Ver más visitadas<span className="optional"> ¿Quieres que se muestren las plantas mas visitadas?</span></label>
                                
                                <label class="switch block">
                                    <input type="checkbox" checkedv={ getKey('most_viewed') } onChange={ ev => {
                                        console.log(ev.target);
                                        console.log(ev.target.value);
                                        console.log(ev.target.checked);

                                        handleSaveConfig('most_viewed', ev.target.checked);
                                    }}  />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
