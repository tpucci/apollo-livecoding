// @flow
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

type PropsType = {
  todo: any,
};

class TodoListItem extends PureComponent<PropsType> {
  render() {
    const { todo } = this.props;
    return (
      <View style={styles.wrapper}>
        <Switch
          style={styles.switch}
          value={todo.complete}
        />
        <Text>{todo.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  switch: {
    marginRight: 16,
  },
});

export default TodoListItem;
