# REACT GALLERY

## 技术栈

react@16.0 + redux@3.7.2 + react-router@3.2.0 + webpack@3.10.0 + axios@0.18.0 + less@2.7.1 + antd@3.1.3

## 项目运行


```
git clone https://github.com/wulichenyang/react-gallery.git  

cd react-gallery （进入当前的项目）

npm install  (安装依赖包)

npm run dev (运行本地开发环境)

npm run mock (运行 mockjs http://highsea90.com/t/mock/)

npm run build (打包，部署)

npm run mongo (运行连接本地 mongodb :27017)

```

服务端返回的格式定义这样一个数据结构

```
{
  data: {
    totalCount: 100,
    currentPage: 1,
    pageSize: 10,
    'list': [
    ],
  },
  msg: '',
  status: 0/1 (0 -> success / 1 -> error)
}

```
