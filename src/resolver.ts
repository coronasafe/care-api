// import { pubsub } from './helpers';
import * as pg from 'pg';

const CareApi_UPDATE = "CareApi_UPDATE";

export const CareApiResolver = {
  // Subscription: {
  //   // subscriptions
  //   updatedCareApiData: {
  //     subscribe: () => pubsub.asyncIterator(CareApi_UPDATE)
  //   },
  // },
  Query: {
    // queries
    list(root: any, args: any, ctx: any) {
      console.log(process.env.DB_PASSWORD);
      const Client = new pg.Client("postgres://" + "postgres" +
        ":" + "postgres" + "@" + "localhost:5433" + "/" + "test");
      Client.connect();
      return Client.query(`SELECT *	FROM test_schema.graphqltest;`)
        .then(res => {
          Client.end();
          return res.rows;
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
    get(root: any, args: any, ctx: any) {
      // fetch the id from args.id
      return {message: 'GET by ID API for CareApi microservice'};
    }
  },
  Mutation: {
    // mutations
    create(root: any, args: any, ctx: any) {
      return {message: 'POST API for CareApi microservice'};
    },
    update(root: any, args: any, ctx: any) {
      /* Optional: if you want to send graphql subscription updates when this query is called) */
      // pubsub.publish(CareApi_UPDATE, data);
      return {message: 'PUT API for CareApi microservice'};
    },
    delete(root: any, args: any, ctx: any) {
      return {message: 'DELETE API for CareApi microservice'};
    },

  }
}
