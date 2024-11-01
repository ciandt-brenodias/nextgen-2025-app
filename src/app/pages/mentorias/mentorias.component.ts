import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { UserData } from '@core/interfaces/userData';
import { AlunoService } from '@core/services/aluno.service';
import { AuthService } from '@core/services/auth.service';

interface SessaoForm {
  value: string;
  viewValue: string;
  sessaoFeedback: string;
}

@Component({
  selector: 'app-mentorias',
  templateUrl: './mentorias.component.html',
  styleUrls: ['./mentorias.component.scss']
})
export class MentoriasComponent implements OnInit {
  @ViewChild('alunoCheckFeedback') alunoContent: TemplateRef<any>;
  @ViewChild('professorAddFeedback') professorContent: TemplateRef<any>;

  elementData: UserData[] = [];
  userLogger: 'professor' | 'aluno' = 'aluno';
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource(this.elementData);
  displayedColumns: string[] = ['name', 'skill'];

  sessoes: SessaoForm[] = [
    {value: 'sessao-1', viewValue: 'Sessao 01 - 10/10/2021', sessaoFeedback: ''},
    {value: 'sessao-2', viewValue: 'Sessao 02 - 12/10/2021', sessaoFeedback: ''},
    {value: 'sessao-3', viewValue: 'Sessao 03 - 14/10/2021', sessaoFeedback: ''},
  ];

  feedbackForm: FormGroup;
  originalFeedback: string;

  constructor(
    private alunoService: AlunoService,
    private authService: AuthService,
    public dialog: MatDialog,
    private viewContainerRef: ViewContainerRef
  ) { 
    this.feedbackForm = new FormGroup({
      sessao: new FormControl(null, Validators.required),
      feedback: new FormControl('', Validators.required)
    });
  }

  async ngOnInit() {
    let token = await this.authService.signin({ password: 'admin', username: 'admin' }).toPromise();
    let response = await this.alunoService.getAlunos(token['nextgen-auth-token']).toPromise();
    this.elementData = response.map((aluno) => {
      return { name: aluno.nome, skill: aluno.talentos.map((talento) => talento.nome).join(', ') };
    });
    this.dataSource = new MatTableDataSource(this.elementData);
  }

  onFirstAction(row: any) {
    console.log(row);
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      viewContainerRef: this.viewContainerRef,
      data: { content: this.alunoContent, enableActions: false, title: 'Monitoria de Python para Dados' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('fecho aluno');
    });
  }

  onSecondAction(row: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      viewContainerRef: this.viewContainerRef,
      data: { content: this.professorContent, enableActions: true, title: 'Adicionar Feedback' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const sessao = this.sessoes.find(s => s.value === this.feedbackForm.get('sessao').value);
        if (sessao) {
          sessao.sessaoFeedback = this.feedbackForm.get('feedback').value;
        }
      } else {
        this.resetForm();
      }
      console.log('fecho professor');
    });
  }

  setSessao(sessao: SessaoForm) {
    this.originalFeedback = sessao.sessaoFeedback;
    this.feedbackForm.patchValue({
      sessao: sessao.value,
      feedback: sessao.sessaoFeedback
    });
    console.log('sessao: ', sessao);
  }

  resetForm() {
    this.feedbackForm.patchValue({
      feedback: this.originalFeedback
    });
  }

  saveFeedback() {
    this.dialog.closeAll();
  }

  cancelFeedback() {
    this.dialog.closeAll();
  }
}