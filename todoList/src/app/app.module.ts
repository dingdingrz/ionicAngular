import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OperateBoxComponent } from './operate-box/operate-box.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ListItemDetailComponent } from './list-item-detail/list-item-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    OperateBoxComponent,
    TodoListComponent,
    ListItemDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
