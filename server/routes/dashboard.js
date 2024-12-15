const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

/**
 * Dashboard Routes 
*/
router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewPlaybook);
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdatePlaybook);
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeletePlaybook);
router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddPlaybook);
router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddPlaybookSubmit);
router.get('/dashboard/search', isLoggedIn, dashboardController.dashboardSearch);
router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit);

// Modified Route for RakshaSutra Playbook
router.get('/dashboard/rakshaSutraPlaybook', isLoggedIn, dashboardController.dashboardRakshaSutraPlaybook);

module.exports = router;
