
import DynamoDB = require('aws-sdk/clients/dynamodb');
import { Image } from "@ournet/images-domain";
import {
    DynamoModel,
} from 'dynamo-model';

export class ImageModel extends DynamoModel<{ id: string }, Image> {
    constructor(client: DynamoDB.DocumentClient, tableSuffix: string) {
        super({
            hashKey: {
                name: 'id',
                type: 'S'
            },
            name: 'images',
            tableName: `ournet_images_${tableSuffix}`,
        }, client);
    }
}
