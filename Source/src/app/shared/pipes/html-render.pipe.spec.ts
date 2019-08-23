import { HtmlRenderPipe } from './html-render.pipe';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';

describe('HtmlRenderPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    });
  });

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new HtmlRenderPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));
});
