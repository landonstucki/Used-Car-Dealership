// Vehicle data
const vehicles = {
  'ford-f150': {
    id: 'ford-f150',
    year: 2022,
    make: 'Ford',
    model: 'F-150',
    category: 'Truck',
    price: 38995,
    mileage: 24500,
    color: 'Blue'
  },
  'chevy-silverado': {
    id: 'chevy-silverado',
    year: 2021,
    make: 'Chevrolet',
    model: 'Silverado 1500',
    category: 'Truck',
    price: 35995,
    mileage: 31000,
    color: 'Black'
  },
  'ram-1500': {
    id: 'ram-1500',
    year: 2023,
    make: 'RAM',
    model: '1500',
    category: 'Truck',
    price: 42995,
    mileage: 12000,
    color: 'White'
  },
  'toyota-tacoma': {
    id: 'toyota-tacoma',
    year: 2022,
    make: 'Toyota',
    model: 'Tacoma',
    category: 'Truck',
    price: 36995,
    mileage: 20000,
    color: 'Gray'
  },

  'honda-civic': {
    id: 'honda-civic',
    year: 2021,
    make: 'Honda',
    model: 'Civic',
    category: 'Car',
    price: 21995,
    mileage: 30000,
    color: 'White'
  },
  'toyota-camry': {
    id: 'toyota-camry',
    year: 2022,
    make: 'Toyota',
    model: 'Camry',
    category: 'Car',
    price: 25995,
    mileage: 18000,
    color: 'Silver'
  },
  'tesla-model-3': {
    id: 'tesla-model-3',
    year: 2023,
    make: 'Tesla',
    model: 'Model 3',
    category: 'Car',
    price: 44995,
    mileage: 8000,
    color: 'Red'
  },
  'bmw-3series': {
    id: 'bmw-3series',
    year: 2020,
    make: 'BMW',
    model: '3 Series',
    category: 'Car',
    price: 32995,
    mileage: 28000,
    color: 'Black'
  },

  'ford-explorer': {
    id: 'ford-explorer',
    year: 2021,
    make: 'Ford',
    model: 'Explorer',
    category: 'SUV',
    price: 34995,
    mileage: 26000,
    color: 'Blue'
  },
  'chevy-tahoe': {
    id: 'chevy-tahoe',
    year: 2022,
    make: 'Chevrolet',
    model: 'Tahoe',
    category: 'SUV',
    price: 55995,
    mileage: 15000,
    color: 'Black'
  },
  'jeep-wrangler': {
    id: 'jeep-wrangler',
    year: 2023,
    make: 'Jeep',
    model: 'Wrangler',
    category: 'SUV',
    price: 47995,
    mileage: 10000,
    color: 'Green'
  },
  'toyota-rav4': {
    id: 'toyota-rav4',
    year: 2022,
    make: 'Toyota',
    model: 'RAV4',
    category: 'SUV',
    price: 30995,
    mileage: 22000,
    color: 'White'
  },

  'honda-odyssey': {
    id: 'honda-odyssey',
    year: 2021,
    make: 'Honda',
    model: 'Odyssey',
    category: 'Van',
    price: 29995,
    mileage: 27000,
    color: 'Gray'
  },
  'toyota-sienna': {
    id: 'toyota-sienna',
    year: 2023,
    make: 'Toyota',
    model: 'Sienna',
    category: 'Van',
    price: 38995,
    mileage: 9000,
    color: 'Blue'
  },
  'chrysler-pacifica': {
    id: 'chrysler-pacifica',
    year: 2022,
    make: 'Chrysler',
    model: 'Pacifica',
    category: 'Van',
    price: 35995,
    mileage: 16000,
    color: 'White'
  },

  'audi-q5': {
    id: 'audi-q5',
    year: 2021,
    make: 'Audi',
    model: 'Q5',
    category: 'SUV',
    price: 41995,
    mileage: 24000,
    color: 'Black'
  },
  'mercedes-c300': {
    id: 'mercedes-c300',
    year: 2020,
    make: 'Mercedes-Benz',
    model: 'C300',
    category: 'Car',
    price: 33995,
    mileage: 30000,
    color: 'Silver'
  },
  'nissan-altima': {
    id: 'nissan-altima',
    year: 2021,
    make: 'Nissan',
    model: 'Altima',
    category: 'Car',
    price: 20995,
    mileage: 35000,
    color: 'Gray'
  },
  'hyundai-elantra': {
    id: 'hyundai-elantra',
    year: 2022,
    make: 'Hyundai',
    model: 'Elantra',
    category: 'Car',
    price: 19995,
    mileage: 22000,
    color: 'Blue'
  }
};

// =======================
// Model Functions
// =======================

// Get one vehicle
const getVehicleById = (vehicleId) => {
  return vehicles[vehicleId] || null;
};

// Get all vehicles (unsorted)
const getAllVehicles = () => {
  return Object.values(vehicles);
};

// Get sorted vehicles
const getSortedVehicles = (sortBy = 'make') => {
  const validSorts = ['make', 'price', 'year', 'category'];
  const safeSort = validSorts.includes(sortBy) ? sortBy : 'make';

  const vehicleArray = getAllVehicles();

  return vehicleArray.sort((a, b) => {
    if (a[safeSort] < b[safeSort]) return -1;
    if (a[safeSort] > b[safeSort]) return 1;
    return 0;
  });
};

export { getVehicleById, getAllVehicles, getSortedVehicles };