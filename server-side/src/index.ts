import 'reflect-metadata'
import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants"
import microConfig from "./mikro-orm.config"
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from "./resolvers/hello"
import { Post } from "./entities/Post"
import { PostResolver } from "./resolvers/post"
import { UserResolver } from './resolvers/user'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'


const main = async () => {
  const orm = await MikroORM.init(microConfig) // Connect database
  await orm.getMigrator().up() // Run migration 

  const app = express() // create express app

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true
      }),
      secret: 'keyboard cat',
      resave: false,
    })
  )
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: () => ({ em: orm.em })
  })

  apolloServer.applyMiddleware({ app })

  // app.get('/', (_, res) => {
  //   res.send("123")
  // })


  app.listen(4000, () => {
    console.log('server started on localhost: 4000')
  })
  // const post = orm.em.create(Post, {title: 'First post'})
  // await orm.em.persistAndFlush(post)

  // const posts = await orm.em.find(Post, {})
  // console.log(posts)
  await orm.em.find(Post, {})
}

main().catch((err) => {
  console.error(err)
})