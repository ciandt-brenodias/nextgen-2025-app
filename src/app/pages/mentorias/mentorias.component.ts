import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlunoService } from '@core/services/aluno.service';
import { AuthService } from '@core/services/auth.service';
import { MentoriaService } from '@core/services/mentoria.service';

export interface UserData {
  name: string;
  skill: string;
}

@Component({
  selector: 'app-mentorias',
  templateUrl: './mentorias.component.html',
  styleUrls: ['./mentorias.component.scss']
})
export class MentoriasComponent implements OnInit {
  elementData: UserData[] = [];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource(this.elementData);
  displayedColumns: string[] = ['name', 'skill'];

  constructor(private alunoService: AlunoService, private authService: AuthService) { }

  async ngOnInit() {
    let token = await this.authService.signin({password:'admin', username:'admin'}).toPromise();
    let response = await this.alunoService.getAlunos(token['nextgen-auth-token']).toPromise()
    this.elementData = response.map((aluno) => {
      return { name: aluno.nome, skill: aluno.talentos.map((talento) => talento.nome).join(', ') };
    });
    this.dataSource = new MatTableDataSource(this.elementData);
  }

  onFirstAction(row: any) {
    console.log('First Action', row);
  }

  onSecondAction(row: any) {
    console.log('Second Action', row);
  }

}
