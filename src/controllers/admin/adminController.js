import { addVehicle } from '../../models/inventory/inventoryModel.js';

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

export { adminDashboardPage, addVehiclePage, addVehicleAction };