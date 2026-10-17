export interface NumerologyServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  category: 'personal' | 'relationship' | 'career' | 'environment' | 'advanced';
  icon: string;
  keyBenefits: string[];
}

export const ALL_NUMEROLOGY_SERVICES: NumerologyServiceItem[] = [
  {
    id: 'personal-numerology',
    name: 'Personal Numerology',
    shortDesc: 'Complete birth chart analysis, Driver (Moolank) & Conductor (Bhagyank) numbers and life path blueprint.',
    longDesc: 'Deep dive into your core birth vibrations. Understand your inherent strengths, weaknesses, hidden talents, karmic lessons, and ideal life path through ancient Vedic and Western numerological frameworks.',
    category: 'personal',
    icon: 'person',
    keyBenefits: ['Discover core life purpose', 'Understand hidden strengths & tendencies', 'Harmonize favorable vibrations']
  },
  {
    id: 'lo-shu-grid',
    name: 'Lo Shu Grid Analysis',
    shortDesc: 'Ancient 3x3 magical square analysis evaluating mental, emotional, practical, thought, will, and action planes.',
    longDesc: 'The sacred 3x3 Lo Shu Grid maps your birth date into 8 primary planes: Mental, Emotional, Practical, Thought, Will, Action, Golden Success, and Silver Silvering planes. We identify missing numbers and provide practical remedies.',
    category: 'advanced',
    icon: 'grid_on',
    keyBenefits: ['Evaluation of 8 life planes', 'Identification of missing numbers & arrows', 'Simple elemental remedies to restore balance']
  },
  {
    id: 'vedic-numerology',
    name: 'Vedic Numerology',
    shortDesc: 'Ancient Indian numerological system rooted in planetary ruler energies (Navagrahas) and karmic cycles.',
    longDesc: 'Vedic numerology associates numbers 1 through 9 with the Navagraha planetary forces (Sun to Ketu). Learn how planetary transits, friendly and neutral numbers impact your day-to-day decisions and spiritual progress.',
    category: 'personal',
    icon: 'brightness_7',
    keyBenefits: ['Planetary ruler alignment (Navagraha)', 'Karmic cycle periods & Mahadasha', 'Vedic remedial mantras and colors']
  },
  {
    id: 'name-correction',
    name: 'Name Numerology and Name Correction',
    shortDesc: 'Scientific name vibration tuning to align your spelling with your favorable compound numbers.',
    longDesc: 'Your name vibrates each time it is spoken or written. A minor spelling correction can transform a discordant compound number into an auspicious one, boosting recognition, prosperity, and harmony.',
    category: 'personal',
    icon: 'edit_note',
    keyBenefits: ['Chaldean & Pythagorean compound calculation', 'Auspicious spelling optimization', 'Official & social signature alignment']
  },
  {
    id: 'mobile-numerology',
    name: 'Mobile Number Numerology',
    shortDesc: 'Ensure your most frequently used 10-digit digital identity resonates with success and positivity.',
    longDesc: 'In the digital era, your mobile number is invoked hundreds of times a day. We evaluate total compound sums, paired numbers, avoid harmful combinations, and recommend auspicious digit arrangements.',
    category: 'environment',
    icon: 'smartphone',
    keyBenefits: ['Digit pair frequency analysis', 'Total sum compatibility with Date of Birth', 'Business & personal SIM optimization']
  },
  {
    id: 'marriage-compatibility',
    name: 'Marriage Compatibility',
    shortDesc: 'In-depth matching of prospective bride and groom charts for emotional, mental, and long-term marital bliss.',
    longDesc: 'Beyond basic matching, we evaluate mutual Driver and Conductor harmony, destiny number synergy, missing numbers compensation, and remedies to create longevity, trust, and peace in married life.',
    category: 'relationship',
    icon: 'favorite',
    keyBenefits: ['Driver-Conductor synergy audit', 'Emotional & family life compatibility', 'Remedies for discordant number pairs']
  },
  {
    id: 'love-compatibility',
    name: 'Love and Relationship Compatibility',
    shortDesc: 'Explore relationship dynamics, communication styles, emotional triggers, and energetic attraction.',
    longDesc: 'Gain clarity on romantic bonds, dating synergy, and interpersonal understanding. Learn why friction arises between certain number temperaments and how to foster empathy and deep bonding.',
    category: 'relationship',
    icon: 'favorite_border',
    keyBenefits: ['Mutual attraction & communication analysis', 'Resolution of personality clashes', 'Guidance for dating and commitments']
  },
  {
    id: 'career-guidance',
    name: 'Career and Job Guidance',
    shortDesc: 'Discover the most suitable professional fields, promotion cycles, and career transitions suited to your numbers.',
    longDesc: 'Align your vocational trajectory with your natural planetary resonance. Determine whether leadership, technical, creative, civil services, or advisory roles yield highest fulfillment and stability.',
    category: 'career',
    icon: 'work',
    keyBenefits: ['Ideal industry and role recommendations', 'Best timing for job shifts and promotions', 'Overcoming workplace stagnation']
  },
  {
    id: 'business-numerology',
    name: 'Business Name Numerology',
    shortDesc: 'Craft prosperous brand names, partnership ratios, company spellings, and launch alignments.',
    longDesc: 'A business name with a discordant compound number can struggle despite hard work. We formulate auspicious brand names, trademark spellings, and partner number compatibility for sustainable commercial growth.',
    category: 'career',
    icon: 'business_center',
    keyBenefits: ['Brand name compound vibration tuning', 'Partner compatibility assessment', 'Auspicious founding date determination']
  },
  {
    id: 'financial-numerology',
    name: 'Financial Numerology',
    shortDesc: 'Uncover wealth attraction blocks, investment timing, money retention patterns, and auspicious banking numbers.',
    longDesc: 'Examine the 4-5-6 Golden Prosperity line in your Lo Shu chart and your wealth numbers. Identify periods of financial expansion versus conservative phases to preserve and grow assets responsibly.',
    category: 'career',
    icon: 'account_balance_wallet',
    keyBenefits: ['Wealth plane (4-5-6) status in Lo Shu Grid', 'Favorable bank account & PIN number guidance', 'Timing for major investments & financial ventures']
  },
  {
    id: 'child-name-selection',
    name: 'Child Name Selection',
    shortDesc: 'Blessed naming for newborns aligned with birth date, astrological nakshatra, and prosperous compound totals.',
    longDesc: 'Gift your newborn a harmonious start in life. We provide a curated selection of meaningful names whose compound totals harmonize with their Driver and Conductor numbers from day one.',
    category: 'personal',
    icon: 'child_care',
    keyBenefits: ['Custom list of meaningful auspicious names', 'Full harmony with newborn birth vibrations', 'Avoidance of challenging compound numbers']
  },
  {
    id: 'health-numerology',
    name: 'Health Numerology',
    shortDesc: 'Identify physical vulnerability tendencies, stress cycles, and holistic preventive lifestyle recommendations.',
    longDesc: 'Ancient numerology links each planetary number to bodily temperaments (Vata, Pitta, Kapha) and organ systems. Learn preventive routines and wellness habits for stress mitigation and balance.',
    category: 'personal',
    icon: 'spa',
    keyBenefits: ['Planetary bodily constitution analysis', 'Identifying high-stress life cycles', 'Holistic lifestyle & mindful routine guidance']
  },
  {
    id: 'signature-analysis',
    name: 'Signature Analysis',
    shortDesc: 'Scientific graphological and numerological signature design for confidence, authority, and upward growth.',
    longDesc: 'Your signature represents your public subconscious projection. Upward angles, clear letterforms, underline strokes, and dot placements can eliminate self-sabotaging patterns and project confident leadership.',
    category: 'advanced',
    icon: 'draw',
    keyBenefits: ['Audit of current signature tendencies', 'New lucky signature format suggestions', 'Elimination of negative graphological strokes']
  },
  {
    id: 'wristwatch-numerology',
    name: 'Wristwatch Numerology',
    shortDesc: 'Select watch dial shapes, strap materials, metals, and colors that channel focus, promptness, and luck.',
    longDesc: 'A wristwatch worn constantly against your pulse point carries vibrational weight. Learn the right dial geometry (round, square, oval), metals (gold, silver, steel), and colors matching your life goals.',
    category: 'environment',
    icon: 'watch',
    keyBenefits: ['Dial shape & metallic element synergy', 'Strap color aligned with driver number', 'Energetic focus and time discipline enhancement']
  },
  {
    id: 'house-number-numerology',
    name: 'House Number Numerology',
    shortDesc: 'Analyze the energy of your apartment, flat, or villa number and apply simple non-destructive remedies.',
    longDesc: 'The compound total of your house or flat number sets the ambient energy of your dwelling. Discover whether your home nurtures creativity, peace, social activity, or discipline, and how to balance it.',
    category: 'environment',
    icon: 'home',
    keyBenefits: ['Apartment & villa compound analysis', 'Harmony with residents birth numbers', 'Simple entrance remedies to harmonize energy']
  },
  {
    id: 'vehicle-number-numerology',
    name: 'Vehicle Number Numerology',
    shortDesc: 'Choose auspicious vehicle registration numbers for safety, smooth journeys, and pleasant travel.',
    longDesc: 'Ensure your car, bike, or commercial transport registration digits sum up to a friendly number with your birth date, reducing unnecessary breakdowns and fostering peace of mind on the road.',
    category: 'environment',
    icon: 'directions_car',
    keyBenefits: ['Registration number total audit', 'Safe number combinations for travel', 'Color recommendation for vehicle body']
  },
  {
    id: 'lucky-date-selection',
    name: 'Lucky Date Selection (Muhurat)',
    shortDesc: 'Auspicious date selection for agreements, weddings, inaugurations, surgeries, travel, and investments.',
    longDesc: 'Select the optimal date and day where universal cosmic vibration aligns with your individual charts, ensuring smooth execution and high success rates for your milestone events.',
    category: 'advanced',
    icon: 'event_available',
    keyBenefits: ['Personalized calendar date screening', 'Aligning universal day vibrations with birth numbers', 'Smooth beginnings for important endeavors']
  },
  {
    id: 'complete-numerology-consultation',
    name: 'Complete Numerology Consultation',
    shortDesc: 'Comprehensive master session encompassing all dimensions: Birth chart, Lo Shu, Name, Career, and Remedies.',
    longDesc: 'The flagship holistic consultation with founder Gopinath D S. Receive a thorough breakdown of your complete birth chart, Lo Shu grid, name vibration, mobile, signature, yearly transit, and bespoke remedial roadmap.',
    category: 'advanced',
    icon: 'stars',
    keyBenefits: ['All-inclusive master consultation session', 'Comprehensive personalized PDF report summary', 'One-on-one personalized remedial action plan']
  }
];

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  founder: string;
  institute: string;
  upiId?: string;
}

export interface AppointmentPayload {
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  dateOfBirth: string; // YYYY-MM-DD from picker
  dateOfBirthFormatted: string; // DD/MM/YYYY
  city: string;
  selectedServices: string[];
  preferredDate: string;
  preferredTime: string;
  consultationMode: 'Online' | 'Phone' | 'In Person';
  additionalMessage: string;
  privacyConsent: boolean;
}
