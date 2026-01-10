import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './membership.html',
  styleUrl: './membership.scss',
})
export class MembershipComponent {
  membershipForm: FormGroup;
  submitted = false;
  submitting = false;

  // CONFIGURAÇÃO DO GOOGLE FORM
  // Substitua pela URL do seu formulário (action url)
  private readonly GOOGLE_FORM_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLScRPEHU9_3GQCxrEZ7B218ICGLY09_o88qffkAjp5wkmAP1-g/formResponse';

  // Mapeamento dos campos do formulário para os IDs de entrada do Google Form (entry.XXXXXX)
  // Você deve inspecionar o seu Google Form para obter os IDs corretos
  private readonly GOOGLE_FORM_ENTRIES: { [key: string]: string } = {
    nome: 'entry.1641591585',
    nascimento: 'entry.107349360',
    cpf: 'entry.1408729331',
    rg: 'entry.42125984',
    celular: 'entry.984192994',
    email: 'entry.327569650',
    tipoSanguineo: 'entry.2129161716',
    endereco: 'entry.859130816',
    bairro: 'entry.1915136468',
    cidade: 'entry.495134704',
    estado: 'entry.1011945795',
    cep: 'entry.1090844885',
  };

  tiposSanguineos = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'Não sei'];

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
      cep: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.submitted = true;

    if (this.membershipForm.valid) {
      this.submitting = true;

      try {
        const formData = new FormData();
        const formValue = this.membershipForm.value;

        // Adiciona os campos ao FormData usando os IDs do Google Form
        Object.keys(formValue).forEach((key) => {
          if (this.GOOGLE_FORM_ENTRIES[key]) {
            formData.append(this.GOOGLE_FORM_ENTRIES[key], formValue[key]);
          }
        });

        // Envia para o Google Forms usando no-cors
        await fetch(this.GOOGLE_FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });

        // Como usamos no-cors, não podemos verificar o status real,
        // mas se não lançou erro de rede, assumimos sucesso.
        alert('Ficha enviada com sucesso! Entraremos em contato em breve.');
        this.membershipForm.reset();
        this.submitted = false;
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        alert(
          'Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.'
        );
      } finally {
        this.submitting = false;
      }
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
