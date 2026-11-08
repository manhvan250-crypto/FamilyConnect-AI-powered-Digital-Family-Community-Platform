// Controller: nhận request, gọi service, trả ApiResponse
const UserService = require('../services/UserService');

// Hàm helper bắn log ngầm (Fire and Forget - không chờ phản hồi)
const sendAuditLog = (action, details) => {
    // Sửa lại host/port này cho khớp với nơi hứng API audit của team (ví dụ: qua gateway 8080 hoặc chạy thẳng service khác)
    const auditUrl = 'http://localhost:8080/internal/audit'; 
    
    fetch(auditUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...details, timestamp: new Date() })
    }).catch(err => console.error('[Audit Error] Lỗi ghi log:', err.message));
};

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json({ success: true, status_code: 200, message: 'Lấy danh sách thành công', data: users });
        } catch (error) {
            res.status(500).json({ success: false, status_code: 500, message: error.message, data: null });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ success: false, status_code: 404, message: 'Không tìm thấy người dùng', data: null });
            }
            res.status(200).json({ success: true, status_code: 200, message: 'Thành công', data: user });
        } catch (error) {
            res.status(500).json({ success: false, status_code: 500, message: error.message, data: null });
        }
    },

    updateUserRole: async (req, res) => {
        try {
            const { role } = req.body;
            if (!role) throw new Error('Vui lòng cung cấp vai trò mới');
            
            const updatedUser = await UserService.updateUserRole(req.params.id, role);
            
            // BẮN LOG NGẦM (Không có await)
            sendAuditLog('UPDATE_ROLE', { userId: req.params.id, newRole: role });

            res.status(200).json({ success: true, status_code: 200, message: 'Cập nhật vai trò thành công', data: updatedUser });
        } catch (error) {
            res.status(400).json({ success: false, status_code: 400, message: error.message, data: null });
        }
    },

    deleteUser: async (req, res) => {
        try {
            await UserService.deleteUser(req.params.id);
            
            // BẮN LOG NGẦM (Không có await)
            sendAuditLog('DELETE_USER', { userId: req.params.id });

            res.status(200).json({ success: true, status_code: 200, message: 'Xóa người dùng thành công', data: null });
        } catch (error) {
            res.status(500).json({ success: false, status_code: 500, message: error.message, data: null });
        }
    },

    getStats: async (req, res) => {
        try {
            const stats = { total_users: 128, active_users: 120 };
            res.status(200).json({ success: true, status_code: 200, message: 'Lấy thống kê thành công', data: stats });
        } catch (error) {
            res.status(500).json({ success: false, status_code: 500, message: error.message, data: null });
        }
    }
};

module.exports = UserController;