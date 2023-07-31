import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { PostsSectionProfileComponent } from './components/posts-section-profile/posts-section-profile.component';
import { FollowersSectionProfileComponent } from './components/followers-section-profile/followers-section-profile.component';
import { FollowingSectionProfileComponent } from './components/following-section-profile/following-section-profile.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', component: FeedPageComponent, title: 'Inicio' },
      {
        path: 'profile',
        component: ProfilePageComponent,
        title: 'Perfil',
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
          { path: ':id', component: PostsSectionProfileComponent,  },
          { path: ':id/edit', component: EditProfilePageComponent, title: 'Perfil | Editar' },
          { path: ':id/followers', component: FollowersSectionProfileComponent, title: 'Perfil | Seguidores' },
          { path: ':id/following', component: FollowingSectionProfileComponent, title: 'Perfil | Siguiendo' },
        ]
      },
      { path: 'post/:id', component: PostPageComponent, title: 'Publicación' },
      { path: 'search/:query', component: SearchPageComponent, title: 'Búsqueda' },
    ]
  },
  { path: 'login', component: LoginPageComponent, title: 'Inicio de sesión' },
  { path: 'register', component: RegisterPageComponent, title: 'Registro' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
