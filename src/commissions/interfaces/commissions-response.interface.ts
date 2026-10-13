import type { SellerCommission } from './seller-commission.interface.js';

export interface CommissionsResponse {
  startDate: string;
  endDate: string;
  results: SellerCommission[];
}
