# 夜色弦音 · 小提琴社招新网站

> 《Web 前端技术》第二次上机作业（work2）
> 姓名：赵萱　学号：202511160442（末位 2 → 小提琴社）
> 页面文件：`zhao-0442-work2.html`

## 一、如何查看

- **直接双击** `zhao-0442-work2.html` 即可在浏览器中打开（无需服务器）。
- 仓库根目录另有一个 `index.html`，会自动跳转到 `zhao-0442-work2.html`，
  因此部署到 GitHub Pages 后，直接访问仓库主页也能进入。

## 二、目录结构

```
├── index.html                  # 入口，自动跳转到主页面
├── zhao-0442-work2.html        # 主页（招新网站，7 项功能全部在此）
├── club_intro.html             # 社团介绍页，从主页图片点进去，可返回
├── css/
│   └── style.css               # 全部样式（手写，无第三方框架）
├── js/
│   └── main.js                 # 音乐播放、锚点滚动、入场动画、表单校验
├── assets/
│   ├── img/
│   │   ├── club-poster.jpg     # 主视觉「琴弦与弓」
│   │   └── hero.jpg            # 首屏背景（同一画面的无字版本）
│   ├── audio/
│   │   └── violin-theme.mp3    # 社歌《夜色弦音》，42 秒，128 kbps
│   └── video/
│       └── club-clip.mp4       # 招新短片，5 秒，1280×720，约 240 KB
└── README.md
```

## 三、作业 7 项功能与实现位置

| # | 要求 | 实现位置 |
|---|------|----------|
| 1 | 左上角点击播放背景音乐 | 左上角圆形音符按钮 `#musicBtn` + `<audio id="bgm">`；点击切换播放/暂停，播放时按钮出现波纹与跳动动画（`js/main.js` 第 1 节） |
| 2 | 五对锚点链接 + 五处返回顶部 | 顶部导航五个链接分别指向 `#intro` `#schedule` `#gallery` `#stories` `#signup`；五个区块末尾各有一个「↑ 返回顶部」，指向 `#top` |
| 3 | 活动安排表（跨行、跨列） | 表格第一行为 `colspan="4"` 的标题「小提琴社 2026 年春季学期活动安排表」；第二行表头整体居中；「新成员见面会」与「小提琴基础教学公开课」共用同一个 `rowspan="2"` 的教室单元格（A101）；「周次」列也用 `rowspan` 合并 |
| 4 | 插入图片，点击跳转 `club_intro.html` | 风采展示区的图片外层包 `<a href="club_intro.html">`；介绍页底部有「← 返回小提琴社招新主页」按钮 |
| 5 | `embed` 导入 mp4 | 风采展示区 `<embed src="assets/video/club-clip.mp4" type="video/mp4">`，另附「点此下载」的兜底链接 |
| 6 | 社员故事（1000 字以上）+ 返回顶部 | `#stories` 区块，正文约 1200 字，配两段社员引语，末尾有返回顶部按钮 |
| 7 | 在线报名表（10 项，全部在表格中） | `table.enroll` 共 10 行：①姓名 text、②性别 radio、③出生日期 年/月/日 text、④手机与邮箱 text、⑤是否有小提琴基础 radio、⑥兴趣方向 checkbox、⑦年级下拉框（大一—研究生）、⑧自我介绍 textarea、⑨是否服从活动安排 radio、⑩提交 submit + 重置 reset |

此外还做了：粘性导航、首屏视差背景、滚动入场动画、卡片悬停放大、移动端响应式布局、
表单前端校验（姓名、日期、手机号、邮箱、年级、兴趣方向、自我介绍长度）与提交提示。

## 四、素材说明

作业要求中的 AI 图片、AI 音乐、剪映视频，本次均使用**原创合成素材**代替：

- **图片**：用 Python（Pillow + NumPy）绘制的「琴弦与琴弓」主视觉，暖色舞台光与虚化光斑，1600×1000；
- **音乐**：用 Karplus-Strong 拨弦合成与弓弦音色合成的 42 秒乐曲（Am–F–C–G 走向），
  经 LAME 编码为 128 kbps MP3；
- **视频**：由主视觉图片配合缓慢推镜与淡入淡出，用 ffmpeg 编码为 5 秒 H.264 MP4（约 240 KB，
  远小于 GitHub 单文件限制）。

> 如果你希望换成文心一言 / 海绵音乐生成的真实素材，只需用同名文件覆盖
> `assets/img/club-poster.jpg`、`assets/audio/violin-theme.mp3`、`assets/video/club-clip.mp4`
> 即可，页面代码无需改动。

## 五、部署到 GitHub Pages

1. 新建仓库（例如 `violin-club`），把本目录下所有文件上传到仓库根目录；
2. 进入 **Settings → Pages**，Source 选择 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`；
3. 等待一两分钟，访问
   `https://<你的用户名>.github.io/violin-club/zhao-0442-work2.html`；
   直接访问 `https://<你的用户名>.github.io/violin-club/` 会由 `index.html` 自动跳转。

## 六、浏览器兼容

在 Edge / Chrome / Firefox 最新版下测试通过；音频需要用户点击后才能播放（浏览器自动播放策略），
因此音乐按钮采用「点击播放」而不是自动播放。
