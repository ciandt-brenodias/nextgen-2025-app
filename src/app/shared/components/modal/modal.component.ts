import { Component, Inject, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  content: TemplateRef<any>;
  enableActions = true;
  title: string = 'Modal';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ModalComponent>) {}

  ngOnInit(): void {
    this.content = this.data.content;
    this.enableActions = this.data.enableActions;
    this.title = this.data.title;
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}