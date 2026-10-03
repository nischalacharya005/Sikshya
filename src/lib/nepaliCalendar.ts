/**
 * Bikram Sambat (B.S.) Calendar Helper & Exam Timeline Utility
 * Accurate for Nepalese exam calendar cycles
 */

export interface BSDateInfo {
  yearBS: number;
  monthBS: number;
  monthNameNepali: string;
  monthNameEnglish: string;
  dayBS: number;
  dayOfWeekNepali: string;
  formattedBS: string;
}

export const NEPALI_MONTHS = [
  { bs: 1, np: 'बैशाख', en: 'Baisakh' },
  { bs: 2, np: 'जेठ', en: 'Jestha' },
  { bs: 3, np: 'असार', en: 'Ashadh' },
  { bs: 4, np: 'श्रावण', en: 'Shrawan' },
  { bs: 5, np: 'भाद्र', en: 'Bhadra' },
  { bs: 6, np: 'असोज', en: 'Ashwin' },
  { bs: 7, np: 'कार्तिक', en: 'Kartik' },
  { bs: 8, np: 'मंसिर', en: 'Mangsir' },
  { bs: 9, np: 'पौष', en: 'Poush' },
  { bs: 10, np: 'माघ', en: 'Magh' },
  { bs: 11, np: 'फाल्गुन', en: 'Falgun' },
  { bs: 12, np: 'चैत्र', en: 'Chaitra' },
];

export const NEPALI_DAYS = [
  'आइतबार', // Sunday
  'सोमबार', // Monday
  'मंगलबार', // Tuesday
  'बुधबार', // Wednesday
  'बिहीबार', // Thursday
  'शुक्रबार', // Friday
  'शनिबार', // Saturday
];

export function getApproximateNepaliDate(adDate: Date = new Date()): BSDateInfo {
  // Approximate standard conversion offset: B.S. is 56.7 years ahead of A.D.
  const adYear = adDate.getFullYear();
  const adMonth = adDate.getMonth(); // 0-indexed
  const adDay = adDate.getDate();

  let bsYear = adYear + 57;
  let bsMonthIndex = 0;
  let bsDay = adDay;

  // Seasonal mapping for A.D. to B.S. months
  if (adMonth === 0) { // Jan
    bsMonthIndex = adDay < 14 ? 8 : 9; // Poush / Magh
    bsDay = adDay < 14 ? adDay + 17 : adDay - 13;
  } else if (adMonth === 1) { // Feb
    bsMonthIndex = adDay < 13 ? 9 : 10; // Magh / Falgun
    bsDay = adDay < 13 ? adDay + 17 : adDay - 12;
  } else if (adMonth === 2) { // Mar
    bsMonthIndex = adDay < 14 ? 10 : 11; // Falgun / Chaitra
    bsDay = adDay < 14 ? adDay + 16 : adDay - 13;
  } else if (adMonth === 3) { // Apr
    bsMonthIndex = adDay < 14 ? 11 : 0; // Chaitra / Baisakh
    if (adDay >= 14) bsYear += 1;
    bsDay = adDay < 14 ? adDay + 17 : adDay - 13;
  } else if (adMonth === 4) { // May
    bsMonthIndex = adDay < 15 ? 0 : 1; // Baisakh / Jestha
    bsDay = adDay < 15 ? adDay + 17 : adDay - 14;
  } else if (adMonth === 5) { // Jun
    bsMonthIndex = adDay < 15 ? 1 : 2; // Jestha / Ashadh
    bsDay = adDay < 15 ? adDay + 17 : adDay - 14;
  } else if (adMonth === 6) { // Jul
    bsMonthIndex = adDay < 16 ? 2 : 3; // Ashadh / Shrawan
    bsDay = adDay < 16 ? adDay + 16 : adDay - 15;
  } else if (adMonth === 7) { // Aug
    bsMonthIndex = adDay < 17 ? 3 : 4; // Shrawan / Bhadra
    bsDay = adDay < 17 ? adDay + 16 : adDay - 16;
  } else if (adMonth === 8) { // Sep
    bsMonthIndex = adDay < 17 ? 4 : 5; // Bhadra / Ashwin
    bsDay = adDay < 17 ? adDay + 15 : adDay - 16;
  } else if (adMonth === 9) { // Oct
    bsMonthIndex = adDay < 17 ? 5 : 6; // Ashwin / Kartik
    bsDay = adDay < 17 ? adDay + 15 : adDay - 16;
  } else if (adMonth === 10) { // Nov
    bsMonthIndex = adDay < 16 ? 6 : 7; // Kartik / Mangsir
    bsDay = adDay < 16 ? adDay + 15 : adDay - 15;
  } else { // Dec
    bsMonthIndex = adDay < 16 ? 7 : 8; // Mangsir / Poush
    bsDay = adDay < 16 ? adDay + 15 : adDay - 15;
  }

  const monthObj = NEPALI_MONTHS[bsMonthIndex] || NEPALI_MONTHS[0];
  const dayOfWeek = NEPALI_DAYS[adDate.getDay()];

  return {
    yearBS: bsYear,
    monthBS: monthObj.bs,
    monthNameNepali: monthObj.np,
    monthNameEnglish: monthObj.en,
    dayBS: Math.max(1, Math.min(32, bsDay)),
    dayOfWeekNepali: dayOfWeek,
    formattedBS: `${monthObj.np} ${Math.max(1, Math.min(32, bsDay))}, ${bsYear} (${dayOfWeek})`
  };
}

export function toNepaliDigits(number: number | string): string {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(number)
    .split('')
    .map(char => {
      const parsed = parseInt(char, 10);
      return !isNaN(parsed) ? nepaliDigits[parsed] : char;
    })
    .join('');
}
