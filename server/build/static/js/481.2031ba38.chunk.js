"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[481],{3642:function(e,n,t){t.r(n),t.d(n,{default:function(){return Z}});var a=t(2791),r=t(8735),i=t(3822),s=t.p+"static/media/detail.7d3ce82f8153e1e5ade8.png",l=t(5861),c=t(885),o=t(7757),d=t.n(o),u=t(2908),f=t(5798),x=t(2213);var m=t(2019),h=t(6579),p=t(3842),v=t(184),j=function(){var e=(0,a.useState)(""),n=(0,c.Z)(e,2),t=n[0],i=n[1],s=function(e,n){var t=(0,a.useState)(e),r=(0,c.Z)(t,2),i=r[0],s=r[1];return(0,a.useEffect)((function(){var t=setTimeout((function(){s(e)}),n);return function(){clearTimeout(t)}}),[e]),i}(t,350),o=(0,a.useState)(!1),j=(0,c.Z)(o,2),b=j[0],g=j[1],y=(0,u.pm)({duration:3e3,isClosable:!0}),N=(0,h.T)(),w=(0,h.C)((function(e){return e.order})).orders;return(0,a.useEffect)((function(){var e=function(){var e=(0,l.Z)(d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,""===s){e.next=5;break}return g(!0),e.next=5,N((0,p.A9)(s));case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),y({title:"\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435"});case 10:return e.prev=10,g(!1),e.finish(10);case 13:case"end":return e.stop()}}),e,null,[[0,7,10,13]])})));return function(){return e.apply(this,arguments)}}();e()}),[s,N,y]),(0,v.jsxs)(r.xu,{children:[(0,v.jsxs)(r.xu,{children:[(0,v.jsx)(r.xv,{fontSize:"xl",children:"\u041f\u043e\u0438\u0441\u043a \u0437\u0430\u043a\u0430\u0437\u0430"}),(0,v.jsx)(f.BZ,{className:"mt-1",children:(0,v.jsx)(f.II,{value:t,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0437\u0430\u043a\u0430\u0437\u0430 \u0438\u043b\u0438 \u0442\u0435\u043b\u0435\u0444\u043e\u043d \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",onChange:function(e){return i(e.target.value)}})})]}),(0,v.jsxs)(r.xu,{className:"mt-4",children:[b&&(0,v.jsx)(r.xu,{className:"text-center",children:(0,v.jsx)(x.$,{width:"75px",height:"75px",color:"blue.500",speed:"0.8s",marginTop:"10vh"})}),w&&!b&&w.map((function(e,n){return(0,v.jsx)(m.Z,{item:e},"".concat(e.id,"_").concat(n))}))]})]})},b=t(5790),g=t(2504),y=t(5277),N=t(6353),w=function(e){var n=e.title,t=e.isParent,i=void 0!==t&&t,s=e.isEditModal,l=void 0!==s&&s,o=e.id,d=e.parentCategoryId,u=e.item,x=e.saveHandler,m=e.deleteHandler,h=e.editHandlerModal,p=(0,a.useState)(!1),j=(0,c.Z)(p,2),g=j[0],y=j[1],N=(0,a.useRef)(!1),w=(0,a.useState)(n),C=(0,c.Z)(w,2),k=C[0],I=C[1];(0,a.useEffect)((function(){""===n&&(y(!0),N.current=!0)}),[]);var T=function(e){if(i&&e.stopPropagation(),o)return m(o)},_=function(e){i&&e.stopPropagation(),""!==k&&y(!g)},z=function(e){if(i&&e.stopPropagation(),""!==k)return y(!g),N.current?i?(x(null,{title:k}),N.current=!1):x(null,{title:k,parentCategoryId:d}):-1!==o?x(o,{title:k}):void 0};return i?(0,v.jsxs)(b.KF,{justifyContent:"space-between",cursor:"pointer",as:"div",children:[g&&(0,v.jsx)(f.II,{onKeyDown:function(e){return e.stopPropagation()},required:!0,className:"max-w-sm",value:k,onChange:function(e){return I(e.target.value)},onClick:function(e){return e.stopPropagation()}}),!g&&(0,v.jsx)(r.xv,{className:"py-2",children:k}),(0,v.jsxs)(r.xu,{children:[!g&&(0,v.jsx)("i",{className:"cursor-pointer text-chakra-blue-500 fa-solid fa-pen p-1 ",onClick:_}),g&&(0,v.jsx)("i",{className:"fa-solid fa-check p-1 text-chakra-green-400 ml-4",style:{cursor:""===k?"not-allowed":"pointer"},onClick:z}),(0,v.jsx)("i",{className:"cursor-pointer text-chakra-red-500 fa-solid fa-trash-can p-1 ml-4",onClick:T}),(0,v.jsx)(b.XE,{className:"ml-2"})]})]}):(0,v.jsxs)(r.xu,{className:"p-3 flex justify-between items-center",children:[g&&(0,v.jsx)(f.II,{className:"max-w-sm",value:k,onChange:function(e){return I(e.target.value)}}),!g&&(0,v.jsx)(r.xv,{children:l?n:k}),(0,v.jsxs)(r.xu,{className:"flex gap-4",children:[!g&&(0,v.jsx)("i",{className:"cursor-pointer text-chakra-blue-500 fa-solid fa-pen p-1 ",onClick:l?h(u):_}),g&&(0,v.jsx)("i",{className:"fa-solid fa-check p-1 text-chakra-green-400 ml-4",style:{cursor:""===k?"not-allowed":"pointer"},onClick:z}),(0,v.jsx)("i",{className:"cursor-pointer text-chakra-red-500 fa-solid fa-trash-can p-1",onClick:T})]})]})},C=function(e){var n,t,a=e.item,i=e.saveHandler,s=e.deleteHandler,l=e.addChildCategoryHandler;return(0,v.jsxs)(b.Qd,{children:[(0,v.jsx)(w,{id:null!==(n=a.id)&&void 0!==n?n:-1,saveHandler:i,isParent:!0,title:a.title,parentCategoryId:a.id,deleteHandler:s}),(0,v.jsxs)(b.Hk,{children:[!(null===a||void 0===a||null===(t=a.childCategories)||void 0===t||!t.length)&&a.childCategories.map((function(e,n){var t;return(0,v.jsx)(w,{deleteHandler:s,saveHandler:i,id:null!==(t=e.id)&&void 0!==t?t:-1,title:e.title,parentCategoryId:a.id},"".concat(e.id,"_").concat(n))})),(0,v.jsx)(r.xu,{textAlign:"right",children:(0,v.jsx)(g.zx,{color:"gray.600",className:"mr-4",variant:"ghost",onClick:function(){return l(a.id)},disabled:!a.title,children:(0,v.jsx)("i",{className:"fa-solid fa-plus"})})})]})]})},k=function(){var e=(0,h.C)((function(e){return e.category})),n=e.items,t=(0,h.T)();(0,a.useEffect)((function(){0===e.items.length&&t((0,y.Rk)())}),[]);var i=function(e){t((0,N.cq)(e))},s=function(e,n){return t(e?(0,y.hk)({body:n,id:e}):(0,y.l1)(n))},l=function(e){return t(e>0?(0,y.KU)(e):(0,N.uN)(e))};return(0,v.jsxs)(r.xu,{children:[(0,v.jsx)(r.xu,{className:"flex justify-between items-center",children:(0,v.jsx)(r.xv,{fontSize:"xl",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438 \u0437\u0430\u043f\u0447\u0430\u0441\u0442\u0435\u0439"})}),(0,v.jsx)(b.UQ,{className:"mt-5",allowMultiple:!0,children:!!n.length&&n.map((function(e,n){return(0,v.jsx)(C,{item:e,saveHandler:s,deleteHandler:l,addChildCategoryHandler:i},"".concat(null===e||void 0===e?void 0:e.id,"_").concat(n))}))}),(0,v.jsx)(r.xu,{className:"text-right p-4",children:(0,v.jsx)(g.zx,{onClick:function(){t((0,N.cq)())},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})})]})},I=t(4942),T=t(1413),_=t(5223),z=t(4732),E=t(5033),S=t(8581),H={title:"",model:"",newImg:null},F=function(){var e=(0,_.qY)(),n=e.isOpen,t=e.onOpen,i=e.onClose,s=(0,h.C)((function(e){return e.model})).items,o=(0,h.T)(),u=(0,a.useState)(H),x=(0,c.Z)(u,2),m=x[0],p=x[1];(0,a.useEffect)((function(){0===s.length&&o((0,E.rq)())}),[]);var j=function(e,n){"newImg"===e&&n[0]&&(n=URL.createObjectURL(n[0])),p((function(t){return(0,T.Z)((0,T.Z)({},t),{},(0,I.Z)({},e,n))}))},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,n=arguments.length>1?arguments[1]:void 0;return function(){p(n?(0,T.Z)((0,T.Z)({},e),{},{brandId:n}):e),t()}},N=function(){i(),p(H)},C=function(){var e=arguments.length>1?arguments[1]:void 0;o((0,E.mS)(e))},k=function(e,n){o((0,E.E$)({id:e,body:n}))},F=function(){var e=(0,l.Z)(d().mark((function e(){var n,t;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=new FormData,!m.newImg){e.next=6;break}return e.next=4,fetch(m.newImg).then((function(e){return e.blob()}));case 4:t=e.sent,n.append("img",t);case 6:n.append("title",null===m||void 0===m?void 0:m.title),n.append("model",null===m||void 0===m?void 0:m.model),n.append("brandId",null===m||void 0===m?void 0:m.brandId),null!==m&&void 0!==m&&m.id?o((0,E.E$)({id:m.id,body:n})):o((0,E.mS)(n)),N();case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(e){o((0,E.$s)(e))};return(0,v.jsxs)(r.xu,{children:[(0,v.jsx)(r.xu,{className:"flex items-center justify-between",children:(0,v.jsx)(r.xv,{fontSize:"xl",children:"\u041c\u0430\u0440\u043a\u0438 \u043c\u0430\u0448\u0438\u043d"})}),(0,v.jsx)(b.UQ,{className:"mt-5",allowMultiple:!0,children:s&&s.map((function(e,n){var t;return(0,v.jsxs)(b.Qd,{children:[(0,v.jsx)(w,{deleteHandler:P,id:e.id,saveHandler:e.id<0?C:k,title:e.title,isParent:!0}),(0,v.jsxs)(b.Hk,{children:[!(null===e||void 0===e||null===(t=e.brandModels)||void 0===t||!t.length)&&e.brandModels.map((function(n,t){var a;return(0,v.jsx)(w,{item:n,deleteHandler:P,saveHandler:C,id:null!==(a=n.id)&&void 0!==a?a:-1,title:n.title,parentCategoryId:e.id,editHandlerModal:y,isEditModal:!0},"".concat(n.id,"_").concat(t))})),(0,v.jsx)(r.xu,{textAlign:"right",children:(0,v.jsx)(g.zx,{color:"gray.600",className:"mr-4",variant:"ghost",onClick:y(void 0,e.id),disabled:!e.title,children:(0,v.jsx)("i",{className:"fa-solid fa-plus"})})})]})]},"".concat(e.id,"_").concat(n))}))}),(0,v.jsx)(r.xu,{className:"text-right p-4",children:(0,v.jsx)(g.zx,{onClick:function(){return o((0,S.Y2)())},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})}),(0,v.jsxs)(z.u_,{isOpen:n,onClose:N,isCentered:!0,children:[(0,v.jsx)(z.ZA,{}),(0,v.jsxs)(z.hz,{children:[(0,v.jsx)(z.xB,{children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043c\u043e\u0434\u0435\u043b\u044c"}),(0,v.jsx)(z.ol,{}),(0,v.jsxs)(z.fe,{children:[(0,v.jsx)(r.xv,{children:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"}),(0,v.jsx)(f.II,{value:m.title,onChange:function(e){return j("title",e.target.value)}}),(0,v.jsx)(r.xv,{children:"\u041c\u043e\u0434\u0435\u043b\u044c"}),(0,v.jsx)(f.II,{className:"mt-2",placeholder:"\u041c\u043e\u0434\u0435\u043b\u044c",value:m.model,onChange:function(e){return j("model",e.target.value)}}),(0,v.jsxs)(r.xu,{children:[(0,v.jsx)(r.xv,{className:"mt-2",children:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"}),(0,v.jsx)("label",{className:"cursor-pointer mt-3 p-4 flex justify-center items-center border-2 border-dashed",htmlFor:"uploadFile",children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"}),(0,v.jsx)("input",{className:"overflow-hidden w-0 h-0 opacity-0 absolute",type:"file",name:"uploadFile",id:"uploadFile",onChange:function(e){var n;return j("newImg",null!==(n=e.target.files)&&void 0!==n?n:"")}})]}),(0,v.jsx)(r.xu,{className:"mt-2 flex justify-center",children:(0,v.jsx)("img",{className:"max-w-full",src:m.newImg?m.newImg:m.img?m.img:"",alt:""})})]}),(0,v.jsxs)(z.mz,{children:[(0,v.jsx)(g.zx,{variant:"ghost",mr:3,onClick:N,children:"\u041e\u0442\u043c\u0435\u043d\u0430"}),(0,v.jsx)(g.zx,{colorScheme:"blue",onClick:F,children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"})]})]})]})]})},P=function(){return(0,v.jsx)(r.xu,{children:(0,v.jsx)(r.xv,{fontSize:"xl",children:"\u0414\u0435\u0442\u0430\u043b\u0438"})})},Z=function(){return(0,v.jsxs)(r.W2,{maxW:"container.xl",children:[(0,v.jsx)(r.xv,{className:"sticky top-36 left-4",fontSize:"1xl",fontWeight:"bold",children:"\u0410\u0434\u043c\u0438\u043d-\u043f\u0430\u043d\u0435\u043b\u044c"}),(0,v.jsx)(i.mQ,{children:(0,v.jsxs)(r.kC,{className:"mt-4 w-full lowTablet:flex-col",justifyContent:"space-between",children:[(0,v.jsx)(r.xu,{className:"w-full max-w-xs sticky top-44 left-4 lowTablet:static lowTablet:mx-auto lowTablet:text-center",borderWidth:"1px",borderRadius:"lg",flexGrow:0,height:"max-content",children:(0,v.jsxs)(i.td,{flexDirection:"column",borderBottom:"none",children:[(0,v.jsxs)(i.OK,{className:"py-3",children:[(0,v.jsx)("i",{className:"fa-solid fa-clipboard-list mr-2"}),"\u0417\u0430\u043a\u0430\u0437\u044b"]}),(0,v.jsxs)(i.OK,{className:"py-3",children:[(0,v.jsx)("i",{className:"fa-solid fa-list mr-2"}),"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438"]}),(0,v.jsxs)(i.OK,{className:"py-3",children:[(0,v.jsx)("i",{className:"fa-solid fa-car mr-2"}),"\u041c\u043e\u0434\u0435\u043b\u0438"]}),(0,v.jsxs)(i.OK,{className:"py-3",children:[(0,v.jsx)("img",{className:"w-4 h-4 mr-2",src:s,alt:""}),"\u0414\u0435\u0442\u0430\u043b\u0438"]})]})}),(0,v.jsx)(r.xu,{className:"flex-auto ml-7 lowTablet:ml-0 lowTablet:mt-2",children:(0,v.jsxs)(i.nP,{children:[(0,v.jsx)(i.x4,{className:"p-0",children:(0,v.jsx)(j,{})}),(0,v.jsx)(i.x4,{className:"p-0",children:(0,v.jsx)(k,{})}),(0,v.jsx)(i.x4,{className:"p-0",children:(0,v.jsx)(F,{})}),(0,v.jsx)(i.x4,{className:"p-0",children:(0,v.jsx)(P,{})})]})})]})})]})}},3822:function(e,n,t){t.d(n,{OK:function(){return z},mQ:function(){return _},nP:function(){return H},td:function(){return E},x4:function(){return S}});var a=t(3209),r=t(5971),i=t(2791),s=t(5336),l=t(4562),c=t(5223),o=t(4083),d=t(9611);function u(){return u=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},u.apply(this,arguments)}function f(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}var x=["defaultIndex","onChange","index","isManual","isLazy","lazyBehavior","orientation","direction"],m=["isDisabled","isFocusable"],h=["isSelected","id","children"],p=(0,l.n)(),v=p[0],j=p[1],b=p[2],g=p[3];var y=(0,d.kr)({name:"TabsContext",errorMessage:"useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />"}),N=y[0],w=y[1];function C(e,n){return e+"--tab-"+n}function k(e,n){return e+"--tabpanel-"+n}var I=["children","className"],T=["htmlProps","descendants"],_=(0,a.Gp)((function(e,n){var t=(0,a.jC)("Tabs",e),s=(0,a.Lr)(e),l=s.children,o=s.className,d=function(e){var n=e.defaultIndex,t=e.onChange,a=e.index,r=e.isManual,s=e.isLazy,l=e.lazyBehavior,o=void 0===l?"unmount":l,d=e.orientation,u=void 0===d?"horizontal":d,m=e.direction,h=void 0===m?"ltr":m,p=f(e,x),v=i.useState(null!=n?n:0),j=v[0],g=v[1],y=(0,c.Tx)({defaultValue:null!=n?n:0,value:a,onChange:t}),N=y[0],w=y[1];i.useEffect((function(){null!=a&&g(a)}),[a]);var C=b();return{id:(0,c.Me)(e.id,"tabs"),selectedIndex:N,focusedIndex:j,setSelectedIndex:w,setFocusedIndex:g,isManual:r,isLazy:s,lazyBehavior:o,orientation:u,descendants:C,direction:h,htmlProps:p}}(f(s,I)),m=d.htmlProps,h=d.descendants,p=f(d,T),j=i.useMemo((function(){return p}),[p]),g=(0,r.CE)(m,["isFitted"]);return i.createElement(v,{value:h},i.createElement(N,{value:j},i.createElement(a.Fo,{value:t},i.createElement(a.m$.div,u({className:(0,r.cx)("chakra-tabs",o),ref:n},g,{__css:t.root}),l))))}));r.Ts&&(_.displayName="Tabs");var z=(0,a.Gp)((function(e,n){var t=(0,a.yK)(),l=function(e){var n=e.isDisabled,t=e.isFocusable,a=f(e,m),i=w(),l=i.setSelectedIndex,c=i.isManual,o=i.id,x=i.setFocusedIndex,h=i.selectedIndex,p=g({disabled:n&&!t}),v=p.index,j=p.register,b=v===h,y=(0,s.h)(u({},a,{ref:(0,d.lq)(j,e.ref),isDisabled:n,isFocusable:t,onClick:(0,r.v0)(e.onClick,(function(){l(v)}))}));return u({},y,{id:C(o,v),role:"tab",tabIndex:b?0:-1,type:"button","aria-selected":b,"aria-controls":k(o,v),onFocus:n?void 0:(0,r.v0)(e.onFocus,(function(){x(v),!c&&(!n||!t)&&l(v)}))})}(u({},e,{ref:n})),c=u({outline:"0",display:"flex",alignItems:"center",justifyContent:"center"},t.tab);return i.createElement(a.m$.button,u({},l,{className:(0,r.cx)("chakra-tabs__tab",e.className),__css:c}))}));r.Ts&&(z.displayName="Tab");var E=(0,a.Gp)((function(e,n){var t=function(e){var n=w(),t=n.focusedIndex,a=n.orientation,s=n.direction,l=j(),c=i.useCallback((function(e){var n,i=function(){var e=l.nextEnabled(t);e&&(0,r.T_)(e.node)},c=function(){var e=l.prevEnabled(t);e&&(0,r.T_)(e.node)},o="horizontal"===a,d="vertical"===a,u=(0,r.uh)(e),f="ltr"===s?"ArrowRight":"ArrowLeft",x=((n={})["ltr"===s?"ArrowLeft":"ArrowRight"]=function(){return o&&c()},n[f]=function(){return o&&i()},n.ArrowDown=function(){return d&&i()},n.ArrowUp=function(){return d&&c()},n.Home=function(){var e=l.firstEnabled();e&&(0,r.T_)(e.node)},n.End=function(){var e=l.lastEnabled();e&&(0,r.T_)(e.node)},n)[u];x&&(e.preventDefault(),x(e))}),[l,t,a,s]);return u({},e,{role:"tablist","aria-orientation":a,onKeyDown:(0,r.v0)(e.onKeyDown,c)})}(u({},e,{ref:n})),s=u({display:"flex"},(0,a.yK)().tablist);return i.createElement(a.m$.div,u({},t,{className:(0,r.cx)("chakra-tabs__tablist",e.className),__css:s}))}));r.Ts&&(E.displayName="TabList");var S=(0,a.Gp)((function(e,n){var t=function(e){var n=e.isSelected,t=e.id,a=e.children,s=f(e,h),l=w(),c=l.isLazy,o=l.lazyBehavior,d=i.useRef(!1);return n&&(d.current=!0),u({tabIndex:0},s,{children:(0,r.VI)({hasBeenSelected:d.current,isSelected:n,isLazy:c,lazyBehavior:o})?a:null,role:"tabpanel",hidden:!n,id:t})}(u({},e,{ref:n})),s=(0,a.yK)();return i.createElement(a.m$.div,u({outline:"0"},t,{className:(0,r.cx)("chakra-tabs__tab-panel",e.className),__css:s.tabpanel}))}));r.Ts&&(S.displayName="TabPanel");var H=(0,a.Gp)((function(e,n){var t=function(e){var n=w(),t=n.id,a=n.selectedIndex;return u({},e,{children:(0,d.WR)(e.children).map((function(e,n){return i.cloneElement(e,{isSelected:n===a,id:k(t,n),"aria-labelledby":C(t,n)})}))})}(e),s=(0,a.yK)();return i.createElement(a.m$.div,u({},t,{width:"100%",ref:n,className:(0,r.cx)("chakra-tabs__tab-panels",e.className),__css:s.tabpanels}))}));r.Ts&&(H.displayName="TabPanels");var F=(0,a.Gp)((function(e,n){var t=function(){var e=w(),n=j(),t=e.selectedIndex,a=e.orientation,s="horizontal"===a,l="vertical"===a,c=i.useState((function(){return s?{left:0,width:0}:l?{top:0,height:0}:void 0})),d=c[0],f=c[1],x=i.useState(!1),m=x[0],h=x[1];return(0,o.a)((function(){if(!(0,r.o8)(t)){var e=n.item(t);if(!(0,r.o8)(e)){s&&f({left:e.node.offsetLeft,width:e.node.offsetWidth}),l&&f({top:e.node.offsetTop,height:e.node.offsetHeight});var a=requestAnimationFrame((function(){h(!0)}));return function(){a&&cancelAnimationFrame(a)}}}}),[t,s,l,n]),u({position:"absolute",transitionProperty:"left, right, top, bottom, height, width",transitionDuration:m?"200ms":"0ms",transitionTimingFunction:"cubic-bezier(0, 0, 0.2, 1)"},d)}(),s=u({},e.style,t),l=(0,a.yK)();return i.createElement(a.m$.div,u({ref:n},e,{className:(0,r.cx)("chakra-tabs__tab-indicator",e.className),style:s,__css:l.indicator}))}));r.Ts&&(F.displayName="TabIndicator")}}]);
//# sourceMappingURL=481.2031ba38.chunk.js.map