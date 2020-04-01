import axios, { AxiosResponse } from 'axios';

export class WebService<T> implements IWebService<T> {
    readonly baseURL = 'http://localhost:5000/api/';

    private _url: string;
    protected get URL() {
        return this.baseURL + this._url;
    }

    protected set URL(value: string) {
        this._url = value;
    }

    get<T>(extraUrl?: any): Promise<AxiosResponse<T>> {
        const fullURL = this.constructFullURL(extraUrl);
        return axios.get<T>(fullURL);
    }
    post<T>(data: T | T[], urlParams?: string): Promise<AxiosResponse<T>> {
        const fullURL = this.constructFullURL(urlParams);
        return axios.post<T>(fullURL, data);
    }
    delete<T>(id: any, extraUrl: string): Promise<AxiosResponse<T>> {
        const fullURL = this.constructFullURL(extraUrl) + id;
        return axios.delete<T>(fullURL);
    }

    private constructFullURL(url: string) {
        return url ? this.URL + `/${url}` : this.URL;
    }
}

export interface IWebService<T> {
    get<T>(urlParams?: any): Promise<AxiosResponse<T>>;
    post<T>(data: T | T[], urlParams?: string): Promise<AxiosResponse<T>>;
    delete<T>(id: string | number, extraUrl: string): Promise<AxiosResponse<T>>;
}
