// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { toIdValue } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import TodosList from './components/TodosList';

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  cacheResolvers: {
    Query: {
      Todo: (_, args) =>
        toIdValue(
          cache.config.dataIdFromObject({
            __typename: 'Todo',
            id: args.id,
          })
        ),
    },
  },
});

const link = new HttpLink({
  uri:
    'http://localhost:60000/simple/v1/cjazndqsm000b01395d7v8hwh',
});

const client = new ApolloClient({
  link,
  cache,
});

function App(props: PropsType) {
  return (
    <ApolloProvider client={client}>
      <View style={styles.wrapper}>
        <TodosList />
      </View>
    </ApolloProvider>
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
