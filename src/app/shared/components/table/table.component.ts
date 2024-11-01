import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns: string[] = [];
  @Input() enableFilter: boolean = true;
  @Input() enableAction1: boolean = true;
  @Input() enableAction2: boolean = true;
  @Output() firstAction = new EventEmitter<any>();
  @Output() secondAction = new EventEmitter<any>();

  enableActions: boolean = this.enableAction1 || this.enableAction2;

  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  ngOnInit() {}

  ngAfterViewInit() {
    this.paginator.showFirstLastButtons = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFirstAction(row: any) {
    this.firstAction.emit(row);
  }

  onSecondAction(row: any) {
    this.secondAction.emit(row);
  }
}