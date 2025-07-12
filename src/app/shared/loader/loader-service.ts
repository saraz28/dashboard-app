import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}
  private loading = signal(false);

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  isLoading() {
    return this.loading();
  }
}
