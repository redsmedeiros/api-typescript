import { Router } from 'express';
import UserController from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/Middlewares/isAuthenticated';

const userRoutes = Router();

const userController = new UserController();

userRoutes.get('/', isAuthenticated, userController.index);
userRoutes.get('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}),
userController.show);


userRoutes.post('/',
celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        avatar: Joi.string().required()
    }
}),
userController.create);

userRoutes.put('/:id',
celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}),
userController.update);

userRoutes.delete('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}),
userController.delete);

export default userRoutes;
