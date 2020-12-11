import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  url = '';
  isLoading = false;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddProductComponent>) {
  }

  ngOnInit(): void {
  }

  addProduct() {
    this.isLoading = true;
    this.productService.addProductAPI(this.url).subscribe(response => {
      if (!response.error) {
        this.snackBar.open(response.message, 'close', {duration: 2000});
        this.dialogRef.close();
      } else {
        this.snackBar.open(response.message, 'close', {duration: 2000});
      }
      this.isLoading = false;
    }, () => {
        this.isLoading = false;
        this.snackBar.open( 'Error while connecting. Please try again.', 'Close', {duration: 2000});
    });
  }
}
