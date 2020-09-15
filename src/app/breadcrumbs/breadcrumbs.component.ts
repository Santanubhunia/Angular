import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../shared/models/breadcrumb.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private breadcrumbsService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbsService.start();
    this.breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;
  }
}
