import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TelaListagemComponent } from './views/tela-listagem/tela-listagem.component';
import { HttpClientModule } from '@angular/common/http';
import { TelaInviteComponent } from './views/tela-invite/tela-invite.component';
import { TelaCadastroComponent } from './views/tela-cadastro/tela-cadastro.component';
import { CadastroModel } from './models/cadastro-models';
import { CadastroService } from './services/cadastro.service';
import { TelaLoginComponent } from './views/tela-login/tela-login.component';
import { TelaNovoUsuarioComponent } from './views/tela-novo-usuario/tela-novo-usuario.component';
import { UsuarioModel } from './models/usuarioModel';
import { UsuarioSearchModel } from './models/usuarioSearchModel';
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { EventosModel } from './models/eventos.models';
import { TelaUsuarioComponent } from './views/tela-usuario/tela-usuario.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    TelaCadastroComponent,
    TelaListagemComponent,
    TelaLoginComponent,
    TelaInviteComponent,
    TelaNovoUsuarioComponent,
    TelaUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true,
    }),
    TextMaskModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    CadastroService,
    CadastroModel,
    UsuarioModel,
    UsuarioSearchModel,
    EventosModel,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
