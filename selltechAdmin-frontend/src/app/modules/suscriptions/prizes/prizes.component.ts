import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetPrizesResponse } from 'src/app/interfaces/prizes/GetPrizesResponse.interface';
import { Prize } from 'src/app/interfaces/prizes/Prize.interface';
import { PrizeService } from 'src/app/services/apis/prize-api/prize.service';
import { PrizeDialogCreateComponent } from 'src/app/shared/components/subscriptions/prize-dialog-create/prize-dialog-create.component';

@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.css']
})
export class PrizesComponent implements AfterViewInit{

  prizesData: MatTableDataSource<Prize> = new MatTableDataSource();
  selection = new SelectionModel<Prize>(true, []);
  displayedColumns: string[] = [
    'select',
    'name',
    'description',
    'quantity',
    'active',
    'actions'
  ];
  isHeaderCheckboxChecked = false;

  //loadings
  isLoadingResults = true;
  resultsLength = 0;
  isAnyRowSelected = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private prizeService: PrizeService,
    private _liveAnnouncer: LiveAnnouncer,
  ) {}

  ngAfterViewInit(){
      this.fetchPrizes();
  }

  fetchPrizes(){
    this.isLoadingResults = true;
    this.prizeService.getPrizes().subscribe({
      next: (response: GetPrizesResponse) => {
        this.prizesData = new MatTableDataSource(response.prizes);
        this.prizesData.paginator = this.paginator;
        this.prizesData.sort = this.sort;
        this.isLoadingResults = false;
      },
      error: (error) => {
        this.isLoadingResults = false;
        console.log(error);
      }
    });
  }

  announceSortChange(sortState: Sort){
    if(sortState.direction){
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.prizesData.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(){
    if(this.isAllSelected()){
      this.isAnyRowSelected = true;
      this.selection.clear();
      return;
    }
    this.isAnyRowSelected = false;
    this.selection.select(...this.prizesData.data);
    this.isHeaderCheckboxChecked = this.isAllSelected();
  }

  checkboxLabel(row?: Prize): string{
    if(row?.id || row?.id === undefined){
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row?.id + 1}`;
  }

  isCheckBoxSelected(event: Event){
    event.stopPropagation();
    if(this.selection.selected.length > 0){
      this.isAnyRowSelected = false;
      return;
    }
    this.isAnyRowSelected = true;
  }

  openCreateDialog(){
    this.dialog.open(PrizeDialogCreateComponent, {
      width: '600px',
      height: '600px'
    }).afterClosed().subscribe({
      next: () => {
        this.fetchPrizes();
      }
    });
  }

  openEditDialog(prize: Prize){
    console.log('Edit prize')
  }
}
