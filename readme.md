## 快速创建开发npmjs包的模版配置
``` javascript
// install
npm install -g quick-create-library 
// create a library
quick-create-library create sum
// or 
qcli create sum
```
### 创建项目时参数force
在创建项目qcli create sum时，如果目录下存在此项目时，通过添加force参数可以直接覆盖掉。
不加force参数，如果有重复则会让用户进行选择后续操作。
``` javascript
quick-create-library create sum --force
// or 
qcli create sum -f
```

## 创建项目后的操作
进入创建的项目中
### 首先安装依赖
``` javascript
npm install
// 或者
yarn
```
### 建立仓库，把代码上传仓库
如果没有建立 .git 数据信息，执行后续命令会报错。
先在项目中创建出git数据
### 执行打包命令
``` javascript
yarn run build
```
执行过命令后，会在项目下打包出 dist 目录，用来存放各种格式的包文件

### 启动开发环境
``` javascript
yarn run dev
```
在src/index.js中重新编写包的具体业务内容。
### 执行测试
``` javascript
// 对发布的包执行测试
yarn run test
// 查看项目下测试覆盖率
yarn run test:c
```

### 发布包
``` javascript
yarn run pub:major
// 或者
yarn run pub:minor
// 或者
yarn run pub:patch
```