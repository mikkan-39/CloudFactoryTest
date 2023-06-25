import { observable, action, runInAction, makeObservable } from "mobx";
import axios, { AxiosError, AxiosResponse } from "axios";

// minimal substitute for rtk-query, as we are using MobX
// using the same isLoading & isFetching behavior
class DataStore {
  @observable data: null | PoloniexCell[] = null;
  @observable fetchingError: string | null = null;
  @observable isFetching: boolean = false;
  @observable isLoading: boolean = true;
  @observable renderError: string | null = null;
  requestController: AbortController = new AbortController();
  interval = null as NodeJS.Timer | null;

  constructor() {
    makeObservable(this);
  }

  @action
  setIsFocused(isFocused: boolean) {
    if (isFocused) {
      this.requestController = new AbortController();
      this.fetchData();
      this.interval = setInterval(this.fetchData, 5000);
    } else {
      this.fetchingError = null;
      this.requestController?.abort();
      this.interval && clearInterval(this.interval);
    }
  }

  fetchData = () => {
    // this.isFetching &&
    //   this.requestController.abort();

    runInAction(() => {
      this.isFetching = true;
    });
    axios
      .get("https://poloniex.com/public?command=returnTicker", {
        signal: this.requestController.signal,
      })
      .then(this.handleFetchSuccess)
      .catch(this.handleFetchError);
  };

  @action
  handleFetchSuccess = (response: AxiosResponse) => {
    if (response.data.error) throw new AxiosError(response.data.error);

    this.data = Object.entries(response.data).map((el) => ({
      direction: el[0],
      ...(el[1] as PoloniexExchangeDirection),
    })) as PoloniexCell[];
    this.fetchingError = null;
    this.isFetching = false;
    this.isLoading = false;
  };

  @action
  handleFetchError = (error: AxiosError) => {
    // this.data = null // optional
    console.error(error);
    this.fetchingError = error.message;
    this.isFetching = false;
    this.isLoading = false;
  };

  @action
  setRenderError = (err: any) => {
    console.error(err);
    this.renderError = err.message;
  };
}

const dataStore = new DataStore();
export default dataStore;
