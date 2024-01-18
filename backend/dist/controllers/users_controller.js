"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../database/entities/User");
const memory_cache_1 = __importDefault(require("memory-cache"));
class UserController {
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = memory_cache_1.default.get("data");
            const logMessage = `[UserController] Getting Users from ${data ? 'cache' : 'DB'}`;
            console.log(logMessage);
            try {
                if (data) {
                    return res.status(200).json({
                        message: 'Users retrieved from cache successfully',
                        data,
                    });
                }
                else {
                    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                    const users = yield userRepository.find();
                    memory_cache_1.default.put("data", users, 6000);
                    return res.status(200).json({
                        message: 'Users retrieved from DB successfully',
                        data: users,
                    });
                }
            }
            catch (error) {
                console.error('[UserController] Error in getUsers:', error.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const user = new User_1.User();
            user.name = name;
            user.email = email;
            user.password = password;
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
            try {
                yield userRepository.save(user);
                console.log("[UserController] User created successfully");
                return res.status(200).json({
                    message: "User created successfully",
                    user,
                });
            }
            catch (error) {
                console.error('[UserController] Error in createUser:', error.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email } = req.body;
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
            try {
                const user = yield userRepository.findOne({
                    where: { id },
                });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                user.name = name;
                user.email = email;
                yield userRepository.save(user);
                return res.status(200).json({ message: "User updated successfully", user });
            }
            catch (error) {
                console.error('[UserController] Error in updateUser:', error.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
            try {
                const user = yield userRepository.findOne({
                    where: { id },
                });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                yield userRepository.remove(user);
                return res.status(200).json({ message: "User deleted successfully" });
            }
            catch (error) {
                console.error('[UserController] Error in deleteUser:', error.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.UserController = UserController;
