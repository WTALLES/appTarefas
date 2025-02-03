
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {RegisterComponent} from './components/register/register.component';



const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'tasks', component: TaskBoardComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
