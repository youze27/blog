/*! For license information please see 3586.268416f1.js.LICENSE.txt */
"use strict";(self.webpackChunkvuepress_theme_hope_template=self.webpackChunkvuepress_theme_hope_template||[]).push([[3586],{96214(t,e,s){s.d(e,{Kq:()=>u,OA:()=>n.OA,u$:()=>n.u$});var i=s(27727),n=s(84703);const o=(t,e)=>{var s,i;const n=t._$AN;if(void 0===n)return!1;for(const t of n)null===(i=(s=t)._$AO)||void 0===i||i.call(s,e,!1),o(t,e);return!0},a=t=>{let e,s;do{if(void 0===(e=t._$AM))break;s=e._$AN,s.delete(t),t=e}while(0===(null==s?void 0:s.size))},l=t=>{for(let e;e=t._$AM;t=e){let s=e._$AN;if(void 0===s)e._$AN=s=new Set;else if(s.has(t))break;s.add(t),c(e)}};function r(t){void 0!==this._$AN?(a(this),this._$AM=t,l(this)):this._$AM=t}function d(t,e=!1,s=0){const i=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(e)if(Array.isArray(i))for(let t=s;t<i.length;t++)o(i[t],!1),a(i[t]);else null!=i&&(o(i,!1),a(i));else o(this,t)}const c=t=>{var e,s,i,o;t.type==n.OA.CHILD&&(null!==(e=(i=t)._$AP)&&void 0!==e||(i._$AP=d),null!==(s=(o=t)._$AQ)&&void 0!==s||(o._$AQ=r))};class u extends n.WL{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),l(this),this.isConnected=t._$AU}_$AO(t,e=!0){var s,i;t!==this.isConnected&&(this.isConnected=t,t?null===(s=this.reconnected)||void 0===s||s.call(this):null===(i=this.disconnected)||void 0===i||i.call(this)),e&&(o(this,t),a(this))}setValue(t){if((0,i.Rt)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}},27727(t,e,s){s.d(e,{Rt:()=>o,mY:()=>l});var i=s(54245);const{I:n}=i.ge,o=t=>void 0===t.strings,a={},l=(t,e=a)=>t._$AH=e},84703(t,e,s){s.d(e,{OA:()=>i,WL:()=>o,u$:()=>n});const i={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},n=t=>(...e)=>({_$litDirective$:t,values:e});class o{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}},11822(t,e,s){s.d(e,{J:()=>n});var i=s(54245);const n=t=>null!=t?t:i.s6},52993(t,e,s){s.d(e,{D:()=>o,_:()=>a});var i=s(54245),n=s(84703);class o extends n.WL{constructor(t){if(super(t),this.et=i.s6,t.type!==n.OA.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===i.s6||null==t)return this.ft=void 0,this.et=t;if(t===i.c0)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}o.directiveName="unsafeHTML",o.resultType=1;const a=(0,n.u$)(o)},54245(t,e,s){var i;s.d(e,{XX:()=>K,c0:()=>C,ge:()=>G,qy:()=>k,s6:()=>S});const n=window,o=n.trustedTypes,a=o?o.createPolicy("lit-html",{createHTML:t=>t}):void 0,l="$lit$",r=`lit$${(Math.random()+"").slice(9)}$`,d="?"+r,c=`<${d}>`,u=document,p=()=>u.createComment(""),m=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,h=t=>v(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),$="[ \t\n\f\r]",g=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,b=/-->/g,y=/>/g,f=RegExp(`>|${$}(?:([^\\s"'>=/]+)(${$}*=${$}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),x=/'/g,A=/"/g,_=/^(?:script|style|textarea|title)$/i,w=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),k=w(1),C=(w(2),Symbol.for("lit-noChange")),S=Symbol.for("lit-nothing"),q=new WeakMap,Z=u.createTreeWalker(u,129,null,!1);function T(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==a?a.createHTML(e):e}const M=(t,e)=>{const s=t.length-1,i=[];let n,o=2===e?"<svg>":"",a=g;for(let e=0;e<s;e++){const s=t[e];let d,u,p=-1,m=0;for(;m<s.length&&(a.lastIndex=m,u=a.exec(s),null!==u);)m=a.lastIndex,a===g?"!--"===u[1]?a=b:void 0!==u[1]?a=y:void 0!==u[2]?(_.test(u[2])&&(n=RegExp("</"+u[2],"g")),a=f):void 0!==u[3]&&(a=f):a===f?">"===u[0]?(a=null!=n?n:g,p=-1):void 0===u[1]?p=-2:(p=a.lastIndex-u[2].length,d=u[1],a=void 0===u[3]?f:'"'===u[3]?A:x):a===A||a===x?a=f:a===b||a===y?a=g:(a=f,n=void 0);const v=a===f&&t[e+1].startsWith("/>")?" ":"";o+=a===g?s+c:p>=0?(i.push(d),s.slice(0,p)+l+s.slice(p)+r+v):s+r+(-2===p?(i.push(void 0),e):v)}return[T(t,o+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class I{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,a=0;const c=t.length-1,u=this.parts,[m,v]=M(t,e);if(this.el=I.createElement(m,s),Z.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=Z.nextNode())&&u.length<c;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(l)||e.startsWith(r)){const s=v[a++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+l).split(r),e=/([.?@])?(.*)/.exec(s);u.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?N:"?"===e[1]?L:"@"===e[1]?H:E})}else u.push({type:6,index:n})}for(const e of t)i.removeAttribute(e)}if(_.test(i.tagName)){const t=i.textContent.split(r),e=t.length-1;if(e>0){i.textContent=o?o.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],p()),Z.nextNode(),u.push({type:2,index:++n});i.append(t[e],p())}}}else if(8===i.nodeType)if(i.data===d)u.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(r,t+1));)u.push({type:7,index:n}),t+=r.length-1}n++}}static createElement(t,e){const s=u.createElement("template");return s.innerHTML=t,s}}function W(t,e,s=t,i){var n,o,a,l;if(e===C)return e;let r=void 0!==i?null===(n=s._$Co)||void 0===n?void 0:n[i]:s._$Cl;const d=m(e)?void 0:e._$litDirective$;return(null==r?void 0:r.constructor)!==d&&(null===(o=null==r?void 0:r._$AO)||void 0===o||o.call(r,!1),void 0===d?r=void 0:(r=new d(t),r._$AT(t,s,i)),void 0!==i?(null!==(a=(l=s)._$Co)&&void 0!==a?a:l._$Co=[])[i]=r:s._$Cl=r),void 0!==r&&(e=W(t,r._$AS(t,e.values),r,i)),e}class O{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:u).importNode(s,!0);Z.currentNode=n;let o=Z.nextNode(),a=0,l=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new P(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new V(o,this,t)),this._$AV.push(e),r=i[++l]}a!==(null==r?void 0:r.index)&&(o=Z.nextNode(),a++)}return Z.currentNode=u,n}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class P{constructor(t,e,s,i){var n;this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),m(t)?t===S||null==t||""===t?(this._$AH!==S&&this._$AR(),this._$AH=S):t!==this._$AH&&t!==C&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):h(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==S&&m(this._$AH)?this._$AA.nextSibling.data=t:this.$(u.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=I.createElement(T(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(s);else{const t=new O(n,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new I(t)),e}T(t){v(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new P(this.k(p()),this.k(p()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class E{constructor(t,e,s,i,n){this.type=1,this._$AH=S,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=S}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=W(this,t,e,0),o=!m(t)||t!==this._$AH&&t!==C,o&&(this._$AH=t);else{const i=t;let a,l;for(t=n[0],a=0;a<n.length-1;a++)l=W(this,i[s+a],e,a),l===C&&(l=this._$AH[a]),o||(o=!m(l)||l!==this._$AH[a]),l===S?t=S:t!==S&&(t+=(null!=l?l:"")+n[a+1]),this._$AH[a]=l}o&&!i&&this.j(t)}j(t){t===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class N extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===S?void 0:t}}const B=o?o.emptyScript:"";class L extends E{constructor(){super(...arguments),this.type=4}j(t){t&&t!==S?this.element.setAttribute(this.name,B):this.element.removeAttribute(this.name)}}class H extends E{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=W(this,t,e,0))&&void 0!==s?s:S)===C)return;const i=this._$AH,n=t===S&&i!==S||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==S&&(i===S||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class V{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const G={O:l,P:r,A:d,C:1,M,L:O,R:h,D:W,I:P,V:E,H:L,N:H,U:N,F:V},R=n.litHtmlPolyfillSupport;null==R||R(I,P),(null!==(i=n.litHtmlVersions)&&void 0!==i?i:n.litHtmlVersions=[]).push("2.8.0");const K=(t,e,s)=>{var i,n;const o=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let a=o._$litPart$;if(void 0===a){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;o._$litPart$=a=new P(e.insertBefore(p(),t),t,void 0,null!=s?s:{})}return a._$AI(t),a}},95238(t,e,s){s.d(e,{xZ:()=>m,In:()=>b,UT:()=>f,kj:()=>g});var i=s(40512),n=s(79551),o=s(54245),a=s(96214),l=s(11822),r=s(84703),d=s(52993);class c extends d.D{}c.directiveName="unsafeSVG",c.resultType=2;const u=(0,r.u$)(c);var p=class extends a.Kq{#t=null;#e=!1;#s=null;constructor(t){super(t),this.#e=t.type===a.OA.ATTRIBUTE||t.type===a.OA.BOOLEAN_ATTRIBUTE}render(t){return t!==this.#t&&(this.disconnected(),this.#t=t,this.isConnected&&this.#i()),this.#t?this.#n((0,i.se)(this.#t)):o.s6}reconnected(){this.#i()}disconnected(){this.#s?.(),this.#s=null}#i(){this.#t&&(this.#s=(0,i.QZ)(this.#o.bind(this)))}#n(t){return this.#e?(0,l.J)(t):t}#a(t){this.setValue(this.#n(t))}#o(){this.#a(this.#t?.())}};function m(t){return(0,a.u$)(p)((0,i.EW)(t))}var v=class{#l;#r;elements=new Set;constructor(t,e){this.#l=t,this.#r=e}connect(){this.#d();const t=new MutationObserver(this.#c);for(const e of this.#l)t.observe(e,{childList:!0,subtree:!0});(0,i.zp)(()=>t.disconnect()),(0,i.zp)(this.disconnect.bind(this))}disconnect(){this.elements.clear()}assign(t,e){(0,i.vA)(t)?(e.textContent="",e.append(t)):((0,o.XX)(null,e),(0,o.XX)(t,e)),e.style.display||(e.style.display="contents");const s=e.firstElementChild;if(!s)return;const n=e.getAttribute("data-class");n&&s.classList.add(...n.split(" "))}#c=(0,i.s_)(this.#d.bind(this));#d(t){if(t&&!t.some(t=>t.addedNodes.length))return;let e=!1,s=this.#l.flatMap(t=>[...t.querySelectorAll("slot")]);for(const t of s)t.hasAttribute("name")&&!this.elements.has(t)&&(this.elements.add(t),e=!0);e&&this.#r(this.elements)}};let h=0,$="data-slot-id";var g=class{#l;slots;constructor(t){this.#l=t,this.slots=new v(t,this.#d.bind(this))}connect(){this.slots.connect(),this.#d();const t=new MutationObserver(this.#c);for(const e of this.#l)t.observe(e,{childList:!0});(0,i.zp)(()=>t.disconnect())}#c=(0,i.s_)(this.#d.bind(this));#d(){for(const t of this.#l)for(const e of t.children){if(1!==e.nodeType)continue;const t=e.getAttribute("slot");if(!t)continue;e.style.display="none";let s=e.getAttribute($);s||e.setAttribute($,s=++h+"");for(const i of this.slots.elements){if(i.getAttribute("name")!==t||i.getAttribute($)===s)continue;const n=document.importNode(e,!0);t.includes("-icon")&&n.classList.add("vds-icon"),n.style.display="",n.removeAttribute("slot"),this.slots.assign(n,i),i.setAttribute($,s)}}}};function b({name:t,class:e,state:s,paths:n,viewBox:a="0 0 32 32"}){return o.qy`<svg
    class="${"vds-icon"+(e?` ${e}`:"")}"
    viewBox="${a}"
    fill="none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    data-icon=${(0,l.J)(t??s)}
  >
    ${(0,i.Kg)(n)?u(n):m(n)}
  </svg>`}var y=class{#u={};#p=!1;slots;constructor(t){this.slots=new v(t,this.#m.bind(this))}connect(){this.slots.connect()}load(){this.loadIcons().then(t=>{this.#u=t,this.#p=!0,this.#m()})}*#v(){for(const t of Object.keys(this.#u)){const e=`${t}-icon`;for(const s of this.slots.elements)s.name===e&&(yield{icon:this.#u[t],slot:s})}}#m(){if(this.#p)for(const{icon:t,slot:e}of this.#v())this.slots.assign(t,e)}},f=class extends y{connect(){super.connect();const{player:t}=(0,n.$c)();if(!t.el)return;let e,s=new IntersectionObserver(t=>{t[0]?.isIntersecting&&(e?.(),e=void 0,this.load())});s.observe(t.el),e=(0,i.zp)(()=>s.disconnect())}}},1041(t,e,s){s.d(e,{W:()=>n});var i=s(54245),n=class extends HTMLElement{rootPart=null;connectedCallback(){this.rootPart=(0,i.XX)(this.render(),this,{renderBefore:this.firstChild}),this.rootPart.setConnected(!0)}disconnectedCallback(){this.rootPart?.setConnected(!1),this.rootPart=null,(0,i.XX)(null,this)}}},33586(t,e,s){var i=s(40512),n=s(79551),o=s(57327),a=s(1041),l=s(97974),r=s(35495),d=s(95238),c=s(54245),u=s(11822),p=s(96214),m=s(84703);const v=new WeakMap,h=(0,m.u$)(class extends p.Kq{render(t){return c.s6}update(t,[e]){var s;const i=e!==this.G;return i&&void 0!==this.G&&this.ot(void 0),(i||this.rt!==this.lt)&&(this.G=e,this.dt=null===(s=t.options)||void 0===s?void 0:s.host,this.ot(this.lt=t.element)),c.s6}ot(t){var e;if("function"==typeof this.G){const s=null!==(e=this.dt)&&void 0!==e?e:globalThis;let i=v.get(s);void 0===i&&(i=new WeakMap,v.set(s,i)),void 0!==i.get(this.G)&&this.G.call(this.dt,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.dt,t)}else this.G.value=t}get rt(){var t,e,s;return"function"==typeof this.G?null===(e=v.get(null!==(t=this.dt)&&void 0!==t?t:globalThis))||void 0===e?void 0:e.get(this.G):null===(s=this.G)||void 0===s?void 0:s.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}}),$=(0,i.q6)();function g(){return(0,i.NT)($)}const b={colorScheme:"system",download:null,customIcons:!1,disableTimeSlider:!1,menuContainer:null,menuGroup:"bottom",noAudioGain:!1,noGestures:!1,noKeyboardAnimations:!1,noModal:!1,noScrubGesture:!1,playbackRates:{min:0,max:2,step:.25},audioGains:{min:0,max:300,step:25},seekStep:10,sliderChaptersMinWidth:325,hideQualityBitrate:!1,smallWhen:!1,thumbnails:null,translations:null,when:!1};var y=class extends i.uA{static props=b;#h;#$=(0,i.EW)(()=>{const t=this.$props.when();return this.#g(t)});#b=(0,i.EW)(()=>{const t=this.$props.smallWhen();return this.#g(t)});get isMatch(){return this.#$()}get isSmallLayout(){return this.#b()}onSetup(){this.#h=(0,n.$c)(),this.setAttributes({"data-match":this.#$,"data-sm":()=>this.#b()?"":null,"data-lg":()=>this.#b()?null:"","data-size":()=>this.#b()?"sm":"lg","data-no-scrub-gesture":this.$props.noScrubGesture}),(0,i.Pp)($,{...this.$props,when:this.#$,smallWhen:this.#b,userPrefersAnnouncements:(0,i.O)(!0),userPrefersKeyboardAnimations:(0,i.O)(!0),menuPortal:(0,i.O)(null)})}onAttach(t){(0,o.GU)(t,this.$props.colorScheme)}#g(t){return"never"!==t&&((0,i.Lm)(t)?t:(0,i.EW)(()=>t(this.#h.player.state))())}};const f=y.prototype;function x(t,e){(0,i.QZ)(()=>{const{player:s}=(0,n.$c)(),o=s.el;return o&&(0,i.Bq)(o,"data-layout",e()&&t),()=>o?.removeAttribute("data-layout")})}function A(t,e){return t()?.[e]??e}function _(){return(0,d.xZ)(()=>{const{translations:t,userPrefersAnnouncements:e}=g();return e()?c.qy`<media-announcer .translations=${(0,d.xZ)(t)}></media-announcer>`:null})}function w(t,e=""){return c.qy`<slot
    name=${`${t}-icon`}
    data-class=${`vds-icon vds-${t}-icon${e?` ${e}`:""}`}
  ></slot>`}function k(t){return t.map(t=>w(t))}function C(t,e){return(0,d.xZ)(()=>A(t,e))}function S({tooltip:t}){const{translations:e}=g(),{remotePlaybackState:s}=(0,n.nV)(),o=(0,d.xZ)(()=>`${A(e,"AirPlay")} ${(0,i.Fb)(s())}`),a=C(e,"AirPlay");return c.qy`
    <media-tooltip class="vds-airplay-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-airplay-button class="vds-airplay-button vds-button" aria-label=${o}>
          ${w("airplay")}
        </media-airplay-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${t}>
        <span class="vds-airplay-tooltip-text">${a}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function q({tooltip:t}){const{translations:e}=g(),{remotePlaybackState:s}=(0,n.nV)(),o=(0,d.xZ)(()=>`${A(e,"Google Cast")} ${(0,i.Fb)(s())}`),a=C(e,"Google Cast");return c.qy`
    <media-tooltip class="vds-google-cast-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-google-cast-button class="vds-google-cast-button vds-button" aria-label=${o}>
          ${w("google-cast")}
        </media-google-cast-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${t}>
        <span class="vds-google-cast-tooltip-text">${a}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function Z({tooltip:t}){const{translations:e}=g(),s=C(e,"Play"),i=C(e,"Pause");return c.qy`
    <media-tooltip class="vds-play-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-play-button
          class="vds-play-button vds-button"
          aria-label=${C(e,"Play")}
        >
          ${k(["play","pause","replay"])}
        </media-play-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${t}>
        <span class="vds-play-tooltip-text">${s}</span>
        <span class="vds-pause-tooltip-text">${i}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function T({tooltip:t,ref:e=i.lQ}){const{translations:s}=g(),n=C(s,"Mute"),o=C(s,"Unmute");return c.qy`
    <media-tooltip class="vds-mute-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-mute-button
          class="vds-mute-button vds-button"
          aria-label=${C(s,"Mute")}
          ${h(e)}
        >
          ${k(["mute","volume-low","volume-high"])}
        </media-mute-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${t}>
        <span class="vds-mute-tooltip-text">${o}</span>
        <span class="vds-unmute-tooltip-text">${n}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function M({tooltip:t}){const{translations:e}=g(),s=C(e,"Closed-Captions On"),i=C(e,"Closed-Captions Off");return c.qy`
    <media-tooltip class="vds-caption-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-caption-button
          class="vds-caption-button vds-button"
          aria-label=${C(e,"Captions")}
        >
          ${k(["cc-on","cc-off"])}
        </media-caption-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${t}>
        <span class="vds-cc-on-tooltip-text">${i}</span>
        <span class="vds-cc-off-tooltip-text">${s}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function I(){const{translations:t}=g(),e=C(t,"Enter PiP"),s=C(t,"Exit PiP");return c.qy`
    <media-tooltip class="vds-pip-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-pip-button
          class="vds-pip-button vds-button"
          aria-label=${C(t,"PiP")}
        >
          ${k(["pip-enter","pip-exit"])}
        </media-pip-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content">
        <span class="vds-pip-enter-tooltip-text">${e}</span>
        <span class="vds-pip-exit-tooltip-text">${s}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function W({tooltip:t}){const{translations:e}=g(),s=C(e,"Enter Fullscreen"),i=C(e,"Exit Fullscreen");return c.qy`
    <media-tooltip class="vds-fullscreen-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-fullscreen-button
          class="vds-fullscreen-button vds-button"
          aria-label=${C(e,"Fullscreen")}
        >
          ${k(["fs-enter","fs-exit"])}
        </media-fullscreen-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${t}>
        <span class="vds-fs-enter-tooltip-text">${s}</span>
        <span class="vds-fs-exit-tooltip-text">${i}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function O({backward:t,tooltip:e}){const{translations:s,seekStep:i}=g(),n=t?"Seek Backward":"Seek Forward",o=C(s,n);return c.qy`
    <media-tooltip class="vds-seek-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-seek-button
          class="vds-seek-button vds-button"
          seconds=${(0,d.xZ)(()=>(t?-1:1)*i())}
          aria-label=${o}
        >
          ${w(t?"seek-backward":"seek-forward")}
        </media-seek-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        ${C(s,n)}
      </media-tooltip-content>
    </media-tooltip>
  `}function P(){const{translations:t}=g(),{live:e}=(0,n.nV)(),s=C(t,"Skip To Live"),i=C(t,"LIVE");return e()?c.qy`
        <media-live-button class="vds-live-button" aria-label=${s}>
          <span class="vds-live-button-text">${i}</span>
        </media-live-button>
      `:null}function E(){return(0,d.xZ)(()=>{const{download:t,translations:e}=g(),s=t();if((0,i.gD)(s))return null;const{source:o,title:a}=(0,n.nV)(),r=o(),d=(0,l.d_)({title:a(),src:r,download:s});return(0,i.Kg)(d?.url)?c.qy`
          <media-tooltip class="vds-download-tooltip vds-tooltip">
            <media-tooltip-trigger>
              <a
                role="button"
                class="vds-download-button vds-button"
                aria-label=${C(e,"Download")}
                href=${(0,l.xF)(d.url,{download:d.name})}
                download=${d.name}
                target="_blank"
              >
                <slot name="download-icon" data-class="vds-icon" />
              </a>
            </media-tooltip-trigger>
            <media-tooltip-content class="vds-tooltip-content" placement="top">
              ${C(e,"Download")}
            </media-tooltip-content>
          </media-tooltip>
        `:null})}function N(){const{translations:t}=g();return c.qy`
    <media-captions
      class="vds-captions"
      .exampleText=${C(t,"Captions look like this")}
    ></media-captions>
  `}function B(){return c.qy`<div class="vds-controls-spacer"></div>`}function L(t,e){return c.qy`
    <media-menu-portal .container=${(0,d.xZ)(t)} disabled="fullscreen">
      ${e}
    </media-menu-portal>
  `}function H(t,e,s,a){let l=(0,i.Kg)(e)?document.querySelector(e):e;l||(l=t?.closest("dialog")),l||(l=document.body);const r=document.createElement("div");r.style.display="contents",r.classList.add(s),l.append(r),(0,i.QZ)(()=>{if(!r)return;const{viewType:t}=(0,n.nV)(),e=a();(0,i.Bq)(r,"data-view-type",t()),(0,i.Bq)(r,"data-sm",e),(0,i.Bq)(r,"data-lg",!e),(0,i.Bq)(r,"data-size",e?"sm":"lg")});const{colorScheme:d}=g();return(0,o.GU)(r,d),r}function V({placement:t,tooltip:e,portal:s}){const{textTracks:o}=(0,n.$c)(),{viewType:a,seekableStart:l,seekableEnd:u}=(0,n.nV)(),{translations:p,thumbnails:m,menuPortal:v,noModal:h,menuGroup:$,smallWhen:b}=g();if((0,i.EW)(()=>{const t=l(),e=u(),s=(0,i.O)(null);return(0,r.q)(o,"chapters",s.set),!(s()?.cues.filter(s=>s.startTime<=e&&s.endTime>=t))?.length})())return null;const y=(0,i.EW)(()=>h()?(0,i.oA)(t):b()?null:(0,i.oA)(t)),f=(0,i.EW)(()=>b()||"bottom"!==$()||"video"!==a()?0:26),x=(0,i.O)(!1),A=c.qy`
    <media-menu-items
      class="vds-chapters-menu-items vds-menu-items"
      placement=${(0,d.xZ)(y)}
      offset=${(0,d.xZ)(f)}
    >
      ${(0,d.xZ)(()=>x()?c.qy`
          <media-chapters-radio-group
            class="vds-chapters-radio-group vds-radio-group"
            .thumbnails=${(0,d.xZ)(m)}
          >
            <template>
              <media-radio class="vds-chapter-radio vds-radio">
                <media-thumbnail class="vds-thumbnail"></media-thumbnail>
                <div class="vds-chapter-radio-content">
                  <span class="vds-chapter-radio-label" data-part="label"></span>
                  <span class="vds-chapter-radio-start-time" data-part="start-time"></span>
                  <span class="vds-chapter-radio-duration" data-part="duration"></span>
                </div>
              </media-radio>
            </template>
          </media-chapters-radio-group>
        `:null)}
    </media-menu-items>
  `;return c.qy`
    <media-menu class="vds-chapters-menu vds-menu" @open=${function(){x.set(!0)}} @close=${function(){x.set(!1)}}>
      <media-tooltip class="vds-tooltip">
        <media-tooltip-trigger>
          <media-menu-button
            class="vds-menu-button vds-button"
            aria-label=${C(p,"Chapters")}
          >
            ${w("menu-chapters")}
          </media-menu-button>
        </media-tooltip-trigger>
        <media-tooltip-content
          class="vds-tooltip-content"
          placement=${(0,i.Tn)(e)?(0,d.xZ)(e):e}
        >
          ${C(p,"Chapters")}
        </media-tooltip-content>
      </media-tooltip>
      ${s?L(v,A):A}
    </media-menu>
  `}function G(t){const{style:e}=new Option;return e.color=t,e.color.match(/\((.*?)\)/)[1].replace(/,/g," ")}(0,i._w)(f,"isMatch"),(0,i._w)(f,"isSmallLayout");const R={type:"color"},K={type:"radio",values:{"Monospaced Serif":"mono-serif","Proportional Serif":"pro-serif","Monospaced Sans-Serif":"mono-sans","Proportional Sans-Serif":"pro-sans",Casual:"casual",Cursive:"cursive","Small Capitals":"capitals"}},U={type:"radio",values:["None","Drop Shadow","Raised","Depressed","Outline"]},D={fontFamily:"pro-sans",fontSize:"100%",textColor:"#ffffff",textOpacity:"100%",textShadow:"none",textBg:"#000000",textBgOpacity:"100%",displayBg:"#000000",displayBgOpacity:"0%"},z=Object.keys(D).reduce((t,e)=>({...t,[e]:(0,i.O)(D[e])}),{});for(const t of Object.keys(z)){const e=localStorage.getItem(`vds-player:${(0,i.BW)(t)}`);(0,i.Kg)(e)&&z[t].set(e)}function Q(){for(const t of Object.keys(z)){const e=D[t];z[t].set(e)}}let F=!1,j=new Set;function X(t,e,s){const n=D[e],o=`--media-user-${(0,i.BW)(e)}`,a=s!==n?function(t,e){switch(t){case"fontFamily":return function(t){switch(t){case"mono-serif":return'"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';case"mono-sans":return'"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';case"pro-sans":return'Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif';case"casual":return'"Comic Sans MS", Impact, Handlee, fantasy';case"cursive":return'"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';case"capitals":return'"Arial Unicode Ms", Arial, Helvetica, Verdana, "Marcellus SC", sans-serif + font-variant=small-caps';default:return'"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif'}}(e);case"fontSize":case"textOpacity":case"textBgOpacity":case"displayBgOpacity":return function(t){return(parseInt(t)/100).toString()}(e);case"textColor":return`rgb(${G(e)} / var(--media-user-text-opacity, 1))`;case"textShadow":return function(t){switch(t){case"drop shadow":return"rgb(34, 34, 34) 1.86389px 1.86389px 2.79583px, rgb(34, 34, 34) 1.86389px 1.86389px 3.72778px, rgb(34, 34, 34) 1.86389px 1.86389px 4.65972px";case"raised":return"rgb(34, 34, 34) 1px 1px, rgb(34, 34, 34) 2px 2px";case"depressed":return"rgb(204, 204, 204) 1px 1px, rgb(34, 34, 34) -1px -1px";case"outline":return"rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px";default:return""}}(e);case"textBg":return`rgb(${G(e)} / var(--media-user-text-bg-opacity, 1))`;case"displayBg":return`rgb(${G(e)} / var(--media-user-display-bg-opacity, 1))`}}(e,s):null;if("fontFamily"===e){const e="capitals"===s?"small-caps":null;t.el?.style.setProperty("--media-user-font-variant",e)}t.el?.style.setProperty(o,a)}let Y=0;function J({label:t="",value:e="",children:s}){if(!t)return c.qy`
      <div class="vds-menu-section">
        <div class="vds-menu-section-body">${s}</div>
      </div>
    `;const i="vds-menu-section-"+ ++Y;return c.qy`
    <section class="vds-menu-section" role="group" aria-labelledby=${i}>
      <div class="vds-menu-section-title">
        <header id=${i}>${t}</header>
        ${e?c.qy`<div class="vds-menu-section-value">${e}</div>`:null}
      </div>
      <div class="vds-menu-section-body">${s}</div>
    </section>
  `}function tt({label:t,children:e}){return c.qy`
    <div class="vds-menu-item">
      <div class="vds-menu-item-label">${t}</div>
      ${e}
    </div>
  `}function et({label:t,icon:e,hint:s}){return c.qy`
    <media-menu-button class="vds-menu-item">
      ${w("menu-arrow-left","vds-menu-close-icon")}
      ${e?w(e,"vds-menu-item-icon"):null}
      <span class="vds-menu-item-label">${(0,d.xZ)(t)}</span>
      <span class="vds-menu-item-hint" data-part="hint">${s?(0,d.xZ)(s):null} </span>
      ${w("menu-arrow-right","vds-menu-open-icon")}
    </media-menu-button>
  `}function st(){return c.qy`
    <div class="vds-slider-track"></div>
    <div class="vds-slider-track-fill vds-slider-track"></div>
    <div class="vds-slider-thumb"></div>
  `}function it(){return c.qy`
    <media-slider-steps class="vds-slider-steps">
      <template>
        <div class="vds-slider-step"></div>
      </template>
    </media-slider-steps>
  `}function nt({label:t=null,value:e=null,upIcon:s="",downIcon:i="",children:n,isMin:o,isMax:a}){const l=t||e,r=[i?w(i,"down"):null,n,s?w(s,"up"):null];return c.qy`
    <div
      class=${"vds-menu-item vds-menu-slider-item"+(l?" group":"")}
      data-min=${(0,d.xZ)(()=>o()?"":null)}
      data-max=${(0,d.xZ)(()=>a()?"":null)}
    >
      ${l?c.qy`
            <div class="vds-menu-slider-title">
              ${[t?c.qy`<div>${t}</div>`:null,e?c.qy`<div>${e}</div>`:null]}
            </div>
            <div class="vds-menu-slider-body">${r}</div>
          `:r}
    </div>
  `}const ot={type:"slider",min:0,max:400,step:25,upIcon:null,downIcon:null,upIcon:"menu-opacity-up",downIcon:"menu-opacity-down"},at={type:"slider",min:0,max:100,step:5,upIcon:null,downIcon:null,upIcon:"menu-opacity-up",downIcon:"menu-opacity-down"};function lt(){const{translations:t}=g();return c.qy`
    <button class="vds-menu-item" role="menuitem" @click=${Q}>
      <span class="vds-menu-item-label">${(0,d.xZ)(()=>A(t,"Reset"))}</span>
    </button>
  `}function rt({label:t,option:e,type:s}){const{player:o}=(0,n.$c)(),{translations:a}=g(),l=z[s],r=()=>A(a,t);function u(){(0,i.io)(),o.dispatchEvent(new Event("vds-font-change"))}if("color"===e.type){function v(t){l.set(t.target.value),u()}return tt({label:(0,d.xZ)(r),children:c.qy`
        <input
          class="vds-color-picker"
          type="color"
          .value=${(0,d.xZ)(l)}
          @input=${v}
        />
      `})}if("slider"===e.type){const{min:h,max:$,step:b,upIcon:y,downIcon:f}=e;function x(t){l.set(t.detail+"%"),u()}return nt({label:(0,d.xZ)(r),value:(0,d.xZ)(l),upIcon:y,downIcon:f,isMin:()=>l()===h+"%",isMax:()=>l()===$+"%",children:c.qy`
        <media-slider
          class="vds-slider"
          min=${h}
          max=${$}
          step=${b}
          key-step=${b}
          .value=${(0,d.xZ)(()=>parseInt(l()))}
          aria-label=${(0,d.xZ)(r)}
          @value-change=${x}
          @drag-value-change=${x}
        >
          ${st()}${it()}
        </media-slider>
      `})}const p=(m=e.values,(0,i.cy)(m)?m.map(t=>({label:t,value:t.toLowerCase()})):Object.keys(m).map(t=>({label:t,value:m[t]})));var m;return c.qy`
    <media-menu class=${`vds-${(0,i.BW)(s)}-menu vds-menu`}>
      ${et({label:r,hint:()=>{const t=l(),e=p.find(e=>e.value===t)?.label||"";return A(a,(0,i.Kg)(e)?e:e())}})}
      <media-menu-items class="vds-menu-items">
        ${function({value:t=null,options:e,hideLabel:s=!1,children:n=null,onChange:o=null}){function a(t){const{value:e,label:o}=t;return c.qy`
      <media-radio class="vds-radio" value=${e}>
        ${w("menu-radio-check")}
        ${s?null:c.qy`
              <span class="vds-radio-label" data-part="label">
                ${(0,i.Kg)(o)?o:(0,d.xZ)(o)}
              </span>
            `}
        ${(0,i.Tn)(n)?n(t):n}
      </media-radio>
    `}return c.qy`
    <media-radio-group
      class="vds-radio-group"
      value=${(0,i.Kg)(t)?t:t?(0,d.xZ)(t):""}
      @change=${o}
    >
      ${(0,i.cy)(e)?e.map(a):(0,d.xZ)(()=>e().map(a))}
    </media-radio-group>
  `}({value:l,options:p,onChange({detail:t}){l.set(t),u()}})}
      </media-menu-items>
    </media-menu>
  `}function dt({label:t,checked:e,defaultChecked:s=!1,storageKey:n,onChange:a}){const{translations:l}=g(),r=(0,i.O)(!!((n&&localStorage.getItem(n))??s)),u=(0,i.O)(!1),p=(0,d.xZ)((0,o.Mc)(r)),m=C(l,t);function v(t){1!==t?.button&&(r.set(t=>!t),n&&localStorage.setItem(n,r()?"1":""),a(r(),t),u.set(!1))}return n&&a((0,i.se)(r)),e&&(0,i.QZ)(()=>{r.set(e())}),c.qy`
    <div
      class="vds-menu-checkbox"
      role="menuitemcheckbox"
      tabindex="0"
      aria-label=${m}
      aria-checked=${p}
      data-active=${(0,d.xZ)(()=>u()?"":null)}
      @pointerup=${v}
      @pointerdown=${function(t){0===t.button&&u.set(!0)}}
      @keydown=${function(t){(0,i.SK)(t)&&v()}}
    ></div>
  `}function ct(){const{userPrefersAnnouncements:t,translations:e}=g(),s="Announcements";return tt({label:C(e,s),children:dt({label:s,storageKey:"vds-player::announcements",onChange(e){t.set(e)}})})}function ut(){const{translations:t}=g(),e=C(t,"Boost"),s=pt,i=mt,n=vt;return c.qy`
    <media-audio-gain-slider
      class="vds-audio-gain-slider vds-slider"
      aria-label=${e}
      min=${(0,d.xZ)(s)}
      max=${(0,d.xZ)(i)}
      step=${(0,d.xZ)(n)}
      key-step=${(0,d.xZ)(n)}
    >
      ${st()}${it()}
    </media-audio-gain-slider>
  `}function pt(){const{audioGains:t}=g(),e=t();return(0,i.cy)(e)?e[0]??0:e.min}function mt(){const{audioGains:t}=g(),e=t();return(0,i.cy)(e)?e[e.length-1]??300:e.max}function vt(){const{audioGains:t}=g(),e=t();return(0,i.cy)(e)?e[1]-e[0]||25:e.step}function ht(){const{playbackRates:t}=g(),e=t();return(0,i.cy)(e)?e[0]??0:e.min}function $t(){const{playbackRates:t}=g(),e=t();return(0,i.cy)(e)?e[e.length-1]??2:e.max}function gt(){const{playbackRates:t}=g(),e=t();return(0,i.cy)(e)?e[1]-e[0]||.25:e.step}function bt(){const{translations:t}=g(),e=C(t,"Speed"),s=ht,i=$t,n=gt;return c.qy`
    <media-speed-slider
      class="vds-speed-slider vds-slider"
      aria-label=${e}
      min=${(0,d.xZ)(s)}
      max=${(0,d.xZ)(i)}
      step=${(0,d.xZ)(n)}
      key-step=${(0,d.xZ)(n)}
    >
      ${st()}${it()}
    </media-speed-slider>
  `}function yt({placement:t,portal:e,tooltip:s}){return(0,d.xZ)(()=>{const{viewType:o}=(0,n.nV)(),{translations:a,menuPortal:l,noModal:r,menuGroup:u,smallWhen:p}=g(),m=(0,i.EW)(()=>r()?(0,i.oA)(t):p()?null:(0,i.oA)(t)),v=(0,i.EW)(()=>p()||"bottom"!==u()||"video"!==o()?0:26),h=(0,i.O)(!1);!function(){const{player:t}=(0,n.$c)();j.add(t),function(t){for(const e of(0,i.YD)(z))X(t,e,z[e]())}(t),(0,i.zp)(()=>j.delete(t)),F||((0,i.P1)(()=>{for(const t of(0,i.YD)(z)){const e=z[t],s=D[t],n=`vds-player:${(0,i.BW)(t)}`;(0,i.QZ)(()=>{const i=e(),o=i===s;for(const e of j)X(e,t,i);o?localStorage.removeItem(n):localStorage.setItem(n,i)})}},null),F=!0)}();const $=c.qy`
      <media-menu-items
        class="vds-settings-menu-items vds-menu-items"
        placement=${(0,d.xZ)(m)}
        offset=${(0,d.xZ)(v)}
      >
        ${(0,d.xZ)(()=>h()?[(0,d.xZ)(()=>{const{translations:t}=g(),{canSetPlaybackRate:e,playbackRate:s}=(0,n.nV)();return e()?c.qy`
      <media-menu class="vds-speed-menu vds-menu">
        ${et({label:()=>A(t,"Speed"),icon:"menu-speed-up",hint:()=>1===s()?A(t,"Normal"):s()+"x"})}
        <media-menu-items class="vds-menu-items">
          ${J({label:C(t,"Speed"),value:(0,d.xZ)(()=>1===s()?A(t,"Normal"):s()+"x"),children:nt({upIcon:"menu-font-size-up",downIcon:"menu-font-size-down",children:bt(),isMin:()=>s()===ht(),isMax:()=>s()===$t()})})}
        </media-menu-items>
      </media-menu>
    `:null}),(0,d.xZ)(()=>{const{hideQualityBitrate:t,translations:e}=g(),{canSetQuality:s,qualities:i}=(0,n.nV)();if(!s()||i().length<=1)return null;const o=C(e,"Auto");return c.qy`
      <media-menu class="vds-quality-menu vds-menu">
        ${et({label:()=>A(e,"Quality"),icon:"menu-quality-up"})}
        <media-menu-items class="vds-menu-items">
          <media-quality-radio-group
            class="vds-quality-radio-group vds-radio-group"
            auto-label=${o}
            ?hide-bitrate=${(0,d.xZ)(t)}
          >
            <template>
              <media-radio class="vds-quality-radio vds-radio">
                <slot name="menu-radio-check-icon" data-class="vds-icon"></slot>
                <span class="vds-radio-label" data-part="label"></span>
                <span class="vds-radio-hint" data-part="bitrate"></span>
              </media-radio>
            </template>
          </media-quality-radio-group>
        </media-menu-items>
      </media-menu>
    `}),(0,d.xZ)(()=>{const{translations:t}=g();return c.qy`
      <media-menu class="vds-accessibility-menu vds-menu">
        ${et({label:()=>A(t,"Accessibility"),icon:"menu-accessibility"})}
        <media-menu-items class="vds-menu-items">
          ${[J({children:[ct(),(0,d.xZ)(()=>{const{translations:t,userPrefersKeyboardAnimations:e,noKeyboardAnimations:s}=g(),{viewType:o}=(0,n.nV)();if((0,i.EW)(()=>"video"!==o()||s())())return null;const a="Keyboard Animations";return tt({label:C(t,a),children:dt({label:a,defaultChecked:!0,storageKey:"vds-player::keyboard-animations",onChange(t){e.set(t)}})})})]}),J({children:[(0,d.xZ)(()=>{const{hasCaptions:t}=(0,n.nV)(),{translations:e}=g();return t()?c.qy`
      <media-menu class="vds-font-menu vds-menu">
        ${et({label:()=>A(e,"Caption Styles")})}
        <media-menu-items class="vds-menu-items">
          ${[J({label:C(e,"Font"),children:[rt({label:"Family",option:K,type:"fontFamily"}),rt({label:"Size",option:ot,type:"fontSize"})]}),J({label:C(e,"Text"),children:[rt({label:"Color",option:R,type:"textColor"}),rt({label:"Shadow",option:U,type:"textShadow"}),rt({label:"Opacity",option:at,type:"textOpacity"})]}),J({label:C(e,"Text Background"),children:[rt({label:"Color",option:R,type:"textBg"}),rt({label:"Opacity",option:at,type:"textBgOpacity"})]}),J({label:C(e,"Display Background"),children:[rt({label:"Color",option:R,type:"displayBg"}),rt({label:"Opacity",option:at,type:"displayBgOpacity"})]}),J({children:[lt()]})]}
        </media-menu-items>
      </media-menu>
    `:null})]})]}
        </media-menu-items>
      </media-menu>
    `}),(0,d.xZ)(()=>{const{noAudioGain:t,translations:e}=g(),{audioTrack:s,audioTracks:o,canSetAudioGain:a}=(0,n.nV)();return(0,i.EW)(()=>!(a()&&!t())&&o().length<=1)()?null:c.qy`
      <media-menu class="vds-audio-menu vds-menu">
        ${et({label:()=>A(e,"Audio"),icon:"menu-audio",hint:()=>s()?.label??""})}
        <media-menu-items class="vds-menu-items">
          ${[(0,d.xZ)(()=>{const{translations:t}=g(),{audioTracks:e}=(0,n.nV)(),s=C(t,"Default");return(0,i.EW)(()=>e().length<=1)()?null:J({children:c.qy`
        <media-menu class="vds-audio-tracks-menu vds-menu">
          ${et({label:()=>A(t,"Track")})}
          <media-menu-items class="vds-menu-items">
            <media-audio-radio-group
              class="vds-audio-track-radio-group vds-radio-group"
              empty-label=${s}
            >
              <template>
                <media-radio class="vds-audio-track-radio vds-radio">
                  <slot name="menu-radio-check-icon" data-class="vds-icon"></slot>
                  <span class="vds-radio-label" data-part="label"></span>
                </media-radio>
              </template>
            </media-audio-radio-group>
          </media-menu-items>
        </media-menu>
      `})}),(0,d.xZ)(()=>{const{noAudioGain:t,translations:e}=g(),{canSetAudioGain:s}=(0,n.nV)();if((0,i.EW)(()=>!s()||t())())return null;const{audioGain:o}=(0,n.nV)();return J({label:C(e,"Boost"),value:(0,d.xZ)(()=>Math.round(100*((o()??1)-1))+"%"),children:[nt({upIcon:"menu-audio-boost-up",downIcon:"menu-audio-boost-down",children:ut(),isMin:()=>100*((o()??1)-1)<=pt(),isMax:()=>100*((o()??1)-1)===mt()})]})})]}
        </media-menu-items>
      </media-menu>
    `}),(0,d.xZ)(()=>{const{translations:t}=g(),{hasCaptions:e}=(0,n.nV)(),s=C(t,"Off");return e()?c.qy`
      <media-menu class="vds-captions-menu vds-menu">
        ${et({label:()=>A(t,"Captions"),icon:"menu-captions"})}
        <media-menu-items class="vds-menu-items">
          <media-captions-radio-group
            class="vds-captions-radio-group vds-radio-group"
            off-label=${s}
          >
            <template>
              <media-radio class="vds-caption-radio vds-radio">
                <slot name="menu-radio-check-icon" data-class="vds-icon"></slot>
                <span class="vds-radio-label" data-part="label"></span>
              </media-radio>
            </template>
          </media-captions-radio-group>
        </media-menu-items>
      </media-menu>
    `:null})]:null)}
      </media-menu-items>
    `;return c.qy`
      <media-menu class="vds-settings-menu vds-menu" @open=${function(){h.set(!0)}} @close=${function(){h.set(!1)}}>
        <media-tooltip class="vds-tooltip">
          <media-tooltip-trigger>
            <media-menu-button
              class="vds-menu-button vds-button"
              aria-label=${C(a,"Settings")}
            >
              ${w("menu-settings","vds-rotate-icon")}
            </media-menu-button>
          </media-tooltip-trigger>
          <media-tooltip-content
            class="vds-tooltip-content"
            placement=${(0,i.Tn)(s)?(0,d.xZ)(s):s}
          >
            ${C(a,"Settings")}
          </media-tooltip-content>
        </media-tooltip>
        ${e?L(l,$):$}
      </media-menu>
    `})}function ft({orientation:t,tooltip:e}){return(0,d.xZ)(()=>{const{pointer:s,muted:a,canSetVolume:l}=(0,n.nV)();if("coarse"===s()&&!a())return null;if(!l())return T({tooltip:e});const r=(0,i.O)(void 0);return c.qy`
      <div class="vds-volume" ?data-active=${(0,d.xZ)((0,o._T)(r))} ${h(r.set)}>
        ${T({tooltip:e})}
        <div class="vds-volume-popup">${function({orientation:t}={}){const{translations:e}=g();return c.qy`
    <media-volume-slider
      class="vds-volume-slider vds-slider"
      aria-label=${C(e,"Volume")}
      orientation=${(0,u.J)(t)}
    >
      <div class="vds-slider-track"></div>
      <div class="vds-slider-track-fill vds-slider-track"></div>
      <media-slider-preview class="vds-slider-preview" no-clamp>
        <media-slider-value class="vds-slider-value"></media-slider-value>
      </media-slider-preview>
      <div class="vds-slider-thumb"></div>
    </media-volume-slider>
  `}({orientation:t})}</div>
      </div>
    `})}function xt(){const t=(0,i.O)(void 0),e=(0,i.O)(0),{thumbnails:s,translations:n,sliderChaptersMinWidth:a,disableTimeSlider:l,seekStep:r,noScrubGesture:u}=g(),p=C(n,"Seek"),m=(0,d.xZ)(l),v=(0,d.xZ)(()=>e()<a()),$=(0,d.xZ)(s);return(0,o.wY)(t,()=>{const s=t();s&&e.set(s.clientWidth)}),c.qy`
    <media-time-slider
      class="vds-time-slider vds-slider"
      aria-label=${p}
      key-step=${(0,d.xZ)(r)}
      ?disabled=${m}
      ?no-swipe-gesture=${(0,d.xZ)(u)}
      ${h(t.set)}
    >
      <media-slider-chapters class="vds-slider-chapters" ?disabled=${v}>
        <template>
          <div class="vds-slider-chapter">
            <div class="vds-slider-track"></div>
            <div class="vds-slider-track-fill vds-slider-track"></div>
            <div class="vds-slider-progress vds-slider-track"></div>
          </div>
        </template>
      </media-slider-chapters>
      <div class="vds-slider-thumb"></div>
      <media-slider-preview class="vds-slider-preview">
        <media-slider-thumbnail
          class="vds-slider-thumbnail vds-thumbnail"
          .src=${$}
        ></media-slider-thumbnail>
        <div class="vds-slider-chapter-title" data-part="chapter-title"></div>
        <media-slider-value class="vds-slider-value"></media-slider-value>
      </media-slider-preview>
    </media-time-slider>
  `}function At(){return(0,d.xZ)(()=>{const{live:t}=(0,n.nV)();return t()?P():c.qy`
    <div class="vds-time-group">
      ${(0,d.xZ)(()=>{const{duration:t}=(0,n.nV)();return t()?[c.qy`<media-time class="vds-time" type="current"></media-time>`,c.qy`<div class="vds-time-divider">/</div>`,c.qy`<media-time class="vds-time" type="duration"></media-time>`]:null})}
    </div>
  `})}function _t(){return(0,d.xZ)(()=>{const{textTracks:t}=(0,n.$c)(),{title:e,started:s}=(0,n.nV)(),o=(0,i.O)(null);return(0,r.q)(t,"chapters",o.set),!o()||!s()&&e()?c.qy`<media-title class="vds-chapter-title"></media-title>`:wt()})}function wt(){return c.qy`<media-chapter-title class="vds-chapter-title"></media-chapter-title>`}var kt=class extends d.UT{async loadIcons(){const t=(await s.e(5994).then(s.bind(s,25994))).icons,e={};for(const s of Object.keys(t))e[s]=(0,d.In)({name:s,paths:t[s]});return e}},Ct=class extends y{static props={...super.props,when:({viewType:t})=>"audio"===t,smallWhen:({width:t})=>t<576}};function St(){const t="top end";return[V({tooltip:"top",placement:t,portal:!0}),yt({tooltip:"top end",placement:t,portal:!0})]}var qt=class extends((0,i.xr)(a.W,Ct)){static tagName="media-audio-layout";static attrs={smallWhen:{converter:t=>"never"!==t&&!!t}};#h;#y=(0,i.O)(!1);onSetup(){this.forwardKeepAlive=!1,this.#h=(0,n.$c)(),this.#f(),this.#x()}onConnect(){this.#f(),x("audio",()=>this.isMatch),this.#A()}render(){return(0,d.xZ)(this.#_.bind(this))}#_(){return this.isMatch?[_(),N(),c.qy`
      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          ${[O({backward:!0,tooltip:"top start"}),Z({tooltip:"top"}),O({tooltip:"top"}),(0,d.xZ)(()=>{let t=(0,i.O)(void 0),e=(0,i.O)(!1),s=(0,n.$c)(),{title:a,started:l,currentTime:r,ended:u}=(0,n.nV)(),{translations:p}=g(),m=(0,o.ZG)(t),v=()=>l()||r()>0;const $=()=>`${A(p,u()?"Replay":v()?"Continue":"Play")}: ${a()}`;function b(){return c.qy`
        <span class="vds-title-text">
          ${(0,d.xZ)($)}${(0,d.xZ)(()=>v()?wt():null)}
        </span>
      `}return(0,i.QZ)(()=>{m()&&document.activeElement===document.body&&s.player.el?.focus({preventScroll:!0})}),(0,o.wY)(t,function(){const s=t(),n=!!s&&!m()&&s.clientWidth<s.children[0].clientWidth;s&&(0,i.p1)(s,"vds-marquee",n),e.set(n)}),a()?c.qy`
          <span class="vds-title" title=${(0,d.xZ)($)} ${h(t.set)}>
            ${[b(),(0,d.xZ)(()=>e()&&!m()?b():null)]}
          </span>
        `:B()}),xt(),(0,d.xZ)(()=>{const{live:t,duration:e}=(0,n.nV)();return t()?P():e()?c.qy`<media-time class="vds-time" type="current" toggle remainder></media-time>`:null}),ft({orientation:"vertical",tooltip:"top"}),M({tooltip:"top"}),E(),S({tooltip:"top"}),St()]}
        </media-controls-group>
      </media-controls>
    `]:null}#f(){this.classList.add("vds-audio-layout")}#A(){const{menuPortal:t}=g();(0,i.QZ)(()=>{if(!this.isMatch)return;const e=H(this,this.menuContainer,"vds-audio-layout",()=>this.isSmallLayout),s=e?[this,e]:[this];return(this.$props.customIcons()?new d.kj(s):new kt(s)).connect(),t.set(e),()=>{e.remove(),t.set(null)}})}#x(){const{pointer:t}=this.#h.$state;(0,i.QZ)(()=>{"coarse"===t()&&(0,i.QZ)(this.#w.bind(this))})}#w(){this.#y()?((0,i.k6)(this,"pointerdown",t=>t.stopPropagation()),(0,i.k6)(window,"pointerdown",this.#k.bind(this))):(0,i.k6)(this,"pointerdown",this.#C.bind(this),{capture:!0})}#C(t){const{target:e}=t;(0,o.sb)(e)&&e.closest(".vds-time-slider")&&(t.stopImmediatePropagation(),this.setAttribute("data-scrubbing",""),this.#y.set(!0))}#k(){this.#y.set(!1),this.removeAttribute("data-scrubbing")}},Zt=s(27727);const Tt=(0,m.u$)(class extends m.WL{constructor(){super(...arguments),this.key=c.s6}render(t,e){return this.key=t,e}update(t,[e,s]){return e!==this.key&&((0,Zt.mY)(t),this.key=e),s}});var Mt=class extends y{static props={...super.props,when:({viewType:t})=>"video"===t,smallWhen:({width:t,height:e})=>t<576||e<380}};function It(){return(0,d.xZ)(()=>{const t=(0,n.$c)(),{noKeyboardAnimations:e,userPrefersKeyboardAnimations:s}=g();if((0,i.EW)(()=>e()||!s())())return null;const a=(0,i.O)(!1),{lastKeyboardAction:l}=t.$state;(0,i.QZ)(()=>{a.set(!!l());const t=setTimeout(()=>a.set(!1),500);return()=>{a.set(!1),window.clearTimeout(t)}});const r=(0,i.EW)(()=>{const t=l()?.action;return t&&a()?(0,i.BW)(t):null}),u=(0,i.EW)(()=>"vds-kb-action"+(a()?"":" hidden")),p=(0,i.EW)(Wt),m=(0,i.EW)(()=>{const t=function(){const{$state:t}=(0,n.$c)();switch(t.lastKeyboardAction()?.action){case"togglePaused":return t.paused()?"kb-pause-icon":"kb-play-icon";case"toggleMuted":return t.muted()||0===t.volume()?"kb-mute-icon":t.volume()>=.5?"kb-volume-up-icon":"kb-volume-down-icon";case"toggleFullscreen":return`kb-fs-${t.fullscreen()?"enter":"exit"}-icon`;case"togglePictureInPicture":return`kb-pip-${t.pictureInPicture()?"enter":"exit"}-icon`;case"toggleCaptions":return t.hasCaptions()?`kb-cc-${t.textTrack()?"on":"off"}-icon`:null;case"volumeUp":return"kb-volume-up-icon";case"volumeDown":return"kb-volume-down-icon";case"seekForward":return"kb-seek-forward-icon";case"seekBackward":return"kb-seek-backward-icon";default:return null}}();return t?(0,o.TL)(t):null});return c.qy`
      <div class=${(0,d.xZ)(u)} data-action=${(0,d.xZ)(r)}>
        <div class="vds-kb-text-wrapper">
          <div class="vds-kb-text">${(0,d.xZ)(p)}</div>
        </div>
        ${(0,d.xZ)(()=>Tt(l(),function(){const t=m();return t?c.qy`
        <div class="vds-kb-bezel">
          <div class="vds-kb-icon">${t}</div>
        </div>
      `:null}()))}
      </div>
    `})}function Wt(){const{$state:t}=(0,n.$c)(),e=t.lastKeyboardAction()?.action,s=t.audioGain()??1;switch(e){case"toggleMuted":return t.muted()?"0%":Ot(t.volume(),s);case"volumeUp":case"volumeDown":return Ot(t.volume(),s);default:return""}}function Ot(t,e){return`${Math.round(t*e*100)}%`}function Pt(){return c.qy`
    <div class="vds-buffering-indicator">
      <media-spinner class="vds-buffering-spinner"></media-spinner>
    </div>
  `}function Et(){const{menuGroup:t,smallWhen:e}=g(),s=()=>"top"===t()||e()?"bottom":"top",n=(0,i.EW)(()=>`${s()} ${"top"===t()?"end":"center"}`),o=(0,i.EW)(()=>`${s()} end`);return[V({tooltip:n,placement:o,portal:!0}),yt({tooltip:n,placement:o,portal:!0})]}function Nt(){return(0,d.xZ)(()=>{const{noGestures:t}=g();return t()?null:c.qy`
      <div class="vds-gestures">
        <media-gesture class="vds-gesture" event="pointerup" action="toggle:paused"></media-gesture>
        <media-gesture
          class="vds-gesture"
          event="pointerup"
          action="toggle:controls"
        ></media-gesture>
        <media-gesture
          class="vds-gesture"
          event="dblpointerup"
          action="toggle:fullscreen"
        ></media-gesture>
        <media-gesture class="vds-gesture" event="dblpointerup" action="seek:-10"></media-gesture>
        <media-gesture class="vds-gesture" event="dblpointerup" action="seek:10"></media-gesture>
      </div>
    `})}var Bt=class extends((0,i.xr)(a.W,Mt)){static tagName="media-video-layout";static attrs={smallWhen:{converter:t=>"never"!==t&&!!t}};#h;onSetup(){this.forwardKeepAlive=!1,this.#h=(0,n.$c)(),this.#f()}onConnect(){this.#f(),x("video",()=>this.isMatch),this.#A()}render(){return(0,d.xZ)(this.#_.bind(this))}#f(){this.classList.add("vds-video-layout")}#A(){const{menuPortal:t}=g();(0,i.QZ)(()=>{if(!this.isMatch)return;const e=H(this,this.menuContainer,"vds-video-layout",()=>this.isSmallLayout),s=e?[this,e]:[this];return(this.$props.customIcons()?new d.kj(s):new kt(s)).connect(),t.set(e),()=>{e.remove(),t.set(null)}})}#_(){const{load:t}=this.#h.$props,{canLoad:e,streamType:s,nativeControls:i}=this.#h.$state;return!i()&&this.isMatch?"play"!==t()||e()?"unknown"===s()?Pt():this.isSmallLayout?[_(),Nt(),Pt(),N(),It(),c.qy`<div class="vds-scrim"></div>`,c.qy`
      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          ${[S({tooltip:"top start"}),q({tooltip:"bottom start"}),B(),M({tooltip:"bottom"}),E(),Et(),ft({orientation:"vertical",tooltip:"bottom end"})]}
        </media-controls-group>

        ${B()}

        <media-controls-group class="vds-controls-group" style="pointer-events: none;">
          ${[B(),Z({tooltip:"top"}),B()]}
        </media-controls-group>

        ${B()}

        <media-controls-group class="vds-controls-group">
          ${[At(),_t(),W({tooltip:"top end"})]}
        </media-controls-group>

        <media-controls-group class="vds-controls-group">
          ${xt()}
        </media-controls-group>
      </media-controls>
    `,(0,d.xZ)(()=>{const{duration:t}=(0,n.nV)();return 0===t()?null:c.qy`
      <div class="vds-start-duration">
        <media-time class="vds-time" type="duration"></media-time>
      </div>
    `})]:[_(),Nt(),Pt(),It(),N(),c.qy`<div class="vds-scrim"></div>`,c.qy`
      <media-controls class="vds-controls">
        ${[c.qy`
    <media-controls-group class="vds-controls-group">
      ${(0,d.xZ)(()=>{const{menuGroup:t}=g();return"top"===t()?[B(),Et()]:null})}
    </media-controls-group>
  `,B(),c.qy`<media-controls-group class="vds-controls-group"></media-controls-group>`,B(),c.qy`
            <media-controls-group class="vds-controls-group">
              ${xt()}
            </media-controls-group>
          `,c.qy`
            <media-controls-group class="vds-controls-group">
              ${[Z({tooltip:"top start"}),ft({orientation:"horizontal",tooltip:"top"}),At(),_t(),M({tooltip:"top"}),(0,d.xZ)(()=>{const{menuGroup:t}=g();return"bottom"===t()?Et():null}),S({tooltip:"top"}),q({tooltip:"top"}),E(),I(),W({tooltip:"top end"})]}
            </media-controls-group>
          `]}
      </media-controls>
    `]:c.qy`
    <div class="vds-load-container">
      ${[Pt(),Z({tooltip:"top"})]}
    </div>
  `:null}};(0,i.Xq)(qt),(0,i.Xq)(Bt)}}]);