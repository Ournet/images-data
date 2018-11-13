
import DynamoDB = require('aws-sdk/clients/dynamodb');
import { Image } from "@ournet/images-domain";
import {
    DynamoItem,
} from 'dynamo-item';

export class ImageModel extends DynamoItem<{ id: string }, Image> {
    constructor(client: DynamoDB.DocumentClient, tableSuffix: string) {
        super({
            hashKey: {
                name: 'id',
                type: 'S'
            },
            name: 'images',
            tableName: `ournet_images_${tableSuffix}`,
        }, client as any);
    }
}
