import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

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
export const offerAll = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 190
      },
      {
        'id': 2,
        'title': 'Choose the radio station',
        'price': 30
      },
      {
        'id': 3,
        'title': 'Choose temperature',
        'price': 170
      },
      {
        'id': 4,
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 100
      },
      {
        'id': 5,
        'title': 'Drive slowly',
        'price': 110
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 1,
        'title': 'Infotainment system',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Order meal',
        'price': 100
      },
      {
        'id': 3,
        'title': 'Choose seats',
        'price': 190
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 1,
        'title': 'Book a taxi at the arrival point',
        'price': 110
      },
      {
        'id': 2,
        'title': 'Order a breakfast',
        'price': 80
      },
      {
        'id': 3,
        'title': 'Wake up at a certain time',
        'price': 140
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'Choose meal',
        'price': 120
      },
      {
        'id': 2,
        'title': 'Choose seats',
        'price': 90
      },
      {
        'id': 3,
        'title': 'Upgrade to comfort class',
        'price': 120
      },
      {
        'id': 4,
        'title': 'Upgrade to business class',
        'price': 120
      },
      {
        'id': 5,
        'title': 'Add luggage',
        'price': 170
      },
      {
        'id': 6,
        'title': 'Business lounge',
        'price': 160
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': 1,
        'title': 'Choose the time of check-in',
        'price': 70
      },
      {
        'id': 2,
        'title': 'Choose the time of check-out',
        'price': 190
      },
      {
        'id': 3,
        'title': 'Add breakfast',
        'price': 110
      },
      {
        'id': 4,
        'title': 'Laundry',
        'price': 140
      },
      {
        'id': 5,
        'title': 'Order a meal from the restaurant',
        'price': 30
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 1,
        'title': 'Choose meal',
        'price': 130
      },
      {
        'id': 2,
        'title': 'Choose seats',
        'price': 160
      },
      {
        'id': 3,
        'title': 'Upgrade to comfort class',
        'price': 170
      },
      {
        'id': 4,
        'title': 'Upgrade to business class',
        'price': 150
      },
      {
        'id': 5,
        'title': 'Add luggage',
        'price': 100
      },
      {
        'id': 6,
        'title': 'Business lounge',
        'price': 40
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 1,
        'title': 'With automatic transmission',
        'price': 110
      },
      {
        'id': 2,
        'title': 'With air conditioning',
        'price': 180
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 1,
        'title': 'Choose live music',
        'price': 150
      },
      {
        'id': 2,
        'title': 'Choose VIP area',
        'price': 70
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


const generateDate = () => dayjs().add(getRandomInteger(-10, 10), 'day').toDate();

export const generatePoint = () => {
  const dueDate = generateDate();
  return {
    id: nanoid(),
    dueDate,
    type: TYPES[getRandomInteger(0, TYPES.length - 1)],
    reachPoint: POINT_CITIES[getRandomInteger(0, POINT_CITIES.length - 1)],
    options: POINT_OPTIONS[getRandomInteger(0, POINT_OPTIONS.length - 1)],
    description: generateDescription(),
    photos: generatePhotos(),
    price: getRandomInteger(100, 500),
  };
};
