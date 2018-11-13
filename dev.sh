#!/bin/bash

yarn remove @ournet/domain
yarn remove @ournet/images-domain
yarn remove dynamo-item

yarn link @ournet/domain
yarn link @ournet/images-domain
yarn link dynamo-item

yarn test
