# 艾宾浩斯复习日历

一个纯静态的艾宾浩斯记忆法复习 App。用户记录学习日期、类别和知识点后，应用会按照 `1 / 3 / 7 / 14 / 30 / 60` 天自动生成复习计划，并通过日历查看每天要复习的内容。

## 功能

- 记录学习日期、类别、知识点和备注
- 自动生成艾宾浩斯复习节点
- 日历查看每天复习任务
- 选中日期查看当天复习清单
- 标记复习节点为已完成
- 知识库搜索、分类筛选、排序和分页
- 手机端底部导航
- 中文 / 日本語 / English 三语界面切换
- 数据保存在当前浏览器本地
- 可选 Supabase 云数据库，支持不同用户登录后保存自己的内容

## 本地预览

```bash
python3 -m http.server 5175
```

然后打开：

```text
http://localhost:5175
```

## GitHub Pages 部署

1. 在 GitHub 创建一个新的 public 仓库。
2. 把本目录里的文件上传到仓库根目录。
3. 进入仓库的 `Settings` -> `Pages`。
4. 在 `Build and deployment` 里选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub Pages 生成网址。

## 开启云数据库和多用户

1. 在 Supabase 创建项目。
2. 打开项目的 `SQL Editor`。
3. 复制本项目的 `database.sql` 内容并运行。
4. 在 Supabase 的 `Project Settings` -> `API` 里复制 Project URL 和 publishable anon key。
5. 修改 `supabase-config.js`：

```js
window.EBBINGHAUS_SUPABASE_URL = "你的 Project URL";
window.EBBINGHAUS_SUPABASE_ANON_KEY = "你的 publishable anon key";
```

6. 重新提交并 push 到 GitHub。
7. 打开 GitHub Pages 地址，注册或登录后即可云端保存数据。

## 说明

未配置 Supabase 时，这是一个前端静态 App，数据只保存在当前浏览器本地。配置 Supabase 后，每个登录用户只能读写自己的内容。
