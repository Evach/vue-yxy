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
      <dt class="title">评价</dt>
      <dd class="info">
        <el-row :gutter="10" class="item">
          <el-col :span="12">
            <span class="label">回复速度：</span>
            <el-rate v-model="reply_speed_value" show-text :texts="rate_text">
            </el-rate>
          </el-col>
          <el-col :span="12">
            <span class="label">服务态度：</span>
            <el-rate
              v-model="service_attitude_value"
              show-text
              :texts="rate_text"
            >
            </el-rate>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="item">
          <el-col :span="12">
            <span class="label">专业性：</span>
            <el-rate v-model="professional_value" show-text :texts="rate_text">
            </el-rate>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="item">
          <el-col :span="24">
            <div class="evaluate_row">
              <span class="label">评价：</span>
              <el-input type="textarea" class="textarea"></el-input>
            </div>
          </el-col>
        </el-row>
      </dd>
    </dl>

    <div style="text-align: center;">
      <el-button type="primary">提交评价</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvaluateDetail",
  data() {
    return {
      reply_speed_value: 5,
      service_attitude_value: null,
      professional_value: null,
      rate_text: ["1分", "2分", "3分", "4分", "5分"],
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
