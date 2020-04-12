import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../modes/note.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getNotes() {
    return this.http.get<Note[]>(`${environment.url}/notes?_sort=createdAt&_order=desc`);
  }

  createNote(payload: { name: string; description: string; createdAt: string; }) {
    return this.http.post<Note>(`${environment.url}/notes`, payload);
  }

  updateNote(payload: Note) {
    return this.http.put<Note>(`${environment.url}/notes/${payload.id}`, payload);
  }

  deleteNote(payload: Note) {
    return this.http.delete<Note>(`${environment.url}/notes/${payload.id}`);
  }
}
