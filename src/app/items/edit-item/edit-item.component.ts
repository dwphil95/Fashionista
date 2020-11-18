import { FashionItem } from './../../models/fashionItem';
import { ItemService } from './../../services/item.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemId: Number
  editForm: FormGroup;
  nameRequiredError = ""
  priceRequiredError = ""

  constructor(private itemService: ItemService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      fname: [''],
      price: ['']
    });
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
  }

  update() {
    var newItemName = this.editForm.controls["fname"].value
    var newItemPrice = this.editForm.controls["price"].value
    if (newItemName && newItemPrice) {
      var newFashionItem = new FashionItem()
      newFashionItem._id = this.itemId
      newFashionItem.fname = newItemName
      newFashionItem.price = newItemPrice
      this.itemService.updateFashionItem(newFashionItem).subscribe(result => console.log("Item edited successfully"))
      this.router.navigateByUrl('/manage-items');
    }
    else {
      this.nameRequiredError = (!newItemName) ? "Item name is required" : ""
      this.priceRequiredError = (!newItemPrice) ? "Item price is required" : ""
    }
  }

}
