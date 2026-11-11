const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

// Tạm thời tắt kiểm tra quyền để test API hoạt động trước
// const AuthGuard = require('../middleware/AuthGuard'); 
// const requireRole = require('../../../../shared/src/requireRole');

router.get('/:id', UserController.getUserById);
router.put('/:id/role', UserController.updateUserRole);
router.delete('/:id', UserController.deleteUser);

// Route mới cho task FMLCN-44: Duyệt thành viên (is_verified = true, role = FAMILY_MEMBER)
router.put('/:id/verify', UserController.verifyFamilyMember);

module.exports = router;