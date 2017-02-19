import express from 'express';
import expressGraphQL from 'express-graphql';

import graphQLSchema from './server/schema/schema';

const app = express();
const PORT = 4000;

app.use('/graphql', expressGraphQL({
    schema: graphQLSchema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log('listening on port:', PORT);
});

