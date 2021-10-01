import { Router } from 'express';
import { CustomerController } from '../controllers';

export class CustomerProfileRouter {
  static create() {
    const router = Router();
    const url = '/customers';
    router.post(url, CustomerController.create);
    return router;
  }
}