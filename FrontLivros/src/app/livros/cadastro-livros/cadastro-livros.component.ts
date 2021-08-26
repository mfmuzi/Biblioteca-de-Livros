import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrosService } from 'src/app/core/livros.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Livro } from 'src/app/shared/models/livro';


@Component({
  selector: 'dio-cadastro-livros',
  templateUrl: './cadastro-livros.component.html',
  styleUrls: ['./cadastro-livros.component.css']
})
export class CadastroLivrosComponent implements OnInit {
  id!: number;
 cadastro!: FormGroup;
 generos!: Array<string>;

 constructor (public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private livroService: LivrosService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              ) {}

 get f(){
   return this.cadastro.controls;
 }

 ngOnInit():  void {
  this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id) {
      this.livroService.visualizar(this.id).subscribe((livro: Livro) => this.criarFormulario(livro));
    } else{
      this.criarFormulario(this.criarLivroEmBranco());
    }

   this.generos = ['Ficção', 'Literatura', 'Suspense', 'Fantasia', 'Ficção Científica', 'Plicial', 'Romance'];
 }

 submit(): void {
   this.cadastro.markAllAsTouched();
   if (this.cadastro.invalid){
     return;
   }
   const livro = this.cadastro.getRawValue() as Livro;
   if(this.id){
     livro.id = this.id;
     this.editar(livro);
   } else {
   this.salvar(livro);
 }
}

 reiniciarForm(): void{
   this.cadastro.reset();
 }

 private criarFormulario(livro: Livro): void {
     this.cadastro = this.fb.group({
    titulo: [livro.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
    autor: [livro.autor, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
    editora:[livro.editora, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
    urlFoto: [livro.urlFoto, [Validators.minLength(10)]],
    anoLancamento: [livro.anoLancamento, [Validators.required]],
    descricao: [livro.descricao],
    genero: [livro.genero, [Validators.required]]
   });
 }

 private criarLivroEmBranco(): Livro {
  return {
    id: null,
    titulo: null,
    autor: null,
    editora: null,
    urlFoto: null,
    anoLancamento: null,
    descricao: null,
    genero: null
  }as unknown as Livro;
 }

 private salvar(livro:Livro): void{
  this.livroService.salvar(livro).subscribe(() =>{
    const config = {
      data: {
        btnSucesso: 'Lista de Livros',
        btnCancelar: 'Cadastrar novo Livro',
        corBtnCancelar: 'primary',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) =>{
      if (opcao){
        this.router.navigateByUrl('livros');
      } else {
        this.reiniciarForm();
      }
    });
  },
  () => {
    const config = {
    data: {
      titulo: 'Erro ao salvar o registro',
      descricao: 'Não foi possivel salvar o registro. Tente novamente mais tarde.',
      corBtnSucesso: 'warn',
      btnSucesso: 'Fechar',
    } as Alerta
  };
    this.dialog.open(AlertaComponent, config);
 });
 }

 private editar (livro:Livro): void{
  this.livroService.editar(livro).subscribe(() =>{
    const config = {
      data: {
        descricao: 'Seu resgitro foi atualizado com sucesso!',
        btnSucesso: 'Lista de Livros'
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => this.router.navigateByUrl('livros'));     
  },
  () => {
    const config = {
    data: {
      titulo: 'Erro ao editar o registro',
      descricao: 'Não foi possivel editar o registro. Tente novamente mais tarde.',
      corBtnSucesso: 'warn',
      btnSucesso: 'Fechar',
    } as Alerta
  };
    this.dialog.open(AlertaComponent, config);
 });
 }

}