import { DataSharingService } from './services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthModule } from './auth/auth.module';
import { ManageItemsComponent } from './items/manage-items/manage-items.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { StoreComponent } from './store/store.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    ManageItemsComponent,
    AddAdminComponent,
    EditItemComponent,
    AddItemComponent,
    StoreComponent,
    ItemDetailsComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
