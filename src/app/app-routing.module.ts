import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaCadastroComponent } from './../app/views/tela-cadastro/tela-cadastro.component';
import { PoliticaComponent } from './views/politica-uso/politica.component';
import { TelaInviteComponent } from './views/tela-invite/tela-invite.component';
import { TelaListagemComponent } from './views/tela-listagem/tela-listagem.component';
import { TelaLoginComponent } from './views/tela-login/tela-login.component';
import { TelaNovoUsuarioComponent } from './views/tela-novo-usuario/tela-novo-usuario.component';
import { TelaUsuarioComponent } from './views/tela-usuario/tela-usuario.component';
import { TermoComponent } from './views/termo/termo.component';

const routes: Routes = [
  { path: 'login', component: TelaLoginComponent },
  { path: 'cadastro/:_id', component: TelaCadastroComponent },
  { path: 'newUser', component: TelaNovoUsuarioComponent },
  { path: 'invite', component: TelaInviteComponent },
  { path: 'listagem', component: TelaListagemComponent },
  { path: 'termo', component: TermoComponent },
  { path: 'politica', component: PoliticaComponent },
  { path: 'user', children: [
      { path: '', component: TelaUsuarioComponent },
    ]
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/erro'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
