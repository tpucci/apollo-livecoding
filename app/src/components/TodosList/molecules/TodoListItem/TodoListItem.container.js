import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { remove } from 'lodash';

import TodosListQuery from '../../TodosList.query.gql';
import TodoListItemQuery from './TodoListItem.query.gql';
import ToggleTodoMutation from './ToggleTodo.mutation.gql';
import DeleteTodoMutation from './DeleteTodo.mutation.gql';
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
      fetchPolicy: 'cache-only',
    }),
  }),
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
  }),
  graphql(DeleteTodoMutation, {
    props: ({ mutate, ownProps: { id } }) => ({
      deleteTodo: () =>
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteTodo: {
              __typename: 'Todo',
              id,
            },
          },
          update: (store, { data: { deleteTodo } }) => {
            const data = store.readQuery({
              query: TodosListQuery,
            });
            remove(data.allTodoes, todo => todo.id === id);
            store.writeQuery({
              query: TodosListQuery,
              data,
            });
          },
        }),
    }),
  })
)(TodoListItem);
