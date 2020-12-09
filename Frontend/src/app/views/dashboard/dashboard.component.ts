import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddProductComponent} from './add-product/add-product.component';
import {AuthService} from '../../shared/services/auth.service';
import {ProductService} from '../../services/product.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'mci-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products = [];


  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe((result: Array<any>) => {
      console.log(`Dialog result:`, result);
    });
  }

  loadProducts() {
    this.productService.getUserProductAPI().subscribe(res => {
      if (!res.error) {
        this.products = res.data;
      }
    });
  }

  deleteProduct(pid: string) {
    this.productService.deleteUserProduct(pid).subscribe(res => {
      if (!res.error) {
        this.snackBar.open(res.message, 'Close', {duration: 2000});
        this.loadProducts();
      }
      this.snackBar.open(res.message, 'Close', {duration: 2000});
    });
  }
}
