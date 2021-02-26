"use strict";

const InvalidAccessException = require("../Exceptions/InvalidAccessException");
const NoSuchResourceException = require("../Exceptions/NoSuchResourceException");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use("App/Models/Project");

class Authorization {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, params, auth }, next) {
    // call next to advance the request
    const loginUser = await auth.getUser();

    const { id } = params;
    const project = await Project.find(id);
    if (!project) {
      throw new NoSuchResourceException();
    }

    if (project.user_id !== loginUser.id) {
      throw new InvalidAccessException();
    }

    request.project = project;

    await next();
  }
}

module.exports = Authorization;
