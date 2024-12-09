import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NoteService} from './note.service';
import {BaseComponent} from '../../shared/components/base/base.component';
import {Note} from '../../shared/models/note.model';
import {MatDialog} from '@angular/material/dialog';
import {NoteDialogComponent} from './dialog/note-dialog.component';

@Component({
  selector: 'app-note',
  standalone: false,
  templateUrl: './note.component.html',
  styleUrl:'./note.component.scss'
})
export class NoteComponent extends BaseComponent<Note>{
  displayedColumns: string[] = ['id', 'title', 'content', 'actions'];

  constructor(private noteService: NoteService, dialog: MatDialog, private fb: FormBuilder, private router: Router) {
    super(noteService, dialog);
    this.editComponent = NoteDialogComponent;
  }

  onAdd(): void {
    this.addEntity();
  }

  onEdit(id: string): void {
    this.editEntity(id)
  }

  onDetails(id: string): void {
    this.details({ id: id, readOnly: true})
  }
}
