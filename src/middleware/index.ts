import { NextFunction, Request } from "express";

function notFound(req:Request, res:any, next:NextFunction) {
    res.status(404);
    const error = new Error(`Oops - Request Not Found - ${req.url}`);
    next(error);
  }
  

  function errorHandler(err:Error, req:any, res:any, next:NextFunction) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '💻' : err.stack
    });
  }
  
  export default {
    notFound,
    errorHandler
  };