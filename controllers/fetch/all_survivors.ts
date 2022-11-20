import {Request, Response} from "express";
import survivors from "../../data_store";

const allSurvivors = (req: Request, res: Response) => {
   res.json(survivors)
}

export default allSurvivors