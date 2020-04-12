import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Note } from 'src/app/modes/note.model';
import { IconService } from 'src/app/services/icon.service';
import { GetNotes, AddNote, DeleteNote } from '../actions/notes.action';
import { NotesState } from '../state/note.state';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  animations: [
    trigger('MyInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out',
          style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class ContainerComponent implements OnInit {


  @Select(NotesState) notes$: Observable<Note[]>;
  selectedNote: Note;

  constructor(private iconService: IconService, private fb: FormBuilder, private store: Store, private actions$: Actions) {
  }

  ngOnInit(): void {
    this.iconService.registerIcons();
  }


  openNote(note: Note): void {
    this.selectedNote = { ...note };
  }

  trackByNote(index: number, note: Note) {
    return note.id;
  }

  createNote() {
    const id = '_' + Math.random().toString(36).substr(2, 9);
    this.store.dispatch(new AddNote({ id, name: '', description: '{}', createdAt: new Date().toISOString() }));
  }

  deleteNote() {
    if (!this.selectedNote) {
      return;
    }

    this.store.dispatch(new DeleteNote(this.selectedNote));
    this.selectedNote = null;
    this.selectedNote = this.store.snapshot().notes.length > 0 ? this.store.snapshot().notes[0] : null;
  }

}
