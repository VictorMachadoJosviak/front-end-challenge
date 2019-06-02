import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TarefaService } from 'src/app/services/tarefa.service';
import { Tarefa } from 'src/app/models/tarefa-model';
import { STATUS, isNullOrEmpty } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tarefas: Tarefa[]
  tarefa: Tarefa;
  statusTarefa = STATUS;
  statusSelecionado: string
  public feito: boolean;

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.tarefaService.listar().subscribe((response: Tarefa[]) => { this.tarefas = response });
  }

  excluir(item: Tarefa) {
    this.tarefaService.excluir(item).subscribe((resposta) => {
      this.loadData();
    });
  }

  filtrar(newValue) {
    if (!isNullOrEmpty(newValue)) {
      this.tarefaService.listarPorStatus(newValue).subscribe((response: Tarefa[]) => { this.tarefas = response });
    } else {
      this.loadData();
    }
  }

  updateStatus(value: Tarefa, status) {
    value.status = status.toString()
    this.tarefaService.editar(value).subscribe();
  }

  excluirTudo() {
    this.tarefas.forEach((element: Tarefa) => {
      this.tarefaService.excluir(element).subscribe((x) => {
        this.loadData()
      })
    });
  }

  marcarTodosComoFeito(status) {
    this.tarefas.forEach((element: Tarefa) => {
      element.status = status.toString();
      this.tarefaService.editar(element).subscribe((x) => {
        this.loadData();
      })
    });
  }

  excluirFeitos() {
    this.tarefaService.listarPorStatus("true").subscribe((tarefas: Tarefa[]) => {
      tarefas.forEach((element: Tarefa) => {
        this.tarefaService.excluir(element).subscribe((x) => this.loadData())
      })
    });
  }

}
