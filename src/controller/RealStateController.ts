import { Request, Response } from 'express';
import DBFactory  from "../db";
import "reflect-metadata";
import RealState from '../db/entity/RealState';
import RealStateInterface from '../db/entity/RealState';

export default class RealStateController {

    /**
     * Handles a new Real State creation
     * @param req.body
     */
    public static create(req: Request, res: Response): void{
        new DBFactory().getConnection().then(async conn => {
           
            let newRealState = new RealState(req.body);
            
            await newRealState.save().catch(ex => {
                return res.status(500).json({
                    message: "Opps! Something went wrong...",
                    details: ex.message,
                  });
            });

            return res.status(200).json({
                message: "Created Successfuly!",
                id: newRealState.id
              });
        
        }).catch(ex => {
            return res.status(500).json({
                message: "Opps! Something went wrong...",
                details: ex.message,
              });
        });      
    }

    /**
     * Handles Real State update
     * @param req.body
     */
    public static update(req: Request, res: Response): void{
        
        new DBFactory().getConnection().then(async conn => {
               
            const id = Number(req.params.id);
            const [foundRealState] = id? await RealState.findByIds([id]) : [];

            if (foundRealState && foundRealState.id == id) {
                foundRealState.mutate(req.body);
                await foundRealState.save();

                return res.status(200).json({
                    message: "Updated Successfuly!",
                });

            } else {
                return res.status(404).json({
                    message: "Real State not found. Check your ID",
                });
            }
            
        });

    }

    /**
     * Handles Real State update
     * @param req.params.id
     */
    public static delete(req: Request, res: Response): void{
        new DBFactory().getConnection().then(async conn => {
               
            const id = Number(req.params.id);
            const [foundRealState] = id? await RealState.findByIds([id]) : [];

            if (foundRealState && foundRealState.id == id) {
                await foundRealState.remove();

                return res.status(200).json({
                    message: "Deleted Successfuly!",
                });

            } else {
                return res.status(404).json({
                    message: "Real State not found. Check your ID",
                });
            }
            
        });
    }

    /**
     * Views an existing Real State
     * @param req.params.id
     */
    public static find(req: Request, res: Response): void{
        
        new DBFactory().getConnection().then(async conn => {
            return res.status(200).json({
                result: await RealState.findByIds([Number(req.params.id)]),
            });
        });

    }

     /**
     * Views ALL Real State that matches the params criteria
     * @param req.body
     */
    public static findBy(req: Request, res: Response): void{
        
        new DBFactory().getConnection().then(async conn => {
            return res.status(200).json({
                results: await RealState.find({where: req.body as RealStateInterface}),
            });
        });
    }
}