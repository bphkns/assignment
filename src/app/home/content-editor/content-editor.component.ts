import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Quill from 'quill';

const SELECTOR = 'content-editor';

@Component({
  selector: SELECTOR,
  template: `<div fxFlexFill class="container" #container>
     <div id="editor" fxFlex="grow" (click)="onTouched()" ></div>
   </div>`,
  styles: [`img {
      position: relative;
    }
    `,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ContentEditorComponent),
    multi: true
  }
  ],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class ContentEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  @Input() value: any;
  quill: any = Quill;
  editor: any;
  touched = false;

  constructor(public elementRef: ElementRef) { }


  ngOnInit(): void {
    const editor = this.elementRef.nativeElement.
      querySelector('#editor');
    this.editor = new Quill(editor, { theme: 'bubble' });
    this.editor.on('editor-change', (eventName, ...args) => {
      this.onChange(this.editor.getContents());
    });
  }
  onChange = (delta: any) => { };

  onTouched = () => {
    this.touched = true;
  }


  writeValue(content: any): void {
    const delta = JSON.parse(content);
    this.editor.setContents(delta);
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnDestroy() { }
}
