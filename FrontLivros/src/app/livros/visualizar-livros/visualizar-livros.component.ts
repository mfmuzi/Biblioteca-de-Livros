import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrosService } from 'src/app/core/livros.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Livro } from 'src/app/shared/models/livro';

@Component({
  selector: 'dio-visualizar-livros',
  templateUrl: './visualizar-livros.component.html',
  styleUrls: ['./visualizar-livros.component.css']
})
export class VisualizarLivrosComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  livro!: Livro;
  id!: number;

  constructor(public dialog: MatDialog,
	      private activatedRoute: ActivatedRoute,
              private livrosServices: LivrosService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

editar(): void {
  this.router.navigateByUrl('/livros/cadastro/' + this.id);
}

  excluir(): void{
    const config = {
      data: {
        titulo: 'Deseja excluir?',
        descricao: 'Caso deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) =>{
      if (opcao){
        this.livrosServices.excluir(this.id).subscribe(() => this.router.navigateByUrl('/livro'));
      }
    });

  }

  private visualizar(): void{
    this.livrosServices.visualizar(this.id).subscribe((livro: Livro) => this.livro = livro);
  }

}
