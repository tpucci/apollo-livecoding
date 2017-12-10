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
