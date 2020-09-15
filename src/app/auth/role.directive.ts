import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { SessionQuery } from './state/session.query';
import { userHasRoles } from './state/session.utils';

@UntilDestroy()
@Directive({
  selector: '[appRole]'
})
export class RoleDirective {
  private hasView = false;

  @Input() set appRole({
    roles,
    inclusive = false,
    disableAdmin = false
  }: {
    roles: string | string[];
    inclusive: boolean;
    disableAdmin: boolean;
  }) {
    this.sessionQuery.roles$.pipe(untilDestroyed(this)).subscribe(userRoles => {
      const hasRole = userHasRoles(roles, userRoles, inclusive, disableAdmin);
      if (hasRole && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!hasRole && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }

  constructor(
    private sessionQuery: SessionQuery,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
