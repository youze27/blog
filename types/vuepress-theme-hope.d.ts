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