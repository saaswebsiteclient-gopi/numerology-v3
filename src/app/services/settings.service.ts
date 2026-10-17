import { Injectable, signal } from '@angular/core';
import { ContactInfo } from '../models/numerology.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly STORAGE_KEY = 'gyan_jyothi_contact_config_v2';

  private readonly defaultConfig: ContactInfo = {
    institute: 'GYAN JYOTHI SCHOOL OF OCCULT SCIENCE',
    founder: 'Gopinatha D S',
    phone: '+91 72049 45789',
    whatsapp: '917204945789',
    email: 'gyanjyothi.occult@gmail.com',
    location: 'Chelur Taluk, Chikkaballapur District, Karnataka, India',
    upiId: '7204945789@jio'
  };

  contact = signal<ContactInfo>(this.loadInitial());

  private loadInitial(): ContactInfo {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = window.localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
          return { ...this.defaultConfig, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.warn('Could not load stored contact settings', e);
      }
    }
    return this.defaultConfig;
  }

  updateContact(updated: Partial<ContactInfo>) {
    const current = this.contact();
    const cleanWhatsapp = (updated.whatsapp || current.whatsapp).replace(/[^0-9]/g, '');
    const next: ContactInfo = {
      ...current,
      ...updated,
      whatsapp: cleanWhatsapp
    };
    this.contact.set(next);

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Could not save contact settings', e);
      }
    }
  }

  resetToDefault() {
    this.contact.set(this.defaultConfig);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}
