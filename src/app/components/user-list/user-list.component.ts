import { Component, OnInit ,} from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule , RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from '../../../../user.actions';
import { User } from '../../user';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule,RouterModule, RouterOutlet,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ],

})

export class UserListComponent implements OnInit {
 users:Array<any>=[]
 totalUsers: number = 0;
 totalPages: number = 0;
 currentPage: number = 2;
 pageSize:number=0;
 isLoading = true;
  constructor(private userService:UserService ,private router: Router ,private store:Store){}
  ngOnInit(): void {
    this.getUsers(this.currentPage)

  }

  getUsers(page:number){
    this.isLoading = true;
    this.userService.getUsers("https://reqres.in/api/users",page).subscribe((result:any)=>{
      this.users=result.data;
      this.isLoading = false;
      this.pageSize=result.per_page;
      this.totalPages=result.total_pages;
      next: (result: { data: User[]; }) => {
        const users: User[] = result.data;
        this.store.dispatch(loadUsersSuccess({ users }));
      }
    })
    error: (error: { message: any; }) => {
      this.isLoading = false;
      this.store.dispatch(loadUsersFailure({ error: error.message }));

    }

  }

  previousPage(){
    if(this.currentPage>1){
      this.currentPage --;
      this.getUsers(this.currentPage)
    }
  }

  nextPage(){
    if(this.currentPage<this.totalPages+1){
      this.currentPage ++;
      this.getUsers(this.currentPage)
    }
  }


}
