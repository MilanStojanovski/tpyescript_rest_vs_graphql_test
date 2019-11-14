"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// import User from "../../schemas/User";
const User_1 = __importDefault(require("../../models/User"));
router.get("/", (req, res) => {
    User_1.default.find()
        .then((users) => {
        res.send(users);
    })
        .catch((err) => {
        // tslint:disable-next-line:no-console
        console.log(err);
    });
});
router.post("/", (req, res) => {
    // tslint:disable-next-line:no-console
    console.log(req);
    const newUser = new User_1.default({
        name: req.body.name
    });
    newUser.save()
        .then((user) => res.send(user));
});
exports.default = router;
//# sourceMappingURL=users.js.map