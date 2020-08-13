<template>
  <div>
    <a-input-search placeholder="请输入名称......" enter-button v-model="searchInput" @search="onSearch(searchInput)" style="width: 400px;" />
    <a-button type="primary" style="width: 80px;margin-left: 15px;" @click="ResetInput">重置</a-button>
    <a-button type="primary" style="width: 80px; float: right;" @click="showAdd">添加</a-button>
    <edit_consumables ref="addConsumables"></edit_consumables>
    <br />
    <a-table :columns="columns" :data-source="datatable" :pagination="false" rowKey="id">
      <!-- <a slot="assetsName" slot-scope="text">{{ text }}</a> -->
      <span slot="customTitle">资产名称</span>

      <span slot="depreciationRate" slot-scope="depreciationRate">{{depreciationRate}}%</span>
      <!-- 标签状态显示-->
      <span slot="regular_status" slot-scope="regular_status">
        <a-tag :key="regular_status.id" :color="regular_status.id <= 2 ? 'green' : 'red'">
          <a-tooltip>
            <template slot="title">
              <span v-if="regular_status.dateTime !== null">{{ regular_status.dateTime }}</span>
            </template>
            {{ regular_status.name }}
          </a-tooltip>
        </a-tag>
      </span>

      <!-- 操作-->
      <span slot="action" slot-scope="text, record">
        <a-row>
          <a-col :span="12">
            <a-button shape="round" size="small" @click="showEdit(record.id)">
              <a-icon type="edit" theme="filled" />编辑
            </a-button>
            <edit_consumables ref="editConsumables"></edit_consumables>

          </a-col>
          <a-col :span="12">
            <a-popconfirm title="三思你的选择..." ok-text="确认" cancel-text="取消" @confirm="confirm(record.id)" @cancel="cancel">
              <a-button type="danger" shape="round" ghost size="small">
                <a-icon type="delete" />删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </span>
    </a-table>
    <!-- 分页 -->
    <a-pagination v-model="current" :page-size-options="pageSizeOptions" :total="total" show-size-changer :page-size="pageSize"
      @showSizeChange="onShowSizeChange" @change="chageCurrent" style="margin-top: 20px;float: right">
      <template slot="buildOptionText" slot-scope="props">
        <span>{{ props.value }}条/页</span>
      </template>
    </a-pagination>

  </div>

</template>
<script>
  import edit_consumables from "../components/edit/edit_consumables.vue";
  const columns = [{
      title: '序号',
      key: 'id',
      dataIndex: 'id',
    },
    {
      dataIndex: 'assetsName',
      key: 'assetsName',
      slots: {
        title: 'customTitle'
      },
      scopedSlots: {
        customRender: 'assetsName'
      },
    },
    {
      title: '型号',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '价格',
      dataIndex: 'prices',
      key: 'prices',
    },
    {
      title: '入库日期',
      dataIndex: 'storageDate',
      key: 'storageDate',
    },
    {
      title: '领取人',
      dataIndex: 'recipients',
      key: 'recipients',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
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
    components: {
      edit_consumables,
    },
    data() {
      return {
        visible: false,
        searchInput: '',
        datatable: [],
        columns,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 8,
      };
    },
    methods: {
      showEdit(value) {
        this.$refs.editConsumables.showModal(value);
      },
      showAdd() {
        this.$refs.addConsumables.showModal(0);
      },
      /* 点击页码*/
      chageCurrent(current, pageSize) {
        this.current = current;
        this.pageSize = pageSize;
        this.findPage();
        // console.log("change=",current,pageSize)
      },
      /* 修改每页条数*/
      onShowSizeChange(current, pageSize) {
        this.current = current;
        this.pageSize = pageSize;
        this.findPage();
        // console.log("page==",current,pageSize)
      },
      ResetInput() {
        this.searchInput = null;
        this.getUserData();
      },
      onSearch(value) {
        if (value.replace(/(^s*)|(s*$)/g, " ").length == 0) {
          this.$message.error('请输入内容!');
        } else {
          this.$axios({
            method: 'get',
            url: 'http://localhost:8088/consumables/findByName/' + value,
          }).then(res => {
            this.datatable = res.data;
          })

        }

      },
      /* 删除方法*/
      confirm(id) {
        // console.log(e);
        this.$axios({
          url: 'http://localhost:8088/consumables/deleteById/' + id,
          method: 'delete',
        }).then(res => {
          // console.log(res)
          if (res.data) {
            this.$message.success('删除成功!');
            this.getUserData();
          } else {
            this.$message.error('删除失败!');
          }

        })
      },
      cancel() {
        this.$message.warning('明智的选择');
      },
      /* 获取列表*/
      getUserData() {
        this.$axios({
          method: 'get',
          url: '/consumables/getAll',
        }).then(res => {
          this.datatable = res.data;
          // console.log("datatable",this.datatable)
        })
      },
      findPage() {
        this.$axios({
          method: 'get',
          url: '/consumables/findPage/'+this.current+'/'+this.pageSize,
        }).then(res => {
          this.datatable = res.data.list;
          this.total = res.data.total;
          // console.log("datatable",res.data)
        })
      },
    },
    created() {
      // this.getUserData();
      this.findPage();
    }
  };
</script>
