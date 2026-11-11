// Service: nghiệp vụ và kiểm tra dữ liệu
const User = require('../models/User');

const UserService = {
    getAllUsers: async () => {
        // Hàm này lấy toàn bộ user từ model, cần định nghĩa trong User.js
        return await User.findAll();
    },

    getUserById: async (userId) => {
        return await User.findById(userId);
    },

    updateUserRole: async (userId, newRole) => {
        // Hàm này gọi update, cần định nghĩa trong User.js
        return await User.updateRole(userId, newRole);
    },

    deleteUser: async (userId) => {
        // Hàm này gọi delete, cần định nghĩa trong User.js
        return await User.delete(userId);
    },

    // Xử lý task FMLCN-44: Nâng cấp user thành FAMILY_MEMBER và bật cờ is_verified
    verifyUser: async (userId, newRole, isVerified) => {
        // Hàm này gọi verify xuống model, cần định nghĩa trong User.js
        return await User.verify(userId, newRole, isVerified);
    }
};

module.exports = UserService;