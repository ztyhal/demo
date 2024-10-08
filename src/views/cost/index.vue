<template>
  <div id="main">
    <div class="top">
      <div class="top_left">
        <div class="left_item" :class="index === imgIndex ? 'actice' : ''" v-for="(item, index) in imgData" :key="index"
          @click="btnClick(index)">
          <img :src="item" alt="">
        </div>
        <el-date-picker style="margin-left: 20px;" v-model="value1" type="date" placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="top_right">
        <span class="right_option">电价设置</span>
        <span class="right_option">申报需量设置</span>
        <el-button-group>
          <el-button size="small">总览分析</el-button>
          <el-button size="small">电度电价</el-button>
          <el-button size="small">基本电费</el-button>
        </el-button-group>
        <el-button type="info">力调电费</el-button>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_left">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" suffix-icon="el-icon-search" style="margin-bottom: 10px;">
        </el-input>
        <div class='mytree'>
          <el-tree :data="treeData" :indent='0' show-checkbox node-key="id" default-expand-all v-loading="loadingTree"
            @check="treeCheck">
            <span class="custom-tree-node" slot-scope="{ node }">
              <img v-if="node.level == 1" :src="iconData[0]" alt="" srcset="" class="checkIcon">
              <img v-else-if="node.level == 2" :src="iconData[1]" alt="" srcset="" class="checkIcon">
              <span :style="{ fontWeight: node.level == 1 ? '' : 'bold', color: node.level == 1 ? '#94c1f8' : '' }">{{
                node.label
              }}</span>
            </span>
          </el-tree>
        </div>
      </div>
      <div class="bottom_right">
        <div class="right_top">
          <div class="top1">
            <h2>力调电费</h2>
            <div class="info">
              <span>功率因素调整电费表</span>
              <el-button icon="el-icon-star-off"></el-button>
            </div>
          </div>
          <div class="top2" v-loading="loadingCharts">
            <div id="right_top_left"></div>
            <div id="right_top_right"></div>
          </div>

        </div>
        <div class="right_bottom">
          <div class="bottom_top">
            <h2>数据报表</h2>
            <div class="info">
              <span>功率因素调整电费=(基本电费+电度电费)*力调系数</span>
              <el-button icon="el-icon-star-off"></el-button>
              <el-button icon="el-icon-message"></el-button>
            </div>
          </div>
          <div class="bottom_bottom">
            <el-table :data="tableData" max-height="300" row-key="id" default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" border show-summary style="width: 100%"
              :header-cell-style="{ background: '#EBEEF5', color: '#333', 'line-hight': '50px', 'text-align': 'center' }"
              v-loading="loadingTable">
              <el-table-column prop="id" label="节点名称" width="180">
              </el-table-column>
              <el-table-column prop="name" label="总有功电量">
              </el-table-column>
              <el-table-column prop="amount1" sortable label="总无功电量">
              </el-table-column>
              <el-table-column prop="amount2" sortable label="功率因素考核标准">
              </el-table-column>
              <el-table-column prop="amount3" sortable label="基本电费">
              </el-table-column>
            </el-table>
            <div class="pages">
              <el-pagination :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                layout="total, sizes, prev, pager, next, jumper" :total="400">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTable, getTree } from '../../api/index'
export default {
  data() {
    return {
      imgData: [
        require('../../assets/logo1.png'),
        require('../../assets/logo2.png'),
        require('../../assets/logo3.png'),
        require('../../assets/logo4.png'),
      ], //按钮图标
      iconData: [
        require('../../assets/logo5.png'),
        require('../../assets/logo6.png'),
        require('../../assets/logo7.png')
      ],//树节点图标
      value1: '', //日期

      // 分页数据
      currentPage: 4,
      imgIndex: 0,

      treeData: [], //树节点数据
      loadingTable: true,
      loadingTree: false,
      loadingCharts: false,
      tableData: [],//表格数据
      filterText: ''
    }
  },
  mounted() {
    // 绘制图表
    this.drawLine();
    this.drawBar();
    // 模拟接口数据
    this.getData()
  },
  methods: {
    // 按钮切换
    btnClick(index) {
      this.imgIndex = index
    },
    // 获取树节点、表格数据
    getData(isCheck) {
      this.tableData = []
      // this.treeData = []
      getTable().then(res => {
        console.log('res', res);
        this.loadingTable = true
        if (res.code === 200) {
          this.tableData = res.data
          setTimeout(() => {
            this.loadingTable = false
          }, 1000);
        }
      })
      // 判断勾选操作
      if (!isCheck) {
        getTree().then(res => {
          console.log('res', res);
          this.loadingCharts = true
          if (res.code === 200) {
            this.treeData = res.data
            setTimeout(() => {
              this.loadingCharts = false
            }, 1000);
          }
        })
      } else {
        this.loadingCharts = true
        setTimeout(() => {
          this.loadingCharts = false
        }, 1000);
      }
    },
    // 树节点勾选
    treeCheck(val) {
      console.log('val', val);
      if (val) {
        this.getData(true)
      }
    },
    // 绘制图表
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("right_top_left"));
      // 绘制图表
      myChart.setOption({

        series: [{
          name: '速度',
          type: 'gauge',
          max: 280,
          radius: '100%',
          startAngle: 215,
          endAngle: -35,
          detail: {
            formatter: '{value}元',
            textStyle: {
              fontSize: 16
            }
          },
          data: [{
            value: 100,
            name: '力调电费'
          }]
        }]
      });
    },
    drawBar() {
      let myChart = this.$echarts.init(document.getElementById("right_top_right"));
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          top: 0,
        },
        grid: {
          top: "30px",
          left: "50px",
          right: "40px",
          bottom: "20px",
        },
        xAxis: [
          {
            type: "category",
            data: ["1#配电房", "2#配电房", "3#配电房", "4#配电房", "5#配电房", "6#配电房", "7#配电房"],
          },
        ],
        yAxis: [
          {
            name: "无功罚款",
            type: "value",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} 万",
            },
          },
          {
            name: "平均功率因素",
            type: "value",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "无功罚款",
            type: "bar",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#35EB81" },
                { offset: 1, color: "rgba(53,235,129,.2)" },
              ]),
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
            ],
          },
          {
            name: "平均功率因素",
            type: "bar",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#32C1FF" },
                { offset: 1, color: "rgba(17,75,183,0.20)" },
              ]),
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
            ],
          }
        ],
      }
      myChart.setOption(option);

    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .mytree {
  .el-tree>.el-tree-node:after {
    border-top: none;
  }

  .el-tree-node {
    position: relative;
    padding-left: 16px;
    margin: 10px 0 !important;
  }

  .el-tree-node__expand-icon.is-leaf {
    display: none;
  }

  .el-tree-node__children {
    padding-left: 16px;
  }

  .el-tree-node :last-child:before {
    height: 38px;
  }

  .el-tree>.el-tree-node:before {
    border-left: none;
  }

  .el-tree>.el-tree-node:after {
    border-top: none;
  }

  .el-tree-node:before {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:before {
    border-left: 1px dashed #eee;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }

  .el-tree-node:after {
    border-top: 1px dashed #eee;
    height: 20px;
    top: 12px;
    width: 19px;
  }
}



#main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.top .top_left {
  display: flex;
}

.top .top_left .left_item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #fff;
  margin-right: 10px;
  cursor: pointer;
}

.top .top_left .left_item img {
  width: 25px;
  height: 25px;
}

.actice {
  border: 2px solid #94c1f8;
}

.top_right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.right_option {
  color: #94c1f8;
  margin-right: 15px;
  font-weight: bold;
  cursor: pointer;
}

.bottom {
  display: flex;
  width: 100%;
  height: 99%;
  padding-bottom: 10px;
}

.bottom_left {
  width: 20%;
  height: 100%;
  border-radius: 20px;
  background-color: #fff;
}

.bottom_right {
  width: 78%;
  height: 100%;
  margin-left: 1%;
  border-radius: 20px;
  background-color: #eee;
}

.right_top {
  width: 100%;
  height: 39%;
  background-color: #fff;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 5px;
  display: flex;
  flex-direction: column;

  .top1 {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
      display: flex;
      align-items: center;

      span {
        margin-right: 15px;
        color: #999;
      }
    }
  }

  .top2 {
    width: 100%;
    flex: 1;
    display: flex;
  }

  #right_top_left {
    width: 20%;
    height: 100%;
    // background-color: #94c1f8;
  }

  #right_top_right {
    width: 80%;
    height: 100%;
  }
}

.right_bottom {
  width: 100%;
  height: 59%;
  margin-top: 1%;
  background-color: #fff;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
}

.bottom_left {
  padding: 20px;
  box-sizing: border-box;
}

.bottom_top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .info {
    display: flex;
    align-items: center;

    span {
      margin-right: 15px;
      color: #999;
    }
  }
}

.checkIcon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.pages {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>