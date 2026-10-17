import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="about" class="py-20 sm:py-28 bg-white border-t border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <!-- Left Column: Institutional Credentials & Portrait Emblem -->
          <div class="lg:col-span-5 flex flex-col items-center">
            <div class="w-full max-w-md bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950 rounded-3xl p-8 text-stone-100 shadow-2xl border border-amber-500/30 relative overflow-hidden text-center">
              <div class="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <!-- Founder Portrait Emblem (Targeted Selector 2) -->
              <div class="relative w-36 h-36 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-1.5 mx-auto mb-6 shadow-2xl shadow-amber-950/70 group">
                <div class="w-full h-full rounded-full bg-stone-950 overflow-hidden relative ring-4 ring-stone-950">
                  <img
                    src="/images/gopinath_portrait_1792219207260.jpg"
                    alt="Gopinath D S - Founder & Master Numerologist"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerpolicy="no-referrer" />
                </div>
                <div class="absolute -bottom-1 -right-1 bg-amber-500 text-stone-950 w-8 h-8 rounded-full flex items-center justify-center border-2 border-stone-950 shadow-md" title="Certified Master Numerologist">
                  <mat-icon class="text-sm font-bold">verified</mat-icon>
                </div>
              </div>

              <!-- Institute Title -->
              <span class="text-amber-400/90 text-xs font-semibold uppercase tracking-widest block mb-1">
                Centre for Traditional Occult Knowledge
              </span>
              <h3 class="text-2xl font-heading font-black text-stone-50 leading-snug mb-2">
                GYAN JYOTHI SCHOOL OF OCCULT SCIENCE
              </h3>

              <!-- Founder Title -->
              <div class="pt-3 border-t border-stone-800 mb-6">
                <span class="text-xs text-stone-400 uppercase tracking-wider block">Founder & Master Consultant</span>
                <span class="text-2xl font-heading font-bold text-amber-300">Gopinath D S</span>
                <span class="text-xs text-stone-400 block mt-0.5">Vedic & Lo Shu Numerology Specialist</span>
              </div>

              <!-- Location Tag -->
              <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 text-xs text-stone-300 flex items-center gap-3 text-left">
                <mat-icon class="text-amber-400 shrink-0">location_on</mat-icon>
                <div>
                  <span class="font-semibold text-stone-200 block">Sanctuary Location:</span>
                  <span>Chelur Taluk, Chikkaballapur District, Karnataka, India.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Institutional Narrative & Philosophy -->
          <div class="lg:col-span-7">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-4 tracking-wide uppercase">
              <mat-icon class="text-xs text-amber-700">history_edu</mat-icon>
              <span>Authentic Heritage & Scientific Study</span>
            </div>

            <h2 class="text-3xl sm:text-5xl font-heading font-extrabold text-stone-900 tracking-tight leading-tight mb-6">
              Preserving & Teaching the Sacred Discipline of Numbers
            </h2>

            <div class="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-light">
              <p>
                <strong>GYAN JYOTHI SCHOOL OF OCCULT SCIENCE</strong> was established with a singular, noble vision: to demystify traditional numerology and provide an institutional, rational sanctuary for self-discovery, spiritual harmony, and life problem-solving.
              </p>
              <p>
                Founded and directed by esteemed consultant <strong>Gopinath D S</strong> in <strong>Chelur Taluk, Chikkaballapur District, Karnataka, India</strong>, the school serves as both an educational academy for seekers of occult wisdom and a premier consultation hub for individuals and families worldwide.
              </p>
              <p>
                Unlike commercial fortune-telling, our methodology is rooted in authentic mathematical and cosmic disciplines: the ancient Indian <em>Vedic Navagraha</em> system, the ancient Chinese <em>Lo Shu 3x3 Magic Square</em>, and the <em>Chaldean vibrational scale</em>.
              </p>
            </div>

            <!-- Core Principles Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-stone-200">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <mat-icon class="text-lg">psychology</mat-icon>
                </div>
                <div>
                  <h4 class="font-bold text-stone-900 text-sm">Non-Fear Based Counsel</h4>
                  <p class="text-xs text-stone-600 mt-0.5">Empowering guidance that replaces superstition with self-awareness and constructive life habits.</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <mat-icon class="text-lg">school</mat-icon>
                </div>
                <div>
                  <h4 class="font-bold text-stone-900 text-sm">Educational Excellence</h4>
                  <p class="text-xs text-stone-600 mt-0.5">Teaching students the deeper logic of compound numbers, vibrational remedies, and Lo Shu balancing.</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <mat-icon class="text-lg">tune</mat-icon>
                </div>
                <div>
                  <h4 class="font-bold text-stone-900 text-sm">Practical Remedies</h4>
                  <p class="text-xs text-stone-600 mt-0.5">No pressure for expensive rituals. Simple color, signature, directional, and lifestyle adaptations.</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <mat-icon class="text-lg">public</mat-icon>
                </div>
                <div>
                  <h4 class="font-bold text-stone-900 text-sm">Global & Local Reach</h4>
                  <p class="text-xs text-stone-600 mt-0.5">Convenient consultations via Online video, direct Phone calls, or personal visits in Karnataka.</p>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="mt-8 flex items-center gap-4">
              <button
                type="button"
                (click)="scrollToBooking()"
                class="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer">
                <mat-icon class="text-sm">calendar_month</mat-icon>
                <span>Book Session with Gopinath D S</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  scrollToBooking() {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('appointment-booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
