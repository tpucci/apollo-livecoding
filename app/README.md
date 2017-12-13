# Apollo Live-coding

## 1. Créer le client Apollo

```bash
yarn add react-apollo apollo-client apollo-cache-inmemory apollo-link-http
```

```js
// App.js
const cache = new InMemoryCache();

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
```

## 2. Écrire ma première Query

```gql
# TodosList.query.gql

query TodosList {
  allTodoes {
    id
    text
  }
}
```

## 3. Installer le transformer GQL

```bash
yarn add @bam.tech/react-native-graphql-transformer
```

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve(
      '@bam.tech/react-native-graphql-transformer'
    );
  },
  getSourceExts() {
    return ['gql', 'graphql'];
  },
};
```

## 4. Faire un premier container

```js
// TodosList.container.js
import { graphql } from 'react-apollo';

import TodosListQuery from './TodosList.query.gql';
import TodosList from './TodosList.component';

export default graphql(TodosListQuery, {
  props: ({ data: { allTodoes, loading, error } }) => ({
    loading,
    error,
    todos: allTodoes,
  }),
})(TodosList);
```

## 5. Utiliser une molécule

Dans `TodosList.component`, mettre à jour `renderTodo` avec le todo et la molécule `TodoListItem`.

## 6. Rendre la molécule indépendante avec un container

Dans `TodosList.component`, mettre à jour `renderTodo` avec l'id.

```gql
#import "fragments/BaseTodo.gql"

query TodoListItem($id: ID!) {
  Todo(id: $id) {
    ...BaseTodo
  }
}
```

```gql
fragment BaseTodo on Todo {
  id
  text
  complete
}
```

```js
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import TodoListItemQuery from './TodoListItem.query.gql';
import TodoListItem from './TodoListItem.component';

export default compose(
  graphql(TodoListItemQuery, {
    props: ({ data: { Todo, loading, error } }) => ({
      loading,
      error,
      todo: Todo,
    }),
    options: ({ id }) => ({
      variables: { id },
    }),
  })
)(TodoListItem);
```

## 7. Utiliser le cache !

```js
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

...


      fetchPolicy: 'cache-only',
```

## 8. Faire une mutation && une réponse optimiste!

```js
...
import ToggleTodoMutation from './ToggleTodo.mutation.gql';

export default compose(
  ...
  graphql(ToggleTodoMutation, {
    props: ({ mutate, ownProps: { id, todo } }) => ({
      onCompleteChange: complete =>
        mutate({
          variables: { id, complete },
          optimisticResponse: {
            __typename: 'Mutation',
            updateTodo: {
              __typename: 'Todo',
              id,
              complete,
            },
          },
        }),
    }),
  })  
)(TodoListItem);
```

## 9. Faire une mutation && une réponse optimiste + mettre à jour le cache !

```gql
mutation ToggleTodo($id: ID!, $complete: Boolean!) {
  updateTodo(id: $id, complete: $complete) {
    id
    complete
  }
}

mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    id
  }
}
```

Dans TodosList.component, ajouter la molécule `TodoAddInput`.

```js
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import TodosListQuery from '../../TodosList.query.gql';
import TodoAddInput from './TodoAddInput.component';
import AddTodoMutation from './AddTodo.mutation.gql';

export default compose(
  graphql(AddTodoMutation, {
    props: ({ mutate }) => ({
      addTodo: text =>
        mutate({
          variables: { text },
          update: (store, { data: { createTodo } }) => {
            const data = store.readQuery({
              query: TodosListQuery,
            });
            data.allTodoes.push(createTodo);
            store.writeQuery({
              query: TodosListQuery,
              data,
            });
          },
        }),
    }),
  })
)(TodoAddInput);
```

```gql
#import "fragments/BaseTodo.gql"

mutation AddTodo($text: String) {
  createTodo(text: $text) {
    ...BaseTodo
  }
}
```

lodash
recompose
