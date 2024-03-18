import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as e from 'cors';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { CadastroService } from 'src/app/services/cadastro.service';

@Component({
  selector: 'app-tela-novo-usuario',
  templateUrl: './tela-novo-usuario.component.html',
  styleUrls: ['./tela-novo-usuario.component.css']
})
export class TelaNovoUsuarioComponent implements OnInit {

  login: boolean | undefined
  usuario: UsuarioModel = new UsuarioModel();
  contatos: Array<any> | undefined;
  currentStep = '';
  senhaC ='';


  constructor(
    private cadastroModel: UsuarioModel,
    private cadastroService: CadastroService,
    private router: Router

  ){}

  ngOnInit(){
    let permission;
    permission = localStorage.getItem("permission_user_x-acess-code-AUTHENTICATION");

    if(!permission){
      this.router.navigate(['/login']);
    }

  }
  
  async onSave() {
    let prefix = "+55"
    let number = this.usuario.telefone
    let result = "";
    if(this.usuario.senha != this.senhaC){
      alert("A sua senha está divergente. Por Favor confirme sua senha novamente. ");
    }else{

    if (!this.usuario["nome"] && !this.usuario["email"] && !this.usuario["senha"]
           && !this.usuario["tipo"]) {
       return  alert('Preencha todos os campos para completar o seu cadastro');
    };
    try {
      result = prefix + number ;
      this.cadastroService.createUser(this.usuario)
      this.router.navigate(['/user']);

    }catch (err: any) {
      alert("Erro ao realixar cadastro!");
    }
    }
  }

  verifyletra(rawValue: string): RegExp[] {
    const mask = /[A-Za-zÁ-Úá-úÀ-Ùà-ùÃ-Õã-õÄ-Üä-üÂ-Ûâ-ûÇç' ']/;
    const strLength = String(rawValue).length;
    const nameMask: RegExp[] = [];
    for (let i = 0; i <= strLength; i++) {
      nameMask.push(mask);
    }
    return nameMask
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

  redirect() {
    this.router.navigate(['/user']);
  }
//limpar campos
  clear() {
    this.usuario.nome = ''
    this.usuario.email = ''
    this.usuario.senha = ''
    this.senhaC =''
    this.usuario.telefone = ''
    this.usuario.bairro = ''
    this.usuario.cidade =''
  }
}
