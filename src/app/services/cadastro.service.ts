import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CadastroModel } from '../models/cadastro-models';
import { UsuarioModel } from '../models/usuarioModel';
import { UsuarioSearchModel } from '../models/usuarioSearchModel';
import { EventosModel } from '../models/eventos.models';
import { Socket } from 'socket.io';
import { WathsModel } from '../models/waths-models';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  SERVER_URL = 'https://sistema-cadastro-api.herokuapp.com';
  SERVER_URL_INTEGRATION = 'https://sistema-cadastro-front.herokuapp.com';

  //SERVER_URL_INTEGRATION = 'http://localhost:8000';
  //SERVER_URL = 'http://localhost:5000';
  httpOptions = {
    headers: new HttpHeaders({
      'x-access-token': localStorage.getItem('token') || '',
    }),
  };

  contatos: Array<any> | undefined;

  //constructor(private http: HttpClient, private cadastroModel: CadastroModel) {}

  constructor(
    private http: HttpClient,
    private httpCliente: HttpClient,
    private cadastroModel: CadastroModel
  ) {}
  //Conexão com api para buscar o cep
  buscar(cep: string) {
    return this.httpCliente.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
  listar(): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/cadastro`, this.httpOptions);
  }
  create(produto: CadastroModel) {
    this.http
      .post(`${this.SERVER_URL}/cadastro`, produto, this.httpOptions)
      .subscribe(
        (resultado) => {
          console.log('Status 200');
        },
        (erro) => {
          if (erro.status == 400) {
            console.log(erro);
          }
        }
      );
  }

  updateUser(user: UsuarioModel, _id: string) {
    this.http
      .put(`${this.SERVER_URL}/user/${_id}`, user, this.httpOptions)
      .subscribe(
        (resultado) => {
          console.log('Status 200');
        },
        (erro) => {
          if (erro.status == 400) {
            console.log(erro);
          }
        }
      );
  }

  createWathsApp(produto: WathsModel) {
    this.http
      .post(
        `${this.SERVER_URL_INTEGRATION}/send-message`,
        produto,
        this.httpOptions
      )
      .subscribe(
        (resultado) => {
          console.log('Status 200');
        },
        (erro) => {
          if (erro.status == 400) {
            console.log(erro);
          }
        }
      );
  }

  buscarUsuario(): Observable<any> {
    return this.http.get<UsuarioSearchModel[]>(
      `${this.SERVER_URL}/user`,
      this.httpOptions
    );
  }

  createUser(produto: UsuarioModel) {
    this.http
      .post(`${this.SERVER_URL}/user`, produto, this.httpOptions)
      .subscribe(
        (resultado) => {
          console.log('Status 200');
        },
        (erro) => {
          if (erro.status == 400) {
            console.log(erro);
          }
        }
      );
  }

  createEvento(produto: EventosModel) {
    this.http
      .post(`${this.SERVER_URL}/events`, produto, this.httpOptions)
      .subscribe(
        (resultado) => {
          console.log('Status 200');
        },
        (erro) => {
          if (erro.status == 400) {
            console.log(erro);
          }
        }
      );
  }

  buscarEventos(): Observable<any> {
    return this.http.get<EventosModel[]>(
      `${this.SERVER_URL}/events`,
      this.httpOptions
    );
  }
}
