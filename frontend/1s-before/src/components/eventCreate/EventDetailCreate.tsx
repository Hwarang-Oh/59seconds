import React from 'react';
import { useEventCreate } from '@/hooks/eventCreateHook';
import Cropper from 'react-easy-crop';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import Tiptap from '../common/TextEditor';
export default function EventDetailCreate() {
  const {
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
    handleCrop,
    handleSubmit,
  } = useEventCreate();

  return (
    <form
      className="p-6 max-w-screen-xl mx-auto space-y-4"
      onSubmit={handleSubmit}
    >
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
              결정
            </button>
          </div>
          <div className="flex flex-row gap-4 p-4">
            {formData.eventInfo.bannerImage && (
              <div className="relative w-1/2 h-40 bg-mainColor2 rounded-md overflow-hidden">
                <Cropper
                  image={URL.createObjectURL(formData.eventInfo.bannerImage)}
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
                  image={URL.createObjectURL(formData.eventInfo.rectImage)}
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
        {formData.productsOrCoupons.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
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
                    Math.max(0, Number(e.target.value))
                  )
                }
                className="p-2 border rounded w-16 text-start"
              />
              <button
                type="button"
                onClick={() => handleRemoveProductOrCoupon(item.id)}
                className="text-red-500 pl-2 text-sm"
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
              onChange={(date) => handleDateChange('start', date)}
              showTimeSelect
              dateFormat="Pp"
              className="p-2 border rounded w-full"
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

      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded"
      >
        이벤트 생성하기
      </button>
    </form>
  );
}
