import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ProductOrCoupon {
  id: string;
  order: number;
  type: string;
  name: string;
  recommendedPeople: string;
}

interface EventFormData {
  title: string;
  description: string;
  backgroundImage: File | null;
  productsOrCoupons: ProductOrCoupon[];
  startDate: string;
  endDate: string;
  participationCode: string;
}

export default function EventDetailCreate() {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    backgroundImage: null,
    productsOrCoupons: [
      { id: uuidv4(), order: 1, type: '상품', name: '', recommendedPeople: '' },
    ],
    startDate: '',
    endDate: '',
    participationCode: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, backgroundImage: file }));
    }
  };

  const handleAddProductOrCoupon = () => {
    setFormData((prev) => ({
      ...prev,
      productsOrCoupons: [
        ...prev.productsOrCoupons,
        {
          id: uuidv4(),
          order: prev.productsOrCoupons.length + 1,
          type: '상품',
          name: '',
          recommendedPeople: '',
        },
      ],
    }));
  };

  const handleProductOrCouponChange = <T extends keyof ProductOrCoupon>(
    index: number,
    key: T,
    value: ProductOrCoupon[T]
  ) => {
    const updatedProductsOrCoupons = [...formData.productsOrCoupons];
    updatedProductsOrCoupons[index] = {
      ...updatedProductsOrCoupons[index],
      [key]: value,
    };
    setFormData((prev) => ({
      ...prev,
      productsOrCoupons: updatedProductsOrCoupons,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', JSON.stringify(formData, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-screen-xl mx-auto space-y-4"
    >
      <h1 className="text-2xl font-bold">이벤트 정보</h1>

      <div className="space-y-2">
        <label
          htmlFor="backgroundImage"
          className="block text-sm font-medium text-gray-700"
        >
          배경 이미지 업로드
        </label>
        <input
          type="file"
          id="backgroundImage"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          이벤트 제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="이벤트의 제목을 입력해주세요"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          이벤트 설명
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="이벤트에 대한 상세 설명을 입력해주세요"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">상품 / 쿠폰</h2>
        {formData.productsOrCoupons.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <select
              value={item.type}
              onChange={(e) =>
                handleProductOrCouponChange(index, 'type', e.target.value)
              }
              className="p-2 border rounded w-20"
            >
              <option value="상품">상품</option>
              <option value="쿠폰">쿠폰</option>
            </select>
            <input
              type="text"
              value={item.name}
              onChange={(e) =>
                handleProductOrCouponChange(index, 'name', e.target.value)
              }
              placeholder={
                item.type === '상품'
                  ? '상품명을 입력하세요'
                  : '쿠폰명을 입력하세요'
              }
              className="p-2 border rounded flex-1"
            />
            <input
              type="text"
              value={item.recommendedPeople}
              onChange={(e) =>
                handleProductOrCouponChange(
                  index,
                  'recommendedPeople',
                  e.target.value
                )
              }
              placeholder="인원수 선택"
              className="p-2 border rounded w-24"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddProductOrCoupon}
          className="text-blue-500 mt-2"
        >
          + 추가
        </button>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          이벤트 기간
        </label>
        <div className="flex space-x-2">
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="p-2 border rounded flex-1"
          />
          <span>~</span>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="p-2 border rounded flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="participationCode"
          className="block text-sm font-medium text-gray-700"
        >
          참여 코드
        </label>
        <input
          type="text"
          id="participationCode"
          name="participationCode"
          value={formData.participationCode}
          onChange={handleInputChange}
          placeholder="이벤트 참여 코드를 입력해주세요"
          className="w-full p-2 border rounded"
        />
      </div>
    </form>
  );
}
