import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { Profile } from '../profiles.model';
import { ProfilesService } from '../profiles.service';
import { AuthService } from '../../users/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profiles: Profile[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private profilesSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public profilesService: ProfilesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.profilesService.getProfiles();
    this.userId = this.authService.getUserId();
    this.profilesSub = this.profilesService
      .getProfileUpdateListener()
      .subscribe(
        (profiles: Profile[]) => {
          this.isLoading = false;
          this.profiles = profiles;
        }
      );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  ngOnDestroy() {
    this.profilesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  changeTheme() {
    if (document.body.classList.contains('default-theme')) {
      document.body.classList.remove('default-theme');
      document.body.classList.add('one-theme');
    } else if (document.body.classList.contains('one-theme')) {
      document.body.classList.remove('one-theme');
      document.body.classList.add('two-theme');
    } else {
      document.body.classList.remove('two-theme');
      document.body.classList.add('default-theme');
    }
  }
}

