import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './components/edit-usuario/edit-usuario.component';
import { UsuariosListComponent } from './components/usuario-list/usuario-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-usuario' },
  { path: 'add-usuario', component: AddUsuarioComponent },
  { path: 'edit-usuario/:id', component: EditUsuarioComponent },
  { path: 'usuarios-list', component: UsuariosListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }