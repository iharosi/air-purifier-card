/*! air-purifier-card v2.3.1 | GPL-3.0-only | https://github.com/iharosi/air-purifier-card */
function t(t,e,s,i){var r,n=arguments.length,a=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,i);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(a=(n<3?r(a):n>3?r(e,s,a):r(e,s))||a);return n>3&&a&&Object.defineProperty(e,s,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:d}=Object,u=globalThis,f=u.trustedTypes,g=f?f.emptyScript:"",m=u.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!o(t,e),_={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??$)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[v("elementProperties")]=new Map,b[v("finalized")]=new Map,m?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,w=t=>t,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,C=`<${P}>`,M=document,U=()=>M.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,I=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,B=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),q=B(1),W=B(2),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Y=new WeakMap,Z=M.createTreeWalker(M,129);function Q(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",a=T;for(let e=0;e<s;e++){const s=t[e];let o,c,l=-1,h=0;for(;h<s.length&&(a.lastIndex=h,c=a.exec(s),null!==c);)h=a.lastIndex,a===T?"!--"===c[1]?a=H:void 0!==c[1]?a=I:void 0!==c[2]?(L.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=j):void 0!==c[3]&&(a=j):a===j?">"===c[0]?(a=r??T,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,o=c[1],a=void 0===c[3]?j:'"'===c[3]?D:z):a===D||a===z?a=j:a===H||a===I?a=T:(a=j,r=void 0);const p=a===j&&t[e+1].startsWith("/>")?" ":"";n+=a===T?s+C:l>=0?(i.push(o),s.slice(0,l)+k+s.slice(l)+S+p):s+S+(-2===l?e:p)}return[Q(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const a=t.length-1,o=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,s),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Z.nextNode())&&o.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=l[n++],s=i.getAttribute(t).split(S),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:r,name:a[2],strings:s,ctor:"."===a[1]?st:"?"===a[1]?it:"@"===a[1]?rt:et}),i.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:r}),i.removeAttribute(t));if(L.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],U()),Z.nextNode(),o.push({type:2,index:++r});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===P)o.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)o.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===F)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=O(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);Z.currentNode=i;let r=Z.nextNode(),n=0,a=0,o=s[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new tt(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new nt(r,this,t)),this._$AV.push(e),o=s[++a]}n!==o?.index&&(r=Z.nextNode(),n++)}return Z.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(Q(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new K(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new tt(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=G(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const i=t;let a,o;for(t=r[0],a=0;a<r.length-1;a++)o=G(this,i[s+a],e,a),o===F&&(o=this._$AH[a]),n||=!O(o)||o!==this._$AH[a],o===V?t=V:t!==V&&(t+=(o??"")+r[a+1]),this._$AH[a]=o}n&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class rt extends et{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===F)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(K,tt),(x.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;let ct=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new tt(e.insertBefore(U(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};ct._$litElement$=!0,ct.finalized=!0,ot.litElementHydrateSupport?.({LitElement:ct});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:ct}),(ot.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},dt=(t=pt,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ut(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ft(t){return ut({...t,state:!0,attribute:!1})}const gt=1,mt=t=>(...e)=>({_$litDirective$:t,values:e});let vt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const yt=mt(class extends vt{constructor(t){if(super(t),t.type!==gt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const s=t.element.classList;for(const t of this.st)t in e||(s.remove(t),this.st.delete(t));for(const t in e){const i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(s.add(t),this.st.add(t)):(s.remove(t),this.st.delete(t)))}return F}}),$t="important",_t=" !"+$t,bt=mt(class extends vt{constructor(t){if(super(t),t.type!==gt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,s)=>{const i=t[s];return null==i?e:e+`${s=s.includes("-")?s:s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:s}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in e){const i=e[t];if(null!=i){this.ft.add(t);const e="string"==typeof i&&i.endsWith(_t);t.includes("-")||e?s.setProperty(t,e?i.slice(0,-11):i,e?$t:""):s[t]=i}}return F}}),xt="M0 -7 C2 -20 5 -26 10.9 -26.9 A29 29 0 0 1 22.9 -17.9 C16 -14 9 -9 4.8 -5.7 Z",wt={blades:W`
    <g class="blades">
      <g transform="translate(50,50)">
        <path transform="rotate(0)" d=${xt}></path>
        <path transform="rotate(72)" d=${xt}></path>
        <path transform="rotate(144)" d=${xt}></path>
        <path transform="rotate(216)" d=${xt}></path>
        <path transform="rotate(288)" d=${xt}></path>
      </g>
    </g>
    <circle class="hub" cx="50" cy="50" r="7"></circle>
    <circle class="core" cx="50" cy="50" r="3"></circle>
  `,pulse:W`
    <circle class="ripple" cx="50" cy="50" r="34"></circle>
    <circle class="ripple" cx="50" cy="50" r="34"></circle>
    <circle class="ripple" cx="50" cy="50" r="34"></circle>
    <circle class="core" cx="50" cy="50" r="12"></circle>
  `,waves:W`
    <g clip-path="url(#disc)">
      <g class="wave"><path d="M24 62 Q50 42 76 62"></path></g>
      <g class="wave"><path d="M24 62 Q50 42 76 62"></path></g>
      <g class="wave"><path d="M24 62 Q50 42 76 62"></path></g>
    </g>
  `,orbit:W`
    <g class="orbit">
      <path class="trail" d="M50 14 A36 36 0 0 1 81 32"></path>
      <circle class="comet" cx="50" cy="14" r="5"></circle>
    </g>
    <circle class="core" cx="50" cy="50" r="9"></circle>
  `,particles:W`
    <g clip-path="url(#disc)">
      <g class="particle"><circle cx="37" cy="58" r="4"></circle></g>
      <g class="particle"><circle cx="50" cy="60" r="3.2"></circle></g>
      <g class="particle"><circle cx="62" cy="57" r="4"></circle></g>
      <g class="particle"><circle cx="43" cy="61" r="2.8"></circle></g>
      <g class="particle"><circle cx="57" cy="59" r="3.4"></circle></g>
    </g>
    <rect class="vent" x="32" y="66" width="36" height="5" rx="2.5"></rect>
  `,vortex:W`
    <circle class="swirl" cx="50" cy="50" r="30" stroke-dasharray="62 127"></circle>
    <circle class="swirl" cx="50" cy="50" r="22" stroke-dasharray="46 92"></circle>
    <circle class="swirl" cx="50" cy="50" r="14" stroke-dasharray="30 58"></circle>
    <circle class="core" cx="50" cy="50" r="5"></circle>
  `},At="air-purifier-card",Et=`${At}-editor`,kt=[25,50,75,100],St=[{max:12,label:"Excellent",color:"#43a047"},{max:35,label:"Good",color:"#c0ca33"},{max:55,label:"Moderate",color:"#fdd835"},{max:150,label:"Poor",color:"#fb8c00"},{max:250,label:"Unhealthy",color:"#e53935"},{max:1/0,label:"Hazardous",color:"#8e24aa"}],Pt={max:1/0,label:"Unknown",color:"var(--disabled-text-color, #9e9e9e)"},Ct=["blades","pulse","waves","orbit","particles","vortex"],Mt={blades:"Spinning fan blades",pulse:"Pulsing rings",waves:"Rising airflow",orbit:"Orbiting comet",particles:"Floating particles",vortex:"Swirling vortex"},Ut={left:"flex-start",center:"center",right:"flex-end"},Ot=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)})`
  :host {
    --ap-accent: var(--state-fan-active-color, var(--primary-color, #03a9f4));
    --ap-idle-color: var(--disabled-text-color, #9e9e9e);
  }
  ha-card {
    display: block;
    padding: 12px 14px;
    overflow: hidden;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  /* -------- fan visual -------- */
  .visual {
    position: relative;
    width: 68px;
    height: 68px;
    flex: 0 0 68px;
    border-radius: 50%;
    cursor: pointer;
    display: grid;
    place-items: center;
    background: radial-gradient(
      circle at 50% 50%,
      color-mix(in srgb, var(--ap-accent) 18%, transparent),
      transparent 70%
    );
    transition: background 0.4s ease;
  }
  .visual.off {
    background: none;
  }
  .pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--ap-accent);
    opacity: 0;
  }
  .visual.on[data-anim="blades"] .pulse {
    animation: pulse 2.6s ease-out infinite;
  }
  .visual.on[data-anim="blades"] .pulse:nth-child(2) {
    animation-delay: 0.87s;
  }
  .visual.on[data-anim="blades"] .pulse:nth-child(3) {
    animation-delay: 1.74s;
  }
  @keyframes pulse {
    0% {
      transform: scale(0.62);
      opacity: 0.55;
    }
    100% {
      transform: scale(1.18);
      opacity: 0;
    }
  }
  svg {
    width: 68px;
    height: 68px;
    display: block;
    position: relative;
  }
  .ring {
    fill: none;
    stroke: var(--divider-color, rgba(127, 127, 127, 0.25));
    stroke-width: 4;
  }
  .ring-value {
    fill: none;
    stroke: var(--ap-accent);
    stroke-width: 4;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: 50px 50px;
    transition: stroke-dashoffset 0.5s ease, stroke 0.4s ease;
  }
  .blades,
  .core,
  .comet,
  .vent,
  .particle {
    fill: var(--ap-accent);
    transition: fill 0.4s ease;
  }
  .ripple,
  .wave path,
  .trail {
    fill: none;
    stroke: var(--ap-accent);
    transition: stroke 0.4s ease;
  }
  .hub {
    fill: var(--card-background-color, #fff);
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* blades: the fan itself turns, faster at higher speeds */
  .blades {
    transform-origin: 50px 50px;
  }
  .visual.on .blades {
    animation: spin var(--spin, 2s) linear infinite;
  }

  /* pulse: rings breathing out of the centre */
  .ripple {
    stroke-width: 3;
    transform-origin: 50px 50px;
    opacity: 0;
  }
  .visual.off .ripple:nth-of-type(1) {
    opacity: 0.35;
  }
  .visual.on .ripple {
    animation: ripple calc(var(--spin, 2s) * 2.4) ease-out infinite;
  }
  .visual.on .ripple:nth-of-type(2) {
    animation-delay: calc(var(--spin, 2s) * 0.8);
  }
  .visual.on .ripple:nth-of-type(3) {
    animation-delay: calc(var(--spin, 2s) * 1.6);
  }
  @keyframes ripple {
    0% {
      transform: scale(0.3);
      opacity: 0.85;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  /* waves: airflow sweeping upwards */
  .wave path {
    stroke-width: 4.2;
    stroke-linecap: round;
  }
  .wave {
    opacity: 0.5;
  }
  .visual.on .wave {
    animation: rise calc(var(--spin, 2s) * 1.7) linear infinite;
  }
  .visual.on .wave:nth-of-type(2) {
    animation-delay: calc(var(--spin, 2s) * 0.57);
  }
  .visual.on .wave:nth-of-type(3) {
    animation-delay: calc(var(--spin, 2s) * 1.13);
  }
  @keyframes rise {
    0% {
      transform: translateY(18px);
      opacity: 0;
    }
    20% {
      opacity: 0.9;
    }
    75% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-24px);
      opacity: 0;
    }
  }

  /* orbit: a comet running around the dial */
  .orbit {
    transform-origin: 50px 50px;
  }
  .trail {
    stroke-width: 4;
    stroke-linecap: round;
    opacity: 0.3;
  }
  .visual.on .orbit {
    animation: spin var(--spin, 2s) linear infinite;
  }

  /* particles: dust lifted off the intake */
  .particle {
    opacity: 0;
  }
  .visual.off .particle {
    opacity: 0.3;
  }
  .visual.on .particle {
    animation: float calc(var(--spin, 2s) * 2.2) linear infinite;
  }
  .visual.on .particle:nth-of-type(2) {
    animation-delay: calc(var(--spin, 2s) * 0.44);
  }
  .visual.on .particle:nth-of-type(3) {
    animation-delay: calc(var(--spin, 2s) * 0.88);
  }
  .visual.on .particle:nth-of-type(4) {
    animation-delay: calc(var(--spin, 2s) * 1.32);
  }
  .visual.on .particle:nth-of-type(5) {
    animation-delay: calc(var(--spin, 2s) * 1.76);
  }
  @keyframes float {
    0% {
      transform: translateY(12px);
      opacity: 0;
    }
    15% {
      opacity: 0.95;
    }
    70% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-30px);
      opacity: 0;
    }
  }

  /* vortex: arcs swirling into each other */
  .swirl {
    fill: none;
    stroke: var(--ap-accent);
    stroke-linecap: round;
    stroke-width: 3.5;
    transform-origin: 50px 50px;
    transition: stroke 0.4s ease;
  }
  .swirl:nth-of-type(2) {
    stroke-width: 3;
  }
  .swirl:nth-of-type(3) {
    stroke-width: 2.5;
  }
  .visual.on .swirl {
    animation: spin var(--spin, 2s) linear infinite;
  }
  .visual.on .swirl:nth-of-type(2) {
    animation: spin calc(var(--spin, 2s) * 1.6) linear infinite reverse;
  }
  .visual.on .swirl:nth-of-type(3) {
    animation: spin calc(var(--spin, 2s) * 2.2) linear infinite;
  }

  /* -------- body -------- */
  .body {
    flex: 1;
    min-width: 0;
  }
  .head {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .name {
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    cursor: pointer;
  }
  .pct {
    font-size: 15px;
    font-weight: 600;
    color: var(--ap-accent);
    font-variant-numeric: tabular-nums;
  }
  .pct.off {
    color: var(--secondary-text-color);
  }
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 18px;
    margin: 6px 0 2px;
    background: none;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      var(--ap-accent) var(--fill, 0%),
      var(--divider-color, rgba(127, 127, 127, 0.25)) var(--fill, 0%)
    );
  }
  input[type="range"]::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      var(--ap-accent) var(--fill, 0%),
      var(--divider-color, rgba(127, 127, 127, 0.25)) var(--fill, 0%)
    );
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    margin-top: -4px;
    border-radius: 50%;
    background: var(--ap-accent);
    box-shadow: 0 0 0 2px var(--card-background-color, #fff);
  }
  input[type="range"]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border: none;
    border-radius: 50%;
    background: var(--ap-accent);
    box-shadow: 0 0 0 2px var(--card-background-color, #fff);
  }
  input[type="range"]:disabled {
    opacity: 0.45;
    cursor: default;
  }

  /* -------- chips -------- */
  .chips {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
  }
  .presets {
    display: flex;
    gap: 6px;
    margin-top: 6px;
  }
  .presets:empty {
    display: none;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px 2px 6px;
    border-radius: 12px;
    font-size: 12px;
    line-height: 18px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    color: var(--secondary-text-color);
    cursor: pointer;
    white-space: nowrap;
  }
  .chip ha-icon {
    --mdc-icon-size: 14px;
    flex: 0 0 auto;
  }
  .chip span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chip.pm {
    min-width: 0;
  }
  .chip.rpm {
    flex: 0 0 auto;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: 0 0 8px;
  }
  .spacer {
    flex: 1;
  }
  .preset {
    border: none;
    font: inherit;
    font-size: 11px;
    line-height: 18px;
    padding: 2px 7px;
    border-radius: 11px;
    color: var(--secondary-text-color);
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    cursor: pointer;
  }
  .preset.active {
    background: var(--ap-accent);
    color: var(--text-primary-color, #fff);
  }

  /* -------- power -------- */
  .power {
    flex: 0 0 auto;
    border: none;
    background: none;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
    transition: color 0.3s ease, background 0.3s ease;
  }
  .power.on {
    color: var(--ap-accent);
    background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  }
  .power:hover {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.18));
  }
  .unavailable {
    opacity: 0.55;
    pointer-events: none;
  }
`,Rt=(t,e,s)=>{t.dispatchEvent(new CustomEvent(e,{detail:s,bubbles:!0,composed:!0}))},Nt=t=>{if(!t)return null;const e=Number.parseFloat(t.state);return Number.isNaN(e)?null:e},Tt=[{name:"name",selector:{text:{}}},{name:"fan",required:!0,selector:{entity:{domain:"fan"}}},{type:"grid",name:"",schema:[{name:"rpm",selector:{entity:{domain:"sensor"}}},{name:"pm25",selector:{entity:{domain:"sensor"}}}]},{name:"animation",selector:{select:{mode:"dropdown",options:Ct.map(t=>({value:t,label:Mt[t]}))}}},{type:"grid",name:"",schema:[{name:"show_presets",selector:{boolean:{}}},{name:"preset_align",selector:{select:{mode:"dropdown",options:[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}]}}}]}],Ht={name:"Name",fan:"Fan entity (required)",rpm:"Fan speed sensor (RPM)",pm25:"Air quality sensor (PM2.5)",animation:"Animation",show_presets:"Show speed presets",preset_align:"Preset alignment"};let It=class extends ct{setConfig(t){this._config=t}render(){return this.hass&&this._config?q`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Tt}
        .computeLabel=${t=>Ht[t.name]??t.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}_valueChanged(t){t.stopPropagation(),Rt(this,"config-changed",{config:t.detail.value})}};t([ut({attribute:!1})],It.prototype,"hass",void 0),t([ft()],It.prototype,"_config",void 0),It=t([ht(Et)],It);const jt=2*Math.PI*44;let zt=class extends ct{static getConfigElement(){return document.createElement(Et)}static getStubConfig(t){const e=(e,...s)=>{const i=Object.keys(t?.states??{}).filter(t=>t.startsWith(`${e}.`));return i.find(t=>s.every(e=>t.includes(e)))??i[0]??""};return{type:`custom:${At}`,name:"Air Purifier",fan:e("fan","purifier"),rpm:e("sensor","rpm"),pm25:e("sensor","pm")}}setConfig(t){const e=t.fan??t.entity;if(!e)throw new Error("You need to define a `fan` entity (domain: fan).");if(!e.startsWith("fan."))throw new Error("`fan` must be an entity from the `fan` domain.");this._config={...t,type:t.type??`custom:${At}`,fan:e,animation:Ct.includes(t.animation)?t.animation:"blades",show_presets:!1!==t.show_presets,presets:t.presets??kt,preset_align:t.preset_align&&t.preset_align in Ut?t.preset_align:"left"}}getCardSize(){return 2}willUpdate(t){t.has("hass")&&void 0!==this._sliding&&this._percentage()===this._sliding&&(this._sliding=void 0)}render(){const t=this._config;if(!this.hass||!t)return V;const e=this.hass.states[t.fan],s=t.rpm?this.hass.states[t.rpm]:void 0,i=t.pm25?this.hass.states[t.pm25]:void 0,r=!e||"unavailable"===e.state||"unknown"===e.state,n="on"===e?.state,a=this._sliding??this._percentage(),o=null===(c=Nt(i))?Pt:St.find(t=>c<=t.max)??Pt;var c;const l=n?i?o.color:void 0:"var(--ap-idle-color)";return q`
      <ha-card
        class=${yt({unavailable:r})}
        style=${bt(l?{"--ap-accent":l}:{})}
      >
        <div class="row">
          ${this._renderDial(t.animation,n,a)}
          <div class="body">
            <div class="head">
              <div class="name" @click=${this._moreInfoFan}>
                ${t.name??e?.attributes.friendly_name??t.fan}
              </div>
              <div class="pct ${yt({off:!n})}">
                ${n?a>0?`${a}%`:"On":"Off"}
              </div>
              <button class="power ${yt({on:n})}" title="Toggle" @click=${this._toggle}>
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step=${e?.attributes.percentage_step||1}
              .value=${String(a)}
              ?disabled=${r}
              style=${bt({"--fill":`${a}%`})}
              @input=${this._sliderInput}
              @change=${this._sliderChange}
            />
            <div class="chips">
              ${this._renderPm(i,o.label,o.color)}
              <div class="spacer"></div>
              ${this._renderRpm(s)}
            </div>
            ${this._renderPresets(a,n)}
          </div>
        </div>
      </ha-card>
    `}_renderDial(t,e,s){const i=3.2-(3.2-.55)*(r=s,n=1,a=100,Math.min(Math.max(r,n),a))/100;var r,n,a;return q`
      <div
        class="visual ${yt({on:e,off:!e})}"
        data-anim=${t}
        style=${bt({"--spin":`${i.toFixed(2)}s`})}
        @click=${this._toggle}
      >
        <div class="pulse"></div>
        <div class="pulse"></div>
        <div class="pulse"></div>
        <svg viewBox="0 0 100 100">
          <defs>
            <clipPath id="disc"><circle cx="50" cy="50" r="36"></circle></clipPath>
          </defs>
          <circle class="ring" cx="50" cy="50" r=${44}></circle>
          ${W`<circle
            class="ring-value"
            cx="50"
            cy="50"
            r=${44}
            stroke-dasharray=${jt}
            stroke-dashoffset=${jt*(1-s/100)}
          ></circle>`}
          ${wt[t]}
        </svg>
      </div>
    `}_renderPm(t,e,s){if(!t)return V;const i=Nt(t),r=t.attributes.unit_of_measurement??"µg/m³";return q`
      <div
        class="chip pm"
        title=${t.attributes.friendly_name??t.entity_id}
        @click=${this._moreInfoPm}
      >
        <span class="dot" style=${bt({background:s})}></span>
        <span>
          ${null===i?`PM2.5 ${t.state}`:`${e} · ${i.toFixed(1)} ${r}`}
        </span>
      </div>
    `}_renderRpm(t){if(!t)return V;const e=Nt(t),s=t.attributes.unit_of_measurement??"RPM";return q`
      <div
        class="chip rpm"
        title=${t.attributes.friendly_name??t.entity_id}
        @click=${this._moreInfoRpm}
      >
        <ha-icon icon="mdi:fan"></ha-icon>
        <span>
          ${null===e?t.state:`${e.toLocaleString(this.hass?.locale?.language)} ${s}`}
        </span>
      </div>
    `}_renderPresets(t,e){const s=this._config;return s.show_presets?q`
      <div
        class="presets"
        style=${bt({justifyContent:Ut[s.preset_align]})}
      >
        ${s.presets.map(s=>q`
            <button
              class="preset ${yt({active:e&&t===s})}"
              @click=${()=>this._setPercentage(s)}
            >
              ${s}%
            </button>
          `)}
      </div>
    `:V}_percentage(){const t=this.hass?.states[this._config.fan],e="on"===t?.state;return Math.round(t?.attributes.percentage??(e?100:0))}_sliderInput(t){this._sliding=Number(t.target.value)}_sliderChange(t){this._setPercentage(Number(t.target.value))}_toggle(){this.hass?.callService("fan","toggle",{entity_id:this._config.fan})}_setPercentage(t){this._sliding=t,this.hass?.callService("fan","set_percentage",{entity_id:this._config.fan,percentage:t})}_moreInfo(t){t&&Rt(this,"hass-more-info",{entityId:t})}_moreInfoFan(){this._moreInfo(this._config?.fan)}_moreInfoRpm(){this._moreInfo(this._config?.rpm)}_moreInfoPm(){this._moreInfo(this._config?.pm25)}};zt.styles=Ot,t([ut({attribute:!1})],zt.prototype,"hass",void 0),t([ft()],zt.prototype,"_config",void 0),t([ft()],zt.prototype,"_sliding",void 0),zt=t([ht(At)],zt),console.info("%c AIR-PURIFIER-CARD %c v2.3.1 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: #1c1c1c; font-weight: 700;"),window.customCards=window.customCards??[],window.customCards.push({type:At,name:"Air Purifier Card",description:"Compact animated card to control a fan-based air purifier with RPM and PM2.5 readouts.",preview:!0,documentationURL:"https://github.com/iharosi/air-purifier-card"});export{zt as AirPurifierCard};
