import Vue from 'vue'
import App from './App.vue'
import router from "./router.js"
import AppConfig from "@/assets/config.js"
import qs from 'qs'
import {post, get} from "@/utils/axios-api.js"

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
Vue.prototype.$message = Message;
Vue.prototype.$appConfig = AppConfig
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$qs = qs

Vue.config.productionTip = false

// 前置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/') {   // 访问登录页，直接放行
      next();
  } else {
      // 当前用户是否已经认证，如果认证了初始化菜单,否则跳转到登陆页，并记录重定向参数
      if (window.sessionStorage.getItem("user")) { 
          next();
      } else {
          next('/?redirect=' + to.path);
      }
  }
})

export default new Vue({
  render: h => h(App),
  router
}).$mount('#app')
