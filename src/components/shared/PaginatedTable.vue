<template>
  <div>
    <nav class="pagination is-centered">
      <paginate-links :for="target"
                      :limit="limit"
                      :show-step-links="showLinks"
                      class="pagination-list"
                      :step-links="{
                        next: 'Next',
                        prev: 'Previous'
                      }"
                      :classes="{
                        'li.number > a, li.ellipses > a': 'pagination-link',
                        'li.left-arrow': 'pagination-previous',
                        'li.right-arrow': 'pagination-next'
                      }"
                      @change="pageChanged">
      </paginate-links>
    </nav>
    <paginate :name="target"
              :list="contents"
              :per="per"
              tag="table"
              class="table is-striped paginated-table"
              ref="paginator">
      <slot name="header"></slot>
      <tbody>
        <slot name="row"
              v-for="(item, index) in paginated(target)"
              :item="item">
        </slot>
      </tbody>
    </paginate>
    <nav class="pagination is-centered">
      <paginate-links :for="target"
                      :limit="limit"
                      :show-step-links="showLinks"
                      class="pagination-list"
                      :step-links="{
                        next: 'Next',
                        prev: 'Previous'
                      }"
                      :classes="{
                        'li.number > a, li.ellipses > a': 'pagination-link',
                        'li.left-arrow': 'pagination-previous',
                        'li.right-arrow': 'pagination-next'
                      }"
                      @change="pageChanged">
      </paginate-links>
    </nav>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    target: {
      type: String,
      required: true
    },
    contents: {
      type: Array,
      required: true
    },
    limit: {
      type: Number,
      default: 5
    },
    per: {
      type: Number,
      default: 20,
    },
    showLinks: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      paginate: [this.target]
    };
  },
  methods: {
    pageChanged(toPage) {
      let query = _.clone(this.$route.query);
      query.page = toPage;

      this.$router.replace({
        query: query
      });
    }
  },
  mounted() {
    if (this.$route.query.page) {
      this.$refs.paginator.goToPage(this.$route.query.page);
    }
  }
}
</script>

<style lang="scss">
  table.paginated-table {
    margin-top: 2rem;
    table-layout: fixed;

    .icon {
      font-size: 16px;
    }

    .sorted-column {
      background: #EEE;
    }

    th.sortable:hover {
      background: #EEE;
    }
  }

  .pagination-list {
    li.number {
      background-color: white;
      border-radius: 0px;
      margin-right: 0rem;
      min-width: 0em;
      padding: 0rem;

      a {
        font-size: 1rem;
      }
    }

    .disabled {
      background: #dbdbdb;
      opacity: 0.5;
      pointer-events: none;

      a {
        color: #7a7a7a;
        font-size: 1rem;
      }
    }

    .pagination-next, .pagination-previous {
      width: auto;
      font-size: 1rem;

      .pagination-link {
        border: none;
      }
    }

    .pagination-previous {
      order: 0 !important;
    }

    li.active {
      a {
        font-size: 1rem;
        background-color: #00d1b2;
        border-color: #00d1b2;
        color: white;
      }
    }
  }
</style>