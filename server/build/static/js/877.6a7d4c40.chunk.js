"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[877],{8913:function(e,r,n){n.d(r,{Z:function(){return w}});var t=n(1413),a=n(5272),i=n(3209),o=n(5971),s=n(9611),l=n(2791);function c(){return c=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},c.apply(this,arguments)}function u(e,r){if(null==e)return{};var n,t,a={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}var d=["spacing"],p=["isCurrentPage","as","className","href"],f=["isCurrentPage","separator","isLastChild","spacing","children","className"],m=["children","spacing","separator","className"],h=(0,i.Gp)((function(e,r){var n=e.spacing,t=u(e,d),a=c({mx:n},(0,i.yK)().separator);return l.createElement(i.m$.span,c({ref:r,role:"presentation"},t,{__css:a}))}));o.Ts&&(h.displayName="BreadcrumbSeparator");var g=(0,i.Gp)((function(e,r){var n=e.isCurrentPage,t=e.as,a=e.className,s=e.href,d=u(e,p),f=(0,i.yK)(),m=c({ref:r,as:t,className:(0,o.cx)("chakra-breadcrumb__link",a)},d);return n?l.createElement(i.m$.span,c({"aria-current":"page",__css:f.link},m)):l.createElement(i.m$.a,c({__css:f.link,href:s},m))}));o.Ts&&(g.displayName="BreadcrumbLink");var x=(0,i.Gp)((function(e,r){var n=e.isCurrentPage,t=e.separator,a=e.isLastChild,d=e.spacing,p=e.children,m=e.className,x=u(e,f),v=(0,s.WR)(p).map((function(e){return e.type===g?l.cloneElement(e,{isCurrentPage:n}):e.type===h?l.cloneElement(e,{spacing:d,children:e.props.children||t}):e})),b=c({display:"inline-flex",alignItems:"center"},(0,i.yK)().item),j=(0,o.cx)("chakra-breadcrumb__list-item",m);return l.createElement(i.m$.li,c({ref:r,className:j},x,{__css:b}),v,!a&&l.createElement(h,{spacing:d},t))}));o.Ts&&(x.displayName="BreadcrumbItem");var v=(0,i.Gp)((function(e,r){var n=(0,i.jC)("Breadcrumb",e),t=(0,i.Lr)(e),a=t.children,d=t.spacing,p=void 0===d?"0.5rem":d,f=t.separator,h=void 0===f?"/":f,g=t.className,x=u(t,m),v=(0,s.WR)(a),b=v.length,j=v.map((function(e,r){return l.cloneElement(e,{separator:h,spacing:p,isLastChild:b===r+1})})),w=(0,o.cx)("chakra-breadcrumb",g);return l.createElement(i.m$.nav,c({ref:r,"aria-label":"breadcrumb",className:w,__css:n.container},x),l.createElement(i.Fo,{value:n},l.createElement(i.m$.ol,{className:"chakra-breadcrumb__list"},j)))}));o.Ts&&(v.displayName="Breadcrumb");var b=n(3504),j=n(184),w=function(e){var r=e.main,n=void 0===r||r,i=e.items;return(0,j.jsxs)(v,{separator:(0,j.jsx)(a.XC,{color:"gray.500"}),children:[n&&(0,j.jsx)(x,{children:(0,j.jsx)(g,{as:b.rU,to:"/",children:"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"})}),i&&i.map((function(e,r){var n;return(0,j.jsx)(x,{children:(0,j.jsx)(g,(0,t.Z)((0,t.Z)({as:b.rU,to:null!==(n=e.to)&&void 0!==n?n:"",isCurrentPage:!e.to},e.options),{},{children:e.title}))},"".concat(e.title,"_").concat(r))}))]})}},7289:function(e,r,n){n.d(r,{Z:function(){return R}});var t=n(5861),a=n(7757),i=n.n(a),o=n(2908),s=n(8735),l=n(2213),c=n(885),u=n(5272),d=n(2504),p=n(565),f=n(1922),m=n(3209),h=n(5971),g=n(1212),x=n(151),v=n(1856),b=n(2791),j=n(5223),w=n(4083),C=n(9611);function k(){return k=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},k.apply(this,arguments)}function y(e,r){if(null==e)return{};var n,t,a={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}var N={exit:{scale:.85,opacity:0,transition:{opacity:{duration:.15,easings:"easeInOut"},scale:{duration:.2,easings:"easeInOut"}}},enter:{scale:1,opacity:1,transition:{opacity:{easings:"easeOut",duration:.2},scale:{duration:.2,ease:[.175,.885,.4,1.1]}}}},O=["openDelay","closeDelay","closeOnClick","closeOnMouseDown","closeOnEsc","onOpen","onClose","placement","id","isOpen","defaultIsOpen","arrowSize","arrowShadowColor","arrowPadding","modifiers","isDisabled","gutter","offset","direction"];var E=["children","label","shouldWrapChildren","aria-label","hasArrow","bg","portalProps","background","backgroundColor","bgColor"],_=(0,m.m$)(x.E.div),P=(0,m.Gp)((function(e,r){var n,t,a=(0,m.mq)("Tooltip",e),i=(0,m.Lr)(e),o=(0,m.Fg)(),s=i.children,l=i.label,c=i.shouldWrapChildren,u=i["aria-label"],d=i.hasArrow,x=i.bg,P=i.portalProps,T=i.background,S=i.backgroundColor,z=i.bgColor,I=y(i,E),D=null!=(n=null!=(t=null!=T?T:S)?t:x)?n:z;D&&(a.bg=D,a[p.j.arrowBg.var]=(0,h.K1)(o,"colors",D));var A,M=function(e){void 0===e&&(e={});var r=e,n=r.openDelay,t=void 0===n?0:n,a=r.closeDelay,i=void 0===a?0:a,o=r.closeOnClick,s=void 0===o||o,l=r.closeOnMouseDown,c=r.closeOnEsc,u=void 0===c||c,d=r.onOpen,f=r.onClose,m=r.placement,g=r.id,x=r.isOpen,v=r.defaultIsOpen,N=r.arrowSize,E=void 0===N?10:N,_=r.arrowShadowColor,P=r.arrowPadding,T=r.modifiers,S=r.isDisabled,z=r.gutter,I=r.offset,D=r.direction,A=y(r,O),M=(0,j.qY)({isOpen:x,defaultIsOpen:v,onOpen:d,onClose:f}),$=M.isOpen,W=M.onOpen,B=M.onClose,L=(0,p.D)({enabled:$,placement:m,arrowPadding:P,modifiers:T,gutter:z,offset:I,direction:D}),Z=L.referenceRef,R=L.getPopperProps,F=L.getArrowInnerProps,G=L.getArrowProps,q=(0,j.Me)(g,"tooltip"),K=b.useRef(null),H=b.useRef(),U=b.useRef(),X=b.useCallback((function(){S||(H.current=window.setTimeout(W,t))}),[S,W,t]),Y=b.useCallback((function(){H.current&&clearTimeout(H.current),U.current=window.setTimeout(B,i)}),[i,B]),V=b.useCallback((function(){s&&Y()}),[s,Y]),J=b.useCallback((function(){l&&Y()}),[l,Y]),Q=b.useCallback((function(e){$&&"Escape"===e.key&&Y()}),[$,Y]);(0,w.b)("keydown",u?Q:void 0),b.useEffect((function(){return function(){clearTimeout(H.current),clearTimeout(U.current)}}),[]),(0,w.b)("mouseleave",Y,(function(){return K.current}));var ee=b.useCallback((function(e,r){return void 0===e&&(e={}),void 0===r&&(r=null),k({},e,{ref:(0,C.lq)(K,r,Z),onMouseEnter:(0,h.v0)(e.onMouseEnter,X),onClick:(0,h.v0)(e.onClick,V),onMouseDown:(0,h.v0)(e.onMouseDown,J),onFocus:(0,h.v0)(e.onFocus,X),onBlur:(0,h.v0)(e.onBlur,Y),"aria-describedby":$?q:void 0})}),[X,Y,J,$,q,V,Z]),re=b.useCallback((function(e,r){var n;return void 0===e&&(e={}),void 0===r&&(r=null),R(k({},e,{style:k({},e.style,(n={},n[p.j.arrowSize.var]=E?(0,h.px)(E):void 0,n[p.j.arrowShadowColor.var]=_,n))}),r)}),[R,E,_]),ne=b.useCallback((function(e,r){return void 0===e&&(e={}),void 0===r&&(r=null),k({ref:r},A,e,{id:q,role:"tooltip",style:k({},e.style,{position:"relative",transformOrigin:p.j.transformOrigin.varRef})})}),[A,q]);return{isOpen:$,show:X,hide:Y,getTriggerProps:ee,getTooltipProps:ne,getTooltipPositionerProps:re,getArrowProps:G,getArrowInnerProps:F}}(k({},I,{direction:o.direction}));if((0,h.HD)(s)||c)A=b.createElement(m.m$.span,k({tabIndex:0},M.getTriggerProps()),s);else{var $=b.Children.only(s);A=b.cloneElement($,M.getTriggerProps($.props,$.ref))}var W=!!u,B=M.getTooltipProps({},r),L=W?(0,h.CE)(B,["role","id"]):B,Z=(0,h.ei)(B,["role","id"]);return l?b.createElement(b.Fragment,null,A,b.createElement(v.M,null,M.isOpen&&b.createElement(f.h_,P,b.createElement(m.m$.div,k({},M.getTooltipPositionerProps(),{__css:{zIndex:a.zIndex,pointerEvents:"none"}}),b.createElement(_,k({variants:N},L,{initial:"exit",animate:"enter",exit:"exit",__css:a}),l,W&&b.createElement(g.TX,Z,u),d&&b.createElement(m.m$.div,{"data-popper-arrow":!0,className:"chakra-tooltip__arrow-wrapper"},b.createElement(m.m$.div,{"data-popper-arrow-inner":!0,className:"chakra-tooltip__arrow",__css:{bg:a.bg}}))))))):b.createElement(b.Fragment,null,s)}));h.Ts&&(P.displayName="Tooltip");var T=n(3763),S=n(184),z=function(e){var r,n=e.item,a=e.basketHandler,o=e.isAuth,l=(0,b.useState)(1),p=(0,c.Z)(l,2),f=p[0],m=p[1],h=(0,b.useState)(!1),g=(0,c.Z)(h,2),x=g[0],v=g[1],j=function(){var e=(0,t.Z)(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),e.next=3,a({amount:+f,detailId:n.id});case 3:v(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,S.jsxs)(s.xu,{className:"flex flex-col justify-between items-center p-6 shadow-md rounded-lg mobile:max-w-[200px] mobile:mx-auto",border:"1px solid #ededed",children:[(0,S.jsx)("img",{className:"w-full",src:null!==(r=n.img)&&void 0!==r?r:T.uz,alt:"",style:{maxWidth:"200px"}}),(0,S.jsx)(s.xv,{className:"text-center",mt:1,fontSize:"lg",fontWeight:"medium",children:n.title}),(0,S.jsx)(s.xv,{color:"gray.500",className:"self-end",children:n.shortDescription}),(0,S.jsxs)(s.xv,{className:"text-center",fontWeight:"bold",fontSize:"xl",color:"black",children:[n.price,"\u20bd"]}),(0,S.jsxs)(s.xu,{className:"flex justify-center flex-col items-center mt-2 gap-1 w-full",children:[(0,S.jsxs)(s.xu,{className:"rounded-xl w-full justify-between items-center inline-flex  gap-2",children:[(0,S.jsx)(d.zx,{variant:"ghost",disabled:1===f,onClick:function(){return m(f-1)},children:(0,S.jsx)(u.V_,{className:"cursor-pointer"})}),(0,S.jsx)(s.xv,{className:"select-none",fontWeight:"medium",fontSize:"xl",children:f}),(0,S.jsx)(d.zx,{variant:"ghost",onClick:function(){return m(f+1)},children:(0,S.jsx)(u.dt,{className:"cursor-pointer"})})]}),!o&&(0,S.jsx)(s.xu,{className:"catalog__item_tooltip_wrapper",children:(0,S.jsx)(P,{width:"100%",label:"\u041a\u043e\u0440\u0437\u0438\u043d\u0430 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430 \u0442\u043e\u043b\u044c\u043a\u043e \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u043c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f\u043c",shouldWrapChildren:!0,flex:"1 1 auto",style:{width:"100%"},children:(0,S.jsx)(d.zx,{className:"w-full",disabled:!0,colorScheme:"red",children:"\u0412 \u043a\u043e\u0440\u0437\u0438\u043d\u0443"})})}),o&&(0,S.jsx)(d.zx,{isLoading:x,onClick:j,colorScheme:"red",flex:"1 1 auto",width:"100%",children:"\u0412 \u043a\u043e\u0440\u0437\u0438\u043d\u0443"})]})]})},I=n(892),D=n(6579),A=function(){var e=(0,D.T)(),r=(0,D.C)((function(e){return e.detail})),n=r.currentPage,t=r.totalCount,a=r.itemsToDisplay,i=Math.ceil(t/a),o=(0,b.useMemo)((function(){if(window.screen.availWidth<600)return[n];if(!i)return[1];var e=[];if(i<5){for(var r=1;r<=i;r++)e.push(r);return e}if(1===n||2===n)return[1,2,3,4,5];var t=i-n;if(t<=1){for(var a=n-(5-t)+1,o=a;o<=a+4;o++)e.push(o);return e}for(var s=-2;s<=2;s++)e.push(n+s);return e}),[i,n]),l=function(r){return function(){e((0,I.a)({currentPage:r}))}};return(0,b.useEffect)((function(){return function(){l(1)()}}),[]),(0,S.jsxs)(s.xu,{className:"flex mt-10 items-center gap-6 p-4 justify-center",children:[(0,S.jsx)(d.zx,{onClick:l(n-1),disabled:1===n,colorScheme:"blue",variant:"ghost",children:"\u041d\u0430\u0437\u0430\u0434"}),(0,S.jsxs)(s.xu,{className:"flex gap-2",children:[(0,S.jsx)(d.zx,{onClick:l(1),disabled:1===n,colorScheme:"blue",variant:"ghost",children:"<"}),o.map((function(e,r){return(0,S.jsx)(d.zx,{onClick:l(e),isActive:n===e,colorScheme:"blue",variant:"ghost",children:e},"".concat(e,"_").concat(r))})),(0,S.jsx)(d.zx,{disabled:n===i||!i,onClick:l(i),colorScheme:"blue",variant:"ghost",children:">"})]}),(0,S.jsx)(d.zx,{onClick:l(n+1),disabled:n===i||!i,colorScheme:"blue",variant:"ghost",children:"\u0412\u043f\u0435\u0440\u0435\u0434"})]})},M=n(8473),$=n(6871),W=n(4964),B={default:"\u0423\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e",asc:"\u0423\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u044e \u0446\u0435\u043d\u044b",desc:"\u0423\u043c\u0435\u043d\u044c\u0448\u0435\u043d\u0438\u044e \u0446\u0435\u043d\u044b"},L=function(){var e=(0,b.useState)("default"),r=(0,c.Z)(e,2),n=r[0],t=r[1],a=(0,$.UO)(),i=a.categoryId,o=a.modelId,l=(0,D.C)((function(e){return e.detail.currentPage})),u=(0,D.T)();return(0,b.useEffect)((function(){if(i||o){var e="default"===n?void 0:n;u((0,W.DD)({categoryId:i,modelId:o,page:l,orderBy:e}))}}),[i,o,u,l,n]),(0,S.jsxs)(s.xu,{className:"flex gap-2",children:["\u0421\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u043e:",(0,S.jsxs)(M.v2,{autoSelect:!1,children:[(0,S.jsx)(M.j2,{as:s.xv,color:"blue.500",textDecoration:"underline",cursor:"pointer",children:B[n]}),(0,S.jsxs)(M.qy,{children:[(0,S.jsx)(M.sN,{onClick:function(){return t("default")},children:B.default}),(0,S.jsx)(M.sN,{onClick:function(){return t("asc")},children:B.asc}),(0,S.jsx)(M.sN,{onClick:function(){return t("desc")},children:B.desc})]})]})]})},Z=n(5719),R=function(){var e=(0,D.C)((function(e){return{items:e.detail.items,loading:e.detail.loading,isAuth:e.user.isAuth}})),r=e.items,n=e.loading,a=e.isAuth,c=(0,D.T)(),u=(0,o.pm)({duration:1e3,isClosable:!0,position:"top-right",status:"success"}),d=function(){var e=(0,t.Z)(i().mark((function e(r){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,u.closeAll(),e.next=4,c((0,Z.zW)(r)).unwrap();case 4:u({title:"\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e"}),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),u({title:"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437",duration:3e3,status:"error"});case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(r){return e.apply(this,arguments)}}();return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(L,{}),n&&(0,S.jsx)(s.xu,{className:"text-center flex justify-center w-full",children:(0,S.jsx)(l.$,{width:"150px",height:"150px",color:"blue.500",speed:"0.8s",marginTop:"10vh"})}),(0,S.jsx)(s.xu,{className:"grid mt-4 grid-cols-5 laptop:grid-cols-4 lowTablet:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-10 ",children:r&&!n&&r.map((function(e,r){return(0,S.jsx)(z,{isAuth:a,item:e,basketHandler:d},"".concat(e.id,"_").concat(r))}))}),(0,S.jsx)(A,{})]})}},3763:function(e,r,n){var t;n.d(r,{ne:function(){return t},uz:function(){return a}}),function(e){e.MAIN="\u0413\u043b\u0430\u0432\u043d\u0430\u044f",e.MODEL="\u041c\u043e\u0434\u0435\u043b\u044c \u0430\u0432\u0442\u043e",e.CATEGORY="\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u0437\u0430\u043f\u0447\u0430\u0441\u0442\u0435\u0439",e.LIST="\u0421\u043f\u0438\u0441\u043e\u043a \u0437\u0430\u043f\u0447\u0430\u0441\u0442\u0435\u0439"}(t||(t={}));var a="/images/detail/default.jpg"}}]);
//# sourceMappingURL=877.6a7d4c40.chunk.js.map