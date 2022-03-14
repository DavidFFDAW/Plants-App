import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function LogIn ({ showAlert }) {
    const [ data, setData ] = useState({});
    const { login, isLogged } = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (isLogged) {
            history.push("/admin/plants");
        }
    }, [ history, isLogged ]);

    const handleSend = (_) => {
        console.log(data);
        if (!data.email || !data.password) {
            showAlert("Por favor, rellene todos los campos");
            return 0;
        }
        const sendingData = new FormData();
        sendingData.append("email", data.email);
        sendingData.append("password", data.password);

        login(sendingData);
        const finalRedirectURL = window.sessionStorage.getItem('access-route') || '/admin/plants';
        window.sessionStorage.removeItem('access-route');
        history.push(finalRedirectURL);
    }

    return (
        <div className="flex center">
            <div className="content-container">
                <h1 className="title-body">Panel de LogIn</h1>
                    
                <div className="down box-no-padding-total">
                    <div className="flex center">
                        <div>
                            <div>
                                <label className="form-label block">Email</label>
                                <input type="text" className="general-input" placeholder="root@plants.com" onChange={ ev => {
                                    setData({ ...data, email: ev.target.value });
                                }} required />                                    
                            </div>
                            <div className="down">
                                <label className="form-label block">Password</label>
                                <input type="password" className="general-input" placeholder="****" onChange={ ev => {
                                    setData({ ...data, password: ev.target.value });
                                }} required />                                    
                            </div>

                            <div className="down flex center">
                                <button type="button" className="btn btn-principal" onClick={ handleSend }>Iniciar Sesión</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}