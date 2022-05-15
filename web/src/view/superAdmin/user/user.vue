<template>
  <div>
    <avue-crud
      ref="crud"
      :data="tableData"
      :option="columns"
      :page.sync="page"
      @row-save="addUser"
      @row-update="editUser"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template slot="roleId" slot-scope="{row,index}">
        {{ row.roleName.name }}
      </template>
      <template slot="menu" slot-scope="{row,index}">
        <el-button
          type="success"
          icon="el-icon-setting"
          size="small"
          @click="setUserRoles(row)"
        >数据权限</el-button>
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
          @click.stop="delUser(row)"
        >删除</el-button>
      </template>
    </avue-crud>
    <el-dialog
      title="数据权限"
      :visible.sync="setRolesDialog"
      width="40%"
    >
      <el-form :model="role">
        <el-form-item label="角色" label-width="80px" prop="username">
          <el-select v-model="role.roleId" style="width:60%" label="角色" placeholder="请选择" @change="$forceUpdate()">
            <el-option
              v-for="item in selectData"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRolesDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUserRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成
const path = process.env.VUE_APP_BASE_API
import {
  getUserList,
  register,
  deleteUser,
  updateUser,
  setUserRoles
} from '@/api/user'
import { getAllAuthorityList } from '@/api/authority'
import infoList from '@/mixins/infoList'
import { mapGetters } from 'vuex'
export default {
  name: 'Api',
  mixins: [infoList],
  data() {
    return {
      addParams: ['username', 'name', 'password'], // 在表格中已有的字段表单提交不需要的
      editParams: ['_id', 'username', 'name'],
      listApi: getUserList,
      addApi: register,
      editApi: updateUser,
      password: '',
      path: path,
      authOptions: [],
      addUserDialog: false,
      userInfo: {
        username: '',
        password: '',
        name: '',
        headerImg: '',
        authorityId: '',
        authorityIds: []
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, message: '最低5位字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, message: '最低6位字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        authorityId: [
          { required: true, message: '请选择用户角色', trigger: 'blur' }
        ]
      },
      columns: {
        align: 'center',
        menuAlign: 'center',
        menuWidth: 380,
        border: true,
        stripe: true,
        index: true,
        delBtn: false,
        editBtn: false,
        column: [
          {
            label: 'Id',
            prop: 'id',
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: '账号',
            prop: 'username',
            rules: [{
              required: true,
              max: 11,
              min: 11,
              message: '必须是11位哦！',
              trigger: 'blur'
            }]
          },
          {
            label: '昵称',
            prop: 'name',
            rules: [{
              required: true,
              message: '不能为空！',
              trigger: 'blur'
            }]
          },
          {
            label: '第三方账号',
            prop: 'login',
            labelWidth: 100
          },
          {
            label: '角色',
            prop: 'roleId',
            editDisplay: false,
            addDisplay: false,
            formSlot: true
          },
          {
            label: '密码',
            type: 'password',
            prop: 'password',
            editDisplay: false,
            hide: true,
            rules: [{
              required: true,
              min: 6,
              message: '至少6位哦！',
              trigger: 'blur'
            }]
          },
        ]
      },
      user: {},
      role: {},
      selectData: [],
      pageNumber: 1,
      setRolesDialog: false
    }
  },
  computed: {
    ...mapGetters('user', ['token'])
  },
  watch: {
    tableData: {
      handler(newVal, oldVal) {
        newVal.length > 0 && newVal.map(item => {
          item.password = ''
        })
      },
      deep: true
    }
  },
  async mounted() {
    await this.getTableData();
    await this.getRolesList();
  },
  methods: {
    async addUser(form, done) {
      const result = await register(form);
      if (result.status === 200) {
        done(form);
        this.$message.success(result.msg);
      }
    },
    async editUser(form, index, done) {
      const result = await updateUser(form);
      if (result.status === 200) {
        done(form, index);
        this.$message.success(result.msg);
      }
    },
    async getRolesList() {
      const result = await getAllAuthorityList();
      if (result.status === 200) this.selectData = result.result;
    },
    setUserRoles(row) {
      const item = JSON.parse(JSON.stringify(row));
      this.role._id = row._id;
      this.role.roleId = item.roleId;
      this.setRolesDialog = true;
    },
    async saveUserRoles() {
      const result = await setUserRoles(this.role);
      if (result.status === 200) {
        this.$message.success(result.msg);
        this.setRolesDialog = false;
        await this.getTableData()
        this.role = {}
      }
    },
    async delUser(row) {
      const result = await deleteUser({ _id: row._id });
      if (result.status === 200) {
        await this.getTableData();
      }
    }
  }
}
</script>

<style lang="scss">
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}

.user-dialog {
  .header-img-box {
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  border-radius: 20px;
  text-align: center;
  line-height: 200px;
  cursor: pointer;
}
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
