#!/bin/bash
echo 'build 生成生产环境代码'

rm -rf dis && npm run build

echo "上传代码到云主机"

cd dist && scp -i ~/.ssh/private_key.pem -r * file.txt user@129.199.70.72:/var/www/zheye
