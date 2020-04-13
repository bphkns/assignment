import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

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
import { HighlightedTextComponent } from './container/highlighted-text/highlighted-text.component';


@NgModule({
  declarations: [
    HomeComponent, ContainerComponent, SideListComponent, EditorComponent, DatePipe, ContentEditorComponent, TitlePipe, DescriptionPipe, HighlightedTextComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
    NgxsModule.forFeature([NotesState])
  ]
})
export class HomeModule { }
