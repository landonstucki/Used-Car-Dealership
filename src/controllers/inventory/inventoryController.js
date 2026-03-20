import { getSortedVehicles, getVehicleById } from '../../models/inventory/inventoryModel.js';

const inventoryPage = (req, res) => {
  const sort = req.query.sort;
  const vehicles = getSortedVehicles(sort);

  res.render('inventory/index', {
    title: 'Vehicles',
    vehicles
  });
};

const vehicleDetailPage = (req, res, next) => {
  const vehicleId = req.params.vehicleId;
  const vehicle = getVehicleById(vehicleId);

  if (!vehicle) {
    const err = new Error(`Vehicle ${vehicleId} not found`);
    err.status = 404;
    return next(err);
  }

  res.render('inventory/details', {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    vehicle
  });
};

export { inventoryPage, vehicleDetailPage };