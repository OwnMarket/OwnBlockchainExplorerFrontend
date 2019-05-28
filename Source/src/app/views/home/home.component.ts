import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  headers: any[] = [
    { label: 'Col 1', key: 'id' },
    { label: 'Col 2', key: 'name', render: (val: any) => `<span style="color: red">${val}</span>` }
  ];

  data: any[] = [{ id: 'ID1', name: 'Name1' }, { id: 'ID2', name: 'Name2' }];

  constructor() {}

  ngOnInit() {}
}
