import { Component, OnInit } from '@angular/core';

import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
/* import { Router } from '@angular/router'; */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fireAuth: Auth/* , private router: Router */) {}

  ngOnInit(): void {
  }

  async loginGoogle() {
    await signInWithPopup(this.fireAuth, new GoogleAuthProvider());
    /* this.router.navigateByUrl('chat'); */
  }

}
