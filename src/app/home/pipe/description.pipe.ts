import { Pipe, PipeTransform } from '@angular/core';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

@Pipe({
  name: 'descPipe'
})
export class DescriptionPipe implements PipeTransform {


  transform(value: any): string {

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
    return html ? html : 'No additional text';
  }

}
