import { WebService } from './Web.service';
import { AxiosResponse } from 'axios';

export class TagService extends WebService<any> {
    private url =
        'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|categories&exintro=&explaintext&redirects=1&origin=*&titles=';

    get(tag: string): Promise<AxiosResponse<any>> {
        return super.getExternal(
            this.url +
                this.deleteHyphen(tag) +
                `&list=search&srsearch=${this.deleteHyphen(tag)}&srwhat=text`
        );
    }

    private deleteHyphen(str: string) {
        const delimeters = ['%20', ' ', '-'];
        let delimeter = delimeters.find(deli => str.includes(deli));
        return str.split(delimeter).join('_');
    }
}
