"use strict";

const User = use("App/Models/User");

class UserController {
  async register({ request }) {
    const { email, password } = request.all();
    await User.create({
      username: email,
      email,
      password,
    });
    return this.login(...arguments);
  }

  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }
}

module.exports = UserController;
