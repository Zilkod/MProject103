/* eslint-disable no-console */
import Vue from "vue";

export default function ({ $axios, store, app, redirect, $config }) {
  app.router.beforeEach((to, from, next) => {
    if (!process.server) {
      // window && window.$nuxt && window.$nuxt.$root.$loading.start();
    }

    console.log(to.name);

    if (from.name) {
      store.state.source &&
        store.state.source.cancel &&
        store.state.source.cancel("Operation canceled by the user.");
    }

    next();
  });

  app.router.afterEach(() => {
    if (!process.server) {
      // window && window.$nuxt && window.$nuxt.$root.$loading.finish();
    }
  });

  // $axios.onRequest(() => {
  //   store.commit("loading", true);
  // });

  $axios.onResponse((response) => {
    //    store.commit("loading", false);

    if (process.server) {
      console.log(
        `[${response && response.status}] ${
          response && response.request && response.request.path
        }`
      );
      console.log(`  `);
    }
    // store.commit("topics/spinner", false);
  });

  $axios.onError((error) => {
    // if ($axios.isCancel(thrown)) {
    //   console.log("Request canceled", thrown.message);
    // } else {
    //   // handle error
    // }

    // // register error in sentry
    if ($config.MODE !== "development") {
      if (error && !error.response) {
        // app.$sentry.captureException(new Error(JSON.stringify(error)));
      }
    }

    if (process.server) {
      console.log(
        `[${error && error.response && error.response.status}] ${
          error &&
          error.response &&
          error.response.request &&
          error.response.request.path
        }`
      );
      console.log(error && error.response && error.response.data);
      console.log(`  `);
    }

    if (error.toString().includes("Error: timeout")) {
      store
        .dispatch(
          "error",
          "Something went wrong, can't process your request right now"
        )
        .then(() => {})
        .catch((e) => {
          return e;
        });
    }

    if (error.toString().includes("Error: Network Error")) {
      store
        .dispatch(
          "error",
          "Looks like you are currently offline. Please try again later."
        )
        .then(() => {})
        .catch((e) => {
          return e;
        });
    }

    if (error && typeof error === "object") {
      if (error.message !== "Operation canceled by the user.") {
        const errorData = JSON.stringify(
          error &&
            error.response &&
            error.response.data &&
            (error.response.data.reason || error.response.data.error)
        );

        console.log(errorData);

        // if (
        //   errorData !== '"Tenant does not exist"' &&
        //   !errorData.includes("about operation")
        // ) {
        // process.client &&
        //   errorData.length > 2 &&
        //   Vue.toasted.show(errorData, {
        //     theme: "bubble",
        //     position: "top-right",
        //     duration: 15000,
        //   });

        // redirect user to login screen if token expired
        const status = error && error.response && error.response.status;

        if (
          status === 401 &&
          (errorData.includes("Token is expired") ||
            errorData.includes("Required authorization token not found"))
        ) {
          if (process.server) {
            store.commit("clearStore");
            store.commit("loading", true);
            app.$cookies.remove("pandio");
            app.$cookies.remove("active_account");
            redirect("/login");
          }
        }
        // }
      }
    } else {
      process.client &&
        Vue.toasted.show(error, {
          theme: "bubble",
          position: "top-right",
          duration: 5000,
        });
    }
  });

  // $axios.onRequestError(() => {
  //   // store.commit("topics/spinner", false);
  // });

  $axios.onResponseError(() => {
    // if ($axios.isCancel(thrown)) {
    //   console.log("Request canceled", thrown.message);
    // } else {
    //   // handle error
    // }
  });

  $axios.interceptors.request.use(
    (request) => {
      // console.log(request);

      const source = Object.assign({}, {}, store.state.source);
      request.cancelToken = source.token;

      return request;
    },
    (error) => {
      // console.log(error);

      return Promise.reject(error);
    }
  );

  // $axios.interceptors.response.use(
  //   (response) => {
  //     // console.log(response);

  //     // Edit response config
  //     return response;
  //   },
  //   (error) => {
  //     // console.log(error);

  //     return Promise.reject(error);
  //   }
  // );
}
