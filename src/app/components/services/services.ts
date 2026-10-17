import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ALL_NUMEROLOGY_SERVICES, NumerologyServiceItem } from '../../models/numerology.model';
import { BookingStateService } from '../../services/booking-state.service';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="services" class="py-20 sm:py-28 bg-stone-100/60 border-t border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-14">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-3 tracking-wide uppercase">
            <mat-icon class="text-xs text-amber-700">stars</mat-icon>
            <span>Traditional Analytical Systems</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-heading font-extrabold text-stone-900 tracking-tight mb-4">
            Specialized Numerology Services
          </h2>
          <p class="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            Comprehensive consultations blending ancient Vedic principles, Chaldean sound vibrations, and Lo Shu grid geometry for every facet of your life.
          </p>
        </div>

        <!-- Filter Controls & Search -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <!-- Category Pills -->
          <div class="flex flex-wrap items-center justify-center gap-2">
            @for (tab of categories; track tab.key) {
              <button
                type="button"
                (click)="activeCategory.set(tab.key)"
                [class]="activeCategory() === tab.key
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'"
                class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer">
                {{ tab.label }}
              </button>
            }
          </div>

          <!-- Quick Search -->
          <div class="w-full md:w-72 relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 pointer-events-none">
              <mat-icon class="text-sm">search</mat-icon>
            </span>
            <input
              type="text"
              placeholder="Search 18 services..."
              (input)="onSearchInput($event)"
              class="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-xs" />
          </div>
        </div>

        <!-- Services Grid: All 18 Services -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          @for (svc of filteredServices(); track svc.id) {
            <div class="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-amber-400/60">
              <div>
                <!-- Top icon + Category -->
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-100 text-amber-800 flex items-center justify-center transition-colors">
                    <mat-icon>{{ svc.icon }}</mat-icon>
                  </div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-amber-900/70 bg-amber-50/80 px-2.5 py-1 rounded-full border border-amber-200/50">
                    {{ svc.category }}
                  </span>
                </div>

                <!-- Title & Description -->
                <h3 class="text-xl font-heading font-bold text-stone-900 group-hover:text-amber-900 transition-colors mb-2.5">
                  {{ svc.name }}
                </h3>
                <p class="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {{ svc.shortDesc }}
                </p>

                <!-- Key Benefits -->
                <div class="space-y-1.5 pt-3 border-t border-stone-100 mb-6">
                  @for (benefit of svc.keyBenefits; track benefit) {
                    <div class="flex items-center gap-2 text-xs text-stone-700">
                      <mat-icon class="text-xs text-emerald-600 shrink-0">check_circle</mat-icon>
                      <span>{{ benefit }}</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Card Action Button -->
              <div class="pt-2">
                <button
                  type="button"
                  (click)="bookThisService(svc.name)"
                  class="w-full py-3 px-4 bg-stone-900 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-sm cursor-pointer">
                  <mat-icon class="text-sm">calendar_month</mat-icon>
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          }
        </div>

        @if (filteredServices().length === 0) {
          <div class="text-center py-16 bg-white rounded-3xl border border-stone-200">
            <mat-icon class="text-4xl text-stone-400 mb-2">search_off</mat-icon>
            <h4 class="text-base font-bold text-stone-800">No services match your search</h4>
            <p class="text-xs text-stone-500 mt-1">Try another keyword or reset the filter.</p>
          </div>
        }
      </div>
    </section>
  `
})
export class ServicesComponent {
  private bookingState = inject(BookingStateService);

  allServices = ALL_NUMEROLOGY_SERVICES;
  activeCategory = signal<string>('all');
  searchQuery = signal<string>('');

  categories = [
    { key: 'all', label: 'All 18 Services' },
    { key: 'personal', label: 'Personal & Life' },
    { key: 'relationship', label: 'Marriage & Love' },
    { key: 'career', label: 'Career & Wealth' },
    { key: 'environment', label: 'Mobile & Environment' },
    { key: 'advanced', label: 'Lo Shu & Advanced' }
  ];

  filteredServices = computed<NumerologyServiceItem[]>(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.allServices.filter((s) => {
      const matchCat = cat === 'all' || s.category === cat;
      const matchQuery = !query || s.name.toLowerCase().includes(query) || s.shortDesc.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  });

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target ? target.value : '');
  }

  bookThisService(serviceName: string) {
    this.bookingState.selectServiceAndScroll(serviceName);
  }
}
