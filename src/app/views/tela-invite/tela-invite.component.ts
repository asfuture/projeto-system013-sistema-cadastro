import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnyName } from 'salve';
import { CadastroModel } from 'src/app/models/cadastro-models';
import { WathsModel } from 'src/app/models/waths-models';
import { CadastroService } from 'src/app/services/cadastro.service';
import * as _ from 'lodash';
import { indexOf } from 'lodash';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tela-invite',
  templateUrl: './tela-invite.component.html',
  styleUrls: ['./tela-invite.component.css'],
})
export class TelaInviteComponent implements OnInit {
  wathsapp: WathsModel = new WathsModel();

  user: CadastroModel = new CadastroModel();

  contatos: Array<any> | undefined;
  active: boolean | undefined;
  options: any;
  data: any;
  filter: any;
  node: any;
  inputFone = false;
  inputSelect = false;
  arrayInvite: string | undefined;
  phonesArray: Array<string> | undefined;
  phonesArray2: Array<string> | undefined;
  phonesArray3: Array<string> | undefined;
  phonesArray4: Array<string> | undefined;
  phonesArray5: Array<string> | undefined;

  liberar2button = false;
  liberar3button = false;
  liberar4button = false;
  liberar5button = false;

  teste: any;

  variosPhones: Array<string> | undefined;

  constructor(
    private cadastroService: CadastroService,

    private router: Router // private excel: AppCSV
  ) {}

  ngOnInit() {
    let permission;
    permission = localStorage.getItem(
      'permission_user_x-acess-code-AUTHENTICATION'
    );
    if (!permission) {
      this.router.navigate(['/login']);
    }
    this.listar();
  }
  listar() {
    let teste = this.cadastroService
      .listar()
      .subscribe((dados) => (this.contatos = dados));
  }
  myFunction1() {
    this.liberar2button = true;
    this.node = document.createElement('ol');
    const textnode = document.createTextNode(this.wathsapp.telefone);
    this.node.appendChild(textnode);
    let phonesArray1 = document
      .getElementById('myList1')!
      .appendChild(this.node);
    phonesArray1.compareDocumentPosition(this.node);
    let phoneUnit = this.wathsapp.telefone;
    this.Verificar1numero(phoneUnit);
  }

  Verificar1numero(numeros: any) {
    var telefoneSelecionado = numeros?.substring(14, 0);
    this.teste = this.cadastroService.listar().forEach((dados) => {
      var obj = dados.map((c: [{ telefone: string }]) => c);
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].telefone === telefoneSelecionado) {
          this.phonesArray = [telefoneSelecionado];
          this.phonesArray[this.phonesArray.length];
          return;
        }
      }
    });
  }

  myFunction2() {
    this.liberar3button = true;
    const node = document.createElement('ol');
    const textnode = document.createTextNode(this.wathsapp.telefone);
    node.appendChild(textnode);
    let phonesArray1 = document.getElementById('myList2')!.appendChild(node);
    phonesArray1.compareDocumentPosition(node);
    let phoneUnit = this.wathsapp.telefone;
    this.verificar2numero(phoneUnit);
  }

  verificar2numero(numeros: any) {
    var telefoneSelecionado = numeros?.substring(14, 0);
    this.teste = this.cadastroService.listar().forEach((dados) => {
      var obj = dados.map((c: [{ telefone: string }]) => c);
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].telefone === telefoneSelecionado) {
          this.phonesArray2 = [telefoneSelecionado];
          this.phonesArray2[this.phonesArray2.length];
          this.phonesArray2.push.apply(this.phonesArray, this.phonesArray2);
          return;
        }
      }
    });
  }

  async onSave() {
    let primeiroContato: any;
    let segundoContato: any;
    let terceiroContato: any;
    let quartoContato: any;
    let ultimoContato: any;


    if (this.phonesArray) {
      primeiroContato = _.first(this.phonesArray);

      try {
        if(this.inputSelect == false){
          this.wathsapp.telefone = primeiroContato;
        this.wathsapp.telefone.substring(14, 0);
        await this.cadastroService.createWathsApp(this.wathsapp);
        }
        
        if(this.inputFone == false){
          this.wathsapp.telefone = primeiroContato;
        await this.cadastroService.createWathsApp(this.wathsapp);
        }
      } catch (err: any) {
        alert('Erro ao realizar cadastro!');
      }
   // await this.clearMessage();
    // await window.location.reload();
    }

    if (this.phonesArray![1]) {
      segundoContato = this.phonesArray![1];

      setTimeout(async () => {
        try {
          this.wathsapp.telefone = segundoContato;
          this.wathsapp.telefone.substring(14, 0);
          await this.cadastroService.createWathsApp(this.wathsapp);
        } catch (err: any) {
          alert('Erro ao realizar cadastro!');
        }
      }, 5000);
    }

    if (this.phonesArray![2]) {
      terceiroContato = this.phonesArray![2];
      setTimeout(async () => {
        try {
          this.wathsapp.telefone = terceiroContato;
          this.wathsapp.telefone.substring(14, 0);
          await this.cadastroService.createWathsApp(this.wathsapp);
        } catch (err: any) {
          alert('Erro ao realizar cadastro!');
        }
      }, 10000);
    }
    if (this.phonesArray![3]) {
      quartoContato = this.phonesArray![3];
      setTimeout(async () => {
        try {
          this.wathsapp.telefone = quartoContato;
          this.wathsapp.telefone.substring(14, 0);
          await this.cadastroService.createWathsApp(this.wathsapp);
        } catch (err: any) {
          alert('Erro ao realizar cadastro!');
        }
      }, 12000);
    }

    if (primeiroContato) {
      ultimoContato = _.last(this.phonesArray);
      setTimeout(async () => {
        try {
          this.wathsapp.telefone = ultimoContato;
          this.wathsapp.telefone.substring(14, 0);
          await this.cadastroService.createWathsApp(this.wathsapp);
        } catch (err: any) {
          alert('Erro ao realizar cadastro!');
        }
        this.router.navigate(['/invite']);
      }, 15000);
    }
      if (primeiroContato) {
        
        setTimeout(async () => {
          try {
            await window.location.reload();
          } catch (err: any) {
            alert('Erro ao realizar cadastro!');
          }
          this.router.navigate(['/invite']);
          
        }, 15500);
     
      return;
    }
    
  }
  clearMessage() {
    this.wathsapp.mensagem = '';
    const element = document.getElementById('myList1')!;
    element.remove();
    const element2 = document.getElementById('myList2')!;
    element2.remove();
    //window.location.reload();
  }
  redirect() {
    this.router.navigate(['/user']);
  }
  desabilitar_input() {
    if (this.inputSelect == false) {
      this.inputFone = true;
    }
  }
  desabilitar_seletor() {
    if (this.inputFone == false) {
      this.inputSelect = true;
    }
  }
  atualizar(){
    window.location.reload();
  }
}
