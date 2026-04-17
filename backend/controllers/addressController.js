import Address from "../models/Address.js";

// SAVE ADDRESS
export const saveAddress = async (req, res) => {
    try {
        const address = await Address.create(req.body);
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: "Error saving address" });
    }
};

// GET ALL ADDRESSES
export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({
            userId: req.params.userId
        });
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching addresses" });
    }
};

// 🔥 DELETE ADDRESS (IMPORTANT)
export const deleteAddress = async (req, res) => {
    try {
        await Address.findByIdAndDelete(req.params.id);
        res.json({ message: "Address deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting address" });
    }
};