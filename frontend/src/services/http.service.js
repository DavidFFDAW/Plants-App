export default class HttpService {
    
    // constructor(){}

    static get = endpoint => this._makeFetchRequest(endpoint,'GET');
    static put = (endpoint,data) => this._makeFetchRequest(endpoint,'PUT',data);
    static post = (endpoint,data,json = true) => this._makeFetchRequest(endpoint,'POST', data, json);
    static delete = endpoint => this._makeFetchRequest(endpoint,'DELETE');

    static _makeFetchRequest(url,method,data,json){
        const token = window.sessionStorage.getItem('token');
        const options = {
            method: method,
            mode: 'cors',
            headers: {
            //    'Content-Type': 'application/json',
            //    'Accept': 'application/json',
            },
        };
        if(token){
           options.headers = {...options.headers, 'Authorization': 'Bearer ' + token };
        }
        if(data){
            options.body = json ? JSON.stringify(data) : data;
        }
        
        return fetch(url, options).then(response => response.json());
    }

}