import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {AuthInterceptor} from '../../shared/interceptor/auth.interceptor';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  loginForm: FormGroup;

  constructor(private authService: AuthService, private authInterceptor: AuthInterceptor, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const username = this.loginForm.get('username')?.value;
    const password  = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe(data=>{
      if (data){
        this.authService.setCredentials(username, password);
        this.router.navigate(['/notes']);
      }
    });
  }
}
