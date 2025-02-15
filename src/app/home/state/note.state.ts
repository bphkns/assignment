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
    getNotes(ctx: StateContext<Note[]>) {
        const state = [...ctx.getState()];
        state.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).reverse();
        ctx.setState(
            [
                ...state
            ]
        );
    }

    @Action(AddNote)
    addNote(ctx: StateContext<Note[]>, action: AddNote) {

        const state = ctx.getState();
        ctx.setState(
            [
                action.payload,
                ...state
            ]
        );
    }

    @Action(UpdateNote, { cancelUncompleted: true })
    updateNote(ctx: StateContext<Note[]>, action: UpdateNote) {
        const index = ctx.getState().findIndex(n => n.id === action.note.id);
        const state = [...ctx.getState()];
        state[index] = action.note;
        ctx.setState(
            [
                ...state
            ]
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
    }

}
