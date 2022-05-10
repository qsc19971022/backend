<template>
  <div class="authority">
    <avue-crud
      ref="crud"
      v-model="role"
      :data="tableData"
      :option="columns"
      :page.sync="page"
      @row-save="addRole"
      @row-update="editRole"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template slot="statusForm" slot-scope="scope">
        <avue-select v-model="role.status" :clearable="false" placeholder="请选择内容" type="tree" :dic="selectData" />
      </template>
      <template slot="status" slot-scope="scope">
        <el-switch
          v-model="scope.row.status"
          active-color="#5a9cf8"
          inactive-color="#dddfe5"
          :active-value="true"
          :inactive-value="false"
          @change="updateStatus(scope.row)"
        />
      </template>
      <template slot="menu" slot-scope="{row,index}">
        <el-button
          type="success"
          icon="el-icon-setting"
          size="small"
          @click="openDrawer(row)"
        >设置权限</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          @click.stop="$refs.crud.rowEdit(row,index)"
        >编辑</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click.stop="delAuthority(row,index)"
        >删除</el-button>
      </template>
    </avue-crud>
    <el-drawer v-if="power" :visible.sync="power" title="角色配置">
      <el-tabs :before-leave="autoEnter" class="role-box" type="border-card">
        <el-tab-pane label="角色菜单">
          <Menus ref="menus" :row="activeRow" @ok="ok" />
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成

import {
  getAuthorityList,
  createAuthority,
  updateAuthority,
  delAuthority,
  changeStatus
} from '@/api/authority'
import Menus from '@/view/superAdmin/authority/components/menus'

import infoList from '@/mixins/infoList'
import { mapGetters } from 'vuex';
const dic = [
  {
    label: '启用',
    value: 1
  },
  {
    label: '停用',
    value: 0
  }
];
export default {
  name: 'Authority',
  components: {
    Menus,
  },
  mixins: [infoList],
  data() {
    // 支持1-999的数字
    const reg = /^\+?[1-9]{1}[0-9]{0,2}\d{0,0}$/
    var validateOrder = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error('输入1-999的数字'))
      } else {
        callback()
      }
    };
    return {
      power: false,
      addParams: ['roleName', 'status', 'sort'],
      editParams: ['id', 'roleName', 'status', 'sort'],
      role: {},
      listApi: getAuthorityList,
      delApi: delAuthority,
      drawer: false,
      activeRow: {},
      form: {
        authorityId: '',
        authorityName: '',
        parentId: '0'
      },
      columns: {
        lazy: true,
        menuWidth: 480,
        rowKey: 'id',
        border: true,
        stripe: true,
        index: true,
        delBtn: false,
        editBtn: false,
        searchIndex: 3,
        searchIcon: true,
        searchShowBtn: false,
        searchMenuSpan: 6,
        column: [
          {
            label: '角色名称',
            prop: 'name',
            width: 250,
            rules: [{
              required: true,
              message: '不能为空哦！',
              trigger: 'blur'
            }]
          },
          {
            label: '状态',
            prop: 'status',
            type: 'select',
            dicData: dic,
            slot: true,
            value: true,
            formslot: true
          }
        ]
      },
      selectData: [
        {
          label: '正常',
          value: true
        },
        {
          label: '禁用',
          value: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters('router', ['asyncRouters', 'routerList'])
  },
  async created() {
    await this.getTableData()
  },
  methods: {
    ok() {
      this.power = false;
    },
    autoEnter(activeName, oldActiveName) {
      const paneArr = ['menus', 'apis', 'datas']
      if (oldActiveName) {
        if (this.$refs[paneArr[oldActiveName]].needConfirm) {
          this.$refs[paneArr[oldActiveName]].enterAndNext()
          this.$refs[paneArr[oldActiveName]].needConfirm = false
        }
      }
    },
    openDrawer(row) {
      this.power = true
      this.activeRow = row
    },
    async addRole(form, done) {
      const result = await createAuthority(form);
      if (result.status === 200) {
        done(form);
        await this.getTableData();
        this.$message.success(result.msg);
      }
    },
    async editRole(form, index, done) {
      const result = await updateAuthority(form);
      if (result.status === 200) {
        done(form);
        await this.getTableData();
        this.$message.success(result.msg);
      }
    },
    // 角色状态修改
    async updateStatus(row) {
      const result = await changeStatus(row);
      if (result.status === 200) {
        this.$message.success(result.msg);
      } else {
        row.status = !row.status;
        this.$message.error(result.msg);
      }
    },
    delAuthority(row, index) {
      this.$confirm(`确认删除吗?`, '警告', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'danger'
      }).then(() => {
        delAuthority(row, index);
        this.getTableData();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除操作'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.authority {
  .el-input-number {
    margin-left: 15px;
    span {
      display: none;
    }
  }
  .button-box {
    padding: 10px 20px;
    .el-button {
      float: right;
    }
  }
}
.role-box {
  .el-tabs__content {
    height: calc(100vh - 150px);
    overflow: auto;
  }
}
</style>
