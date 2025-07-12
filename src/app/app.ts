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
  searchValue = '';
  loading = signal(false);

  constructor(public loadingService: LoaderService) {}

  get isLoading() {
    return this.loadingService.isLoading();
  }

  setLoading(status: boolean) {
    this.loadingService.setLoading(status);
  }
}
