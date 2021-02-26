"use strict";

const Task = use("App/Models/Task");

class TaskController {
  async store({ request }) {
    const project = request.project;
    const { description, finish } = request.all();

    console.log(project);
    const task = new Task();
    task.fill({
      description,
      finish,
    });
    //description
    await project.tasks().save(task);

    return task;
  }

  async index({ request }) {
    const project = request.project;
    const tasks = await project.tasks().fetch();

    return tasks;
  }

  async destroy({ request }) {
    const task = request.task;
    await task.delete();

    return task;
  }

  async update({ request }) {
    const task = request.task;
    task.merge(request.only(["description", "finish"]));
    await task.save();
    return task;
  }
}

module.exports = TaskController;
