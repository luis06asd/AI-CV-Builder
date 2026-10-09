import { Router } from 'express';
import {
  createCVController,
  deleteCVController,
  getCVController,
  updateCVController,
} from '../controllers/cv.controller.js';

const cvRouter = Router();

cvRouter.post('/', createCVController);
cvRouter.get('/:id', getCVController);
cvRouter.put('/:id', updateCVController);
cvRouter.delete('/:id', deleteCVController);

export default cvRouter;
