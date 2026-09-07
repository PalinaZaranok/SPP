import { Task, tasks, getNextId } from '../models/Task';

export function getAllTasks(): Task[] {
    return tasks;
}

export function getTaskById(id: number): Task | undefined {
    return tasks.find(t => t.id === id);
}

export function createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Task {
    const newTask: Task = {
        ...taskData,
        id: getNextId(),
        createdAt: new Date()
    };
    tasks.push(newTask);
    return newTask;
}

export function updateTask(id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    const task = getTaskById(id);
    if (!task) return null;
    Object.assign(task, updates);
    return task;
}

export function deleteTask(id: number): boolean {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
}