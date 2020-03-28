export const AppConfiguration = {
    get express() {
        const port = process.env.EXPRESS_PORT || 8080;
        return {
            port
        }
    }
};