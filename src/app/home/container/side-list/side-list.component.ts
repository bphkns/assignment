import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/modes/note.model';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.scss'],
})
export class SideListComponent implements OnInit {

  @Input()
  note: Note;

  @Input()
  filterText: string;

  @Output()
  clicked = new EventEmitter<Note>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clicked.emit(this.note);
  }


}
