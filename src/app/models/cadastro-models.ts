export class CadastroModel {
  '_id': String;
  'nome': string;
  'email': string | undefined;
  'dataNasc': string | undefined;
  'genero': {
    masculino: string | undefined;
    feminino: string | undefined;
  };
  'dataCriacao':Date;
  'cep': string | undefined;
  'rua': string | undefined;
  'bairro': string | undefined;
  'cidade': string | undefined;
  'telefone': string | undefined;
  'evento': any | undefined;
  'termo_politica': Boolean = false;
  'userId': any;
}
