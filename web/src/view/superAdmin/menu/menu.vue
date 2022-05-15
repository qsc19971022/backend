<template>
  <div>
    <avue-crud
      ref="crud"
      v-model="menu"
      :data="tableData"
      :before-open="beforeOpen"
      :before-close="beforeClose"
      :option="columns"
      row-key="_id"
      @refresh-change="beforeClose"
      @row-save="addData"
      @row-update="(form, index, done,loading) => {editData(form, done, loading)}"
    >
      <template slot="iconForm" slot-scope="scope">
        <icon :meta.sync="menu" size="small">
          <template slot="prepend">el-icon-</template>
        </icon>
      </template>
      <template slot="parentIdForm" slot-scope="scope">
        {{ menu.parentId ? findParent(menu.parentId) : '无' }}
      </template>
      <template slot="hiddenForm" slot-scope="scope">
        <el-select v-model="menu.hidden" placeholder="请选择" @change="$forceUpdate()">
          <el-option
            v-for="item in selectData"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template slot="keepAliveForm" slot-scope="scope">
        <el-select v-model="menu.keepAlive" placeholder="请选择" @change="$forceUpdate()">
          <el-option
            v-for="item in selectData"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template slot="title" slot-scope="scope">
        {{ scope.row.meta.title }}
      </template>
      <template slot="type" slot-scope="scope">
        {{ scope.row.type ? scope.row.type === 1 ? '菜单' : '按钮' : '目录' }}
      </template>
      <template slot="icon" slot-scope="scope">
        <i :class="scope.row.meta.icon ? 'el-icon-' + scope.row.meta.icon : ''" />
      </template>
      <template slot="hidden" slot-scope="scope">
        {{ scope.row ? scope.row.hidden ? '是' : '否' : '否' }}
      </template>
      <template slot="parentId" slot-scope="scope">
        {{ findParent(scope.row.parentId) }}
      </template>
      <template slot="keepAlive" slot-scope="scope">
        {{ scope.row.meta ? scope.row.meta.keepAlive ? '是' : '否' : '否' }}
      </template>
      <template slot="menu" slot-scope="{row,index}">
        <el-button
          type="success"
          icon="el-icon-setting"
          size="small"
          @click="addChildMenu(row)"
        >新增子菜单</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          @click.stop="$refs.crud.rowEdit(row,index)"
        >编辑</el-button>
        <el-button
          v-auth="'delMenu'"
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click.stop="deleteMenu(row)"
        >删除</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成

import {
  updateBaseMenu,
  getMenuList,
  addBaseMenu, deleteBaseMenu,
} from '@/api/menu'
import infoList from '@/mixins/infoList'
import icon from '@/view/superAdmin/menu/icon'
const dic = [
  { label: '目录', value: 0 },
  { label: '菜单', value: 1 },
  { label: '按钮', value: 2 }
];
export default {
  name: 'Menus',
  components: {
    icon
  },
  mixins: [infoList],
  data() {
    return {
      addParams: ['component', 'menuName', 'icon', 'componentName', 'path', 'sort', 'parentId'],
      editParams: ['component', 'menuName', 'icon', 'componentName', 'path', 'sort', 'parentId', 'id'],
      listApi: getMenuList,
      columns: {
        align: 'center',
        menuAlign: 'center',
        dialogDirection: 'rtl',
        dialogType: 'drawer',
        menuWidth: 320,
        fixed: true,
        rowKey: '_id',
        border: true,
        stripe: true,
        index: true,
        delBtn: false,
        editBtn: false,
        defaultExpandAll: true,
        column: [
          {
            label: '展示名称',
            prop: 'title',
            width: 220
          },
          {
            label: '类型',
            prop: 'type',
            type: 'select',
            dicData: dic,
            width: 100,
            control:(val,form)=>{
              if(val === 2){
                return {
                  component:{
                    display:false
                  },
                  path: {
                    display: false
                  },
                  hidden: {
                    display: false
                  },
                  name: {
                    display: false
                  },
                  icon: {
                    display: false
                  },
                  sort: {
                    display: false
                  },
                  keepAlive: {
                    display: false
                  },
                  perms: {
                    display: true
                  }
                }
              }else{
                return {
                  component:{
                    display: true
                  },
                  path: {
                    display: true
                  },
                  hidden: {
                    display: true
                  },
                  name: {
                    display: true
                  },
                  icon: {
                    display: true
                  },
                  sort: {
                    display: true
                  },
                  keepAlive: {
                    display: true
                  },
                  perms: {
                    display: false
                  }
                }
              }
            },
          },
          {
            label: '路径',
            prop: 'path',
            width: 120
          },
          {
            label: '是否隐藏',
            prop: 'hidden',
            formSlot: true,
            slot: true,
            width: 100
          },
          {
            label: '文件路径',
            prop: 'component',
            width: 300
          },
          {
            label: '路由名称',
            prop: 'name',
            width: 120
          },
          {
            label: '上级菜单',
            prop: 'parentId',
            width: 120
          },
          {
            label: '图标',
            prop: 'icon',
            formSlot: true,
            slot: true,
            width: 80
          },
          {
            label: '序号',
            prop: 'sort',
            width: 80
          },
          {
            label: 'keepAlive',
            prop: 'keepAlive',
            formSlot: true,
            width: 120,
            slot: true
          },
          {
            label: '权限标识',
            prop: 'perms',
            width: 150
          }
        ]
      },
      menuList: [],
      selectData: [
        { label: '是', value: true, key: 1 },
        { label: '否', value: false, key: 2 }
      ],
      menu: {
        title: '',
        icon: '',
        hidden: false,
        keepAlive: false,
        type: 1
      }
    }
  },
  async created() {
    await this.getTableData();
    this.menuList = JSON.parse(JSON.stringify(this.tableData));
    this.tableDataDeal();
  },
  methods: {
    tableDataDeal() {
      const info = this.tableData.reduce((map, node) => {
        return map[node._id] = node, node.children = [], map
      }, {})
      this.tableData = this.tableData.filter(node => {
        if (info[node.parentId]) {
          info[node.parentId].children.push(node)
        }
        return !node.parentId
      })
    },
    async addData(form, done, loading) {
      form.meta = {
        title: form.title,
        icon: form.icon,
        keepAlive: form.keepAlive,
      }
      if (!form.parentId) delete form.parentId;
      const data = await addBaseMenu(form);
      if (data.status === 200) {
        this.$message.success(data.msg);
        await this.getTableData();
        this.tableDataDeal();
        done();
      }
    },
    async editData(form, done, loading) {
      form.meta = {
        title: form.title,
        icon: form.icon,
        keepAlive: form.keepAlive,
      }
      if (!form.parentId) delete form.parentId;
      const data = await updateBaseMenu(form);
      if (data.status === 200) {
        this.$message.success(data.msg);
        await this.getTableData();
        this.tableDataDeal();
        done(form);
      }
    },
    beforeOpen(done, type) {
      done()
      if (type !== 'edit') Object.assign(this.$data.menu, this.$options.data.call(this).menu);
      else {
        this.menu.title = this.menu.meta.title;
        this.menu.icon = this.menu.meta.icon;
        this.menu.keepAlive = this.menu.meta.keepAlive;
      }
    },
    async deleteMenu(row) {
      const data = await deleteBaseMenu({ _id: row._id });
      if (data.status === 200) {
        this.$message.success(data.msg);
        await this.getTableData();
        this.tableDataDeal();
      }
    },
    addChildMenu(row) {
      this.menu.parentId = row._id;
      this.$refs.crud.rowAdd();
    },
    async beforeClose(done) {
      await this.getTableData();
      this.tableDataDeal();
      done();
    },
    findParent(id) {
      let result = '';
      this.menuList.map(item => {
        if (!id) result = '无';
        if (item._id === id) result = item.meta.title;
      })
      return result;
    }
  }
}
</script>

<style scoped lang="scss">
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}
.warning {
  color: #dc143c;
}
</style>
