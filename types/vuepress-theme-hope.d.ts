// types/vuepress-theme-hope.d.ts
declare module "vuepress-theme-hope" {
  // 接口定义使用 :
  export interface NavbarItem {
    text: string;
    link: string;
    icon?: string;
    activeMatch?: string;
    children?: NavbarItem[];
  }

  export interface NavbarGroup {
    text: string;
    icon?: string;
    prefix?: string;
    children: NavbarItem[];
  }

  export type NavbarConfig = (NavbarItem | NavbarGroup | string)[];

  export interface SidebarItem {
    text: string;
    link?: string;
    icon?: string;
    collapsible?: boolean;
    collapsed?: boolean;
    prefix?: string;
    children?: SidebarItem[];
  }

  export type SidebarConfig = Record<string, (SidebarItem | string)[]>;

  // 函数声明使用 function 关键字
  export function navbar(config: NavbarConfig): NavbarConfig;

  export function sidebar(config: SidebarConfig): SidebarConfig;

  // Hope 主题配置接口
  export interface HopeThemeConfig {
    // 这里可以添加你需要的配置类型
    logo?: string;
    repo?: string;
    docsDir?: string;
    // 添加其他你实际使用的配置项
  }

  // 函数声明
  export function hopeTheme(config: HopeThemeConfig): any;
}

// 扩展 vuepress-theme-hope 的类型定义
declare module 'vuepress-theme-hope' {
  // 扩展 AvailableComponent 类型
  interface AvailableComponent {
    // 已有的内置组件
    "ArtPlayer": any;
    "AudioPlayer": any;
    "Badge": any;
    "BiliBili": any;
    "CodePen": any;
    "FontIcon": any;
    "PDF": any;
    "Replit": any;
    "Share": any;
    "SiteInfo": any;
    "StackBlitz": any;
    "VideoPlayer": any;
    "VPBanner": any;
    "VPCard": any;
    "VidStack": any;
    "XiGua": any;
    "YouTube": any;

    // ============ 扩展：添加你的自定义组件 ============
    "Gallery": any;
    "ImageCard": any;
    "TestComp": any;
    "Waterfall": any;
    "WaterfallImage": any;
    "ImageModal": any;
    "VerifyComponent": any;
  }
}

// 为自定义组件声明类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}