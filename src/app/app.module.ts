import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { PostComponent } from './components/post/post.component';
import { FeedSectionComponent } from './components/feed-section/feed-section.component';
import { PostsSectionProfileComponent } from './components/posts-section-profile/posts-section-profile.component';
import { FollowersSectionProfileComponent } from './components/followers-section-profile/followers-section-profile.component';
import { FollowingSectionProfileComponent } from './components/following-section-profile/following-section-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PublishNowComponent } from './components/publish-now/publish-now.component';
import { CommentComponent } from './components/comment/comment.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ProfileHeaderSectionComponent } from './components/profile-header-section/profile-header-section.component';
import { CommentNowComponent } from './components/comment-now/comment-now.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    ProfilePageComponent,
    PostComponent,
    FeedSectionComponent,
    PostsSectionProfileComponent,
    FollowersSectionProfileComponent,
    FollowingSectionProfileComponent,
    ProfileComponent,
    PostPageComponent,
    NavbarComponent,
    PublishNowComponent,
    CommentComponent,
    EditProfilePageComponent,
    FeedPageComponent,
    SearchPageComponent,
    LoadingOverlayComponent,
    DialogComponent,
    ProfileHeaderSectionComponent,
    CommentNowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
