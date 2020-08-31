<template>
  <a-row :gutter="16">
    <a-col :span="18">
      <a-card>
        <a-table :columns="columns" :data-source="datatable" :pagination="false" rowKey="id">
          <span slot="roleName">角色名称</span>
          <!-- 标签状态显示-->
          <span slot="delFlag" slot-scope="delFlag, record">
            <a-switch checked-children="禁用" un-checked-children="正常"
                      :default-checked="delFlag === 0 ? false : true" @change="value => ChangeDelFlag(value,record)"/>
          </span>
          <!-- 操作-->
          <span slot="action" slot-scope="text, record">
            <a-row>
              <a-col :span="8">
                <a-button shape="round" size="small" class="e-btn-group" type="primary" @click="showEdit(record)">
                  <a-icon type="edit" theme="filled"/>
                  <edit-roles ref="editRoles"></edit-roles>
                </a-button>
              </a-col>
              <a-col :span="8">
                <a-popconfirm title="三思你的选择..." ok-text="确认" cancel-text="取消" @confirm="confirm(record.id)"
                              @cancel="cancel">
                  <a-button type="danger" class="d-btn-group" shape="round" size="small">
                    <a-icon type="delete"/></a-button>
                </a-popconfirm>
              </a-col>
              <a-col :span="8">

                <a-tooltip placement="top">
                  <template slot="title">
                    <span>分配路由</span>
                  </template>
                  <a-button type="danger" shape="round" class="m-btn-group" size="small" @click="">
                    <a-icon type="setting"/>
                  </a-button>
                </a-tooltip>
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
          <a-tab-pane key="1" tab="查询助手">
            <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="角色名" prop="roleName">
                <a-input v-model="form.roleName"/>
              </a-form-model-item>
              <a-form-model-item label="创建人" prop="createUser">
                <a-input v-model="form.createUser"/>
              </a-form-model-item>
              <a-form-model-item label="是否禁用" prop="delFlag">
                <a-switch v-model="form.delFlag" checked-children="禁用" un-checked-children="正常"
                          :default-checked="form.delFlag"/>
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
          <a-tab-pane key="2" tab="添加角色">
            <a-form-model ref="addRoles" :rules="rules" :model="addForm" :label-col="labelCol"
                          :wrapper-col="wrapperCol">
              <a-form-model-item label="角色名" prop="roleName">
                <a-input v-model="addForm.roleName"/>
              </a-form-model-item>
              <a-form-model-item label="角色编码" prop="roleCode">
                <a-input v-model="addForm.roleCode"/>
              </a-form-model-item>
              <a-form-model-item label="创建人" prop="createUser">
                <a-input v-model="addForm.createUser" disabled/>
              </a-form-model-item>
              <a-form-model-item label="是否禁用" prop="delFlag">
                <a-switch v-model="checkedBt" checked-children="禁用" un-checked-children="正常" :default-checked="false"/>
              </a-form-model-item>
              <a-form-model-item label="创建日期" prop="createTime">
                <a-date-picker
                  v-model="addForm.createTime"
                  placeholder="请选择时间...."
                  style="width: 100%;"
                  @change="onCreatTime"
                />
              </a-form-model-item>
              <a-form-model-item label="描述" prop="description">
                <a-input v-model="addForm.description" type="textarea"/>
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
  import editRoles from "@/components/role/editRoles.vue";

  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 60,
      customRender: (text, record, index) => `${index + 1}` // 显示每一行的序号
    },
    {
      dataIndex: 'roleName',
      key: 'roleName',
      slots: {
        title: 'roleName'
      },
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      key: 'roleCode',
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
      key: 'createUser',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '是否禁用',
      dataIndex: 'delFlag',
      key: 'delFlag',
      scopedSlots: {
        customRender: 'delFlag'
      },
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
      editRoles,
    },
    data() {
      return {
        datatable: [],
        columns,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        labelCol: {span: 6},
        wrapperCol: {span: 16},
        form: {
          pageNo: 1,
          pageSize: 10,
          total: 10,
          roleName: '',
          createUser: '',
          delFlag: false, ///0正常  1禁用
          createTime: null,
        },
        addForm: {
          roleName: '',
          roleCode: '',
          delFlag: 0,  ///0正常  1禁用
          createUser: sessionStorage.getItem("username"),
          createTime: null,
          description: '',
        },
        checkedBt: false,
        rules: {
          roleName: [{required: true, message: '请输入角色名...', trigger: 'blur'}],
          roleCode: [{required: true, message: '输入角色编码...', trigger: 'blur'}],
          createTime: [{required: true, message: '请选择创建时间...', trigger: 'change'}],
        },
      };
    },
    methods: {
      /*添加角色*/
      onSubmit() {
        this.addForm.delFlag = this.checkedBt ? 1 : 0;
        this.$refs.addRoles.validate(valid => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: '/role/addRole',
              data: this.addForm,
            }).then(res => {
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
      ChangeDelFlag(value, record) {
        record.delFlag = value ? 1 : 0;
        this.$axios({
          method: 'put',
          url: '/role/updateById',
          data: record,
        }).then(res => {
          this.$message.success(res.data.message);
        })
      },
      /*修改日期*/
      onChangeTime(date, dateString) {
        this.form.createTime = dateString;
      },
      onCreatTime(date, dateString) {
        this.addForm.createTime = dateString;
      },
      /*清除查询表单*/
      resetForm() {
        this.$refs.ruleForm.resetFields();
        this.findPage();
      },
      resetFormUser() {
        this.$refs.addRoles.resetFields();
      },
      /*打开弹框  编辑*/
      showEdit(value) {
        this.$refs.editRoles.showModal(value);
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
          url: '/role/deleteById/' + id,
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
          url: '/role/getAllRoles',
          data: this.form,
        }).then(res => {
          // console.log(res.data);
          this.datatable = res.data.result.list;
          this.form.total = res.data.result.total;
        })
      },
    }
    ,
    created() {
      this.findPage();
    }
  }
  ;
</script>
<style>
  .e-btn-group {
    background: #40a9ff;
    border: #40a9ff;
  }

  .e-btn-group:active {
    color: white;
    border-radius: 5px;
    background: #4a9bfa;
    /*这里重要，就是通过这个透明度来设置*/
    opacity: 0.5;
  }

  .e-btn-group:hover {
    background: #adc6ff;
  }

  .d-btn-group {
    background: #ff7875;
    border: #ff7875;
  }

  .d-btn-group:hover {
    background: #adc6ff;
  }

  .m-btn-group {
    background: #fa8c16;
    border: #fa8c16;
  }

  .m-btn-group:hover {
    background: #adc6ff;
  }

</style>
