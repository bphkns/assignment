import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

@Pipe({
  name: 'titlePipe'
})
export class TitlePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, searchValue?: string): SafeHtml {

    const json = JSON.parse(value);
    const converter = new QuillDeltaToHtmlConverter(json.ops, {});
    let html = converter.convert();
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
    html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
    html = html.replace(/<\/div>/ig, '\n');
    html = html.replace(/<\/li>/ig, '\n');
    html = html.replace(/<li>/ig, '  *  ');
    html = html.replace(/<\/ul>/ig, '\n');
    html = html.replace(/<\/p>/ig, '\n');
    html = html.replace(/<br\s*[\/]?>/gi, '\n');
    html = html.replace(/<[^>]+>/ig, '');
    let text = '';
    if (searchValue && searchValue.length > 1) {
      const regEx = new RegExp('(' + searchValue + ')', 'gi');
      const result = html.split(regEx);
      result.forEach(match => {
        if (match.toLowerCase() === searchValue.toLowerCase()) {
          text += `<mark>${match}</mark>`;
        } else {
          text += match;
        }
      });
    }

    const htmlArr = text.length > 0 ? text.split('\n').filter(t => t !== '' && t !== ' ') : html.split('\n').filter(t => t !== '' && t !== ' ');

    const finalText = htmlArr.length > 0 ? htmlArr[0] : 'New note';

    return this.sanitizer.bypassSecurityTrustHtml(finalText);
  }

}
