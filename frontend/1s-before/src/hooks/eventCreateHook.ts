import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { ProductOrCoupon } from '@/types/eventCreate';
import { useEventCreateStore } from '@/store/eventCreateStore';

export function useEventCreate() {
  const { member } = useMemberStore();
  const { formData, setFormData } = useEventCreateStore();
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
  const [bannerImageUrl, setBannerImageUrl] = useState<string | undefined>(
    undefined
  );
  const [rectImageUrl, setRectImageUrl] = useState<string | undefined>(
    undefined
  );
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // IMP: 제목 및 내용 생성 함수
  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      eventInfo: {
        ...formData.eventInfo,
        [name]: value,
      },
    });
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

  // IMP: 시작 날짜를 넣어서 끝날짜 자동으로 그 이후로 설정되도록 만드는 함수
  const handleStartDateChange = (date: Date | null) => {
    handleDateChange('start', date);
    if (
      date &&
      (!formData.eventPeriod.end || new Date(formData.eventPeriod.end) < date)
    ) {
      handleDateChange('end', date); // 종료 날짜가 시작 날짜보다 이전인 경우 자동 설정
    }
  };

  // IMP: 파일 변경 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이전 URL을 해제하여 메모리 누수 방지
      if (bannerImageUrl) URL.revokeObjectURL(bannerImageUrl);
      if (rectImageUrl) URL.revokeObjectURL(rectImageUrl);

      // 새로운 URL을 생성하고 상태에 저장
      const newBannerUrl = URL.createObjectURL(file);
      const newRectUrl = URL.createObjectURL(file);

      setBannerImageUrl(newBannerUrl);
      setRectImageUrl(newRectUrl);

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

  // IMP: 컴포넌트가 언마운트될 때 URL 해제
  useEffect(() => {
    return () => {
      if (bannerImageUrl) URL.revokeObjectURL(bannerImageUrl);
      if (rectImageUrl) URL.revokeObjectURL(rectImageUrl);
    };
  }, [bannerImageUrl, rectImageUrl]);

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
          recommendedPeople: 1,
        },
      ],
    }));
  };

  const handleRemoveProductOrCoupon = (id: string) => {
    setFormData((prevFormData) => {
      if (prevFormData.productsOrCoupons.length > 1) {
        return {
          ...prevFormData,
          productsOrCoupons: prevFormData.productsOrCoupons.filter(
            (item) => item.id !== id
          ),
        };
      }
      return prevFormData;
    });
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
        } else {
          resolve(null);
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
        setFormData((prev) => ({
          ...prev,
          eventInfo: {
            ...prev.eventInfo,
            bannerImage: bannerBlob,
            rectImage: rectangleBlob,
          },
        }));

        // IMP: 새로 생성된 Blob URL을 bannerImageUrl과 rectImageUrl로 업데이트
        const newBannerImageUrl = URL.createObjectURL(bannerBlob);
        const newRectImageUrl = URL.createObjectURL(rectangleBlob);
        setBannerImageUrl(newBannerImageUrl);
        setRectImageUrl(newRectImageUrl);

        setModalMessage('이미지가 성공적으로 잘렸습니다!');
        setIsModalOpen(true);
      }
    } finally {
      URL.revokeObjectURL(fileURL);
    }
  };

  const eventDetailValidCheck = async (event: {
    preventDefault: () => void;
  }): Promise<boolean> => {
    event.preventDefault();

    if (!formData.eventInfo.title) {
      setModalMessage('제목을 입력해주세요.');
      setIsModalOpen(true);
      return false;
    }

    if (!formData.eventInfo.description) {
      setModalMessage('내용을 입력해주세요.');
      setIsModalOpen(true);
      return false;
    }

    if (!formData.eventInfo.bannerImage || !formData.eventInfo.rectImage) {
      setModalMessage('이미지를 자르고 다시 시도해 주세요.');
      setIsModalOpen(true);
      return false;
    }

    if (!formData.eventPeriod.start || !formData.eventPeriod.end) {
      setModalMessage('이벤트 기간을 설정해주세요.');
      setIsModalOpen(true);
      return false;
    }

    if (formData.productsOrCoupons.length === 0) {
      setModalMessage('상품 또는 쿠폰을 추가해주세요.');
      setIsModalOpen(true);
      return false;
    }

    if (!formData.participationCode) {
      setModalMessage('참여 코드를 입력해주세요.');
      setIsModalOpen(true);
      return false;
    }

    return true;
  };

  return {
    formData,
    bannerCrop,
    bannerZoom,
    isModalOpen,
    rectImageUrl,
    modalMessage,
    rectangleCrop,
    rectangleZoom,
    bannerImageUrl,
    handleCrop,
    setIsModalOpen,
    setModalMessage,
    handleDateChange,
    handleFileChange,
    handleInputChange,
    eventDetailValidCheck,
    handleStartDateChange,
    handleBannerCropChange,
    handleBannerZoomChange,
    handleDescriptionChange,
    handleAddProductOrCoupon,
    handleBannerCropComplete,
    handleRectangleCropChange,
    handleRectangleZoomChange,
    handleRectangleCropComplete,
    handleRemoveProductOrCoupon,
    handleProductOrCouponChange,
    handleParticipationCodeChange,
  };
}
