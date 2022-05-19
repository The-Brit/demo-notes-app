import handler from "./util/handler";
import dynamodb from "./util/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        // 'Key' defines the retrieval item partition key and sort key
        Key: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,  // The id of the author
            noteId: event.pathParameters.id,    // The id of the note from the path
        }
    };

    const results = await dynamodb.get(params);
    if (!results.Item) {
        throw new Error("Item not found");
    }

    // Return the retrieved item
    return results.Item;
});