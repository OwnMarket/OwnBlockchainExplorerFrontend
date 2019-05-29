import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-labeled-card',
  templateUrl: './labeled-card.component.html',
  styleUrls: ['./labeled-card.component.scss']
})
export class LabeledCardComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  @Input() title: string;
  // TODO Add proper model for config
  // Can be similar like we use in table card
  @Input() config: any[];

  ngOnInit() {}

  // TODO Use url model
  // Move this function to utils and reuse it where needed
  private generateRouteParams(url: any): string {
    return url.params.join(',');
  }

  // TODO Use url model
  navigate(url: any) {
    this.router.navigate([url.route, this.generateRouteParams(url)]);
  }
}
