<template>
  <a-modal v-model="showM" title="编辑信息" :width="'30%'" @ok="onSubmit" @cancel="onCancel" ok-text="确认" cancel-text="取消">
    <a-form-model ref="editRole" :rules="rules" :model="editForm" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="角色名" prop="roleName">
        <a-input v-model="editForm.roleName"/>
      </a-form-model-item>
      <a-form-model-item label="角色编码" prop="roleCode">
        <a-input v-model="editForm.roleCode"/>
      </a-form-model-item>
      <a-form-model-item label="创建人" prop="createUser">
        <a-input v-model="editForm.createUser" disabled/>
      </a-form-model-item>
      <a-form-model-item label="是否禁用" prop="delFlag">
        <a-switch checked-children="禁用" un-checked-children="正常" @change="ChangeDelFlag"
                  :default-checked="editForm.delFlag === 0 ? false : true"/>
      </a-form-model-item>
      <a-form-model-item label="创建日期" prop="createTime">
        <a-date-picker
          v-model="editForm.createTime"
          placeholder="请选择时间...."
          style="width: 100%;"
          @change="onCreatTime"
        />
      </a-form-model-item>
      <a-form-model-item label="描述" prop="description">
        <a-input v-model="editForm.description" type="textarea"/>
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
        editForm: {
          roleName: '',
          roleCode: '',
          delFlag: 0, ///0正常  1禁用
          createUser: '',
          createTime: null,
          description: '',
        },
        rules: {
          roleName: [{required: true, message: '请输入角色名...', trigger: 'blur'}],
          roleCode: [{required: true, message: '输入角色编码...', trigger: 'blur'}],
          createTime: [{required: true, message: '请选择创建时间...', trigger: 'change'}],
        },
      }
    },
    methods: {
      showModal(value) {
        this.editForm = value;
        this.showM = true;
      },
      ChangeDelFlag(checked){
        this.editForm.delFlag = checked ? 1 : 0;
      },
      onSubmit() {
        this.$refs.editRole.validate(valid => {
          if (valid) { //表单验证通过
            // console.log(this.form);
            this.$axios({
              method: 'put',
              url: '/role/updateById',
              data: this.editForm,
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
      onCreatTime(date, dateString) {
        this.editForm.createTime = dateString;
      },
    },
    created() {
    }
  }
</script>
