import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentoria-details',
  templateUrl: './mentoria-details.component.html',
  styleUrls: ['./mentoria-details.component.scss']
})
export class MentoriaDetailsComponent implements OnInit {  
  // Sample data for the component
  mentorshipInfo = {
    skill: 'Python',
    startDate: '01/01/2023',
    endDate: '31/12/2023',
    nextSession: '10/10/2023',
    mentor: 'John Doe',
    sessions: [
      { id: 1, date: '01/01/2023', feedback: '', status: 'Done' },
      { id: 2, date: '15/01/2023', feedback: '', status: 'Planned' },
      { id: 3, date: '30/01/2023', feedback: '', status: 'Awaiting' },
      { id: 4, date: '', feedback: '', status: 'Awaiting' }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Done':
        return 'done';
      case 'Planned':
        return 'planned';
      case 'Awaiting':
        return 'awaiting';
      default:
        return '';
    }
  }

}
