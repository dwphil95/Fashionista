import { FashionItem } from './../../models/fashionItem';
import { ItemService } from './../../services/item.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css']
})
export class ManageItemsComponent implements OnInit {

  fashionItems: FashionItem[]
  constructor(private itemService: ItemService, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.itemService.getFashionItems().subscribe(result => {
      this.fashionItems = result
    })
  }

  addNewItem() {
    this.router.navigateByUrl("/add-item")
  }

  editItem(id: any) {
    this.router.navigateByUrl(`/edit-item/${id}`)
  }

  deleteItem(id: any) {
    this.itemService.deleteFashionItem(id).subscribe(result => console.log(result))
    this.router.navigateByUrl('/manage-items');
  }

}
