/*! For license information please see 5739.7696c8c8.js.LICENSE.txt */
"use strict";(self.webpackChunkvuepress_theme_hope_template=self.webpackChunkvuepress_theme_hope_template||[]).push([[5739],{96214(t,e,s){s.d(e,{Kq:()=>d,OA:()=>a.OA,u$:()=>a.u$});var n=s(27727),a=s(84703);const l=(t,e)=>{var s,n;const a=t._$AN;if(void 0===a)return!1;for(const t of a)null===(n=(s=t)._$AO)||void 0===n||n.call(s,e,!1),l(t,e);return!0},i=t=>{let e,s;do{if(void 0===(e=t._$AM))break;s=e._$AN,s.delete(t),t=e}while(0===(null==s?void 0:s.size))},r=t=>{for(let e;e=t._$AM;t=e){let s=e._$AN;if(void 0===s)e._$AN=s=new Set;else if(s.has(t))break;s.add(t),p(e)}};function o(t){void 0!==this._$AN?(i(this),this._$AM=t,r(this)):this._$AM=t}function c(t,e=!1,s=0){const n=this._$AH,a=this._$AN;if(void 0!==a&&0!==a.size)if(e)if(Array.isArray(n))for(let t=s;t<n.length;t++)l(n[t],!1),i(n[t]);else null!=n&&(l(n,!1),i(n));else l(this,t)}const p=t=>{var e,s,n,l;t.type==a.OA.CHILD&&(null!==(e=(n=t)._$AP)&&void 0!==e||(n._$AP=c),null!==(s=(l=t)._$AQ)&&void 0!==s||(l._$AQ=o))};class d extends a.WL{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),r(this),this.isConnected=t._$AU}_$AO(t,e=!0){var s,n;t!==this.isConnected&&(this.isConnected=t,t?null===(s=this.reconnected)||void 0===s||s.call(this):null===(n=this.disconnected)||void 0===n||n.call(this)),e&&(l(this,t),i(this))}setValue(t){if((0,n.Rt)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}},27727(t,e,s){s.d(e,{Rt:()=>l,mY:()=>r});var n=s(54245);const{I:a}=n.ge,l=t=>void 0===t.strings,i={},r=(t,e=i)=>t._$AH=e},84703(t,e,s){s.d(e,{OA:()=>n,WL:()=>l,u$:()=>a});const n={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},a=t=>(...e)=>({_$litDirective$:t,values:e});class l{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}},11822(t,e,s){s.d(e,{J:()=>a});var n=s(54245);const a=t=>null!=t?t:n.s6},52993(t,e,s){s.d(e,{D:()=>l,_:()=>i});var n=s(54245),a=s(84703);class l extends a.WL{constructor(t){if(super(t),this.et=n.s6,t.type!==a.OA.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===n.s6||null==t)return this.ft=void 0,this.et=t;if(t===n.c0)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}l.directiveName="unsafeHTML",l.resultType=1;const i=(0,a.u$)(l)},95238(t,e,s){s.d(e,{xZ:()=>_,In:()=>v,UT:()=>b,kj:()=>$});var n=s(40512),a=s(79551),l=s(54245),i=s(96214),r=s(11822),o=s(84703),c=s(52993);class p extends c.D{}p.directiveName="unsafeSVG",p.resultType=2;const d=(0,o.u$)(p);var u=class extends i.Kq{#t=null;#e=!1;#s=null;constructor(t){super(t),this.#e=t.type===i.OA.ATTRIBUTE||t.type===i.OA.BOOLEAN_ATTRIBUTE}render(t){return t!==this.#t&&(this.disconnected(),this.#t=t,this.isConnected&&this.#n()),this.#t?this.#a((0,n.se)(this.#t)):l.s6}reconnected(){this.#n()}disconnected(){this.#s?.(),this.#s=null}#n(){this.#t&&(this.#s=(0,n.QZ)(this.#l.bind(this)))}#a(t){return this.#e?(0,r.J)(t):t}#i(t){this.setValue(this.#a(t))}#l(){this.#i(this.#t?.())}};function _(t){return(0,i.u$)(u)((0,n.EW)(t))}var m=class{#r;#o;elements=new Set;constructor(t,e){this.#r=t,this.#o=e}connect(){this.#c();const t=new MutationObserver(this.#p);for(const e of this.#r)t.observe(e,{childList:!0,subtree:!0});(0,n.zp)(()=>t.disconnect()),(0,n.zp)(this.disconnect.bind(this))}disconnect(){this.elements.clear()}assign(t,e){(0,n.vA)(t)?(e.textContent="",e.append(t)):((0,l.XX)(null,e),(0,l.XX)(t,e)),e.style.display||(e.style.display="contents");const s=e.firstElementChild;if(!s)return;const a=e.getAttribute("data-class");a&&s.classList.add(...a.split(" "))}#p=(0,n.s_)(this.#c.bind(this));#c(t){if(t&&!t.some(t=>t.addedNodes.length))return;let e=!1,s=this.#r.flatMap(t=>[...t.querySelectorAll("slot")]);for(const t of s)t.hasAttribute("name")&&!this.elements.has(t)&&(this.elements.add(t),e=!0);e&&this.#o(this.elements)}};let y=0,h="data-slot-id";var $=class{#r;slots;constructor(t){this.#r=t,this.slots=new m(t,this.#c.bind(this))}connect(){this.slots.connect(),this.#c();const t=new MutationObserver(this.#p);for(const e of this.#r)t.observe(e,{childList:!0});(0,n.zp)(()=>t.disconnect())}#p=(0,n.s_)(this.#c.bind(this));#c(){for(const t of this.#r)for(const e of t.children){if(1!==e.nodeType)continue;const t=e.getAttribute("slot");if(!t)continue;e.style.display="none";let s=e.getAttribute(h);s||e.setAttribute(h,s=++y+"");for(const n of this.slots.elements){if(n.getAttribute("name")!==t||n.getAttribute(h)===s)continue;const a=document.importNode(e,!0);t.includes("-icon")&&a.classList.add("vds-icon"),a.style.display="",a.removeAttribute("slot"),this.slots.assign(a,n),n.setAttribute(h,s)}}}};function v({name:t,class:e,state:s,paths:a,viewBox:i="0 0 32 32"}){return l.qy`<svg
    class="${"vds-icon"+(e?` ${e}`:"")}"
    viewBox="${i}"
    fill="none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    data-icon=${(0,r.J)(t??s)}
  >
    ${(0,n.Kg)(a)?d(a):_(a)}
  </svg>`}var f=class{#d={};#u=!1;slots;constructor(t){this.slots=new m(t,this.#_.bind(this))}connect(){this.slots.connect()}load(){this.loadIcons().then(t=>{this.#d=t,this.#u=!0,this.#_()})}*#m(){for(const t of Object.keys(this.#d)){const e=`${t}-icon`;for(const s of this.slots.elements)s.name===e&&(yield{icon:this.#d[t],slot:s})}}#_(){if(this.#u)for(const{icon:t,slot:e}of this.#m())this.slots.assign(t,e)}},b=class extends f{connect(){super.connect();const{player:t}=(0,a.$c)();if(!t.el)return;let e,s=new IntersectionObserver(t=>{t[0]?.isIntersecting&&(e?.(),e=void 0,this.load())});s.observe(t.el),e=(0,n.zp)(()=>s.disconnect())}}},95739(t,e,s){var n=s(40512),a=s(91828),l=s(99515),i=s(97974),r=s(79551);const o=(0,n.q6)();function c(){return(0,n.NT)(o)}const p={clickToPlay:!0,clickToFullscreen:!0,controls:["play-large","play","progress","current-time","mute+volume","captions","settings","pip","airplay","fullscreen"],customIcons:!1,displayDuration:!1,download:null,markers:null,invertTime:!0,thumbnails:null,toggleTime:!0,translations:null,seekTime:10,speed:[.5,.75,1,1.25,1.5,1.75,2,4]};var d=class extends n.uA{static props=p;#y;onSetup(){this.#y=(0,r.$c)(),(0,n.Pp)(o,{...this.$props,previewTime:(0,n.O)(0)})}},u=s(1041),_=s(95238),m=s(54245),y=s(52993),h=class extends _.UT{async loadIcons(){const t=(await s.e(2703).then(s.bind(s,92703))).icons,e={};for(const s of Object.keys(t))e[s]=(0,_.In)({name:s,paths:t[s],viewBox:"0 0 18 18"});return e}};function $(t,e){return t()?.[e]??e}function v(){const t=(0,r.$c)(),{translations:e}=c(),{title:s}=t.$state;return m.qy`
    <media-play-button
      class="plyr__control plyr__control--overlaid"
      aria-label=${(0,_.xZ)(()=>`${$(e,"Play")}, ${s()}`)}
      data-plyr="play"
    >
      <slot name="play-icon"></slot>
    </button>
  `}function f(){const{controls:t}=c();return(0,_.xZ)(()=>t().includes("play-large")?v():null)}function b(){const{thumbnails:t,previewTime:e}=c();return m.qy`
    <media-thumbnail
      .src=${(0,_.xZ)(t)}
      class="plyr__preview-scrubbing"
      time=${(0,_.xZ)(()=>e())}
    ></media-thumbnail>
  `}function g(){const{poster:t}=(0,r.$c)().$state;return m.qy`<div class="plyr__poster" style=${(0,_.xZ)(()=>`background-image: url("${t()}");`)}></div>`}function q(){const{controls:t}=c();return m.qy`<div class="plyr__controls">${(0,_.xZ)(()=>t().map(A))}</div>`}function A(t){switch(t){case"airplay":return function(){const{translations:t}=c();return m.qy`
    <media-airplay-button class="plyr__controls__item plyr__control" data-plyr="airplay">
      <slot name="airplay-icon"></slot>
      <span class="plyr__tooltip">${I(t,"AirPlay")}</span>
    </media-airplay-button>
  `}();case"captions":return function(){const{translations:t}=c();return m.qy`
    <media-caption-button
      class="plyr__controls__item plyr__control"
      data-no-label
      data-plyr="captions"
    >
      <slot name="captions-on-icon" data-class="icon--pressed"></slot>
      <slot name="captions-off-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${I(t,"Disable captions")}</span>
      <span class="label--not-pressed plyr__tooltip">${I(t,"Enable captions")}</span>
    </media-caption-button>
  `}();case"current-time":return function(){const t=(0,r.$c)(),{translations:e,invertTime:s,toggleTime:a,displayDuration:l}=c(),i=(0,n.O)((0,n.se)(s));function o(t){!a()||l()||(0,n.kx)(t)&&!(0,n.SK)(t)||i.set(t=>!t)}return(0,_.xZ)(()=>{const{streamType:s}=t.$state,n=I(e,"LIVE"),a=I(e,"Current time"),r=(0,_.xZ)(()=>!l()&&i());return"live"===s()||"ll-live"===s()?m.qy`
          <media-live-button
            class="plyr__controls__item plyr__control plyr__live-button"
            data-plyr="live"
          >
            <span class="plyr__live-button__text">${n}</span>
          </media-live-button>
        `:m.qy`
          <media-time
            type="current"
            class="plyr__controls__item plyr__time plyr__time--current"
            tabindex="0"
            role="timer"
            aria-label=${a}
            ?remainder=${r}
            @pointerup=${o}
            @keydown=${o}
          ></media-time>
          ${(0,_.xZ)(()=>l()?T():null)}
        `})}();case"download":return(0,_.xZ)(()=>{const t=(0,r.$c)(),{translations:e,download:s}=c(),{title:a,source:l}=t.$state,o=l(),p=s(),d=(0,i.d_)({title:a(),src:o,download:p}),u=I(e,"Download");return(0,n.Kg)(d?.url)?m.qy`
          <a
            class="plyr__controls__item plyr__control"
            href=${(0,i.xF)(d.url,{download:d.name})}
            download=${d.name}
            target="_blank"
          >
            <slot name="download-icon" />
            <span class="plyr__tooltip">${u}</span>
          </a>
        `:null});case"duration":return T();case"fast-forward":return function(){const{translations:t,seekTime:e}=c(),s=(0,_.xZ)(()=>`${$(t,"Forward")} ${e()}s`);return m.qy`
    <media-seek-button
      class="plyr__controls__item plyr__control"
      seconds=${(0,_.xZ)(e)}
      data-no-label
      data-plyr="fast-forward"
    >
      <slot name="fast-forward-icon"></slot>
      <span class="plyr__tooltip">${s}</span>
    </media-seek-button>
  `}();case"fullscreen":return function(){const{translations:t}=c(),e=I(t,"Enter Fullscreen");return m.qy`
    <media-fullscreen-button
      class="plyr__controls__item plyr__control"
      data-no-label
      data-plyr="fullscreen"
    >
      <slot name="enter-fullscreen-icon" data-class="icon--pressed"></slot>
      <slot name="exit-fullscreen-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${I(t,"Exit Fullscreen")}</span>
      <span class="label--not-pressed plyr__tooltip">${e}</span>
    </media-fullscreen-button>
  `}();case"mute":case"volume":case"mute+volume":return function(t){return(0,_.xZ)(()=>{const e="mute"===t||"mute+volume"===t,s="volume"===t||"mute+volume"===t;return m.qy`
      <div class="plyr__controls__item plyr__volume">
        ${[e?w():null,s?x():null]}
      </div>
    `})}(t);case"pip":return function(){const{translations:t}=c(),e=I(t,"Enter PiP");return m.qy`
    <media-pip-button class="plyr__controls__item plyr__control" data-no-label data-plyr="pip">
      <slot name="pip-icon"></slot>
      <slot name="enter-pip-icon" data-class="icon--pressed"></slot>
      <slot name="exit-pip-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${I(t,"Exit PiP")}</span>
      <span class="label--not-pressed plyr__tooltip">${e}</span>
    </media-pip-button>
  `}();case"play":return function(){const{translations:t}=c(),e=I(t,"Play");return m.qy`
    <media-play-button class="plyr__controls__item plyr__control" data-no-label data-plyr="play">
      <slot name="pause-icon" data-class="icon--pressed"></slot>
      <slot name="play-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${I(t,"Pause")}</span>
      <span class="label--not-pressed plyr__tooltip">${e}</span>
    </media-play-button>
  `}();case"progress":return function(){let{duration:t,viewType:e}=(0,r.$c)().$state,{translations:s,markers:a,thumbnails:l,seekTime:i,previewTime:o}=c(),p=I(s,"Seek"),d=(0,n.O)(null),u=(0,_.xZ)(()=>{const t=d();return t?m.qy`<span class="plyr__progress__marker-label">${(0,y._)(t.label)}<br /></span>`:null});function h(){d.set(this)}function $(){d.set(null)}return m.qy`
    <div class="plyr__controls__item plyr__progress__container">
      <div class="plyr__progress">
        <media-time-slider
          class="plyr__slider"
          data-plyr="seek"
          pause-while-dragging
          key-step=${(0,_.xZ)(i)}
          aria-label=${p}
          @media-seeking-request=${function(t){o.set(t.detail)}}
        >
          <div class="plyr__slider__track"></div>
          <div class="plyr__slider__thumb"></div>
          <div class="plyr__slider__buffer"></div>
          ${(0,_.xZ)(function(){const t=l(),s=(0,_.xZ)(()=>"audio"===e());return t?m.qy`
          <media-slider-preview class="plyr__slider__preview" ?no-clamp=${s}>
            <media-slider-thumbnail .src=${t} class="plyr__slider__preview__thumbnail">
              <span class="plyr__slider__preview__time-container">
                ${u}
                <media-slider-value class="plyr__slider__preview__time"></media-slider-value>
              </span>
            </media-slider-thumbnail>
          </media-slider-preview>
        `:m.qy`
          <span class="plyr__tooltip">
            ${u}
            <media-slider-value></media-slider-value>
          </span>
        `})}${(0,_.xZ)(function(){const e=t();return Number.isFinite(e)?a()?.map(t=>m.qy`
        <span
          class="plyr__progress__marker"
          @mouseenter=${h.bind(t)}
          @mouseleave=${$}
          style=${`left: ${t.time/e*100}%;`}
        ></span>
      `):null})}
        </media-time-slider>
      </div>
    </div>
  `}();case"restart":return function(){const{translations:t}=c(),{remote:e}=(0,r.$c)(),s=I(t,"Restart");function a(t){(0,n.kx)(t)&&!(0,n.SK)(t)||e.seek(0,t)}return m.qy`
    <button
      type="button"
      class="plyr__control"
      data-plyr="restart"
      @pointerup=${a}
      @keydown=${a}
    >
      <slot name="restart-icon"></slot>
      <span class="plyr__tooltip">${s}</span>
    </button>
  `}();case"rewind":return function(){const{translations:t,seekTime:e}=c(),s=(0,_.xZ)(()=>`${$(t,"Rewind")} ${e()}s`);return m.qy`
    <media-seek-button
      class="plyr__controls__item plyr__control"
      seconds=${(0,_.xZ)(()=>-1*e())}
      data-no-label
      data-plyr="rewind"
    >
      <slot name="rewind-icon"></slot>
      <span class="plyr__tooltip">${s}</span>
    </media-seek-button>
  `}();case"settings":return function(){const{translations:t}=c();return m.qy`
    <div class="plyr__controls__item plyr__menu">
      <media-menu>
        <media-menu-button class="plyr__control" data-plyr="settings">
          <slot name="settings-icon" />
          <span class="plyr__tooltip">${I(t,"Settings")}</span>
        </media-menu-button>
        <media-menu-items class="plyr__menu__container" placement="top end">
          <div><div>${[Z({label:"Audio",children:X()}),Z({label:"Captions",children:O()}),Z({label:"Quality",children:E()}),Z({label:"Speed",children:C()})]}</div></div>
        </media-menu-items>
      </media-menu>
    </div>
  `}();default:return null}}function w(){const{translations:t}=c(),e=I(t,"Mute");return m.qy`
    <media-mute-button class="plyr__control" data-no-label data-plyr="mute">
      <slot name="muted-icon" data-class="icon--pressed"></slot>
      <slot name="volume-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${I(t,"Unmute")}</span>
      <span class="label--not-pressed plyr__tooltip">${e}</span>
    </media-mute-button>
  `}function x(){const{translations:t}=c();return m.qy`
    <media-volume-slider class="plyr__slider" data-plyr="volume" aria-label=${I(t,"Volume")}>
      <div class="plyr__slider__track"></div>
      <div class="plyr__slider__thumb"></div>
    </media-volume-slider>
  `}function T(){const{translations:t}=c();return m.qy`
    <media-time
      type="duration"
      class="plyr__controls__item plyr__time plyr__time--duration"
      role="timer"
      tabindex="0"
      aria-label=${I(t,"Duration")}
    ></media-time>
  `}function k(){const t=(0,r.$c)(),e=(0,n.O)(void 0),s=(0,_.xZ)(()=>(0,y._)(e()?.text));return(0,n.QZ)(()=>{const s=t.$state.textTrack();if(s)return a(),(0,n.k6)(s,"cue-change",a);function a(){e.set(s?.activeCues[0])}}),m.qy`
    <div class="plyr__captions" dir="auto">
      <span class="plyr__caption">${s}</span>
    </div>
  `}function Z({label:t,children:e}){const s=(0,n.O)(!1);return m.qy`
    <media-menu @open=${()=>s.set(!0)} @close=${()=>s.set(!1)}>
      ${function({open:t,label:e}){const{translations:s}=c(),n=(0,_.xZ)(()=>"plyr__control plyr__control--"+(t()?"back":"forward"));return m.qy`
    <media-menu-button class=${n} data-plyr="settings">
      <span class="plyr__menu__label" aria-hidden=${a=t,(0,_.xZ)(()=>a()?"true":"false")}>
        ${I(s,e)}
      </span>
      <span class="plyr__menu__value" data-part="hint"></span>
      ${function(){const e=I(s,"Go back to previous menu");return(0,_.xZ)(()=>t()?m.qy`<span class="plyr__sr-only">${e}</span>`:null)}()}
    </media-menu-button>
  `;var a}({label:t,open:s})}
      <media-menu-items>${e}</media-menu-items>
    </media-menu>
  `}function X(){const{translations:t}=c();return m.qy`
    <media-audio-radio-group empty-label=${I(t,"Default")}>
      <template>
        <media-radio class="plyr__control" data-plyr="audio">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-audio-radio-group>
  `}function C(){const{translations:t,speed:e}=c();return m.qy`
    <media-speed-radio-group .rates=${e} normal-label=${I(t,"Normal")}>
      <template>
        <media-radio class="plyr__control" data-plyr="speed">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-speed-radio-group>
  `}function O(){const{translations:t}=c();return m.qy`
    <media-captions-radio-group off-label=${I(t,"Disabled")}>
      <template>
        <media-radio class="plyr__control" data-plyr="captions">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-captions-radio-group>
  `}function E(){const{translations:t}=c();return m.qy`
    <media-quality-radio-group auto-label=${I(t,"Auto")}>
      <template>
        <media-radio class="plyr__control" data-plyr="quality">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-quality-radio-group>
  `}function I(t,e){return(0,_.xZ)(()=>$(t,e))}var L=class extends((0,n.xr)(u.W,d)){static tagName="media-plyr-layout";#y;onSetup(){this.forwardKeepAlive=!1,this.#y=(0,r.$c)()}onConnect(){this.#y.player.el?.setAttribute("data-layout","plyr"),(0,n.zp)(()=>this.#y.player.el?.removeAttribute("data-layout")),function(t,e){const{canAirPlay:s,canFullscreen:a,canPictureInPicture:l,controlsHidden:i,currentTime:r,fullscreen:o,hasCaptions:c,isAirPlayConnected:p,paused:d,pictureInPicture:u,playing:_,pointer:m,poster:y,textTrack:h,viewType:$,waiting:v}=e.$state;t.classList.add("plyr"),t.classList.add("plyr--full-ui");const f={"plyr--airplay-active":p,"plyr--airplay-supported":s,"plyr--fullscreen-active":o,"plyr--fullscreen-enabled":a,"plyr--hide-controls":i,"plyr--is-touch":()=>"coarse"===m(),"plyr--loading":v,"plyr--paused":d,"plyr--pip-active":u,"plyr--pip-enabled":l,"plyr--playing":_,"plyr__poster-enabled":y,"plyr--stopped":()=>d()&&0===r(),"plyr--captions-active":h,"plyr--captions-enabled":c},b=(0,n.z2)();for(const e of Object.keys(f))b.add((0,n.QZ)(()=>{t.classList.toggle(e,!!f[e]())}));b.add((0,n.QZ)(()=>{const e=`plyr--${$()}`;return t.classList.add(e),()=>t.classList.remove(e)}),(0,n.QZ)(()=>{const{$provider:s}=e,n=s()?.type,a=`plyr--${function(t){return"audio"===t||"video"===t}(n)?"html5":n}`;return t.classList.toggle(a,!!n),()=>t.classList.remove(a)}))}(this,this.#y),(0,n.QZ)(()=>{this.$props.customIcons()?new _.kj([this]).connect():new h([this]).connect()})}render(){return(0,_.xZ)(this.#h.bind(this))}#h(){const{viewType:t}=this.#y.$state;return"audio"===t()?function(){const t=new Set(["captions","pip","airplay","fullscreen"]),{controls:e}=c();return m.qy`<div class="plyr__controls">${(0,_.xZ)(()=>e().filter(e=>!t.has(e)).map(A))}</div>`}():"video"===t()?function(){const t=(0,r.$c)(),{load:e}=t.$props,{canLoad:s}=t.$state;return(0,n.EW)(()=>"play"===e()&&!s())()?[v(),g()]:[f(),b(),g(),q(),(0,_.xZ)(()=>{const{clickToPlay:t,clickToFullscreen:e}=c();return[t()?m.qy`
            <media-gesture
              class="plyr__gesture"
              event="pointerup"
              action="toggle:paused"
            ></media-gesture>
          `:null,e()?m.qy`
            <media-gesture
              class="plyr__gesture"
              event="dblpointerup"
              action="toggle:fullscreen"
            ></media-gesture>
          `:null]}),k()]}():null}};(0,n.Xq)(L),(0,n.Xq)(a.o),(0,n.Xq)(l.tV),(0,n.Xq)(l.M0),(0,n.Xq)(l.Th),(0,n.Xq)(l.yA),(0,n.Xq)(l.Ov),(0,n.Xq)(l.Z4),(0,n.Xq)(l.py),(0,n.Xq)(l.L4),(0,n.Xq)(l.cZ),(0,n.Xq)(l.zR),(0,n.Xq)(l.MA),(0,n.Xq)(l.cw),(0,n.Xq)(l.xi),(0,n.Xq)(l.eq),(0,n.Xq)(l.SI),(0,n.Xq)(l.mo),(0,n.Xq)(l.T$),(0,n.Xq)(l.DW),(0,n.Xq)(l.ES),(0,n.Xq)(l.Yp),(0,n.Xq)(l.Q_),(0,n.Xq)(l.oY),(0,n.Xq)(l.sE),(0,n.Xq)(l.pt)}}]);