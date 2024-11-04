export interface ProductOrCoupon {
  id: string;
  order: number;
  type: string;
  name: string;
  recommendedPeople: number;
}

export interface EventFormData {
  title: string;
  description: string;
  backgroundImage: File | null;
  productsOrCoupons: ProductOrCoupon[];
  eventPeriod: {
    start: string;
    end: string;
  };
  participationCode: string;
}
