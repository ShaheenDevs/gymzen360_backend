const models = require('../models');

// Add a new member
const addMember = async (req, res) => {
    const { gymId, name, gender, phone, cnic, address, fee, advance, joiningDate, status, profileImage } = req.body;

    try {
        const member = {
            gymId,
            name,
            gender,
            phone,
            cnic,
            address,
            fee,
            advance,
            joiningDate,
            status,
            profileImage,
        };

        const newMember = await models.Member.create(member);
        return res.status(201).json({
            message: "Member added successfully",
            result: newMember,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "An error occurred while adding the member",
            error: err.message,
        });
    }
};

// Get all members for a specific gym
const getGymMembers = async (req, res) => {
    const { gymId } = req.params;

    try {
        const members = await models.Member.findAll({ where: { gymId } });

        if (members.length) {
            return res.status(200).json({
                message: "Members retrieved successfully",
                result: members,
            });
        }

        return res.status(404).json({ message: 'No members found for this gym.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while retrieving members",
            error: error.message,
        });
    }
};

// Update an existing member
const updateMember = async (req, res) => {
    const { id: memberId } = req.params;
    const { name, gender, phone, cnic, address, fee, advance, joiningDate, status, profileImage } = req.body;

    try {
        const [updated] = await models.Member.update(
            { name, gender, phone, cnic, address, fee, advance, joiningDate, status, profileImage },
            { where: { id: memberId } }
        );

        if (updated) {
            const updatedMember = await models.Member.findByPk(memberId);
            return res.status(200).json({
                message: "Member updated successfully",
                result: updatedMember,
            });
        }

        return res.status(404).json({ message: 'Member not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while updating the member',
            error: error.message,
        });
    }
};

// Delete a member
const deleteMember = async (req, res) => {
    const { id: memberId } = req.params;

    try {
        const result = await models.Member.destroy({ where: { id: memberId } });

        if (result === 1) {
            return res.status(200).json({ message: 'Member deleted successfully' });
        }

        return res.status(404).json({ message: 'Member not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while deleting the member',
            error: error.message,
        });
    }
};

module.exports = {
    addMember,
    getGymMembers,
    updateMember,
    deleteMember,
};
