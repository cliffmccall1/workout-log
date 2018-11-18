import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProfilesService } from '../profiles.service';
import { Profile } from '../profiles.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../users/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  enteredDisplayName = '';
  enteredMotivation = '';
  profile: Profile;
  isLoading = false;
  private mode = 'create';
  private profileId: string;
  private authStatusSub: Subscription;

  constructor(
    public profilesService: ProfilesService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('profileId')) {
        this.mode = 'edit';
        this.profileId = paramMap.get('profileId');
        this.isLoading = true;
        this.profilesService
          .getProfile(this.profileId)
          .subscribe(profileData => {
            this.isLoading = false;
            this.profile = {
              id: profileData._id,
              avatar: profileData.avatar,
              displayName: profileData.displayName,
              motivation: profileData.motivation,
              creator: profileData.creator
            };
          });
      } else {
        // if we don't have a profile id we are in create mode
        this.mode = 'create';
        this.profileId = null;
      }
    });
  }

  onSaveProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.profilesService.addProfile(
        form.value.avatar,
        form.value.displayName,
        form.value.motivation,
        form.value.creator
      );
    } else {
      this.profilesService.updateProfile(
        this.profileId,
        form.value.avatar,
        form.value.displayName,
        form.value.motivation,
        form.value.creator
      );
    }
    form.resetForm();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
