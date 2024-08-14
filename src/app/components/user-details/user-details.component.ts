import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RouterModule , RouterOutlet } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,CommonModule
    ,RouterModule,RouterOutlet,MatProgressSpinnerModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class UserDetailsComponent implements OnInit{
user:any;
id:any;
isLoading = true;

constructor(private route:ActivatedRoute , private userService:UserService){
  this.id=this.route.snapshot.paramMap.get("id");


}
ngOnInit(): void {
  this.getUserDetails();
}
getUserDetails(){
  this.isLoading = true;
  this.userService.getUserById("https://reqres.in/api/users/",Number(this.id)).subscribe(result => {
    this.user = result.data;
    this.isLoading = false;

  });
  error: () => {
    this.isLoading = false;
  }
}
}
