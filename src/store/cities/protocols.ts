export interface CitiesByState {
  [state: string]: string[];
}

export interface State {
  cities: CitiesByState;
}
