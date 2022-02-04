const CosmosClient = require("@azure/cosmos").CosmosClient;
const endpoint = "https://funkyapiv5.documents.azure.com:443/";
const key =
  "OQIVzePZcMiCUVbGCP90Q2CVuHECCK8hu1uS3xrSi28QdSHEagQ7cKOCdMNqzqe13PeV8Y2sWM5WOMQ1OIAt6w==";
const client = new CosmosClient({ endpoint, key });
const databaseId = "ScoreDB";
const containerId = "Scores";

const database = client.database(databaseId);
const container = database.container(containerId);

module.exports = async function (context, req) {
  let querySpec = {
    query: "SELECT * FROM Scores s WHERE s.name =" + "'" + req.query.name + "'",
  };

  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  let scoreObj = items[0];
  let scoreId = scoreObj.id;
  let scoreValue = scoreObj.score;

  scoreObj.score = scoreValue + 1;

  const { resource: updateditem } = await container
    .item(scoreId)
    .replace(scoreObj);

  const responseMessage = "score increased by 1";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};
