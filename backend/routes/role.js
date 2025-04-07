express = require('express');
const RoleDao = require('../dao/RoleDao');

const router = express.Router();
router.get('/auth/role', async (req, res) => {
    try {
        const roles = await RoleDao.getAll();
        res.status(200).json({
            success: true,
            data: roles
        });
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
});


module.exports = router;