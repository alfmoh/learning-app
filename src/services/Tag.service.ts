import { WebService } from './Web.service';
import { AxiosResponse } from 'axios';

export class TagService extends WebService<any> {
    private url =
        'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext&redirects=1&origin=*&titles=';

    get(tag: string): Promise<AxiosResponse<any>> {
        return super.getExternal(this.url + this.deleteHyphen(tag));
    }

    private deleteHyphen(str: string) {
        return str.split('-').join('_');
    }
}
