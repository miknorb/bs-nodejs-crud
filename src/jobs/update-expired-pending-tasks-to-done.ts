import Axios from "axios";
import {AppConfiguration} from "../app-configuration";
import {ITask, IUser} from "../types";

const request = Axios.create({baseURL: AppConfiguration.api.url.href, timeout: 10000});

export async function updateExpiredPendingTasksToDone() {
    console.log("Running task: update expired pending tasks to done");
    const updateTask = (userId: string, taskId: string) =>
        request.put(`/users/${userId}/tasks/${taskId}`, {status: "done"});
    const users: IUser[] = (await request.get(`/users`)).data;
    const now = new Date();
    const promises: Promise<any>[] = [];
    let count = 0;
    for (let user of users) {
        const expiredTasks = user.tasks.filter(task => task.status === "pending" && new Date(task.date_time).getTime() < now.getTime());
        expiredTasks.forEach(task => promises.push(updateTask(user._id, task._id)));
        count += expiredTasks.length;
    }
    Promise.all(promises).then(() => console.log(`${count} number of expired tasks updated to done!`));
}