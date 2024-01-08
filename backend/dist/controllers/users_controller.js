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
            if (data) {
                console.log("serving from cache");
                return res.status(200).json({
                    data,
                });
            }
            else {
                console.log("serving from db");
                const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                const users = yield userRepository.find();
                memory_cache_1.default.put("data", users, 6000);
                return res.status(200).json({
                    data: users,
                });
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
            yield userRepository.save(user);
            return res
                .status(200)
                .json({ message: "User created successfully", user });
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email } = req.body;
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = yield userRepository.findOne({
                where: { id },
            });
            user.name = name;
            user.email = email;
            yield userRepository.save(user);
            res.status(200).json({ message: "udpdate", user });
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = yield userRepository.findOne({
                where: { id },
            });
            yield userRepository.remove(user);
            res.status(200).json({ message: "ok" });
        });
    }
}
exports.UserController = UserController;
