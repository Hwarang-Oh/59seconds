import React from 'react';
import Cropper from 'react-easy-crop';
import Tiptap from '../common/TextEditor';
import DatePicker from 'react-datepicker';
import Modal from '@/components/common/alertModal';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { useEventCreate } from '@/hooks/eventCreateHook';
export default function EventDetailCreate() {
  const {
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
    handleDateChange,
    handleFileChange,
    handleInputChange,
    handleStartDateChange,
    handleBannerCropChange,
    handleBannerZoomChange,
    handleDescriptionChange,
    handleAddProductOrCoupon,
    handleBannerCropComplete,
    handleRectangleCropChange,
    handleRectangleZoomChange,
    handleRemoveProductOrCoupon,
    handleProductOrCouponChange,
    handleRectangleCropComplete,
    handleParticipationCodeChange,
  } = useEventCreate();

  const today = new Date();

  return (
    <>
      <div className="flex flex-row space-x-4">
        <span className="bg-mainColor1 px-[14px] py-[5px] rounded-full text-white">
          1
        </span>
        <h1 className="text-2xl font-bold">이벤트 정보</h1>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="backgroundImage"
          className="block text-sm font-medium text-gray-700"
        >
          이미지 업로드
        </label>
        <div className="border rounded p-4 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <input
              type="file"
              name="Image"
              onChange={handleFileChange}
              className="w-full sm:w-auto"
            />
            <button
              type="button"
              onClick={handleCrop}
              className="min-w-[8vh] py-1 px-2 bg-mainColor1 text-white rounded"
            >
              자르기
            </button>
            <Modal
              message={modalMessage}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
          <div className="flex flex-row gap-4 p-4">
            {formData.eventInfo.bannerImage && (
              <div className="relative w-1/2 h-40 bg-mainColor2 rounded-md overflow-hidden">
                <Cropper
                  image={bannerImageUrl}
                  crop={bannerCrop}
                  zoom={bannerZoom}
                  aspect={1920 / 460}
                  onCropChange={handleBannerCropChange}
                  onZoomChange={handleBannerZoomChange}
                  onCropComplete={handleBannerCropComplete}
                />
                <p className="absolute bottom-2 left-2 text-white text-sm">
                  배너 크기
                </p>
              </div>
            )}
            {formData.eventInfo.rectImage && (
              <div className="relative w-1/2 h-40 bg-mainColor2 rounded-md overflow-hidden">
                <Cropper
                  image={rectImageUrl}
                  crop={rectangleCrop}
                  zoom={rectangleZoom}
                  aspect={240 / 320}
                  onCropChange={handleRectangleCropChange}
                  onZoomChange={handleRectangleZoomChange}
                  onCropComplete={handleRectangleCropComplete}
                />
                <p className="absolute bottom-2 left-2 text-white text-sm">
                  카드 크기
                </p>
              </div>
            )}
          </div>
        </div>
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
          value={formData.eventInfo.title}
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
        <div className="w-full p-2 border rounded">
          <Tiptap
            value={formData.eventInfo.description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-row justify-start items-center space-x-2">
          <h2 className="text-lg font-semibold mr-2">상품 / 쿠폰</h2>
          <button
            type="button"
            onClick={handleAddProductOrCoupon}
            className="text-blue-500"
          >
            + 추가
          </button>
        </div>
        {formData.productsOrCoupons.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-2">
            <span className="w-8 text-center text-sm">{index + 1}등</span>
            <select
              value={item.type}
              onChange={(e) =>
                handleProductOrCouponChange(item.id, 'type', e.target.value)
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
                handleProductOrCouponChange(item.id, 'name', e.target.value)
              }
              placeholder={
                item.type === '상품'
                  ? '상품명을 입력하세요'
                  : '쿠폰명을 입력하세요'
              }
              className="p-2 border rounded flex-1"
            />
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={item.recommendedPeople}
                onChange={(e) =>
                  handleProductOrCouponChange(
                    item.id,
                    'recommendedPeople',
                    Math.max(1, Number(e.target.value))
                  )
                }
                className="p-2 border rounded w-16 text-start"
                min="1"
              />
              <button
                type="button"
                onClick={() => handleRemoveProductOrCoupon(item.id)}
                className={`text-red-500 pl-2 text-sm ${
                  index === 0 ? 'invisible' : ''
                }`}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 w-full">
        <label
          htmlFor="eventPeriod"
          className="block text-sm font-medium text-gray-700"
        >
          이벤트 기간
        </label>
        <div className="flex space-x-2 justify-between items-center w-full">
          <div className="w-[46%]">
            <DatePicker
              locale={ko}
              selected={
                formData.eventPeriod.start
                  ? new Date(formData.eventPeriod.start)
                  : null
              }
              placeholderText="시작 날짜를 지정해주세요"
              onChange={handleStartDateChange}
              showTimeSelect
              dateFormat="Pp"
              className="p-2 border rounded w-full"
              minDate={today}
              minTime={new Date(today.setHours(0, 0, 0, 0))}
              maxTime={new Date(today.setHours(23, 59, 59, 999))}
            />
          </div>
          <span>~</span>
          <div className="w-[46%]">
            <DatePicker
              locale={ko}
              selected={
                formData.eventPeriod.end
                  ? new Date(formData.eventPeriod.end)
                  : null
              }
              placeholderText="종료 날짜를 지정해주세요"
              onChange={(date) => handleDateChange('end', date)}
              showTimeSelect
              dateFormat="Pp"
              className="p-2 border rounded w-full"
              minDate={
                formData.eventPeriod.start
                  ? new Date(formData.eventPeriod.start)
                  : today
              }
              minTime={
                formData.eventPeriod.start &&
                formData.eventPeriod.end &&
                new Date(formData.eventPeriod.start).toDateString() ===
                  new Date(formData.eventPeriod.end).toDateString()
                  ? new Date(formData.eventPeriod.start)
                  : new Date(today.setHours(0, 0, 0, 0))
              }
              maxTime={new Date(today.setHours(23, 59, 59, 999))}
            />
          </div>
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
          onChange={handleParticipationCodeChange}
          placeholder="이벤트 참여 코드를 입력해주세요"
          className="w-full p-2 border rounded"
        />
      </div>
    </>
  );
}
