# dynamic-image

fork 本项目，然后直接部署到cloudflare pages

构建命令：npm run build

构建输出目录：dist

管理后台密码变量名：ADMIN_PASSWORD

KV数据库变量名：DYNAMIC_IMAGE

图片获取接口：/api

获取所有图片配置：/api/links

![](https://github.com/ltxlong/dynamic-image/raw/main/demo/dynamic_image_home.png)

![](https://github.com/ltxlong/dynamic-image/raw/main/demo/dynamic_image_admin.png)

# 功能

- 图片链接的增删改查、激活/暂停（ /api接口返回的是激活状态的链接 ）

- 限制访问：只有设置了的域名才可以访问 /api 接口来获取图片

- 显示模式：

随机模式-所有链接随机返回一条

标签模式-基于优先级：

日标签 > 周标签 > 月标签

日标签是日期范围

周标签可以多选

月标签可以多选

如果有多个url有相同的标签，那么这些链接随机返回一条

如果没有对应的标签，那么切换为随机模式查找

[![Star History Chart](https://api.star-history.com/svg?repos=ltxlong/dynamic-image&type=Date)](https://star-history.com/#ltxlong/dynamic-image&Date)
