// 根据 Star 仓库列表生成 Markdown 页面
// 输入：TSV 文件，每行 "full_name\tlanguage\tstars"
// 输出：只包含 RepoCard 标签的 Markdown 文件（按 Star 数降序）
import { readFileSync, writeFileSync } from "node:fs";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error("用法: node scripts/generate-stars.mjs <starred.tsv> <output.md>");
  process.exit(1);
}

const repos = readFileSync(inputPath, "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [fullName, , stars] = line.split("\t");
    return { fullName, stars: Number(stars) || 0 };
  })
  .filter(({ fullName }) => fullName && fullName.includes("/"))
  .sort((a, b) => b.stars - a.stars);

const date = new Date().toISOString().slice(0, 10);

const cards = repos
  .map(({ fullName }) => `<RepoCard repo="${fullName}" />`)
  .join("\n\n");

const content = `---
title: Star
icon: star
article: false
sidebar: false
---

> 共 ${repos.length} 个仓库，按 Star 数从高到低排列。
> 本页由 GitHub Actions 自动维护，最后更新：${date}

<CardGrid cols="2">

${cards}

</CardGrid>
`;

writeFileSync(outputPath, content, "utf8");
console.log(`已生成 ${outputPath}，共 ${repos.length} 个仓库`);
