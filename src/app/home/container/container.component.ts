import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Note } from 'src/app/modes/note.model';
import { IconService } from 'src/app/services/icon.service';
import { GetNotes, AddNote, DeleteNote } from '../actions/notes.action';
import { NotesState } from '../state/note.state';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, map, debounceTime } from 'rxjs/operators';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

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
export class ContainerComponent implements OnInit, OnDestroy {

  isMobile = false;
  notes$: Observable<Note[]>;
  selectedNote: Note;
  collapse = false;
  searchSub: Subscription;
  filterText = '';
  filterNotesCtrl = new FormControl('');

  constructor(
    private iconService: IconService, private fb: FormBuilder, private store: Store, private actions$: Actions,
    breakpointObserver: BreakpointObserver) {
    this.isMobile = breakpointObserver.isMatched('(max-width: 599px)');
  }

  ngOnInit(): void {
    this.store.dispatch(new GetNotes());
    this.notes$ = this.store.select(state => state.notes).pipe(
      map(notes => {
        return notes.filter(note => {
          const json = JSON.parse(note.description);
          const converter = new QuillDeltaToHtmlConverter(json.ops, {});
          let html = converter.convert();
          html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
          html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
          html = html.replace(/<\/div>/ig, '\n');
          html = html.replace(/<\/li>/ig, '\n');
          html = html.replace(/<li>/ig, '  *  ');
          html = html.replace(/<\/ul>/ig, '\n');
          html = html.replace(/<\/p>/ig, '\n');
          html = html.replace(/<br\s*[\/]?>/gi, '\n');
          html = html.replace(/<[^>]+>/ig, '');
          return html.toLowerCase().includes(this.filterText.toLowerCase());
        });
      })
    );

    this.searchSub = this.filterNotesCtrl.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      this.filterText = this.filterNotesCtrl.value;
      this.store.dispatch(new GetNotes());
    });
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
    this.selectedNote = null;
    if (!this.collapse && !this.isMobile) {
      this.selectedNote = this.store.snapshot().notes.length > 0 ? { ...this.store.snapshot().notes[0] } : null;
    }
  }

  deleteNote() {

    if (!this.selectedNote) {
      return;
    }

    this.store.dispatch(new DeleteNote(this.selectedNote));
    this.selectedNote = null;
    if (!this.collapse && !this.isMobile) {
      this.selectedNote = this.store.snapshot().notes.length > 0 ? { ...this.store.snapshot().notes[0] } : null;
    }
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }


  backtoview() {
    this.selectedNote = null;
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }
}
