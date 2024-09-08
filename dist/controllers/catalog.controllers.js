"use strict";
/** @format */
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
const catalog_service_1 = __importDefault(require("../services/catalog.service"));
const catalog_validator_1 = require("../validators/catalog.validator");
const sms_service_1 = __importDefault(require("../services/sms.service"));
class catalogController {
    getAll(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const datas = yield catalog_service_1.default.getAll();
                return res.json(datas);
            }
            catch (error) {
                const err = error;
                res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    throw new Error("Id not found");
                const data = yield catalog_service_1.default.getOne(id);
                return res.json(data);
            }
            catch (error) {
                const err = error;
                res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resp = yield catalog_service_1.default.create(data);
                yield sms_service_1.default.welcomeSMS(resp.phoneNumber || resp.parents[0].phoneNumber, `${resp.lastName} ${resp.firstName}`);
                return res.json(resp);
            }
            catch (error) {
                console.log(error);
                const err = error;
                res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    throw new Error("Id not found");
                const data = catalog_validator_1.editCatalogValidator.validateSync(req.body);
                const resp = yield catalog_service_1.default.edit(id, data);
                return res.json(resp);
            }
            catch (error) {
                const err = error;
                res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    addParent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    throw new Error("Id not found");
                const data = req.body;
                const resp = yield catalog_service_1.default.addParent(id, data);
                return res.json(resp);
            }
            catch (error) {
                const err = error;
                res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    throw new Error("Id not found");
                const resp = yield catalog_service_1.default.delete(id);
                return res.json(resp);
            }
            catch (error) {
                const err = error;
                res.status(400).json({
                    message: err.message,
                    statusCode: 400,
                });
            }
        });
    }
}
exports.default = new catalogController();
