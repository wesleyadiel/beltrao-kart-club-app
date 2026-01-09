import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './membership.html',
  styleUrl: './membership.scss',
})
export class MembershipComponent {
  membershipForm: FormGroup;
  submitted = false;

  tiposSanguineos = [
    'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'Não sei'
  ];

  constructor(private fb: FormBuilder) {
    this.membershipForm = this.fb.group({
      nome: ['', Validators.required],
      nascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoSanguineo: ['', Validators.required],
      endereco: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.membershipForm.valid) {
      console.log('Formulário enviado:', this.membershipForm.value);
      alert('Obrigado pelo interesse! Entraremos em contato em breve.');
      this.membershipForm.reset();
      this.submitted = false;
    } else {
      // Marcar todos os campos como tocados para exibir erros
      this.membershipForm.markAllAsTouched();
    }
  }

  // Helper para verificar erros no template
  hasError(field: string): boolean {
    const control = this.membershipForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched || this.submitted));
  }
}
