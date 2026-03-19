const homePage = (req, res) => {
  res.render('home', { title: 'Home' });
};

const aboutPage = (req, res) => {
  res.render('about', { title: 'About' });
};

const contactPage = (req, res) => {
  res.render('contact', { title: 'Contact' });
};

export { homePage, aboutPage, contactPage };