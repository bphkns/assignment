import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Selector } from '@ngxs/store';
import { produce } from 'immer';
import { Note } from 'src/app/modes/note.model';
import { AddNote, GetNotes, UpdateNote, DeleteNote } from '../actions/notes.action';
import { DataService } from 'src/app/services/data.service';
import { tap } from 'rxjs/operators';



const NOTES_STATE_TOKEN = new StateToken<Note[]>('notes');

@State({
    name: NOTES_STATE_TOKEN,
    defaults: []
})
@Injectable()
export class NotesState {

    constructor(private dataService: DataService) { }


    @Action(GetNotes)
    fetchNotes(ctx: StateContext<Note[]>) {
        return this.dataService.getNotes().pipe(
            tap(notes => {
                ctx.setState([...notes]);
            })
        );
    }

    @Action(AddNote)
    addNote(ctx: StateContext<Note[]>, action: AddNote) {
        return this.dataService.createNote(action.payload).pipe(
            tap(note => {
                const state = ctx.getState();
                ctx.setState(
                    [
                        note,
                        ...state
                    ]
                );
            })
        );
    }

    @Action(UpdateNote, { cancelUncompleted: true })
    updateNote(ctx: StateContext<Note[]>, action: UpdateNote) {
        return this.dataService.updateNote(action.note).pipe(
            tap(note => {
                const state = ctx.getState().filter(n => n.id !== note.id);
                ctx.setState(
                    [
                        note,
                        ...state
                    ]
                );
            })
        );
    }

    @Action(DeleteNote)
    deleteNote(ctx: StateContext<Note[]>, action: DeleteNote) {
        const state = ctx.getState().filter(n => n.id !== action.note.id);
        ctx.setState(
            [
                ...state
            ]
        );
        return this.dataService.deleteNote(action.note);
    }

}
