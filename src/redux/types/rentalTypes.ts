export interface Rental {
  _id: string;
  bikeId: string;
  startTime: string;
  returnTime?: string;
  bikeName?: string;
  totalCost?: number;
  isPaid?: boolean;
}

export interface RentalState {
  unpaid: Rental[];
  paid: Rental[];
}

export interface BookBikeSuccessAction {
  type: 'BOOK_BIKE_SUCCESS';
  payload: Rental;
}

export interface FetchRentalsSuccessAction {
  type: 'FETCH_RENTALS_SUCCESS';
  payload: {
    unpaid: Rental[];
    paid: Rental[];
  };
}

export interface PayRentalSuccessAction {
  type: 'PAY_RENTAL_SUCCESS';
  payload: Rental;
}

export interface ReturnBikeSuccessAction {
  type: 'RETURN_BIKE_SUCCESS';
  payload: Rental;
}

export type RentalActionTypes =
  | BookBikeSuccessAction
  | FetchRentalsSuccessAction
  | PayRentalSuccessAction
  | ReturnBikeSuccessAction
  | { type: 'FETCH_RENTALS_FAIL' | 'BOOK_BIKE_FAIL' | 'PAY_RENTAL_FAIL' | 'RETURN_BIKE_FAIL'; payload: string };
