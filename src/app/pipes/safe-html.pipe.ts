import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Pipe({
    name: 'safeHtml',
    standalone: false
})
export class SafeHtmlPipe implements PipeTransform {

    constructor(protected sanitizer: DomSanitizer) {
    }

    public transform(value: string): SafeHtml {
        const sanitizedContent = DOMPurify.sanitize(value, { RETURN_TRUSTED_TYPE: false });
        return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
    }
}
