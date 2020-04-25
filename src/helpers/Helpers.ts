export class Helpers {
    static trimParagraphs(body: string) {
        var result = Helpers.convertHTML(body);
        return result.length > 250 ? result.slice(0, 250) + '......' : result;
    }

    static convertHTML(body: string) {
        var temp = document.createElement('div');
        temp.innerHTML = body;
        var result = temp.textContent || temp.innerText || '';
        result = result.replace('\u200B', '').trim();
        return result;
    }
}
