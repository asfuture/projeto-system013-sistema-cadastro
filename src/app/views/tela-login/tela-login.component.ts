import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroModel } from 'src/app/models/cadastro-models';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { UsuarioSearchModel } from 'src/app/models/usuarioSearchModel';
import { CadastroService } from 'src/app/services/cadastro.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css'],
})
export class TelaLoginComponent implements OnInit {
  contatos: any;
  user: UsuarioModel = new UsuarioModel();
  userSearch: UsuarioSearchModel = new UsuarioSearchModel();
  teta: any;
  teste: any;
  active: boolean | undefined;
  upSenha ='';
  upConfirma ='';
  upEmail ='';

  constructor(
    private cadastroService: CadastroService,
    private usuarioModel: UsuarioModel,
    private usuarioSearchModel: UsuarioSearchModel,
    private router: Router

  ) {}

  ngOnInit() {
    this.usuarioSearchModel = new UsuarioSearchModel();
  }
  verificarSenha() {
    var nomeLogin = this.user.nome;
    var senhaLogin = this.user.senha;

    this.teste = this.cadastroService.buscarUsuario().forEach((dados) => {
      var obj = dados.map((c: [{ nome: string }, { senha: string }, { tipo: string} , { tipo: string}, { dataCriação: string}, { _id: string}]) => c);
      //Criar mensagem de error de login e senha.
      for (var i = 0; i < obj.length; i++) {
        console.log(obj[i].senha)
        if (obj[i].senha == String(senhaLogin) && obj[i].nome == String(nomeLogin)) {
          obj[i].tipo
          obj[i].telefone
          obj[i].dataCriacao
          obj[i]._id
          localStorage.setItem('userId', obj[i]._id);
          localStorage.setItem('tipoUsuatio', obj[i].tipo);
          localStorage.setItem('telefone', obj[i].telefone? obj[i].telefone : '+5513991979667');
          localStorage.setItem('permission_user_x-acess-code-AUTHENTICATION', obj[i].dataCriacao);
          this.redirect();
          return;
        }
      }
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].nome != String(nomeLogin) || obj[i].senha != String(senhaLogin)) {
          return  alert("Usuário ou Senha estão incorretos!");
        }
      }
    });
  }
  update_key() {
    this.upEmail
    if(this.upSenha === this.upConfirma){
      //AQUI
      //Código para atulizar o banco  de dados (Senha)
      this.teste = this.cadastroService.buscarUsuario().forEach((dados) => {
        var obj = dados.map((c: { email: string }) => c);
        //Criar mensagem de error de login e senha.
        for (var i = 0; i < obj.length; i++) {
          if (obj[i].email === this.upEmail) {
            try {
              const id = obj[i]._id
              const usuarios = obj[i]
              this.user = usuarios
              this.user.senha = this.upSenha
              this.cadastroService.updateUser(this.user, id)
              this.router.navigate(['/login']);
               setTimeout(() => {
              window.location.reload();
              }, 1000);

            }catch (err: any) {
              alert("Erro ao realixar cadastro!");
            }
            //Código para atulizar o banco  de dados (Senha)
             alert("A sua senha foi atualizada com sucesso. Faça o seu Login.");
          }
          }
      });

    }else{
      alert("A sua senha está divergente. Por Favor confirme sua senha novamente. ");
       }
  }
  clear(){
    this.upEmail='';
    this.upSenha ='';
    this.upConfirma ='';

  }
  redirect() {
    this.router.navigate(['/user']);
  }
}
