import { defineClientConfig} from "vuepress/client";
import { onMounted } from "vue";
import ribbon from "../components/ribbon.js";
import figure from "../components/figure.js";
import { BackgroundOptions } from "../type.js";
declare const backgroundOptions: BackgroundOptions;
// declare const ribbonOptions: RibbonOptions;

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    router.beforeEach((to, from) => {});
    router.afterEach((to, from) => {
      // console.log("after navigation" + to.path);
    });
  },
  setup() {
    onMounted(() => {
      switch (backgroundOptions.type) {
        case "figure":
          figure();
          break;
        case "ribbon":
          ribbon(
            backgroundOptions.ribbonOption?.zIndex,
            backgroundOptions.ribbonOption?.alpha,
            backgroundOptions.ribbonOption?.size
          );
          break;
        default:
          break;
      }
    });
  },
  rootComponents: [],
});
