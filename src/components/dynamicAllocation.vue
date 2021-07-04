<template>
  <div>
    <h1>动态内存分配</h1>

    <el-button  @click="deleteMemory">重置</el-button><br>

    <el-slider v-model="memorySpace"
               show-input
               max=1000
               :disabled="sliderState"></el-slider>
    <p>内存空间大小{{memorySpace}}kb</p>
    <el-select v-model="alAllocation" placeholder="请选择分配算法" :disabled="sliderState">

      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>

    <div style="width: 45%;float: left;">
      <h2>作业列表</h2>
    <el-table
        :data="taskList" stripe style="width: 100%" height="300">
      <el-table-column
          prop="assignmentID"
          label="作业编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="chooseOption"
          label="操作"
          width="180">
      </el-table-column>
      <el-table-column
          prop="memorySize"
          label="大小/kb">
      </el-table-column>
    </el-table>
    </div>

    <div style="width: 50%;float: right" >
      <h2>内存空间</h2>
    <el-button @click="nextStep">下一步</el-button>
    <p>总内存空间{{memorySpace}}kb</p>
    <el-table
        :data="memoryState" style="width: 100%" height="200">
      <el-table-column
       prop="assignmentID"
      label="作业编号"
      width="180">
      </el-table-column>
      <el-table-column
          prop="begin"
          label="起点"
          width="180">
      </el-table-column>
      <el-table-column
          prop="end"
          label="终点"
          width="180">
      </el-table-column>
    </el-table>
    <p>内存中作业个数{{memoryState.length}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "dynamicAllocation",
  created(){
    this.initLists();
  },
  data()
  {
    return{

      options:[
        {value:1,label:"首次适应算法"},
        {value:2,label: "最佳适应算法"}
      ],
      alAllocation:1,
      //属性集合
      sliderState:false,//true禁用滑块

      memorySpace:640,
      //任务列表 包括作业编号，作业空间，申请还是释放，所在区间
      taskList:[
      ],
      memoryState:[

      ],
      memoryBlog:[],
      taskInMemoryNum:0,
      clock:0,//时钟标志位
      blankSpace:[]
    }
  },
  methods:{
    nextStep()
    {
      this.sliderState=true;
      if(this.clock>=this.taskList.length)
      {
        alert("任务已经全部执行完");
        return;
      }
    //  操作
      if(this.alAllocation==1)
      {
        this.firstFit(this.taskList[this.clock]);
      }
      else
      {
        this.bestFit(this.taskList[this.clock]);
      }
      this.clock++;

    },
    //初始化作业列表
    initLists()
    {
      this.taskList=[
        {
          assignmentID: 1,
          choose: 1, //申请
          chooseOption:"申请",
          memorySize: 130,
        },
        {
          assignmentID: 2,
          choose: 1,
          chooseOption:"申请",
          memorySize: 60,
        },
        {
          assignmentID: 3,
          choose: 1,
          chooseOption:"申请",
          memorySize: 100,
        },
        {
          assignmentID: 2,
          choose: 0,//释放
          chooseOption:"释放",
          memorySize: 60,
        },
        {
          assignmentID: 4,
          choose: 1,
          chooseOption:"申请",
          memorySize: 200,
        },
        {
          assignmentID: 3,
          choose: 0,
          chooseOption:"释放",
          memorySize: 100,
        },
        {
          assignmentID: 1,
          choose: 0,
          chooseOption:"释放",
          memorySize: 130,
        },
        {
          assignmentID: 5,
          choose: 1,
          chooseOption:"申请",
          memorySize: 140,
        },
        {
          assignmentID: 6,
          choose: 1,
          chooseOption:"申请",
          memorySize: 60,
        },
        {
          assignmentID: 7,
          choose: 1,
          chooseOption:"申请",
          memorySize: 50,
        },
        {
          assignmentID: 6,
          choose: 0,
          chooseOption:"释放",
          memorySize: 60,
        }
      ],
      this.blankSpace=[
        {
          begin:0,
          end:this.memorySpace-1,
          size:this.memorySpace
        }
      ]
    },
    //分配算法
    firstFit(task)
    {
      let memoryState2=this.sortByKey(this.memoryState,"begin");
      //注意初始空间为空的情况下可能会有bug
      if(task.choose==1)//申请
      {
        //如果本来内存就为空
        if(this.memoryState.length==0)
        {
         if(this.memorySpace<task.memorySize)
         {
          // alert("分配失败");
           return;
         }
          this.memoryState.push({
            assignmentID:task.assignmentID,
            begin:0,
            end:task.memorySize-1,
            size:task.memorySize
          });
          //alert("分配成功");
          return;
        }

        if(memoryState2[0].begin>0)//如果首个元素初始位置大于0
        {
          if(task.memorySize<memoryState2[0].begin)
          {
            this.memoryState.push({
              assignmentID:task.assignmentID,
              begin:0,
              end:task.memorySize-1,
              size:task.memorySize});
           // alert("分配成功");
            return;
          }
          let i=1;
          for(i=1;i<memoryState2.length-1;i++)
          {
            if((memoryState2[i+1].begin-memoryState2[i].end-1)>task.memorySize)
            {
              this.memoryState.push({
                assignmentID:task.assignmentID,
                begin:memoryState2[i].end+1,
                end:memoryState2[i].end+task.memorySize,
                size:task.memorySize});
             // alert('分配成功');
              return;
            }
          }
          if((this.memorySpace-memoryState2[i].end-1)>task.memorySize)
          {
            this.memoryState.push({
              assignmentID:task.assignmentID,
              begin:memoryState2[i].end+1,
              end:memoryState2[i].end+task.memorySize,
              size:task.memorySize});
           // alert("success");
            return;
          }
        }
        else//从头开始找
        {
           let i=0;
           for(i=0;i<memoryState2.length-1;i++)
           {
             if((memoryState2[i+1].begin-memoryState2[i].end-1)>task.memorySize)
             {
               this.memoryState.push({
                 assignmentID:task.assignmentID,
                 begin:memoryState2[i].end+1,
                 end:memoryState2[i].end+task.memorySize,
                 size:task.memorySize});
              // alert('分配成功');
               return;
             }
           }
           if((this.memorySpace-memoryState2[i].end-1)>task.memorySize)
           {
             this.memoryState.push({
               assignmentID:task.assignmentID,
               begin:memoryState2[i].end+1,
               end:memoryState2[i].end+task.memorySize,
               size:task.memorySize});
            // alert("success");
             return;
           }
        }
       // alert('分配失败');
        return;
      }
      else//释放内存
      {
        let index = this.memoryState.findIndex(item =>{
          if(item.assignmentID==task.assignmentID){
            return true
          }
        })
        this.memoryState.splice(index,1)
       // alert('释放成功');
      }
    },
    //对内存中各存在作业的区间排序
    sortByKey(array, key){
      return array.sort(function (a,b)
      {
        let x=a[key];
        let y=b[key];
        return((x<y)?-1:((x>y)?1:0));
      })
    },

    bestFit(task)
    {
      if(task.choose==1)
      {
        for(let i=0;i<this.blankSpace.length;i++)
        {
          if(task.memorySize<(this.blankSpace[i].size))
          {
            //分配
            this.memoryState.push({
              assignmentID:task.assignmentID,
              begin:this.blankSpace[i].begin,
              end:this.blankSpace[i].begin+task.memorySize-1,
              size:task.memorySize});
            //重载空白区
            //新建空白区
            let newBlank={
              begin:this.blankSpace[i].begin+task.memorySize,
              end:this.blankSpace[i].end,
              size:this.blankSpace[i].end-this.blankSpace[i].begin-task.memorySize+1
            }
            //再删除原空白区
            this.blankSpace.splice(i,1);
            //插入新空白区
            this.blankSpace.push(newBlank);
            //重新排序
            this.blankSpace=this.sortByKey(this.blankSpace,"size");
          //  alert("分配成功");
            return;
          }
        }
       // alert("分配失败");
        return;
      }

      else
      { //删除任务

        let index = this.memoryState.findIndex(item =>{
          if(item.assignmentID==task.assignmentID){
            return true
          }
        });

        let taskInMemory=this.memoryState[index];

        this.memoryState.splice(index,1);//删除进程
        this.blankSpace.push(
            {
              begin:taskInMemory.begin,
              end:taskInMemory.end,
              size:taskInMemory.size
            }
        );
        //连续的空白区进行合并 关键点
        //先排序
        this.blankSpace=this.sortByKey(this.blankSpace,"begin");
        for(let i=0;i<this.blankSpace.length-1;i++)
        {
          if(this.blankSpace[i].end==(this.blankSpace[i+1].begin-1))
          {
            let newBlank={
              begin:this.blankSpace[i].begin,
              end:this.blankSpace[i+1].end,
              size:this.blankSpace[i].size+this.blankSpace[i+1].size
            }
            this.blankSpace.splice(i,2);
            this.blankSpace.push(newBlank);
            this.blankSpace=this.sortByKey(this.blankSpace,"begin");
            i--;
          }
        }
        this.blankSpace=this.sortByKey(this.blankSpace,"size");
       // alert('释放成功');
      }
    },
    deleteMemory()
    {
      alert("清空了！");
      this.sliderState=false;
      this.clock=0;
      this.memoryState=[];
    }
  }
}
</script>

<style scoped>

</style>
