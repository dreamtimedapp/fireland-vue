# 引用工程路径
PROJECT_PATH=/home/ubuntu/fireland-vue

# 工程构建完成后存放的路径
BUILD_PATH=${PROJECT_PATH}/product/

# 页面部署在Nginx上的路径
NGINX_DEPLOY_PATH=${PROJECT_PATH}/dist/

cd  ${PROJECT_PATH}

git checkout master

git pull origin master

npm install $PROJECT_PATH 

npm run build $BUILD_PATH

# 删除旧构建文件
rm -r ${NGINX_DEPLOY_PATH}*

cp -R ${BUILD_PATH}* $NGINX_DEPLOY_PATH

node app.js



