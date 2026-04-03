import {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  getMessagesByUserId,
  respondToContactMessage
} from '../../models/contact/contactModel.js';

const contactPage = (req, res) => {
  res.render('contact/index', {
    title: 'Contact Us',
    errors: null,
    user: req.session.user || null
  });
};

const submitContactMessage = async (req, res, next) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.session.user:', req.session?.user);

    const { name, email, subject, message } = req.body;
    const user_id = req.session?.user?.account_id || null;

    if (!name || !email || !subject || !message) {
      return res.render('contact/index', {
        title: 'Contact Us',
        errors: [{ msg: 'All fields are required.' }],
        user: req.session.user || null
      });
    }

    await createContactMessage({
      user_id,
      name,
      email,
      subject,
      message
    });

    res.redirect('/contact');
  } catch (error) {
    console.error('submitContactMessage error:', error);
    next(error);
  }
};

const myMessagesPage = async (req, res, next) => {
  try {
    const user_id = req.session?.user?.id;

    const messages = await getMessagesByUserId(user_id);

    res.render('contact/my-messages', {
      title: 'My Messages',
      messages
    });
  } catch (error) {
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
    next(error);
  }
};

const contactMessageDetailPage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const message = await getContactMessageById(messageId);

    if (!message) {
      return res.status(404).render('errors/404', {
        title: 'Not Found'
      });
    }

    res.render('contact/detail', {
      title: 'Message Detail',
      message,
      errors: null
    });
  } catch (error) {
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
        title: 'Not Found'
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
      response,
      responded_by,
      status: status || 'closed'
    });

    res.redirect('/admin/contact');
  } catch (error) {
    next(error);
  }
};

export {
  contactPage,
  submitContactMessage,
  myMessagesPage,
  manageContactMessagesPage,
  contactMessageDetailPage,
  respondToMessageAction
};