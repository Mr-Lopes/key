import express from "express";
import RealStateController from "../../controller/RealStateController"

const router = express.Router();


/**
 * Handles new real state validation, then proceeds to datalayer
 * @returns status of operation + friendly message
 */
  router.post("/realstate/new", async (req, res, next) => {
    // Here we could do some validations
    // F.i. AUTH
    RealStateController.create(req, res);
    
  });
  
  /**
   * Handles updating real state validation, then proceeds to datalayer
   * @returns status of operation + friendly message
   */
  router.put("/realstate/:id", RealStateController.update);
  
  /**
   * Handles disabling a real state validation, then proceeds to datalayer
   * @returns status of operation + friendly message
   */
  router.delete("/realstate/:id", RealStateController.delete);
  
  /**
   * Looks up real state by given id 
   * @returns status of operation + found real state, OR a NOT FOUND friendly message
   */
   router.get("/realstate/:id", RealStateController.find);
  
  /**
   * Searchs real states based on query criteria
   * @returns status of operation + found real states, OR NO RESULTS FOUND friendly message
   */
   router.post("/realstates/", RealStateController.findBy);
  
export default router;