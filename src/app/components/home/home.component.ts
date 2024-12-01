import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CardStyleDirective } from '../../directives/cardstyle.directive';
import { ButtonStyleDirective } from '../../directives/buttonstyle.directive';

@Component({
  selector: 'app-home',
  imports: [RouterModule,CardStyleDirective,ButtonStyleDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

