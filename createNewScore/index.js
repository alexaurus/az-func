const CosmosClient = require("@azure/cosmos").CosmosClient;
const endpoint = "get this from azure cosmos db";
const key = "get this from azure cosmos db";
const client = new CosmosClient({ endpoint, key });
const databaseId = "ScoreDB";
const containerId = "Scores";

const database = client.database(databaseId);
const container = database.container(containerId);

module.exports = async function (context, req) {
  let scoreitem = {
    name: req.query.name,
    score: 0,
  };

  const { resource: createdItem } = await container.items.create(scoreitem);

  const responseMessage = "done";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};
