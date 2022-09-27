/**
 * the keys defined here are used
 * to define metadata key-value pairs
 * on route controller classes;
 * 
 * they are then used to parse controllers
 * for properties to bind to the express 
 * API's dynamically-created routers;
 */
export enum MetadataKeys {
  // the base directory of a controller in the API scheme
  BASE_PATH = 'base_path',
  // a collection to hold all of the specific routes in controller
  ROUTERS = 'routers',
  // a collection to hold middleware functions for a controller
  MIDDLEWARE = 'middleware'
}
