(function(t){function e(e){for(var s,o,r=e[0],l=e[1],c=e[2],m=0,u=[];m<r.length;m++)o=r[m],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&u.push(a[o][0]),a[o]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);h&&h(e);while(u.length)u.shift()();return n.push.apply(n,c||[]),i()}function i(){for(var t,e=0;e<n.length;e++){for(var i=n[e],s=!0,r=1;r<i.length;r++){var l=i[r];0!==a[l]&&(s=!1)}s&&(n.splice(e--,1),t=o(o.s=i[0]))}return t}var s={},a={app:0},n=[];function o(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=s,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(i,s,function(e){return t[e]}.bind(null,s));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var h=l;n.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";i("85ec")},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var s=i("2b0e"),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"block",staticStyle:{width:"100%",height:"50%"}},[i("h1",[t._v("内存管理")]),i("router-link",{attrs:{to:"/dynamicAllocation"}},[t._v("分区管理")]),t._v(" ################ "),i("router-link",{attrs:{to:"/pageRequest"}},[t._v("调页管理")]),i("router-view")],1)},n=[],o={name:"App",components:{}},r=o,l=(i("034f"),i("2877")),c=Object(l["a"])(r,a,n,!1,null,null,null),h=c.exports,m=i("8c4f"),u=i("5c96"),p=i.n(u),d=(i("0fae"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("h1",[t._v("动态内存分配")]),i("el-button",{on:{click:t.deleteMemory}},[t._v("重置")]),i("br"),i("el-slider",{attrs:{"show-input":"",max:"1000",disabled:t.sliderState},model:{value:t.memorySpace,callback:function(e){t.memorySpace=e},expression:"memorySpace"}}),i("p",[t._v("内存空间大小"+t._s(t.memorySpace)+"kb")]),i("el-select",{attrs:{placeholder:"请选择分配算法",disabled:t.sliderState},model:{value:t.alAllocation,callback:function(e){t.alAllocation=e},expression:"alAllocation"}},t._l(t.options,(function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),i("div",{staticStyle:{width:"45%",float:"left"}},[i("h2",[t._v("作业列表")]),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.taskList,stripe:"",height:"300"}},[i("el-table-column",{attrs:{prop:"assignmentID",label:"作业编号",width:"180"}}),i("el-table-column",{attrs:{prop:"chooseOption",label:"操作",width:"180"}}),i("el-table-column",{attrs:{prop:"memorySize",label:"大小/kb"}})],1)],1),i("div",{staticStyle:{width:"50%",float:"right"}},[i("h2",[t._v("内存空间")]),i("el-button",{on:{click:t.nextStep}},[t._v("下一步")]),i("p",[t._v("总内存空间"+t._s(t.memorySpace)+"kb")]),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.memoryState,height:"200"}},[i("el-table-column",{attrs:{prop:"assignmentID",label:"作业编号",width:"180"}}),i("el-table-column",{attrs:{prop:"begin",label:"起点",width:"180"}}),i("el-table-column",{attrs:{prop:"end",label:"终点",width:"180"}})],1),i("p",[t._v("内存中作业个数"+t._s(t.memoryState.length))])],1)],1)}),b=[],g=(i("c740"),i("a434"),i("4e82"),{name:"dynamicAllocation",created:function(){this.initLists()},data:function(){return{options:[{value:1,label:"首次适应算法"},{value:2,label:"最佳适应算法"}],alAllocation:1,sliderState:!1,memorySpace:640,taskList:[],memoryState:[],memoryBlog:[],taskInMemoryNum:0,clock:0,blankSpace:[]}},methods:{nextStep:function(){this.sliderState=!0,this.clock>=this.taskList.length?alert("任务已经全部执行完"):(1==this.alAllocation?this.firstFit(this.taskList[this.clock]):this.bestFit(this.taskList[this.clock]),this.clock++)},initLists:function(){this.taskList=[{assignmentID:1,choose:1,chooseOption:"申请",memorySize:130},{assignmentID:2,choose:1,chooseOption:"申请",memorySize:60},{assignmentID:3,choose:1,chooseOption:"申请",memorySize:100},{assignmentID:2,choose:0,chooseOption:"释放",memorySize:60},{assignmentID:4,choose:1,chooseOption:"申请",memorySize:200},{assignmentID:3,choose:0,chooseOption:"释放",memorySize:100},{assignmentID:1,choose:0,chooseOption:"释放",memorySize:130},{assignmentID:5,choose:1,chooseOption:"申请",memorySize:140},{assignmentID:6,choose:1,chooseOption:"申请",memorySize:60},{assignmentID:7,choose:1,chooseOption:"申请",memorySize:50},{assignmentID:6,choose:0,chooseOption:"释放",memorySize:60}],this.blankSpace=[{begin:0,end:this.memorySpace-1,size:this.memorySpace}]},firstFit:function(t){var e=this.sortByKey(this.memoryState,"begin");if(1!=t.choose){var i=this.memoryState.findIndex((function(e){if(e.assignmentID==t.assignmentID)return!0}));this.memoryState.splice(i,1)}else{if(0==this.memoryState.length){if(this.memorySpace<t.memorySize)return;return void this.memoryState.push({assignmentID:t.assignmentID,begin:0,end:t.memorySize-1,size:t.memorySize})}if(e[0].begin>0){if(t.memorySize<e[0].begin)return void this.memoryState.push({assignmentID:t.assignmentID,begin:0,end:t.memorySize-1,size:t.memorySize});var s=1;for(s=1;s<e.length-1;s++)if(e[s+1].begin-e[s].end-1>t.memorySize)return void this.memoryState.push({assignmentID:t.assignmentID,begin:e[s].end+1,end:e[s].end+t.memorySize,size:t.memorySize});if(this.memorySpace-e[s].end-1>t.memorySize)return void this.memoryState.push({assignmentID:t.assignmentID,begin:e[s].end+1,end:e[s].end+t.memorySize,size:t.memorySize})}else{var a=0;for(a=0;a<e.length-1;a++)if(e[a+1].begin-e[a].end-1>t.memorySize)return void this.memoryState.push({assignmentID:t.assignmentID,begin:e[a].end+1,end:e[a].end+t.memorySize,size:t.memorySize});if(this.memorySpace-e[a].end-1>t.memorySize)return void this.memoryState.push({assignmentID:t.assignmentID,begin:e[a].end+1,end:e[a].end+t.memorySize,size:t.memorySize})}}},sortByKey:function(t,e){return t.sort((function(t,i){var s=t[e],a=i[e];return s<a?-1:s>a?1:0}))},bestFit:function(t){if(1!=t.choose){var e=this.memoryState.findIndex((function(e){if(e.assignmentID==t.assignmentID)return!0})),i=this.memoryState[e];this.memoryState.splice(e,1),this.blankSpace.push({begin:i.begin,end:i.end,size:i.size}),this.blankSpace=this.sortByKey(this.blankSpace,"begin");for(var s=0;s<this.blankSpace.length-1;s++)if(this.blankSpace[s].end==this.blankSpace[s+1].begin-1){var a={begin:this.blankSpace[s].begin,end:this.blankSpace[s+1].end,size:this.blankSpace[s].size+this.blankSpace[s+1].size};this.blankSpace.splice(s,2),this.blankSpace.push(a),this.blankSpace=this.sortByKey(this.blankSpace,"begin"),s--}this.blankSpace=this.sortByKey(this.blankSpace,"size")}else for(var n=0;n<this.blankSpace.length;n++)if(t.memorySize<this.blankSpace[n].size){this.memoryState.push({assignmentID:t.assignmentID,begin:this.blankSpace[n].begin,end:this.blankSpace[n].begin+t.memorySize-1,size:t.memorySize});var o={begin:this.blankSpace[n].begin+t.memorySize,end:this.blankSpace[n].end,size:this.blankSpace[n].end-this.blankSpace[n].begin-t.memorySize+1};return this.blankSpace.splice(n,1),this.blankSpace.push(o),void(this.blankSpace=this.sortByKey(this.blankSpace,"size"))}},deleteMemory:function(){alert("清空了！"),this.sliderState=!1,this.clock=0,this.memoryState=[]}}}),S=g,k=Object(l["a"])(S,d,b,!1,null,"6e0d3cd0",null),f=k.exports,y=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{width:"30%",float:"left"}},[i("h1",[t._v("请求调页")]),i("el-button",{attrs:{disabled:t.initState},on:{click:t.initList}},[t._v("确定指令条数(需要为10的正整数倍)和内存块数")]),i("br"),i("el-slider",{attrs:{"show-input":"",max:"320",disabled:t.stepState},model:{value:t.stepNum,callback:function(e){t.stepNum=e},expression:"stepNum"}}),i("el-button",{attrs:{disabled:t.stepState},on:{click:t.goStep}},[t._v("执行"+t._s(t.stepNum)+"步")]),i("el-button",{attrs:{disabled:t.stepState},on:{click:t.reset}},[t._v("重置")]),i("el-slider",{attrs:{"show-input":"",max:"1000",disabled:t.sliderState},model:{value:t.instructionNum,callback:function(e){t.instructionNum=e},expression:"instructionNum"}}),i("p",[t._v("指令条数"+t._s(t.instructionNum))]),i("el-slider",{attrs:{"show-input":"",max:"10",disabled:t.sliderState},model:{value:t.blockNum,callback:function(e){t.blockNum=e},expression:"blockNum"}}),i("p",[t._v("内存块数"+t._s(t.blockNum))]),i("el-select",{attrs:{placeholder:"请选择调页算法",disabled:t.sliderState},model:{value:t.pageAlgorithm,callback:function(e){t.pageAlgorithm=e},expression:"pageAlgorithm"}},t._l(t.options,(function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),i("p",[t._v("缺页次数"+t._s(t.pageLackTimes)+",时钟周期"+t._s(t.clock)+",缺页率:"+t._s(t.pageFaultRate))])],1),i("div",{staticStyle:{width:"45%",float:"left"}},[i("h2",[t._v("内存块状态")]),i("el-table",{attrs:{data:t.blockList,stripe:"",height:"200"}},[i("el-table-column",{attrs:{prop:"blockID",label:"块号",width:"100"}}),i("el-table-column",{attrs:{prop:"pageID",label:"页号",width:"100"}}),i("el-table-column",{attrs:{prop:"lastVisitTime",label:"最后访问时间",width:"150"}}),i("el-table-column",{attrs:{prop:"getInTime",label:"入块时间",width:"150"}})],1)],1),i("div",{staticStyle:{width:"26%",float:"left"}},[i("h2",[t._v("待执行指令序列")]),i("el-table",{attrs:{data:t.orderList,stripe:"",height:"200"}},[i("el-table-column",{attrs:{prop:"instructionID",label:"指令编号",width:"100"}}),i("el-table-column",{attrs:{prop:"pageID",label:"所在页号",width:"100"}}),i("el-table-column",{attrs:{prop:"address",label:"地址",width:"100"}})],1)],1),i("div",{staticStyle:{width:"26%",float:"left"}},[i("h2",[t._v("执行过程")]),i("el-table",{attrs:{data:t.blog,stripe:"",height:"200"}},[i("el-table-column",{attrs:{prop:"instructionID",label:"指令编号",width:"100"}}),i("el-table-column",{attrs:{prop:"pageID",label:"所在页号",width:"100"}}),i("el-table-column",{attrs:{prop:"address",label:"地址",width:"100"}}),i("el-table-column",{attrs:{prop:"checkExchange",label:"是否缺页",width:"100"}})],1)],1)])},v=[],I={name:"pageRequest",data:function(){return{options:[{value:1,label:"LRU(最近最久未使用算法)"},{value:2,label:"FIFO(先进先出算法)"}],pageAlgorithm:1,blockNum:4,instructionNum:320,blockList:[],instructionList:[],orderList:[],blog:[],pageFaultRate:1,normalPercent:.5,prePercent:.25,latPercent:.25,sliderState:!1,clock:0,stepNum:1,stepState:!0,blockRemainSpace:4,pageLackTimes:0,initState:!1}},computed:{},methods:{reset:function(){this.clock=0,this.pageLackTimes=0,this.blog=[],this.initInstructionList(),this.initBlockList(),this.initOrderList(),this.stepNum=1,this.pageFaultRate=1,this.sliderState=!1,this.blockRemainSpace=this.blockNum,this.stepState=!0,this.initState=!1},goStep:function(){this.initState=!0;for(var t=0;t<this.stepNum;t++){this.pageLackTimes++;for(var e=0,i=0;i<this.blockNum;i++)if(this.blockList[i].pageID==this.orderList[0].pageID){this.blog.push({instructionID:this.orderList[0].instructionID,pageID:this.orderList[0].pageID,address:this.orderList[0].address,checkExchange:"no"}),this.blockList[i].lastVisitTime=this.clock,e=1;break}if(1!=e)if(this.blockRemainSpace>=1){for(var s=0;s<this.blockNum;s++)if("-"==this.blockList[s].pageID){this.blog.push({instructionID:this.orderList[0].instructionID,pageID:this.orderList[0].pageID,address:this.orderList[0].address,checkExchange:"yes"}),this.blockList[s].pageID=this.orderList[0].pageID,this.blockList[s].lastVisitTime=this.clock,this.blockList[s].getInTime=this.clock,this.blockRemainSpace--;break}this.orderList.splice(0,1),this.clock++,this.getPageFaultRate()}else 1==this.pageAlgorithm?this.alLRU():this.alFIFO(),this.blog.push({instructionID:this.orderList[0].instructionID,pageID:this.orderList[0].pageID,address:this.orderList[0].address,checkExchange:"yes"}),this.orderList.splice(0,1),this.clock++,this.getPageFaultRate();else this.pageLackTimes--,this.orderList.splice(0,1),this.clock++,this.getPageFaultRate()}},initList:function(){this.blockRemainSpace=this.blockNum,this.initInstructionList(),this.initOrderList(),this.initBlockList(),this.stepState=!1,this.sliderState=!0},initBlockList:function(){this.blockList=[];for(var t=1;t<=this.blockNum;t++)this.blockList.push({blockID:t,pageID:"-",lastVisitTime:"-",getInTime:"-"})},initInstructionList:function(){this.instructionList=[];for(var t=this.instructionNum/10,e=1,i=1;i<=t;i++)for(var s=0;s<10;s++)this.instructionList.push({address:e,instructionID:e++,pageID:i})},initOrderList:function(){this.orderList=[];var t=Math.floor(Math.random()*this.instructionNum);this.orderList.push({address:this.instructionList[t].address,instructionID:this.instructionList[t].instructionID,pageID:this.instructionList[t].pageID},{address:this.instructionList[++t].address,instructionID:this.instructionList[++t].instructionID,pageID:this.instructionList[++t].pageID});for(var e=2;e<this.instructionNum;e++){switch((e+1)%4){case 2:t++;break;case 1:t=Math.floor(Math.random()*(t-1));break;case 0:t++;break;case 3:t++,t=Math.floor(Math.random()*(this.instructionNum-t)+t);break}this.orderList.push({address:this.instructionList[t].address,instructionID:this.instructionList[t].instructionID,pageID:this.instructionList[t].pageID})}},getPageFaultRate:function(){this.pageFaultRate=this.pageLackTimes/this.clock},alLRU:function(){for(var t=0,e=0;e<this.blockNum;e++)this.blockList[t].lastVisitTime>this.blockList[e].lastVisitTime&&(t=e);this.blockList[t].pageID=this.orderList[0].pageID,this.blockList[t].lastVisitTime=this.clock,this.blockList[t].getInTime=this.clock},alFIFO:function(){for(var t=0,e=0;e<this.blockNum;e++)this.blockList[t].getInTime>this.blockList[e].getInTime&&(t=e);this.blockList[t].pageID=this.orderList[0].pageID,this.blockList[t].lastVisitTime=this.clock,this.blockList[t].getInTime=this.clock},sortByKey:function(t,e){return t.sort((function(t,i){var s=t[e],a=i[e];return s<a?-1:s>a?1:0}))}}},L=I,D=Object(l["a"])(L,y,v,!1,null,"5f452ed8",null),z=D.exports;s["default"].use(m["a"]);var _=[{path:"/pageRequest",name:"pageRequest",component:z},{path:"/dynamicAllocation",name:"dynamicAllocation",component:f}],w=new m["a"]({routes:_,mode:"hash"}),O=w;s["default"].config.productionTip=!1,s["default"].use(p.a),s["default"].use(m["a"]),new s["default"]({router:O,render:function(t){return t(h)}}).$mount("#app")},"85ec":function(t,e,i){}});