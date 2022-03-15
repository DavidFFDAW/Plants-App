import TokenService from './token.service';

export default class HttpService {
    
    // constructor(){}

    static get = endpoint => this._makeFetchRequest(endpoint,'GET');
    static put = (endpoint,data,json = true) => this._makeFetchRequest(endpoint,'PUT',data,json);
    static post = (endpoint,data,json = true) => this._makeFetchRequest(endpoint,'POST', data, json);
    static delete = endpoint => this._makeFetchRequest(endpoint,'DELETE');

    static _makeFetchRequest(url,method,data,json){
        const token = TokenService.getToken();
        const methodNeedsToken = (['POST','PUT','DELETE'].includes(method));
        const addToken = token && methodNeedsToken;

        const options = {
            method: method,
            mode: 'cors',
            headers: {
            //    'Content-Type': 'application/json',
            //    'Accept': 'application/json',
            },
        };
        if(addToken){
           options.headers = {...options.headers, 'Authorization': 'Bearer ' + token };
        }
        if(data){
            options.body = json ? JSON.stringify(data) : data;
        }
        
        return fetch(url, options).then(response => response.json());
    }

}