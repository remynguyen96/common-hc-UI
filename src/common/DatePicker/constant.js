const MAPPING_TEXT_DATES = {
  Year: 'Năm',
  Month: 'Tháng',
  Date: 'Ngày',
  Hour: 'Giờ',
  Minute: 'Phút',
  Second: 'Giây',
};

const DATE_HEIGHT = 40;
const DATE_LENGTH = 10;
const MIDDLE_INDEX = Math.floor(DATE_LENGTH / 2);
const MIDDLE_Y = -DATE_HEIGHT * MIDDLE_INDEX;

export {
  MAPPING_TEXT_DATES,
  DATE_HEIGHT,
  DATE_LENGTH,
  MIDDLE_INDEX,
  MIDDLE_Y,
};
