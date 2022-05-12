import { getDict } from '@/utils/dictionary'
export default {
  data() {
    return {
      tableData: [],
      searchInfo: {},
      page: {
        currentPage: 1,
        total: 10,
        pageSize: 10,
        pageCount: 10,
        layout: 'total,pager,prev, next',
        background: false
      }
    }
  },
  methods: {
    filterDict(value, type) {
      const rowLabel = this[type + 'Options'] && this[type + 'Options'].filter(item => item.value === value)
      return rowLabel && rowLabel[0] && rowLabel[0].label
    },
    async getDict(type) {
      const dicts = await getDict(type)
      this[type + 'Options'] = dicts
      return dicts
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getTableData()
    },
    async getTableData(page = this.page.currentPage, limit = this.page.pageSize) {
      const table = await this.listApi({ page, limit, ...this.searchInfo })
      if (table.status === 200) {
        if (table.result.data) {
          this.tableData = table.result.data;
          this.page.currentPage = table.result.currentPage;
          this.page.total = table.result.total;
          this.page.currentPage = table.result.currentPage;
        } else {
          this.tableData = table.result
        }
      }
    },
    async rowSave(form, done, loading, params) {
      const config = {}
      params.map(item => {
        config[item] = form[item]
      })
      const result = await this.addApi(config);
      if (result.status === 200) {
        this.$message.success(result.msg);
        done(form);
      }
    },
    async rowUpdate(form, done, index, params) {
      const config = {}
      params.map(item => {
        config[item] = form[item]
      })
      const result = await this.editApi(config)
      if (result.status === 200) {
        this.$message.success(result.msg);
        done(form);
      }
    },
    async searchList(params, done) {
      console.log(params);
      done();
      // const result = await this.searchApi(params);
      // if (result.code === 0){
      //   this.$message.success(result.message);
      //   done();
      // }
    }
  }
}
