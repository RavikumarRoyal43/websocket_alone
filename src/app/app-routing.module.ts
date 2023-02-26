import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () => import('./websocket/websocket.component').then(m => m.WebsocketComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
