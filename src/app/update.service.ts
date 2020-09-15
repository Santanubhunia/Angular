import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private updates: SwUpdate, private snackbar: MatSnackBar) {}

  listenForUpdates() {
    this.updates.available.subscribe(() => {
      const snackbarRef = this.snackbar.open('Update Available', 'Reload', {
        duration: 60000
      });

      snackbarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    });
  }
}
