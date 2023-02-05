import type { Application, Router } from "express";
import * as ROUTES from "../components";

const _routes: [string, Router][] = [
  ["patient", ROUTES.Patient_Router], 
  ["doctor", ROUTES.DoctorRouter], 
  ["checkup", ROUTES.CheckupRouter],
  ["specialties", ROUTES.SpecialtiesRouter]
];

const routes = (app: Application): void => {
  _routes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`, controller);
  });
};

export default routes;