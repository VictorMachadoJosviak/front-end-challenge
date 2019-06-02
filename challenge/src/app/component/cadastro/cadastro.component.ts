import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarefaService } from 'src/app/services/tarefa.service';
import { Tarefa } from 'src/app/models/tarefa-model';
import { Router, ActivatedRoute } from '@angular/router';
import { STATUS, isNullOrEmpty } from 'src/app/helpers/helpers';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @ViewChild('successSwal') private successSwal: SwalComponent;

  saveForm: FormGroup
  tarefa: Tarefa

  statusTarefa = STATUS;

  constructor(private fb: FormBuilder,
    private tarefaService: TarefaService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {  
    this.loadForm();  
    var id = Number(this.activatedroute.snapshot.paramMap.get("id"))
    if (id > 0) {
      this.tarefaService.obterPorId(id).subscribe((tarefa: Tarefa) => {                             
        this.tarefa = tarefa       
        this.saveForm.setValue(this.tarefa);
      }
      )
    }
  }

  loadForm() {
    this.saveForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      descricao: [''],
      status: ['', Validators.required]
    })
  }

  save() {
    if (this.saveForm.invalid) {
      return
    }
    if (this.tarefa) {
      this.tarefa = this.saveForm.value
      this.tarefaService.editar(this.tarefa).subscribe()      
    } else {
      var novaTarefa = new Tarefa()
      novaTarefa = this.saveForm.value
      this.tarefaService.cadastrar(novaTarefa).subscribe()      
    }
    this.successSwal.show();
  }

  toHome() {
    this.router.navigate(['/home']);
  }

}
