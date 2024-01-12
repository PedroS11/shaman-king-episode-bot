import pino from "pino";

export const Logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "UTC:yyyy-mm-dd HH:MM:ss.l",
            colorize: true,
            ignore: "pid,hostname", // --ignore
        },
    },
});
