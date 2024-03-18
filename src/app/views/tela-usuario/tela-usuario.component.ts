import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { EventosModel } from 'src/app/models/eventos.models';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { UsuarioSearchModel } from 'src/app/models/usuarioSearchModel';
import { CadastroService } from 'src/app/services/cadastro.service';

@Component({
  selector: 'app-tela-usuario',
  templateUrl: './tela-usuario.component.html',
  styleUrls: ['./tela-usuario.component.css'],
})
export class TelaUsuarioComponent implements OnInit {
  usuariosCadastrados: Array<any> | undefined;
  evento: EventosModel = new EventosModel();
  user: UsuarioModel = new UsuarioModel();
  userSearch: UsuarioSearchModel = new UsuarioSearchModel();
  bloquearUsuario = false;
  contatosComum: Array<any> | undefined;
  teste: any | undefined;
  days: any;
  alterarSenha:any;
  _id: any;
  upNome:any;
  
  telefone: any;

  constructor(
    private router: Router,
    private usuarioModel: UsuarioModel,
    private cadastroService: CadastroService,
    private eventosModel: EventosModel,
    private usuarioSearchModel: UsuarioSearchModel
  ) {}

  ngOnInit(): void {
    this.days = localStorage.getItem('eventos');


    let permission;
    permission = localStorage.getItem(
      'permission_user_x-acess-code-AUTHENTICATION'
    );
    let permissionType;
    permissionType = localStorage.getItem(
      'tipoUsuatio'
    );

    this._id = localStorage.getItem(
      'userId'
    );

    this.telefone = localStorage.getItem(
      'telefone'
    );

    if(permissionType != 'master'){
      this.bloquearUsuario = true
    }

    if (!permission) {
      this.router.navigate(['/login']);
    }

    this.usuarioSearchModel = new UsuarioSearchModel();

    this.listar();
  }

  async onSave() {
    try {
      localStorage.setItem('eventos', this.evento.nome);
      this.evento.userId = this._id
      this.evento.telefone = this.telefone
      this.evento.nome = this.evento.nome
      this.cadastroService.createEvento(this.evento);
      this.redirectCadastro();
    } catch (err: any) {
      alert('Erro ao realixar cadastro!');
    }
  }
  listar() {
    const tipoUsuário = 'master'
    this.cadastroService.buscarUsuario().forEach((dados) => {
      var obj = dados.map((c: [{ nome: string }, { senha: string }, { tipo: string }]) => c);
      this.usuariosCadastrados = obj;
    });
  }

  redirectCadastro() {
   let teste = this.router.navigate([`/cadastro/${this._id}`]);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  listarUsuario() {
    var nomeLogin = this.userSearch
    this.cadastroService.buscarUsuario().forEach((dados) => {
      var obj = dados.map((c: [{ nome: string }]) => c);
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].nome === nomeLogin) {
            this.contatosComum = [obj[i]]
            this.contatosComum[this.contatosComum.length - 1];
            const id = this.contatosComum.map(c => c._id) 
            this.user.nome = this.upNome
            this.cadastroService.updateUser(this.user, obj[i]._id)
            return window.location.reload();
        }
      }
    });
  }
  
  
  clear(){
    this.upNome='';
  
  }

  redirectListagem() {
    this.router.navigate(['/listagem']);
  }

  redirectInvite() {
    this.router.navigate(['/invite']);
  }

  redirectNovoUsuario() {
    this.router.navigate(['/newUser']);
  }
  redirect() {
    localStorage.removeItem('permission_user_x-acess-code-AUTHENTICATION') 
    this.router.navigate(['/login']);
  }
}
