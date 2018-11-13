#!/bin/bash

yarn unlink @ournet/domain
yarn unlink @ournet/images-domain
yarn unlink dynamo-item

yarn add @ournet/domain
yarn add @ournet/images-domain
yarn add dynamo-item

yarn test
