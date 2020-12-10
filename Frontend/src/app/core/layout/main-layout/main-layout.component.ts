import {Component, OnInit} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'mci-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  sideMenuMode: 'over' | 'side' = 'over';
  sideMenuOpened = false;
  showMenuLabel = true;

  constructor(public mediaObserver: MediaObserver, private router: Router, public authService: AuthService) {
    mediaObserver.asObservable().subscribe((mediaChange) => {
      const screen = mediaChange[0].mqAlias;
      if (screen === 'xs') {
        this.sideMenuMode = 'over';
        this.sideMenuOpened = false;
        this.showMenuLabel = true;
      } else {
        this.sideMenuMode = 'side';
        this.sideMenuOpened = true;
      }
    });
  }

  ngOnInit(): void {
    if (!this.authService.hasUser()) {
      this.authService.logout();
    }
  }

}
