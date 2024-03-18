import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CadastroModel } from 'src/app/models/cadastro-models';
import { CadastroService } from 'src/app/services/cadastro.service';
import { AppCSV } from 'src/app/services/json2csv.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { timeStamp } from 'console';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-tela-listagem',
  templateUrl: './tela-listagem.component.html',
  styleUrls: ['./tela-listagem.component.css'],
})
export class TelaListagemComponent implements OnInit {
  cadastro: CadastroModel = new CadastroModel();
  contatos: Array<any> | undefined;
  contatosComum: Array<any> | undefined;
  active: boolean | undefined;
  options: any;
  data: any;
  _id: any;
  permissionType: any;
  filter: any;
  comum: any;
  typeOk = false

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

    this.permissionType = localStorage.getItem(
      'tipoUsuatio'
    );




    this._id = localStorage.getItem('userId');


    this.listar();
    this.listar1();
  }

  listar1() {
    this.cadastroService.listar().forEach((dados) => {
      this.contatos = dados.map((c: [{ nome: string }]) => c);
      })
  }

  listar() {
    var nomeLogin = this._id;
    this.cadastroService.listar().forEach((dados) => {
      var obj = dados.map((c: [{ nome: string }, { senha: string }, { tipo: string} , { tipo: string}, { dataCriação: string}, { _id: string}]) => c);
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].userId === nomeLogin) {
            this.contatosComum = obj
        }
      }
    });
  }

  redirect() {
    this.router.navigate(['/user']);
  }

  //Gerar lista de cadastro em Excel
  title = 'angular-app';
  fileName = 'Cadastro.xlsx';

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cadastro');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  //Gerar lista de cadastro em PDF
  gerarPDF() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#excel-table' });
    doc.save('cadastro.pdf');
  }
}
