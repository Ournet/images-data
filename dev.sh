#!/bin/bash

yarn remove @ournet/domain
yarn remove @ournet/images-domain
yarn remove dynamo-model

yarn link @ournet/domain
yarn link @ournet/images-domain
yarn link dynamo-model

yarn test
