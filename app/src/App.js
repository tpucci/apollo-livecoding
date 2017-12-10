// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
});

const link = new HttpLink({ uri: 'http://localhost:60000/simple/v1/cjazndqsm000b01395d7v8hwh' });

const client = new ApolloClient({
  link,
  cache,
});

function App(props: PropsType) {
  return (
    <ApolloProvider client={client}>
      <View style={styles.wrapper}>
        <Text>Apollo is initialised</Text>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
