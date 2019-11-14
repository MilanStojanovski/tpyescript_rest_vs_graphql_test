import express, { response } from "express";
const router = express.Router();

// import User from "../../schemas/User";
import User from "../../models/User";

router.get("/", (req: express.Request, res: express.Response) => {
    User.find()
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            // tslint:disable-next-line:no-console
            console.log(err);
        });
});

router.post("/", (req: express.Request, res: express.Response) => {
    // tslint:disable-next-line:no-console
    console.log(req);
    const newUser = new User({
        name: req.body.name
    });

    newUser.save()
        .then((user) => res.send(user));
});

export default router;
