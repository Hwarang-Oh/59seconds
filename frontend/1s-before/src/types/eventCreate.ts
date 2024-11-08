export interface ProductOrCoupon {
  id: string;
  order: number;
  type: string;
  name: string;
  recommendedPeople: number;
}

export interface EventFormData {
  eventInfo: {
    title: string;
    description: string;
    bannerImage: File | Blob | null;
    rectImage: File | Blob | null;
  };
  productsOrCoupons: ProductOrCoupon[];
  eventPeriod: {
    start: string;
    end: string;
  };
  participationCode: string;
}
