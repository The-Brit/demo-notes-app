import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import StorageStack from "../stacks/StorageStack";

test("Test StorageStack", () => {
    const app = new sst.App();
    //When
    const stack = new StorageStack(app, "test-stack");
    //Then
    const template = Template.fromStack(stack);
    template.hasResourceProperties("AWS::DynamoDB::Table", {
        BillingMode: "PAY_PER_REQUEST"
    });
});