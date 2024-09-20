export interface Rental {
    _id: string;
    bikeId: string;
    userId: string;
    startTime: string; 
    advancePayment: number;
    status: 'Booked' | 'Cancelled' | 'Completed'; 
}
