const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const checkId = (request, response, next) => {
  const { id } = request.params

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid repository id" })
  }

  return next()
}
app.use('/repositories/:id', checkId)

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const likes = 0

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response
      .status(400)
      .json({ error: "Repository not found" })
  }

  const repositoryUpdated = { ...repositories[repositoryIndex], title, url, techs }

  repositories[repositoryIndex] = repositoryUpdated

  return response.json(repositoryUpdated)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response
      .status(400)
      .json({ error: "Repository not found" })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response
      .status(400)
      .json({ error: "Repository not found" })
  }

  const repositoryUpdated = repositories[repositoryIndex]

  repositoryUpdated.likes += 1

  repositories[repositoryIndex] = repositoryUpdated

  return response.json(repositoryUpdated)
});

module.exports = app;
