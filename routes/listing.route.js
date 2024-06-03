import express from 'express';
import {
  createListing,
  deleteListing,
  getListing,
  getSearchListing,
  updateListing,
} from '../controller/listing.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyUser, createListing);
router.post('/update/:id', verifyUser, updateListing);
router.get('/getListings/:id', verifyUser, getListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.get('/get', getSearchListing);

export default router;
