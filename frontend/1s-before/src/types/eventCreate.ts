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
    bannerImage: File | null;
    rectImage: File | null;
  };
  productsOrCoupons: ProductOrCoupon[];
  eventPeriod: {
    start: string;
    end: string;
  };
  participationCode: string;
}

export interface EventStoreState {
  formData: EventFormData;
  setFormData: (
    data: EventFormData | ((prev: EventFormData) => EventFormData)
  ) => void;
}
