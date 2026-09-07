export interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'new' | 'in-progress' | 'done';
    dueDate: string;
    file?: string;
    createdAt: Date;
}

export const tasks: Task[] = [];

let nextId = 1;
export function getNextId(): number {
    return nextId++;
}