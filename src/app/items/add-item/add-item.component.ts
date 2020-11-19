import { FashionItem } from './../../models/fashionItem';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './../../services/item.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  addForm: FormGroup;
  idError = ""
  nameError = ""
  priceError = ""

  constructor(private itemService: ItemService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      id: [''],
      fname: [''],
      price: ['']
    });
  }

  addItem() {
    var newItemId = this.addForm.controls["id"].value
    var newItemName = this.addForm.controls["fname"].value
    var newItemPrice = this.addForm.controls["price"].value
    if (newItemId && newItemName && newItemPrice) {
        var newFashionItem = new FashionItem()
        newFashionItem._id = newItemId
        newFashionItem.fname = newItemName
        newFashionItem.price = newItemPrice
        this.itemService.getFashionItembyId(newItemId).subscribe(result => {
          if (result["length"] == 0) {
            this.itemService.storeFashionItem(newFashionItem).subscribe(result => console.log("Item added successfully"))
            this.router.navigateByUrl('/manage-items');
          }
          else
            this.idError = "ID already exists"
        })  
    }
    else {
      this.idError = (!newItemId) ? "Item Id is required" : ""
      this.nameError = (!newItemName) ? "Item name is required" : ""
      this.priceError = (!newItemPrice) ? "Item price is required" : ""
    }
  }

}
