<template>
  <div>

    <div style="width: 30%;float: left">
      <h1>请求调页</h1>
    <el-button @click="initList" :disabled="initState">确定指令条数(需要为10的正整数倍)和内存块数</el-button><br>
    <el-slider v-model="stepNum"
               show-input
               max=320
               :disabled="stepState"></el-slider>
    <el-button @click="goStep" :disabled="stepState">执行{{stepNum}}步</el-button>
    <el-button @click="reset" :disabled="stepState">重置</el-button>
    <el-slider v-model="instructionNum"
               show-input
               max=1000
               :disabled="sliderState"></el-slider>
    <p>指令条数{{instructionNum}}</p>
    <el-slider v-model="blockNum"
               show-input
               max=10
               :disabled="sliderState"></el-slider>
    <p>内存块数{{blockNum}}</p>

    <el-select v-model="pageAlgorithm" placeholder="请选择调页算法"
    :disabled="sliderState">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
      <p>缺页次数{{pageLackTimes}},时钟周期{{clock}},缺页率:{{pageFaultRate}}</p>
    </div>

    <div style="width:45%;float: left">
      <h2>内存块状态</h2>
    <el-table
        :data="blockList" stripe height="200">
      <el-table-column
          prop="blockID"
          label="块号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="pageID"
          label="页号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="lastVisitTime"
          label="最后访问时间"
          width="150"
      >
      </el-table-column>
      <el-table-column
          prop="getInTime"
          label="入块时间"
          width="150"
      >

      </el-table-column>
    </el-table>
    </div>
    <div style="width:26%;float: left">
      <h2>待执行指令序列</h2>
    <el-table
        :data="orderList" stripe height="200">
      <el-table-column
          prop="instructionID"
          label="指令编号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="pageID"
          label="所在页号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址"
          width="100"
      >
      </el-table-column>
    </el-table>

    </div>

    <div style="width:26%;float: left">
      <h2>执行过程</h2>
      <el-table
          :data="blog" stripe height="200">
        <el-table-column
            prop="instructionID"
            label="指令编号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="pageID"
            label="所在页号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="100"
        >
        </el-table-column>
          <el-table-column
              prop="checkExchange"
              label="是否缺页"
              width="100"
          >
          </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
/*
* 总体流程:
* 首先确认指令条数(执行按钮滑块不能动)
*
* */
export default {
  name: "pageRequest",
  data(){
    return{
      options:[
        {value:1,label:"LRU(最近最久未使用算法)"},
        {value:2,label: "FIFO(先进先出算法)"}
      ],
      pageAlgorithm:1,

      //请求调页需要的属性
      /*
      * 320条指令（可变），
      * 每条指令所在的页面，指令所在地址，一个页面可以存10条指令，
      * 内存块4个（可变）块号 对应页号
      *
      *
      * */
      blockNum:4,
      instructionNum:320,
      blockList:[

      ],//内存块状态
      instructionList:[

      ],//指令数量状态
      orderList:
      [
      ],
      blog:[],
      pageFaultRate:1,
      normalPercent:0.5,
      prePercent:0.25,
      latPercent:0.25,
      sliderState:false,
      clock:0,
      stepNum:1,
      stepState:true,
      blockRemainSpace:4,
      pageLackTimes:0,
      initState:false
    }
  },
  computed:
      {

      },
  methods:{
    reset()
    {
      this.clock=0;
      this.pageLackTimes=0;
      this.blog=[];
      this.initInstructionList();
      this.initBlockList();
      this.initOrderList();
      this.stepNum=1;
      this.pageFaultRate=1;
      this.sliderState=false;
      this.blockRemainSpace=this.blockNum;
      this.stepState=true;
      this.initState=false;
    },
    goStep()
    {
      this.initState=true;
      for(let i=0;i<this.stepNum;i++)
      {
          //alert(this.stepNum);
          this.pageLackTimes++;
          let check=0;
          for(let i=0;i<this.blockNum;i++)
          {
            if(this.blockList[i].pageID==this.orderList[0].pageID)//已经存在
            {
              this.blog.push({
                instructionID:this.orderList[0].instructionID,
                pageID:this.orderList[0].pageID,
                address:this.orderList[0].address,
                checkExchange:"no"
              })
              this.blockList[i].lastVisitTime=this.clock;//更新最近访问时间
              check=1;
              break;
            }
          }
          if(check==1)
          {
            this.pageLackTimes--;//alert("页已经存在");
            this.orderList.splice(0,1);
            this.clock++;
            this.getPageFaultRate();//计算缺页率
            continue;
          }//是否已经存在于内存中

         if (this.blockRemainSpace >= 1) //有空余的部分
         {
          //直接调入
          for(let i=0;i<this.blockNum;i++)
          {
            if(this.blockList[i].pageID=='-')
            {
              this.blog.push({
                instructionID:this.orderList[0].instructionID,
                pageID:this.orderList[0].pageID,
                address:this.orderList[0].address,
                checkExchange:"yes"
              })

              this.blockList[i].pageID=this.orderList[0].pageID;
              this.blockList[i].lastVisitTime=this.clock;
              this.blockList[i].getInTime=this.clock;
              this.blockRemainSpace--;
              break;
            }
          }
          this.orderList.splice(0,1);
          this.clock++;
          this.getPageFaultRate();//计算缺页率
         //  alert("空余分配成功");
          continue;
         }
        //该指令是否已经存在于块
        //剩下的缺页情况
        //alert("缺页");
        if (this.pageAlgorithm == 1)
        {
          this.alLRU();
        }
        else
        {
          this.alFIFO();
        }
        this.blog.push({
          instructionID:this.orderList[0].instructionID,
          pageID:this.orderList[0].pageID,
          address:this.orderList[0].address,
          checkExchange:"yes"
        })
        // 执行完 删除orderList顶端元素
        this.orderList.splice(0,1);
        this.clock++;
        this.getPageFaultRate();//计算缺页率
      }
    },
    initList() {
      this.blockRemainSpace=this.blockNum;
      this.initInstructionList();
      this.initOrderList();
      this.initBlockList();
      this.stepState=false;//可以开始执行
      this.sliderState=true;
    },
    initBlockList()
    {
      this.blockList=[];
      for(let i=1;i<=this.blockNum;i++)
      {
        this.blockList.push({
          blockID:i,
          pageID:"-",
          lastVisitTime:"-",//
          getInTime:"-"
        })
      }
    },
    //初始化指令列表
    initInstructionList()
    {
      this.instructionList=[];
      let pageNum=this.instructionNum/10;
      let index=1;
      for(let i=1;i<=pageNum;i++) {
        for (let j=0;j<10;j++) {
          this.instructionList.push(
              {
                address:index,
                instructionID: index++,
                pageID:i,
              }
          )
        }
      }
    },
    //初始化指令执行列表
    initOrderList()
    {
      this.orderList=[];
      let randNum=Math.floor(Math.random()*(this.instructionNum));
      this.orderList.push(
          {
            address: this.instructionList[randNum].address,
            instructionID: this.instructionList[randNum].instructionID,
            pageID: this.instructionList[randNum].pageID,
          },
          {
            address: this.instructionList[++randNum].address,
            instructionID: this.instructionList[++randNum].instructionID,
            pageID: this.instructionList[++randNum].pageID,
          },
      )
      for(let i=2;i<this.instructionNum;i++)
      {
        switch((i+1)%4)
        {
          case 2:randNum++;break;
          case 1:randNum=Math.floor(Math.random()*(randNum-1));break;
          case 0:randNum++;break;
          case 3:randNum++;randNum=Math.floor(Math.random()*(this.instructionNum-randNum)+randNum);break;
        }
        this.orderList.push(
            {
              address: this.instructionList[randNum].address,
              instructionID: this.instructionList[randNum].instructionID,
              pageID: this.instructionList[randNum].pageID,
            }
        )
      }
      //乱序怎么搞
    },
    //计算缺页率
    getPageFaultRate(){
        this.pageFaultRate=this.pageLackTimes/this.clock;
    },
    //选择要置换的页面
    alLRU()//根据lastVisitTime
    {
      let minIndex=0;
      for(let i=0;i<this.blockNum;i++)
      {
        if(this.blockList[minIndex].lastVisitTime>this.blockList[i].lastVisitTime)
        {
          minIndex=i;
        }
      }
      this.blockList[minIndex].pageID=this.orderList[0].pageID;
      this.blockList[minIndex].lastVisitTime=this.clock;
      this.blockList[minIndex].getInTime=this.clock;
      //alert("成功换页");
    },
    alFIFO()//根据getInTime
    {
      let minIndex=0;
      for(let i=0;i<this.blockNum;i++)
      {
        if(this.blockList[minIndex].getInTime>this.blockList[i].getInTime)
        {
          minIndex=i;
        }
      }
      this.blockList[minIndex].pageID=this.orderList[0].pageID;
      this.blockList[minIndex].lastVisitTime=this.clock;
      this.blockList[minIndex].getInTime=this.clock;
      //alert("成功换页");
    },
    sortByKey(array, key){
      return array.sort(function (a,b)
      {
        let x=a[key];
        let y=b[key];
        return((x<y)?-1:((x>y)?1:0));
      })
    }
  }
}
</script>
<style scoped>
</style>
