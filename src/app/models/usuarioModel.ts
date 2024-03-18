export class UsuarioModel {
  'id': any | undefined;
  'nome': any | undefined;
  'email': string | undefined;
  'cidade': string | undefined;
  'bairro': string | undefined;
  'senha': any | undefined;
  'dataCriacao': string | undefined;
  'telefone': any | undefined;
  'tipo': {
    master: string | undefined;
    especial: string | undefined;
    comum: string | undefined;
  };
}
