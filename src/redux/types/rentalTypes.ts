export interface Rental {
  _id: string;
  bikeId: string;
  name: string;
  startTime: string;
  returnTime?: string;
  totalCost?: number;
  advancePayment: number;
  status: string; 
}

export interface RentalState {
  rentals: Rental[];
  unpaid: Rental[];
  paid: Rental[];
  loading: boolean;
  error: null | string;
}

// Action Types
export const RENTAL_REQUEST = 'RENTAL_REQUEST';
export const RENTAL_SUCCESS = 'RENTAL_SUCCESS';
export const RENTAL_FAIL = 'RENTAL_FAIL';

export const RETURN_BIKE_REQUEST = 'RETURN_BIKE_REQUEST';
export const RETURN_BIKE_SUCCESS = 'RETURN_BIKE_SUCCESS';
export const RETURN_BIKE_FAIL = 'RETURN_BIKE_FAIL';

export const PAY_RENTAL_SUCCESS = 'PAY_RENTAL_SUCCESS';
export const PAY_RENTAL_FAIL = 'PAY_RENTAL_FAIL';

export const FETCH_RENTALS_SUCCESS = 'FETCH_RENTALS_SUCCESS';
export const FETCH_RENTALS_FAIL = 'FETCH_RENTALS_FAIL';

export const FETCH_ALL_RENTALS_SUCCESS = 'FETCH_ALL_RENTALS_SUCCESS';
export const FETCH_ALL_RENTALS_FAIL = 'FETCH_ALL_RENTALS_FAIL';

// Action Interfaces
interface RentalRequestAction {
  type: typeof RENTAL_REQUEST;
}

interface RentalSuccessAction {
  type: typeof RENTAL_SUCCESS;
  payload: Rental[];
}

interface RentalFailAction {
  type: typeof RENTAL_FAIL;
  payload: string;
}

interface ReturnBikeRequestAction {
  type: typeof RETURN_BIKE_REQUEST;
}

interface ReturnBikeSuccessAction {
  type: typeof RETURN_BIKE_SUCCESS;
  payload: Rental;
}

interface ReturnBikeFailAction {
  type: typeof RETURN_BIKE_FAIL;
  payload: string;
}

interface PayRentalSuccessAction {
  type: typeof PAY_RENTAL_SUCCESS;
  payload: any;
}

interface PayRentalFailAction {
  type: typeof PAY_RENTAL_FAIL;
  payload: string;
}

interface FetchRentalsSuccessAction {
  type: typeof FETCH_RENTALS_SUCCESS;
  payload: Rental[];
}

interface FetchRentalsFailAction {
  type: typeof FETCH_RENTALS_FAIL;
  payload: string;
}

interface FetchAllRentalsSuccessAction {
  type: typeof FETCH_ALL_RENTALS_SUCCESS;
  payload: Rental[];
}

interface FetchAllRentalsFailAction {
  type: typeof FETCH_ALL_RENTALS_FAIL;
  payload: string;
}

export type RentalActionTypes =
  | RentalRequestAction
  | RentalSuccessAction
  | RentalFailAction
  | ReturnBikeRequestAction
  | ReturnBikeSuccessAction
  | ReturnBikeFailAction
  | PayRentalSuccessAction
  | PayRentalFailAction
  | FetchRentalsSuccessAction
  | FetchRentalsFailAction
  | FetchAllRentalsSuccessAction
  | FetchAllRentalsFailAction;











