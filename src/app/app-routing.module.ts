import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { StoreComponent } from './store/store.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ManageItemsComponent } from './items/manage-items/manage-items.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { ItemDetailsComponent } from './items/item-details/item-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'manage-items', component: ManageItemsComponent, canActivate: [AuthGuard]},
  { path: 'add-admin', component: AddAdminComponent, canActivate: [AuthGuard]},
  { path: 'add-item', component: AddItemComponent, canActivate: [AuthGuard]},
  { path: 'edit-item/:id', component: EditItemComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'store', component: StoreComponent, canActivate: [AuthGuard]},
  { path: 'item-details/:id', component: ItemDetailsComponent, canActivate: [AuthGuard]},
  { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
