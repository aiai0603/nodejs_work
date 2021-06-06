# nodejs 游戏服务器
ZUCC 跨平台脚本大作业——nodejs游戏服务器

使用技术

前端：html+js+jquery

后台：nodejs+express+mysql

使用方式：

1.打开nodejs文件夹，打开db文件夹，进入db.js 修改数据库连接

2.打开html文件夹，打开js，进入http.js,修改地址为你本机的连接地址，一般是 127.0.0.1:3000

3.进入nodejs文件夹，npm install安装依赖到本地，然后node index.js启动后台（默认3000端口，可以自己修改）

4.返回主文件夹，node server.js启动前端（不用node启动的话cookie无效）

5.打开localhost:8080

作者已经部署了服务，可以在线尝试一下效果

使用forever部署后台，tomcat部署前端

测试网址：http://47.97.158.11:8087/nodejs/html/index.html