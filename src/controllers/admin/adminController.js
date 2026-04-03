import { addVehicle, deleteVehicle, getSortedVehicles } from '../../models/inventory/inventoryModel.js';
import {
  getAllContactMessages,
  getContactMessageById,
  respondToContactMessage
} from '../../models/contact/contactModel.js';

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

const manageContactMessagesPage = async (req, res, next) => {
  try {
    const messages = await getAllContactMessages();

    res.render('contact/manage', {
      title: 'Manage Contact Messages',
      messages
    });
  } catch (error) {
    console.error('manageContactMessagesPage error:', error);
    next(error);
  }
};

const contactMessageDetailPage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const message = await getContactMessageById(messageId);

    if (!message) {
      return res.status(404).render('errors/404', {
        title: 'Message Not Found'
      });
    }

    res.render('contact/detail', {
      title: 'Message Detail',
      message,
      errors: null
    });
  } catch (error) {
    console.error('contactMessageDetailPage error:', error);
    next(error);
  }
};

const respondToMessageAction = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const { response, status } = req.body;

    const responded_by = req.session?.user?.id;

    const message = await getContactMessageById(messageId);

    if (!message) {
      return res.status(404).render('errors/404', {
        title: 'Message Not Found'
      });
    }

    if (!response || !response.trim()) {
      return res.render('contact/detail', {
        title: 'Message Detail',
        message,
        errors: [{ msg: 'Response cannot be empty.' }]
      });
    }

    await respondToContactMessage({
      message_id: messageId,
      response: response.trim(),
      responded_by,
      status: status || 'closed'
    });

    res.redirect('/admin/contact');
  } catch (error) {
    console.error('respondToMessageAction error:', error);
    next(error);
  }
};

export {
  adminDashboardPage,
  addVehiclePage,
  addVehicleAction,
  manageVehiclesPage,
  deleteVehicleAction,
  manageContactMessagesPage,
  contactMessageDetailPage,
  respondToMessageAction
};