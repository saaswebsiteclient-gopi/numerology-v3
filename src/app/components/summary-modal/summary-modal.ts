import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentPayload, ContactInfo } from '../../models/numerology.model';

@Component({
  selector: 'app-summary-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto" role="dialog" aria-modal="true">
      <div class="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 my-8 relative animate-scale-up">
        <!-- Close Button -->
        <button
          type="button"
          (click)="onClose()"
          aria-label="Close summary"
          class="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors">
          <mat-icon>close</mat-icon>
        </button>

        <!-- Header -->
        <div class="flex items-start gap-4 mb-6">
          <div class="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs">
            <mat-icon class="text-3xl">mark_chat_unread</mat-icon>
          </div>
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-1.5">
              <mat-icon class="text-xs">hourglass_top</mat-icon>
              <span>Enquiry Prepared &bull; Awaiting Manual Approval</span>
            </div>
            <h3 class="text-2xl font-heading font-bold text-stone-900">Appointment Enquiry Summary</h3>
            <p class="text-xs text-stone-600 mt-0.5">Gyan Jyothi School of Occult Science &bull; Gopinath D S</p>
          </div>
        </div>

        <!-- Verification Notice -->
        <div class="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl mb-5 flex items-start gap-3 text-xs text-amber-950">
          <mat-icon class="text-amber-700 text-base shrink-0 mt-0.5">info</mat-icon>
          <div>
            <p class="font-semibold">Manual Confirmation Policy</p>
            <p class="text-amber-900/90 leading-relaxed mt-0.5">
              This request is not yet confirmed. Gopinath D S will manually check schedule availability and coordinate directly with you on WhatsApp / Phone before final confirmation.
            </p>
          </div>
        </div>

        <!-- Details Card -->
        <div class="bg-stone-50 rounded-2xl border border-stone-200/70 p-4 sm:p-5 space-y-3.5 text-xs text-stone-700 mb-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-3.5 border-b border-stone-200/60">
            <div>
              <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">Full Name</span>
              <span class="text-sm font-bold text-stone-900">{{ payload().fullName }}</span>
            </div>
            <div>
              <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">Date of Birth (Compulsory)</span>
              <span class="text-sm font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md inline-block">
                {{ payload().dateOfBirthFormatted }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-3.5 border-b border-stone-200/60">
            <div>
              <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">Mobile Number</span>
              <span class="font-medium text-stone-900">{{ payload().mobileNumber }}</span>
            </div>
            <div>
              <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">WhatsApp Number</span>
              <span class="font-medium text-stone-900">{{ payload().whatsappNumber || payload().mobileNumber }}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-3.5 border-b border-stone-200/60">
            <div>
              <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">Email Address</span>
              <span class="font-medium text-stone-900">{{ payload().email || 'Not provided' }}</span>
            </div>
            <div>
              <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">City / Location</span>
              <span class="font-medium text-stone-900">{{ payload().city }}</span>
            </div>
          </div>

          <div class="pb-3.5 border-b border-stone-200/60">
            <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
              Selected Numerology Services ({{ payload().selectedServices.length }})
            </span>
            <div class="flex flex-wrap gap-1.5">
              @for (svc of payload().selectedServices; track svc) {
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-200 text-stone-800 text-[11px] font-medium">
                  <mat-icon class="text-xs text-amber-700">check_circle</mat-icon>
                  {{ svc }}
                </span>
              }
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">Preferred Date</span>
              <span class="font-semibold text-stone-900">{{ payload().preferredDate }}</span>
            </div>
            <div>
              <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">Preferred Slot</span>
              <span class="font-semibold text-stone-900">{{ payload().preferredTime }}</span>
            </div>
            <div>
              <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">Mode</span>
              <span class="font-semibold text-emerald-800">{{ payload().consultationMode }}</span>
            </div>
          </div>

          @if (payload().additionalMessage) {
            <div class="pt-3 border-t border-stone-200/60">
              <span class="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">Note / Question</span>
              <p class="text-stone-800 italic mt-0.5">{{ payload().additionalMessage }}</p>
            </div>
          }
        </div>

        <!-- WhatsApp Link Preview Box -->
        <div class="p-3 bg-stone-100 rounded-xl mb-6 text-[11px] text-stone-600 font-mono overflow-x-auto whitespace-pre-wrap border border-stone-200">
          {{ formattedWhatsAppMessage() }}
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            (click)="copyMessageToClipboard()"
            class="w-full sm:w-auto px-4 py-3 border border-stone-300 hover:bg-stone-100 text-stone-800 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5">
            <mat-icon class="text-sm">content_copy</mat-icon>
            <span>{{ copied() ? 'Copied to Clipboard!' : 'Copy Message' }}</span>
          </button>

          <a
            [href]="whatsappUrl()"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <mat-icon class="text-lg">chat</mat-icon>
            <span>Open WhatsApp to Send Request</span>
          </a>
        </div>

        <p class="text-center text-[11px] text-stone-400 mt-4 flex items-center justify-center gap-1">
          <mat-icon class="text-xs">lock</mat-icon>
          <span>End-to-end encrypted direct messaging to {{ contact().phone }}</span>
        </p>
      </div>
    </div>
  `
})
export class SummaryModal {
  payload = input.required<AppointmentPayload>();
  contact = input.required<ContactInfo>();
  modalClosed = output<void>();

  copied = signal<boolean>(false);

  formattedWhatsAppMessage(): string {
    const p = this.payload();
    const servicesList = p.selectedServices.map((s, idx) => `  ${idx + 1}. ${s}`).join('\n');

    return `*NUMEROLOGY CONSULTATION ENQUIRY*\n` +
      `Institute: Gyan Jyothi School of Occult Science\n` +
      `Consultant: Gopinath D S\n` +
      `-----------------------------------------\n` +
      `*Client Details:*\n` +
      `• *Full Name:* ${p.fullName}\n` +
      `• *Date of Birth (Compulsory):* ${p.dateOfBirthFormatted}\n` +
      `• *Mobile Number:* ${p.mobileNumber}\n` +
      (p.whatsappNumber ? `• *WhatsApp Number:* ${p.whatsappNumber}\n` : '') +
      (p.email ? `• *Email:* ${p.email}\n` : '') +
      `• *City / Location:* ${p.city}\n` +
      `-----------------------------------------\n` +
      `*Services Requested (${p.selectedServices.length}):*\n` +
      `${servicesList}\n` +
      `-----------------------------------------\n` +
      `*Appointment Preference:*\n` +
      `• *Preferred Date:* ${p.preferredDate}\n` +
      `• *Preferred Time:* ${p.preferredTime}\n` +
      `• *Consultation Mode:* ${p.consultationMode}\n` +
      (p.additionalMessage ? `• *Note / Query:* ${p.additionalMessage}\n` : '') +
      `-----------------------------------------\n` +
      `_Status: Awaiting manual review & confirmation by Gopinath D S._`;
  }

  whatsappUrl(): string {
    const rawNum = this.contact().whatsapp || '917204945789';
    const cleanNum = rawNum.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(this.formattedWhatsAppMessage());
    return `https://wa.me/${cleanNum}?text=${message}`;
  }

  copyMessageToClipboard() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.formattedWhatsAppMessage());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 3000);
    }
  }

  onClose() {
    this.modalClosed.emit();
  }
}
