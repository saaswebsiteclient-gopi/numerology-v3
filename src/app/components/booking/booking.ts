import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ALL_NUMEROLOGY_SERVICES, AppointmentPayload } from '../../models/numerology.model';
import { BookingStateService } from '../../services/booking-state.service';
import { SettingsService } from '../../services/settings.service';
import { formatToDDMMYYYY } from '../../utils/numerology-calculator';
import { SummaryModal } from '../summary-modal/summary-modal';

@Component({
  selector: 'app-booking',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule, SummaryModal],
  template: `
    <section id="appointment-booking" class="py-20 sm:py-28 bg-stone-900 text-stone-100 relative overflow-hidden">
      <!-- Sacred Background Elements -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute top-10 left-10 w-80 h-80 rounded-full bg-amber-500 blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-700 blur-3xl"></div>
      </div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-400/30 text-amber-300 mb-3 tracking-wide uppercase">
            <mat-icon class="text-xs text-amber-400">event_note</mat-icon>
            <span>Confidential & Authentic Consultation</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-heading font-extrabold text-stone-50 tracking-tight mb-4">
            Request an Appointment
          </h2>
          <p class="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Book a one-on-one session with <strong>Gopinath D S</strong>. Please complete the form below.
            <span class="text-amber-300 font-semibold block mt-1">Date of Birth is strictly compulsory for accurate chart calculation.</span>
          </p>
        </div>

        <!-- Main Booking Card -->
        <div class="bg-stone-950/90 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="space-y-8">

            <!-- SECTION 1: CUSTOMER DETAILS -->
            <div>
              <div class="flex items-center gap-2 pb-3 mb-6 border-b border-stone-800">
                <mat-icon class="text-amber-400">person_pin</mat-icon>
                <h3 class="text-lg font-heading font-bold text-stone-100">1. Customer Details</h3>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <!-- Full Name -->
                <div>
                  <label for="fullName" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Full Name <span class="text-amber-400">*</span>
                  </label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-500 pointer-events-none">
                      <mat-icon class="text-sm">badge</mat-icon>
                    </span>
                    <input
                      id="fullName"
                      type="text"
                      formControlName="fullName"
                      placeholder="e.g. Ramesh Kumar"
                      class="w-full pl-10 pr-3 py-3 bg-stone-900 border rounded-xl text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      [class]="isFieldInvalid('fullName') ? 'border-red-500' : 'border-stone-800'" />
                  </div>
                  @if (isFieldInvalid('fullName')) {
                    <p class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <mat-icon class="text-xs">error</mat-icon> Full Name is required.
                    </p>
                  }
                </div>

                <!-- Mobile Number -->
                <div>
                  <label for="mobileNumber" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Mobile Number <span class="text-amber-400">*</span>
                  </label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-500 pointer-events-none">
                      <mat-icon class="text-sm">phone</mat-icon>
                    </span>
                    <input
                      id="mobileNumber"
                      type="tel"
                      formControlName="mobileNumber"
                      placeholder="10-digit mobile number"
                      class="w-full pl-10 pr-3 py-3 bg-stone-900 border rounded-xl text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      [class]="isFieldInvalid('mobileNumber') ? 'border-red-500' : 'border-stone-800'" />
                  </div>
                  @if (isFieldInvalid('mobileNumber')) {
                    <p class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <mat-icon class="text-xs">error</mat-icon> Valid mobile number is required.
                    </p>
                  }
                </div>

                <!-- WhatsApp Number (Optional) -->
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label for="whatsappNumber" class="text-xs font-semibold uppercase tracking-wider text-stone-300">
                      WhatsApp Number <span class="text-stone-500 font-normal">(Optional)</span>
                    </label>
                    <button
                      type="button"
                      (click)="syncWhatsappWithMobile()"
                      class="text-[11px] text-amber-400 hover:text-amber-300 underline cursor-pointer">
                      Same as mobile
                    </button>
                  </div>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-500 pointer-events-none">
                      <mat-icon class="text-sm">chat</mat-icon>
                    </span>
                    <input
                      id="whatsappNumber"
                      type="tel"
                      formControlName="whatsappNumber"
                      placeholder="WhatsApp contact if different"
                      class="w-full pl-10 pr-3 py-3 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  </div>
                </div>

                <!-- Email Address (Optional) -->
                <div>
                  <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Email Address <span class="text-stone-500 font-normal">(Optional)</span>
                  </label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-500 pointer-events-none">
                      <mat-icon class="text-sm">email</mat-icon>
                    </span>
                    <input
                      id="email"
                      type="email"
                      formControlName="email"
                      placeholder="name@example.com"
                      class="w-full pl-10 pr-3 py-3 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  </div>
                  @if (bookingForm.get('email')?.touched && bookingForm.get('email')?.errors?.['email']) {
                    <p class="text-xs text-red-400 mt-1">Please enter a valid email format.</p>
                  }
                </div>

                <!-- DATE OF BIRTH - REQUIRED (COMPULSORY) -->
                <div class="sm:col-span-1">
                  <div class="flex items-center justify-between mb-1.5">
                    <label for="dateOfBirth" class="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Date of Birth <span class="text-amber-400 font-bold">* REQUIRED (COMPULSORY)</span>
                    </label>
                    @if (formattedDobPreview()) {
                      <span class="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-mono border border-amber-400/30">
                        Format: {{ formattedDobPreview() }}
                      </span>
                    } @else {
                      <span class="text-[11px] text-stone-400 font-mono">Format: DD/MM/YYYY</span>
                    }
                  </div>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-amber-400 pointer-events-none">
                      <mat-icon class="text-sm">cake</mat-icon>
                    </span>
                    <input
                      id="dateOfBirth"
                      type="date"
                      formControlName="dateOfBirth"
                      [max]="todayDate"
                      (change)="updateDobPreview($event)"
                      class="w-full pl-10 pr-3 py-3 bg-stone-900 border-2 rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      [class]="isDobInvalid() ? 'border-red-500 bg-red-950/20' : 'border-amber-500/60'" />
                  </div>
                  @if (isDobInvalid()) {
                    <p class="text-xs text-red-400 font-semibold mt-1.5 flex items-center gap-1">
                      <mat-icon class="text-xs">warning</mat-icon>
                      <span>Please enter your Date of Birth.</span>
                    </p>
                  } @else {
                    <p class="text-[11px] text-stone-400 mt-1">
                      Required for Driver, Conductor & Lo Shu grid chart calculations. No future dates allowed.
                    </p>
                  }
                </div>

                <!-- City / Location -->
                <div class="sm:col-span-1">
                  <label for="city" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    City / Location <span class="text-amber-400">*</span>
                  </label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-500 pointer-events-none">
                      <mat-icon class="text-sm">location_city</mat-icon>
                    </span>
                    <input
                      id="city"
                      type="text"
                      formControlName="city"
                      placeholder="e.g. Bangalore, Chikkaballapur, Mysore, etc."
                      class="w-full pl-10 pr-3 py-3 bg-stone-900 border rounded-xl text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      [class]="isFieldInvalid('city') ? 'border-red-500' : 'border-stone-800'" />
                  </div>
                  @if (isFieldInvalid('city')) {
                    <p class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <mat-icon class="text-xs">error</mat-icon> City / Location is required.
                    </p>
                  }
                </div>
              </div>
            </div>

            <!-- SECTION 2: PURPOSE OF CONSULTATION (SEARCHABLE MULTI-SELECT DROPDOWN) -->
            <div>
              <div class="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-amber-400">format_list_bulleted</mat-icon>
                  <h3 class="text-lg font-heading font-bold text-stone-100">
                    2. Purpose of Consultation <span class="text-amber-400">*</span>
                  </h3>
                </div>
                <span class="text-xs text-stone-400">
                  Selected: <strong class="text-amber-300">{{ selectedServices().length }}</strong> of 18
                </span>
              </div>

              <!-- Selected Tags Display Area -->
              <div class="mb-3">
                @if (selectedServices().length > 0) {
                  <div class="flex flex-wrap gap-2 p-3 bg-stone-900/90 rounded-2xl border border-stone-800 min-h-12 items-center">
                    @for (svc of selectedServices(); track svc) {
                      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-medium">
                        <span>{{ svc }}</span>
                        <button
                          type="button"
                          (click)="removeService(svc)"
                          class="hover:text-white p-0.5 rounded-full hover:bg-amber-500/30 cursor-pointer"
                          aria-label="Remove service">
                          <mat-icon class="text-xs">close</mat-icon>
                        </button>
                      </span>
                    }
                  </div>
                } @else {
                  <div class="p-4 bg-stone-900/50 rounded-2xl border border-dashed border-stone-800 text-xs text-stone-400 text-center">
                    No services selected yet. Click the dropdown below to select from all 18 numerology services.
                  </div>
                }
              </div>

              <!-- Searchable Dropdown Container -->
              <div class="relative">
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    (click)="toggleDropdown()"
                    class="flex-1 px-4 py-3 bg-stone-900 border rounded-xl text-stone-200 text-sm flex items-center justify-between hover:border-amber-500/60 transition-colors cursor-pointer"
                    [class]="servicesError() ? 'border-red-500' : 'border-stone-800'">
                    <span class="flex items-center gap-2">
                      <mat-icon class="text-stone-400 text-sm">search</mat-icon>
                      <span class="text-stone-300">
                        {{ isDropdownOpen() ? 'Click to close selector' : 'Search & select consultation services...' }}
                      </span>
                    </span>
                    <mat-icon class="text-stone-400 transition-transform" [class]="isDropdownOpen() ? 'rotate-180' : ''">
                      arrow_drop_down
                    </mat-icon>
                  </button>

                  <button
                    type="button"
                    (click)="selectAllServices()"
                    class="px-3 py-3 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 rounded-xl text-xs font-medium transition-colors shrink-0">
                    Select All
                  </button>

                  <button
                    type="button"
                    (click)="clearAllServices()"
                    class="px-3 py-3 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 rounded-xl text-xs font-medium transition-colors shrink-0">
                    Clear
                  </button>
                </div>

                <!-- Dropdown Menu -->
                @if (isDropdownOpen()) {
                  <div class="absolute top-full left-0 right-0 mt-2 bg-stone-950 border border-amber-500/30 rounded-2xl shadow-2xl p-4 z-30 max-h-80 overflow-y-auto">
                    <!-- Search Input Inside Dropdown -->
                    <div class="mb-3 sticky top-0 bg-stone-950 pt-1 pb-2 border-b border-stone-800">
                      <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-500 pointer-events-none">
                          <mat-icon class="text-sm">filter_list</mat-icon>
                        </span>
                        <input
                          type="text"
                          [value]="searchFilter()"
                          (input)="onServiceFilterInput($event)"
                          placeholder="Filter services by name..."
                          class="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500" />
                      </div>
                    </div>

                    <!-- Services Checkboxes List -->
                    <div class="space-y-1">
                      @for (svc of filteredServicesList(); track svc.id) {
                        <label
                          class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-900 transition-colors cursor-pointer group">
                          <input
                            type="checkbox"
                            [checked]="isServiceSelected(svc.name)"
                            (change)="toggleService(svc.name)"
                            class="w-4 h-4 rounded-sm text-amber-600 bg-stone-800 border-stone-700 focus:ring-amber-500 cursor-pointer" />
                          <div class="flex-1">
                            <span class="text-xs font-medium text-stone-200 group-hover:text-amber-300 transition-colors">
                              {{ svc.name }}
                            </span>
                            <span class="block text-[11px] text-stone-500 line-clamp-1">{{ svc.shortDesc }}</span>
                          </div>
                          @if (isServiceSelected(svc.name)) {
                            <mat-icon class="text-xs text-amber-400">check</mat-icon>
                          }
                        </label>
                      }
                    </div>
                  </div>
                }
              </div>

              @if (servicesError()) {
                <p class="text-xs text-red-400 mt-2 flex items-center gap-1 font-medium">
                  <mat-icon class="text-xs">error</mat-icon>
                  <span>At least one numerology service must be selected.</span>
                </p>
              }
            </div>

            <!-- SECTION 3: APPOINTMENT DETAILS -->
            <div>
              <div class="flex items-center gap-2 pb-3 mb-6 border-b border-stone-800">
                <mat-icon class="text-amber-400">schedule</mat-icon>
                <h3 class="text-lg font-heading font-bold text-stone-100">3. Appointment Schedule & Mode</h3>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <!-- Preferred Date -->
                <div>
                  <label for="preferredDate" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Preferred Date <span class="text-amber-400">*</span>
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    formControlName="preferredDate"
                    [min]="todayDate"
                    class="w-full px-3.5 py-3 bg-stone-900 border rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    [class]="isFieldInvalid('preferredDate') ? 'border-red-500' : 'border-stone-800'" />
                  @if (isFieldInvalid('preferredDate')) {
                    <p class="text-xs text-red-400 mt-1">Preferred date is required.</p>
                  }
                </div>

                <!-- Preferred Time Slot -->
                <div>
                  <label for="preferredTime" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Preferred Time Slot <span class="text-amber-400">*</span>
                  </label>
                  <select
                    id="preferredTime"
                    formControlName="preferredTime"
                    class="w-full px-3.5 py-3 bg-stone-900 border rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    [class]="isFieldInvalid('preferredTime') ? 'border-red-500' : 'border-stone-800'">
                    <option value="" disabled selected>Select a time window</option>
                    <option value="10:00 AM - 12:00 PM (Morning)">10:00 AM - 12:00 PM (Morning)</option>
                    <option value="02:00 PM - 04:00 PM (Afternoon)">02:00 PM - 04:00 PM (Afternoon)</option>
                    <option value="05:00 PM - 07:00 PM (Evening)">05:00 PM - 07:00 PM (Evening)</option>
                    <option value="07:00 PM - 09:00 PM (Night)">07:00 PM - 09:00 PM (Night)</option>
                  </select>
                  @if (isFieldInvalid('preferredTime')) {
                    <p class="text-xs text-red-400 mt-1">Please pick a time slot.</p>
                  }
                </div>

                <!-- Consultation Mode -->
                <div>
                  <label for="consultationMode" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Consultation Mode <span class="text-amber-400">*</span>
                  </label>
                  <select
                    id="consultationMode"
                    formControlName="consultationMode"
                    class="w-full px-3.5 py-3 bg-stone-900 border rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    [class]="isFieldInvalid('consultationMode') ? 'border-red-500' : 'border-stone-800'">
                    <option value="Online">Online Video (Google Meet / WhatsApp)</option>
                    <option value="Phone">Direct Phone Call</option>
                    <option value="In Person">In Person (Chelur Taluk, Karnataka)</option>
                  </select>
                  @if (isFieldInvalid('consultationMode')) {
                    <p class="text-xs text-red-400 mt-1">Mode is required.</p>
                  }
                </div>
              </div>

              <!-- Additional Message / Query -->
              <div class="mt-5">
                <label for="additionalMessage" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                  Specific Query or Questions <span class="text-stone-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="additionalMessage"
                  formControlName="additionalMessage"
                  rows="3"
                  placeholder="Mention any specific challenges, auspicious dates you are targeting, or business name ideas..."
                  class="w-full p-3.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
              </div>
            </div>

            <!-- PRIVACY NOTICE & CONSENT CHECKBOX -->
            <div class="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  formControlName="privacyConsent"
                  class="w-4 h-4 mt-1 rounded-sm text-amber-600 bg-stone-950 border-stone-700 focus:ring-amber-500 cursor-pointer" />
                <div class="text-xs text-stone-300 leading-relaxed">
                  <span class="font-semibold text-stone-100">Privacy Notice & WhatsApp Communication Consent:</span>
                  I consent to sharing my Date of Birth and details with Gyan Jyothi School of Occult Science for appointment scheduling and consultation via WhatsApp / Phone. I understand my data remains strictly confidential and will never be shared with third parties.
                </div>
              </label>
              @if (bookingForm.get('privacyConsent')?.touched && bookingForm.get('privacyConsent')?.invalid) {
                <p class="text-xs text-red-400 mt-2 flex items-center gap-1 font-medium">
                  <mat-icon class="text-xs">error</mat-icon>
                  <span>Please check the privacy and communication consent box.</span>
                </p>
              }
            </div>

            <!-- SUBMIT BUTTON -->
            <div class="pt-4 flex flex-col items-center">
              <button
                type="submit"
                class="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-stone-950 font-heading font-black text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer">
                <mat-icon class="text-stone-950">send</mat-icon>
                <span>Request Appointment</span>
              </button>

              <div class="mt-4 flex items-center gap-2 text-stone-400 text-xs text-center">
                <mat-icon class="text-xs text-amber-400">verified_user</mat-icon>
                <span>Generates instant WhatsApp pre-filled enquiry. Strictly confirmed upon manual review by Gopinath D S.</span>
              </div>
            </div>

          </form>
        </div>
      </div>

      <!-- Summary Modal -->
      @if (activeSummaryPayload(); as payload) {
        <app-summary-modal
          [payload]="payload"
          [contact]="settingsService.contact()"
          (modalClosed)="closeSummaryModal()" />
      }
    </section>
  `
})
export class BookingComponent {
  private bookingState = inject(BookingStateService);
  settingsService = inject(SettingsService);

  todayDate = new Date().toISOString().split('T')[0];

  allServices = ALL_NUMEROLOGY_SERVICES;
  selectedServices = signal<string[]>(['Personal Numerology']);
  isDropdownOpen = signal<boolean>(false);
  searchFilter = signal<string>('');
  servicesError = signal<boolean>(false);
  formattedDobPreview = signal<string>('');

  activeSummaryPayload = signal<AppointmentPayload | null>(null);

  bookingForm = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    mobileNumber: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[0-9+ -]{8,15}$/)]
    }),
    whatsappNumber: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
    dateOfBirth: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    preferredDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    preferredTime: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    consultationMode: new FormControl<'Online' | 'Phone' | 'In Person'>('Online', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    additionalMessage: new FormControl('', { nonNullable: true }),
    privacyConsent: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue]
    })
  });

  filteredServicesList = computed(() => {
    const q = this.searchFilter().toLowerCase().trim();
    if (!q) return this.allServices;
    return this.allServices.filter(s => s.name.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q));
  });

  constructor() {
    // Listen for preselected service from service cards
    effect(() => {
      const incoming = this.bookingState.preselectedService();
      if (incoming) {
        this.addServiceIfMissing(incoming);
        this.servicesError.set(false);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const ctrl = this.bookingForm.get(fieldName);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  isDobInvalid(): boolean {
    const ctrl = this.bookingForm.get('dateOfBirth');
    if (!ctrl) return false;
    const isTouched = ctrl.dirty || ctrl.touched;
    if (isTouched && (!ctrl.value || ctrl.invalid)) return true;
    return false;
  }

  updateDobPreview(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.formattedDobPreview.set(formatToDDMMYYYY(target.value));
    } else {
      this.formattedDobPreview.set('');
    }
  }

  syncWhatsappWithMobile() {
    const mob = this.bookingForm.get('mobileNumber')?.value;
    if (mob) {
      this.bookingForm.patchValue({ whatsappNumber: mob });
    }
  }

  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }

  onServiceFilterInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchFilter.set(target ? target.value : '');
  }

  isServiceSelected(name: string): boolean {
    return this.selectedServices().includes(name);
  }

  toggleService(name: string) {
    const current = this.selectedServices();
    if (current.includes(name)) {
      this.selectedServices.set(current.filter(item => item !== name));
    } else {
      this.selectedServices.set([...current, name]);
    }
    this.validateServicesSelection();
  }

  addServiceIfMissing(name: string) {
    const current = this.selectedServices();
    if (!current.includes(name)) {
      this.selectedServices.set([...current, name]);
    }
  }

  removeService(name: string) {
    this.selectedServices.set(this.selectedServices().filter(item => item !== name));
    this.validateServicesSelection();
  }

  selectAllServices() {
    this.selectedServices.set(this.allServices.map(s => s.name));
    this.servicesError.set(false);
  }

  clearAllServices() {
    this.selectedServices.set([]);
    this.servicesError.set(true);
  }

  validateServicesSelection(): boolean {
    const valid = this.selectedServices().length > 0;
    this.servicesError.set(!valid);
    return valid;
  }

  onSubmit() {
    this.bookingForm.markAllAsTouched();
    const isServicesValid = this.validateServicesSelection();

    // Specific Date of Birth Check
    const dobValue = this.bookingForm.get('dateOfBirth')?.value;
    if (!dobValue) {
      const dobElement = document.getElementById('dateOfBirth');
      if (dobElement) {
        dobElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        dobElement.focus();
      }
      return;
    }

    if (this.bookingForm.invalid || !isServicesValid) {
      return;
    }

    const formVal = this.bookingForm.getRawValue();
    const formattedDob = formatToDDMMYYYY(formVal.dateOfBirth);

    const payload: AppointmentPayload = {
      fullName: formVal.fullName,
      mobileNumber: formVal.mobileNumber,
      whatsappNumber: formVal.whatsappNumber || formVal.mobileNumber,
      email: formVal.email,
      dateOfBirth: formVal.dateOfBirth,
      dateOfBirthFormatted: formattedDob,
      city: formVal.city,
      selectedServices: this.selectedServices(),
      preferredDate: formVal.preferredDate,
      preferredTime: formVal.preferredTime,
      consultationMode: formVal.consultationMode,
      additionalMessage: formVal.additionalMessage,
      privacyConsent: formVal.privacyConsent
    };

    this.activeSummaryPayload.set(payload);
  }

  closeSummaryModal() {
    this.activeSummaryPayload.set(null);
  }
}
