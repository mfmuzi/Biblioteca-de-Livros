import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent {

  @Input() formGroup!: FormGroup;
  @Input() titulo!: string;
  @Input() controlName!: string;

  constructor(public validacao: ValidarCamposService) { }

get formControl(): AbstractControl{
  return this.formGroup.controls[this.controlName];
}

}
