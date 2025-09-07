import { Response, Request } from "express";
// PATH : /search/result
export const result = (req: Request, res: Response) => {
  res.send("Result Page");
};
