<template>
  <a-card>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="apple" />
          综合展示</span>
        <div>
          <a-row :gutter="[16,16]">
            <a-col :span="16">
              <a-card>

                <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 400 }">
                  <a slot="action" slot-scope="text">action</a>
                </a-table>

              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card>
                <EchartsBar></EchartsBar>


              </a-card>
            </a-col>
          </a-row>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="android" />
          不知道怎么展示</span>
        这是内容
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
  import EchartsBar from '@/components/echarts/echartsBar';
  const columns = [{
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left'
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left'
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150
    },
    {
      title: 'Column 8',
      dataIndex: 'address',
      key: '8'
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      scopedSlots: {
        customRender: 'action'
      },
    },
  ];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  export default {
    components: {
      EchartsBar,
    },
    data() {
      return {
        data,
        columns,
      };
    },
  };
</script>
<style>

</style>
