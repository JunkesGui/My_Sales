import { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) =>{
  return response.json({message: 'Hello, Im healthy'});
});

export default routes;
