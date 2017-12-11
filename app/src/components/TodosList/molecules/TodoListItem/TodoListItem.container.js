import { compose, mapProps } from 'recompose';
import { withApollo, graphql } from 'react-apollo';

import fragment from 'fragments/BaseTodo.gql';
import ToggleTodoMutation from './ToggleTodo.mutation.gql';
import TodoListItem from './TodoListItem.component';

export default compose(
  withApollo,
  mapProps(({ client, id }) => ({
    id,
    todo: client.readFragment({
      id,
      fragment,
    }),
  })),
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
          /*update: (proxy, { data: { updateTodo } }) => {
            console.log('updating');
            proxy.writeFragment({
              id,
              fragment,
              data: { ...todo, ...updateTodo },
            });
          },*/
        }),
    }),
  })
)(TodoListItem);
