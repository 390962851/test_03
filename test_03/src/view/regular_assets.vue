<template>
  <div>
    <a-card>
    <span style="font-family: 宋体;font-size: 15px;">请输入:</span>
    <a-input-search placeholder="请输入名称......" enter-button v-model="searchInput" @search="onSearch(searchInput)" style="width: 400px;" />
    <a-button type="primary" style="width: 80px;margin-left: 15px;" @click="ResetInput">重置</a-button>
    <a-button type="primary" style="width: 80px; float: right;" @click="showModal">添加</a-button>
       <add_regularAssets ref="addModel"></add_regularAssets>
    <br />
    <a-table :columns="columns" :data-source="datatable" :pagination="false" rowKey="id" :scroll="{ x: 2000 }">
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
            <edit_regularAssets :editUserId="record.id"></edit_regularAssets>
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
        <!-- <span v-if="props.value === '50'">全部</span> -->
      </template>
    </a-pagination>
    </a-card>
  </div>

</template>
<script>
  import edit_regularAssets from "../components/edit/edit_regularAssets";
  import add_regularAssets from "../components/edit/add_regularAssets"
  const columns = [
    // {
    //   title:'序号',
    //   key:'id',
    //   dataIndex:'id',
    // },
    {
      dataIndex: 'assetsName',
      key: 'assetsName',
      fixed: 'left',
      slots: {
        title: 'customTitle'
      },
      scopedSlots: {
        customRender: 'assetsName'
      },
    },
    {
      title: '资产类别',
      key: 'assetsType',
      dataIndex: 'assetsType',
      width: 100,
    },
    {
      title: '型号',
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
      width: 100,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 90,
    },
    {
      title: '入库日期',
      dataIndex: 'storageDate',
      key: 'storageDate',
      width: 130,
    },
    {
      title: '领取人',
      dataIndex: 'recipients',
      key: 'recipients',
      width: 90,
    },
    {
      title: '资产原值',
      dataIndex: 'assetsValue',
      key: 'assetsValue',
      width: 110,
    },
    {
      title: '折旧率',
      dataIndex: 'depreciationRate',
      key: 'depreciationRate',
      width: 90,
      scopedSlots: {
        customRender: 'depreciationRate'
      },
    },
    {
      title: '折旧年限',
      dataIndex: 'depreciationPeriod',
      key: 'depreciationPeriod',
      width: 90,
    },
    {
      title: '已折旧日期',
      dataIndex: 'depreciatedDate',
      key: 'depreciatedDate',
      // width: '2%',
      width: 110,
    },
    {
      title: '本月折旧',
      dataIndex: 'depreciationMonth',
      key: 'depreciationMonth',
      width: 100,
    },
    {
      title: '累计折旧',
      dataIndex: 'depreciationAcc',
      key: 'depreciationAcc',
      width: 110,
    },
    {
      title: '资产净值',
      dataIndex: 'assetNetValue',
      key: 'assetNetValue',
      width: 110,
    },
    {
      title: '存放地点',
      dataIndex: 'storageLoca',
      key: 'storageLsoca',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'regular_status',
      key: 'regular_status',
      width: 80,
      scopedSlots: {
          customRender: 'regular_status'
        },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 150,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      scopedSlots: {
        customRender: 'action'
      },
      align: "center",
    },
  ];
  export default {
    components: {
      edit_regularAssets,
      add_regularAssets,
    },
    data() {
      return {
        visible:false,
        searchInput: '',
        datatable: [],
        columns,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 20,
      };
    },
    methods: {
      showModal(){
        // this.visible = true;
        this.$refs.addModel.showModal();
      },
      /* 点击页码*/
      chageCurrent(current, pageSize) {
        this.current = current;
        this.pageSize = pageSize;
        this.getUserData();
        // console.log("change=",current,pageSize)
      },
      /* 修改每页条数*/
      onShowSizeChange(current, pageSize) {
        this.current = current;
        this.pageSize = pageSize;
        this.getUserData();
        // console.log("pageSize==",current,pageSize)
      },
      ResetInput(){
        this.searchInput = null;
        this.getUserData();
      },
      onSearch(value){
        this.$axios({
          method: 'get',
          url: 'http://localhost:8088/assets/findByName/' + value,
        }).then(res => {
          this.datatable = res.data;
        })
      },
      /* 删除方法*/
      confirm(id) {
        // console.log(e);
        this.$axios({
          url: 'http://localhost:8088/assets/deleteById/'+id,
          method: 'delete',
        }).then(res => {
          // console.log(res)
          if(res.data){
            this.$message.success('删除成功!');
            this.getUserData();
          }else{
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
          url: 'http://localhost:8088/assets/selAll/'+this.current+'/'+this.pageSize,
        }).then(res => {
          this.datatable = res.data.list;
          this.total = res.data.count;
          // console.log("datatable",this.datatable)
        })
      },
    },
    created() {
      this.getUserData();
    }
  };
</script>
