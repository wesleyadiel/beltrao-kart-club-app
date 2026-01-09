import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class HeaderComponent {
  isMenuOpen = false;
  isScrolled = false;

  menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Campeonatos', path: '/campeonatos' },
    { label: 'Aprenda', path: '/aprenda' },
    { label: 'Galeria', path: '/galeria' },
    { label: 'Seja Sócio', path: '/sociedade' },
    { label: 'Contato', path: '/contato' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
