import {Directive, OnInit} from '@angular/core';
import {BaseModel} from '../../models/base.model';
import {BaseService} from '../../services/base.service';
import {MatDialog} from '@angular/material/dialog';


@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class BaseComponent<T extends BaseModel> implements OnInit{
  data: Array<T> = new Array<T>();

  editComponent: any;

  protected constructor(protected service: BaseService<T>, protected dialog: MatDialog) {
  }

  ngOnInit() {
    this.searchEntities(true);
  }

  searchEntities(resetPage?: boolean): void {
    this.service
      .getAll()
      .subscribe(data => this.data = data);
  }


  details(params: any): void {
    const dialogRef = this.dialog.open(this.editComponent, {
      disableClose: true,
      data: params
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.value) {
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
      if (result && result.value) {
        this.searchEntities();
      }
    });
  }

  editEntity(id: string): void {
    this.details({id: id});
  }

  deleteEntity(id: number): void {
    /*this.modalService.confirmDelete().onClosed.subscribe(data => {
      if (data.value) {
        this.service.deleteEntity(id).subscribe(
          () => this.searchEntities()
        );
      }
    });*/
  }
}
