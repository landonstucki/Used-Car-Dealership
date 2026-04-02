import { addVehicle, deleteVehicle, getSortedVehicles } from '../../models/inventory/inventoryModel.js';

const adminDashboardPage = (req, res) => {
  res.render('admin/dashboard', {
    title: 'Admin Dashboard'
  });
};

const addVehiclePage = (req, res) => {
  res.render('admin/add-vehicle', {
    title: 'Add Vehicle'
  });
};

const addVehicleAction = async (req, res, next) => {
  try {
    const {
      slug,
      year,
      make,
      model,
      price,
      mileage,
      color,
      category_id
    } = req.body;

    const image_path = req.file
      ? `/images/vehicles/${req.file.filename}`
      : '/images/vehicles/default-car.jpg';

    await addVehicle({
      slug,
      year,
      make,
      model,
      price,
      mileage,
      color,
      category_id,
      image_path
    });

    res.redirect('/vehicles');
  } catch (error) {
    console.error('addVehicleAction error:', error);
    next(error);
  }
};

const manageVehiclesPage = async (req, res, next) => {
  try {
    const vehicles = await getSortedVehicles();

    res.render('admin/manage-vehicles', {
      title: 'Manage Vehicles',
      vehicles
    });
  } catch (error) {
    console.error('manageVehiclesPage error:', error);
    next(error);
  }
};

const deleteVehicleAction = async (req, res, next) => {
  try {
    const { vehicle_id } = req.body;

    await deleteVehicle(vehicle_id);

    res.redirect('/admin/vehicles/manage');
  } catch (error) {
    console.error('deleteVehicleAction error:', error);
    next(error);
  }
};

export {
  adminDashboardPage,
  addVehiclePage,
  addVehicleAction,
  manageVehiclesPage,
  deleteVehicleAction
};