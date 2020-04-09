# Do it

这是腾讯云云开发校园布道师极限编程项目，下面介绍一下这个小程序的功能，小程序主要的用途就是用来打卡，可以是班级外出活动是点人的打卡，作业的打卡，社团活动时的打卡。

## 技术架构
- 小程序：使用微信小程序原生架构
- vantweapp组件和weui
- 云开发：使用云开发的数据库，使用云存储来存储图片，云函数解决权限问题

## 图片展示
首页
![avatar](https://7478-txzs-zzsg-1300611051.tcb.qcloud.la/gitpic/shouye.jpg?sign=69b3f089260eca5c5a16b88da9ac6385&t=1586168170)

我的
![avatar](https://7478-txzs-zzsg-1300611051.tcb.qcloud.la/gitpic/my.jpg?sign=2e72bf41c6c7038d4460e701a1900e3c&t=1586168208)

打卡界面
![avatar](https://7478-txzs-zzsg-1300611051.tcb.qcloud.la/gitpic/card.jpg?sign=c7f8f44b2d6d18494c6106ed082f025b&t=1586168234)

历史创建打卡
![avatar](https://7478-txzs-zzsg-1300611051.tcb.qcloud.la/gitpic/daka.jpg?sign=dc1cc70e02d2b87ccbc848e9c51187cd&t=1586168355)

打卡详情
![avatar](https://7478-txzs-zzsg-1300611051.tcb.qcloud.la/gitpic/chakan.jpg?sign=e0049b6c4b671b455565dc46547cca0e&t=1586168298)

创建者对打卡的评价
![avatar](https://7478-txzs-zzsg-1300611051.tcb.qcloud.la/gitpic/pigai.jpg?sign=56e010b916598dfb1f01f68a596e3849&t=1586168334)

- 只要注册过后，打卡时班级姓名学号就会自动补全，只需要填写打卡编号，在根据自己的选择是否上传照片，文字等。

- 打卡者可以看见所有打卡信息，并且可以做出评价
## 部署教程
- 首先app.js里面环境先修改成自己的
- 部署两个云函数
- 部署云数据库集合"adminclass",保存创建打卡信息
- 部署云数据库集合"card",保存个人打卡信息
- 部署云数据库集合"userInfo",保存个人信息
## 开源许可证标注
- License is [MIT](https://opensource.org/licenses/MIT)
## 技术文档
- [小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [vantweapp文档](https://youzan.github.io/vant-weapp/#/intro)