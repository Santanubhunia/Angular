import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div fxFlexFill fxLayout="row" fxLayoutAlign="center center">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
      }
    `
  ]
})
export class LoaderComponent {}
