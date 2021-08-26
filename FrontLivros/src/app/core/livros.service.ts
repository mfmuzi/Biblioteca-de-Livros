import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigParams } from '../shared/models/config-params';
import { Livro } from '../shared/models/livro';
import { ConfigParamsService } from './config-params.service';

const url ='http://localhost:8082/livros/';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor(private http: HttpClient, private configService: ConfigParamsService) { }

  salvar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(url, livro);
  }

  editar(livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(url + livro.id, livro);
  }

  listar(config: ConfigParams): Observable<Livro[]>{
   const configParams = this.configService.configurarParamentros(config);
     return this.http.get<Livro[]>(url, {params: configParams});
  }

  visualizar(id: number): Observable<Livro> {
    return this.http.get<Livro>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
