const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserData
} = require('../controllers/UserController');
const {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/CRMController');
const { protect } = require('../middleware/Auth');

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserData);

// CRM Routes
router.route('/customers')
    .get(protect, getCustomers)
    .post(protect, createCustomer);

router.route('/customers/:id')
    .put(protect, updateCustomer)
    .delete(protect, deleteCustomer);

module.exports = router;
