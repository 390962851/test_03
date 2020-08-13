<template>
  <div>
    <a-modal v-model="showM" title="编辑信息" :width="'30%'">
    <template slot="footer">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" @click="handleOk">提交</a-button>
      </template>
      <!--编辑信息-->
      <div>
        <a-form-model ref="ruleForm" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row :gutter="8">
            <a-col :span="24">
              <a-form-model-item ref="name" label="资产名称" prop="assetsName">
                <a-input v-model="form.assetsName" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="型号" prop="type">
                <a-input v-model="form.type" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="单位" prop="unit">
                <a-input v-model="form.unit" />
              </a-form-model-item>
            </a-col>
            <a-col :xl="24">
              <a-form-model-item label="数量" prop="quantity">
                <a-input-number v-model="form.quantity" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="价格" prop="prices">
                <a-input-number v-model="form.prices" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="入库日期" prop="storageDate">
                <a-date-picker v-model="form.storageDate" placeholder="选择日期..." style="width: 100%;" @change="onChangeTime" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="领取人" prop="recipients">
                <a-input v-model="form.recipients" />
              </a-form-model-item>
            </a-col>

            <a-col :span="24">
              <a-form-model-item label="备注" prop="remarks">
                <a-input :rows="4" v-model="form.remarks" type="textarea" />
              </a-form-model-item>
            </a-col>
          </a-row>

        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import moment from 'moment';
  import "moment/locale/zh-cn";
  export default {
    inject: ['reload'],
    data() {
      return {
        moment,
        showM: false,
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 16,
        },
        form: {
          id: '',
          assetsName: '',
          type: '', //型号
          unit: '', //单位
          quantity: '', //数量
          prices: '', //价格
          recipients: '', //领取人
          storageDate: null,
          remarks: '',
        },
        rules: {
          assetsName: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请输入型号',
            trigger: 'change'
          }],
          unit: [{
            required: true,
            message: '请输入单位',
            trigger: 'change'
          }],
          quantity: [{
            required: true,
            message: '请输入数量',
            trigger: 'change',
          }],
          prices: [{
            required: true,
            message: '请输入价格',
            trigger: 'change',
          }],
          recipients: [{
            required: true,
            message: '请输入领取人',
            trigger: 'change'
          }],
          storageDate: [{
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
        },
      };
    },
    methods: {


    /* 入库日期 */
    onChangeTime(value, dateString) {
      this.form.storageDate = dateString;
      // console.log("onchangetime=",value,dateString)
    },
    showModal(value) {
      // console.log(value);
      value !== 0 ? this.findConsumablesById(value) : 0;
      this.showM = true;
    },
    /* 提交按钮 */
    handleOk() {
      let editurl = 'http://localhost:8088/consumables/update';
      let addturl = 'http://localhost:8088/consumables/add'
      let url = this.form.id === '' ? addturl : editurl;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.showM = false;
          this.$axios({
            method: 'post',
            url: url,
            data: this.form
          }).then(res => {
            res.data ? this.$message.success('添加成功!') : this.$message.error('添加失败!');
          })
          this.reload();
        } else {
          this.$message.warning('请填写完整数据!');
          console.log('error submit!!',valid);
        }
      });
      console.log("提交数据==", this.form)
    },
    handleCancel(e) {
      this.showM = false;
    },
    findConsumablesById(value) {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8088/consumables/findById/' + value,
      }).then(res => {
        console.log("findAssetsById", res.data);
        this.form = res.data;
      })
    },

  },
  created() {

  }
  };
</script>
