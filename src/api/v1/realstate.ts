import express, { NextFunction, Request, Response } from "express";
import RealStateController from "../../controller/RealStateController";

const router = express.Router();

/**
 * Handles new real state validation, then proceeds to datalayer
 * @returns status of operation + friendly message
 */
router.post("/realstate/new", async (req: Request, res: Response, next: NextFunction) => {
    RealStateController
        .create(req.body)
        .then((realstate) => {
            
            return res.status(200).json({
                message: "Created Successfuly!",
                id: realstate?.id
            });
        })
        .catch(next);
});

/**
 * Handles updating real state validation, then proceeds to datalayer
 * @returns status of operation + friendly message
 */
router.put("/realstate/:id", async (req: Request, res: Response, next: NextFunction) => {
    RealStateController
        .update(Number(req.params.id), req.body)
        .then((realstate) => {
            
            if(realstate?.id)
                return res.status(200).json({
                    message: "Updated Successfuly!"
                });
            else
                return res.status(404).json({
                    message: "Real State not found. Check your ID",
                });
        })
        .catch(next);
});

/**
 * Handles disabling a real state validation, then proceeds to datalayer
 * @returns status of operation + friendly message
 */
router.delete("/realstate/:id", async (req: Request, res: Response, next: NextFunction) => {
    RealStateController
        .delete(Number(req.params.id))
        .then((wasDeleted) => {
            
            if(wasDeleted)
                return res.status(200).json({
                    message: "Deleted Successfuly!"
                });
            else
                return res.status(404).json({
                    message: "Real State not found. Check your ID",
            });
        })
        .catch(next);
});

/**
 * Looks up real state by given id
 * @returns status of operation + found real state, OR a NOT FOUND friendly message
 */
router.get("/realstate/:id",(req: Request, res: Response, next: NextFunction) => {
    RealStateController
        .find(Number(req.params.id))
        .then((realstate) => {
            
            return res.status(200).json({
                result: realstate
            });
        })
        .catch(next);
});

/**
 * Searchs real states based on query criteria
 * @returns status of operation + found real states, OR NO RESULTS FOUND friendly message
 */
router.post("/realstates/", (req: Request, res: Response, next: NextFunction) => {
    RealStateController
        .findBy(req.body)
        .then((realstates) => {
            
            return res.status(200).json({
                results: realstates,
            });
        })
        .catch(next);
});

export default router;
