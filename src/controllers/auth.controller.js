import * as authService from '../services/auth.service.js';
import { successResponse } from '../utils/response.js';

export const register = async (req, res) => {
  const user = await authService.register(req.body);

  return successResponse(
    res,
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    'Usuario registrado',
    201
  );
};

export const login = async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);

  return successResponse(res, result, 'Inicio de sesión exitoso');
};
