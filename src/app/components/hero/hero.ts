import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { calculateNumerologyProfile, NumerologyBreakdown } from '../../utils/numerology-calculator';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <header class="relative overflow-hidden bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950 text-stone-100 pt-28 pb-20 sm:pt-36 sm:pb-28">
      <!-- Sacred Sacred Geometry Background Glow -->
      <div class="absolute inset-0 opacity-15 pointer-events-none">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-amber-500/30 via-amber-700/10 to-transparent blur-3xl"></div>
        <div class="absolute -bottom-24 right-10 w-96 h-96 rounded-full bg-amber-600/20 blur-2xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Top Institutional Badge -->
        <div class="flex items-center justify-center mb-6">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs sm:text-sm font-medium tracking-wide uppercase shadow-inner">
            <mat-icon class="text-sm text-amber-400">auto_awesome</mat-icon>
            <span>Centre for Traditional Numerology &bull; Karnataka, India</span>
          </div>
        </div>

        <!-- Main Titles -->
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Align Your Numbers &bull; Align Your Life &bull; Shape Your Destiny</span>
          </div>

          <h2 class="text-amber-400/90 text-sm sm:text-base font-semibold tracking-widest uppercase mb-3 font-heading">
            GYAN JYOTHI SCHOOL OF OCCULT SCIENCE
          </h2>

          <!-- Targeted Selector 3: Hero h1 -->
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-stone-50 tracking-tight leading-tight sm:leading-none mb-6 drop-shadow-sm">
            Discover the <span class="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-md">Power of Numbers</span>
          </h1>

          <p class="text-base sm:text-xl text-stone-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Explore traditional numerology for self-understanding, relationships, career, business and personal growth.
          </p>

          <!-- Primary CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              type="button"
              (click)="scrollToSection('appointment-booking')"
              class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-2xl shadow-lg hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer">
              <mat-icon class="text-stone-950 group-hover:scale-110 transition-transform">calendar_month</mat-icon>
              <span>Book Appointment</span>
            </button>

            <button
              type="button"
              (click)="scrollToSection('services')"
              class="w-full sm:w-auto px-8 py-4 bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-amber-400/40 font-semibold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer">
              <mat-icon class="text-amber-400">explore</mat-icon>
              <span>Explore Services</span>
            </button>
          </div>
        </div>

        <!-- Interactive Quick Birth Number & Lo Shu Preview Card -->
        <div class="max-w-3xl mx-auto bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <div class="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                <mat-icon class="text-xs">bolt</mat-icon>
                <span>Interactive Vedic & Lo Shu Calculator</span>
              </div>
              <h3 class="text-lg sm:text-xl font-heading font-bold text-white">Check Your Driver & Destiny Numbers</h3>
            </div>
            
            <div class="flex items-center gap-2">
              <label for="hero-dob" class="text-xs text-stone-400 whitespace-nowrap">Enter Birth Date:</label>
              <input
                id="hero-dob"
                type="date"
                [max]="todayDate"
                (change)="onDobChange($event)"
                class="px-3 py-2 bg-stone-950 border border-amber-500/40 rounded-xl text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>

          <!-- Result Preview -->
          @if (breakdown(); as data) {
            <div class="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <!-- Driver & Destiny Pills -->
              <div class="md:col-span-7 space-y-4">
                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-stone-950/80 border border-stone-800 rounded-2xl p-4">
                    <span class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Moolank (Driver)</span>
                    <div class="flex items-baseline gap-2 mt-1">
                      <span class="text-3xl font-heading font-black text-amber-400">{{ data.driverNumber }}</span>
                      <span class="text-xs text-stone-300 font-medium">{{ data.driverRuler }}</span>
                    </div>
                    <p class="text-[11px] text-stone-400 mt-1 line-clamp-1">{{ data.driverKeywords }}</p>
                  </div>

                  <div class="bg-stone-950/80 border border-stone-800 rounded-2xl p-4">
                    <span class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">Bhagyank (Destiny)</span>
                    <div class="flex items-baseline gap-2 mt-1">
                      <span class="text-3xl font-heading font-black text-amber-400">{{ data.destinyNumber }}</span>
                      <span class="text-xs text-stone-300 font-medium">{{ data.destinyRuler }}</span>
                    </div>
                    <p class="text-[11px] text-stone-400 mt-1 line-clamp-1">{{ data.destinyKeywords }}</p>
                  </div>
                </div>

                <div class="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl text-xs text-stone-300 flex items-center justify-between">
                  <span>Want a full planetary remedy chart & missing numbers remedies?</span>
                  <button
                    type="button"
                    (click)="scrollToSection('appointment-booking')"
                    class="text-amber-400 font-semibold hover:underline flex items-center gap-1 shrink-0 ml-2">
                    Book Full Analysis &rarr;
                  </button>
                </div>
              </div>

              <!-- Mini Lo Shu Grid Display -->
              <div class="md:col-span-5 flex flex-col items-center">
                <span class="text-[11px] font-semibold uppercase tracking-wider text-amber-400/80 mb-2">Lo Shu Chart Matrix</span>
                <div class="grid grid-cols-3 gap-1.5 p-2 bg-stone-950 rounded-2xl border border-stone-800 w-48 h-48">
                  <!-- Row 1: 4, 9, 2 -->
                  <div class="flex flex-col items-center justify-center rounded-xl" [class]="getCellClass(data.gridCounts[4])">
                    <span class="font-bold text-sm">{{ data.gridCounts[4] > 0 ? getRepeat(4, data.gridCounts[4]) : '-' }}</span>
                    <span class="text-[9px] opacity-70">4</span>
                  </div>
                  <div class="flex flex-col items-center justify-center rounded-xl" [class]="getCellClass(data.gridCounts[9])">
                    <span class="font-bold text-sm">{{ data.gridCounts[9] > 0 ? getRepeat(9, data.gridCounts[9]) : '-' }}</span>
                    <span class="text-[9px] opacity-70">9</span>
                  </div>
                  <div class="flex flex-col items-center justify-center rounded-xl" [class]="getCellClass(data.gridCounts[2])">
                    <span class="font-bold text-sm">{{ data.gridCounts[2] > 0 ? getRepeat(2, data.gridCounts[2]) : '-' }}</span>
                    <span class="text-[9px] opacity-70">2</span>
                  </div>

                  <!-- Row 2: 3, 5, 7 -->
                  <div class="flex flex-col items-center justify-center rounded-xl" [class]="getCellClass(data.gridCounts[3])">
                    <span class="font-bold text-sm">{{ data.gridCounts[3] > 0 ? getRepeat(3, data.gridCounts[3]) : '-' }}</span>
                    <span class="text-[9px] opacity-70">3</span>
                  </div>
                  <div class="flex flex-col items-center justify-center rounded-xl" [class]="getCellClass(data.gridCounts[5])">
                    <span class="font-bold text-sm">{{ data.gridCounts[5] > 0 ? getRepeat(5, data.gridCounts[5]) : '-' }}</span>
                    <span class="text-[9px] opacity-70">5</span>
                  </div>
                  <div class="flex flex-col items-center justify-center rounded-xl" [class]="getCellClass(data.gridCounts[7])">
                    <span class="font-bold text-sm">{{ data.gridCounts[7] > 0 ? getRepeat(7, data.gridCounts[7]) : '-' }}</span>
                    <span class="text-[9px] opacity-70">7</span>
                  </div>

                  <!-- Row 3: 8, 1, 6 -->
                  <div class="flex flex-col items-center justify-center rounded-xl" [class]="getCellClass(data.gridCounts[8])">
                    <span class="font-bold text-sm">{{ data.gridCounts[8] > 0 ? getRepeat(8, data.gridCounts[8]) : '-' }}</span>
                    <span class="text-[9px] opacity-70">8</span>
                  </div>
                  <div class="flex flex-col items-center justify-center rounded-xl" [class]="getCellClass(data.gridCounts[1])">
                    <span class="font-bold text-sm">{{ data.gridCounts[1] > 0 ? getRepeat(1, data.gridCounts[1]) : '-' }}</span>
                    <span class="text-[9px] opacity-70">1</span>
                  </div>
                  <div class="flex flex-col items-center justify-center rounded-xl" [class]="getCellClass(data.gridCounts[6])">
                    <span class="font-bold text-sm">{{ data.gridCounts[6] > 0 ? getRepeat(6, data.gridCounts[6]) : '-' }}</span>
                    <span class="text-[9px] opacity-70">6</span>
                  </div>
                </div>
              </div>
            </div>
          } @else {
            <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-stone-400 text-xs gap-3">
              <div class="flex items-center gap-2">
                <mat-icon class="text-amber-400 text-sm">lightbulb</mat-icon>
                <span>Select your Date of Birth above to reveal your core numbers and Lo Shu matrix preview.</span>
              </div>
              <span class="text-[11px] text-stone-500">Traditional Vedic & Lo Shu Formulae</span>
            </div>
          }
        </div>
      </div>
    </header>
  `
})
export class HeroComponent {
  todayDate = new Date().toISOString().split('T')[0];
  selectedDob = signal<string>('1992-07-15'); // default illustrative date

  breakdown = computed<NumerologyBreakdown | null>(() => {
    const dob = this.selectedDob();
    return calculateNumerologyProfile(dob);
  });

  onDobChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.selectedDob.set(target.value);
    }
  }

  scrollToSection(id: string) {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  getCellClass(count: number): string {
    if (count > 0) {
      return 'bg-amber-500/20 border border-amber-400/40 text-amber-200';
    }
    return 'bg-stone-900 border border-stone-800 text-stone-600';
  }

  getRepeat(num: number, count: number): string {
    return String(num).repeat(Math.min(count, 3));
  }
}
