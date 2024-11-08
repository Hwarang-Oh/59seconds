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
export interface EventOwnerData {
  participateName: string | null;
  creatorName: string;
  address: string | null;
  phone: string | null;
  profileImage: File | null;
  creatorIntroduce: string;
  snsLink: string;
}
