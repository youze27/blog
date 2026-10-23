// 把站点引用的第三方图片下载到 src/public/assets/widgets/，改为本地引用
// 这些图片（raw.githubusercontent.com、vercel、shields 等）在国内直连很慢或超时，
// 由 GitHub Actions 定期拉取并提交，页面只加载同源静态文件。
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const OUT_DIR = resolve("src/.vuepress/public/assets/widgets");

const widgets = [
  // 首页
  {
    file: "snake-light.svg",
    url: "https://raw.githubusercontent.com/youze27/youze27/output/github-snake.svg",
  },
  {
    file: "commits-light.svg",
    url: "https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=youze27&theme=default&utcOffset=8",
  },
  {
    file: "commits-dark.svg",
    url: "https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=youze27&theme=tokyonight&utcOffset=8",
  },
  // 关于我
  {
    file: "typing.svg",
    url: "https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&center=true&width=380&lines=Full-Stack+Developer;Open+Source+Enthusiast;Always+Learning+Something+New",
  },
  {
    file: "profile-views.svg",
    url: "https://komarev.com/ghpvc/?username=youze27&label=Profile%20Views&color=0e75b6&style=flat",
  },
  {
    file: "badge-github.svg",
    url: "https://img.shields.io/badge/GitHub-youze27-181717?style=flat&logo=github&logoColor=white",
  },
  {
    file: "badge-wakatime.svg",
    url: "https://img.shields.io/badge/WakaTime-@alan-000000?style=flat&logo=wakatime&logoColor=white",
  },
  {
    file: "skillicons.svg",
    url: "https://skillicons.dev/icons?i=dart,flutter,kotlin,java,py,ts,js,nodejs,docker,git,linux,vscode&theme=dark",
  },
  {
    file: "streak.svg",
    url: "https://streak-stats.demolab.com?user=youze27&theme=tokyonight&hide_border=true&date_format=j%20M%5B%20Y%5D",
  },
  {
    file: "wakatime-stats.svg",
    url: "https://github-readme-stats.vercel.app/api/wakatime?username=alan&langs_count=6&theme=tokyonight&layout=compact&hide_border=true",
  },
  {
    file: "summary-stats.svg",
    url: "https://github-profile-summary-cards.vercel.app/api/cards/stats?username=youze27&theme=tokyonight",
  },
  {
    file: "summary-productive.svg",
    url: "https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=youze27&theme=tokyonight&utcOffset=8",
  },
  {
    file: "summary-details.svg",
    url: "https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=youze27&theme=tokyonight",
  },
  {
    file: "contrib-3d.svg",
    url: "https://raw.githubusercontent.com/youze27/youze27/master/profile-3d-contrib/profile-night-rainbow.svg",
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const download = async (url, retries = 3) => {
  for (let attempt = 1; ; attempt += 1) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(30_000),
        headers: { "User-Agent": "Mozilla/5.0 (compatible; blog-widget-sync)" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) throw new Error(`内容过小（${buf.length} B）`);
      return buf;
    } catch (error) {
      if (attempt >= retries) throw error;
      await sleep(attempt * 2000);
    }
  }
};

await mkdir(OUT_DIR, { recursive: true });

const failures = [];

for (const { file, url } of widgets) {
  try {
    const buf = await download(url);
    await writeFile(resolve(OUT_DIR, file), buf);
    console.log(`✔ ${file}  ${(buf.length / 1024).toFixed(1)} KB`);
  } catch (error) {
    // 单个失败时保留旧文件，不中断整体流程
    failures.push(file);
    console.warn(`✖ ${file}  下载失败：${error.message}`);
  }
}

if (failures.length > 0) {
  console.warn(`\n以下图片沿用旧文件：${failures.join("、")}`);
} else {
  console.log(`\n全部 ${widgets.length} 张图片已更新`);
}
