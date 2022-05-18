export default function handler(lambda) {
    return async function(event, context) {
        let body, statusCode;

        try {
            // Run the Lambda
            body = await lambda(event, context);
            statusCode = 200
        }
        catch (ex) {
            console.log(ex);
            body = { error: ex.message }
            statusCode = 500
        }

        // Return the HTTP response
        return {
            statusCode,
            body: JSON.stringify(body)
        };
    };
}