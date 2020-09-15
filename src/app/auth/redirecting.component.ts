import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirecting',
  template: `
    <div fxFlexFill fxLayoutAlign="center center" class="mat-typography">
      Redirecting you to the logout page&hellip;
    </div>
  `
})
export class RedirectingComponent {
  constructor(router: Router) {
    const state = router.getCurrentNavigation()?.extras?.state;

    if (!state || !state.redirecting) {
      router.navigate(['/']);
    }
  }
}
