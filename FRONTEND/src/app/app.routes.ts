import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ForoComponent } from './components/foro/foro.component';
import { AppComponent } from './app.component';
import { PerrosComponent } from './components/foro/perros/perros.component';
import { ForgotComponent } from './components/auth/login/forgot/forgot.component';
import { GatosComponent } from './components/foro/gatos/gatos.component';
import { PecesComponent } from './components/foro/peces/peces.component';
import { RoedoresComponent } from './components/foro/roedores/roedores.component';
import { ReptilesComponent } from './components/foro/reptiles/reptiles.component';
import { AvesComponent } from './components/foro/aves/aves.component';
import { OtrosComponent } from './components/foro/otros/otros.component';
import { NosotrosComponent } from './components/public/nosotros/nosotros.component';
import { UserComponent } from './components/user/user.component';
import { InfoComponent } from './components/user/info/info.component';
import { PostsComponent } from './components/user/posts/posts.component';
import { EditInfoComponent } from './components/user/edit-info/edit-info.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { PostFormComponent } from './components/foro/post-form/post-form.component';
import { ThreadComponent } from './components/foro/thread/thread.component';
import { DescComponent } from './components/user/desc/desc.component';
import { PetsComponent } from './components/public/pets/pets.component';
import { UserPetsComponent } from './components/user/user-pets/user-pets.component';
import { AddPetComponent } from './components/user/user-pets/add-pet/add-pet.component';
import { PetComponent } from './components/user/user-pets/pet/pet.component';
import { PetDescComponent } from './components/user/user-pets/pet/pet-desc/pet-desc.component';
import { VetVisitComponent } from './components/user/user-pets/pet/vet-visit/vet-visit.component';
import { PetInfoComponent } from './components/user/user-pets/pet/pet-info/pet-info.component';
import { PetPhotosComponent } from './components/user/user-pets/pet/pet-photos/pet-photos.component';
import { EditPetInfoComponent } from './components/user/user-pets/pet/pet-info/edit-pet-info/edit-pet-info.component';
import { AddVisitComponent } from './components/user/user-pets/pet/vet-visit/add-visit/add-visit.component';
import { EditVisitComponent } from './components/user/user-pets/pet/vet-visit/edit-visit/edit-visit.component';

export const routes: Routes = [
  { path: 'component', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'foro', component: ForoComponent },
  { path: 'post', component: PostFormComponent },
  { path: 'post/edit/:id', component: PostFormComponent },
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
      { path: '', component: DescComponent },
      { path: 'user-pets', component: UserPetsComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'info', component: InfoComponent },
    ],
  },
  { path: 'editInfo', component: EditInfoComponent },
  { path: 'cambiar-contraseña', component: ChangePasswordComponent },
  { path: 'recuperar-cuenta', component: ResetPasswordComponent },
  { path: 'thread/:id', component: ThreadComponent },
  { path: 'mascotas', component: PetsComponent },
  { path: 'añadir-mascota', component: AddPetComponent },
  {
    path: 'mascota/:id',
    component: PetComponent,
    children: [
      { path: 'pet-desc', component: PetDescComponent },
      { path: 'vet-visit', component: VetVisitComponent },
      { path: 'pet-photos', component: PetPhotosComponent },
      { path: 'pet-info', component: PetInfoComponent },
    ],
  },
  { path: 'editPetInfo/:id', component: EditPetInfoComponent },
  { path: 'añadir-visita/:petId', component: AddVisitComponent },
  { path: 'editar-visita/:petId/:visitId', component: EditVisitComponent },
];
