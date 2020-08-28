<template>
  <a-row :gutter="16">
    <a-col :span="18">
      <a-card>
        <a-table :columns="columns" :data-source="datatable" :pagination="false" rowKey="id">
          <span slot="userName">用户名</span>
          <!-- 标签状态显示-->
          <span slot="delFlag" slot-scope="delFlag">
              <a-tag :key="delFlag" :color="delFlag === '0' ? 'green' : 'red'">
                {{ delFlag === '0' ? '有效' : '失效' }}
              </a-tag>
            </span>
          <!-- 操作-->
          <span slot="action" slot-scope="text,record">
            <a-row>
              <a-col :span="12">
                <a-button shape="round" size="small" @click="showEdit(record)">
                  <a-icon type="edit" theme="filled"/>编辑
                  <edit-user ref="editUser"></edit-user>
                </a-button>
              </a-col>
              <a-col :span="12">
                <a-popconfirm title="三思你的选择..." ok-text="确认" cancel-text="取消" @confirm="confirm(record.id)"
                              @cancel="cancel">
                  <a-button type="danger" shape="round" ghost size="small">
                    <a-icon type="delete"/>删除</a-button>
                </a-popconfirm>
              </a-col>
            </a-row>
          </span>
        </a-table>
        <!-- 分页 -->
        <a-pagination v-model="form.pageNo" :page-size-options="pageSizeOptions" :total="form.total"
                      show-size-changer
                      :page-size="form.pageSize"
                      @showSizeChange="onShowSizeChange" @change="changeCurrent" style="margin-top: 20px;float: right">
          <template slot="buildOptionText" slot-scope="props">
            <span>{{ props.value }}条/页</span>
          </template>
        </a-pagination>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card>
        <a-tabs type="card">
          <a-tab-pane key="1" tab="控制台">
            <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="用户名" prop="userName">
                <a-input v-model="form.userName"/>
              </a-form-model-item>
              <a-form-model-item label="是否有效" prop="delFlag">
                <a-radio-group v-model="form.delFlag" :defaultValue="0">
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
              <a-form-model-item :wrapper-col="{ span: 14, offset: 12 }">
                <a-button type="primary" @click="findPage">
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
                <a-input v-model="addform.userName"/>
              </a-form-model-item>
              <a-form-model-item label="真实姓名" prop="realName">
                <a-input v-model="addform.realName"/>
              </a-form-model-item>
              <a-form-model-item label="密码" prop="passWord">
                <a-input-password v-model="addform.passWord"/>
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
                <a-input v-model="addform.description" type="textarea"/>
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
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
  import editUser from "@/components/user/editUser.vue";

  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 60,
      customRender: (text, record, index) => `${index + 1}` // 显示每一行的序号
    },
    {
      dataIndex: 'userName',
      key: 'userName',
      slots: {
        title: 'userName'
      },
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
    },
    {
      title: '是否可用',
      dataIndex: 'delFlag',
      key: 'delFlag',
      scopedSlots: {
        customRender: 'delFlag'
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      width: "200px",
      scopedSlots: {
        customRender: 'action'
      },
      align: "center"
    },
  ];
  export default {
    inject: ['reload'],
    components: {
      editUser,
    },
    data() {
      return {
        datatable: [],
        columns,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        // pageForm: {
        //   pageNo: 1,
        //   pageSize: 10,
        //   total: 10,
        // },
        labelCol: {span: 6},
        wrapperCol: {span: 16},
        form: {
          pageNo: 1,
          pageSize: 10,
          total: 10,
          userName: '',
          delFlag: 0,
          createTime: null,
        },
        addform: {
          userName: '',
          realName: '',
          delFlag: 0,
          passWord: '',
          createTime: undefined,
          description: '',
        },
        rules: {
          userName: [{required: true, message: '请输入用户名...', trigger: 'blur'}],
          realName: [{required: true, message: '输入真实姓名...', trigger: 'blur'}],
          passWord: [{required: true, message: '输入密码...', trigger: 'blur'}],
          createTime: [{required: true, message: '请选择创建时间...', trigger: 'change'}],
        },
      };
    },
    methods: {
      /*添加用户*/
      onSubmit() {
        this.$refs.addUser.validate(valid => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: '/user/addUser',
              data: this.addform,
            })
              .then(res => {
                if (res.data.code === 200) {
                  this.$message.success("添加成功！");
                  this.findPage();
                } else {
                  this.$message.error("添加失败！");
                }
              })
          } else {
            this.$message.warning('请将表单填写完整!!');
          }
        });
      },
      /*修改日期*/
      onChangeTime(date, dateString) {
        // console.log(date, dateString);
        this.form.createTime = dateString;
      },
      onCreatTime(date, dateString) {
        this.addform.createTime = dateString;
      },
      /*清除查询表单*/
      resetForm() {
        this.$refs.ruleForm.resetFields();
        this.findPage();
      },
      resetFormUser() {
        this.$refs.addUser.resetFields();
      },
      /*打开弹框  编辑*/
      showEdit(value) {
        this.$refs.editUser.showModal(value);
      },
      /* 点击页码*/
      changeCurrent(current, pageSize) {
        this.form.pageNo = current;
        this.form.pageSize = pageSize;
        this.findPage();
      },
      /* 修改每页条数*/
      onShowSizeChange(current, pageSize) {
        this.form.pageNo = current;
        this.form.pageSize = pageSize;
        this.findPage();
      },
      /* 删除方法*/
      confirm(id) {
        this.$axios({
          method: 'delete',
          url: '/user/userDelete/' + id,
        }).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功!');
            this.findPage();
          } else {
            this.$message.error('删除失败!');
          }
        })
      },
      ///取消删除
      cancel() {
        this.$message.warning('明智的选择');
      },
      findPage() {
        this.$axios({
          method: 'post',
          url: '/user/getAllUsers',
          data: this.form,
        }).then(res => {
          this.datatable = res.data.result.list;
          this.form.total = res.data.result.total;
        })
      },
    },
    created() {
      this.findPage();
    }
  };
</script>
