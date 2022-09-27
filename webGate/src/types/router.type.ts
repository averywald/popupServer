import { Methods } from '../models/enums/methods.enum'

export type Router = {
    method: Methods;
    path: string;
    handlerName: string | symbol;
  };