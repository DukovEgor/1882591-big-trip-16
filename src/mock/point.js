const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const POINT_CITIES = ['Chamonix', 'Geneva', 'Paris', 'London', 'Ottawa', 'Luxemburg'];
const POINT_OPTIONS = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120
      }, {
        'id': 2,
        'title': 'Choose the radio station',
        'price': 60
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 3,
        'title': 'Upgrade to a business class',
        'price': 120
      }, {
        'id': 4,
        'title': 'Choose the radio station',
        'price': 60
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 5,
        'title': 'Upgrade to a business class',
        'price': 120
      }, {
        'id': 6,
        'title': 'Choose the radio station',
        'price': 60
      }
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 7,
        'title': 'Upgrade to a business class',
        'price': 120
      }, {
        'id': 8,
        'title': 'Choose the radio station',
        'price': 60
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 9,
        'title': 'Upgrade to a business class',
        'price': 120
      }, {
        'id': 10,
        'title': 'Choose the radio station',
        'price': 60
      }
    ]
  }
];
const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const generateDescription = () => {
  const SENTENCES_COUNTER = getRandomInteger(1, 5);
  const description = [];
  for (let i = 0; i < SENTENCES_COUNTER; i++) {
    const randomIndex = getRandomInteger(0, descriptions.length - 1);
    description.push(descriptions[randomIndex]);
  }
  return description.join(' ');
};
const generatePhotos = () => {
  const PHOTOS_COUNTER = getRandomInteger(1, 5);
  const photos = [];
  for (let i = 0; i < PHOTOS_COUNTER; i++) {
    photos.push(`http://picsum.photos/248/152?r=${getRandomInteger(1, 5)}`);
  }
  return photos;
};

export const generatePoint = () => ({
  type: TYPES[getRandomInteger(0, TYPES.length - 1)],
  reachPoint: POINT_CITIES[getRandomInteger(0, POINT_CITIES.length - 1)],
  options: POINT_OPTIONS[getRandomInteger(0, POINT_OPTIONS.length - 1)],
  description: generateDescription(),
  photos: generatePhotos(),
  price: getRandomInteger(100, 500),
});
