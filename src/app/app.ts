import { SharedModule } from './shared/shared-module';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'dashboard-app';
  loading = signal(false); // global reactive signal

  // Expose a method for child components to trigger the spinner
  setLoading(status: boolean) {
    this.loading.set(status);
  }

  get isLoading() {
    return this.loading();
  }
}
