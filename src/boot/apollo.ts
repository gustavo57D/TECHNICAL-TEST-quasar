import { boot } from "quasar/wrappers";
import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/core";

const httpLink = new HttpLink({
  uri: "https://countries.trevorblades.com",
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default boot(({ app }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
});
