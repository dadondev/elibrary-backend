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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("./utils/utils");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const catalog_routes_1 = __importDefault(require("./routes/catalog.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const borrow_routes_1 = __importDefault(require("./routes/borrow.routes"));
const node_cron_1 = __importDefault(require("node-cron"));
const cron_service_1 = __importDefault(require("./services/cron.service"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)({}));
app.use((0, morgan_1.default)("dev"));
app.use("/api/catalogs", catalog_routes_1.default);
app.use("/api/books", book_routes_1.default);
app.use("/api/borrow", borrow_routes_1.default);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(utils_1.DB_URL);
            app.listen(utils_1.PORT, () => console.log("Server is working port:", utils_1.PORT));
        }
        catch (error) {
            console.log(error);
        }
    });
}
bootstrap();
node_cron_1.default.schedule("0 8 * * 1-6", () => __awaiter(void 0, void 0, void 0, function* () {
    yield cron_service_1.default.examineBorrows();
    console.log("I send sms all users!");
}));
