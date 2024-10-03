import { getRandomArrayPart, getRandomPositiveInteger, getUniqueUIntArray } from './utils';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const COMMENTS_MIN_QUANTITY = 0;
const COMMENTS_MAX_QUANTITY = 30;
const PHOTO_DESCRIPTIONS = [
  'Летний день на природе. Зелёная трава, яркое солнце и пение птиц создают атмосферу радости и умиротворения',
  'Утренняя пробежка вдоль реки. Свежий воздух, красивые пейзажи и ощущение свободы вдохновляют на новые достижения',
  'Осенний лес, усыпанный разноцветными листьями. Прогулка по такому лесу напоминает о скоротечности времени и красоте природы',
  'Закат на морском берегу. Оранжевое солнце, опускающееся за горизонт, и волны, разбивающиеся о берег, создают романтическую атмосферу',
  'Рождественская ёлка в доме. Гирлянды, игрушки и свечи создают праздничное настроение и ощущение волшебства',
  'Весенний пикник в парке. Тёплая погода, цветущие деревья и вкусная еда делают этот день незабываемым',
  'Ночная прогулка по городу. Яркие неоновые вывески, светящиеся окна домов и звёздное небо создают атмосферу таинственности и романтики',
  'Рыбалка на озере. Тихая гладь воды, удочка и ожидание поклёвки создают атмосферу спокойствия и сосредоточенности',
  'Осенний урожай в саду. Созревшие фрукты, золотые листья и свежий воздух напоминают о щедрости природы',
  'Новогодний фейерверк. Яркие вспышки света, радостные крики и хлопки создают ощущение праздника и волшебства'
];
const PHOTO_DESCRIPTION_LENGTH = 3;
const PHOTO_ID_MIN_VALUE = 1;
const PHOTO_ID_MAX_VALUE = 25;
const PHOTO_DESCRIPTION_QUANTITY = 25;
const PHOTO_LIKES_MIN_QUANTITY = 15;
const PHOTO_LIKES_MAX_QUANTITY = 400;
const USER_AVATAR_MIN_VALUE = 1;
const USER_AVATAR_MAX_VALUE = 6;
const USER_ID_MIN_VALUE = 1;
const USER_ID_MAX_VALUE = 25;
const USER_NAMES = ['Алиса Селезнёва', 'Пашка Гераскин', 'Аркаша Сапожков', 'Геннадий Полосков', 'Коля Наумов'];
const USER_MESSAGES_MAX_QUANTITY = 2;


const preparePhotoDescription = () => {

  const userIds = getUniqueUIntArray(USER_ID_MIN_VALUE, USER_ID_MAX_VALUE);
  const photoIds = getUniqueUIntArray(PHOTO_ID_MIN_VALUE, PHOTO_ID_MAX_VALUE);

  return (item, index) => ({
    id: photoIds[index],
    url: `photos/${getRandomPositiveInteger(USER_ID_MIN_VALUE, USER_ID_MAX_VALUE)}.jpg`,
    description: getRandomArrayPart(PHOTO_DESCRIPTIONS, PHOTO_DESCRIPTION_LENGTH).join(' '),
    likes: getRandomPositiveInteger(PHOTO_LIKES_MIN_QUANTITY, PHOTO_LIKES_MAX_QUANTITY),
    comments: Array.from({ length: getRandomPositiveInteger(COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY) }, (CommentItem, commentIndex) => (
      {
        id: userIds[commentIndex],
        avatar: `img/avatar-${getRandomPositiveInteger(USER_AVATAR_MIN_VALUE, USER_AVATAR_MAX_VALUE)}.svg`,
        message: `${getRandomArrayPart(COMMENTS, USER_MESSAGES_MAX_QUANTITY).join(' ')}`,
        name: USER_NAMES[getRandomPositiveInteger(1, USER_NAMES.length)],
      }
    )),
  });
};

export const getRandomPhotoDescription = () => {
  const adsArray = Array.from({ length: PHOTO_DESCRIPTION_QUANTITY }, preparePhotoDescription());
  return adsArray;
};
