import { observable, action, runInAction, makeObservable } from "mobx";
import axios, { AxiosError } from "axios";

// minimal substitute for rtk-query, as we are using MobX
class DataStore {
  @observable data: any = null;
  @observable error: string | null = null;
  @observable isFetching: boolean = false;
  cancelTokenSource = axios.CancelToken.source();
  interval = null as NodeJS.Timer | null;

  constructor() {
    makeObservable(this);
  }

  @action
  setIsFocused(isFocused: boolean) {
    if (isFocused) {
      console.log("Started polling");
      this.fetchData();
      this.interval = setInterval(this.fetchData, 5000);
    } else {
      console.log("Stopped polling");
      this.error = null;
      this.cancelTokenSource &&
        this.cancelTokenSource.cancel("Fetching stopped");
      this.interval && clearInterval(this.interval);
    }
  }

  fetchData = () => {
    // cancel older requests, optional
    // this.isFetching &&
    //   this.cancelTokenSource.cancel("Cancelling older request");

    console.log("Polling...");

    runInAction(() => {
      this.isFetching = true;
    });

    axios
      .get("https://api.thecatapi.com/v1/images/search?limit=10", {
        cancelToken: this.cancelTokenSource.token,
      })
      .then((response) => {
        runInAction(() => {
          this.data = response.status;
          this.error = null;
          this.isFetching = false;
        });
      })
      .catch((error: AxiosError) => {
        runInAction(() => {
          // this.data = null // optional
          this.error = error.message;
          this.isFetching = false;
        });
      });
  };
}

const dataStore = new DataStore();
export default dataStore;
