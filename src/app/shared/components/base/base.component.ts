import {Directive, OnInit} from '@angular/core';
import {BaseModel} from '../../models/base.model';
import {BaseService} from '../../services/base.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';

@Directive()
export abstract class BaseComponent<T extends BaseModel> implements OnInit{
  data: Array<T> = new Array<T>();
  editComponent: any;
  searchForm: FormGroup;

  page: number = 0;
  size: number = 5;
  totalElements = 0;
  pageSizes = [5,10,20,50]

  protected constructor(protected service: BaseService<T>, protected dialog: MatDialog, protected fb: FormBuilder) {
    this.searchForm = this.fb.group({
      term: [null, []]
    });
  }

  ngOnInit() {
    this.searchEntities(true);
  }

  searchEntities(resetPage?: boolean): void {
    this.service
      .getAllPagination(this.page, this.size)
      .subscribe(data => {
        this.data = data.content
        this.totalElements = data.totalElements;
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

  onQuickSearch(): void {
    if(this.searchForm && this.searchForm.get('term') !== null){
      if(this.searchForm?.get('term')?.value !== ''){
        this.service.search(this.searchForm?.get('term')?.value).subscribe(data=>{
          if(data){
            this.data = data;
          }
        })
      }
    }
  }

  onPageChange(event: PageEvent) {
    console.log(event)
    this.size = event.pageSize;
    this.page = event.pageIndex;

    this.searchEntities();
  }
}
