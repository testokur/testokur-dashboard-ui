export const FETCH_CITIES_REQUEST = '@@webapi/FETCH_CITIES_REQUEST';
export const FETCH_CITIES_SUCCESS = '@@webapi/FETCH_CITIES_SUCCESS';

export interface City {
  id: number;
  name: string;
  districts: District[];
}

export interface District {
  id: number;
  name: string;
}

export interface CityState {
  readonly loading: boolean;
  readonly data: City[];
}
