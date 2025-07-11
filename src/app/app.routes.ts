import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then((mod) => {
        console.log('Lazy loading Dashboard component...');

        return mod.Dashboard;
      }),
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
