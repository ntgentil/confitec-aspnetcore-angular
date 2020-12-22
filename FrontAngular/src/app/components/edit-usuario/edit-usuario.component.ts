import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from 'moment';


interface Escolaridade {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-Usuario.component.css']
})

export class EditUsuarioComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetUsuarioForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  UsuarioForm: FormGroup;
  selectedValue: number;

  escolaridades: Escolaridade[] = [
    {value: 1, viewValue: 'Infantil'},
    {value: 2, viewValue: 'Fundamental'},
    {value: 3, viewValue: 'Médio'},
    {value: 4, viewValue: 'Superior'}
  ];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private UsuarioApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.UsuarioApi.GetUsuario(id).subscribe(data => {
      console.log(data.subjects)
      this.selectedValue = data.idEscolaridade;
      this.UsuarioForm = this.fb.group({
        nome: [data.nome, [Validators.required]],
        sobrenome: [data.sobrenome, [Validators.required]],
        email: [data.email, [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        dataNascimento: [data.dataNascimento, [Validators.required]],
        idEscolaridade: [data.escolaridade]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.UsuarioForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      idEscolaridade: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      dataNascimento: ['', [Validators.required]]
    })
  }




  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);

    var dateCompare = moment(new Date(e.target.value)).format('YYYY-MM-DD');
    var dayDate = moment(Date.now()).format('YYYY-MM-DD');
    if(dateCompare >= dayDate)
      return this.UsuarioForm.controls['dataNascimento'].setErrors({'incorrect': true});

    this.UsuarioForm.get('dataNascimento').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.UsuarioForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateUsuarioForm() {
    console.log(this.UsuarioForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Tem certeza que deseja atualizar?')) {
      this.UsuarioApi.UpdateUsuario(id, this.UsuarioForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/usuarios-list'))
      });
    }
  }
  
}
