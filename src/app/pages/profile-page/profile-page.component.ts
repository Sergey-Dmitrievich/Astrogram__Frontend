import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent,
    CommonModule,
    RouterModule,
    ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
  
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)
  subscribers$ = this.profileService.getSubscribersShortList(5)
  me$ = toObservable(this.profileService.me)

  profile$ = this.route.params
  .pipe(
    switchMap(({id}) => {
      if (id === "me") return this.me$

        return this.profileService.getAccount(id)
    })
  )
}