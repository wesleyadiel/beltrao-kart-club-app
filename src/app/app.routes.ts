import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { EventsComponent } from './pages/events/events';
import { LearnComponent } from './pages/learn/learn';
import { GalleryComponent } from './pages/gallery/gallery';
import { ContactComponent } from './pages/contact/contact';
import { MembershipComponent } from './pages/membership/membership';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'campeonatos', component: EventsComponent },
  { path: 'aprenda', component: LearnComponent },
  { path: 'galeria', component: GalleryComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'sociedade', component: MembershipComponent },
  { path: '**', redirectTo: '' }
];
