import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForoComponent } from './components/foro/foro.component';
import { AppComponent } from './app.component';
import { PerrosComponent } from './components/foro/perros/perros.component';
import { ForgotComponent } from './components/login/forgot/forgot.component';
import { GatosComponent } from './components/foro/gatos/gatos.component';
import { PecesComponent } from './components/foro/peces/peces.component';
import { RoedoresComponent } from './components/foro/roedores/roedores.component';
import { ReptilesComponent } from './components/foro/reptiles/reptiles.component';
import { AvesComponent } from './components/foro/aves/aves.component';
import { OtrosComponent } from './components/foro/otros/otros.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { UserComponent } from './components/user/user.component';
import { InfoComponent } from './components/user/info/info.component';
import { PostsComponent } from './components/user/posts/posts.component';
import { PostComponent } from './components/foro/post/post.component';
import { GruposComponent } from './components/user/grupos/grupos.component';
import { CreargrupoComponent } from './components/user/grupos/creargrupo/creargrupo.component';
import { EditInfoComponent } from './components/user/edit-info/edit-info.component';

export const routes: Routes = [
  { path: 'component', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'foro', component: ForoComponent },
  { path: 'post', component: PostComponent },
  { path: 'grupos', component: GruposComponent },
  { path: 'nuevo-grupo', component: CreargrupoComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'perros', component: PerrosComponent },
  { path: 'gatos', component: GatosComponent },
  { path: 'peces', component: PecesComponent },
  { path: 'roedores', component: RoedoresComponent },
  { path: 'reptiles', component: ReptilesComponent },
  { path: 'aves', component: AvesComponent },
  { path: 'otros', component: OtrosComponent },
  { path: 'nosotros', component: NosotrosComponent },
  {
    path: 'perfil',
    component: UserComponent,
    children: [
      { path: 'info', component: InfoComponent },
      { path: 'posts', component: PostsComponent },
    ],
  },
  { path: 'editInfo', component: EditInfoComponent },
];
