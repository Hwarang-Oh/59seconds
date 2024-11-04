import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EventFormData, ProductOrCoupon } from '../types/eventCreate';

export function useEventCreate() {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    backgroundImage: null,
    productsOrCoupons: [
      { id: uuidv4(), order: 1, type: '상품', name: '', recommendedPeople: 0 },
    ],
    eventPeriod: {
      start: '',
      end: '',
    },
    participationCode: '',
  });

  const [bannerCrop, setBannerCrop] = useState({ x: 0, y: 0 });
  const [bannerZoom, setBannerZoom] = useState(1);
  const [rectangleCrop, setRectangleCrop] = useState({ x: 0, y: 0 });
  const [rectangleZoom, setRectangleZoom] = useState(1);
  const [croppedBannerPixels, setCroppedBannerPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [croppedRectanglePixels, setCroppedRectanglePixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [croppedBanner, setCroppedBanner] = useState<Blob | null>(null);
  const [croppedRectangle, setCroppedRectangle] = useState<Blob | null>(null);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          recommendedPeople: 0,
        },
      ],
    }));
  };

  const handleProductOrCouponChange = <T extends keyof ProductOrCoupon>(
    id: string,
    key: T,
    value: ProductOrCoupon[T]
  ) => {
    setFormData((prev) => {
      const updatedProductsOrCoupons = prev.productsOrCoupons.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
      return { ...prev, productsOrCoupons: updatedProductsOrCoupons };
    });
  };

  const handleBannerCropChange = (newCrop: { x: number; y: number }) =>
    setBannerCrop(newCrop);
  const handleBannerZoomChange = (newZoom: number) => setBannerZoom(newZoom);
  const handleRectangleCropChange = (newCrop: { x: number; y: number }) =>
    setRectangleCrop(newCrop);
  const handleRectangleZoomChange = (newZoom: number) =>
    setRectangleZoom(newZoom);

  const handleBannerCropComplete = (
    croppedArea: any,
    croppedAreaPixels: any
  ) => {
    setCroppedBannerPixels(croppedAreaPixels);
  };

  const handleRectangleCropComplete = (
    croppedArea: any,
    croppedAreaPixels: any
  ) => {
    setCroppedRectanglePixels(croppedAreaPixels);
  };
  // 이미지를 두 가지 크기로 자르기 위한 함수
  const getCroppedImg = async (
    imageSrc: string,
    crop: { x: number; y: number; width: number; height: number },
    outputWidth: number,
    outputHeight: number
  ) => {
    const canvas = document.createElement('canvas');
    const image = await new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => resolve(img);
    });

    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get 2D context');
    }

    const scaleX = image.width / image.naturalWidth;
    const scaleY = image.height / image.naturalHeight;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      outputWidth,
      outputHeight
    );

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  const handleCrop = async () => {
    if (!formData.backgroundImage) {
      console.error('이미지를 업로드하세요.');
      return;
    }

    const fileURL = URL.createObjectURL(formData.backgroundImage);

    if (croppedBannerPixels) {
      const bannerBlob = await getCroppedImg(
        fileURL,
        croppedBannerPixels,
        1920,
        460
      );
      setCroppedBanner(bannerBlob);
    }

    if (croppedRectanglePixels) {
      const rectangleBlob = await getCroppedImg(
        fileURL,
        croppedRectanglePixels,
        240,
        320
      );
      setCroppedRectangle(rectangleBlob);
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleFileChange,
    handleAddProductOrCoupon,
    handleProductOrCouponChange,
    bannerCrop,
    bannerZoom,
    rectangleCrop,
    rectangleZoom,
    handleBannerCropChange,
    handleBannerZoomChange,
    handleRectangleCropChange,
    handleRectangleZoomChange,
    handleBannerCropComplete,
    handleRectangleCropComplete,
    croppedBanner,
    croppedRectangle,
    handleCrop,
  };
}
