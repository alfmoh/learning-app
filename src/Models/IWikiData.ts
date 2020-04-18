export interface IWikiData {
    pageid: number;
    ns: number;
    title: string;
    extract: string;
}

export class WikiData implements IWikiData {
    pageid: number;
    ns: number;
    title: string;
    extract: string;
}
