import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CrudApp';
  isMenuOpen: boolean = false;
  constructor(
    private router: Router
  ) {}
  logout(){
    this.router.navigateByUrl('/login');
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }
}
