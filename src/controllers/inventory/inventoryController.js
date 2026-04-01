import { getSortedVehicles, getVehicleById } from '../../models/inventory/inventoryModel.js';

const inventoryPage = async (req, res, next) => {
  try {
    const sort = req.query.sort;
    const vehicles = await getSortedVehicles(sort);

    console.log('vehicles:', vehicles);

    res.render('inventory/index', {
      title: 'Vehicles',
      vehicles
    });
  } catch (error) {
    console.error('inventoryPage error:', error);
    next(error);
  }
};

const vehicleDetailPage = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const vehicle = await getVehicleById(slug);

    if (!vehicle) {
      const err = new Error('Vehicle not found');
      err.status = 404;
      return next(err);
    }

    res.render('inventory/details', {
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      vehicle
    });
  } catch (error) {
    next(error);
  }
};

export { inventoryPage, vehicleDetailPage };