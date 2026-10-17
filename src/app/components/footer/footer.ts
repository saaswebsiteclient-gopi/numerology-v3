import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer class="bg-stone-950 text-stone-300 border-t border-amber-500/20 pt-16 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">

          <!-- Col 1: Institute Brand & Founder Info -->
          <div class="lg:col-span-5 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-0.5 shadow-md flex items-center justify-center shrink-0">
                <div class="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center text-amber-400">
                  <mat-icon class="text-xl">auto_awesome</mat-icon>
                </div>
              </div>
              <div>
                <h3 class="font-heading font-black text-stone-50 tracking-wide text-base">
                  GYAN JYOTHI SCHOOL OF OCCULT SCIENCE
                </h3>
                <span class="text-[10px] text-amber-400/90 font-medium tracking-widest uppercase block">
                  Centre for Traditional Numerology & Guidance
                </span>
              </div>
            </div>

            <p class="text-xs text-stone-400 leading-relaxed font-light pr-4">
              Dedicated to traditional numerological analysis, Lo Shu grid balancing, name vibration alignment, and practical self-growth consultations. Guided by authentic ancient disciplines.
            </p>

            <div class="space-y-1 text-xs text-stone-300 pt-2">
              <p><strong class="text-stone-100">Founder & Consultant:</strong> Gopinath D S</p>
              <p><strong class="text-stone-100">Location:</strong> Chelur Taluk, Chikkaballapur District, Karnataka, India</p>
            </div>
          </div>

          <!-- Col 2: Quick Links -->
          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-xs font-semibold uppercase tracking-widest text-amber-400 font-heading">
              Website Navigation
            </h4>
            <ul class="space-y-2 text-xs">
              <li>
                <a href="#home" (click)="scrollTo('home', $event)" class="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" (click)="scrollTo('about', $event)" class="hover:text-amber-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" (click)="scrollTo('services', $event)" class="hover:text-amber-400 transition-colors">Numerology Services (18)</a>
              </li>
              <li>
                <a href="#why-choose" (click)="scrollTo('why-choose', $event)" class="hover:text-amber-400 transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#appointment-booking" (click)="scrollTo('appointment-booking', $event)" class="hover:text-amber-400 text-amber-300 font-semibold transition-colors">Appointment Booking (Required DOB)</a>
              </li>
              <li>
                <a href="#contact" (click)="scrollTo('contact', $event)" class="hover:text-amber-400 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          <!-- Col 3: Key Services Showcase -->
          <div class="lg:col-span-4 space-y-3">
            <h4 class="text-xs font-semibold uppercase tracking-widest text-amber-400 font-heading">
              Core Consultations
            </h4>
            <div class="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-stone-400">
              <span class="hover:text-stone-200">Personal Numerology</span>
              <span class="hover:text-stone-200">Lo Shu Grid Analysis</span>
              <span class="hover:text-stone-200">Vedic Numerology</span>
              <span class="hover:text-stone-200">Name Correction</span>
              <span class="hover:text-stone-200">Mobile Numerology</span>
              <span class="hover:text-stone-200">Marriage Compatibility</span>
              <span class="hover:text-stone-200">Business Numerology</span>
              <span class="hover:text-stone-200">Complete Consultation</span>
            </div>

            <!-- Booking Shortcut Button -->
            <div class="pt-3">
              <button
                type="button"
                (click)="scrollTo('appointment-booking')"
                class="w-full py-2.5 px-4 bg-amber-700/80 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                <mat-icon class="text-xs text-stone-950">calendar_month</mat-icon>
                <span>Request Consultation</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Ethical Legal Disclaimer (Mandatory) -->
        <div class="py-6 border-b border-stone-800 text-[11px] text-stone-400 leading-relaxed">
          <p>
            <strong class="text-stone-300">Ethical Consultation Notice & Disclaimer:</strong>
            Numerology is an ancient traditional study and analytical practice intended solely for self-reflection, personal exploration, educational insight, and spiritual alignment. It is not scientifically established medical, legal, psychological, or financial advice. Consultations do not provide certified guarantees or substitute for certified healthcare, financial, or legal professionals. Clients are encouraged to exercise personal discernment and free will in all life decisions.
          </p>
        </div>

        <!-- Bottom Bar: Developer Credit & Copyright -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div>
            &copy; {{ currentYear }} <strong>GYAN JYOTHI SCHOOL OF OCCULT SCIENCE</strong>. All rights reserved.
          </div>
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-400">
              Package: <strong>Starter Website Package</strong>
            </span>
            <span>
              Website Developer: <strong class="text-amber-400">Smart Data Solution</strong>
            </span>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  scrollTo(id: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
