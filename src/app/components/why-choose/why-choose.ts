import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-why-choose',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="why-choose" class="py-20 sm:py-28 bg-stone-50 border-t border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-3 tracking-wide uppercase">
            <mat-icon class="text-xs text-amber-700">verified</mat-icon>
            <span>The Gyan Jyothi Difference</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-heading font-extrabold text-stone-900 tracking-tight mb-4">
            Why Choose Our School?
          </h2>
          <p class="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            We honor numerology as a noble analytical science for clarity and growth, rejecting fear-based superstitions in favor of empowering wisdom.
          </p>
        </div>

        <!-- 6 Distinct Pillars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <!-- Pillar 1 -->
          <div class="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
              <mat-icon class="text-3xl">auto_stories</mat-icon>
            </div>
            <h3 class="text-xl font-heading font-bold text-stone-900 mb-3">Authentic Vedic & Lo Shu Lineage</h3>
            <p class="text-stone-600 text-sm leading-relaxed">
              We do not rely on generic software output. Every chart is manually audited using traditional Indian Navagraha principles and authentic 3x3 Lo Shu spatial geometry.
            </p>
          </div>

          <!-- Pillar 2 -->
          <div class="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
              <mat-icon class="text-3xl">lightbulb</mat-icon>
            </div>
            <h3 class="text-xl font-heading font-bold text-stone-900 mb-3">Rational & Practical Remedies</h3>
            <p class="text-stone-600 text-sm leading-relaxed">
              We never promote expensive gemstones or exploitative rituals. Our remedies focus on accessible adjustments: favorable name spelling, color therapy, signature flow, and directional balance.
            </p>
          </div>

          <!-- Pillar 3 -->
          <div class="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
              <mat-icon class="text-3xl">diversity_3</mat-icon>
            </div>
            <h3 class="text-xl font-heading font-bold text-stone-900 mb-3">Multi-Dimensional Analysis</h3>
            <p class="text-stone-600 text-sm leading-relaxed">
              From your birth date and name to your mobile SIM, wristwatch, business brand, and house number, we harmonize every energetic touchpoint in your personal ecosystem.
            </p>
          </div>

          <!-- Pillar 4 -->
          <div class="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
              <mat-icon class="text-3xl">lock</mat-icon>
            </div>
            <h3 class="text-xl font-heading font-bold text-stone-900 mb-3">Strict Confidentiality</h3>
            <p class="text-stone-600 text-sm leading-relaxed">
              Your personal details, birth records, marital challenges, and commercial business plans are treated with sacred professional confidentiality and dignity.
            </p>
          </div>

          <!-- Pillar 5 -->
          <div class="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
              <mat-icon class="text-3xl">person</mat-icon>
            </div>
            <h3 class="text-xl font-heading font-bold text-stone-900 mb-3">Personal Attention by Founder</h3>
            <p class="text-stone-600 text-sm leading-relaxed">
              Sessions are personally reviewed and conducted by Gopinath D S, ensuring consistent master-level interpretation and bespoke strategic guidance.
            </p>
          </div>

          <!-- Pillar 6 -->
          <div class="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
              <mat-icon class="text-3xl">connect_without_contact</mat-icon>
            </div>
            <h3 class="text-xl font-heading font-bold text-stone-900 mb-3">Seamless Online & In-Person</h3>
            <p class="text-stone-600 text-sm leading-relaxed">
              Whether you are located in Karnataka, elsewhere in India, or abroad, consult effortlessly via Online video, WhatsApp audio, or in person at our Chelur sanctuary.
            </p>
          </div>

        </div>

        <!-- Educational Lo Shu Grid Infographic Banner -->
        <div class="mt-16 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-3xl p-8 sm:p-10 text-white border border-amber-500/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div class="max-w-xl">
            <div class="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
              <mat-icon class="text-xs">calculate</mat-icon>
              <span>Vedic & Chinese Symbology</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-heading font-bold text-stone-100 mb-3">
              Understanding the 9 Fundamental Planetary Vibrations
            </h3>
            <p class="text-stone-300 text-xs sm:text-sm leading-relaxed">
              In occult science, numbers 1 to 9 are not merely mathematical symbols, but cosmic archetypes governed by planetary frequencies: 1-Surya, 2-Chandra, 3-Guru, 4-Rahu, 5-Budha, 6-Shukra, 7-Ketu, 8-Shani, 9-Mangal. Understanding your balance unlocks harmonious momentum.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center text-xs w-full lg:w-72 shrink-0">
            <div class="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
              <span class="block text-amber-400 font-bold text-base">4</span>
              <span class="text-[10px] text-stone-400">Rahu / Wealth</span>
            </div>
            <div class="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
              <span class="block text-amber-400 font-bold text-base">9</span>
              <span class="text-[10px] text-stone-400">Mars / Fame</span>
            </div>
            <div class="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
              <span class="block text-amber-400 font-bold text-base">2</span>
              <span class="text-[10px] text-stone-400">Moon / Marriage</span>
            </div>
            <div class="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
              <span class="block text-amber-400 font-bold text-base">3</span>
              <span class="text-[10px] text-stone-400">Jupiter / Family</span>
            </div>
            <div class="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
              <span class="block text-amber-400 font-bold text-base">5</span>
              <span class="text-[10px] text-stone-400">Mercury / Center</span>
            </div>
            <div class="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
              <span class="block text-amber-400 font-bold text-base">7</span>
              <span class="text-[10px] text-stone-400">Ketu / Children</span>
            </div>
            <div class="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
              <span class="block text-amber-400 font-bold text-base">8</span>
              <span class="text-[10px] text-stone-400">Saturn / Knowledge</span>
            </div>
            <div class="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
              <span class="block text-amber-400 font-bold text-base">1</span>
              <span class="text-[10px] text-stone-400">Sun / Career</span>
            </div>
            <div class="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
              <span class="block text-amber-400 font-bold text-base">6</span>
              <span class="text-[10px] text-stone-400">Venus / Friends</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class WhyChooseComponent {}
