import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '@app/shared/components/modal/modal.component';

interface AvaliacaoData {
  skill: string;
  avaliacao: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @ViewChild('alunoSessions') alunoSessions: TemplateRef<any>;
  
  elementData: AvaliacaoData[] = [];
  userLogger: 'professor' | 'aluno' = 'aluno';
  dataSourceMentorias: MatTableDataSource<AvaliacaoData>;
  displayedColumnsMentorias: string[] = ['skill', 'avaliacao'];
  dataSourceSkills: MatTableDataSource<AvaliacaoData>;
  displayedColumnsSkills: string[] = ['skill', 'avaliacao'];
  
  profileInfo = {
    fullName: 'Daniel',
    email: 'example@example.com',
    linkedin: 'linkedin.com/in/example',
    address: '123 Main St',
    city: 'City Name',
    country: 'Country Name',
    zipCode: '12345',
    state: 'State Name'
  };


  constructor(public dialog: MatDialog,private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.elementData = [
      { skill: 'Skill 1', avaliacao: 'Avaliacao 1' },
      { skill: 'Skill 2', avaliacao: 'Avaliacao 2' },
      { skill: 'Skill 3', avaliacao: 'Avaliacao 3' },
      { skill: 'Skill 1', avaliacao: 'Avaliacao 1' },
      { skill: 'Skill 2', avaliacao: 'Avaliacao 2' },
      { skill: 'Skill 3', avaliacao: 'Avaliacao 3' },
      { skill: 'Skill 1', avaliacao: 'Avaliacao 1' },
      { skill: 'Skill 2', avaliacao: 'Avaliacao 2' },
      { skill: 'Skill 3', avaliacao: 'Avaliacao 3' },
    ];
    this.dataSourceMentorias = new MatTableDataSource(this.elementData);
    this.dataSourceSkills = new MatTableDataSource(this.elementData);
  }

  onFirstAction(row: any) {
    console.log(row);
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      viewContainerRef: this.viewContainerRef,
      data: { content: this.alunoSessions, enableActions: false, title: 'Monitoria de Python para Dados' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('fecho aluno');
    });

  }

}
