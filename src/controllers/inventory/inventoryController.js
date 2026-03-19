const inventoryPage = (req, res) => {
  res.render('inventory/index', { title: 'Vehicles' });
};

const vehicleDetailPage = (req, res) => {
  res.render('inventory/details', {
    title: 'Vehicle Details',
    vehicleId: req.params.vehicleId
  });
};
export { inventoryPage, vehicleDetailPage };