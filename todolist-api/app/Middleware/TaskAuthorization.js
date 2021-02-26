"use strict";

const InvalidAccessException = require("../Exceptions/InvalidAccessException");
const NoSuchResourceException = require("../Exceptions/NoSuchResourceException");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Task = use("App/Models/Task");

class TaskAuthorization {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */

  async handle({ request, params, auth }, next) {
    const user = await auth.getUser();
    const taskId = params.id;
    const task = await Task.find(taskId);

    console.log(taskId);
    console.log(task);

    if (!task) {
      throw new NoSuchResourceException();
    }

    const project = await task.project().fetch();

    console.log(project.user_id);
    console.log(user.id);

    if (project.user_id !== user.id) {
      throw new InvalidAccessException();
    }

    request.task = task;

    // call next to advance the request
    await next();
  }
}

module.exports = TaskAuthorization;
