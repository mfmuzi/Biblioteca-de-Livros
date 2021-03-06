import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroLivrosComponent } from './livros/cadastro-livros/cadastro-livros.component';
import { ListagemLivrosComponent } from './livros/listagem-livros/listagem-livros.component';
import { LivrosModule } from './livros/livros.module';
import { VisualizarLivrosComponent } from './livros/visualizar-livros/visualizar-livros.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'livros',
  pathMatch: 'full'
},
{
path: 'livros',
children: [
  {
    path: '',
    component: ListagemLivrosComponent
  },
  {
    path: 'cadastro',
    children: [
    {
      path: '',
      component: CadastroLivrosComponent
    },
    {
      path: ':id',
      component: CadastroLivrosComponent
    }
  ]
  },
  {
    path: ':id',
   component: VisualizarLivrosComponent,
   pathMatch: 'full'
  }
 ]
},
{path: '**', redirectTo: 'livros'},];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            LivrosModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
