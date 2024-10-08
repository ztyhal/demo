<template>
  <div id="app">
    <el-container style="height: calc(100vh - 16px); border: 1px solid #eee">
      <el-aside width="220px" style="background-color: #333">
        <el-menu :default-openeds="['1', '3']" background-color="#333" text-color="#fff">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item index="1-1">费用管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <div class="nav">
            <span>费用管理</span>
            <img class="option" src="../../assets/open.png" alt="">
          </div>
          <div class="btn">
            <el-button size="mini" type="warning" icon="el-icon-check" plain>30</el-button>
            <el-button size="mini" type="danger" icon="el-icon-close" plain>20</el-button>
          </div>
          <div class="opeateBox">
            <div class="divider"></div>
            <span class="opeate">子平台</span>
            <img class="option" src="../../assets/open.png" alt="">
          </div>
          <i class="el-icon-search item" style="font-size: 30px;"></i>
          <i class="el-icon-bell item" style="font-size: 30px;"></i>
          <img class="avator" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="">
          <img class="option" src="../../assets/open.png" alt="">
        </el-header>

        <el-main>
          <router-view :key="key" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Layout',
  data() {
    const item = {
      date: '2016-05-02',
      name: '良信电器',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      key: this.$route.fullPath
    }
  }
};
</script>
<style>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  text-align: right;
  font-size: 12px;
  padding: 10px;
  padding-top: 0px;
  position: relative;
}

.el-aside {
  color: #333;
}

.el-main {
  padding: 0;
}

.avator {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.option {
  width: 20px;
  height: 20px;
  margin-bottom: 2px;
}

.item {
  margin-top: -10px;
  margin-right: 20px;
  font-size: 30px;
}

.opeateBox {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.opeate {
  color: #333;
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
}

.divider {
  width: 1px;
  height: 25px;
  background-color: #999;
  display: inline-flex;
  margin: 0 15px;
}

.btn {
  display: inline-flex;
  position: relative;
  bottom: 8px;
}

.nav {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 20px;
}

.nav span {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}</style>
