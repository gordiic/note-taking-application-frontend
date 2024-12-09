import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BaseDialogComponent} from '../../../shared/components/base/base-dialog.component';
import {Note} from '../../../shared/models/note.model';
import {NoteService} from '../note.service';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-note-dialog',
  standalone: false,
  templateUrl: 'note-dialog.component.html',
  styleUrl: 'note-dialog.component.scss'
})
export class NoteDialogComponent extends BaseDialogComponent<Note>{

  constructor(@Inject(MAT_DIALOG_DATA) par: any,
              service: NoteService,
              dialogRef: MatDialogRef<NoteDialogComponent>) {
    super(par, service, dialogRef);
    this.form = service.createNoteForm();
  }


}
