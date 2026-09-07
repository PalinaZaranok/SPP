import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import {
    renderIndex,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleUploadFile
} from '../controllers/ssrController';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', renderIndex);
router.post('/tasks/add', handleAddTask);
router.post('/tasks/update/:id', handleUpdateTask);
router.post('/tasks/delete/:id', handleDeleteTask);
router.post('/tasks/upload/:id', upload.single('file'), handleUploadFile);

export default router;