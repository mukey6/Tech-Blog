const router = require('express').Router();

const apiRoutes = require('./api/route-connection');
const homeRoutes = require('./homepage.js');
// const dashboardRoutes = require('./dashboard-routes.js');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// router.use('/dashboard', dashboardRoutes);
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;