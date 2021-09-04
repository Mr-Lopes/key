import { NextFunction, Request, Response } from 'express';
import DBFactory  from "../db";
import "reflect-metadata";
import RealState from '../db/entity/RealState';
import RealStateInterface from '../db/entity/RealState';

import {
    Body,
    Delete,
    Get,
    Post,
    Put,
    Route,
  } from "tsoa";

@Route("/api/v1/realstate/")
export default class RealStateController {
    
    /**
     * Handles a new Real State creation
     * @param req.body
     */
    @Post()
    static create(@Body() params: RealStateInterface) {
        return new Promise<RealState>((resolve, reject) => {
            new DBFactory().getConnection().then(async conn => {
            
                let newRealState = new RealState(params);
                await newRealState.save().catch(ex => {
                    throw new Error('Oops! Something went wrong when adding your real state');
                });

                resolve(newRealState);
       
            }).catch(reject);
        });
    }

    /**
     * Handles Real State update
     * @param req.body
     */
     @Put("/{id}") 
     static update(id:number, @Body() params: RealStateInterface) {
         return new Promise<RealState>((resolve, reject) => {
             new DBFactory().getConnection().then(async conn => {
                
                 const [foundRealState] = id ? await RealState.findByIds([id]) : [];

                 if (foundRealState?.id == id) {
                     foundRealState.mutate(params);
                     await foundRealState.save().catch(ex => {
                         throw new Error('Oops! Something went wrong when updating your real state');
                     });
                 }

                 resolve(foundRealState);
                
             }).catch(reject);
         });
    }

    /**
     * Handles Real State update
     * @param req.params.id
     */
    @Delete("/{id}")
    static delete(id : number) {
        return new Promise<Boolean>((resolve, reject) => {
            new DBFactory().getConnection().then(async conn => {
               
                const [foundRealState] = id ? await RealState.findByIds([id]) : [];

                if (foundRealState?.id == id) {
    
                    await foundRealState.remove().catch(ex => {
                        throw new Error('Oops! Something went wrong when deleting your real state');
                    });

                    resolve(true);
                } else
                    resolve(false);
             
            }).catch(reject);
        });
    }

    /**
     * Views an existing Real State
     * @param req.params.id
     */
    @Get("/{id}")
    static find(id : number){
        return new Promise<RealState>((resolve, reject) => {
            new DBFactory().getConnection().then(async conn => {

                const [foundRealState] = id ?
                    await RealState.findByIds([id]).catch(ex => {
                        throw new Error('Oops! Something went wrong when viewing your real state');
                    }) : [];

                if (foundRealState?.id == id) {
                    // Increments the number of views/hits
                    foundRealState.numberOfViews += 1;
                    await foundRealState.save().catch(ex => {
                        // Ignores the error in order to let the user view the property
                    });;
                }

                resolve(foundRealState);

            }).catch(reject);
        });

    }

     /**
     * Views ALL Real State that matches the params criteria
     * @param req.body
     */
    @Post("/realstates/")
    static findBy(@Body() params : RealStateInterface) {
        return new Promise<RealState[]>((resolve, reject) => {
            new DBFactory().getConnection().then(async conn => {
                
                resolve(
                    await RealState.find({ where: params }).catch(ex => {
                        throw new Error('Oops! Something went wrong when searching for real states');
                    })
                );

            }).catch(reject);
        });
    }
}
