import React from "react";
import {
  FlatList,
  LayoutAnimation,
  ListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import dataStore from "../mobx/DataStore";
import CoursesFlatListCard from "../components/CoursesFlatListCard";
import FlatListLoader from "../components/FlatListLoader";
import FlatListErrorCard from "../components/FlatListErrorCard";
import ErrorBoundary from "../components/ErrorBoundary";

const CoursesPage: React.FC = () => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    dataStore.setIsFocused(isFocused);
  }, [isFocused]);

  React.useEffect(() => {
    // since the item keys are properly calculated,
    // they will move with animation
    LayoutAnimation.easeInEaseOut();
  }, [dataStore.data, dataStore.fetchingError, dataStore.renderError]);

  return (
    <View style={styles.container}>
      <FlatList
        key="CoursesFlatList"
        data={dataStore.data?.slice() || []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={dataStore.isLoading ? <FlatListLoader /> : null}
        ListHeaderComponent={
          dataStore.fetchingError || dataStore.renderError ? (
            <FlatListErrorCard />
          ) : null
        }
        contentContainerStyle={styles.flatListContentContainer}
        // initialNumToRender={100} // for profiling
      />
    </View>
  );
};

export default observer(CoursesPage);

const keyExtractor = (item: PoloniexCell) => item.id.toString();
const renderItem: ListRenderItem<PoloniexCell> = (props) => (
  // spread props for proper memoization.
  // only items with changed attributes will re-render.
  <ErrorBoundary errorCallback={dataStore.setRenderError}>
    <CoursesFlatListCard {...props.item} />
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContentContainer: {
    padding: 16,
  },
});
