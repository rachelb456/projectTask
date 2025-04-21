export class Task {
    id: number;
    title: string;
    description?: string;
    dueDate: Date;
    isCompleted: boolean = false;

    constructor(id:number,title: string, dueDate: Date, description?: string,isCompleted?: boolean) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.isCompleted = isCompleted || false;
    }
}