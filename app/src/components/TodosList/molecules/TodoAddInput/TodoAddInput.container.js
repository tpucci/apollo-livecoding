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
