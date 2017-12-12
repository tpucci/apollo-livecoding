// @flow
import React, { Component } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

type PropsType = {
  addTodo: (text: string) => void,
};

type StateType = {
  value: string,
  disable: boolean,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 48,
  },
  disabledInput: {
    color: '#ddd',
  },
});

class TodoAddInput extends Component<PropsType, StateType> {
  state = {
    value: '',
    disable: false,
  };

  handleValueChange = value => {
    if (!this.state.disable) this.setState({ value });
  };
  handleOnSubmit = () => {
    if (this.state.value) {
      this.setState({ disable: true });
      this.props
        .addTodo(this.state.value)
        .then(() =>
          this.setState({ disable: false, value: '' })
        );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="What do you need to do ?"
          onSubmitEditing={this.handleOnSubmit}
          blurOnSubmit={false}
          returnKeyType="done"
          onChangeText={this.handleValueChange}
          value={this.state.value}
          style={[
            styles.input,
            this.state.disable && styles.disabledInput,
          ]}
        />
      </View>
    );
  }
}

export default TodoAddInput;
