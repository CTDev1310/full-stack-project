import argon2 from 'argon2'
import { MyContext } from "src/types"
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql"
import { User } from "../entities/User"


@InputType()
class UsernamePassowrdInput {
  @Field()
  username: string

  @Field()
  password: string
}


@ObjectType()
class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}


@ObjectType()
class UserRespone {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}


@Resolver()
export class UserResolver {
  @Mutation(() => UserRespone)
  async register(
    @Arg('options') options: UsernamePassowrdInput,
    @Ctx() { em }: MyContext
  ): Promise<UserRespone> {
    if (options.username.length <= 2) {
      return {
        errors: [{
          field: "username",
          message: "length must be greater than 2"
        }]
      }
    }

    if (options.password.length <= 2) {
      return {
        errors: [{
          field: "password",
          message: "length must be greater than 2"
        }]
      }
    }
    const hashedPassword = await argon2.hash(options.password)
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword
    })
    try {
      await em.persistAndFlush(user)
    } catch (err) {
      if (err.code === '23505') {
        return {
          errors: [{
            field: 'username',
            message: 'User already exists'
          }]
        }
      }
      // console.log("message:  ", err.message)
    }
    return { user }
  }


  @Mutation(() => UserRespone)
  async login(
    @Arg('options') options: UsernamePassowrdInput,
    @Ctx() { em }: MyContext
  ): Promise<UserRespone> {
    const user = await em.findOne(User, {
      username: options.username
    })

    if (!user) {
      return {
        errors: [{
          field: "username",
          message: "that username doesn't exist"
        }]
      }
    }

    const valid = await argon2.verify(user.password, options.password)
    if (!valid) {
      return {
        errors: [{
          field: "password",
          message: "incorrect password"
        }]
      }
    }
    return { user }
  }
}

