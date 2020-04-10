import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideListComponent implements OnInit {

  @Input()
  header: string;

  @Input()
  id: string;

  @Input()
  body: string;

  @Input()
  date: Date;

  @Output()
  clicked = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clicked.emit(this.id);
  }


  public get time() {
    return moment().format('dddd');
  }

}
