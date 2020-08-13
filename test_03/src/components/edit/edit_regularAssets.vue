<template>
  <div>
    <a-button shape="round" size="small" @click="showModal">
      <a-icon type="edit" theme="filled" />编辑
    </a-button>
    <!-- 弹窗-->
    <a-modal v-model="visible" title="编辑信息" on-ok="handleOk" :width="'45%'">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" @click="handleOk">提交</a-button>
      </template>
      <!--编辑信息-->
      <div>
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">

          <a-row :gutter="8">
            <a-col :span="12">
              <a-form-model-item ref="name" label="资产名称" prop="assetsName">
                <a-input v-model="form.assetsName" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="资产类别" prop="assetsType">
                <a-input v-model="form.assetsType" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="型号" prop="type">
                <a-input v-model="form.type" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="单位" prop="unit">
                <a-input v-model="form.unit" />
              </a-form-model-item>
            </a-col>
            <a-col :xl="12">
              <a-form-model-item label="数量" prop="quantity">
                <a-input-number v-model="form.quantity" />
              </a-form-model-item>
            </a-col>

            <a-col :span="12">
              <a-form-model-item label="入库日期" prop="storageDate">
                <a-date-picker v-model="form.storageDate" placeholder="选择日期..." style="width: 100%;" @change="onChangeTime" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="领取人" prop="recipients">
                <a-input v-model="form.recipients" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="资产原值" prop="assetsValue">
                <a-input-number v-model="form.assetsValue" @blur="onChangeAssetsValue(form.assetsValue)"
                      :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="value => value.replace(/\$\s?|(,*)/g, '')" style="width: 100%;"/>
                <!-- <a-input prefix="￥" v-model="form.assetsValue" /> -->
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="12">
              <a-form-model-item label="折旧年限" prop="depreciationPeriod">
                <!-- <a-input v-model="form.depreciationPeriod" /> -->
                <a-input-number :min="0" :max="100000" :default-value="1" v-model="form.depreciationPeriod" @change="onChangePeriod" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="折旧率" prop="depreciationRate">
                <a-input-number v-model="form.depreciationRate" :default-value="0" :min="0" :max="100" :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')" @blur="onChangeRate(form.depreciationRate)" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="已折旧日期" prop="depreciatedDate">
                <a-input-number v-model="form.depreciatedDate" @blur="onChangeDepreciatedDate(form.depreciatedDate)"/>
              </a-form-model-item>
            </a-col>
            <!-- 需要计算部分-->
            <a-col :span="12">
              <a-form-model-item label="本月折旧" prop="depreciationMonth">
                <!-- <a-input-number v-model="form.depreciationRate * form.assetsValue" disabled /> -->
                <a-input v-model="form.depreciationMonth" disabled @change="onChangeDepreciationMonth(form.depreciationMonth)" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="累计折旧" prop="depreciationAcc">
                <a-input v-model="form.depreciationAcc" disabled @change="onChangeDepreciationAcc(form.depreciationAcc)"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="资产净值" prop="assetNetValue">
                <a-input v-model="form.assetNetValue" disabled />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="存放地点" prop="storageLoca">
                <a-input v-model="form.storageLoca" />
              </a-form-model-item>
            </a-col>

            <a-col :span="12">
              <a-row>
                <a-form-model-item label="状态" prop="status">
                  <a-col :span="12">
                    <a-select v-model="form.status" style="width: 90px" @change="OnChangeSelect">
                      <a-select-option v-for="item in showStatus" :key="item.id" :value="item.id">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="12" v-show="showDateP">
                    <!-- <a-date-picker placeholder="请选择日期" v-model="selStatusDate" :disabled="disabled" @change="ChangeStatusDate"/> -->
                    <a-date-picker placeholder="请选择日期" v-model="selStatusDate" @change="ChangeStatusDate"/>
                  </a-col>
                </a-form-model-item>
              </a-row>
            </a-col>

            <a-col :span="24">
              <a-form-model-item label="备注" prop="remarks">
                <a-input :rows="4" v-model="form.remarks" type="textarea" />
              </a-form-model-item>
              <!-- <div style="width: 100%; display: flex;flex-direction: row;float: right;"> -->
              <!-- <h4>Basic:</h4> -->
              <!-- <a-input :rows="4" v-model="form.remarks" type="textarea" /> -->
              <!-- </div> -->
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
    inject:['reload'],
    props: {
      editUserId: Number,
    },
    data() {
      return {
        moment,
        visible: false,
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 16,
        },
        showDateP:false,//是否显示日期选择框
        selStatusDate:null,
        form: {},
        showStatus: [{ //动态展示状态下拉列表
          id: '',
          name: '',
          dateTime: ''
        }],
        rules: {
          assetsName: [{required: true,message: '请输入资产名称',trigger: 'blur'}],
          assetsType: [{required: true,message: '请输入资产类别',trigger: 'change'}],
          type: [{required: true,message: '请输入型号',trigger: 'change'}],
          unit: [{required: true,message: '请输入单位',trigger: 'blur'}],
          quantity: [{required: true,message: '请输入数量',trigger: 'blur'}],
          storageDate: [{required: true,message: '请选择日期',trigger: 'change'}],
          recipients: [{required: true,message: '请输入领取人',trigger: 'blur'}],
          assetsValue: [{required: true,message: '请输入资产原值',trigger: 'blur'}],
          depreciationRate: [{required: true,message: '请输入折旧率',trigger: 'change'}],
          depreciationPeriod: [{required: true,message: '请输入折旧年限',trigger: 'change'}],
          depreciatedDate: [{required: true,message: '请输入已折旧日期',trigger: 'blur'}],
          storageLoca: [{required: true,message: '请输入存放地点',trigger: 'change'}],
          statusDate: [{required: true,message: '请选择日期',trigger: 'change'}],
          status: [{required: true,message: '请选择状态',trigger: 'blur'}],
        },
      };
    },
    computed:{
      AccChange(){
        return this.form.depreciationAcc
      }
    },
    watch:{
      AccChange(){
        this.form.assetNetValue = this.form.assetsValue - this.form.depreciationAcc
      }
    },
    methods: {
      /* 已折旧日期改变*/
      onChangeDepreciatedDate(value){
        this.form.depreciationAcc = value * this.form.depreciationMonth
      },
      /* 本月折旧改变*/
      onChangeDepreciationMonth(value){
        this.form.depreciationAcc = value * this.form.depreciatedDate
      },

      /* 资产原值*/
      onChangeAssetsValue(value){
        this.form.depreciationMonth = value * (this.form.depreciationRate /100)
        this.form.assetNetValue = value - this.form.depreciationAcc;
        // console.log("onChangeAssetsValue",value)
      },
      /* 折旧率改变 */
      onChangeRate(value) {
        this.form.depreciationMonth = this.form.assetsValue * (value /100)
        // console.log('onChangeRate===', value);
      },
      /* 累计折旧 */
      onChangeDepreciationAcc(value){
        this.form.assetNetValue = this.form.assetsValue - value;
      },

      ChangeStatusDate(value, dateString){
        this.selStatusDate = dateString;
        // console.log("ChangeStatusDate=",dateString)
      },
      /* 状态下拉列表改变 */
      OnChangeSelect(value){
        value <= 2 ? this.showDateP = false : this.showDateP = true;
        // console.log('OnChangeSelect===', value);
      },
      /* 折旧年限改变 */
      onChangePeriod(value) {
        console.log('onChangePeriod===', value);
      },
      /* 入库日期 */
      onChangeTime(value, dateString) {
        this.form.storageDate = dateString;
        // console.log("onchangetime=",value,dateString)

      },
      /* 编辑弹框 */
      showModal() {
        this.visible = true;
        this.getStatusDate();
        this.findAssetsById();
        // console.log("editUserId", this.editUserId)
      },
      /* 提交按钮 */
      handleOk(e) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.form.status <= 2 ? this.form.statusDate = null : this.form.statusDate = this.selStatusDate;
            this.$axios({
              method: 'put',
              url: 'http://localhost:8088/assets/update',
              data: this.form
            }).then(res => {
              res.data ? this.$message.success('修改成功!') :  this.$message.error('修改失败!');
              this.visible = false;
              // this.$router.push('/regularAssets')
            })
            this.reload();
          } else {
            this.$message.warning('请填写完整数据!');
          }
        });
        console.log("提交数据==", this.form)
      },
      handleCancel(e) {
        this.visible = false;
      },
      /* 获取状态列表 */
      getStatusDate() {
        this.$axios({
          url: "http://localhost:8088/status/getAllStatus",
          methos: "get",
        }).then(res => {
          this.showStatus = res.data
          // console.log("getStatusDate", this.showStatus);
        })
      },

      findAssetsById() {
        this.$axios({
          method: 'get',
          url: 'http://localhost:8088/assets/findById/' + this.editUserId,
        }).then(res => {
          console.log("findAssetsById", res.data);
          // res.data.status <= 2 ? this.disabled = true : this.disabled = false;
          this.OnChangeSelect(res.data.status);
          this.selStatusDate = res.data.statusDate;
          this.form = res.data;
        })
      }
    },
    created() {

    }
  };
</script>
