import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../shared/api.service';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, FormControl } from "@angular/forms";

interface Escolaridade {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})

export class AddUsuarioComponent implements OnInit {
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
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private UsuarioApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.UsuarioForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      idEscolaridade: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
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

  /* Submit book */
  submitUsuarioForm() {
    if (this.UsuarioForm.valid) {
      console.log(JSON.stringify(this.UsuarioForm.value))
      this.UsuarioApi.AddUsuario(this.UsuarioForm.value).subscribe(res => {
        console.log("usuario inserido com sucesso")
        this.ngZone.run(() => this.router.navigateByUrl('/usuarios-list'))
      });
    }
  }

}