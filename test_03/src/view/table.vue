<template>
  <div>
    <!-- 上传 -->
    <div class="clearfix">
      <a-upload action="http://localhost:8088/files/fileUpload" list-type="picture-card" :file-list="fileList"
        @preview="handlePreview" @change="handleChange">
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
    <br />

<!-- 表格 -->
    <a-table :columns="columns" :data-source="datatable" :pagination="false">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle">姓名</span>
      <span slot="compere" slot-scope="compere">
        <a-tag :key="compere" :color="compere.length <= 2 ? 'geekblue' : 'green'">
          {{ compere.toUpperCase() }}
        </a-tag>
      </span>

     <span slot="image" slot-scope="image">
       <a-popover>
         <template slot="content">
           <a-avatar shape="square" :size="110" :src="image" />
         </template>
         <a-avatar :size="55" :src="image" />
       </a-popover>
     </span>


      <!-- 操作-->
      <span slot="action" slot-scope="text, record">
        <a-row>
          <a-col :span="12">
            <edit_user :editUserId="record"></edit_user>
          </a-col>
          <a-col :span="12">
            <a-popconfirm title="三思你的选择..." ok-text="确认" cancel-text="取消" @confirm="confirm(record)" @cancel="cancel">
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
  </div>
</template>
<script>
  import edit_user from "../components/edit/edit_user";
  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      slots: {
        title: 'customTitle'
      },
      scopedSlots: {
        customRender: 'name'
      },
    },
    {
      title: '头像',
      dataIndex: 'image',
      key: 'image',
      scopedSlots: {
        customRender: 'image'
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '描述',
      dataIndex: 'content',
      key: '描述',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: '性别',
    },
    {
      title: '日期',
      dataIndex: 'time',
      key: '日期',
    },
    {
      title: '领导',
      key: 'compere',
      dataIndex: 'compere',
      scopedSlots: {
        customRender: 'compere'
      },
    },
    {
      title: '操作',
      key: 'action',
      width: "200px",
      scopedSlots: {
        customRender: 'action'
      },
      align: "center"
    },
  ];
  export default {
    components: {
      edit_user,
    },
    data() {
      return {
        datatable: [],
        columns,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 20,
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: '1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }
        ],
      };
    },
    methods: {
      handleCancel() {
        this.previewVisible = false;
      },
      async handlePreview(file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      },
      handleChange({
        fileList
      }) {
        this.fileList = fileList;
      },
      /* 点击页码*/
      chageCurrent(current, pageSize) {
        console.log("change=", current, pageSize)
      },
      /* 修改每页条数*/
      onShowSizeChange(current, pageSize) {
        this.pageSize = pageSize;
        console.log("page==", current, pageSize)
      },
      confirm(e) {
        console.log(e);
        this.$message.success('删除成功!');
      },
      cancel() {
        // console.log(e);
        this.$message.warning('明智的选择');
      },
      /* 获取列表接口*/
      getUserData() {
        this.$axios({
          method: 'get',
          url: 'http://rest.apizza.net/mock/adea43a54005c86cd83bf19b1432c015/gd/v1/b/user/all_user',

        }).then(res => {
          // console.log(res.data.list);
          this.datatable = res.data.list
        })
      }
    },
    created() {
      this.getUserData();
    }
  };
</script>
