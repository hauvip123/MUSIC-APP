import { Router } from "express";
import * as controller from "../../controller/client/result.controller";
const router: Router = Router();
router.get("/:type", controller.result);
export const resultRoute: Router = router;
