import cron from "node-cron";
import {updateExpiredPendingTasksToDone} from "./update-expired-pending-tasks-to-done";

const cronServices = {
    updateTasks: updateExpiredPendingTasksToDone
};

const runningServices: {[key: string]: cron.ScheduledTask} = {};

export function startCronService(service: keyof typeof cronServices, schedule: string) {
    if (!cron.validate(schedule)) {
        throw new Error("Invalid cron service schedule");
    }
    if (runningServices[service]) {
        throw new Error("Service already running!");
    }
    runningServices[service] = cron.schedule(schedule, cronServices[service]);
}

export function stopCronService(service: keyof typeof cronServices) {
    const runningService = runningServices[service];
    if (!runningService) {
        throw new Error(`Service with name ${service} is not running!`);
    }
    runningService.stop().destroy();
}