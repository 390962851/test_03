<template>
  <a-tabs type="card">
    <a-tab-pane key="1" tab="控制台">
      <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="用户名" prop="userName">
          <a-input v-model="form.userName" />
        </a-form-model-item>
        <a-form-model-item label="是否有效" prop="delFlag">
          <a-radio-group v-model="form.delFlag">
            <a-radio value="0">
              有效
            </a-radio>
            <a-radio value="1">
              失效
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="创建日期" prop="createTime">
          <a-date-picker
            v-model="form.createTime"
            placeholder="请选择时间...."
            style="width: 100%;"
            @change="onChangeTime"
          />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 12 }">
          <a-button type="primary" @click="onSearch">
            查询
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-tab-pane>
    <a-tab-pane key="2" tab="添加用户">
      <a-form-model ref="addUser" :rules="rules" :model="addform" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="用户名" prop="userName">
          <a-input v-model="addform.userName" />
        </a-form-model-item>
        <a-form-model-item label="真实姓名" prop="realName">
          <a-input v-model="addform.realName" />
        </a-form-model-item>
        <a-form-model-item label="是否有效" prop="delFlag">
          <a-radio-group v-model="addform.delFlag" :defaultValue="0">
            <a-radio :value="0">
              有效
            </a-radio>
            <a-radio :value="1">
              失效
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="创建日期" prop="createTime">
          <a-date-picker
            v-model="addform.createTime"
            placeholder="请选择时间...."
            style="width: 100%;"
            @change="onCreatTime"
          />
        </a-form-model-item>
        <a-form-model-item label="描述" prop="description">
          <a-input v-model="addform.description" type="textarea" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 12 }">
          <a-button type="primary" @click="onSubmit">
            添加
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetFormUser">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  export default {
    data() {
      return {
        searchInput: '',
        labelCol: {span: 6},
        wrapperCol: {span: 16},
        form: {
          userName: '',
          delFlag: 0,
          createTime:undefined,
        },
        addform: {
          userName: '',
          realName: '',
          delFlag: 0,
          createTime:undefined,
          description: '',
        },
        rules: {
          userName: [{required: true, message: '请输入用户名...', trigger: 'blur'}],
          realName: [{required: true, message: '输入真实姓名...', trigger: 'blur'}],
          createTime: [{required: true, message: '请选择创建时间...', trigger: 'change'}],
        },
      }
    },
    methods: {
      onSearch(value){
        if (value.replace(/(^s*)|(s*$)/g, " ").length == 0) {
          this.$message.error('请输入内容!');
        } else {
          this.$axios({
            method: '',
            url: '',
          }).then(res => {

          })
        }
      },
      onSubmit() {
        this.$refs.addUser.validate(valid => {
          if (valid) {
            console.log(this.addform)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onChangeTime(date, dateString) {
        // console.log(date, dateString);
        this.form.createTime = dateString;
      },
      onCreatTime(date, dateString){
        this.addform.createTime = dateString;
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },
      resetFormUser(){
        this.$refs.addUser.resetFields();
      },
    },
  }
</script>
