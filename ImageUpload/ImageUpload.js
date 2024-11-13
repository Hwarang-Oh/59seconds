const fs = require('fs');
const path = require('path');

const baseFolderPath = path.join(__dirname, 'event-images'); // 기본 폴더 경로 설정
const imageSet1 = ['Banner_Do.jpg', 'Rectangle_Do.jpg'];
const imageSet2 = ['Banner_Yena.jpg', 'Rectangle_Yena.jpg'];
const imageSet3 = ['Banner_Eunbin.jpg', 'Rectangle_Eunbin.jpg'];

function getImageSet(num) {
  if ((num - 1) % 3 === 0) return imageSet1;
  if ((num - 2) % 3 === 0) return imageSet2;
  return imageSet3;
}

async function createFolders() {
  if (!fs.existsSync(baseFolderPath)) {
    fs.mkdirSync(baseFolderPath);
  }

  for (let num = 1; num <= 116; num++) {
    const folderPath = path.join(baseFolderPath, num.toString());

    // 폴더가 존재하지 않으면 생성
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // 각 폴더에 해당하는 이미지 세트 가져오기
    const imageSet = getImageSet(num);

    // 이미지 파일 복사 (예: 이미지 경로에서 복사하여 새 폴더에 생성)
    imageSet.forEach((imageName) => {
      const imagePath = path.join(__dirname, imageName); // 원본 이미지 경로
      const destinationPath = path.join(folderPath, imageName);

      // 이미지가 존재할 경우 복사
      if (fs.existsSync(imagePath)) {
        fs.copyFileSync(imagePath, destinationPath);
        console.log(`Copied ${imageName} to ${folderPath}`);
      } else {
        console.log(`Image ${imageName} does not exist at ${imagePath}`);
      }
    });
  }
}

createFolders()
  .then(() => console.log('All folders and files created successfully!'))
  .catch((error) => console.error('Error creating folders:', error));

/** IMP : SQL 쿼리문
Select * from event_room;
UPDATE dreamsolution.event_room
SET 
    banner_image = CASE
        WHEN (room_id) % 3 = 1 THEN CONCAT('https://k11a404.p.ssafy.io/', room_id, '/Banner_Do.jpg')
        WHEN (room_id) % 3 = 2 THEN CONCAT('https://k11a404.p.ssafy.io/', room_id, '/Banner_Yena.jpg')
        WHEN (room_id) % 3 = 0 THEN CONCAT('https://k11a404.p.ssafy.io/', room_id, '/Banner_Eunbin.jpg')
        ELSE banner_image -- 기존 값 유지
    END,
    rectangle_image = CASE
        WHEN (room_id) % 3 = 1 THEN CONCAT('https://k11a404.p.ssafy.io/', room_id, '/Rectangle_Do.jpg')
        WHEN (room_id) % 3 = 2 THEN CONCAT('https://k11a404.p.ssafy.io/', room_id, '/Rectangle_Yena.jpg')
        WHEN (room_id) % 3 = 0 THEN CONCAT('https://k11a404.p.ssafy.io/', room_id, '/Rectangle_Eunbin.jpg')
        ELSE rectangle_image -- 기존 값 유지
    END
WHERE room_id > 0;

commit;
*/
