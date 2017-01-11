import Vue from 'vue';
import 'style/controls/pageBar.less';
/**
 * 使用说明：
 * props:
 * total:总页数
 * current:当前页码,默认1
 * onPageChange:页码改变回调，参数为改变后的页码
 * showPageNum:展示的总页数，默认10
 *
 * **** WARNING:请在onPageChange中修改current的值 ****
 */
export const PageBar = Vue.extend({
  template: `
  <div class="page-bar" v-show="total>1">
    <span class="pre" :class="{ hidden : current==1} " @click="current>1 && onPageChange && onPageChange(current - 1)" >上一页</span>
    <span v-for="page in shownPages" @click="onPageChange && onPageChange(page)" :class="isActive(page)">{{page}}</span>
    <span class="next" :class="{ hidden : current==total }" @click="current<total && onPageChange && onPageChange(current + 1)">下一页</span>
  </div>
  `,
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      default: 1
    },
    onPageChange: {
      type: Function,
      required: true
    },
    showPageNum: {
      type: Number,
      default: 10
    }
  }, //此处current只是为了方便初始化，与后续操作无关
  computed: {
    shownPages() { //这个function有点智障
      let showPageNum = this.showPageNum || 10;
      let ret = [];
      if (this.total < showPageNum) { //不到显示上限
        for (let pageNum = 1; pageNum <= this.total; pageNum++) {
          ret.push(pageNum);
        }
      } else if (this.current < Math.ceil(showPageNum / 2) + 1) { //接近开头，显示最前面几页
        for (let pageNum = 1; pageNum <= showPageNum; pageNum++) {
          ret.push(pageNum);
        }
      } else if (this.current > Math.floor(this.total - (showPageNum / 2) - 1)) { //接近末尾，显示最后几页
        for (let pageNum = this.total - showPageNum + 1; pageNum <= this.total; pageNum++) {
          ret.push(pageNum);
        }
      } else { //显示最近的几页
        for (let pageNum = Math.ceil(this.current - showPageNum / 2), page = 0; page < showPageNum; page++, pageNum++) {
          ret.push(pageNum);
        }
      }
      return ret;
    }
  },
  methods: {
    isActive(page) {
      return {
        'active': page == this.current
      };
    }
  }
});
Vue.component('page-bar', PageBar);