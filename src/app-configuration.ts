export const AppConfiguration = {
    get express() {
        const port = process.env.EXPRESS_PORT || 8080;
        return {
            port
        }
    },
    get db() {
        const uri = "mongodb://localhost/";
        const dbName = "bs-crud";
        return uri + dbName;
    },
    get api() {
        const baseUrl = "http://localhost";
        const port = "8080";
        const prefix = "/api";
        console.log(baseUrl + (port ? `:${port}` : "") + (prefix ?? ""));
        return {
            baseUrl,
            port,
            prefix,
            url: new URL(baseUrl + (port ? `:${port}` : "") + (prefix ?? ""))
        }
    }
};
