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
const data_source_1 = require("./data-source");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./routes/user");
require("reflect-metadata");
const errorHandler_1 = require("./middleware/errorHandler");
const player_1 = require("./routes/player");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(errorHandler_1.errorHandler);
app.use(user_1.userRouter);
app.use(player_1.playerRouter);
app.get("*", (req, res) => {
    res.status(505).json({ message: "Deu ruim" });
});
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(process.env.BACKEND_LOCAL_PORT, () => {
        console.log("Server is running on http://localhost:" + process.env.BACKEND_LOCAL_PORT);
    });
    console.log("Data Source has been initialized!");
}))
    .catch((error) => console.log(error));
