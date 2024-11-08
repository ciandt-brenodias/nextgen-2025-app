import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FeedbackProfessorModalData,
  MentoriaData,
  SessaoData,
} from '@core/interfaces/models';

@Component({
  selector: 'app-mentoria-professor-details',
  templateUrl: './mentoria-professor-details.component.html',
})
export class MentoriaProfessorDetailsComponent implements OnInit, OnDestroy {
  feedbackForm: FormGroup;
  mentoria: MentoriaData;
  sessoes: SessaoData[];
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MentoriaProfessorDetailsComponent>
  ) {
    this.mentoria = data.mentoria;
    this.title = this.mentoria.mentoria;
    this.sessoes = this.mentoria.sessoes;
    this.feedbackForm = new FormGroup({
      sessao: new FormControl(null, Validators.required),
      feedback: new FormControl('', Validators.required),
      id: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.feedbackForm.reset();
  }

  setSessao(sessao: any) {
    if (!sessao) {
      this.feedbackForm.reset();
      return;
    }
    this.feedbackForm.patchValue({
      sessao: sessao.data,
      feedback: sessao.feedback,
      id: sessao.sessaoId,
    });
  }

  saveFeedback() {
    if (this.feedbackForm.invalid) {
      return;
    }
    this.dialogRef.close({
      mentoria: this.mentoria,
      feedbackNovo: this.feedbackForm.value,
    } as FeedbackProfessorModalData);
  }

  cancelFeedback() {
    if (this.feedbackForm.dirty) {
      this.feedbackForm.reset();
    }
    this.dialogRef.close(false);
  }

  close(): void {
    if (this.feedbackForm.dirty) {
      this.feedbackForm.reset();
    }
    this.dialogRef.close(false);
  }
}
