/*
*
* 按需加载element
*
*
* */

import Vue from 'vue'
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
//  按需引入element
import {
  Empty,
  Button,
  Select,
  Dialog,
  Form,
  Input,
  FormItem,
  Option,
  Loading,
  Message,
  Container,
  Card,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  Aside,
  Main,
  Badge,
  Header,
  Tabs,
  Breadcrumb,
  BreadcrumbItem,
  Scrollbar,
  Avatar,
  TabPane,
  Divider,
  Table,
  TableColumn,
  Cascader,
  Checkbox,
  CheckboxGroup,
  Pagination,
  Tag,
  Drawer,
  Tree,
  Popover,
  Switch,
  Collapse,
  CollapseItem,
  Tooltip,
  DatePicker,
  InputNumber,
  Steps,
  Upload,
  Progress,
  MessageBox,
  Image,
  ColorPicker,
  InfiniteScroll
} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(Container)
Vue.use(Card)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Badge)
Vue.use(Header)
Vue.use(Tabs)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Avatar)
Vue.use(TabPane)
Vue.use(Divider)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Checkbox)
Vue.use(Cascader)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Drawer)
Vue.use(Tree)
Vue.use(CheckboxGroup)
Vue.use(Popover)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Tooltip)
Vue.use(DatePicker)
Vue.use(Steps)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Empty)
Vue.use(Scrollbar)
Vue.use(Loading.directive)
Vue.use(Image)
Vue.use(ColorPicker)
Vue.use(InfiniteScroll)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Dialog.props.closeOnClickModal.default = false
Vue.component(CollapseTransition.name, CollapseTransition)
