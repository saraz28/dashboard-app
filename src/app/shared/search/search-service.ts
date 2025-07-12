import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}
  private term = signal('');

  setTerm(value: string) {
    this.term.set(value);
  }

  getTerm() {
    return this.term();
  }

  searchSignal = this.term.asReadonly(); // read-only signal to use in views
}
