import Vue from 'vue'
import App from './App.vue'
import router from "./router.js"
import axios from 'axios'
import AppConfig from "@/assets/config.js"
import qs from 'qs'

import {
  Button,
  Input,
  Table,
  TableColumn,
  Dialog,
  Card,
  Container,
  Icon,
  Select,
  Form,
  Tag,
  Tree,
  Pagination,
  Badge,
  Loading,
  Message,
  MessageBox,
  Menu,
  Tabs,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  Steps,
  Tooltip,
  Popover,
  Collapse,
  FormItem,
  Checkbox,
  Header,
  DropdownMenu,
  DropdownItem,
  Aside,
  Main,
  MenuItem,
  Submenu,
  Option,
  Col,
  Row,
  Upload,
  Radio,
  DatePicker,
  RadioGroup,
  CollapseItem,
  Switch
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Switch);
Vue.use(CollapseItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Row);
Vue.use(Col);
Vue.use(Option);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Header);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Checkbox);
Vue.use(FormItem);
Vue.use(Collapse);
Vue.use(Popover);
Vue.use(Menu);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(Steps);
Vue.use(Tooltip);
Vue.use(Tree);
Vue.use(Pagination);
Vue.use(Badge);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Container);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Form);
Vue.use(Tag);
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$appConfig = AppConfig
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

// 请求携带cookie，保证sessionn 一致性
axios.defaults.withCredentials = true
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
