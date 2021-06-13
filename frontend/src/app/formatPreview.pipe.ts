import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatPreview' })
export class FormatPreviewPipe implements PipeTransform {
   transform(text: string, length) {
        text = String(text).substring(0, length)
        text = text.length < length ? text : text + ' ...'
        return  text
   }
}