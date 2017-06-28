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
                      }">
      </paginate-links>
    </nav>
    <paginate :name="target"
              :list="contents"
              :per="per"
              tag="table"
              class="table is-striped paginated-table">
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
                      }">
      </paginate-links>
    </nav>
  </div>
</template>

<script>
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
      default: 2,
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

    .pagination-next, .pagination-previous{
      margin-left: 0rem;
      width: auto;
      font-size: 1rem;
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