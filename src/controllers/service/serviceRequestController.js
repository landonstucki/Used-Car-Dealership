import { body, validationResult } from 'express-validator';
import { getSortedVehicles } from '../../models/inventory/inventoryModel.js';
import {
  createServiceRequest,
  getServiceRequestsByUserId,
  getAllServiceRequests,
  updateServiceRequest
} from '../../models/service/serviceRequestModel.js';

const serviceRequestValidation = [
  body('vehicle_id')
    .isInt({ min: 1 })
    .withMessage('Please choose a vehicle'),

  body('service_type')
    .trim()
    .notEmpty()
    .withMessage('Service type is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
];

const adminServiceUpdateValidation = [
  body('status')
    .trim()
    .isIn(['Submitted', 'In Progress', 'Completed'])
    .withMessage('Invalid status'),

  body('admin_notes')
    .optional({ checkFalsy: true })
    .trim()
];

const newServiceRequestPage = async (req, res, next) => {
  try {
    const vehicles = await getSortedVehicles();

    res.render('account/new-service-request', {
      title: 'New Service Request',
      vehicles
    });
  } catch (error) {
    next(error);
  }
};

const createServiceRequestAction = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('serviceRequestValidation errors:', errors.array());
    return res.redirect('/account/service-requests/new');
  }

  try {
    const { vehicle_id, service_type, description } = req.body;

    await createServiceRequest({
      user_id: req.session.user.user_id,
      vehicle_id,
      service_type,
      description
    });

    res.redirect('/account/service-requests');
  } catch (error) {
    console.error('createServiceRequestAction error:', error);
    next(error);
  }
};

const accountServiceRequestsPage = async (req, res, next) => {
  try {
    const requests = await getServiceRequestsByUserId(req.session.user.user_id);

    res.render('account/service-requests', {
      title: 'My Service Requests',
      requests
    });
  } catch (error) {
    next(error);
  }
};

const adminServiceRequestsPage = async (req, res, next) => {
  try {
    const requests = await getAllServiceRequests();

    res.render('admin/service-requests', {
      title: 'Manage Service Requests',
      requests
    });
  } catch (error) {
    next(error);
  }
};

const updateServiceRequestAction = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('adminServiceUpdateValidation errors:', errors.array());
    return res.redirect('/admin/service-requests');
  }

  try {
    const { request_id, status, admin_notes } = req.body;

    await updateServiceRequest(request_id, {
      status,
      admin_notes
    });

    res.redirect('/admin/service-requests');
  } catch (error) {
    console.error('updateServiceRequestAction error:', error);
    next(error);
  }
};

export {
  serviceRequestValidation,
  adminServiceUpdateValidation,
  newServiceRequestPage,
  createServiceRequestAction,
  accountServiceRequestsPage,
  adminServiceRequestsPage,
  updateServiceRequestAction
};