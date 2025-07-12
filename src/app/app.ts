import { SharedModule } from './shared/shared-module';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SideBar } from './shared/side-bar/side-bar';
import { LoaderService } from './shared/loader/loader-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, SideBar, ProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected title = 'dashboard-app';
  constructor(public loadingService: LoaderService) {}

  loading = signal(false); // global reactive signal
  get isLoading() {
    return this.loadingService.isLoading();
  }

  setLoading(status: boolean) {
    this.loadingService.setLoading(status);
  }
  // // Expose a method for child components to trigger the spinner
  // setLoading(status: boolean) {
  //   this.loading.set(status);
  // }

  // get isLoading() {
  //   return this.loading();
  // }
}
