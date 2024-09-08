"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const catalog_dto_1 = __importDefault(require("../dtos/catalog.dto"));
const catalog_schema_1 = __importDefault(require("../models/catalog.schema"));
const catalog_validator_1 = __importStar(require("../validators/catalog.validator"));
class catalogService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const datas = yield catalog_schema_1.default.find();
            return datas.map((e) => new catalog_dto_1.default(e));
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const catalog = yield catalog_schema_1.default.findById(id);
            return new catalog_dto_1.default(catalog);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = catalog_validator_1.default.validateSync(data);
            const newCatalog = yield catalog_schema_1.default.create(validatedData);
            return new catalog_dto_1.default(newCatalog);
        });
    }
    edit(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const editedCatalog = yield catalog_schema_1.default.findByIdAndUpdate(id, data, {
                new: true,
            });
            return new catalog_dto_1.default(editedCatalog);
        });
    }
    addParent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = catalog_validator_1.parentValidator.validateSync(data);
            const existUser = yield catalog_schema_1.default.findById(id);
            if (!existUser)
                throw new Error("Catalog is not found");
            existUser.parents.push(existUser.parents.create(validatedData));
            return new catalog_dto_1.default(existUser);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const catalog = yield catalog_schema_1.default.findByIdAndDelete(id);
            return new catalog_dto_1.default(catalog);
        });
    }
}
exports.default = new catalogService();
