import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlacesService } from '../../services/google-places.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  imports: [CommonModule],
  standalone: true,
})
export class GalleryComponent implements OnInit {
  galleryPhotos = signal<string[]>([]);
  isLoading = signal<boolean>(true);
  googleMapsUrl = '';

  // Fallback images
  fallbackImages = [
    'https://images.unsplash.com/photo-1596719702219-c0c1694d9370?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599474924187-334a4ae513df?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574780516843-07851e505803?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533560906234-54cb6264e97e?q=80&w=2070&auto=format&fit=crop',
    'https://plus.unsplash.com/premium_photo-1661380967000-84c987309074?q=80&w=2070&auto=format&fit=crop',
  ];

  constructor(private googlePlacesService: GooglePlacesService) {}

  ngOnInit() {
    this.googleMapsUrl = this.googlePlacesService.getGoogleMapsUrl();
    this.isLoading.set(true);
    this.googlePlacesService.getPlacePhotos().subscribe({
      next: (photos) => {
        if (photos && photos.length > 0) {
          this.galleryPhotos.set(photos);
        } else {
          this.galleryPhotos.set(this.fallbackImages);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('GalleryComponent: Erro ao buscar fotos:', err);
        this.galleryPhotos.set(this.fallbackImages);
        this.isLoading.set(false);
      },
    });
  }
}
