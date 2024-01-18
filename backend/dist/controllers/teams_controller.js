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
exports.TeamsController = void 0;
const data_source_1 = require("../data-source");
const Teams_1 = require("../database/entities/Teams");
const memory_cache_1 = __importDefault(require("memory-cache"));
// @ts-ignore
const nba_1 = __importDefault(require("nba"));
class TeamsController {
    static getTeams(req, res) {
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
                const userRepository = data_source_1.AppDataSource.getRepository(Teams_1.Teams);
                const teams = yield userRepository.find();
                memory_cache_1.default.put("data", teams, 6000);
                return res.status(200).json({
                    data: teams,
                });
            }
        });
    }
    static getTeamById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Invalid team ID' });
            }
            const teamRepository = data_source_1.AppDataSource.getRepository(Teams_1.Teams);
            try {
                const team = yield teamRepository.findOne({
                    where: { id }
                });
                if (!id) {
                    return res.status(404).json({ message: 'Team not found' });
                }
                return res.status(200).json({ team });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    static createTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { abbreviation, name, location } = req.body;
            const teamRepository = data_source_1.AppDataSource.getRepository(Teams_1.Teams);
            const existingTeam = yield teamRepository.findOne({
                where: { name }
            });
            if (existingTeam) {
                return res
                    .status(400)
                    .json({ message: "Team with the same name already exists" });
            }
            else {
                const team = new Teams_1.Teams();
                team.abbreviation = abbreviation;
                team.name = name;
                team.location = location;
                yield teamRepository.save(team);
                return res
                    .status(200)
                    .json({ message: "team created successfully", team });
            }
        });
    }
    static updateTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { abbreviation, name, location } = req.body;
            const teamRepository = data_source_1.AppDataSource.getRepository(Teams_1.Teams);
            const team = yield teamRepository.findOne({
                where: { id }
            });
            team.abbreviation = abbreviation;
            team.name = name;
            team.location = location;
            yield teamRepository.save(team);
            res.status(200).json({ message: "udpdate", team });
        });
    }
    static deleteTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const teamRepository = data_source_1.AppDataSource.getRepository(Teams_1.Teams);
            const team = yield teamRepository.findOne({
                where: { id }
            });
            yield teamRepository.remove(team);
            res.status(200).json({ message: "ok" });
        });
    }
    static getTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield nba_1.default.stats.teamStats();
            return res.status(200).json({ data });
        });
    }
}
exports.TeamsController = TeamsController;
;
