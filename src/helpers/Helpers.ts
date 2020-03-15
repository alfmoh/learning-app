export class Helpers {
  static trimParagraphs(body: string, trim = true) {
    var temp = document.createElement('div');
    temp.innerHTML = body;
    var result = temp.textContent || temp.innerText || '';
    result = result.replace('\u200B', '').trim();
    return trim && result.length > 250
      ? result.slice(0, 250) + '......'
      : result;
  }
}
