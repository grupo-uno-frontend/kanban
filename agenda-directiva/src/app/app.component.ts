import { Component } from '@angular/core';
import { ThemeService } from './theme.service';

import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agenda-interactiva';

  constructor(private themeService: ThemeService) {}

    changeTheme(theme: string) {
        this.themeService.switchTheme(theme);
    }
}
