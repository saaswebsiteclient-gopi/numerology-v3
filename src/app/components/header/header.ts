import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-amber-500/20 text-stone-100 transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">

          <!-- Brand Logo / Name -->
          <a
            href="#"
            (click)="scrollToSection('home', $event)"
            class="flex items-center gap-3 group text-left cursor-pointer">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-0.5 shadow-lg shadow-amber-950/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-all">
              <div class="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-amber-400 group-hover:text-amber-300 shadow-inner">
                <mat-icon class="text-2xl text-amber-400 transition-transform duration-300 group-hover:rotate-12">brightness_7</mat-icon>
              </div>
            </div>
            <div>
              <span class="font-heading font-black text-sm sm:text-base tracking-wide text-stone-50 block leading-tight group-hover:text-amber-300 transition-colors">
                GYAN JYOTHI
              </span>
              <span class="text-[10px] text-amber-400/90 font-medium tracking-widest uppercase block">
                School of Occult Science
              </span>
            </div>
          </a>

          <!-- Desktop Navigation Links -->
          <div class="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-stone-300">
            <a
              href="#home"
              (click)="scrollToSection('home', $event)"
              class="hover:text-amber-400 transition-colors">
              Home
            </a>
            <a
              href="#about"
              (click)="scrollToSection('about', $event)"
              class="hover:text-amber-400 transition-colors">
              About Us
            </a>
            <a
              href="#services"
              (click)="scrollToSection('services', $event)"
              class="hover:text-amber-400 transition-colors">
              Numerology Services
            </a>
            <a
              href="#why-choose"
              (click)="scrollToSection('why-choose', $event)"
              class="hover:text-amber-400 transition-colors">
              Why Choose Us
            </a>
            <a
              href="#contact"
              (click)="scrollToSection('contact', $event)"
              class="hover:text-amber-400 transition-colors">
              Contact Us
            </a>
          </div>

          <!-- Right Action CTA -->
          <div class="hidden sm:flex items-center gap-3">
            <a
              [href]="whatsappUrl()"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 flex items-center justify-center transition-colors"
              title="Chat on WhatsApp">
              <mat-icon class="text-lg">chat</mat-icon>
            </a>

            <button
              type="button"
              (click)="scrollToSection('appointment-booking')"
              class="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
              <mat-icon class="text-xs text-stone-950">calendar_month</mat-icon>
              <span>Book Appointment</span>
            </button>
          </div>

          <!-- Mobile Hamburger Toggle -->
          <div class="flex lg:hidden items-center gap-2">
            <button
              type="button"
              (click)="scrollToSection('appointment-booking')"
              class="px-3 py-1.5 bg-amber-600 text-stone-950 font-bold text-[11px] rounded-lg">
              Book
            </button>
            <button
              type="button"
              (click)="toggleMobileMenu()"
              class="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
              aria-label="Toggle navigation menu">
              <mat-icon>{{ isMobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      @if (isMobileMenuOpen()) {
        <div class="lg:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#home"
            (click)="scrollToSection('home', $event); toggleMobileMenu()"
            class="block py-2 text-sm font-semibold text-stone-200 hover:text-amber-400 border-b border-stone-900">
            Home
          </a>
          <a
            href="#about"
            (click)="scrollToSection('about', $event); toggleMobileMenu()"
            class="block py-2 text-sm font-semibold text-stone-200 hover:text-amber-400 border-b border-stone-900">
            About Us
          </a>
          <a
            href="#services"
            (click)="scrollToSection('services', $event); toggleMobileMenu()"
            class="block py-2 text-sm font-semibold text-stone-200 hover:text-amber-400 border-b border-stone-900">
            Numerology Services
          </a>
          <a
            href="#why-choose"
            (click)="scrollToSection('why-choose', $event); toggleMobileMenu()"
            class="block py-2 text-sm font-semibold text-stone-200 hover:text-amber-400 border-b border-stone-900">
            Why Choose Us
          </a>
          <a
            href="#appointment-booking"
            (click)="scrollToSection('appointment-booking', $event); toggleMobileMenu()"
            class="block py-2 text-sm font-semibold text-amber-300 hover:text-amber-200 border-b border-stone-900">
            Appointment Booking (Compulsory DOB)
          </a>
          <a
            href="#contact"
            (click)="scrollToSection('contact', $event); toggleMobileMenu()"
            class="block py-2 text-sm font-semibold text-stone-200 hover:text-amber-400">
            Contact Us
          </a>

          <div class="pt-3">
            <a
              [href]="whatsappUrl()"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
              <mat-icon class="text-sm">chat</mat-icon>
              <span>Instant WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      }
    </nav>
  `
})
export class HeaderComponent {
  private settingsService = inject(SettingsService);
  contact = this.settingsService.contact;

  isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  scrollToSection(id: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  whatsappUrl(): string {
    const raw = this.contact().whatsapp || '917204945789';
    const clean = raw.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}?text=${encodeURIComponent('Hello Gyan Jyothi School of Occult Science, I want to inquire about a numerology consultation.')}`;
  }
}
