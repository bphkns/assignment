import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

@Pipe({
  name: 'descPipe'
})
export class DescriptionPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, searchValue?: string): SafeHtml {

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

    let htmlArr = html.split('\n');
    if (htmlArr.length > 1) {
      htmlArr.splice(0, 1);
    }

    html = htmlArr.join('\n');

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

    htmlArr = text.length > 0 ? text.split('\n').filter(t => t !== '' && t !== ' ') : html.split('\n').filter(t => t !== '' && t !== ' ');

    const finalText = htmlArr.length > 0 ? htmlArr.join(' ') : 'No additional text';
    return this.sanitizer.bypassSecurityTrustHtml(finalText);
  }

}
