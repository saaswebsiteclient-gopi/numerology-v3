import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SettingsService } from '../../services/settings.service';
import { EditContactModal } from '../edit-contact-modal/edit-contact-modal';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, EditContactModal],
  template: `
    <section id="contact" class="py-20 sm:py-28 bg-white border-t border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-14">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-3 tracking-wide uppercase">
            <mat-icon class="text-xs text-amber-700">support_agent</mat-icon>
            <span>Connect Directly</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-heading font-extrabold text-stone-900 tracking-tight mb-4">
            Contact Us
          </h2>
          <p class="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            Have questions about your chart or want to inquire before booking? Reach out to Gyan Jyothi School of Occult Science directly.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <!-- Left Info Cards -->
          <div class="lg:col-span-7 space-y-4">

            <!-- Card 1: Phone -->
            <div class="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <mat-icon>call</mat-icon>
                </div>
                <div>
                  <span class="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Contact Phone Number</span>
                  <span class="text-lg font-bold text-stone-900">{{ contact().phone }}</span>
                  <span class="text-[11px] text-stone-500 block">Direct consultation desk</span>
                </div>
              </div>
              <a
                [href]="'tel:' + contact().phone"
                class="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <mat-icon class="text-sm">call</mat-icon>
                <span>Call Now</span>
              </a>
            </div>

            <!-- Card 2: WhatsApp -->
            <div class="bg-emerald-50/60 rounded-2xl p-6 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <mat-icon>chat</mat-icon>
                </div>
                <div>
                  <span class="text-xs font-semibold uppercase tracking-wider text-emerald-800 block">Official WhatsApp Number</span>
                  <span class="text-lg font-bold text-stone-900">+{{ contact().whatsapp }}</span>
                  <span class="text-[11px] text-emerald-700 block">Instant enquiry routing</span>
                </div>
              </div>
              <a
                [href]="whatsappDirectUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs">
                <mat-icon class="text-sm">chat</mat-icon>
                <span>WhatsApp Us</span>
              </a>
            </div>

            <!-- Card 3: Email -->
            <div class="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <mat-icon>mail</mat-icon>
                </div>
                <div>
                  <span class="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Email Address</span>
                  <span class="text-sm sm:text-base font-bold text-stone-900 break-all">{{ contact().email }}</span>
                  <span class="text-[11px] text-stone-500 block">Formal queries & institutional correspondence</span>
                </div>
              </div>
              <a
                [href]="'mailto:' + contact().email"
                class="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-stone-300">
                <mat-icon class="text-sm">send</mat-icon>
                <span>Send Email</span>
              </a>
            </div>

            <!-- Card 4: Location -->
            <div class="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                <mat-icon>location_on</mat-icon>
              </div>
              <div>
                <span class="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Institute Location</span>
                <span class="text-base font-bold text-stone-900 block mt-0.5">
                  Chelur Taluk, Chikkaballapur District, Karnataka, India
                </span>
                <p class="text-xs text-stone-600 mt-1 leading-relaxed">
                  In-person sessions by advance appointment only. Accessible from Chikkaballapur, Kolar, and Bengaluru.
                </p>
              </div>
            </div>

            <!-- Card 5: JioFinance UPI Payment (From Verified Email / Image) -->
            <div class="bg-gradient-to-r from-amber-50 to-orange-50/40 rounded-2xl p-6 border-2 border-amber-300/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white p-1 border border-amber-200 flex items-center justify-center shadow-xs shrink-0">
                  <img
                    [src]="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + upiPaymentUrlEncoded()"
                    alt="JioFinance UPI QR Code - Gopinatha D S"
                    class="w-full h-full object-contain rounded-xl"
                    referrerpolicy="no-referrer" />
                </div>
                <div>
                  <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/70 text-amber-950 uppercase tracking-wide mb-1">
                    <span>JioFinance &bull; UPI Direct</span>
                  </div>
                  <h4 class="text-base font-bold text-stone-900">Scan QR to pay: {{ contact().founder }}</h4>
                  <p class="text-xs font-mono font-semibold text-amber-900 mt-0.5">
                    UPI ID: <span class="bg-amber-100 px-1.5 py-0.5 rounded">{{ contact().upiId || '7204945789@jio' }}</span>
                  </p>
                  <p class="text-[11px] text-stone-600 mt-1">
                    Accepted on GPay, PhonePe, Paytm, BHIM, and JioFinance
                  </p>
                </div>
              </div>

              <div class="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  (click)="copyUpiId()"
                  class="flex-1 sm:flex-initial px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                  <mat-icon class="text-xs">content_copy</mat-icon>
                  <span>{{ upiCopied() ? 'UPI ID Copied!' : 'Copy UPI ID' }}</span>
                </button>
                <a
                  [href]="'upi://pay?pa=' + (contact().upiId || '7204945789@jio') + '&pn=' + encodeURIComponent(contact().founder) + '&cu=INR'"
                  class="flex-1 sm:flex-initial px-4 py-2 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                  <mat-icon class="text-xs">account_balance</mat-icon>
                  <span>Pay via UPI App</span>
                </a>
              </div>
            </div>

          </div>

          <!-- Right Admin & Consultation Hours Panel -->
          <div class="lg:col-span-5 bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
                <div>
                  <span class="text-[11px] text-amber-400 font-semibold uppercase tracking-wider block">Institute Timings</span>
                  <h3 class="text-xl font-heading font-bold text-white">Consultation Hours</h3>
                </div>
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <mat-icon>access_time</mat-icon>
                </div>
              </div>

              <div class="space-y-3.5 text-xs">
                <div class="flex justify-between items-center py-2 border-b border-stone-800/60">
                  <span class="text-stone-400">Monday &ndash; Friday</span>
                  <span class="font-medium text-stone-200">10:00 AM &ndash; 07:00 PM</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-stone-800/60">
                  <span class="text-stone-400">Saturday</span>
                  <span class="font-medium text-stone-200">10:00 AM &ndash; 05:00 PM</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-stone-800/60">
                  <span class="text-stone-400">Sunday</span>
                  <span class="font-medium text-amber-300">Prior Bookings Only</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-stone-400">Consultant In Charge</span>
                  <span class="font-bold text-amber-300">Gopinath D S</span>
                </div>
              </div>

              <!-- Important Note -->
              <div class="p-4 bg-stone-950/80 rounded-2xl border border-stone-800 mt-6 text-xs text-stone-300 leading-relaxed">
                <p class="font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
                  <mat-icon class="text-xs">info</mat-icon>
                  <span>Manual Appointment Confirmation</span>
                </p>
                <p>
                  To maintain the highest individual focus, all consultation slots must be mutually confirmed by Gopinath D S following receipt of your appointment form and Date of Birth details.
                </p>
              </div>
            </div>

            <!-- Editable Settings Button -->
            <div class="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between gap-3">
              <span class="text-[11px] text-stone-500">Need to update contact details?</span>
              <button
                type="button"
                (click)="isEditModalOpen.set(true)"
                class="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700">
                <mat-icon class="text-xs">edit</mat-icon>
                <span>Edit Contact Info</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Edit Contact Info Modal -->
      @if (isEditModalOpen()) {
        <app-edit-contact-modal (modalClosed)="isEditModalOpen.set(false)" />
      }
    </section>
  `
})
export class ContactComponent {
  private settingsService = inject(SettingsService);
  contact = this.settingsService.contact;

  isEditModalOpen = signal<boolean>(false);
  upiCopied = signal<boolean>(false);

  encodeURIComponent(str: string): string {
    return encodeURIComponent(str || '');
  }

  upiPaymentUrlEncoded(): string {
    const upi = this.contact().upiId || '7204945789@jio';
    const name = this.contact().founder || 'Gopinatha D S';
    const raw = `upi://pay?pa=${upi}&pn=${encodeURIComponent(name)}&cu=INR`;
    return encodeURIComponent(raw);
  }

  copyUpiId() {
    const upi = this.contact().upiId || '7204945789@jio';
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(upi);
      this.upiCopied.set(true);
      setTimeout(() => this.upiCopied.set(false), 3000);
    }
  }

  whatsappDirectUrl(): string {
    const rawNum = this.contact().whatsapp || '917204945789';
    const clean = rawNum.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent('Hello Gyan Jyothi School of Occult Science, I would like to inquire about a numerology consultation.');
    return `https://wa.me/${clean}?text=${msg}`;
  }
}
