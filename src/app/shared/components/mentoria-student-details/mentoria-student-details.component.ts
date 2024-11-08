import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MentoriaData } from '@core/interfaces/models';

@Component({
  selector: 'app-mentoria-student-details',
  templateUrl: './mentoria-student-details.component.html',
  styleUrls: ['./mentoria-student-details.component.scss']
})
export class MentoriaStudentDetailsComponent implements OnInit {
  mentoria: MentoriaData;
  title: string = 'Modal';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MentoriaStudentDetailsComponent>
  ) {
    this.mentoria = data.mentoria;
  }

  ngOnInit() {}

  getStatusClass(session) {
    switch (this.getStatusFromSession(session)) {
      case 'feito':
        return 'done';
      case 'planejado':
        return 'planned';
      case 'aguardando':
        return 'awaiting';
      default:
        return '';
    }
  }

  getStatusFromSession(session: any): string {
    const currentDate = new Date();
    const sessionDate = new Date(session.data);

    if (session.feedback && sessionDate < currentDate) {
      return 'feito';
    } else if (sessionDate > currentDate) {
      return 'planejado';
    } else if (!session.feedback && sessionDate < currentDate) {
      return 'aguardando';
    } else {
      return '';
    }
  }

  getExpectedNextSession(mentoria: MentoriaData) {
    if (!mentoria || !mentoria.sessoes || mentoria.sessoes.length === 0) {
      return null;
    }

    const oldestSession = mentoria.sessoes.reduce((oldest, session) => {
      return new Date(session.data) < new Date(oldest.data) ? session : oldest;
    });

    const nextSessionDate = new Date(oldestSession.data);
    nextSessionDate.setDate(nextSessionDate.getDate() + 7);
    const formattedDate = nextSessionDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return formattedDate;
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}