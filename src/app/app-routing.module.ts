import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'encrypt',
    loadChildren: () =>
      import('./pages/encrypt/encrypt.module').then((m) => m.EncryptPageModule),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/list/list.module').then((m) => m.ListPageModule),
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('./pages/verify/verify.module').then((m) => m.VerifyPageModule),
  },
  {
    path: 'generate',
    loadChildren: () =>
      import('./pages/generate/generate.module').then(
        (m) => m.GeneratePageModule
      ),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'decrypt',
    loadChildren: () =>
      import('./pages/decrypt/decrypt.module').then((m) => m.DecryptPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
