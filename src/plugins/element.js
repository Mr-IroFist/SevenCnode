import Vue from "vue";
import {
  Button,
  Dialog,
  Input,
  Select,
  Option,
  Notification,
  Pagination
} from "element-ui";

Vue.use(Button);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination)
Vue.prototype.$notification = Notification;
