import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ContainerComponent } from './container/container.component';
import { SideListComponent } from './container/side-list/side-list.component';
import { EditorComponent } from './container/editor/editor.component';
import { DatePipe } from './pipe/date.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { NgxsModule } from '@ngxs/store';
import { NotesState } from './state/note.state';
import { TitlePipe } from './pipe/title.pipe';
import { DescriptionPipe } from './pipe/description.pipe';


@NgModule({
  declarations: [HomeComponent, ContainerComponent, SideListComponent, EditorComponent, DatePipe, ContentEditorComponent, TitlePipe, DescriptionPipe],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    NgxsModule.forFeature([NotesState])
  ]
})
export class HomeModule { }
