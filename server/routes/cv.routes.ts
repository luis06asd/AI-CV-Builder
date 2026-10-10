import { Router } from 'express';
import {
  accessCVController,
  createCVController,
  deleteCVController,
  getCVController,
  updateCVController,
} from '../controllers/cv.controller.js';
import { requireCVAccess } from '../middleware/cv-auth.middleware.js';

const cvRouter = Router();

cvRouter.post('/', createCVController);
cvRouter.post('/access', accessCVController);
cvRouter.get('/:id', requireCVAccess, getCVController);
cvRouter.put('/:id', requireCVAccess, updateCVController);
cvRouter.delete('/:id', requireCVAccess, deleteCVController);

export default cvRouter;
