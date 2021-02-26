"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  Route.post("register", "UserController.register");
  Route.post("login", "UserController.login");
}).prefix("api/auth");

Route.group(() => {
  Route.get("/", "ProjectController.index");
  Route.post("/store", "ProjectController.store");
  Route.delete("/:id", "ProjectController.destroy").middleware(["rightUser"]);
  Route.patch("/:id", "ProjectController.update").middleware(["rightUser"]);
})
  .prefix("api/project")
  .middleware(["auth:jwt"]);
