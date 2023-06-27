export interface Satellite {
  id: string;
  name: string;
  owner: string;
  longitude: string;
  latitude: string;
}

export const defaultSatellite = {
  name: '',
  owner: '',
  longitude: '',
  latitude: '',
} as Satellite;
