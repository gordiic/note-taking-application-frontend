import {Directive, OnInit} from '@angular/core';
import {BaseModel} from '../../models/base.model';
import {FormGroup, Validators} from '@angular/forms';
import {BaseService} from '../../services/base.service';
import {EMPTY, Observable} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {Note} from '../../models/note.model';

@Directive()
export abstract class BaseDialogComponent<T extends BaseModel> {
  data?: T;
  form?: FormGroup;
  readOnly?: boolean = false;
  protected constructor(
    protected params: any,
    protected service: BaseService<T>,
    public dialogRef: MatDialogRef<BaseDialogComponent<T>>,
  ) {
    this.loadData(this.params);
  }

  protected loadData(params: any): void {
    if (params && params.id) {
      this.service.get(params.id).subscribe((data) => {
        this.data = data;

        this.form?.patchValue(data);

        if (params.readOnly) {
          this.form?.disable();
        }
      });
    }
    if (params.readOnly) {
      this.readOnly = params.readOnly;
      this.form?.disable();
    }
  }

  close(data?: T): void {
    this.dialogRef.close(data);
  }

  onSubmit(event: any): void {
    const o: Observable<T> = this.submitData();
    o.subscribe((data) => {
      this.close(data)
    });
  }

  protected submitData(): Observable<T> {
    this.form?.markAsTouched();
    if (!this.form?.valid) {
      return EMPTY;
    }

    return this.form.value.id
      ? this.service.update(this.form.value)
      : this.service.create(this.form.value);
  }

}
