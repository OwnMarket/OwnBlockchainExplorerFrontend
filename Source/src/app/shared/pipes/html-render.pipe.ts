import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'htmlRender'
})
export class HtmlRenderPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(html);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(html);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(html);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(html);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(html);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
