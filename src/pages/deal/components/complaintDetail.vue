<template>
  <div class="wrapper">
    <dl class="module">
      <dt class="title">订单信息</dt>
      <dd class="info">
        <el-row :gutter="10" class="item">
          <el-col :span="24">
            <span class="label">产品名：</span>
            <em class="text">互联网医院项目（三级医院）</em>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="item">
          <el-col :span="24">
            <span class="label">下单时间：</span>
            <em class="text">2021-03-01 10:23:43</em>
          </el-col>
        </el-row>
      </dd>
    </dl>

    <dl class="module">
      <dt class="title">投诉</dt>
      <dd class="info">
        <el-row :gutter="10" class="item">
          <el-col :span="24">
            <span class="label" style="vertical-align: top;line-height: 40px;">
              原因：
            </span>
            <el-select v-model="value1" filterable placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="10" class="item">
          <el-col :span="24">
            <div class="evaluate_row">
              <span class="label">描述：</span>
              <el-input type="textarea" class="textarea"></el-input>
            </div>
          </el-col>
        </el-row>
      </dd>
    </dl>

    <div style="text-align: center;">
      <el-button type="primary">提交投诉</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComplaintDetail",
  data() {
    return {
      options1: [
        {
          value: "选项1",
          label: "智慧医疗",
        },
        {
          value: "选项2",
          label: "院内信息化",
        },
        {
          value: "选项3",
          label: "loT一体化",
        },
        {
          value: "选项4",
          label: "信息/数据服务类",
        },
        {
          value: "选项5",
          label: "便民服务",
        },
      ],
      value1: "选项1",
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 15px;
}
.module {
  margin-bottom: 30px;
}
.text {
  font-style: normal;
}
.info {
  padding: 20px;
  border: solid 1px #333;
}
.item {
  margin-bottom: 15px;
}
.info .item:last-child {
  margin: 0;
}
.label {
  width: 80px;
  display: inline-block;
  text-align: right;
}

.evaluate_row {
  display: flex;

  .textarea {
    flex: 1;
  }
}
</style>
