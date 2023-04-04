import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './navbar-layout.component.html'
})
export class NavbarLayoutComponent {

}
