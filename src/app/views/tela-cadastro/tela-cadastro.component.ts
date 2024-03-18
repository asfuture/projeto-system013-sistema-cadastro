import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as e from 'cors';
import { data } from 'jquery';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CadastroModel } from 'src/app/models/cadastro-models';
import { CadastroService } from 'src/app/services/cadastro.service';
declare const gapi: any;

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css'],
})
export class TelaCadastroComponent implements OnInit {
  @ViewChild('buttonDeactiveUserModal') buttonDeactiveUserModal!: ElementRef;

  login: boolean = false;
  cadastro: CadastroModel = new CadastroModel();
  contatos: Array<any> | undefined;
  eventos: Array<any> | undefined;
  teta: any;
  currentStep = '';
  textMask: any;
  evento: any;
  telefone: any;
  _id: any;
  data: any;
  input_telefone =false;
  permission: any;

  url_id: any;
  contatosComum: Array<any> | undefined;

  
  telefoneWaths: any | undefined;
  envio: string | undefined;
  emailPattern =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(
    private cadastroModel: CadastroModel,
    private cadastroService: CadastroService,
    private cepService: CadastroService,
    private router: Router
  ) {}

  ngOnInit() {
    (window as any).googleLogin = this.googleLogin;
    this.login = false;
    this.currentStep = 'termo';
    this.textMask = { mask: false };
    this.evento = localStorage.getItem('eventos');
    this.telefone = localStorage.getItem('telefone');
    this._id = localStorage.getItem('userId');
    this.teta = this.evento;
    this.telefoneWaths = this.telefone ? this.telefone :'+5513991979667';
    this.permission = localStorage.getItem(
      'permission_user_x-acess-code-AUTHENTICATION'
    );
    var url_string = window.location.href;
    var url = new URL(url_string);
    this.url_id = url.pathname
    this.url_id.substring(40,10)
    this.listar()
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }  }

  consultaCep(valor: string, form: any) {
    this.cepService
      .buscar(valor)
      .subscribe((dados) => this.popularForm(dados, form));
  }
  popularForm(dados: any, form: any) {
    form.setValue({
      cep: dados.cep,
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      // uf:dados.uf
    });
  }

  redirectUser() {
    this.router.navigate(['/user']);
  }

  googleLogin() {
    let googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
      this.currentStep = 'dados_pessoais2'

      googleAuth.signIn({ scope: 'profile email' }).then((googleUser: any) => {
        this.data = googleUser.getBasicProfile();
        this.cadastro.nome = this.data.getName();
        this.cadastro.email = this.data.getEmail();
        this.cadastro.termo_politica = true;    
      });

    });
    return 
  }

  redirectProxPage(){
    this.cadastro.termo_politica = true; 
    let res = 'dados_pessoais'

    if(this.cadastro.termo_politica){
      this.currentStep = res;
    }
  }

  authenticate() {
    let googlePhone = gapi.auth2
      .getAuthInstance()
      .signIn({
        scope: 'https://www.googleapis.com/auth/user.phonenumbers.read',
      })
      .then(
        (response: any) => {
          console.log('sign in successful: ');
        },
        (err: any) => {
          console.log('error signing in: ', err);
        }
      );

    return googlePhone;
  }



  listar() {
    var dataLogin = moment().utc().format('DD/MM/YYYY'); 
    var nomeLogin = this.url_id.substring(40,10);
    this.cadastroService.buscarEventos().forEach((dados) => {
      var obj = dados.map((c: { nome: string }, i: number) => c);
      for (var i = 0; i < obj.length ; i++) {
        let dataAtual = moment(obj[i].dataCriacao).utc().format('DD/MM/YYYY')
          if (dataAtual == dataLogin && nomeLogin == obj[i].userId) {
            this.contatosComum = [obj[i]]
            this.contatosComum[this.contatosComum.length - 1];
          return
        }
      }
      this.telefoneWaths = this.contatosComum?.map(c => c.telefone)

    });
  }


  async onSave() {
    this.login = true;

    try {
      let prefix = "+55"
      let number = this.cadastro.telefone
      let result = "";
      let idUser = this.contatosComum?.map(c => c.userId)
      let eventoUser = this.contatosComum?.map(c => c.nome)
      this.cadastro.evento = eventoUser ? eventoUser[0] : ""
      this.cadastro.userId = idUser ? idUser[0] : ""
      this.telefoneWaths = this.contatosComum?.map(c => c.telefone)
      result = prefix + number ;
      this.cadastro.telefone = result;
      this.cadastroService.create(this.cadastro);
    } catch (err: any) {
      alert('Erro ao realizar cadastro!');
    }
  }

  verifyNameMask(rawValue: string): RegExp[] {
    const mask = /[A-Za-zÁ-Úá-úÀ-Ùà-ùÃ-Õã-õÄ-Üä-üÂ-Ûâ-ûÇç - @_. 0-9 ]/;
    const strLength = String(rawValue).length;
    const nameMask: RegExp[] = [];
    for (let i = 0; i <= strLength; i++) {
      nameMask.push(mask);
    }

    return nameMask;
  }

  verifyletra(rawValue: string): RegExp[] {
    const mask = /[A-Za-zÁ-Úá-úÀ-Ùà-ùÃ-Õã-õÄ-Üä-üÂ-Ûâ-ûÇç' ']/;
    const strLength = String(rawValue).length;
    const nameMask: RegExp[] = [];
    for (let i = 0; i <= strLength; i++) {
      nameMask.push(mask);
    }

    return nameMask;
  }

  verifynumber(rawValue: string): RegExp[] {
    const mask = /[0-9]/;
    const strLength = String(rawValue).length;
    const nameMask: RegExp[] = [];
    for (let i = 0; i <= strLength; i++) {
      nameMask.push(mask);
    }

    return nameMask;
  }
  redirect() {
    this.router.navigate(['/cadastro']);
  }
  volta_e_atualizar(){
    alert("teste");
  }

  keyFunc(event:any) {
   if(this.cadastro.telefone?.length == 11 ){
   this.input_telefone = true
   }
  }
  
}
export class DialogContentExampleDialog {}
