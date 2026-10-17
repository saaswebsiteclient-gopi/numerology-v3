import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-contact-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in" role="dialog" aria-modal="true">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 overflow-hidden relative">
        <!-- Close Button -->
        <button
          type="button"
          (click)="closeModal()"
          aria-label="Close configuration modal"
          class="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors">
          <mat-icon>close</mat-icon>
        </button>

        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <mat-icon>settings</mat-icon>
          </div>
          <div>
            <h3 class="text-xl font-heading font-bold text-stone-900">Configure Contact Info</h3>
            <p class="text-xs text-stone-500">Update phone, WhatsApp, and email for live enquiry routing</p>
          </div>
        </div>

        <form [formGroup]="form" (ngSubmit)="saveContact()" class="space-y-4">
          <div>
            <label for="cfg-phone" class="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Contact Phone Number
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 pointer-events-none">
                <mat-icon class="text-sm">call</mat-icon>
              </span>
              <input
                id="cfg-phone"
                type="text"
                formControlName="phone"
                placeholder="+91 94481 XXXXX"
                class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50" />
            </div>
            @if (form.get('phone')?.touched && form.get('phone')?.invalid) {
              <p class="text-xs text-red-600 mt-1">Phone number is required.</p>
            }
          </div>

          <div>
            <label for="cfg-whatsapp" class="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              WhatsApp Number (with country code, no + or spaces)
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 pointer-events-none">
                <mat-icon class="text-sm">chat</mat-icon>
              </span>
              <input
                id="cfg-whatsapp"
                type="text"
                formControlName="whatsapp"
                placeholder="9194481XXXXX"
                class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50" />
            </div>
            <p class="text-[11px] text-stone-500 mt-1">
              Used when clicking "Open WhatsApp" to redirect appointment bookings.
            </p>
          </div>

          <div>
            <label for="cfg-email" class="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Official Email Address
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 pointer-events-none">
                <mat-icon class="text-sm">email</mat-icon>
              </span>
              <input
                id="cfg-email"
                type="email"
                formControlName="email"
                placeholder="contact@example.com"
                class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50" />
            </div>
          </div>

          <div>
            <label for="cfg-location" class="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Institute Location
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 pointer-events-none">
                <mat-icon class="text-sm">location_on</mat-icon>
              </span>
              <input
                id="cfg-location"
                type="text"
                formControlName="location"
                class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50" />
            </div>
          </div>

          <div>
            <label for="cfg-upi" class="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              JioFinance / UPI Payment ID
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 pointer-events-none">
                <mat-icon class="text-sm">qr_code</mat-icon>
              </span>
              <input
                id="cfg-upi"
                type="text"
                formControlName="upiId"
                placeholder="7204945789@jio"
                class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50" />
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-stone-100 gap-3">
            <button
              type="button"
              (click)="resetDefaults()"
              class="text-xs text-stone-500 hover:text-stone-800 underline">
              Reset to Defaults
            </button>
            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="closeModal()"
                class="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100 font-medium transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="form.invalid"
                class="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5">
                <mat-icon class="text-sm">save</mat-icon>
                Save Details
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
export class EditContactModal {
  private settingsService = inject(SettingsService);
  modalClosed = output<void>();

  contactData = this.settingsService.contact();

  form = new FormGroup({
    phone: new FormControl(this.contactData.phone, { nonNullable: true, validators: [Validators.required] }),
    whatsapp: new FormControl(this.contactData.whatsapp, { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl(this.contactData.email, { nonNullable: true, validators: [Validators.email] }),
    location: new FormControl(this.contactData.location, { nonNullable: true, validators: [Validators.required] }),
    upiId: new FormControl(this.contactData.upiId || '7204945789@jio', { nonNullable: true })
  });

  saveContact() {
    if (this.form.valid) {
      const val = this.form.getRawValue();
      this.settingsService.updateContact(val);
      this.modalClosed.emit();
    }
  }

  resetDefaults() {
    this.settingsService.resetToDefault();
    const defaults = this.settingsService.contact();
    this.form.patchValue({
      phone: defaults.phone,
      whatsapp: defaults.whatsapp,
      email: defaults.email,
      location: defaults.location,
      upiId: defaults.upiId || '7204945789@jio'
    });
  }

  closeModal() {
    this.modalClosed.emit();
  }
}
