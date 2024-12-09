import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  templateUrl: './toolbar.component.html',
  styleUrl:'./toolbar.component.scss'
})
export class ToolbarComponent {
  displayedColumns: string[] = ['id', 'title', 'content', 'actions'];

  constructor(private authService: AuthService, private router: Router) {}
  onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);

  }

}
