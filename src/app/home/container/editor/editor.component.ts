import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Note } from 'src/app/modes/note.model';
import { Subscription, Subject, of, empty } from 'rxjs';
import { Store } from '@ngxs/store';
import { debounceTime, tap } from 'rxjs/operators';
import { UpdateNote } from '../../actions/notes.action';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input()
  note: Note;

  noteUpdate = new Subject<void>();
  noteUpdate$ = this.noteUpdate.pipe(debounceTime(500));

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.noteUpdate$.subscribe(() => {
      this.store.dispatch(new UpdateNote({ ...this.note, description: JSON.stringify(this.note.description) }));
    });
  }


  onChange(delta) {
    this.noteUpdate.next();
  }
}
