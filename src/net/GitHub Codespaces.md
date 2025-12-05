---
title: GitHub Codespaces
index: true
isOriginal : true
category:
  - 计网基础
tag:
  - GitHub Codespaces
---
## 什么是 GitHub Codespaces

**GitHub Codespaces** 是 GitHub 提供的云端开发环境，基于 VS Code，可用于在浏览器中编写、运行和调试代码。

### 关键特性

- **云端开发**：无需本地安装环境
- **快速启动**：预配置环境，秒速加载
- **环境一致**：团队成员环境完全一致
- **持久化存储**：代码和配置自动保存
- **端口转发**：自动转发本地端口到互联网

### 适用场景

1. ​**跨平台开发**：ARM/x86 架构兼容
2. ​**团队协作**：统一开发环境
3. ​**临时环境**：快速测试和验证
4. ​**教学演示**：分享可复现的环境

## 环境配置

### 基础配置结构

```
项目根目录/
├── .devcontainer/          # Codespaces 配置目录
│   ├── devcontainer.json   # 主配置文件
│   └── Dockerfile          # 自定义环境
├── .vscode/               # VS Code 配置
│   ├── settings.json      # 编辑器设置
│   └── tasks.json         # 任务配置
└── .github/               # GitHub 相关配置
```

### 创建 `.devcontainer/devcontainer.json`

```
{
  "name": "VuePress 开发环境",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye",
  
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": {},
    "ghcr.io/devcontainers/features/node:1": {
      "version": "20",
      "nodeGypDependencies": true
    }
  },
  
  "customizations": {
    "vscode": {
      "extensions": [
        "vue.volar",
        "vue.vscode-typescript-vue-plugin",
        "bradlc.vscode-tailwindcss",
        "sdras.vue-vscode-snippets",
        "mhutchie.git-graph",
        "eamodio.gitlens",
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
        },
        "terminal.integrated.defaultProfile.linux": "bash",
        "files.autoSave": "afterDelay"
      }
    }
  },
  
  "forwardPorts": [8080],
  "portsAttributes": {
    "8080": {
      "label": "VuePress Dev Server",
      "onAutoForward": "openPreview"
    }
  },
  
  "postCreateCommand": "npm install -g pnpm && pnpm install",
  "postAttachCommand": "pnpm docs:dev",
  
  "containerEnv": {
    "VUE_PRESS_SASS_IMPL": "sass-embedded",
    "NODE_OPTIONS": "--max-old-space-size=4096"
  },
  
  "remoteUser": "node"
}
```

## 使用流程

### 启动 Codespaces

#### 方法一：网页版

1. 访问 GitHub 仓库页面
2. 按 `.`（点）键直接打开
3. 或点击 Code → Codespaces → Create codespace

#### 方法二：VS Code 桌面版

1. 安装 GitHub Codespaces 扩展
2. 按 F1 → "Codespaces: Create New Codespace"
3. 选择仓库和分支

### 首次启动流程

1. **环境构建**：拉取镜像，创建容器
2. ​**依赖安装**​：执行 `postCreateCommand`
3. ​**服务启动**​：执行 `postAttachCommand`
4. ​**端口转发**：自动转发配置的端口
5. ​**浏览器打开**：显示预览链接

### 日常使用命令

```
# 终端操作
pwd                     # /workspaces/仓库名
node --version          # 检查 Node.js
pnpm --version          # 检查 pnpm

# 项目操作
pnpm install            # 安装依赖
pnpm docs:dev          # 启动开发服务器
pnpm docs:build        # 构建项目

# Git 操作
git status
git add .
git commit -m "更新"
git push
```
