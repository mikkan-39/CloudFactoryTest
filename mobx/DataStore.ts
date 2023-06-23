import { observable, action, runInAction, makeObservable } from "mobx";
import axios, { AxiosError } from "axios";

// minimal substitute for rtk-query, as we are using MobX
// using the same isLoading & isFetching behavior
class DataStore {
  @observable data: null | PoloniexCell[] = null;
  @observable error: string | null = null;
  @observable isFetching: boolean = false;
  @observable isLoading: boolean = true;

  cancelTokenSource = axios.CancelToken.source();
  interval = null as NodeJS.Timer | null;

  constructor() {
    makeObservable(this);
  }

  @action
  setIsFocused(isFocused: boolean) {
    if (isFocused) {
      // console.log("DataStore.tsx:\tStarted polling");
      this.fetchData();
      this.interval = setInterval(this.fetchData, 5000);
    } else {
      // console.log("DataStore.tsx:\tStopped polling");
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

    // console.log("DataStore.tsx:\tPolling...");

    runInAction(() => {
      this.isFetching = true;
    });

    axios
      .get("https://poloniex.com/public?command=returnTicker", {
        cancelToken: this.cancelTokenSource.token,
      })
      .then((response) => {
        runInAction(() => {
          this.data = Object.entries(response.data).map((el) => ({
            direction: el[0],
            ...(el[1] as PoloniexExchangeDirection),
          })) as PoloniexCell[];
          this.error = null;
          this.isFetching = false;
          this.isLoading = false;
        });
      })
      .catch((error: AxiosError) => {
        runInAction(() => {
          // this.data = null // optional
          this.error = error.message;
          this.isFetching = false;
          this.isLoading = false;
        });
      });
  };
}

const dataStore = new DataStore();
export default dataStore;
