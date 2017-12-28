// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';

import TodosList from './components/TodosList';

function App(props: PropsType) {
  return (
    <View style={styles.wrapper}>
      <TodosList
        todos={[
          {
            id: 1,
            text: 'Task A',
          },
          {
            id: 2,
            text: 'Task B',
          },
          {
            id: 3,
            text: 'Task C',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
});

export default App;
