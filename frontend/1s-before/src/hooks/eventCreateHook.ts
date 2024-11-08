import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EventFormData, ProductOrCoupon } from '../types/eventCreate';
import axios from 'axios';
import { createEvent } from '@/apis/eventAPI';

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
  const [bannerZoom, setBannerZoom] = useState(1);
  const [rectangleZoom, setRectangleZoom] = useState(1);
  const [bannerCrop, setBannerCrop] = useState({ x: 0, y: 0 });
  const [rectangleCrop, setRectangleCrop] = useState({ x: 0, y: 0 });
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

  // IMP: 제목 및 내용 생성 함수
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

  // IMP: 내용 생성을 위한 텍스트 에디터로 내용 생성 함수

  const handleDescriptionChange = (content: string) => {
    handleInputChange({
      target: { name: 'description', value: content },
    });
  };

  // IMP: 참여 코드 입력을 위한 함수
  const handleParticipationCodeChange = (e: { target: { value: any } }) => {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      participationCode: value,
    }));
  };

  // IMP: 날짜 변경을 위함 함수
  const handleDateChange = (field: any, date: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      eventPeriod: {
        ...prevFormData.eventPeriod,
        [field]: date,
      },
    }));
  };

  // IMP: 파일 변경 함수
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

  const handleRemoveProductOrCoupon = (id: string) => {
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

  // IMP: 이미지를 두 가지 크기로 자르기 위한 함수
  const getCroppedImg = async (
    imageSrc: string,
    crop: { x: number; y: number; width: number; height: number },
    outputWidth: number,
    outputHeight: number,
    fileName: string
  ): Promise<File | null> => {
    const canvas = document.createElement('canvas');
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => resolve(img);
      img.onerror = (errorEvent) => {
        reject(new Error('Failed to load image'));
      };
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
          // Blob을 File 객체로 변환하면서 고유한 이름을 지정
          const file = new File([blob], `${fileName}.jpg`, {
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
      let bannerBlob: File | null = null;
      let rectangleBlob: File | null = null;

      if (croppedBannerPixels) {
        bannerBlob = await getCroppedImg(
          fileURL,
          croppedBannerPixels,
          1920,
          460,
          'banner-image'
        );
      }

      if (croppedRectanglePixels) {
        rectangleBlob = await getCroppedImg(
          fileURL,
          croppedRectanglePixels,
          240,
          320,
          'rectangle-image'
        );
      }

      if (bannerBlob && rectangleBlob) {
        // 상태 업데이트를 한 번에 처리
        setFormData((prev) => ({
          ...prev,
          eventInfo: {
            ...prev.eventInfo,
            bannerImage: bannerBlob,
            rectImage: rectangleBlob,
          },
        }));

        setCroppedBanner(bannerBlob);
        setCroppedRectangle(rectangleBlob);

        window.alert('자르기 성공!');
      }
    } finally {
      URL.revokeObjectURL(fileURL);
    }
  };

  // IMP: formData를 JSON 형식에 맞게 변환 후 서버로 POST 요청하는 함수
  const handleSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();

      if (!formData.eventInfo.bannerImage || !formData.eventInfo.rectImage) {
          alert('이미지를 자르고 다시 시도해 주세요.');
          return;
      }

      const formDataToSend = new FormData();
      
      const eventData = {
          memberId: 1, // TODO
          eventInfo: {
              title: formData.eventInfo.title,
              description: formData.eventInfo.description,
          },
          productsOrCoupons: formData.productsOrCoupons.map((item, index) => ({
              order: index + 1,
              type: item.type,
              name: item.name,
              recommendedPeople: item.recommendedPeople,
          })),
          eventPeriod: {
              start: new Date(formData.eventPeriod.start).toISOString(),
              end: new Date(formData.eventPeriod.end).toISOString(),
          },
          participationCode: formData.participationCode,
      };

      const eventBlob = new Blob([JSON.stringify(eventData)], {
        type: 'application/json'
      });
      
      formDataToSend.append('data', eventBlob);
      formDataToSend.append('bannerImage', formData.eventInfo.bannerImage);
      formDataToSend.append('rectImage', formData.eventInfo.rectImage);

      try {
        const response = await createEvent(formDataToSend);
        console.log('Created room with ID:', response);
      } catch (error) {
        console.error('Error:', error);
        alert('이벤트 룸 생성에 실패했습니다.');
      }
  };

  return {
    formData,
    handleInputChange,
    handleDescriptionChange,
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
    handleSubmit,
  };
}
