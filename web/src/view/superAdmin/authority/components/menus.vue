<template>
  <div>
    <div class="clearflex">
      <el-button class="fl-right" size="small" type="primary" @click="relation">确 定</el-button>
    </div>
    <el-tree
      ref="menuTree"
      :data="menuTreeData"
      :default-checked-keys="menuTreeIds"
      :props="menuDefaultProps"
      default-expand-all
      highlight-current
      check-strictly
      node-key="_id"
      show-checkbox
      @check="nodeChange"
    >
      <span slot-scope="{ node , data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            :style="{color:row.defaultRouter === data.name?'#E6A23C':'#85ce61'}"
            :disabled="!node.checked"
            @click="() => setDefault(data)"
          >
            {{ row.defaultRouter === data.name?"首页":"设为首页" }}
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { getBaseMenuTree, getMenuAuthority, addMenuAuthority } from '@/api/menu'
import {
  updateAuthority
} from '@/api/authority'
export default {
  name: 'Menus',
  props: {
    row: {
      default: function() {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      menuTreeData: [],
      menuTreeIds: [],
      needConfirm: false,
      menuDefaultProps: {
        children: 'children',
        label: function(data) {
          return data.meta.title
        }
      }
    }
  },
  async created() {
    // 获取所有菜单树
    const res = await getBaseMenuTree();
    const info = res.result.reduce((map, node) => {
      return map[node._id] = node, node.children = [], map
    }, {})
    res.result = res.result.filter(node => {
      if (info[node.parentId]) {
        info[node.parentId].children.push(node)
      }
      return !node.parentId
    })
    this.menuTreeData = res.result;

    const res1 = await getMenuAuthority({ _id: this.row._id });
    const menus = res1.result.menus;
    const arr = []
    menus.map(item => {
      // 防止直接选中父级造成全选
      // if (!menus.some(same => same.parentId === item._id)) {
      //   arr.push(item._id)
      // }
      arr.push(item._id);
    });
    this.menuTreeIds = arr;
  },
  methods: {
    async setDefault(data) {
      const res = await updateAuthority({ authorityId: this.row.authorityId, AuthorityName: this.row.authorityName, parentId: this.row.parentId, defaultRouter: data.name })
      if (res.code === 0) {
        this.$message({ type: 'success', message: '设置成功' })
        this.row.defaultRouter = res.data.authority.defaultRouter
      }
    },
    nodeChange() {
      this.needConfirm = true
    },
    // 暴露给外层使用的切换拦截统一方法
    enterAndNext() {
      this.relation()
    },
    // 关联树 确认方法
    async relation() {
      const checkArr = this.$refs.menuTree.getCheckedNodes(false, true);
      const res = await addMenuAuthority({
        menusId: checkArr,
        _id: this.row._id
      })
      if (res.status === 200) {
        this.$message({
          type: 'success',
          message: '菜单设置成功!'
        })
      }
    }
  }
}
</script>
