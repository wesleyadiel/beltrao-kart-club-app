import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

@Injectable({
  providedIn: 'root',
})
export class GooglePlacesService {
  private apiKey = environment.googleMapsApiKey;
  private placeId = environment.placeId;

  constructor() {
    console.log('GooglePlacesService: Serviço inicializado.');
    console.log('GooglePlacesService: Place ID configurado:', this.placeId);
    console.log(
      'GooglePlacesService: API Key configurada:',
      this.apiKey ? 'Sim (***' + this.apiKey.slice(-4) + ')' : 'Não'
    );
  }

  getGoogleMapsUrl(): string {
    return `https://www.google.com/maps/place/?q=place_id:${this.placeId}`;
  }

  getPlacePhotos(): Observable<string[]> {
    const result = new Subject<string[]>();

    // If API Key or Place ID is missing/placeholder, return empty immediately to avoid errors
    if (
      !this.apiKey ||
      this.apiKey === 'YOUR_API_KEY' ||
      !this.placeId ||
      this.placeId === 'YOUR_PLACE_ID'
    ) {
      console.warn('Google Maps API Key or Place ID is missing in environment configuration.');
      // Return empty so the component uses fallback images
      setTimeout(() => {
        result.next([]);
        result.complete();
      }, 0);
      return result.asObservable();
    }

    // Configure the loader options
    setOptions({
      key: this.apiKey,
      v: 'weekly',
    });

    importLibrary('places')
      .then(async ({ Place }) => {
        console.log('GooglePlacesService: Biblioteca Places importada via importLibrary.');

        try {
          const place = new Place({
            id: this.placeId,
          });

          // Fetch fields using the new API
          const fetchResult = await place.fetchFields({ fields: ['photos'] });
          const photos = fetchResult.place.photos;

          console.log('GooglePlacesService: Resposta da nova API:', photos);

          if (photos && photos.length > 0) {
            console.log(`GooglePlacesService: Encontradas ${photos.length} fotos.`);
            const photoUrls = photos.map((photo: any) =>
              photo.getURI({ maxWidth: 800, maxHeight: 600 })
            );
            result.next(photoUrls);
          } else {
            console.log('GooglePlacesService: Nenhuma foto encontrada.');
            result.next([]);
          }
        } catch (error) {
          console.error('Google Places API Error (New API):', error);
          result.next([]);
        }
        result.complete();
      })
      .catch((err: any) => {
        console.error('Error loading Google Maps script:', err);
        result.next([]);
        result.complete();
      });

    return result.asObservable();
  }
}
