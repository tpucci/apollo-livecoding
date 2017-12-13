// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';

import TodosList from './components/TodosList';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
});

function App() {
  return (
    <View style={styles.wrapper}>
      <TodosList
        todos={[
          {
            id: 1,
            text: 'Buy Cheese',
          },
          {
            id: 2,
            text: 'Buy Potatoes',
          },
          {
            id: 3,
            text: 'Enjoy Raclette',
          },
        ]}
      />
    </View>
  );
}

export default App;
