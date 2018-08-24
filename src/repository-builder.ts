import DynamoDB = require('aws-sdk/clients/dynamodb');
import { ImageRepository } from '@ournet/images-domain';
import { DynamoImageRepository } from './dynamo-image-repository';


export class ImageRepositoryBuilder {
    static build(client: DynamoDB.DocumentClient, tableSuffix: string = 'v0'): ImageRepository {
        return new DynamoImageRepository(client, tableSuffix);
    }
}
