import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

export interface AccountShortInfo {
  name: string;
  accno: number;
}

const ELEMENT_DATA: AccountShortInfo[] = [
  {accno: 1, name: 'User 1'},
  {accno: 2, name: 'User 2'},
  {accno: 3, name: 'A very very long user name with close button'},
  {accno: 4, name: 'User 4'},
  {accno: 5, name: 'User 5'},
  {accno: 6, name: 'Super user'},
  {accno: 7, name: 'Admin'},
  {accno: 8, name: 'New Customer'},
  {accno: 9, name: 'Test Account'},
  {accno: 10, name: 'Trial Account'},
];

@Component({
  selector: 'mci-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'accno', 'name'];
  dataSource = new MatTableDataSource<AccountShortInfo>(ELEMENT_DATA);
  selection = new SelectionModel<AccountShortInfo>(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AccountShortInfo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.accno + 1}`;
  }

  viewSelected() {
    console.log(this.selection.selected);
  }

}
