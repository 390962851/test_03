<template>
  <div>
    <a-button shape="round" size="small" @click="showModal">
      <a-icon type="edit" theme="filled"/>编辑
    </a-button>
    <a-modal v-model="visible" title="编辑用户信息" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">提交</a-button>
      </template>
      <!--编辑信息-->
      <div>
        <a-form-model ref="ruleForm" :model="form" :rules="rules"
          :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item ref="name" label="姓名" prop="name">
            <a-input v-model="form.name"/>
          </a-form-model-item>
          <a-form-model-item label="年龄" prop="age">
            <a-input v-model="form.age"/>
          </a-form-model-item>
          <a-form-model-item label="修改日期" required prop="time">
            <a-date-picker v-model="form.time" type="date"
              placeholder="选择日期.." style="width: 100%;"/>
          </a-form-model-item>
          <a-form-model-item label="领导" prop="compere">
           <!-- <a-input v-model="form.tag"/> -->
            <!-- <a-tag v-for="tag in form.tags" :key="tag" -->

            <a-tag :key="form.compere" :color="form.compere.length <= 2 ? 'geekblue' : 'green'">
              {{ form.compere }}
            </a-tag>
          </a-form-model-item>
          <a-form-model-item label="描述" prop="content">
            <a-input v-model="form.content" type="textarea" />
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>
<script>
  export default {
    props:{
      editUserId:Object,
    },
    data() {
      return {
        loading: false,
        visible: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
        other: '',
        form: {
          name: '',
          age: '',
          time: null,
          compere: '',
          content: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 5, message: '姓名长度为 1 - 5,', trigger: 'blur' },],
          age: [{ required: true, message: '请输入年龄', trigger: 'change' }],
          time: [{ required: true, message: '请选择日期', trigger: 'change' }],
          compere: [{type: 'array',required: true, message: '',trigger: 'change',}],
          content: [{ required: true, message: '请输入地址..', trigger: 'blur' }],
        },
      };
    },
    mounted() {
      this.form = this.editUserId;
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        this.loading = true;
        setTimeout(() => {
          this.$message.success("修改成功");
          this.visible = false;
          this.loading = false;
        }, 1500);
      },
      handleCancel(e) {
        this.visible = false;
      },
    },
    created() {
      // this.form.time = new Date().getYear()
    }
  };
</script>
