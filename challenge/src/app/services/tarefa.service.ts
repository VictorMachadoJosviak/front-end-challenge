import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../helpers/helpers';
import { Tarefa } from '../models/tarefa-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private tarefas:Tarefa[]

  constructor(private http: HttpClient) { }

    listar()  {
      return this.http.get(BASE_URL + '/tarefas');
    }

    cadastrar(tarefa:Tarefa){
      return this.http.post(BASE_URL+'/tarefas',tarefa);
    }

    editar(tarefa:Tarefa){
      return this.http.put(BASE_URL + "/tarefas/"+tarefa.id, tarefa)
    }

    excluir(tarefa:Tarefa){
      return this.http.delete(BASE_URL+"/tarefas/"+tarefa.id)
    }  

    obterPorId(id:number){
      return this.http.get(BASE_URL + "/tarefas/"+id)
    }

    listarPorStatus(status:string){
      return this.http.get(BASE_URL+"/tarefas?status="+status)
    }
}
