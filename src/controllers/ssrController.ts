import { Request, Response } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import {Task} from "../models/Task";

//GET /
export function renderIndex(req: Request, res: Response) {
    const statusFilter = req.query.status as string || 'all';
    let filtered = getAllTasks();
    if (statusFilter !== 'all') {
        filtered = filtered.filter(t => t.status === statusFilter);
    }
    res.render('index', {
        tasks: filtered,
        statusFilter,
        statuses: ['new', 'in-progress', 'done']
    });
}
//POST /tasks/add
export function handleAddTask(req: Request, res: Response) {
    const { title, description, status, dueDate } = req.body;
    if (!title || !dueDate) {
        return res.status(400).send('Название и дата обязательны');
    }
    createTask({ title, description, status, dueDate });
    res.redirect('/');
}
// POST /tasks/update/:id
export function handleUpdateTask(req: Request, res: Response) {
    const id = parseInt(<string>req.params.id);

    const { title, description, status, dueDate } = req.body;
    const updates: Partial<Omit<Task, 'id' | 'createdAt'>> = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;
    if (dueDate !== undefined) updates.dueDate = dueDate;

    const updated = updateTask(id, updates);
    if (!updated) {
        return res.status(404).send('Задача не найдена');
    }
    res.redirect('/');
}

//POST /tasks/delete/:id
export function handleDeleteTask(req: Request, res: Response) {
    const id = parseInt(<string>req.params.id);
    const deleted = deleteTask(id);
    if (!deleted) {
        return res.status(404).send('Задача не найдена');
    }
    res.redirect('/');
}

// POST /tasks/upload/:id
export function handleUploadFile(req: Request, res: Response) {
    const id = parseInt(<string>req.params.id);
    if (req.file) {
        updateTask(id, { file: req.file.filename });
    }
    res.redirect('/');
}