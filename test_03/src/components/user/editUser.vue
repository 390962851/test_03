<template>
  <a-modal v-model="showM" title="编辑信息" :width="'30%'" @ok="onSubmit" @cancel="onCancel" ok-text="确认" cancel-text="取消">
  <a-form-model ref="addUser" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="用户名" prop="userName">
        <a-input v-model="form.userName"/>
      </a-form-model-item>
      <a-form-model-item label="真实姓名" prop="realName">
        <a-input v-model="form.realName"/>
      </a-form-model-item>
      <a-form-model-item label="是否有效" prop="delFlag">
        <a-radio-group v-model="form.delFlag" :defaultValue="form.delFlag">
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
          v-model="form.createTime"
          placeholder="请选择时间...."
          style="width: 100%;"
          @change="onChangeTime"
        />
      </a-form-model-item>
      <a-form-model-item label="描述" prop="description">
      <a-input v-model="form.description" type="textarea"/>
    </a-form-model-item>
  </a-form-model>
  </a-modal>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        showM:false,
        labelCol: {span: 6},
        wrapperCol: {span: 16},
        form: {
          userName: '',
          realName: '',
          delFlag: 0,
          createTime: null,
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
      showModal(value) {
        this.form = value;
        this.showM = true;
      },
      onSubmit() {
        this.$refs.addUser.validate(valid => {
          if (valid) { //表单验证通过
            // console.log(this.form);
            this.$axios({
              method: 'post',
              url: '/user/userUpdate',
              data: this.form,
            }).then(res => {
              // console.log(res.data);
              this.showM = false;
              this.reload();
            })
          } else {
            console.log('error submit!!');
          }
        });
      },
      onCancel(){
        this.reload();
      },
      onChangeTime(date, dateString) {
        // console.log(date, dateString);
        this.form.createTime = dateString;
      },
    },
    created() {
    }
  }
</script>
