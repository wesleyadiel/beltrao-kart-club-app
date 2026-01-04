import { Component, OnInit, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GooglePlacesService } from '../../services/google-places.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  galleryPhotos = signal<string[]>([]);

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(private googlePlacesService: GooglePlacesService) {}

  ngOnInit() {
    console.log('HomeComponent: Iniciando busca de fotos...');
    this.googlePlacesService.getPlacePhotos().subscribe({
      next: (photos) => {
        console.log('HomeComponent: Fotos recebidas:', photos);
        if (photos && photos.length > 0) {
          this.galleryPhotos.set(photos.slice(0, 4));
        } else {
          console.warn('HomeComponent: Nenhuma foto retornada pela API (usando fallback).');
        }
      },
      error: (err) => console.error('HomeComponent: Erro ao buscar fotos:', err),
    });
  }

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
          this.bgVideo.nativeElement.play().catch(e => console.error('Retry play failed:', e));
        });
      }
    }
  }
}
