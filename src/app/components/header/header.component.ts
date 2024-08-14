import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadUser } from '../../../../user.actions';
import { ActivatedRoute } from '@angular/router';
import { RouterModule , RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule ,RouterModule,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchTerm: string='';
  constructor(private router: Router ,private store: Store, private route: ActivatedRoute,
  ) { }

  searchUser(event:any): void {
    const searchTerm = event.target.value;
    console.log(searchTerm)
    if (searchTerm) {
      const userId = Number(this.searchTerm.trim());
    if (!isNaN(userId) && userId > 0) {
      this.router.navigate([`/user/${this.searchTerm}`]).then(() => {
        window.location.reload();
      });
      this.store.dispatch(loadUser({ id: userId }));

    }
    }

  }


}
