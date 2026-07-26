---
title: '@antv npm供应链攻击 — Mini Shai-Hulud 事件分析'
short_title: '@antv供应链攻击'
date: 2026-05-19 10:00:00
description: 'Socket 安全团队发现 @antv 生态遭遇大规模 npm 供应链攻击，639 个恶意版本波及 323 个包，攻击者利用窃取的 npm 凭证注入安装时后门，窃取开发者 CI/CD 密钥与凭证。'
tag:
  - 供应链攻击
  - npm
  - Mini Shai-Hulud
  - @antv
  - 恶意软件
category:
  - 安全事件
  - 供应链安全
timeline: false
isOriginal: false
---

## 事件概述

2026年5月19日，Socket 安全团队监测到 `@antv` 生态系统遭遇大规模 npm 供应链攻击。攻击者控制了 npm 维护者账户 **atool**，发布了 **639 个恶意版本**（涉及 **323 个独立包**），影响范围涵盖数据可视化、图表、地图、React 组件等多个生态。

受影响的核心包包括：`@antv/g2`、`@antv/g6`、`@antv/x6`、`@antv/l7`、`@antv/s2`、`@antv/f2`、`@antv/g`、`@antv/g2plot`、`@antv/graphin`、`@antv/data-set`，以及 `echarts-for-react`（周下载量约 110 万）、`timeago.js`、`size-sensor`、`canvas-nest.js` 等。

## 攻击时间线

| 时间（UTC） | 事件 |
|------------|------|
| 01:56 | 恶意发布活动开始 |
| 02:02 | Socket 检测到首批恶意包 |
| 02:56 | 恶意发布活动结束 |
| 03:09 | 最后一批检测确认 |

检测中位时间约 **6.7 分钟**。

## 全战役统计

| 生态 | 恶意版本 | 独立包数 |
|------|---------|---------|
| npm | 1,048 | 498 |
| PyPI | 6 | 3 |
| Composer | 1 | 1 |
| **总计** | **1,055** | **502** |

## 技术分析

### 恶意载荷结构

攻击者在包的根目录注入 `index.js`，并在 `package.json` 中添加安装时钩子：

```json
{
  "scripts": {
    "preinstall": "bun run index.js"
  },
  "optionalDependencies": {
    "@antv/setup": "github:antvis/G2#1916faa365f2788b6e193514872d51a242876569"
  }
}
```

### 混淆手法

`index.js` 高度混淆，使用大字符串数组查表、运行时字符串解码，通过 `globalThis` 暴露自定义解密函数 `fc2edea72`。与既往 Mini Shai-Hulud 变种一致。

### 数据外泄

- **C2 端点**：`https://t.m-kosche.com:443/api/public/otel/v1/traces`
- **加密方式**：数据经 gzip 压缩 → AES-256-GCM 加密 → AES 密钥经 RSA-OAEP/SHA-256 包装
- 攻击者难以从网络流量中恢复明文

### 窃取目标

- GitHub Token（`GITHUB_TOKEN`、`ACTIONS_ID_TOKEN_*`）
- AWS 凭证（`AWS_ACCESS_KEY_ID`、`AWS_SECRET_ACCESS_KEY` 等）
- Kubernetes 服务账户凭证（`KUBECONFIG`、`KUBERNETES_SERVICE_HOST`）
- Vault Token（`VAULT_ADDR`、`VAULT_TOKEN` 等）
- SSH 私钥、Docker 认证文件、数据库连接字符串

### CI/CD 平台检测逻辑

GitHub Actions、GitLab CI、Travis CI、CircleCI、Jenkins、Azure DevOps、AWS CodeBuild、Buildkite、AppVeyor、Bitbucket Pipelines、Drone、Semaphore、TeamCity、Bamboo、Bitrise、Vercel、Netlify、Cloudflare Pages

### GitHub 备用外泄通道

若获取到有效 GitHub Token，载荷会在受害者账号下创建仓库，将窃取数据提交至 `results/results-<timestamp>-<counter>.json`。

仓库名遵循模式：`<dune词>-<dune词>-<3位数字>`，README 中包含逆向标记 `niagA oG eW ereH :duluH-iahS`（反转后为 `Shai-Hulud: Here We Go Again`）。

已观测到的仓库名举例：
- `sayyadina-stillsuit-852`
- `atreides-ornithopter-112`
- `harkonnen-phibian-552`
- `fremen-fedaykin-225`
- `kanly-lasgun-874`

### npm 蠕虫式传播

载荷包含 npm 注册表滥用逻辑：
1. 验证 npm Token 有效性
2. 枚举 Token 拥有者可维护的包
3. 下载包 tarball
4. 注入恶意载荷 + `preinstall` 钩子
5. 升级版本号
6. 以维护者身份重新发布

## IOC（入侵指标）

### 网络指标
- `t.m-kosche.com`
- `https://t.m-kosche.com:443/api/public/otel/v1/traces`

### 检测线索（合法端点，非恶意设施）

以下为正常 npm/sigstore 服务端点，但在非发布环境的 CI/安装脚本中出现时需警惕：

- `https://registry.npmjs.org/-/npm/v1/tokens`
- `https://registry.npmjs.org/-/whoami`
- `https://registry.npmjs.org/-/v1/search?text=maintainer:<user>&size=250`
- `https://fulcio.sigstore.dev/api/v2/signingCert`
- `https://rekor.sigstore.dev/api/v1/log/entries`

### GitHub 标记
- `niagA oG eW ereH :duluH-iahS`
- `Shai-Hulud: Here We Go Again`
- `results/results-*.json`

## 防御建议

1. 锁定依赖版本，避免自动更新
2. 使用 `npm audit` / Socket 等工具扫描依赖
3. 限制 CI/CD 环境中的 Token 权限
4. 监控 npm 生命周期脚本执行
5. 定期轮换 npm publish Token
