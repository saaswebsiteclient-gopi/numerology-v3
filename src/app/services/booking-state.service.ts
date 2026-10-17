import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {
  // Service ID to preselect when user clicks "Book Appointment" on a service card
  preselectedService = signal<string | null>(null);

  selectServiceAndScroll(serviceName: string) {
    this.preselectedService.set(serviceName);
    
    // Smooth scroll to booking section
    if (typeof document !== 'undefined') {
      const target = document.getElementById('appointment-booking');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  clearPreselectedService() {
    this.preselectedService.set(null);
  }
}
