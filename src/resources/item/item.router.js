import { Router } from 'express'

import {
  deleteItemById,
  getItemById,
  getItems,
  postItem,
  putItemById
} from './item.controllers'
const router = Router()

router
  .route('/')
  .get(getItems)
  .post(postItem)
router
  .route('/:id')
  .get(getItemById)
  .put(putItemById)
  .delete(deleteItemById)

export default router
