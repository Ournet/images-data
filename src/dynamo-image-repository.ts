
// const debug = require('debug')('ournet:images-data');

import DynamoDB = require('aws-sdk/clients/dynamodb');
import {
    BaseRepository,
    RepositoryUpdateData,
    RepositoryAccessOptions,
} from '@ournet/domain';

import {
    Image,
    ImageValidator,
    ImageRepository,
} from '@ournet/images-domain';
import { ImageModel } from './dynamo-image';
import { sortEntitiesByIds } from './helpers';

export class DynamoImageRepository extends BaseRepository<Image> implements ImageRepository {
    protected model: ImageModel

    constructor(client: DynamoDB.DocumentClient, tableSuffix: string) {
        super(new ImageValidator());
        this.model = new ImageModel(client, tableSuffix);
    }

    async innerCreate(data: Image) {
        return await this.model.create(data);
    }

    async innerUpdate(data: RepositoryUpdateData<Image>) {
        return await this.model.update({
            remove: data.delete,
            key: { id: data.id },
            set: data.set
        });
    }

    async delete(id: string) {
        const oldItem = await this.model.delete({ id });
        return !!oldItem;
    }

    async exists(id: string) {
        const item = await this.getById(id, { fields: ['id'] });

        return !!item;
    }

    async getById(id: string, options?: RepositoryAccessOptions<Image>) {
        return await this.model.get({ id }, options && { attributes: options.fields });
    }

    async getByIds(ids: string[], options?: RepositoryAccessOptions<Image>) {
        const items = await this.model.getItems(ids.map(id => ({ id })), options && { attributes: options.fields });

        return sortEntitiesByIds(ids, items);
    }

    async deleteStorage(): Promise<void> {
        await Promise.all([
            this.model.deleteTable(),
        ]);
    }
    async createStorage(): Promise<void> {
        await Promise.all([
            this.model.createTable(),
        ]);
    }
}
