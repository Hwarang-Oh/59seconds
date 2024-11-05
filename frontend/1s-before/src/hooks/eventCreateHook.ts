import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EventFormData, ProductOrCoupon } from '../types/eventCreate';

export function useEventCreate() {
  const [formData, setFormData] = useState<EventFormData>({
    eventInfo: {
      title: '',
      description: '',
      bannerImage: null,
      rectImage: null,
    },
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

  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      eventInfo: {
        ...prevData.eventInfo,
        [name]: value,
      },
    }));
  };

  const handleParticipationCodeChange = (e: { target: { value: any } }) => {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      participationCode: value,
    }));
  };

  const handleDateChange = (field: any, date: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      eventPeriod: {
        ...prevFormData.eventPeriod,
        [field]: date,
      },
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        eventInfo: {
          ...prev.eventInfo,
          bannerImage: file,
          rectImage: file,
        },
      }));
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

  const handleRemoveProductOrCoupon = (id) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      productsOrCoupons: prevFormData.productsOrCoupons.filter(
        (item) => item.id !== id
      ),
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
  ): Promise<Blob | null> => {
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

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

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
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          // Blob을 File 객체로 변환
          const file = new File([blob], 'cropped-image.jpg', {
            type: 'image/jpeg',
          });
          resolve(file);
        }
      }, 'image/jpeg');
    });
  };

  const handleCrop = async () => {
    const { bannerImage } = formData.eventInfo;

    if (!bannerImage) {
      console.error('이미지를 업로드하세요.');
      return;
    }

    const fileURL = URL.createObjectURL(bannerImage);

    try {
      if (croppedBannerPixels) {
        const bannerBlob = await getCroppedImg(
          fileURL,
          croppedBannerPixels,
          1920,
          460
        );
        setCroppedBanner(bannerBlob); // Cropped 배너 이미지 저장

        // formData에 반영
        setFormData((prev) => ({
          ...prev,
          eventInfo: {
            ...prev.eventInfo,
            bannerImage: bannerBlob,
          },
        }));
      }

      if (croppedRectanglePixels) {
        const rectangleBlob = await getCroppedImg(
          fileURL,
          croppedRectanglePixels,
          240,
          320
        );
        setCroppedRectangle(rectangleBlob); // Cropped 직사각형 이미지 저장

        // formData에 반영
        setFormData((prev) => ({
          ...prev,
          eventInfo: {
            ...prev.eventInfo,
            rectImage: rectangleBlob,
          },
        }));
      }
    } finally {
      URL.revokeObjectURL(fileURL);
      window.alert('자르기 성공!');
    }
  };

  return {
    formData,
    handleInputChange,
    handleParticipationCodeChange,
    handleDateChange,
    handleFileChange,
    handleAddProductOrCoupon,
    handleRemoveProductOrCoupon,
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
