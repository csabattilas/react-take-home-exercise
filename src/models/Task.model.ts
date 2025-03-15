export enum TaskStatus {
    NEW,
    IN_PROGRESS,
    COMPLETED,
}

export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}