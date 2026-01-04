import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.html',
  styleUrl: './learn.scss',
  imports: [CommonModule]
})
export class LearnComponent {
  tips = [
    {
      title: 'Postura',
      content: 'Mantenha os braços levemente flexionados e as mãos firmes no volante (posição 9h15). Encoste bem as costas no banco para sentir o kart.'
    },
    {
      title: 'Traçado Ideal',
      content: 'Use toda a largura da pista. Abra a curva antes de entrar, tangencie no ponto interno (apex) e saia abrindo novamente para ganhar velocidade.'
    },
    {
      title: 'Frenagem',
      content: 'Freie com as rodas retas antes da curva. Evite frear e virar ao mesmo tempo para não perder a traseira do kart.'
    }
  ];
}
