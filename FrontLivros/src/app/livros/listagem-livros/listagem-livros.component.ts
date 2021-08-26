import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime} from 'rxjs/operators';
import { LivrosService } from 'src/app/core/livros.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Livro } from 'src/app/shared/models/livro';


@Component({
  selector: 'dio-listagem-livros',
  templateUrl: './listagem-livros.component.html',
  styleUrls: ['./listagem-livros.component.scss']
})
export class ListagemLivrosComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  config: ConfigParams = {
    pagina: 0,
    limite: 4
  };
  livros: Livro[] = [];
  filtrosListagem!: FormGroup;
  generos!: Array<string>;
  
 
  constructor(private livrosService: LivrosService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void{
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto')?.valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    
    this.filtrosListagem.get('genero')?.valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'genero', valor: val};
      this.resetarConsulta();
    });

    this.generos = ['Ficção', 'Literatura', 'Suspense', 'Fantasia', 'Ficção Científica', 'Policial', 'Romance'];

   this.listarLivros();
  }
  
  onScroll(): void {
    this.listarLivros();
  }

  abrir(id?: number): void{
    this.router.navigateByUrl('/livros/' + id);

  }

  private listarLivros(): void{
    this.config.pagina++;
    this.livrosService.listar(this.config)
    .subscribe((livros: Livro[]) => this.livros = livros);
  }

  private resetarConsulta(): void{
    this.config.pagina = 0;
    this.livros = [];
    this.listarLivros();
  }
 
}


