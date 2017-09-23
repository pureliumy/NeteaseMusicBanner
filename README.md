# NeteaseMusicBanner

An interface which returns json data of banners in [Netease Cloud Music](http://music.163.com)

## Usage

```bash
# clone project
git clone https://github.com/pureliumy/NeteaseMusicBanner.git

# install dependencies
npm install

# run locally
node app.js
```

## Banner Type

Each banner object has a ```targetId``` property which means the type of content defined in other property and how to set the banner's link properly, if you want to link the banner image to its content correctly, you will need this. But if you are just care about the banner images, these are useless.

| targetId | banner type | targetId | banner type   |
| -------- | ----------- | -------- | ------------- |
| "1"      | "歌曲"        | "1005"   | "专题"          |
| "10"     | "专辑"        | "1009"   | "电台"          |
| "100"    | "艺人"        | "2000"   | "抽奖活动"        |
| "1000"   | "歌单"        | "2001"   | "熟人抢票"        |
| "1001"   | "电台节目"      | "2003"   | "歌单(webview)" |
| "1002"   | "用户"        | "2004"   | "首发"          |
| "1003"   | "活动"        | "3000"   | "推广"          |
| "1004"   | "MV"        | "3001"   | "直播"          |
| "-1004"  | "明星访谈"      | "4001"   | "动态话题"        |

## License

THE MIT LICENSE