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
    <slot name="pagination-contents">
      <paginate :name="target"
                :list="contents"
                :per="per"
                ref="paginator">
        <slot name="heading"></slot>
        <slot name="row"
              v-for="(item, index) in paginated(target)"
              :item="item">
        </slot>
      </paginate>
    </slot>
    <nav class="pagination is-centered pagination-footer">
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
  data () {
    return {
      paginate: [this.target]
    };
  },
  methods: {
    pageChanged (toPage) {
      let query = _.clone(this.$route.query);
      query.page = toPage;

      this.$router.replace({
        query: query
      });
    }
  },
  mounted () {
    if (this.$route.query.page) {
      this.$refs.paginator.goToPage(this.$route.query.page);
    }
  }
}
</script>

<style lang="scss">
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

  .pagination-next,
  .pagination-previous {
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

.pagination-footer {
  padding-top: 2rem;
}
</style>
