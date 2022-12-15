import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

  freshnessList = ['BrandNew','Used one','Refurbiushed'];
  productFrom !: FormGroup;
  actionbtn : string = 'Save'
  constructor (private fromBuilder : FormBuilder,@Inject(MAT_DIALOG_DATA) public editData :any, private api : ApiService,private dialogRef : MatDialogRef<DialogComponent>){

  }

  ngOnInit(): void {
    this.productFrom = this.fromBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      date : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment : ['',Validators.required],
    })
    if(this.editData){
      this.actionbtn = 'Update'
      this.productFrom.controls['productName'].setValue(this.editData.productName);
      this.productFrom.controls['category'].setValue(this.editData.category);
      this.productFrom.controls['date'].setValue(this.editData.date);
      this.productFrom.controls['freshness'].setValue(this.editData.freshness);
      this.productFrom.controls['price'].setValue(this.editData.price);
      this.productFrom.controls['comment'].setValue(this.editData.comment);
    }
  }

  addproduct(){
    if(!this.editData){
      if(this.productFrom.valid){
        this.api.postProduct(this.productFrom.value)
        .subscribe({
          next:(res)=>{
            alert("Product Added Successfully!");
            this.productFrom.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error While Adding Product!")
          }
        })
      }
    }
    else{
      this.updateProduct()
    }
  }
  updateProduct() {
    this.api.putProduct(this.productFrom.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product Updated Successfully!");
        this.productFrom.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error While Updating Product!")
      }
    })
  }
}
