import { compose, mapProps } from 'recompose';
import { withApollo } from 'react-apollo';

import fragment from 'fragments/BaseTodo.gql';
import TodoListItem from './TodoListItem.component';

export default compose(
  withApollo,
  mapProps(({ client, id }) => {
    //eslint-disable-next-line
    debugger;
    return {
      todo: client.readFragment({ id, fragment }),
    };
  })
)(TodoListItem);
