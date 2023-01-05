import { Request, Response } from "express";

const Controller =
  (
    callback: (req: Request) => Promise<object>,
    _success: string = "success",
    _error: string = "error",
    _error_code: number = 400,
    _success_code: number = 200
  ) =>
  async (req: Request, res: Response) => {
    try {
      return res.status(_success_code).json({
        message: _success,
        ...(await callback(req)),
      });
    } catch (error) {
      console.log(error);
      return res.status(_error_code).json({
        message: _error,
        error: error instanceof Error ? error.message : error,
      });
    }
  };

export default Controller;
