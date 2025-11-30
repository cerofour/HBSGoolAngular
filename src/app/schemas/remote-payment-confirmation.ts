export interface RemotePaymentConfirmation {
  remotePaymentConfirmationId: number;
  paymentId: number;
  cashierId: number;
  date: string;
}

export interface RemotePaymentConfirmationFilters {
  cashierId?: number;
  date?: string;
  startDate?: string;
  endDate?: string;
}