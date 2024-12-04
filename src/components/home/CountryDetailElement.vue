<template>
  <aside class="country-details">
    <div>
      <button class="close" @click="handleCountryDetailClosure()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="190 -780 580 600"
          width="24px"
          fill="none"
        >
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            fill="#e8eaed"
            stroke="#e8eaed"
          />
        </svg>
      </button>
      <img :src="countryDetail.imageUrl" class="image" alt="" />
      <div class="footer special-footer">
        <img :src="countryDetail.flag" alt="" />
        <div>
          <span>{{ countryDetail.name }}</span>
          <span>{{
            countryDetail && countryDetail.continent
              ? countryDetail.continent.name
              : ""
          }}</span>
        </div>
      </div>
      <ExtraCountryDetailPlaceholder :key="countryDetail.code" v-if="loading" />
      <ExtraCountryDetailError v-else-if="error" />
      <ExtraCountryDetail v-else :countryDetail="countryExtra" />
    </div>
  </aside>
</template>

<script lang="ts">
import { Country, CountryDetail } from "src/types/types";
import Vue from "vue";
import ExtraCountryDetail from "./ExtraCountryDetail.vue";
import ExtraCountryDetailError from "./ExtraCountryDetailError.vue";
import ExtraCountryDetailPlaceholder from "./ExtraCountryDetailPlaceholder.vue";
import { GET_COUNTRY_QUERY } from "src/api/querys";
import { ApolloError, ApolloQueryResult } from "@apollo/client/core";
// interface CountryQueryResult {
//   country: CountryDetail;
// }
export default Vue.extend({
  data() {
    return {
      loading: true,
      error: null as string | null,
      countryExtra: {} as CountryDetail,
    };
  },
  watch: {
    countryDetail: {
      immediate: true,
      handler() {
        this.loading = true;
        this.error = null;
        this.countryExtra = {} as CountryDetail;
        // this.$apollo.queries.country.refetch();
      },
    },
  },
  props: {
    countryDetail: {
      type: Object as () => Country,
      required: true,
    },
    handleCountryDetailClosure: Function,
  },
  apollo: {
    country: {
      query: GET_COUNTRY_QUERY,
      variables() {
        return {
          code: this.countryDetail.code,
        };
      },
      loading() {
        this.loading = true;
      },
      error(err: ApolloError) {
        this.error = err.message;
        this.loading = false;
      },
      result(res: ApolloQueryResult<{ country: CountryDetail }>) {
        this.countryExtra = res.data.country;
        this.loading = false;
      },
    },
  },
  components: {
    ExtraCountryDetail,
    ExtraCountryDetailError,
    ExtraCountryDetailPlaceholder,
  },
});
</script>

<style lang="scss">
.country-details {
  flex: 1;
  overflow: auto;
  max-width: 389.4px;
  // z-index: 1;
  position: fixed;
  color: #000;
  background: var(--main-content-color);
  right: 0;
  display: grid;
  place-items: center;
  top: calc(45px + var(--search-section-height));
  flex-direction: column;
  height: calc(100vh - calc(45px + var(--search-section-height)));
  /* box-sizing: border-box; */
  border-top-left-radius: 10px;
  > div {
    width: 83%;
    height: 98%;
    display: flex;
    flex-direction: column;
    /* gap: 15px; */

    .image {
      width: 100%;
      aspect-ratio: 8/5;
      border-radius: 13px;
      background: var(--placeholder-text);
      margin-top: 15px;
      margin-bottom: 25px;
    }
    > dl {
      margin-left: 0;
      margin-top: 14px;
      > div {
        display: flex;
        color: var(--text-color);
        font-size: 19px;
        margin-bottom: 10px;
        dd.placeholder {
          width: 100%;
          margin-top: 1px;
          height: 17px;
          background: var(--placeholder-text);
          border-radius: 30px;
        }
        &:last-child {
          margin: 0;
          flex-direction: column;
          dd {
            margin-top: 10px;
            margin-left: 0;
            ul {
              margin: 0;
              padding: 4px 5px;
              width: 100%;
              height: 110px;
              overflow-y: auto;
              box-shadow: var(--card-shadow);
              box-sizing: border-box;
            }
          }
          dd.placeholder {
            height: 110px;
            border-radius: 10px;
          }
        }
        dt {
          font-weight: 600;
          color: var(--color);
        }
        dd {
          margin-left: 10px;
        }
      }
    }

    .close {
      all: unset;
      svg {
        position: absolute;
        top: 7px;
        right: 7px;
        width: 18px;
        height: 18px;
        path {
          fill: var(--text-color);
          stroke: var(--text-color);
        }
        &:hover {
          cursor: pointer;
          path {
            stroke-width: 30;
          }
        }
      }
    }
  }
}
</style>
