const IdeaController = require('../controllers/idea.controller');
const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.get("/api/idea/", IdeaController.findAllIdeas);
    app.get("/api/idea/:id", IdeaController.findSingleIdea);
    app.delete("/api/idea/:id", IdeaController.deleteSingleIdea);
    app.post("/api/idea/", IdeaController.createNewIdea);
    app.put("/api/idea/:id", IdeaController.updateIdea);

    app.get("/api/user/:id", UserController.findUser);
    app.post("/api/user/login", UserController.loginUser);
    app.post("/api/user/register", UserController.registerUser);
};