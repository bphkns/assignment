import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-highlighted-text',
  template: `
        <ng-container *ngFor="let match of result">
            <mark *ngIf="(match.toLowerCase() === needle.toLowerCase()); else nomatch">{{match}}</mark>
            <ng-template #nomatch>{{match}}</ng-template>
        </ng-container>
    `,
})
export class HighlightedTextComponent implements OnChanges {
  @Input() needle: string;
  @Input() haystack: string;
  public result: string[];

  ngOnChanges() {
    
    const regEx = new RegExp('(' + this.needle + ')', 'gi');

    this.result = this.haystack.split(regEx);
  }
}
