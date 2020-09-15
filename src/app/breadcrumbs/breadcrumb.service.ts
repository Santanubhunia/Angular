import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Breadcrumb } from '../shared/models/breadcrumb.model';
import { AppInsightsService } from '../app-insights.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { HashMap } from '../shared/utilities/types';
import { BACK_TO } from '../shared/utilities/constants';

interface BreadcrumbVariable {
  label: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  private breadcrumbVariablesSubject = new BehaviorSubject<
    HashMap<BreadcrumbVariable>
  >({ backTo: { label: 'Home', url: '/home' } });
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(
    private appInsightsService: AppInsightsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  start() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbsSubject.next(this.createBreadcrumbs(this.route.root));

        this.appInsightsService.logPageView(
          this.breadcrumbsSubject.getValue()?.[0]?.label,
          this.router.url
        );
      });

    this.breadcrumbs$ = combineLatest([
      this.breadcrumbsSubject,
      this.breadcrumbVariablesSubject
    ]).pipe(
      map(([breadcrumbs, variables]) => {
        const updatedBreadcrumbs: Breadcrumb[] = [];

        for (const breadcrumb of breadcrumbs) {
          let label = breadcrumb.label;

          for (const key of Object.keys(variables || {})) {
            if (breadcrumb.label.includes(`@${key}`)) {
              label = label.replace(`@${key}`, variables[key].label);
            }
          }

          updatedBreadcrumbs.push({ ...breadcrumb, label });
        }

        if (updatedBreadcrumbs.length) {
          const backTo = variables[BACK_TO];
          updatedBreadcrumbs.unshift({ label: backTo.label, url: backTo.url });
        }

        return updatedBreadcrumbs;
      })
    );
  }

  updateLabels(variables: HashMap<BreadcrumbVariable>) {
    this.breadcrumbVariablesSubject.next({
      ...this.breadcrumbVariablesSubject.getValue(),
      ...variables
    });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label: string = child.snapshot.data?.breadcrumb;

      if (label && !breadcrumbs.some(bc => bc.label === label)) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
