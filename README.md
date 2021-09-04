# ** Backend Challenge II **

## Goal
Create a RestfulAPI endpoint to manipulate Real State's CRUD. 

## Stack:
-- Serverless Framework
-- AWS Lambda
-- Amazon RDS - Mysql edition 
-- Node.js
-- Express
-- TypeORM
-- TypeScript
-- Jest
-- Swagger via TSOA - for documentation

## Live DEMO
If you use either postman, or RestClient in VSCode, the links and payloads examples are avaiable [here](https://github.com/Mr-Lopes/keytest-pedro-lopes/blob/master/tests/realstate.endpoint.http) 

## How to deploy to AWS Lambda?
```
 serverless deploy --stage dev
```
> If you're going to deploy to your AWS account, make sure to update a few parameters: VPC & RDS attributes
## How to deploy locally?
```
 serverless offline --stage dev
```

## Testing/Checking AWS RDS Connection
```
 npm t
```

# Regenerate Swagger Documentation
```
 tsoa swagger
 ```