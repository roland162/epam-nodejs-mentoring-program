import expressWinston from "express-winston";
import winstonLogger from "../config/loggerConfig";

export const logger = expressWinston.logger({
  winstonInstance: winstonLogger,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
});
