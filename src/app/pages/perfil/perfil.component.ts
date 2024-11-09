import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MentoriaStudentDetailsComponent } from '@app/shared/components/mentoria-student-details/mentoria-student-details.component';
import { AlunoData, AvaliacaoData, MentoriaData, MentoriasPerfilData } from '@core/interfaces/models';
import { AlunoService } from '@core/services/aluno.service';
import { SessionService } from '@core/services/session.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  
  elementDataAvaliacao: AvaliacaoData[] = [];
  elementDataMentoriasPerfil: MentoriasPerfilData[] = [];
  perfilData: AlunoData;
  userLogger: 'professor' | 'aluno' = 'aluno';
  dataSourceMentorias: MatTableDataSource<MentoriasPerfilData> = new MatTableDataSource(this.elementDataMentoriasPerfil);
  displayedColumnsMentorias: string[] = ['professor', 'skill', 'nivel', "n de sessoes"];
  dataSourceSkills: MatTableDataSource<AvaliacaoData> = new MatTableDataSource(this.elementDataAvaliacao);
  displayedColumnsSkills: string[] = ['skill', 'avaliacao'];

  constructor(private dialog: MatDialog, private alunoService: AlunoService, private sessionService: SessionService) { }

  async ngOnInit() {
    let token = this.sessionService.getAccessToken();
    this.perfilData = (await this.alunoService.getAlunoById('1', token).toPromise()).body;
    this.elementDataAvaliacao = this.perfilData.talentos.map((talento) => {
      return {
        skill: talento.nome,
        avaliacao: talento.avaliacao.toString()
      };
    });

    let mentoriaData: MentoriaData[] = (await this.alunoService.getMentoriasFromAlunosById('1', token).toPromise()).body;
    this.elementDataMentoriasPerfil = mentoriaData.map((mentoria) => {
      return {
        ...mentoria,
        skill: mentoria.mentoria,
        nivel: this.elementDataAvaliacao.find((avaliacao) => avaliacao.skill === mentoria.mentoria).avaliacao,
        "n de sessoes": mentoria.sessoes.length.toString()
      };
    });

    this.dataSourceMentorias = new MatTableDataSource(this.elementDataMentoriasPerfil);
    this.dataSourceSkills = new MatTableDataSource(this.elementDataAvaliacao);
  }

  onFirstAction(mentoria: any) {
    this.dialog.open(MentoriaStudentDetailsComponent, {
      width: '800px',
      data: { mentoria: mentoria }
    });
  }

  getCep(endereco: string) {
    return endereco.replace(/\D/g, '');
  }

  getEnderecoSmall(endereco: string) {
    return endereco.split(/[0-9]/)[0]
  }

  getCidade(endereco: string) {
    let enderecoSeparado = endereco.split("/")[0].split(" ");
    return enderecoSeparado[enderecoSeparado.length - 2];
  }

}
