"use strict";

const Project = use("App/Models/Project");

class ProjectController {
  async index({ auth }) {
    const user = await auth.getUser();
    return await user.projects().fetch();
  }

  async store({ auth, request }) {
    const user = await auth.getUser();
    const { title } = request.all();
    const project = new Project();
    project.title = title;
    await user.projects().save(project);

    return project;
  }

  async destroy({ request }) {
    const project = request.project;
    project.delete();
    return project;
  }

  async update({ params, request }) {
    const project = await Project.find(params.id);
    const { title } = request.all();
    project = {
      title,
    };

    await user.projects().save(project);
  }
}

module.exports = ProjectController;
