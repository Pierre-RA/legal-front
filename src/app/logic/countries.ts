export interface Country {
  name: string;
  code: string;
  flag: string;
}

export const countries: Array<Country> = [{
  name: 'Suisse',
  code: 'CH',
  flag: 'flag-icon-ch flag-icon-squared'
}, {
  name: 'France',
  code: 'FR',
  flag: 'flag-icon-fr'
}, {
  name: 'Allemagne',
  code: 'DE',
  flag: 'flag-icon-de'
}, {
  name: 'Royaume-Uni',
  code: 'GB',
  flag: 'flag-icon-gb'
}];
