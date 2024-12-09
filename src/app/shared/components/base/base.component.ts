import {Directive, OnInit} from '@angular/core';
import {BaseModel} from '../../models/base.model';
import {BaseService} from '../../services/base.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Directive()
export abstract class BaseComponent<T extends BaseModel> implements OnInit{
  data: Array<T> = new Array<T>();
  editComponent: any;

  protected constructor(protected service: BaseService<T>, protected dialog: MatDialog) {}

  ngOnInit() {
    this.searchEntities(true);
  }

  searchEntities(resetPage?: boolean): void {
    this.service
      .getAll()
      .subscribe(data => {
        this.data = data
      });
  }


  details(params: any): void {
    const dialogRef = this.dialog.open(this.editComponent, {
      disableClose: true,
      data: params
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.searchEntities();
      }
    });
  }

  addEntity(): void {
    const dialogRef = this.dialog.open(this.editComponent, {
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.searchEntities();
      }
    });
  }

  editEntity(id: string): void {
    this.details({id: id});
  }

  deleteEntity(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: { title: "Delete", message: "Are you sure you want to delete entity?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(id).subscribe(
          () => this.searchEntities()
        );
      }
    });
  }
}
