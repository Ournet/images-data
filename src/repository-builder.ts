import DynamoDB = require('aws-sdk/clients/dynamodb');
import { ImageRepository } from '@ournet/images-domain';
import { DynamoImageRepository } from './dynamo-image-repository';


export class RepositoryBuilder {
    static buildImageRepository(client: DynamoDB.DocumentClient, tableSuffix: string = 'v0'): ImageRepository {
        return new DynamoImageRepository(client, tableSuffix);
    }
}
