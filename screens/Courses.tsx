import React from "react";
import {
  ActivityIndicator,
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

const CoursesPage: React.FC = () => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    dataStore.setIsFocused(isFocused);
  }, [isFocused]);

  React.useEffect(() => {
    // since the item keys are properly calculated,
    // they will move with animation
    LayoutAnimation.easeInEaseOut();
  }, [dataStore.data]);

  return (
    <View style={styles.container}>
      {dataStore.isLoading && <ActivityIndicator size={"large"} />}
      <FlatList
        key="CoursesFlatList"
        data={dataStore.data?.slice() || []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        // initialNumToRender={500} // for profiling
      />
    </View>
  );
};

const keyExtractor = (item: PoloniexCell) => item.id.toString();
const renderItem: ListRenderItem<PoloniexCell> = (props) => (
  // spread props for proper memoization.
  // only items with changed attributes will re-render.
  <CoursesFlatListCard {...{ ...props.item }} />
);

export default observer(CoursesPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
