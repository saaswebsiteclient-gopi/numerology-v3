import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AboutComponent } from './components/about/about';
import { BookingComponent } from './components/booking/booking';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { ServicesComponent } from './components/services/services';
import { WhyChooseComponent } from './components/why-choose/why-choose';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    WhyChooseComponent,
    BookingComponent,
    ContactComponent,
    FooterComponent,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private settingsService = inject(SettingsService);
  contact = this.settingsService.contact;

  scrollToBooking() {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('appointment-booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  whatsappUrl(): string {
    const raw = this.contact().whatsapp || '917204945789';
    const clean = raw.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}?text=${encodeURIComponent('Hello Gyan Jyothi School of Occult Science, I want to inquire about a numerology consultation.')}`;
  }
}
