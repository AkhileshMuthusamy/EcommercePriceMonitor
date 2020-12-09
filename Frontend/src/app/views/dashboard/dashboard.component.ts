import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddProductComponent} from './add-product/add-product.component';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'mci-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  openSearchListDialog() {
    const dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe((result: Array<any>) => {
      console.log(`Dialog result:`, result);
    });
  }
}
