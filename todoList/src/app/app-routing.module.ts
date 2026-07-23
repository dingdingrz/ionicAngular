import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListItemDetailComponent } from './list-item-detail/list-item-detail.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {path: "",component:TodoListComponent},
  {
  path: 'list-item-detail/:id',
  component: ListItemDetailComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
