import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.html',
  styleUrl: './events.scss',
  imports: [CommonModule],
})
export class EventsComponent implements AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('modalVideo') modalVideo!: ElementRef<HTMLVideoElement>;
  isVideoOpen = false;

  openVideo() {
    this.isVideoOpen = true;
    setTimeout(() => {
      if (this.modalVideo?.nativeElement) {
        this.modalVideo.nativeElement.muted = true;
        this.modalVideo.nativeElement.volume = 0;
      }
    }, 0);
  }

  closeVideo() {
    this.isVideoOpen = false;
  }

  events = [
    { name: '1ª Etapa Campeonato Beltronense', date: '15/03/2026', status: 'Confirmado' },
    { name: 'Copa Sudoeste de Kart', date: '20/04/2026', status: 'Em breve' },
    { name: '2ª Etapa Campeonato Beltronense', date: '10/05/2026', status: 'Em breve' },
    { name: 'Treino Aberto Noturno', date: '25/05/2026', status: 'Confirmado' },
  ];

  categories = [
    {
      name: 'Infantil',
      description: 'Para pilotos de 6 a 12 anos. Foco em aprendizado e segurança.',
    },
    { name: 'Escola', description: 'Categoria de entrada para iniciantes de todas as idades.' },
    {
      name: 'Locado',
      description: 'Para quem quer correr sem ter kart próprio. Karts fornecidos pelo clube.',
    },
    {
      name: 'Livre',
      description: 'Para pilotos experientes com karts preparados. Alta competição.',
    },
  ];

  ngAfterViewInit() {
    if (this.bgVideo?.nativeElement) {
      // Force mute again to ensure it sticks
      this.bgVideo.nativeElement.muted = true;
      this.bgVideo.nativeElement.defaultMuted = true; // Also set defaultMuted
      this.bgVideo.nativeElement.volume = 0;

      // Attempt play
      const playPromise = this.bgVideo.nativeElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Autoplay prevented:', err);
          // If autoplay fails, try again with mute enforced (just in case)
          this.bgVideo.nativeElement.muted = true;
          this.bgVideo.nativeElement.play().catch((e) => console.error('Retry play failed:', e));
        });
      }
    }
  }
}
