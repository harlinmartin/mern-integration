const Customer = require('../models/CustomerModel');

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private
exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({ user: req.user._id });
        res.json({ success: true, count: customers.length, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private
exports.createCustomer = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        const customer = await Customer.create({
            name,
            email,
            phone,
            address,
            user: req.user._id
        });

        res.status(201).json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private
exports.updateCustomer = async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        // Make sure user owns customer
        if (customer.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        // Make sure user owns customer
        if (customer.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        await Customer.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
