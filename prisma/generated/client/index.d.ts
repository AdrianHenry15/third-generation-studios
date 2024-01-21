
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model WebsiteProject
 * 
 */
export type WebsiteProject = $Result.DefaultSelection<Prisma.$WebsiteProjectPayload>
/**
 * Model WebsiteProjectComment
 * 
 */
export type WebsiteProjectComment = $Result.DefaultSelection<Prisma.$WebsiteProjectCommentPayload>
/**
 * Model Song
 * 
 */
export type Song = $Result.DefaultSelection<Prisma.$SongPayload>
/**
 * Model SongComment
 * 
 */
export type SongComment = $Result.DefaultSelection<Prisma.$SongCommentPayload>
/**
 * Model UserLikedSong
 * 
 */
export type UserLikedSong = $Result.DefaultSelection<Prisma.$UserLikedSongPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserLikedWebsite
 * 
 */
export type UserLikedWebsite = $Result.DefaultSelection<Prisma.$UserLikedWebsitePayload>
/**
 * Model Artist
 * 
 */
export type Artist = $Result.DefaultSelection<Prisma.$ArtistPayload>
/**
 * Model ArtistComment
 * 
 */
export type ArtistComment = $Result.DefaultSelection<Prisma.$ArtistCommentPayload>
/**
 * Model UserLikedArtist
 * 
 */
export type UserLikedArtist = $Result.DefaultSelection<Prisma.$UserLikedArtistPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more WebsiteProjects
 * const websiteProjects = await prisma.websiteProject.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more WebsiteProjects
   * const websiteProjects = await prisma.websiteProject.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.websiteProject`: Exposes CRUD operations for the **WebsiteProject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebsiteProjects
    * const websiteProjects = await prisma.websiteProject.findMany()
    * ```
    */
  get websiteProject(): Prisma.WebsiteProjectDelegate<ExtArgs>;

  /**
   * `prisma.websiteProjectComment`: Exposes CRUD operations for the **WebsiteProjectComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebsiteProjectComments
    * const websiteProjectComments = await prisma.websiteProjectComment.findMany()
    * ```
    */
  get websiteProjectComment(): Prisma.WebsiteProjectCommentDelegate<ExtArgs>;

  /**
   * `prisma.song`: Exposes CRUD operations for the **Song** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Songs
    * const songs = await prisma.song.findMany()
    * ```
    */
  get song(): Prisma.SongDelegate<ExtArgs>;

  /**
   * `prisma.songComment`: Exposes CRUD operations for the **SongComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SongComments
    * const songComments = await prisma.songComment.findMany()
    * ```
    */
  get songComment(): Prisma.SongCommentDelegate<ExtArgs>;

  /**
   * `prisma.userLikedSong`: Exposes CRUD operations for the **UserLikedSong** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserLikedSongs
    * const userLikedSongs = await prisma.userLikedSong.findMany()
    * ```
    */
  get userLikedSong(): Prisma.UserLikedSongDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.userLikedWebsite`: Exposes CRUD operations for the **UserLikedWebsite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserLikedWebsites
    * const userLikedWebsites = await prisma.userLikedWebsite.findMany()
    * ```
    */
  get userLikedWebsite(): Prisma.UserLikedWebsiteDelegate<ExtArgs>;

  /**
   * `prisma.artist`: Exposes CRUD operations for the **Artist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Artists
    * const artists = await prisma.artist.findMany()
    * ```
    */
  get artist(): Prisma.ArtistDelegate<ExtArgs>;

  /**
   * `prisma.artistComment`: Exposes CRUD operations for the **ArtistComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArtistComments
    * const artistComments = await prisma.artistComment.findMany()
    * ```
    */
  get artistComment(): Prisma.ArtistCommentDelegate<ExtArgs>;

  /**
   * `prisma.userLikedArtist`: Exposes CRUD operations for the **UserLikedArtist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserLikedArtists
    * const userLikedArtists = await prisma.userLikedArtist.findMany()
    * ```
    */
  get userLikedArtist(): Prisma.UserLikedArtistDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.8.1
   * Query Engine version: 78caf6feeaed953168c64e15a249c3e9a033ebe2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    WebsiteProject: 'WebsiteProject',
    WebsiteProjectComment: 'WebsiteProjectComment',
    Song: 'Song',
    SongComment: 'SongComment',
    UserLikedSong: 'UserLikedSong',
    User: 'User',
    UserLikedWebsite: 'UserLikedWebsite',
    Artist: 'Artist',
    ArtistComment: 'ArtistComment',
    UserLikedArtist: 'UserLikedArtist'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'websiteProject' | 'websiteProjectComment' | 'song' | 'songComment' | 'userLikedSong' | 'user' | 'userLikedWebsite' | 'artist' | 'artistComment' | 'userLikedArtist'
      txIsolationLevel: never
    },
    model: {
      WebsiteProject: {
        payload: Prisma.$WebsiteProjectPayload<ExtArgs>
        fields: Prisma.WebsiteProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebsiteProjectFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebsiteProjectFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectPayload>
          }
          findFirst: {
            args: Prisma.WebsiteProjectFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebsiteProjectFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectPayload>
          }
          findMany: {
            args: Prisma.WebsiteProjectFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectPayload>[]
          }
          create: {
            args: Prisma.WebsiteProjectCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectPayload>
          }
          createMany: {
            args: Prisma.WebsiteProjectCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.WebsiteProjectDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectPayload>
          }
          update: {
            args: Prisma.WebsiteProjectUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectPayload>
          }
          deleteMany: {
            args: Prisma.WebsiteProjectDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.WebsiteProjectUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.WebsiteProjectUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectPayload>
          }
          aggregate: {
            args: Prisma.WebsiteProjectAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateWebsiteProject>
          }
          groupBy: {
            args: Prisma.WebsiteProjectGroupByArgs<ExtArgs>,
            result: $Utils.Optional<WebsiteProjectGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.WebsiteProjectFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.WebsiteProjectAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.WebsiteProjectCountArgs<ExtArgs>,
            result: $Utils.Optional<WebsiteProjectCountAggregateOutputType> | number
          }
        }
      }
      WebsiteProjectComment: {
        payload: Prisma.$WebsiteProjectCommentPayload<ExtArgs>
        fields: Prisma.WebsiteProjectCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebsiteProjectCommentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebsiteProjectCommentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectCommentPayload>
          }
          findFirst: {
            args: Prisma.WebsiteProjectCommentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebsiteProjectCommentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectCommentPayload>
          }
          findMany: {
            args: Prisma.WebsiteProjectCommentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectCommentPayload>[]
          }
          create: {
            args: Prisma.WebsiteProjectCommentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectCommentPayload>
          }
          createMany: {
            args: Prisma.WebsiteProjectCommentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.WebsiteProjectCommentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectCommentPayload>
          }
          update: {
            args: Prisma.WebsiteProjectCommentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectCommentPayload>
          }
          deleteMany: {
            args: Prisma.WebsiteProjectCommentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.WebsiteProjectCommentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.WebsiteProjectCommentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WebsiteProjectCommentPayload>
          }
          aggregate: {
            args: Prisma.WebsiteProjectCommentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateWebsiteProjectComment>
          }
          groupBy: {
            args: Prisma.WebsiteProjectCommentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<WebsiteProjectCommentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.WebsiteProjectCommentFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.WebsiteProjectCommentAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.WebsiteProjectCommentCountArgs<ExtArgs>,
            result: $Utils.Optional<WebsiteProjectCommentCountAggregateOutputType> | number
          }
        }
      }
      Song: {
        payload: Prisma.$SongPayload<ExtArgs>
        fields: Prisma.SongFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SongFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SongFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          findFirst: {
            args: Prisma.SongFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SongFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          findMany: {
            args: Prisma.SongFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongPayload>[]
          }
          create: {
            args: Prisma.SongCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          createMany: {
            args: Prisma.SongCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SongDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          update: {
            args: Prisma.SongUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          deleteMany: {
            args: Prisma.SongDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SongUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SongUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          aggregate: {
            args: Prisma.SongAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSong>
          }
          groupBy: {
            args: Prisma.SongGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SongGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SongFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.SongAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.SongCountArgs<ExtArgs>,
            result: $Utils.Optional<SongCountAggregateOutputType> | number
          }
        }
      }
      SongComment: {
        payload: Prisma.$SongCommentPayload<ExtArgs>
        fields: Prisma.SongCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SongCommentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SongCommentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongCommentPayload>
          }
          findFirst: {
            args: Prisma.SongCommentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SongCommentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongCommentPayload>
          }
          findMany: {
            args: Prisma.SongCommentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongCommentPayload>[]
          }
          create: {
            args: Prisma.SongCommentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongCommentPayload>
          }
          createMany: {
            args: Prisma.SongCommentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SongCommentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongCommentPayload>
          }
          update: {
            args: Prisma.SongCommentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongCommentPayload>
          }
          deleteMany: {
            args: Prisma.SongCommentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SongCommentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SongCommentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SongCommentPayload>
          }
          aggregate: {
            args: Prisma.SongCommentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSongComment>
          }
          groupBy: {
            args: Prisma.SongCommentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SongCommentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SongCommentFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.SongCommentAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.SongCommentCountArgs<ExtArgs>,
            result: $Utils.Optional<SongCommentCountAggregateOutputType> | number
          }
        }
      }
      UserLikedSong: {
        payload: Prisma.$UserLikedSongPayload<ExtArgs>
        fields: Prisma.UserLikedSongFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserLikedSongFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedSongPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserLikedSongFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedSongPayload>
          }
          findFirst: {
            args: Prisma.UserLikedSongFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedSongPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserLikedSongFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedSongPayload>
          }
          findMany: {
            args: Prisma.UserLikedSongFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedSongPayload>[]
          }
          create: {
            args: Prisma.UserLikedSongCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedSongPayload>
          }
          createMany: {
            args: Prisma.UserLikedSongCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserLikedSongDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedSongPayload>
          }
          update: {
            args: Prisma.UserLikedSongUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedSongPayload>
          }
          deleteMany: {
            args: Prisma.UserLikedSongDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserLikedSongUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserLikedSongUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedSongPayload>
          }
          aggregate: {
            args: Prisma.UserLikedSongAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserLikedSong>
          }
          groupBy: {
            args: Prisma.UserLikedSongGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserLikedSongGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserLikedSongFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserLikedSongAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.UserLikedSongCountArgs<ExtArgs>,
            result: $Utils.Optional<UserLikedSongCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserLikedWebsite: {
        payload: Prisma.$UserLikedWebsitePayload<ExtArgs>
        fields: Prisma.UserLikedWebsiteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserLikedWebsiteFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedWebsitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserLikedWebsiteFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedWebsitePayload>
          }
          findFirst: {
            args: Prisma.UserLikedWebsiteFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedWebsitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserLikedWebsiteFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedWebsitePayload>
          }
          findMany: {
            args: Prisma.UserLikedWebsiteFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedWebsitePayload>[]
          }
          create: {
            args: Prisma.UserLikedWebsiteCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedWebsitePayload>
          }
          createMany: {
            args: Prisma.UserLikedWebsiteCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserLikedWebsiteDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedWebsitePayload>
          }
          update: {
            args: Prisma.UserLikedWebsiteUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedWebsitePayload>
          }
          deleteMany: {
            args: Prisma.UserLikedWebsiteDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserLikedWebsiteUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserLikedWebsiteUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedWebsitePayload>
          }
          aggregate: {
            args: Prisma.UserLikedWebsiteAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserLikedWebsite>
          }
          groupBy: {
            args: Prisma.UserLikedWebsiteGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserLikedWebsiteGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserLikedWebsiteFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserLikedWebsiteAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.UserLikedWebsiteCountArgs<ExtArgs>,
            result: $Utils.Optional<UserLikedWebsiteCountAggregateOutputType> | number
          }
        }
      }
      Artist: {
        payload: Prisma.$ArtistPayload<ExtArgs>
        fields: Prisma.ArtistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtistFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtistFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          findFirst: {
            args: Prisma.ArtistFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtistFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          findMany: {
            args: Prisma.ArtistFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>[]
          }
          create: {
            args: Prisma.ArtistCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          createMany: {
            args: Prisma.ArtistCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ArtistDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          update: {
            args: Prisma.ArtistUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          deleteMany: {
            args: Prisma.ArtistDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ArtistUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ArtistUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          aggregate: {
            args: Prisma.ArtistAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateArtist>
          }
          groupBy: {
            args: Prisma.ArtistGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ArtistGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ArtistFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.ArtistAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.ArtistCountArgs<ExtArgs>,
            result: $Utils.Optional<ArtistCountAggregateOutputType> | number
          }
        }
      }
      ArtistComment: {
        payload: Prisma.$ArtistCommentPayload<ExtArgs>
        fields: Prisma.ArtistCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtistCommentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtistCommentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistCommentPayload>
          }
          findFirst: {
            args: Prisma.ArtistCommentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtistCommentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistCommentPayload>
          }
          findMany: {
            args: Prisma.ArtistCommentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistCommentPayload>[]
          }
          create: {
            args: Prisma.ArtistCommentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistCommentPayload>
          }
          createMany: {
            args: Prisma.ArtistCommentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ArtistCommentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistCommentPayload>
          }
          update: {
            args: Prisma.ArtistCommentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistCommentPayload>
          }
          deleteMany: {
            args: Prisma.ArtistCommentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ArtistCommentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ArtistCommentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArtistCommentPayload>
          }
          aggregate: {
            args: Prisma.ArtistCommentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateArtistComment>
          }
          groupBy: {
            args: Prisma.ArtistCommentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ArtistCommentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ArtistCommentFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.ArtistCommentAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.ArtistCommentCountArgs<ExtArgs>,
            result: $Utils.Optional<ArtistCommentCountAggregateOutputType> | number
          }
        }
      }
      UserLikedArtist: {
        payload: Prisma.$UserLikedArtistPayload<ExtArgs>
        fields: Prisma.UserLikedArtistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserLikedArtistFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedArtistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserLikedArtistFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedArtistPayload>
          }
          findFirst: {
            args: Prisma.UserLikedArtistFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedArtistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserLikedArtistFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedArtistPayload>
          }
          findMany: {
            args: Prisma.UserLikedArtistFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedArtistPayload>[]
          }
          create: {
            args: Prisma.UserLikedArtistCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedArtistPayload>
          }
          createMany: {
            args: Prisma.UserLikedArtistCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserLikedArtistDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedArtistPayload>
          }
          update: {
            args: Prisma.UserLikedArtistUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedArtistPayload>
          }
          deleteMany: {
            args: Prisma.UserLikedArtistDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserLikedArtistUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserLikedArtistUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserLikedArtistPayload>
          }
          aggregate: {
            args: Prisma.UserLikedArtistAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserLikedArtist>
          }
          groupBy: {
            args: Prisma.UserLikedArtistGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserLikedArtistGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserLikedArtistFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserLikedArtistAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.UserLikedArtistCountArgs<ExtArgs>,
            result: $Utils.Optional<UserLikedArtistCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type WebsiteProjectCountOutputType
   */

  export type WebsiteProjectCountOutputType = {
    comments: number
    likedByUsers: number
  }

  export type WebsiteProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | WebsiteProjectCountOutputTypeCountCommentsArgs
    likedByUsers?: boolean | WebsiteProjectCountOutputTypeCountLikedByUsersArgs
  }

  // Custom InputTypes

  /**
   * WebsiteProjectCountOutputType without action
   */
  export type WebsiteProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectCountOutputType
     */
    select?: WebsiteProjectCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * WebsiteProjectCountOutputType without action
   */
  export type WebsiteProjectCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebsiteProjectCommentWhereInput
  }


  /**
   * WebsiteProjectCountOutputType without action
   */
  export type WebsiteProjectCountOutputTypeCountLikedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLikedWebsiteWhereInput
  }



  /**
   * Count Type SongCountOutputType
   */

  export type SongCountOutputType = {
    comments: number
    likedByUsers: number
  }

  export type SongCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | SongCountOutputTypeCountCommentsArgs
    likedByUsers?: boolean | SongCountOutputTypeCountLikedByUsersArgs
  }

  // Custom InputTypes

  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongCountOutputType
     */
    select?: SongCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SongCommentWhereInput
  }


  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeCountLikedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLikedSongWhereInput
  }



  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    likedWebsites: number
    likedSongs: number
    likedArtists: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    likedWebsites?: boolean | UserCountOutputTypeCountLikedWebsitesArgs
    likedSongs?: boolean | UserCountOutputTypeCountLikedSongsArgs
    likedArtists?: boolean | UserCountOutputTypeCountLikedArtistsArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikedWebsitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLikedWebsiteWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikedSongsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLikedSongWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikedArtistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLikedArtistWhereInput
  }



  /**
   * Count Type ArtistCountOutputType
   */

  export type ArtistCountOutputType = {
    comments: number
    likedByUsers: number
  }

  export type ArtistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | ArtistCountOutputTypeCountCommentsArgs
    likedByUsers?: boolean | ArtistCountOutputTypeCountLikedByUsersArgs
  }

  // Custom InputTypes

  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistCountOutputType
     */
    select?: ArtistCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtistCommentWhereInput
  }


  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeCountLikedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLikedArtistWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Address
   */





  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    street?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
  }, ExtArgs["result"]["address"]>

  export type AddressSelectScalar = {
    street?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
  }


  export type $AddressPayload = {
    name: "Address"
    objects: {}
    scalars: {
      street: string
      city: string
      state: string
      zip: string
    }
    composites: {}
  }


  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>





  /**
   * Fields of the Address model
   */ 
  interface AddressFieldRefs {
    readonly street: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
    readonly state: FieldRef<"Address", 'String'>
    readonly zip: FieldRef<"Address", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
  }



  /**
   * Model WebsiteProject
   */

  export type AggregateWebsiteProject = {
    _count: WebsiteProjectCountAggregateOutputType | null
    _avg: WebsiteProjectAvgAggregateOutputType | null
    _sum: WebsiteProjectSumAggregateOutputType | null
    _min: WebsiteProjectMinAggregateOutputType | null
    _max: WebsiteProjectMaxAggregateOutputType | null
  }

  export type WebsiteProjectAvgAggregateOutputType = {
    likes: number | null
  }

  export type WebsiteProjectSumAggregateOutputType = {
    likes: number | null
  }

  export type WebsiteProjectMinAggregateOutputType = {
    id: string | null
    img: string | null
    title: string | null
    genre: string | null
    technologies: string | null
    description: string | null
    release_date: string | null
    link: string | null
    likes: number | null
  }

  export type WebsiteProjectMaxAggregateOutputType = {
    id: string | null
    img: string | null
    title: string | null
    genre: string | null
    technologies: string | null
    description: string | null
    release_date: string | null
    link: string | null
    likes: number | null
  }

  export type WebsiteProjectCountAggregateOutputType = {
    id: number
    img: number
    title: number
    genre: number
    technologies: number
    description: number
    release_date: number
    link: number
    likes: number
    _all: number
  }


  export type WebsiteProjectAvgAggregateInputType = {
    likes?: true
  }

  export type WebsiteProjectSumAggregateInputType = {
    likes?: true
  }

  export type WebsiteProjectMinAggregateInputType = {
    id?: true
    img?: true
    title?: true
    genre?: true
    technologies?: true
    description?: true
    release_date?: true
    link?: true
    likes?: true
  }

  export type WebsiteProjectMaxAggregateInputType = {
    id?: true
    img?: true
    title?: true
    genre?: true
    technologies?: true
    description?: true
    release_date?: true
    link?: true
    likes?: true
  }

  export type WebsiteProjectCountAggregateInputType = {
    id?: true
    img?: true
    title?: true
    genre?: true
    technologies?: true
    description?: true
    release_date?: true
    link?: true
    likes?: true
    _all?: true
  }

  export type WebsiteProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebsiteProject to aggregate.
     */
    where?: WebsiteProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsiteProjects to fetch.
     */
    orderBy?: WebsiteProjectOrderByWithRelationInput | WebsiteProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebsiteProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsiteProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsiteProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebsiteProjects
    **/
    _count?: true | WebsiteProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebsiteProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebsiteProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebsiteProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebsiteProjectMaxAggregateInputType
  }

  export type GetWebsiteProjectAggregateType<T extends WebsiteProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateWebsiteProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebsiteProject[P]>
      : GetScalarType<T[P], AggregateWebsiteProject[P]>
  }




  export type WebsiteProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebsiteProjectWhereInput
    orderBy?: WebsiteProjectOrderByWithAggregationInput | WebsiteProjectOrderByWithAggregationInput[]
    by: WebsiteProjectScalarFieldEnum[] | WebsiteProjectScalarFieldEnum
    having?: WebsiteProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebsiteProjectCountAggregateInputType | true
    _avg?: WebsiteProjectAvgAggregateInputType
    _sum?: WebsiteProjectSumAggregateInputType
    _min?: WebsiteProjectMinAggregateInputType
    _max?: WebsiteProjectMaxAggregateInputType
  }

  export type WebsiteProjectGroupByOutputType = {
    id: string
    img: string
    title: string
    genre: string
    technologies: string
    description: string
    release_date: string
    link: string
    likes: number
    _count: WebsiteProjectCountAggregateOutputType | null
    _avg: WebsiteProjectAvgAggregateOutputType | null
    _sum: WebsiteProjectSumAggregateOutputType | null
    _min: WebsiteProjectMinAggregateOutputType | null
    _max: WebsiteProjectMaxAggregateOutputType | null
  }

  type GetWebsiteProjectGroupByPayload<T extends WebsiteProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebsiteProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebsiteProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebsiteProjectGroupByOutputType[P]>
            : GetScalarType<T[P], WebsiteProjectGroupByOutputType[P]>
        }
      >
    >


  export type WebsiteProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    img?: boolean
    title?: boolean
    genre?: boolean
    technologies?: boolean
    description?: boolean
    release_date?: boolean
    link?: boolean
    likes?: boolean
    comments?: boolean | WebsiteProject$commentsArgs<ExtArgs>
    likedByUsers?: boolean | WebsiteProject$likedByUsersArgs<ExtArgs>
    _count?: boolean | WebsiteProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["websiteProject"]>

  export type WebsiteProjectSelectScalar = {
    id?: boolean
    img?: boolean
    title?: boolean
    genre?: boolean
    technologies?: boolean
    description?: boolean
    release_date?: boolean
    link?: boolean
    likes?: boolean
  }

  export type WebsiteProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | WebsiteProject$commentsArgs<ExtArgs>
    likedByUsers?: boolean | WebsiteProject$likedByUsersArgs<ExtArgs>
    _count?: boolean | WebsiteProjectCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $WebsiteProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebsiteProject"
    objects: {
      comments: Prisma.$WebsiteProjectCommentPayload<ExtArgs>[]
      likedByUsers: Prisma.$UserLikedWebsitePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      img: string
      title: string
      genre: string
      technologies: string
      description: string
      release_date: string
      link: string
      likes: number
    }, ExtArgs["result"]["websiteProject"]>
    composites: {}
  }


  type WebsiteProjectGetPayload<S extends boolean | null | undefined | WebsiteProjectDefaultArgs> = $Result.GetResult<Prisma.$WebsiteProjectPayload, S>

  type WebsiteProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WebsiteProjectFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WebsiteProjectCountAggregateInputType | true
    }

  export interface WebsiteProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebsiteProject'], meta: { name: 'WebsiteProject' } }
    /**
     * Find zero or one WebsiteProject that matches the filter.
     * @param {WebsiteProjectFindUniqueArgs} args - Arguments to find a WebsiteProject
     * @example
     * // Get one WebsiteProject
     * const websiteProject = await prisma.websiteProject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WebsiteProjectFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectFindUniqueArgs<ExtArgs>>
    ): Prisma__WebsiteProjectClient<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one WebsiteProject that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WebsiteProjectFindUniqueOrThrowArgs} args - Arguments to find a WebsiteProject
     * @example
     * // Get one WebsiteProject
     * const websiteProject = await prisma.websiteProject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WebsiteProjectFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__WebsiteProjectClient<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first WebsiteProject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectFindFirstArgs} args - Arguments to find a WebsiteProject
     * @example
     * // Get one WebsiteProject
     * const websiteProject = await prisma.websiteProject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WebsiteProjectFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectFindFirstArgs<ExtArgs>>
    ): Prisma__WebsiteProjectClient<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first WebsiteProject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectFindFirstOrThrowArgs} args - Arguments to find a WebsiteProject
     * @example
     * // Get one WebsiteProject
     * const websiteProject = await prisma.websiteProject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WebsiteProjectFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__WebsiteProjectClient<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more WebsiteProjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebsiteProjects
     * const websiteProjects = await prisma.websiteProject.findMany()
     * 
     * // Get first 10 WebsiteProjects
     * const websiteProjects = await prisma.websiteProject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const websiteProjectWithIdOnly = await prisma.websiteProject.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WebsiteProjectFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a WebsiteProject.
     * @param {WebsiteProjectCreateArgs} args - Arguments to create a WebsiteProject.
     * @example
     * // Create one WebsiteProject
     * const WebsiteProject = await prisma.websiteProject.create({
     *   data: {
     *     // ... data to create a WebsiteProject
     *   }
     * })
     * 
    **/
    create<T extends WebsiteProjectCreateArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectCreateArgs<ExtArgs>>
    ): Prisma__WebsiteProjectClient<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many WebsiteProjects.
     *     @param {WebsiteProjectCreateManyArgs} args - Arguments to create many WebsiteProjects.
     *     @example
     *     // Create many WebsiteProjects
     *     const websiteProject = await prisma.websiteProject.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WebsiteProjectCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WebsiteProject.
     * @param {WebsiteProjectDeleteArgs} args - Arguments to delete one WebsiteProject.
     * @example
     * // Delete one WebsiteProject
     * const WebsiteProject = await prisma.websiteProject.delete({
     *   where: {
     *     // ... filter to delete one WebsiteProject
     *   }
     * })
     * 
    **/
    delete<T extends WebsiteProjectDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectDeleteArgs<ExtArgs>>
    ): Prisma__WebsiteProjectClient<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one WebsiteProject.
     * @param {WebsiteProjectUpdateArgs} args - Arguments to update one WebsiteProject.
     * @example
     * // Update one WebsiteProject
     * const websiteProject = await prisma.websiteProject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WebsiteProjectUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectUpdateArgs<ExtArgs>>
    ): Prisma__WebsiteProjectClient<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more WebsiteProjects.
     * @param {WebsiteProjectDeleteManyArgs} args - Arguments to filter WebsiteProjects to delete.
     * @example
     * // Delete a few WebsiteProjects
     * const { count } = await prisma.websiteProject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WebsiteProjectDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebsiteProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebsiteProjects
     * const websiteProject = await prisma.websiteProject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WebsiteProjectUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WebsiteProject.
     * @param {WebsiteProjectUpsertArgs} args - Arguments to update or create a WebsiteProject.
     * @example
     * // Update or create a WebsiteProject
     * const websiteProject = await prisma.websiteProject.upsert({
     *   create: {
     *     // ... data to create a WebsiteProject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebsiteProject we want to update
     *   }
     * })
    **/
    upsert<T extends WebsiteProjectUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectUpsertArgs<ExtArgs>>
    ): Prisma__WebsiteProjectClient<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more WebsiteProjects that matches the filter.
     * @param {WebsiteProjectFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const websiteProject = await prisma.websiteProject.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: WebsiteProjectFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a WebsiteProject.
     * @param {WebsiteProjectAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const websiteProject = await prisma.websiteProject.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: WebsiteProjectAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of WebsiteProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectCountArgs} args - Arguments to filter WebsiteProjects to count.
     * @example
     * // Count the number of WebsiteProjects
     * const count = await prisma.websiteProject.count({
     *   where: {
     *     // ... the filter for the WebsiteProjects we want to count
     *   }
     * })
    **/
    count<T extends WebsiteProjectCountArgs>(
      args?: Subset<T, WebsiteProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebsiteProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebsiteProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebsiteProjectAggregateArgs>(args: Subset<T, WebsiteProjectAggregateArgs>): Prisma.PrismaPromise<GetWebsiteProjectAggregateType<T>>

    /**
     * Group by WebsiteProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebsiteProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebsiteProjectGroupByArgs['orderBy'] }
        : { orderBy?: WebsiteProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebsiteProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebsiteProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebsiteProject model
   */
  readonly fields: WebsiteProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebsiteProject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebsiteProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    comments<T extends WebsiteProject$commentsArgs<ExtArgs> = {}>(args?: Subset<T, WebsiteProject$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebsiteProjectCommentPayload<ExtArgs>, T, 'findMany'> | Null>;

    likedByUsers<T extends WebsiteProject$likedByUsersArgs<ExtArgs> = {}>(args?: Subset<T, WebsiteProject$likedByUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the WebsiteProject model
   */ 
  interface WebsiteProjectFieldRefs {
    readonly id: FieldRef<"WebsiteProject", 'String'>
    readonly img: FieldRef<"WebsiteProject", 'String'>
    readonly title: FieldRef<"WebsiteProject", 'String'>
    readonly genre: FieldRef<"WebsiteProject", 'String'>
    readonly technologies: FieldRef<"WebsiteProject", 'String'>
    readonly description: FieldRef<"WebsiteProject", 'String'>
    readonly release_date: FieldRef<"WebsiteProject", 'String'>
    readonly link: FieldRef<"WebsiteProject", 'String'>
    readonly likes: FieldRef<"WebsiteProject", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * WebsiteProject findUnique
   */
  export type WebsiteProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProject
     */
    select?: WebsiteProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectInclude<ExtArgs> | null
    /**
     * Filter, which WebsiteProject to fetch.
     */
    where: WebsiteProjectWhereUniqueInput
  }


  /**
   * WebsiteProject findUniqueOrThrow
   */
  export type WebsiteProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProject
     */
    select?: WebsiteProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectInclude<ExtArgs> | null
    /**
     * Filter, which WebsiteProject to fetch.
     */
    where: WebsiteProjectWhereUniqueInput
  }


  /**
   * WebsiteProject findFirst
   */
  export type WebsiteProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProject
     */
    select?: WebsiteProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectInclude<ExtArgs> | null
    /**
     * Filter, which WebsiteProject to fetch.
     */
    where?: WebsiteProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsiteProjects to fetch.
     */
    orderBy?: WebsiteProjectOrderByWithRelationInput | WebsiteProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebsiteProjects.
     */
    cursor?: WebsiteProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsiteProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsiteProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebsiteProjects.
     */
    distinct?: WebsiteProjectScalarFieldEnum | WebsiteProjectScalarFieldEnum[]
  }


  /**
   * WebsiteProject findFirstOrThrow
   */
  export type WebsiteProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProject
     */
    select?: WebsiteProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectInclude<ExtArgs> | null
    /**
     * Filter, which WebsiteProject to fetch.
     */
    where?: WebsiteProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsiteProjects to fetch.
     */
    orderBy?: WebsiteProjectOrderByWithRelationInput | WebsiteProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebsiteProjects.
     */
    cursor?: WebsiteProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsiteProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsiteProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebsiteProjects.
     */
    distinct?: WebsiteProjectScalarFieldEnum | WebsiteProjectScalarFieldEnum[]
  }


  /**
   * WebsiteProject findMany
   */
  export type WebsiteProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProject
     */
    select?: WebsiteProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectInclude<ExtArgs> | null
    /**
     * Filter, which WebsiteProjects to fetch.
     */
    where?: WebsiteProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsiteProjects to fetch.
     */
    orderBy?: WebsiteProjectOrderByWithRelationInput | WebsiteProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebsiteProjects.
     */
    cursor?: WebsiteProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsiteProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsiteProjects.
     */
    skip?: number
    distinct?: WebsiteProjectScalarFieldEnum | WebsiteProjectScalarFieldEnum[]
  }


  /**
   * WebsiteProject create
   */
  export type WebsiteProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProject
     */
    select?: WebsiteProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a WebsiteProject.
     */
    data: XOR<WebsiteProjectCreateInput, WebsiteProjectUncheckedCreateInput>
  }


  /**
   * WebsiteProject createMany
   */
  export type WebsiteProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebsiteProjects.
     */
    data: WebsiteProjectCreateManyInput | WebsiteProjectCreateManyInput[]
  }


  /**
   * WebsiteProject update
   */
  export type WebsiteProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProject
     */
    select?: WebsiteProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a WebsiteProject.
     */
    data: XOR<WebsiteProjectUpdateInput, WebsiteProjectUncheckedUpdateInput>
    /**
     * Choose, which WebsiteProject to update.
     */
    where: WebsiteProjectWhereUniqueInput
  }


  /**
   * WebsiteProject updateMany
   */
  export type WebsiteProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebsiteProjects.
     */
    data: XOR<WebsiteProjectUpdateManyMutationInput, WebsiteProjectUncheckedUpdateManyInput>
    /**
     * Filter which WebsiteProjects to update
     */
    where?: WebsiteProjectWhereInput
  }


  /**
   * WebsiteProject upsert
   */
  export type WebsiteProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProject
     */
    select?: WebsiteProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the WebsiteProject to update in case it exists.
     */
    where: WebsiteProjectWhereUniqueInput
    /**
     * In case the WebsiteProject found by the `where` argument doesn't exist, create a new WebsiteProject with this data.
     */
    create: XOR<WebsiteProjectCreateInput, WebsiteProjectUncheckedCreateInput>
    /**
     * In case the WebsiteProject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebsiteProjectUpdateInput, WebsiteProjectUncheckedUpdateInput>
  }


  /**
   * WebsiteProject delete
   */
  export type WebsiteProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProject
     */
    select?: WebsiteProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectInclude<ExtArgs> | null
    /**
     * Filter which WebsiteProject to delete.
     */
    where: WebsiteProjectWhereUniqueInput
  }


  /**
   * WebsiteProject deleteMany
   */
  export type WebsiteProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebsiteProjects to delete
     */
    where?: WebsiteProjectWhereInput
  }


  /**
   * WebsiteProject findRaw
   */
  export type WebsiteProjectFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * WebsiteProject aggregateRaw
   */
  export type WebsiteProjectAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * WebsiteProject.comments
   */
  export type WebsiteProject$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
    where?: WebsiteProjectCommentWhereInput
    orderBy?: WebsiteProjectCommentOrderByWithRelationInput | WebsiteProjectCommentOrderByWithRelationInput[]
    cursor?: WebsiteProjectCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebsiteProjectCommentScalarFieldEnum | WebsiteProjectCommentScalarFieldEnum[]
  }


  /**
   * WebsiteProject.likedByUsers
   */
  export type WebsiteProject$likedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    where?: UserLikedWebsiteWhereInput
    orderBy?: UserLikedWebsiteOrderByWithRelationInput | UserLikedWebsiteOrderByWithRelationInput[]
    cursor?: UserLikedWebsiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserLikedWebsiteScalarFieldEnum | UserLikedWebsiteScalarFieldEnum[]
  }


  /**
   * WebsiteProject without action
   */
  export type WebsiteProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProject
     */
    select?: WebsiteProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectInclude<ExtArgs> | null
  }



  /**
   * Model WebsiteProjectComment
   */

  export type AggregateWebsiteProjectComment = {
    _count: WebsiteProjectCommentCountAggregateOutputType | null
    _avg: WebsiteProjectCommentAvgAggregateOutputType | null
    _sum: WebsiteProjectCommentSumAggregateOutputType | null
    _min: WebsiteProjectCommentMinAggregateOutputType | null
    _max: WebsiteProjectCommentMaxAggregateOutputType | null
  }

  export type WebsiteProjectCommentAvgAggregateOutputType = {
    likes: number | null
  }

  export type WebsiteProjectCommentSumAggregateOutputType = {
    likes: number | null
  }

  export type WebsiteProjectCommentMinAggregateOutputType = {
    id: string | null
    comment: string | null
    websiteProjectId: string | null
    likes: number | null
  }

  export type WebsiteProjectCommentMaxAggregateOutputType = {
    id: string | null
    comment: string | null
    websiteProjectId: string | null
    likes: number | null
  }

  export type WebsiteProjectCommentCountAggregateOutputType = {
    id: number
    comment: number
    websiteProjectId: number
    likes: number
    _all: number
  }


  export type WebsiteProjectCommentAvgAggregateInputType = {
    likes?: true
  }

  export type WebsiteProjectCommentSumAggregateInputType = {
    likes?: true
  }

  export type WebsiteProjectCommentMinAggregateInputType = {
    id?: true
    comment?: true
    websiteProjectId?: true
    likes?: true
  }

  export type WebsiteProjectCommentMaxAggregateInputType = {
    id?: true
    comment?: true
    websiteProjectId?: true
    likes?: true
  }

  export type WebsiteProjectCommentCountAggregateInputType = {
    id?: true
    comment?: true
    websiteProjectId?: true
    likes?: true
    _all?: true
  }

  export type WebsiteProjectCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebsiteProjectComment to aggregate.
     */
    where?: WebsiteProjectCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsiteProjectComments to fetch.
     */
    orderBy?: WebsiteProjectCommentOrderByWithRelationInput | WebsiteProjectCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebsiteProjectCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsiteProjectComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsiteProjectComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebsiteProjectComments
    **/
    _count?: true | WebsiteProjectCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebsiteProjectCommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebsiteProjectCommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebsiteProjectCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebsiteProjectCommentMaxAggregateInputType
  }

  export type GetWebsiteProjectCommentAggregateType<T extends WebsiteProjectCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateWebsiteProjectComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebsiteProjectComment[P]>
      : GetScalarType<T[P], AggregateWebsiteProjectComment[P]>
  }




  export type WebsiteProjectCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebsiteProjectCommentWhereInput
    orderBy?: WebsiteProjectCommentOrderByWithAggregationInput | WebsiteProjectCommentOrderByWithAggregationInput[]
    by: WebsiteProjectCommentScalarFieldEnum[] | WebsiteProjectCommentScalarFieldEnum
    having?: WebsiteProjectCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebsiteProjectCommentCountAggregateInputType | true
    _avg?: WebsiteProjectCommentAvgAggregateInputType
    _sum?: WebsiteProjectCommentSumAggregateInputType
    _min?: WebsiteProjectCommentMinAggregateInputType
    _max?: WebsiteProjectCommentMaxAggregateInputType
  }

  export type WebsiteProjectCommentGroupByOutputType = {
    id: string
    comment: string
    websiteProjectId: string
    likes: number
    _count: WebsiteProjectCommentCountAggregateOutputType | null
    _avg: WebsiteProjectCommentAvgAggregateOutputType | null
    _sum: WebsiteProjectCommentSumAggregateOutputType | null
    _min: WebsiteProjectCommentMinAggregateOutputType | null
    _max: WebsiteProjectCommentMaxAggregateOutputType | null
  }

  type GetWebsiteProjectCommentGroupByPayload<T extends WebsiteProjectCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebsiteProjectCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebsiteProjectCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebsiteProjectCommentGroupByOutputType[P]>
            : GetScalarType<T[P], WebsiteProjectCommentGroupByOutputType[P]>
        }
      >
    >


  export type WebsiteProjectCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comment?: boolean
    websiteProjectId?: boolean
    likes?: boolean
    websiteProject?: boolean | WebsiteProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["websiteProjectComment"]>

  export type WebsiteProjectCommentSelectScalar = {
    id?: boolean
    comment?: boolean
    websiteProjectId?: boolean
    likes?: boolean
  }

  export type WebsiteProjectCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    websiteProject?: boolean | WebsiteProjectDefaultArgs<ExtArgs>
  }


  export type $WebsiteProjectCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebsiteProjectComment"
    objects: {
      websiteProject: Prisma.$WebsiteProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      comment: string
      websiteProjectId: string
      likes: number
    }, ExtArgs["result"]["websiteProjectComment"]>
    composites: {}
  }


  type WebsiteProjectCommentGetPayload<S extends boolean | null | undefined | WebsiteProjectCommentDefaultArgs> = $Result.GetResult<Prisma.$WebsiteProjectCommentPayload, S>

  type WebsiteProjectCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WebsiteProjectCommentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WebsiteProjectCommentCountAggregateInputType | true
    }

  export interface WebsiteProjectCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebsiteProjectComment'], meta: { name: 'WebsiteProjectComment' } }
    /**
     * Find zero or one WebsiteProjectComment that matches the filter.
     * @param {WebsiteProjectCommentFindUniqueArgs} args - Arguments to find a WebsiteProjectComment
     * @example
     * // Get one WebsiteProjectComment
     * const websiteProjectComment = await prisma.websiteProjectComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WebsiteProjectCommentFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectCommentFindUniqueArgs<ExtArgs>>
    ): Prisma__WebsiteProjectCommentClient<$Result.GetResult<Prisma.$WebsiteProjectCommentPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one WebsiteProjectComment that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WebsiteProjectCommentFindUniqueOrThrowArgs} args - Arguments to find a WebsiteProjectComment
     * @example
     * // Get one WebsiteProjectComment
     * const websiteProjectComment = await prisma.websiteProjectComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WebsiteProjectCommentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectCommentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__WebsiteProjectCommentClient<$Result.GetResult<Prisma.$WebsiteProjectCommentPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first WebsiteProjectComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectCommentFindFirstArgs} args - Arguments to find a WebsiteProjectComment
     * @example
     * // Get one WebsiteProjectComment
     * const websiteProjectComment = await prisma.websiteProjectComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WebsiteProjectCommentFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectCommentFindFirstArgs<ExtArgs>>
    ): Prisma__WebsiteProjectCommentClient<$Result.GetResult<Prisma.$WebsiteProjectCommentPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first WebsiteProjectComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectCommentFindFirstOrThrowArgs} args - Arguments to find a WebsiteProjectComment
     * @example
     * // Get one WebsiteProjectComment
     * const websiteProjectComment = await prisma.websiteProjectComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WebsiteProjectCommentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectCommentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__WebsiteProjectCommentClient<$Result.GetResult<Prisma.$WebsiteProjectCommentPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more WebsiteProjectComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectCommentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebsiteProjectComments
     * const websiteProjectComments = await prisma.websiteProjectComment.findMany()
     * 
     * // Get first 10 WebsiteProjectComments
     * const websiteProjectComments = await prisma.websiteProjectComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const websiteProjectCommentWithIdOnly = await prisma.websiteProjectComment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WebsiteProjectCommentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectCommentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebsiteProjectCommentPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a WebsiteProjectComment.
     * @param {WebsiteProjectCommentCreateArgs} args - Arguments to create a WebsiteProjectComment.
     * @example
     * // Create one WebsiteProjectComment
     * const WebsiteProjectComment = await prisma.websiteProjectComment.create({
     *   data: {
     *     // ... data to create a WebsiteProjectComment
     *   }
     * })
     * 
    **/
    create<T extends WebsiteProjectCommentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectCommentCreateArgs<ExtArgs>>
    ): Prisma__WebsiteProjectCommentClient<$Result.GetResult<Prisma.$WebsiteProjectCommentPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many WebsiteProjectComments.
     *     @param {WebsiteProjectCommentCreateManyArgs} args - Arguments to create many WebsiteProjectComments.
     *     @example
     *     // Create many WebsiteProjectComments
     *     const websiteProjectComment = await prisma.websiteProjectComment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WebsiteProjectCommentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectCommentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WebsiteProjectComment.
     * @param {WebsiteProjectCommentDeleteArgs} args - Arguments to delete one WebsiteProjectComment.
     * @example
     * // Delete one WebsiteProjectComment
     * const WebsiteProjectComment = await prisma.websiteProjectComment.delete({
     *   where: {
     *     // ... filter to delete one WebsiteProjectComment
     *   }
     * })
     * 
    **/
    delete<T extends WebsiteProjectCommentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectCommentDeleteArgs<ExtArgs>>
    ): Prisma__WebsiteProjectCommentClient<$Result.GetResult<Prisma.$WebsiteProjectCommentPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one WebsiteProjectComment.
     * @param {WebsiteProjectCommentUpdateArgs} args - Arguments to update one WebsiteProjectComment.
     * @example
     * // Update one WebsiteProjectComment
     * const websiteProjectComment = await prisma.websiteProjectComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WebsiteProjectCommentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectCommentUpdateArgs<ExtArgs>>
    ): Prisma__WebsiteProjectCommentClient<$Result.GetResult<Prisma.$WebsiteProjectCommentPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more WebsiteProjectComments.
     * @param {WebsiteProjectCommentDeleteManyArgs} args - Arguments to filter WebsiteProjectComments to delete.
     * @example
     * // Delete a few WebsiteProjectComments
     * const { count } = await prisma.websiteProjectComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WebsiteProjectCommentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteProjectCommentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebsiteProjectComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebsiteProjectComments
     * const websiteProjectComment = await prisma.websiteProjectComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WebsiteProjectCommentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectCommentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WebsiteProjectComment.
     * @param {WebsiteProjectCommentUpsertArgs} args - Arguments to update or create a WebsiteProjectComment.
     * @example
     * // Update or create a WebsiteProjectComment
     * const websiteProjectComment = await prisma.websiteProjectComment.upsert({
     *   create: {
     *     // ... data to create a WebsiteProjectComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebsiteProjectComment we want to update
     *   }
     * })
    **/
    upsert<T extends WebsiteProjectCommentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteProjectCommentUpsertArgs<ExtArgs>>
    ): Prisma__WebsiteProjectCommentClient<$Result.GetResult<Prisma.$WebsiteProjectCommentPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more WebsiteProjectComments that matches the filter.
     * @param {WebsiteProjectCommentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const websiteProjectComment = await prisma.websiteProjectComment.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: WebsiteProjectCommentFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a WebsiteProjectComment.
     * @param {WebsiteProjectCommentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const websiteProjectComment = await prisma.websiteProjectComment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: WebsiteProjectCommentAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of WebsiteProjectComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectCommentCountArgs} args - Arguments to filter WebsiteProjectComments to count.
     * @example
     * // Count the number of WebsiteProjectComments
     * const count = await prisma.websiteProjectComment.count({
     *   where: {
     *     // ... the filter for the WebsiteProjectComments we want to count
     *   }
     * })
    **/
    count<T extends WebsiteProjectCommentCountArgs>(
      args?: Subset<T, WebsiteProjectCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebsiteProjectCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebsiteProjectComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebsiteProjectCommentAggregateArgs>(args: Subset<T, WebsiteProjectCommentAggregateArgs>): Prisma.PrismaPromise<GetWebsiteProjectCommentAggregateType<T>>

    /**
     * Group by WebsiteProjectComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteProjectCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebsiteProjectCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebsiteProjectCommentGroupByArgs['orderBy'] }
        : { orderBy?: WebsiteProjectCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebsiteProjectCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebsiteProjectCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebsiteProjectComment model
   */
  readonly fields: WebsiteProjectCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebsiteProjectComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebsiteProjectCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    websiteProject<T extends WebsiteProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WebsiteProjectDefaultArgs<ExtArgs>>): Prisma__WebsiteProjectClient<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the WebsiteProjectComment model
   */ 
  interface WebsiteProjectCommentFieldRefs {
    readonly id: FieldRef<"WebsiteProjectComment", 'String'>
    readonly comment: FieldRef<"WebsiteProjectComment", 'String'>
    readonly websiteProjectId: FieldRef<"WebsiteProjectComment", 'String'>
    readonly likes: FieldRef<"WebsiteProjectComment", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * WebsiteProjectComment findUnique
   */
  export type WebsiteProjectCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
    /**
     * Filter, which WebsiteProjectComment to fetch.
     */
    where: WebsiteProjectCommentWhereUniqueInput
  }


  /**
   * WebsiteProjectComment findUniqueOrThrow
   */
  export type WebsiteProjectCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
    /**
     * Filter, which WebsiteProjectComment to fetch.
     */
    where: WebsiteProjectCommentWhereUniqueInput
  }


  /**
   * WebsiteProjectComment findFirst
   */
  export type WebsiteProjectCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
    /**
     * Filter, which WebsiteProjectComment to fetch.
     */
    where?: WebsiteProjectCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsiteProjectComments to fetch.
     */
    orderBy?: WebsiteProjectCommentOrderByWithRelationInput | WebsiteProjectCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebsiteProjectComments.
     */
    cursor?: WebsiteProjectCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsiteProjectComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsiteProjectComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebsiteProjectComments.
     */
    distinct?: WebsiteProjectCommentScalarFieldEnum | WebsiteProjectCommentScalarFieldEnum[]
  }


  /**
   * WebsiteProjectComment findFirstOrThrow
   */
  export type WebsiteProjectCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
    /**
     * Filter, which WebsiteProjectComment to fetch.
     */
    where?: WebsiteProjectCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsiteProjectComments to fetch.
     */
    orderBy?: WebsiteProjectCommentOrderByWithRelationInput | WebsiteProjectCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebsiteProjectComments.
     */
    cursor?: WebsiteProjectCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsiteProjectComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsiteProjectComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebsiteProjectComments.
     */
    distinct?: WebsiteProjectCommentScalarFieldEnum | WebsiteProjectCommentScalarFieldEnum[]
  }


  /**
   * WebsiteProjectComment findMany
   */
  export type WebsiteProjectCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
    /**
     * Filter, which WebsiteProjectComments to fetch.
     */
    where?: WebsiteProjectCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsiteProjectComments to fetch.
     */
    orderBy?: WebsiteProjectCommentOrderByWithRelationInput | WebsiteProjectCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebsiteProjectComments.
     */
    cursor?: WebsiteProjectCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsiteProjectComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsiteProjectComments.
     */
    skip?: number
    distinct?: WebsiteProjectCommentScalarFieldEnum | WebsiteProjectCommentScalarFieldEnum[]
  }


  /**
   * WebsiteProjectComment create
   */
  export type WebsiteProjectCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a WebsiteProjectComment.
     */
    data: XOR<WebsiteProjectCommentCreateInput, WebsiteProjectCommentUncheckedCreateInput>
  }


  /**
   * WebsiteProjectComment createMany
   */
  export type WebsiteProjectCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebsiteProjectComments.
     */
    data: WebsiteProjectCommentCreateManyInput | WebsiteProjectCommentCreateManyInput[]
  }


  /**
   * WebsiteProjectComment update
   */
  export type WebsiteProjectCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a WebsiteProjectComment.
     */
    data: XOR<WebsiteProjectCommentUpdateInput, WebsiteProjectCommentUncheckedUpdateInput>
    /**
     * Choose, which WebsiteProjectComment to update.
     */
    where: WebsiteProjectCommentWhereUniqueInput
  }


  /**
   * WebsiteProjectComment updateMany
   */
  export type WebsiteProjectCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebsiteProjectComments.
     */
    data: XOR<WebsiteProjectCommentUpdateManyMutationInput, WebsiteProjectCommentUncheckedUpdateManyInput>
    /**
     * Filter which WebsiteProjectComments to update
     */
    where?: WebsiteProjectCommentWhereInput
  }


  /**
   * WebsiteProjectComment upsert
   */
  export type WebsiteProjectCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the WebsiteProjectComment to update in case it exists.
     */
    where: WebsiteProjectCommentWhereUniqueInput
    /**
     * In case the WebsiteProjectComment found by the `where` argument doesn't exist, create a new WebsiteProjectComment with this data.
     */
    create: XOR<WebsiteProjectCommentCreateInput, WebsiteProjectCommentUncheckedCreateInput>
    /**
     * In case the WebsiteProjectComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebsiteProjectCommentUpdateInput, WebsiteProjectCommentUncheckedUpdateInput>
  }


  /**
   * WebsiteProjectComment delete
   */
  export type WebsiteProjectCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
    /**
     * Filter which WebsiteProjectComment to delete.
     */
    where: WebsiteProjectCommentWhereUniqueInput
  }


  /**
   * WebsiteProjectComment deleteMany
   */
  export type WebsiteProjectCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebsiteProjectComments to delete
     */
    where?: WebsiteProjectCommentWhereInput
  }


  /**
   * WebsiteProjectComment findRaw
   */
  export type WebsiteProjectCommentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * WebsiteProjectComment aggregateRaw
   */
  export type WebsiteProjectCommentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * WebsiteProjectComment without action
   */
  export type WebsiteProjectCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsiteProjectComment
     */
    select?: WebsiteProjectCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteProjectCommentInclude<ExtArgs> | null
  }



  /**
   * Model Song
   */

  export type AggregateSong = {
    _count: SongCountAggregateOutputType | null
    _avg: SongAvgAggregateOutputType | null
    _sum: SongSumAggregateOutputType | null
    _min: SongMinAggregateOutputType | null
    _max: SongMaxAggregateOutputType | null
  }

  export type SongAvgAggregateOutputType = {
    plays: number | null
    likes: number | null
  }

  export type SongSumAggregateOutputType = {
    plays: number | null
    likes: number | null
  }

  export type SongMinAggregateOutputType = {
    id: string | null
    img: string | null
    title: string | null
    albumName: string | null
    artist: string | null
    genre: string | null
    releaseDate: string | null
    duration: string | null
    plays: number | null
    song: string | null
    likes: number | null
  }

  export type SongMaxAggregateOutputType = {
    id: string | null
    img: string | null
    title: string | null
    albumName: string | null
    artist: string | null
    genre: string | null
    releaseDate: string | null
    duration: string | null
    plays: number | null
    song: string | null
    likes: number | null
  }

  export type SongCountAggregateOutputType = {
    id: number
    img: number
    title: number
    albumName: number
    artist: number
    genre: number
    releaseDate: number
    duration: number
    plays: number
    song: number
    likes: number
    _all: number
  }


  export type SongAvgAggregateInputType = {
    plays?: true
    likes?: true
  }

  export type SongSumAggregateInputType = {
    plays?: true
    likes?: true
  }

  export type SongMinAggregateInputType = {
    id?: true
    img?: true
    title?: true
    albumName?: true
    artist?: true
    genre?: true
    releaseDate?: true
    duration?: true
    plays?: true
    song?: true
    likes?: true
  }

  export type SongMaxAggregateInputType = {
    id?: true
    img?: true
    title?: true
    albumName?: true
    artist?: true
    genre?: true
    releaseDate?: true
    duration?: true
    plays?: true
    song?: true
    likes?: true
  }

  export type SongCountAggregateInputType = {
    id?: true
    img?: true
    title?: true
    albumName?: true
    artist?: true
    genre?: true
    releaseDate?: true
    duration?: true
    plays?: true
    song?: true
    likes?: true
    _all?: true
  }

  export type SongAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Song to aggregate.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Songs
    **/
    _count?: true | SongCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SongAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SongSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SongMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SongMaxAggregateInputType
  }

  export type GetSongAggregateType<T extends SongAggregateArgs> = {
        [P in keyof T & keyof AggregateSong]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSong[P]>
      : GetScalarType<T[P], AggregateSong[P]>
  }




  export type SongGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SongWhereInput
    orderBy?: SongOrderByWithAggregationInput | SongOrderByWithAggregationInput[]
    by: SongScalarFieldEnum[] | SongScalarFieldEnum
    having?: SongScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SongCountAggregateInputType | true
    _avg?: SongAvgAggregateInputType
    _sum?: SongSumAggregateInputType
    _min?: SongMinAggregateInputType
    _max?: SongMaxAggregateInputType
  }

  export type SongGroupByOutputType = {
    id: string
    img: string
    title: string
    albumName: string
    artist: string
    genre: string
    releaseDate: string
    duration: string
    plays: number
    song: string
    likes: number
    _count: SongCountAggregateOutputType | null
    _avg: SongAvgAggregateOutputType | null
    _sum: SongSumAggregateOutputType | null
    _min: SongMinAggregateOutputType | null
    _max: SongMaxAggregateOutputType | null
  }

  type GetSongGroupByPayload<T extends SongGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SongGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SongGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SongGroupByOutputType[P]>
            : GetScalarType<T[P], SongGroupByOutputType[P]>
        }
      >
    >


  export type SongSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    img?: boolean
    title?: boolean
    albumName?: boolean
    artist?: boolean
    genre?: boolean
    releaseDate?: boolean
    duration?: boolean
    plays?: boolean
    song?: boolean
    likes?: boolean
    comments?: boolean | Song$commentsArgs<ExtArgs>
    likedByUsers?: boolean | Song$likedByUsersArgs<ExtArgs>
    _count?: boolean | SongCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["song"]>

  export type SongSelectScalar = {
    id?: boolean
    img?: boolean
    title?: boolean
    albumName?: boolean
    artist?: boolean
    genre?: boolean
    releaseDate?: boolean
    duration?: boolean
    plays?: boolean
    song?: boolean
    likes?: boolean
  }

  export type SongInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | Song$commentsArgs<ExtArgs>
    likedByUsers?: boolean | Song$likedByUsersArgs<ExtArgs>
    _count?: boolean | SongCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $SongPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Song"
    objects: {
      comments: Prisma.$SongCommentPayload<ExtArgs>[]
      likedByUsers: Prisma.$UserLikedSongPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      img: string
      title: string
      albumName: string
      artist: string
      genre: string
      releaseDate: string
      duration: string
      plays: number
      song: string
      likes: number
    }, ExtArgs["result"]["song"]>
    composites: {}
  }


  type SongGetPayload<S extends boolean | null | undefined | SongDefaultArgs> = $Result.GetResult<Prisma.$SongPayload, S>

  type SongCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SongFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SongCountAggregateInputType | true
    }

  export interface SongDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Song'], meta: { name: 'Song' } }
    /**
     * Find zero or one Song that matches the filter.
     * @param {SongFindUniqueArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SongFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SongFindUniqueArgs<ExtArgs>>
    ): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Song that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SongFindUniqueOrThrowArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SongFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SongFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Song that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongFindFirstArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SongFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SongFindFirstArgs<ExtArgs>>
    ): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Song that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongFindFirstOrThrowArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SongFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SongFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Songs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Songs
     * const songs = await prisma.song.findMany()
     * 
     * // Get first 10 Songs
     * const songs = await prisma.song.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const songWithIdOnly = await prisma.song.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SongFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SongFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Song.
     * @param {SongCreateArgs} args - Arguments to create a Song.
     * @example
     * // Create one Song
     * const Song = await prisma.song.create({
     *   data: {
     *     // ... data to create a Song
     *   }
     * })
     * 
    **/
    create<T extends SongCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SongCreateArgs<ExtArgs>>
    ): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Songs.
     *     @param {SongCreateManyArgs} args - Arguments to create many Songs.
     *     @example
     *     // Create many Songs
     *     const song = await prisma.song.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SongCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SongCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Song.
     * @param {SongDeleteArgs} args - Arguments to delete one Song.
     * @example
     * // Delete one Song
     * const Song = await prisma.song.delete({
     *   where: {
     *     // ... filter to delete one Song
     *   }
     * })
     * 
    **/
    delete<T extends SongDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SongDeleteArgs<ExtArgs>>
    ): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Song.
     * @param {SongUpdateArgs} args - Arguments to update one Song.
     * @example
     * // Update one Song
     * const song = await prisma.song.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SongUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SongUpdateArgs<ExtArgs>>
    ): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Songs.
     * @param {SongDeleteManyArgs} args - Arguments to filter Songs to delete.
     * @example
     * // Delete a few Songs
     * const { count } = await prisma.song.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SongDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SongDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Songs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Songs
     * const song = await prisma.song.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SongUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SongUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Song.
     * @param {SongUpsertArgs} args - Arguments to update or create a Song.
     * @example
     * // Update or create a Song
     * const song = await prisma.song.upsert({
     *   create: {
     *     // ... data to create a Song
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Song we want to update
     *   }
     * })
    **/
    upsert<T extends SongUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SongUpsertArgs<ExtArgs>>
    ): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more Songs that matches the filter.
     * @param {SongFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const song = await prisma.song.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: SongFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Song.
     * @param {SongAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const song = await prisma.song.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: SongAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of Songs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongCountArgs} args - Arguments to filter Songs to count.
     * @example
     * // Count the number of Songs
     * const count = await prisma.song.count({
     *   where: {
     *     // ... the filter for the Songs we want to count
     *   }
     * })
    **/
    count<T extends SongCountArgs>(
      args?: Subset<T, SongCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SongCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Song.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SongAggregateArgs>(args: Subset<T, SongAggregateArgs>): Prisma.PrismaPromise<GetSongAggregateType<T>>

    /**
     * Group by Song.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SongGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SongGroupByArgs['orderBy'] }
        : { orderBy?: SongGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SongGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSongGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Song model
   */
  readonly fields: SongFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Song.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SongClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    comments<T extends Song$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Song$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongCommentPayload<ExtArgs>, T, 'findMany'> | Null>;

    likedByUsers<T extends Song$likedByUsersArgs<ExtArgs> = {}>(args?: Subset<T, Song$likedByUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Song model
   */ 
  interface SongFieldRefs {
    readonly id: FieldRef<"Song", 'String'>
    readonly img: FieldRef<"Song", 'String'>
    readonly title: FieldRef<"Song", 'String'>
    readonly albumName: FieldRef<"Song", 'String'>
    readonly artist: FieldRef<"Song", 'String'>
    readonly genre: FieldRef<"Song", 'String'>
    readonly releaseDate: FieldRef<"Song", 'String'>
    readonly duration: FieldRef<"Song", 'String'>
    readonly plays: FieldRef<"Song", 'Int'>
    readonly song: FieldRef<"Song", 'String'>
    readonly likes: FieldRef<"Song", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * Song findUnique
   */
  export type SongFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where: SongWhereUniqueInput
  }


  /**
   * Song findUniqueOrThrow
   */
  export type SongFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where: SongWhereUniqueInput
  }


  /**
   * Song findFirst
   */
  export type SongFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Songs.
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Songs.
     */
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }


  /**
   * Song findFirstOrThrow
   */
  export type SongFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Songs.
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Songs.
     */
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }


  /**
   * Song findMany
   */
  export type SongFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Songs to fetch.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Songs.
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }


  /**
   * Song create
   */
  export type SongCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * The data needed to create a Song.
     */
    data: XOR<SongCreateInput, SongUncheckedCreateInput>
  }


  /**
   * Song createMany
   */
  export type SongCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Songs.
     */
    data: SongCreateManyInput | SongCreateManyInput[]
  }


  /**
   * Song update
   */
  export type SongUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * The data needed to update a Song.
     */
    data: XOR<SongUpdateInput, SongUncheckedUpdateInput>
    /**
     * Choose, which Song to update.
     */
    where: SongWhereUniqueInput
  }


  /**
   * Song updateMany
   */
  export type SongUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Songs.
     */
    data: XOR<SongUpdateManyMutationInput, SongUncheckedUpdateManyInput>
    /**
     * Filter which Songs to update
     */
    where?: SongWhereInput
  }


  /**
   * Song upsert
   */
  export type SongUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * The filter to search for the Song to update in case it exists.
     */
    where: SongWhereUniqueInput
    /**
     * In case the Song found by the `where` argument doesn't exist, create a new Song with this data.
     */
    create: XOR<SongCreateInput, SongUncheckedCreateInput>
    /**
     * In case the Song was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SongUpdateInput, SongUncheckedUpdateInput>
  }


  /**
   * Song delete
   */
  export type SongDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter which Song to delete.
     */
    where: SongWhereUniqueInput
  }


  /**
   * Song deleteMany
   */
  export type SongDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Songs to delete
     */
    where?: SongWhereInput
  }


  /**
   * Song findRaw
   */
  export type SongFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Song aggregateRaw
   */
  export type SongAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Song.comments
   */
  export type Song$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
    where?: SongCommentWhereInput
    orderBy?: SongCommentOrderByWithRelationInput | SongCommentOrderByWithRelationInput[]
    cursor?: SongCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SongCommentScalarFieldEnum | SongCommentScalarFieldEnum[]
  }


  /**
   * Song.likedByUsers
   */
  export type Song$likedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    where?: UserLikedSongWhereInput
    orderBy?: UserLikedSongOrderByWithRelationInput | UserLikedSongOrderByWithRelationInput[]
    cursor?: UserLikedSongWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserLikedSongScalarFieldEnum | UserLikedSongScalarFieldEnum[]
  }


  /**
   * Song without action
   */
  export type SongDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongInclude<ExtArgs> | null
  }



  /**
   * Model SongComment
   */

  export type AggregateSongComment = {
    _count: SongCommentCountAggregateOutputType | null
    _avg: SongCommentAvgAggregateOutputType | null
    _sum: SongCommentSumAggregateOutputType | null
    _min: SongCommentMinAggregateOutputType | null
    _max: SongCommentMaxAggregateOutputType | null
  }

  export type SongCommentAvgAggregateOutputType = {
    likes: number | null
  }

  export type SongCommentSumAggregateOutputType = {
    likes: number | null
  }

  export type SongCommentMinAggregateOutputType = {
    id: string | null
    comment: string | null
    songId: string | null
    likes: number | null
  }

  export type SongCommentMaxAggregateOutputType = {
    id: string | null
    comment: string | null
    songId: string | null
    likes: number | null
  }

  export type SongCommentCountAggregateOutputType = {
    id: number
    comment: number
    songId: number
    likes: number
    _all: number
  }


  export type SongCommentAvgAggregateInputType = {
    likes?: true
  }

  export type SongCommentSumAggregateInputType = {
    likes?: true
  }

  export type SongCommentMinAggregateInputType = {
    id?: true
    comment?: true
    songId?: true
    likes?: true
  }

  export type SongCommentMaxAggregateInputType = {
    id?: true
    comment?: true
    songId?: true
    likes?: true
  }

  export type SongCommentCountAggregateInputType = {
    id?: true
    comment?: true
    songId?: true
    likes?: true
    _all?: true
  }

  export type SongCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SongComment to aggregate.
     */
    where?: SongCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongComments to fetch.
     */
    orderBy?: SongCommentOrderByWithRelationInput | SongCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SongCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SongComments
    **/
    _count?: true | SongCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SongCommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SongCommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SongCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SongCommentMaxAggregateInputType
  }

  export type GetSongCommentAggregateType<T extends SongCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateSongComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSongComment[P]>
      : GetScalarType<T[P], AggregateSongComment[P]>
  }




  export type SongCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SongCommentWhereInput
    orderBy?: SongCommentOrderByWithAggregationInput | SongCommentOrderByWithAggregationInput[]
    by: SongCommentScalarFieldEnum[] | SongCommentScalarFieldEnum
    having?: SongCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SongCommentCountAggregateInputType | true
    _avg?: SongCommentAvgAggregateInputType
    _sum?: SongCommentSumAggregateInputType
    _min?: SongCommentMinAggregateInputType
    _max?: SongCommentMaxAggregateInputType
  }

  export type SongCommentGroupByOutputType = {
    id: string
    comment: string
    songId: string
    likes: number
    _count: SongCommentCountAggregateOutputType | null
    _avg: SongCommentAvgAggregateOutputType | null
    _sum: SongCommentSumAggregateOutputType | null
    _min: SongCommentMinAggregateOutputType | null
    _max: SongCommentMaxAggregateOutputType | null
  }

  type GetSongCommentGroupByPayload<T extends SongCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SongCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SongCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SongCommentGroupByOutputType[P]>
            : GetScalarType<T[P], SongCommentGroupByOutputType[P]>
        }
      >
    >


  export type SongCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comment?: boolean
    songId?: boolean
    likes?: boolean
    song?: boolean | SongDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["songComment"]>

  export type SongCommentSelectScalar = {
    id?: boolean
    comment?: boolean
    songId?: boolean
    likes?: boolean
  }

  export type SongCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    song?: boolean | SongDefaultArgs<ExtArgs>
  }


  export type $SongCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SongComment"
    objects: {
      song: Prisma.$SongPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      comment: string
      songId: string
      likes: number
    }, ExtArgs["result"]["songComment"]>
    composites: {}
  }


  type SongCommentGetPayload<S extends boolean | null | undefined | SongCommentDefaultArgs> = $Result.GetResult<Prisma.$SongCommentPayload, S>

  type SongCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SongCommentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SongCommentCountAggregateInputType | true
    }

  export interface SongCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SongComment'], meta: { name: 'SongComment' } }
    /**
     * Find zero or one SongComment that matches the filter.
     * @param {SongCommentFindUniqueArgs} args - Arguments to find a SongComment
     * @example
     * // Get one SongComment
     * const songComment = await prisma.songComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SongCommentFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SongCommentFindUniqueArgs<ExtArgs>>
    ): Prisma__SongCommentClient<$Result.GetResult<Prisma.$SongCommentPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one SongComment that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SongCommentFindUniqueOrThrowArgs} args - Arguments to find a SongComment
     * @example
     * // Get one SongComment
     * const songComment = await prisma.songComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SongCommentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SongCommentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SongCommentClient<$Result.GetResult<Prisma.$SongCommentPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first SongComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongCommentFindFirstArgs} args - Arguments to find a SongComment
     * @example
     * // Get one SongComment
     * const songComment = await prisma.songComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SongCommentFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SongCommentFindFirstArgs<ExtArgs>>
    ): Prisma__SongCommentClient<$Result.GetResult<Prisma.$SongCommentPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first SongComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongCommentFindFirstOrThrowArgs} args - Arguments to find a SongComment
     * @example
     * // Get one SongComment
     * const songComment = await prisma.songComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SongCommentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SongCommentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SongCommentClient<$Result.GetResult<Prisma.$SongCommentPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more SongComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongCommentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SongComments
     * const songComments = await prisma.songComment.findMany()
     * 
     * // Get first 10 SongComments
     * const songComments = await prisma.songComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const songCommentWithIdOnly = await prisma.songComment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SongCommentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SongCommentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongCommentPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a SongComment.
     * @param {SongCommentCreateArgs} args - Arguments to create a SongComment.
     * @example
     * // Create one SongComment
     * const SongComment = await prisma.songComment.create({
     *   data: {
     *     // ... data to create a SongComment
     *   }
     * })
     * 
    **/
    create<T extends SongCommentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SongCommentCreateArgs<ExtArgs>>
    ): Prisma__SongCommentClient<$Result.GetResult<Prisma.$SongCommentPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many SongComments.
     *     @param {SongCommentCreateManyArgs} args - Arguments to create many SongComments.
     *     @example
     *     // Create many SongComments
     *     const songComment = await prisma.songComment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SongCommentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SongCommentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SongComment.
     * @param {SongCommentDeleteArgs} args - Arguments to delete one SongComment.
     * @example
     * // Delete one SongComment
     * const SongComment = await prisma.songComment.delete({
     *   where: {
     *     // ... filter to delete one SongComment
     *   }
     * })
     * 
    **/
    delete<T extends SongCommentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SongCommentDeleteArgs<ExtArgs>>
    ): Prisma__SongCommentClient<$Result.GetResult<Prisma.$SongCommentPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one SongComment.
     * @param {SongCommentUpdateArgs} args - Arguments to update one SongComment.
     * @example
     * // Update one SongComment
     * const songComment = await prisma.songComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SongCommentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SongCommentUpdateArgs<ExtArgs>>
    ): Prisma__SongCommentClient<$Result.GetResult<Prisma.$SongCommentPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more SongComments.
     * @param {SongCommentDeleteManyArgs} args - Arguments to filter SongComments to delete.
     * @example
     * // Delete a few SongComments
     * const { count } = await prisma.songComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SongCommentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SongCommentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SongComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SongComments
     * const songComment = await prisma.songComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SongCommentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SongCommentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SongComment.
     * @param {SongCommentUpsertArgs} args - Arguments to update or create a SongComment.
     * @example
     * // Update or create a SongComment
     * const songComment = await prisma.songComment.upsert({
     *   create: {
     *     // ... data to create a SongComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SongComment we want to update
     *   }
     * })
    **/
    upsert<T extends SongCommentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SongCommentUpsertArgs<ExtArgs>>
    ): Prisma__SongCommentClient<$Result.GetResult<Prisma.$SongCommentPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more SongComments that matches the filter.
     * @param {SongCommentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const songComment = await prisma.songComment.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: SongCommentFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a SongComment.
     * @param {SongCommentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const songComment = await prisma.songComment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: SongCommentAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of SongComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongCommentCountArgs} args - Arguments to filter SongComments to count.
     * @example
     * // Count the number of SongComments
     * const count = await prisma.songComment.count({
     *   where: {
     *     // ... the filter for the SongComments we want to count
     *   }
     * })
    **/
    count<T extends SongCommentCountArgs>(
      args?: Subset<T, SongCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SongCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SongComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SongCommentAggregateArgs>(args: Subset<T, SongCommentAggregateArgs>): Prisma.PrismaPromise<GetSongCommentAggregateType<T>>

    /**
     * Group by SongComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SongCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SongCommentGroupByArgs['orderBy'] }
        : { orderBy?: SongCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SongCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSongCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SongComment model
   */
  readonly fields: SongCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SongComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SongCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    song<T extends SongDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SongDefaultArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the SongComment model
   */ 
  interface SongCommentFieldRefs {
    readonly id: FieldRef<"SongComment", 'String'>
    readonly comment: FieldRef<"SongComment", 'String'>
    readonly songId: FieldRef<"SongComment", 'String'>
    readonly likes: FieldRef<"SongComment", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * SongComment findUnique
   */
  export type SongCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
    /**
     * Filter, which SongComment to fetch.
     */
    where: SongCommentWhereUniqueInput
  }


  /**
   * SongComment findUniqueOrThrow
   */
  export type SongCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
    /**
     * Filter, which SongComment to fetch.
     */
    where: SongCommentWhereUniqueInput
  }


  /**
   * SongComment findFirst
   */
  export type SongCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
    /**
     * Filter, which SongComment to fetch.
     */
    where?: SongCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongComments to fetch.
     */
    orderBy?: SongCommentOrderByWithRelationInput | SongCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SongComments.
     */
    cursor?: SongCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SongComments.
     */
    distinct?: SongCommentScalarFieldEnum | SongCommentScalarFieldEnum[]
  }


  /**
   * SongComment findFirstOrThrow
   */
  export type SongCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
    /**
     * Filter, which SongComment to fetch.
     */
    where?: SongCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongComments to fetch.
     */
    orderBy?: SongCommentOrderByWithRelationInput | SongCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SongComments.
     */
    cursor?: SongCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SongComments.
     */
    distinct?: SongCommentScalarFieldEnum | SongCommentScalarFieldEnum[]
  }


  /**
   * SongComment findMany
   */
  export type SongCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
    /**
     * Filter, which SongComments to fetch.
     */
    where?: SongCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongComments to fetch.
     */
    orderBy?: SongCommentOrderByWithRelationInput | SongCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SongComments.
     */
    cursor?: SongCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongComments.
     */
    skip?: number
    distinct?: SongCommentScalarFieldEnum | SongCommentScalarFieldEnum[]
  }


  /**
   * SongComment create
   */
  export type SongCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a SongComment.
     */
    data: XOR<SongCommentCreateInput, SongCommentUncheckedCreateInput>
  }


  /**
   * SongComment createMany
   */
  export type SongCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SongComments.
     */
    data: SongCommentCreateManyInput | SongCommentCreateManyInput[]
  }


  /**
   * SongComment update
   */
  export type SongCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a SongComment.
     */
    data: XOR<SongCommentUpdateInput, SongCommentUncheckedUpdateInput>
    /**
     * Choose, which SongComment to update.
     */
    where: SongCommentWhereUniqueInput
  }


  /**
   * SongComment updateMany
   */
  export type SongCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SongComments.
     */
    data: XOR<SongCommentUpdateManyMutationInput, SongCommentUncheckedUpdateManyInput>
    /**
     * Filter which SongComments to update
     */
    where?: SongCommentWhereInput
  }


  /**
   * SongComment upsert
   */
  export type SongCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the SongComment to update in case it exists.
     */
    where: SongCommentWhereUniqueInput
    /**
     * In case the SongComment found by the `where` argument doesn't exist, create a new SongComment with this data.
     */
    create: XOR<SongCommentCreateInput, SongCommentUncheckedCreateInput>
    /**
     * In case the SongComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SongCommentUpdateInput, SongCommentUncheckedUpdateInput>
  }


  /**
   * SongComment delete
   */
  export type SongCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
    /**
     * Filter which SongComment to delete.
     */
    where: SongCommentWhereUniqueInput
  }


  /**
   * SongComment deleteMany
   */
  export type SongCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SongComments to delete
     */
    where?: SongCommentWhereInput
  }


  /**
   * SongComment findRaw
   */
  export type SongCommentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * SongComment aggregateRaw
   */
  export type SongCommentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * SongComment without action
   */
  export type SongCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongComment
     */
    select?: SongCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SongCommentInclude<ExtArgs> | null
  }



  /**
   * Model UserLikedSong
   */

  export type AggregateUserLikedSong = {
    _count: UserLikedSongCountAggregateOutputType | null
    _min: UserLikedSongMinAggregateOutputType | null
    _max: UserLikedSongMaxAggregateOutputType | null
  }

  export type UserLikedSongMinAggregateOutputType = {
    id: string | null
    userId: string | null
    likedSongId: string | null
  }

  export type UserLikedSongMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    likedSongId: string | null
  }

  export type UserLikedSongCountAggregateOutputType = {
    id: number
    userId: number
    likedSongId: number
    _all: number
  }


  export type UserLikedSongMinAggregateInputType = {
    id?: true
    userId?: true
    likedSongId?: true
  }

  export type UserLikedSongMaxAggregateInputType = {
    id?: true
    userId?: true
    likedSongId?: true
  }

  export type UserLikedSongCountAggregateInputType = {
    id?: true
    userId?: true
    likedSongId?: true
    _all?: true
  }

  export type UserLikedSongAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLikedSong to aggregate.
     */
    where?: UserLikedSongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedSongs to fetch.
     */
    orderBy?: UserLikedSongOrderByWithRelationInput | UserLikedSongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserLikedSongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedSongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedSongs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserLikedSongs
    **/
    _count?: true | UserLikedSongCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserLikedSongMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserLikedSongMaxAggregateInputType
  }

  export type GetUserLikedSongAggregateType<T extends UserLikedSongAggregateArgs> = {
        [P in keyof T & keyof AggregateUserLikedSong]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserLikedSong[P]>
      : GetScalarType<T[P], AggregateUserLikedSong[P]>
  }




  export type UserLikedSongGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLikedSongWhereInput
    orderBy?: UserLikedSongOrderByWithAggregationInput | UserLikedSongOrderByWithAggregationInput[]
    by: UserLikedSongScalarFieldEnum[] | UserLikedSongScalarFieldEnum
    having?: UserLikedSongScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserLikedSongCountAggregateInputType | true
    _min?: UserLikedSongMinAggregateInputType
    _max?: UserLikedSongMaxAggregateInputType
  }

  export type UserLikedSongGroupByOutputType = {
    id: string
    userId: string
    likedSongId: string
    _count: UserLikedSongCountAggregateOutputType | null
    _min: UserLikedSongMinAggregateOutputType | null
    _max: UserLikedSongMaxAggregateOutputType | null
  }

  type GetUserLikedSongGroupByPayload<T extends UserLikedSongGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserLikedSongGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserLikedSongGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserLikedSongGroupByOutputType[P]>
            : GetScalarType<T[P], UserLikedSongGroupByOutputType[P]>
        }
      >
    >


  export type UserLikedSongSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    likedSongId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    likedSong?: boolean | SongDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userLikedSong"]>

  export type UserLikedSongSelectScalar = {
    id?: boolean
    userId?: boolean
    likedSongId?: boolean
  }

  export type UserLikedSongInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    likedSong?: boolean | SongDefaultArgs<ExtArgs>
  }


  export type $UserLikedSongPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserLikedSong"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      likedSong: Prisma.$SongPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      likedSongId: string
    }, ExtArgs["result"]["userLikedSong"]>
    composites: {}
  }


  type UserLikedSongGetPayload<S extends boolean | null | undefined | UserLikedSongDefaultArgs> = $Result.GetResult<Prisma.$UserLikedSongPayload, S>

  type UserLikedSongCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserLikedSongFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserLikedSongCountAggregateInputType | true
    }

  export interface UserLikedSongDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserLikedSong'], meta: { name: 'UserLikedSong' } }
    /**
     * Find zero or one UserLikedSong that matches the filter.
     * @param {UserLikedSongFindUniqueArgs} args - Arguments to find a UserLikedSong
     * @example
     * // Get one UserLikedSong
     * const userLikedSong = await prisma.userLikedSong.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserLikedSongFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedSongFindUniqueArgs<ExtArgs>>
    ): Prisma__UserLikedSongClient<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserLikedSong that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserLikedSongFindUniqueOrThrowArgs} args - Arguments to find a UserLikedSong
     * @example
     * // Get one UserLikedSong
     * const userLikedSong = await prisma.userLikedSong.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserLikedSongFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedSongFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserLikedSongClient<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserLikedSong that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedSongFindFirstArgs} args - Arguments to find a UserLikedSong
     * @example
     * // Get one UserLikedSong
     * const userLikedSong = await prisma.userLikedSong.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserLikedSongFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedSongFindFirstArgs<ExtArgs>>
    ): Prisma__UserLikedSongClient<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserLikedSong that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedSongFindFirstOrThrowArgs} args - Arguments to find a UserLikedSong
     * @example
     * // Get one UserLikedSong
     * const userLikedSong = await prisma.userLikedSong.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserLikedSongFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedSongFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserLikedSongClient<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserLikedSongs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedSongFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserLikedSongs
     * const userLikedSongs = await prisma.userLikedSong.findMany()
     * 
     * // Get first 10 UserLikedSongs
     * const userLikedSongs = await prisma.userLikedSong.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userLikedSongWithIdOnly = await prisma.userLikedSong.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserLikedSongFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedSongFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserLikedSong.
     * @param {UserLikedSongCreateArgs} args - Arguments to create a UserLikedSong.
     * @example
     * // Create one UserLikedSong
     * const UserLikedSong = await prisma.userLikedSong.create({
     *   data: {
     *     // ... data to create a UserLikedSong
     *   }
     * })
     * 
    **/
    create<T extends UserLikedSongCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedSongCreateArgs<ExtArgs>>
    ): Prisma__UserLikedSongClient<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserLikedSongs.
     *     @param {UserLikedSongCreateManyArgs} args - Arguments to create many UserLikedSongs.
     *     @example
     *     // Create many UserLikedSongs
     *     const userLikedSong = await prisma.userLikedSong.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserLikedSongCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedSongCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserLikedSong.
     * @param {UserLikedSongDeleteArgs} args - Arguments to delete one UserLikedSong.
     * @example
     * // Delete one UserLikedSong
     * const UserLikedSong = await prisma.userLikedSong.delete({
     *   where: {
     *     // ... filter to delete one UserLikedSong
     *   }
     * })
     * 
    **/
    delete<T extends UserLikedSongDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedSongDeleteArgs<ExtArgs>>
    ): Prisma__UserLikedSongClient<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserLikedSong.
     * @param {UserLikedSongUpdateArgs} args - Arguments to update one UserLikedSong.
     * @example
     * // Update one UserLikedSong
     * const userLikedSong = await prisma.userLikedSong.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserLikedSongUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedSongUpdateArgs<ExtArgs>>
    ): Prisma__UserLikedSongClient<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserLikedSongs.
     * @param {UserLikedSongDeleteManyArgs} args - Arguments to filter UserLikedSongs to delete.
     * @example
     * // Delete a few UserLikedSongs
     * const { count } = await prisma.userLikedSong.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserLikedSongDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedSongDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserLikedSongs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedSongUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserLikedSongs
     * const userLikedSong = await prisma.userLikedSong.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserLikedSongUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedSongUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserLikedSong.
     * @param {UserLikedSongUpsertArgs} args - Arguments to update or create a UserLikedSong.
     * @example
     * // Update or create a UserLikedSong
     * const userLikedSong = await prisma.userLikedSong.upsert({
     *   create: {
     *     // ... data to create a UserLikedSong
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserLikedSong we want to update
     *   }
     * })
    **/
    upsert<T extends UserLikedSongUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedSongUpsertArgs<ExtArgs>>
    ): Prisma__UserLikedSongClient<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more UserLikedSongs that matches the filter.
     * @param {UserLikedSongFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userLikedSong = await prisma.userLikedSong.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: UserLikedSongFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserLikedSong.
     * @param {UserLikedSongAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userLikedSong = await prisma.userLikedSong.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: UserLikedSongAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of UserLikedSongs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedSongCountArgs} args - Arguments to filter UserLikedSongs to count.
     * @example
     * // Count the number of UserLikedSongs
     * const count = await prisma.userLikedSong.count({
     *   where: {
     *     // ... the filter for the UserLikedSongs we want to count
     *   }
     * })
    **/
    count<T extends UserLikedSongCountArgs>(
      args?: Subset<T, UserLikedSongCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserLikedSongCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserLikedSong.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedSongAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserLikedSongAggregateArgs>(args: Subset<T, UserLikedSongAggregateArgs>): Prisma.PrismaPromise<GetUserLikedSongAggregateType<T>>

    /**
     * Group by UserLikedSong.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedSongGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserLikedSongGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserLikedSongGroupByArgs['orderBy'] }
        : { orderBy?: UserLikedSongGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserLikedSongGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserLikedSongGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserLikedSong model
   */
  readonly fields: UserLikedSongFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserLikedSong.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserLikedSongClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    likedSong<T extends SongDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SongDefaultArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the UserLikedSong model
   */ 
  interface UserLikedSongFieldRefs {
    readonly id: FieldRef<"UserLikedSong", 'String'>
    readonly userId: FieldRef<"UserLikedSong", 'String'>
    readonly likedSongId: FieldRef<"UserLikedSong", 'String'>
  }
    

  // Custom InputTypes

  /**
   * UserLikedSong findUnique
   */
  export type UserLikedSongFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedSong to fetch.
     */
    where: UserLikedSongWhereUniqueInput
  }


  /**
   * UserLikedSong findUniqueOrThrow
   */
  export type UserLikedSongFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedSong to fetch.
     */
    where: UserLikedSongWhereUniqueInput
  }


  /**
   * UserLikedSong findFirst
   */
  export type UserLikedSongFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedSong to fetch.
     */
    where?: UserLikedSongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedSongs to fetch.
     */
    orderBy?: UserLikedSongOrderByWithRelationInput | UserLikedSongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLikedSongs.
     */
    cursor?: UserLikedSongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedSongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedSongs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLikedSongs.
     */
    distinct?: UserLikedSongScalarFieldEnum | UserLikedSongScalarFieldEnum[]
  }


  /**
   * UserLikedSong findFirstOrThrow
   */
  export type UserLikedSongFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedSong to fetch.
     */
    where?: UserLikedSongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedSongs to fetch.
     */
    orderBy?: UserLikedSongOrderByWithRelationInput | UserLikedSongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLikedSongs.
     */
    cursor?: UserLikedSongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedSongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedSongs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLikedSongs.
     */
    distinct?: UserLikedSongScalarFieldEnum | UserLikedSongScalarFieldEnum[]
  }


  /**
   * UserLikedSong findMany
   */
  export type UserLikedSongFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedSongs to fetch.
     */
    where?: UserLikedSongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedSongs to fetch.
     */
    orderBy?: UserLikedSongOrderByWithRelationInput | UserLikedSongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserLikedSongs.
     */
    cursor?: UserLikedSongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedSongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedSongs.
     */
    skip?: number
    distinct?: UserLikedSongScalarFieldEnum | UserLikedSongScalarFieldEnum[]
  }


  /**
   * UserLikedSong create
   */
  export type UserLikedSongCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    /**
     * The data needed to create a UserLikedSong.
     */
    data: XOR<UserLikedSongCreateInput, UserLikedSongUncheckedCreateInput>
  }


  /**
   * UserLikedSong createMany
   */
  export type UserLikedSongCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserLikedSongs.
     */
    data: UserLikedSongCreateManyInput | UserLikedSongCreateManyInput[]
  }


  /**
   * UserLikedSong update
   */
  export type UserLikedSongUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    /**
     * The data needed to update a UserLikedSong.
     */
    data: XOR<UserLikedSongUpdateInput, UserLikedSongUncheckedUpdateInput>
    /**
     * Choose, which UserLikedSong to update.
     */
    where: UserLikedSongWhereUniqueInput
  }


  /**
   * UserLikedSong updateMany
   */
  export type UserLikedSongUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserLikedSongs.
     */
    data: XOR<UserLikedSongUpdateManyMutationInput, UserLikedSongUncheckedUpdateManyInput>
    /**
     * Filter which UserLikedSongs to update
     */
    where?: UserLikedSongWhereInput
  }


  /**
   * UserLikedSong upsert
   */
  export type UserLikedSongUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    /**
     * The filter to search for the UserLikedSong to update in case it exists.
     */
    where: UserLikedSongWhereUniqueInput
    /**
     * In case the UserLikedSong found by the `where` argument doesn't exist, create a new UserLikedSong with this data.
     */
    create: XOR<UserLikedSongCreateInput, UserLikedSongUncheckedCreateInput>
    /**
     * In case the UserLikedSong was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserLikedSongUpdateInput, UserLikedSongUncheckedUpdateInput>
  }


  /**
   * UserLikedSong delete
   */
  export type UserLikedSongDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    /**
     * Filter which UserLikedSong to delete.
     */
    where: UserLikedSongWhereUniqueInput
  }


  /**
   * UserLikedSong deleteMany
   */
  export type UserLikedSongDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLikedSongs to delete
     */
    where?: UserLikedSongWhereInput
  }


  /**
   * UserLikedSong findRaw
   */
  export type UserLikedSongFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * UserLikedSong aggregateRaw
   */
  export type UserLikedSongAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * UserLikedSong without action
   */
  export type UserLikedSongDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
  }



  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    address?: boolean | AddressDefaultArgs<ExtArgs>
    likedWebsites?: boolean | User$likedWebsitesArgs<ExtArgs>
    likedSongs?: boolean | User$likedSongsArgs<ExtArgs>
    likedArtists?: boolean | User$likedArtistsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    likedWebsites?: boolean | User$likedWebsitesArgs<ExtArgs>
    likedSongs?: boolean | User$likedSongsArgs<ExtArgs>
    likedArtists?: boolean | User$likedArtistsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      likedWebsites: Prisma.$UserLikedWebsitePayload<ExtArgs>[]
      likedSongs: Prisma.$UserLikedSongPayload<ExtArgs>[]
      likedArtists: Prisma.$UserLikedArtistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
    }, ExtArgs["result"]["user"]>
    composites: {
      address: Prisma.$AddressPayload | null
    }
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: UserFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: UserAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    likedWebsites<T extends User$likedWebsitesArgs<ExtArgs> = {}>(args?: Subset<T, User$likedWebsitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'findMany'> | Null>;

    likedSongs<T extends User$likedSongsArgs<ExtArgs> = {}>(args?: Subset<T, User$likedSongsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLikedSongPayload<ExtArgs>, T, 'findMany'> | Null>;

    likedArtists<T extends User$likedArtistsArgs<ExtArgs> = {}>(args?: Subset<T, User$likedArtistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * User.likedWebsites
   */
  export type User$likedWebsitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    where?: UserLikedWebsiteWhereInput
    orderBy?: UserLikedWebsiteOrderByWithRelationInput | UserLikedWebsiteOrderByWithRelationInput[]
    cursor?: UserLikedWebsiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserLikedWebsiteScalarFieldEnum | UserLikedWebsiteScalarFieldEnum[]
  }


  /**
   * User.likedSongs
   */
  export type User$likedSongsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedSong
     */
    select?: UserLikedSongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedSongInclude<ExtArgs> | null
    where?: UserLikedSongWhereInput
    orderBy?: UserLikedSongOrderByWithRelationInput | UserLikedSongOrderByWithRelationInput[]
    cursor?: UserLikedSongWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserLikedSongScalarFieldEnum | UserLikedSongScalarFieldEnum[]
  }


  /**
   * User.likedArtists
   */
  export type User$likedArtistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    where?: UserLikedArtistWhereInput
    orderBy?: UserLikedArtistOrderByWithRelationInput | UserLikedArtistOrderByWithRelationInput[]
    cursor?: UserLikedArtistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserLikedArtistScalarFieldEnum | UserLikedArtistScalarFieldEnum[]
  }


  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model UserLikedWebsite
   */

  export type AggregateUserLikedWebsite = {
    _count: UserLikedWebsiteCountAggregateOutputType | null
    _min: UserLikedWebsiteMinAggregateOutputType | null
    _max: UserLikedWebsiteMaxAggregateOutputType | null
  }

  export type UserLikedWebsiteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    likedWebsiteId: string | null
  }

  export type UserLikedWebsiteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    likedWebsiteId: string | null
  }

  export type UserLikedWebsiteCountAggregateOutputType = {
    id: number
    userId: number
    likedWebsiteId: number
    _all: number
  }


  export type UserLikedWebsiteMinAggregateInputType = {
    id?: true
    userId?: true
    likedWebsiteId?: true
  }

  export type UserLikedWebsiteMaxAggregateInputType = {
    id?: true
    userId?: true
    likedWebsiteId?: true
  }

  export type UserLikedWebsiteCountAggregateInputType = {
    id?: true
    userId?: true
    likedWebsiteId?: true
    _all?: true
  }

  export type UserLikedWebsiteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLikedWebsite to aggregate.
     */
    where?: UserLikedWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedWebsites to fetch.
     */
    orderBy?: UserLikedWebsiteOrderByWithRelationInput | UserLikedWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserLikedWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserLikedWebsites
    **/
    _count?: true | UserLikedWebsiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserLikedWebsiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserLikedWebsiteMaxAggregateInputType
  }

  export type GetUserLikedWebsiteAggregateType<T extends UserLikedWebsiteAggregateArgs> = {
        [P in keyof T & keyof AggregateUserLikedWebsite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserLikedWebsite[P]>
      : GetScalarType<T[P], AggregateUserLikedWebsite[P]>
  }




  export type UserLikedWebsiteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLikedWebsiteWhereInput
    orderBy?: UserLikedWebsiteOrderByWithAggregationInput | UserLikedWebsiteOrderByWithAggregationInput[]
    by: UserLikedWebsiteScalarFieldEnum[] | UserLikedWebsiteScalarFieldEnum
    having?: UserLikedWebsiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserLikedWebsiteCountAggregateInputType | true
    _min?: UserLikedWebsiteMinAggregateInputType
    _max?: UserLikedWebsiteMaxAggregateInputType
  }

  export type UserLikedWebsiteGroupByOutputType = {
    id: string
    userId: string
    likedWebsiteId: string
    _count: UserLikedWebsiteCountAggregateOutputType | null
    _min: UserLikedWebsiteMinAggregateOutputType | null
    _max: UserLikedWebsiteMaxAggregateOutputType | null
  }

  type GetUserLikedWebsiteGroupByPayload<T extends UserLikedWebsiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserLikedWebsiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserLikedWebsiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserLikedWebsiteGroupByOutputType[P]>
            : GetScalarType<T[P], UserLikedWebsiteGroupByOutputType[P]>
        }
      >
    >


  export type UserLikedWebsiteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    likedWebsiteId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    likedWebsite?: boolean | WebsiteProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userLikedWebsite"]>

  export type UserLikedWebsiteSelectScalar = {
    id?: boolean
    userId?: boolean
    likedWebsiteId?: boolean
  }

  export type UserLikedWebsiteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    likedWebsite?: boolean | WebsiteProjectDefaultArgs<ExtArgs>
  }


  export type $UserLikedWebsitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserLikedWebsite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      likedWebsite: Prisma.$WebsiteProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      likedWebsiteId: string
    }, ExtArgs["result"]["userLikedWebsite"]>
    composites: {}
  }


  type UserLikedWebsiteGetPayload<S extends boolean | null | undefined | UserLikedWebsiteDefaultArgs> = $Result.GetResult<Prisma.$UserLikedWebsitePayload, S>

  type UserLikedWebsiteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserLikedWebsiteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserLikedWebsiteCountAggregateInputType | true
    }

  export interface UserLikedWebsiteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserLikedWebsite'], meta: { name: 'UserLikedWebsite' } }
    /**
     * Find zero or one UserLikedWebsite that matches the filter.
     * @param {UserLikedWebsiteFindUniqueArgs} args - Arguments to find a UserLikedWebsite
     * @example
     * // Get one UserLikedWebsite
     * const userLikedWebsite = await prisma.userLikedWebsite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserLikedWebsiteFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedWebsiteFindUniqueArgs<ExtArgs>>
    ): Prisma__UserLikedWebsiteClient<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserLikedWebsite that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserLikedWebsiteFindUniqueOrThrowArgs} args - Arguments to find a UserLikedWebsite
     * @example
     * // Get one UserLikedWebsite
     * const userLikedWebsite = await prisma.userLikedWebsite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserLikedWebsiteFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedWebsiteFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserLikedWebsiteClient<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserLikedWebsite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedWebsiteFindFirstArgs} args - Arguments to find a UserLikedWebsite
     * @example
     * // Get one UserLikedWebsite
     * const userLikedWebsite = await prisma.userLikedWebsite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserLikedWebsiteFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedWebsiteFindFirstArgs<ExtArgs>>
    ): Prisma__UserLikedWebsiteClient<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserLikedWebsite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedWebsiteFindFirstOrThrowArgs} args - Arguments to find a UserLikedWebsite
     * @example
     * // Get one UserLikedWebsite
     * const userLikedWebsite = await prisma.userLikedWebsite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserLikedWebsiteFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedWebsiteFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserLikedWebsiteClient<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserLikedWebsites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedWebsiteFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserLikedWebsites
     * const userLikedWebsites = await prisma.userLikedWebsite.findMany()
     * 
     * // Get first 10 UserLikedWebsites
     * const userLikedWebsites = await prisma.userLikedWebsite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userLikedWebsiteWithIdOnly = await prisma.userLikedWebsite.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserLikedWebsiteFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedWebsiteFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserLikedWebsite.
     * @param {UserLikedWebsiteCreateArgs} args - Arguments to create a UserLikedWebsite.
     * @example
     * // Create one UserLikedWebsite
     * const UserLikedWebsite = await prisma.userLikedWebsite.create({
     *   data: {
     *     // ... data to create a UserLikedWebsite
     *   }
     * })
     * 
    **/
    create<T extends UserLikedWebsiteCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedWebsiteCreateArgs<ExtArgs>>
    ): Prisma__UserLikedWebsiteClient<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserLikedWebsites.
     *     @param {UserLikedWebsiteCreateManyArgs} args - Arguments to create many UserLikedWebsites.
     *     @example
     *     // Create many UserLikedWebsites
     *     const userLikedWebsite = await prisma.userLikedWebsite.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserLikedWebsiteCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedWebsiteCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserLikedWebsite.
     * @param {UserLikedWebsiteDeleteArgs} args - Arguments to delete one UserLikedWebsite.
     * @example
     * // Delete one UserLikedWebsite
     * const UserLikedWebsite = await prisma.userLikedWebsite.delete({
     *   where: {
     *     // ... filter to delete one UserLikedWebsite
     *   }
     * })
     * 
    **/
    delete<T extends UserLikedWebsiteDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedWebsiteDeleteArgs<ExtArgs>>
    ): Prisma__UserLikedWebsiteClient<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserLikedWebsite.
     * @param {UserLikedWebsiteUpdateArgs} args - Arguments to update one UserLikedWebsite.
     * @example
     * // Update one UserLikedWebsite
     * const userLikedWebsite = await prisma.userLikedWebsite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserLikedWebsiteUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedWebsiteUpdateArgs<ExtArgs>>
    ): Prisma__UserLikedWebsiteClient<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserLikedWebsites.
     * @param {UserLikedWebsiteDeleteManyArgs} args - Arguments to filter UserLikedWebsites to delete.
     * @example
     * // Delete a few UserLikedWebsites
     * const { count } = await prisma.userLikedWebsite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserLikedWebsiteDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedWebsiteDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserLikedWebsites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedWebsiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserLikedWebsites
     * const userLikedWebsite = await prisma.userLikedWebsite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserLikedWebsiteUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedWebsiteUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserLikedWebsite.
     * @param {UserLikedWebsiteUpsertArgs} args - Arguments to update or create a UserLikedWebsite.
     * @example
     * // Update or create a UserLikedWebsite
     * const userLikedWebsite = await prisma.userLikedWebsite.upsert({
     *   create: {
     *     // ... data to create a UserLikedWebsite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserLikedWebsite we want to update
     *   }
     * })
    **/
    upsert<T extends UserLikedWebsiteUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedWebsiteUpsertArgs<ExtArgs>>
    ): Prisma__UserLikedWebsiteClient<$Result.GetResult<Prisma.$UserLikedWebsitePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more UserLikedWebsites that matches the filter.
     * @param {UserLikedWebsiteFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userLikedWebsite = await prisma.userLikedWebsite.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: UserLikedWebsiteFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserLikedWebsite.
     * @param {UserLikedWebsiteAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userLikedWebsite = await prisma.userLikedWebsite.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: UserLikedWebsiteAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of UserLikedWebsites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedWebsiteCountArgs} args - Arguments to filter UserLikedWebsites to count.
     * @example
     * // Count the number of UserLikedWebsites
     * const count = await prisma.userLikedWebsite.count({
     *   where: {
     *     // ... the filter for the UserLikedWebsites we want to count
     *   }
     * })
    **/
    count<T extends UserLikedWebsiteCountArgs>(
      args?: Subset<T, UserLikedWebsiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserLikedWebsiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserLikedWebsite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedWebsiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserLikedWebsiteAggregateArgs>(args: Subset<T, UserLikedWebsiteAggregateArgs>): Prisma.PrismaPromise<GetUserLikedWebsiteAggregateType<T>>

    /**
     * Group by UserLikedWebsite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedWebsiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserLikedWebsiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserLikedWebsiteGroupByArgs['orderBy'] }
        : { orderBy?: UserLikedWebsiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserLikedWebsiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserLikedWebsiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserLikedWebsite model
   */
  readonly fields: UserLikedWebsiteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserLikedWebsite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserLikedWebsiteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    likedWebsite<T extends WebsiteProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WebsiteProjectDefaultArgs<ExtArgs>>): Prisma__WebsiteProjectClient<$Result.GetResult<Prisma.$WebsiteProjectPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the UserLikedWebsite model
   */ 
  interface UserLikedWebsiteFieldRefs {
    readonly id: FieldRef<"UserLikedWebsite", 'String'>
    readonly userId: FieldRef<"UserLikedWebsite", 'String'>
    readonly likedWebsiteId: FieldRef<"UserLikedWebsite", 'String'>
  }
    

  // Custom InputTypes

  /**
   * UserLikedWebsite findUnique
   */
  export type UserLikedWebsiteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedWebsite to fetch.
     */
    where: UserLikedWebsiteWhereUniqueInput
  }


  /**
   * UserLikedWebsite findUniqueOrThrow
   */
  export type UserLikedWebsiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedWebsite to fetch.
     */
    where: UserLikedWebsiteWhereUniqueInput
  }


  /**
   * UserLikedWebsite findFirst
   */
  export type UserLikedWebsiteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedWebsite to fetch.
     */
    where?: UserLikedWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedWebsites to fetch.
     */
    orderBy?: UserLikedWebsiteOrderByWithRelationInput | UserLikedWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLikedWebsites.
     */
    cursor?: UserLikedWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLikedWebsites.
     */
    distinct?: UserLikedWebsiteScalarFieldEnum | UserLikedWebsiteScalarFieldEnum[]
  }


  /**
   * UserLikedWebsite findFirstOrThrow
   */
  export type UserLikedWebsiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedWebsite to fetch.
     */
    where?: UserLikedWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedWebsites to fetch.
     */
    orderBy?: UserLikedWebsiteOrderByWithRelationInput | UserLikedWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLikedWebsites.
     */
    cursor?: UserLikedWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLikedWebsites.
     */
    distinct?: UserLikedWebsiteScalarFieldEnum | UserLikedWebsiteScalarFieldEnum[]
  }


  /**
   * UserLikedWebsite findMany
   */
  export type UserLikedWebsiteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedWebsites to fetch.
     */
    where?: UserLikedWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedWebsites to fetch.
     */
    orderBy?: UserLikedWebsiteOrderByWithRelationInput | UserLikedWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserLikedWebsites.
     */
    cursor?: UserLikedWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedWebsites.
     */
    skip?: number
    distinct?: UserLikedWebsiteScalarFieldEnum | UserLikedWebsiteScalarFieldEnum[]
  }


  /**
   * UserLikedWebsite create
   */
  export type UserLikedWebsiteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    /**
     * The data needed to create a UserLikedWebsite.
     */
    data: XOR<UserLikedWebsiteCreateInput, UserLikedWebsiteUncheckedCreateInput>
  }


  /**
   * UserLikedWebsite createMany
   */
  export type UserLikedWebsiteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserLikedWebsites.
     */
    data: UserLikedWebsiteCreateManyInput | UserLikedWebsiteCreateManyInput[]
  }


  /**
   * UserLikedWebsite update
   */
  export type UserLikedWebsiteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    /**
     * The data needed to update a UserLikedWebsite.
     */
    data: XOR<UserLikedWebsiteUpdateInput, UserLikedWebsiteUncheckedUpdateInput>
    /**
     * Choose, which UserLikedWebsite to update.
     */
    where: UserLikedWebsiteWhereUniqueInput
  }


  /**
   * UserLikedWebsite updateMany
   */
  export type UserLikedWebsiteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserLikedWebsites.
     */
    data: XOR<UserLikedWebsiteUpdateManyMutationInput, UserLikedWebsiteUncheckedUpdateManyInput>
    /**
     * Filter which UserLikedWebsites to update
     */
    where?: UserLikedWebsiteWhereInput
  }


  /**
   * UserLikedWebsite upsert
   */
  export type UserLikedWebsiteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    /**
     * The filter to search for the UserLikedWebsite to update in case it exists.
     */
    where: UserLikedWebsiteWhereUniqueInput
    /**
     * In case the UserLikedWebsite found by the `where` argument doesn't exist, create a new UserLikedWebsite with this data.
     */
    create: XOR<UserLikedWebsiteCreateInput, UserLikedWebsiteUncheckedCreateInput>
    /**
     * In case the UserLikedWebsite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserLikedWebsiteUpdateInput, UserLikedWebsiteUncheckedUpdateInput>
  }


  /**
   * UserLikedWebsite delete
   */
  export type UserLikedWebsiteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
    /**
     * Filter which UserLikedWebsite to delete.
     */
    where: UserLikedWebsiteWhereUniqueInput
  }


  /**
   * UserLikedWebsite deleteMany
   */
  export type UserLikedWebsiteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLikedWebsites to delete
     */
    where?: UserLikedWebsiteWhereInput
  }


  /**
   * UserLikedWebsite findRaw
   */
  export type UserLikedWebsiteFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * UserLikedWebsite aggregateRaw
   */
  export type UserLikedWebsiteAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * UserLikedWebsite without action
   */
  export type UserLikedWebsiteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedWebsite
     */
    select?: UserLikedWebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedWebsiteInclude<ExtArgs> | null
  }



  /**
   * Model Artist
   */

  export type AggregateArtist = {
    _count: ArtistCountAggregateOutputType | null
    _avg: ArtistAvgAggregateOutputType | null
    _sum: ArtistSumAggregateOutputType | null
    _min: ArtistMinAggregateOutputType | null
    _max: ArtistMaxAggregateOutputType | null
  }

  export type ArtistAvgAggregateOutputType = {
    likes: number | null
  }

  export type ArtistSumAggregateOutputType = {
    likes: number | null
  }

  export type ArtistMinAggregateOutputType = {
    id: string | null
    img: string | null
    title: string | null
    genre: string | null
    description: string | null
    releaseDate: string | null
    likes: number | null
  }

  export type ArtistMaxAggregateOutputType = {
    id: string | null
    img: string | null
    title: string | null
    genre: string | null
    description: string | null
    releaseDate: string | null
    likes: number | null
  }

  export type ArtistCountAggregateOutputType = {
    id: number
    img: number
    title: number
    genre: number
    description: number
    releaseDate: number
    likes: number
    _all: number
  }


  export type ArtistAvgAggregateInputType = {
    likes?: true
  }

  export type ArtistSumAggregateInputType = {
    likes?: true
  }

  export type ArtistMinAggregateInputType = {
    id?: true
    img?: true
    title?: true
    genre?: true
    description?: true
    releaseDate?: true
    likes?: true
  }

  export type ArtistMaxAggregateInputType = {
    id?: true
    img?: true
    title?: true
    genre?: true
    description?: true
    releaseDate?: true
    likes?: true
  }

  export type ArtistCountAggregateInputType = {
    id?: true
    img?: true
    title?: true
    genre?: true
    description?: true
    releaseDate?: true
    likes?: true
    _all?: true
  }

  export type ArtistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artist to aggregate.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Artists
    **/
    _count?: true | ArtistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtistMaxAggregateInputType
  }

  export type GetArtistAggregateType<T extends ArtistAggregateArgs> = {
        [P in keyof T & keyof AggregateArtist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtist[P]>
      : GetScalarType<T[P], AggregateArtist[P]>
  }




  export type ArtistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtistWhereInput
    orderBy?: ArtistOrderByWithAggregationInput | ArtistOrderByWithAggregationInput[]
    by: ArtistScalarFieldEnum[] | ArtistScalarFieldEnum
    having?: ArtistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtistCountAggregateInputType | true
    _avg?: ArtistAvgAggregateInputType
    _sum?: ArtistSumAggregateInputType
    _min?: ArtistMinAggregateInputType
    _max?: ArtistMaxAggregateInputType
  }

  export type ArtistGroupByOutputType = {
    id: string
    img: string
    title: string
    genre: string
    description: string
    releaseDate: string
    likes: number
    _count: ArtistCountAggregateOutputType | null
    _avg: ArtistAvgAggregateOutputType | null
    _sum: ArtistSumAggregateOutputType | null
    _min: ArtistMinAggregateOutputType | null
    _max: ArtistMaxAggregateOutputType | null
  }

  type GetArtistGroupByPayload<T extends ArtistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtistGroupByOutputType[P]>
            : GetScalarType<T[P], ArtistGroupByOutputType[P]>
        }
      >
    >


  export type ArtistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    img?: boolean
    title?: boolean
    genre?: boolean
    description?: boolean
    releaseDate?: boolean
    likes?: boolean
    comments?: boolean | Artist$commentsArgs<ExtArgs>
    likedByUsers?: boolean | Artist$likedByUsersArgs<ExtArgs>
    _count?: boolean | ArtistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artist"]>

  export type ArtistSelectScalar = {
    id?: boolean
    img?: boolean
    title?: boolean
    genre?: boolean
    description?: boolean
    releaseDate?: boolean
    likes?: boolean
  }

  export type ArtistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | Artist$commentsArgs<ExtArgs>
    likedByUsers?: boolean | Artist$likedByUsersArgs<ExtArgs>
    _count?: boolean | ArtistCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ArtistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Artist"
    objects: {
      comments: Prisma.$ArtistCommentPayload<ExtArgs>[]
      likedByUsers: Prisma.$UserLikedArtistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      img: string
      title: string
      genre: string
      description: string
      releaseDate: string
      likes: number
    }, ExtArgs["result"]["artist"]>
    composites: {}
  }


  type ArtistGetPayload<S extends boolean | null | undefined | ArtistDefaultArgs> = $Result.GetResult<Prisma.$ArtistPayload, S>

  type ArtistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ArtistFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ArtistCountAggregateInputType | true
    }

  export interface ArtistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Artist'], meta: { name: 'Artist' } }
    /**
     * Find zero or one Artist that matches the filter.
     * @param {ArtistFindUniqueArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ArtistFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistFindUniqueArgs<ExtArgs>>
    ): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Artist that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ArtistFindUniqueOrThrowArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ArtistFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Artist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistFindFirstArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ArtistFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistFindFirstArgs<ExtArgs>>
    ): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Artist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistFindFirstOrThrowArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ArtistFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Artists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Artists
     * const artists = await prisma.artist.findMany()
     * 
     * // Get first 10 Artists
     * const artists = await prisma.artist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artistWithIdOnly = await prisma.artist.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ArtistFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Artist.
     * @param {ArtistCreateArgs} args - Arguments to create a Artist.
     * @example
     * // Create one Artist
     * const Artist = await prisma.artist.create({
     *   data: {
     *     // ... data to create a Artist
     *   }
     * })
     * 
    **/
    create<T extends ArtistCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistCreateArgs<ExtArgs>>
    ): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Artists.
     *     @param {ArtistCreateManyArgs} args - Arguments to create many Artists.
     *     @example
     *     // Create many Artists
     *     const artist = await prisma.artist.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ArtistCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Artist.
     * @param {ArtistDeleteArgs} args - Arguments to delete one Artist.
     * @example
     * // Delete one Artist
     * const Artist = await prisma.artist.delete({
     *   where: {
     *     // ... filter to delete one Artist
     *   }
     * })
     * 
    **/
    delete<T extends ArtistDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistDeleteArgs<ExtArgs>>
    ): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Artist.
     * @param {ArtistUpdateArgs} args - Arguments to update one Artist.
     * @example
     * // Update one Artist
     * const artist = await prisma.artist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ArtistUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistUpdateArgs<ExtArgs>>
    ): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Artists.
     * @param {ArtistDeleteManyArgs} args - Arguments to filter Artists to delete.
     * @example
     * // Delete a few Artists
     * const { count } = await prisma.artist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ArtistDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Artists
     * const artist = await prisma.artist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ArtistUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Artist.
     * @param {ArtistUpsertArgs} args - Arguments to update or create a Artist.
     * @example
     * // Update or create a Artist
     * const artist = await prisma.artist.upsert({
     *   create: {
     *     // ... data to create a Artist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Artist we want to update
     *   }
     * })
    **/
    upsert<T extends ArtistUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistUpsertArgs<ExtArgs>>
    ): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more Artists that matches the filter.
     * @param {ArtistFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const artist = await prisma.artist.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ArtistFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Artist.
     * @param {ArtistAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const artist = await prisma.artist.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ArtistAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of Artists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistCountArgs} args - Arguments to filter Artists to count.
     * @example
     * // Count the number of Artists
     * const count = await prisma.artist.count({
     *   where: {
     *     // ... the filter for the Artists we want to count
     *   }
     * })
    **/
    count<T extends ArtistCountArgs>(
      args?: Subset<T, ArtistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Artist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtistAggregateArgs>(args: Subset<T, ArtistAggregateArgs>): Prisma.PrismaPromise<GetArtistAggregateType<T>>

    /**
     * Group by Artist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArtistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtistGroupByArgs['orderBy'] }
        : { orderBy?: ArtistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArtistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Artist model
   */
  readonly fields: ArtistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Artist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    comments<T extends Artist$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Artist$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtistCommentPayload<ExtArgs>, T, 'findMany'> | Null>;

    likedByUsers<T extends Artist$likedByUsersArgs<ExtArgs> = {}>(args?: Subset<T, Artist$likedByUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Artist model
   */ 
  interface ArtistFieldRefs {
    readonly id: FieldRef<"Artist", 'String'>
    readonly img: FieldRef<"Artist", 'String'>
    readonly title: FieldRef<"Artist", 'String'>
    readonly genre: FieldRef<"Artist", 'String'>
    readonly description: FieldRef<"Artist", 'String'>
    readonly releaseDate: FieldRef<"Artist", 'String'>
    readonly likes: FieldRef<"Artist", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * Artist findUnique
   */
  export type ArtistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where: ArtistWhereUniqueInput
  }


  /**
   * Artist findUniqueOrThrow
   */
  export type ArtistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where: ArtistWhereUniqueInput
  }


  /**
   * Artist findFirst
   */
  export type ArtistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artists.
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artists.
     */
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }


  /**
   * Artist findFirstOrThrow
   */
  export type ArtistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artists.
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artists.
     */
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }


  /**
   * Artist findMany
   */
  export type ArtistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artists to fetch.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Artists.
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }


  /**
   * Artist create
   */
  export type ArtistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * The data needed to create a Artist.
     */
    data: XOR<ArtistCreateInput, ArtistUncheckedCreateInput>
  }


  /**
   * Artist createMany
   */
  export type ArtistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Artists.
     */
    data: ArtistCreateManyInput | ArtistCreateManyInput[]
  }


  /**
   * Artist update
   */
  export type ArtistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * The data needed to update a Artist.
     */
    data: XOR<ArtistUpdateInput, ArtistUncheckedUpdateInput>
    /**
     * Choose, which Artist to update.
     */
    where: ArtistWhereUniqueInput
  }


  /**
   * Artist updateMany
   */
  export type ArtistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Artists.
     */
    data: XOR<ArtistUpdateManyMutationInput, ArtistUncheckedUpdateManyInput>
    /**
     * Filter which Artists to update
     */
    where?: ArtistWhereInput
  }


  /**
   * Artist upsert
   */
  export type ArtistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * The filter to search for the Artist to update in case it exists.
     */
    where: ArtistWhereUniqueInput
    /**
     * In case the Artist found by the `where` argument doesn't exist, create a new Artist with this data.
     */
    create: XOR<ArtistCreateInput, ArtistUncheckedCreateInput>
    /**
     * In case the Artist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtistUpdateInput, ArtistUncheckedUpdateInput>
  }


  /**
   * Artist delete
   */
  export type ArtistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter which Artist to delete.
     */
    where: ArtistWhereUniqueInput
  }


  /**
   * Artist deleteMany
   */
  export type ArtistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artists to delete
     */
    where?: ArtistWhereInput
  }


  /**
   * Artist findRaw
   */
  export type ArtistFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Artist aggregateRaw
   */
  export type ArtistAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Artist.comments
   */
  export type Artist$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
    where?: ArtistCommentWhereInput
    orderBy?: ArtistCommentOrderByWithRelationInput | ArtistCommentOrderByWithRelationInput[]
    cursor?: ArtistCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArtistCommentScalarFieldEnum | ArtistCommentScalarFieldEnum[]
  }


  /**
   * Artist.likedByUsers
   */
  export type Artist$likedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    where?: UserLikedArtistWhereInput
    orderBy?: UserLikedArtistOrderByWithRelationInput | UserLikedArtistOrderByWithRelationInput[]
    cursor?: UserLikedArtistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserLikedArtistScalarFieldEnum | UserLikedArtistScalarFieldEnum[]
  }


  /**
   * Artist without action
   */
  export type ArtistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistInclude<ExtArgs> | null
  }



  /**
   * Model ArtistComment
   */

  export type AggregateArtistComment = {
    _count: ArtistCommentCountAggregateOutputType | null
    _avg: ArtistCommentAvgAggregateOutputType | null
    _sum: ArtistCommentSumAggregateOutputType | null
    _min: ArtistCommentMinAggregateOutputType | null
    _max: ArtistCommentMaxAggregateOutputType | null
  }

  export type ArtistCommentAvgAggregateOutputType = {
    likes: number | null
  }

  export type ArtistCommentSumAggregateOutputType = {
    likes: number | null
  }

  export type ArtistCommentMinAggregateOutputType = {
    id: string | null
    comment: string | null
    artistId: string | null
    likes: number | null
  }

  export type ArtistCommentMaxAggregateOutputType = {
    id: string | null
    comment: string | null
    artistId: string | null
    likes: number | null
  }

  export type ArtistCommentCountAggregateOutputType = {
    id: number
    comment: number
    artistId: number
    likes: number
    _all: number
  }


  export type ArtistCommentAvgAggregateInputType = {
    likes?: true
  }

  export type ArtistCommentSumAggregateInputType = {
    likes?: true
  }

  export type ArtistCommentMinAggregateInputType = {
    id?: true
    comment?: true
    artistId?: true
    likes?: true
  }

  export type ArtistCommentMaxAggregateInputType = {
    id?: true
    comment?: true
    artistId?: true
    likes?: true
  }

  export type ArtistCommentCountAggregateInputType = {
    id?: true
    comment?: true
    artistId?: true
    likes?: true
    _all?: true
  }

  export type ArtistCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArtistComment to aggregate.
     */
    where?: ArtistCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtistComments to fetch.
     */
    orderBy?: ArtistCommentOrderByWithRelationInput | ArtistCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtistCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtistComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtistComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArtistComments
    **/
    _count?: true | ArtistCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtistCommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtistCommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtistCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtistCommentMaxAggregateInputType
  }

  export type GetArtistCommentAggregateType<T extends ArtistCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateArtistComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtistComment[P]>
      : GetScalarType<T[P], AggregateArtistComment[P]>
  }




  export type ArtistCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtistCommentWhereInput
    orderBy?: ArtistCommentOrderByWithAggregationInput | ArtistCommentOrderByWithAggregationInput[]
    by: ArtistCommentScalarFieldEnum[] | ArtistCommentScalarFieldEnum
    having?: ArtistCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtistCommentCountAggregateInputType | true
    _avg?: ArtistCommentAvgAggregateInputType
    _sum?: ArtistCommentSumAggregateInputType
    _min?: ArtistCommentMinAggregateInputType
    _max?: ArtistCommentMaxAggregateInputType
  }

  export type ArtistCommentGroupByOutputType = {
    id: string
    comment: string
    artistId: string
    likes: number
    _count: ArtistCommentCountAggregateOutputType | null
    _avg: ArtistCommentAvgAggregateOutputType | null
    _sum: ArtistCommentSumAggregateOutputType | null
    _min: ArtistCommentMinAggregateOutputType | null
    _max: ArtistCommentMaxAggregateOutputType | null
  }

  type GetArtistCommentGroupByPayload<T extends ArtistCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtistCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtistCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtistCommentGroupByOutputType[P]>
            : GetScalarType<T[P], ArtistCommentGroupByOutputType[P]>
        }
      >
    >


  export type ArtistCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comment?: boolean
    artistId?: boolean
    likes?: boolean
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artistComment"]>

  export type ArtistCommentSelectScalar = {
    id?: boolean
    comment?: boolean
    artistId?: boolean
    likes?: boolean
  }

  export type ArtistCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }


  export type $ArtistCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArtistComment"
    objects: {
      artist: Prisma.$ArtistPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      comment: string
      artistId: string
      likes: number
    }, ExtArgs["result"]["artistComment"]>
    composites: {}
  }


  type ArtistCommentGetPayload<S extends boolean | null | undefined | ArtistCommentDefaultArgs> = $Result.GetResult<Prisma.$ArtistCommentPayload, S>

  type ArtistCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ArtistCommentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ArtistCommentCountAggregateInputType | true
    }

  export interface ArtistCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArtistComment'], meta: { name: 'ArtistComment' } }
    /**
     * Find zero or one ArtistComment that matches the filter.
     * @param {ArtistCommentFindUniqueArgs} args - Arguments to find a ArtistComment
     * @example
     * // Get one ArtistComment
     * const artistComment = await prisma.artistComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ArtistCommentFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistCommentFindUniqueArgs<ExtArgs>>
    ): Prisma__ArtistCommentClient<$Result.GetResult<Prisma.$ArtistCommentPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ArtistComment that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ArtistCommentFindUniqueOrThrowArgs} args - Arguments to find a ArtistComment
     * @example
     * // Get one ArtistComment
     * const artistComment = await prisma.artistComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ArtistCommentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistCommentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ArtistCommentClient<$Result.GetResult<Prisma.$ArtistCommentPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ArtistComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistCommentFindFirstArgs} args - Arguments to find a ArtistComment
     * @example
     * // Get one ArtistComment
     * const artistComment = await prisma.artistComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ArtistCommentFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistCommentFindFirstArgs<ExtArgs>>
    ): Prisma__ArtistCommentClient<$Result.GetResult<Prisma.$ArtistCommentPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ArtistComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistCommentFindFirstOrThrowArgs} args - Arguments to find a ArtistComment
     * @example
     * // Get one ArtistComment
     * const artistComment = await prisma.artistComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ArtistCommentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistCommentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ArtistCommentClient<$Result.GetResult<Prisma.$ArtistCommentPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ArtistComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistCommentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArtistComments
     * const artistComments = await prisma.artistComment.findMany()
     * 
     * // Get first 10 ArtistComments
     * const artistComments = await prisma.artistComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artistCommentWithIdOnly = await prisma.artistComment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ArtistCommentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistCommentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtistCommentPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ArtistComment.
     * @param {ArtistCommentCreateArgs} args - Arguments to create a ArtistComment.
     * @example
     * // Create one ArtistComment
     * const ArtistComment = await prisma.artistComment.create({
     *   data: {
     *     // ... data to create a ArtistComment
     *   }
     * })
     * 
    **/
    create<T extends ArtistCommentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistCommentCreateArgs<ExtArgs>>
    ): Prisma__ArtistCommentClient<$Result.GetResult<Prisma.$ArtistCommentPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ArtistComments.
     *     @param {ArtistCommentCreateManyArgs} args - Arguments to create many ArtistComments.
     *     @example
     *     // Create many ArtistComments
     *     const artistComment = await prisma.artistComment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ArtistCommentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistCommentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ArtistComment.
     * @param {ArtistCommentDeleteArgs} args - Arguments to delete one ArtistComment.
     * @example
     * // Delete one ArtistComment
     * const ArtistComment = await prisma.artistComment.delete({
     *   where: {
     *     // ... filter to delete one ArtistComment
     *   }
     * })
     * 
    **/
    delete<T extends ArtistCommentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistCommentDeleteArgs<ExtArgs>>
    ): Prisma__ArtistCommentClient<$Result.GetResult<Prisma.$ArtistCommentPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ArtistComment.
     * @param {ArtistCommentUpdateArgs} args - Arguments to update one ArtistComment.
     * @example
     * // Update one ArtistComment
     * const artistComment = await prisma.artistComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ArtistCommentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistCommentUpdateArgs<ExtArgs>>
    ): Prisma__ArtistCommentClient<$Result.GetResult<Prisma.$ArtistCommentPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ArtistComments.
     * @param {ArtistCommentDeleteManyArgs} args - Arguments to filter ArtistComments to delete.
     * @example
     * // Delete a few ArtistComments
     * const { count } = await prisma.artistComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ArtistCommentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ArtistCommentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArtistComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArtistComments
     * const artistComment = await prisma.artistComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ArtistCommentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistCommentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArtistComment.
     * @param {ArtistCommentUpsertArgs} args - Arguments to update or create a ArtistComment.
     * @example
     * // Update or create a ArtistComment
     * const artistComment = await prisma.artistComment.upsert({
     *   create: {
     *     // ... data to create a ArtistComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArtistComment we want to update
     *   }
     * })
    **/
    upsert<T extends ArtistCommentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ArtistCommentUpsertArgs<ExtArgs>>
    ): Prisma__ArtistCommentClient<$Result.GetResult<Prisma.$ArtistCommentPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more ArtistComments that matches the filter.
     * @param {ArtistCommentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const artistComment = await prisma.artistComment.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ArtistCommentFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ArtistComment.
     * @param {ArtistCommentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const artistComment = await prisma.artistComment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ArtistCommentAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of ArtistComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistCommentCountArgs} args - Arguments to filter ArtistComments to count.
     * @example
     * // Count the number of ArtistComments
     * const count = await prisma.artistComment.count({
     *   where: {
     *     // ... the filter for the ArtistComments we want to count
     *   }
     * })
    **/
    count<T extends ArtistCommentCountArgs>(
      args?: Subset<T, ArtistCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtistCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArtistComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtistCommentAggregateArgs>(args: Subset<T, ArtistCommentAggregateArgs>): Prisma.PrismaPromise<GetArtistCommentAggregateType<T>>

    /**
     * Group by ArtistComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArtistCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtistCommentGroupByArgs['orderBy'] }
        : { orderBy?: ArtistCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArtistCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtistCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArtistComment model
   */
  readonly fields: ArtistCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArtistComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtistCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    artist<T extends ArtistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArtistDefaultArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ArtistComment model
   */ 
  interface ArtistCommentFieldRefs {
    readonly id: FieldRef<"ArtistComment", 'String'>
    readonly comment: FieldRef<"ArtistComment", 'String'>
    readonly artistId: FieldRef<"ArtistComment", 'String'>
    readonly likes: FieldRef<"ArtistComment", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * ArtistComment findUnique
   */
  export type ArtistCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
    /**
     * Filter, which ArtistComment to fetch.
     */
    where: ArtistCommentWhereUniqueInput
  }


  /**
   * ArtistComment findUniqueOrThrow
   */
  export type ArtistCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
    /**
     * Filter, which ArtistComment to fetch.
     */
    where: ArtistCommentWhereUniqueInput
  }


  /**
   * ArtistComment findFirst
   */
  export type ArtistCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
    /**
     * Filter, which ArtistComment to fetch.
     */
    where?: ArtistCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtistComments to fetch.
     */
    orderBy?: ArtistCommentOrderByWithRelationInput | ArtistCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArtistComments.
     */
    cursor?: ArtistCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtistComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtistComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArtistComments.
     */
    distinct?: ArtistCommentScalarFieldEnum | ArtistCommentScalarFieldEnum[]
  }


  /**
   * ArtistComment findFirstOrThrow
   */
  export type ArtistCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
    /**
     * Filter, which ArtistComment to fetch.
     */
    where?: ArtistCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtistComments to fetch.
     */
    orderBy?: ArtistCommentOrderByWithRelationInput | ArtistCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArtistComments.
     */
    cursor?: ArtistCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtistComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtistComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArtistComments.
     */
    distinct?: ArtistCommentScalarFieldEnum | ArtistCommentScalarFieldEnum[]
  }


  /**
   * ArtistComment findMany
   */
  export type ArtistCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
    /**
     * Filter, which ArtistComments to fetch.
     */
    where?: ArtistCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtistComments to fetch.
     */
    orderBy?: ArtistCommentOrderByWithRelationInput | ArtistCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArtistComments.
     */
    cursor?: ArtistCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtistComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtistComments.
     */
    skip?: number
    distinct?: ArtistCommentScalarFieldEnum | ArtistCommentScalarFieldEnum[]
  }


  /**
   * ArtistComment create
   */
  export type ArtistCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a ArtistComment.
     */
    data: XOR<ArtistCommentCreateInput, ArtistCommentUncheckedCreateInput>
  }


  /**
   * ArtistComment createMany
   */
  export type ArtistCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArtistComments.
     */
    data: ArtistCommentCreateManyInput | ArtistCommentCreateManyInput[]
  }


  /**
   * ArtistComment update
   */
  export type ArtistCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a ArtistComment.
     */
    data: XOR<ArtistCommentUpdateInput, ArtistCommentUncheckedUpdateInput>
    /**
     * Choose, which ArtistComment to update.
     */
    where: ArtistCommentWhereUniqueInput
  }


  /**
   * ArtistComment updateMany
   */
  export type ArtistCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArtistComments.
     */
    data: XOR<ArtistCommentUpdateManyMutationInput, ArtistCommentUncheckedUpdateManyInput>
    /**
     * Filter which ArtistComments to update
     */
    where?: ArtistCommentWhereInput
  }


  /**
   * ArtistComment upsert
   */
  export type ArtistCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the ArtistComment to update in case it exists.
     */
    where: ArtistCommentWhereUniqueInput
    /**
     * In case the ArtistComment found by the `where` argument doesn't exist, create a new ArtistComment with this data.
     */
    create: XOR<ArtistCommentCreateInput, ArtistCommentUncheckedCreateInput>
    /**
     * In case the ArtistComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtistCommentUpdateInput, ArtistCommentUncheckedUpdateInput>
  }


  /**
   * ArtistComment delete
   */
  export type ArtistCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
    /**
     * Filter which ArtistComment to delete.
     */
    where: ArtistCommentWhereUniqueInput
  }


  /**
   * ArtistComment deleteMany
   */
  export type ArtistCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArtistComments to delete
     */
    where?: ArtistCommentWhereInput
  }


  /**
   * ArtistComment findRaw
   */
  export type ArtistCommentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * ArtistComment aggregateRaw
   */
  export type ArtistCommentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * ArtistComment without action
   */
  export type ArtistCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistComment
     */
    select?: ArtistCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArtistCommentInclude<ExtArgs> | null
  }



  /**
   * Model UserLikedArtist
   */

  export type AggregateUserLikedArtist = {
    _count: UserLikedArtistCountAggregateOutputType | null
    _min: UserLikedArtistMinAggregateOutputType | null
    _max: UserLikedArtistMaxAggregateOutputType | null
  }

  export type UserLikedArtistMinAggregateOutputType = {
    id: string | null
    userId: string | null
    likedArtistId: string | null
  }

  export type UserLikedArtistMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    likedArtistId: string | null
  }

  export type UserLikedArtistCountAggregateOutputType = {
    id: number
    userId: number
    likedArtistId: number
    _all: number
  }


  export type UserLikedArtistMinAggregateInputType = {
    id?: true
    userId?: true
    likedArtistId?: true
  }

  export type UserLikedArtistMaxAggregateInputType = {
    id?: true
    userId?: true
    likedArtistId?: true
  }

  export type UserLikedArtistCountAggregateInputType = {
    id?: true
    userId?: true
    likedArtistId?: true
    _all?: true
  }

  export type UserLikedArtistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLikedArtist to aggregate.
     */
    where?: UserLikedArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedArtists to fetch.
     */
    orderBy?: UserLikedArtistOrderByWithRelationInput | UserLikedArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserLikedArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedArtists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserLikedArtists
    **/
    _count?: true | UserLikedArtistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserLikedArtistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserLikedArtistMaxAggregateInputType
  }

  export type GetUserLikedArtistAggregateType<T extends UserLikedArtistAggregateArgs> = {
        [P in keyof T & keyof AggregateUserLikedArtist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserLikedArtist[P]>
      : GetScalarType<T[P], AggregateUserLikedArtist[P]>
  }




  export type UserLikedArtistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLikedArtistWhereInput
    orderBy?: UserLikedArtistOrderByWithAggregationInput | UserLikedArtistOrderByWithAggregationInput[]
    by: UserLikedArtistScalarFieldEnum[] | UserLikedArtistScalarFieldEnum
    having?: UserLikedArtistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserLikedArtistCountAggregateInputType | true
    _min?: UserLikedArtistMinAggregateInputType
    _max?: UserLikedArtistMaxAggregateInputType
  }

  export type UserLikedArtistGroupByOutputType = {
    id: string
    userId: string
    likedArtistId: string
    _count: UserLikedArtistCountAggregateOutputType | null
    _min: UserLikedArtistMinAggregateOutputType | null
    _max: UserLikedArtistMaxAggregateOutputType | null
  }

  type GetUserLikedArtistGroupByPayload<T extends UserLikedArtistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserLikedArtistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserLikedArtistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserLikedArtistGroupByOutputType[P]>
            : GetScalarType<T[P], UserLikedArtistGroupByOutputType[P]>
        }
      >
    >


  export type UserLikedArtistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    likedArtistId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    likedArtist?: boolean | ArtistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userLikedArtist"]>

  export type UserLikedArtistSelectScalar = {
    id?: boolean
    userId?: boolean
    likedArtistId?: boolean
  }

  export type UserLikedArtistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    likedArtist?: boolean | ArtistDefaultArgs<ExtArgs>
  }


  export type $UserLikedArtistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserLikedArtist"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      likedArtist: Prisma.$ArtistPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      likedArtistId: string
    }, ExtArgs["result"]["userLikedArtist"]>
    composites: {}
  }


  type UserLikedArtistGetPayload<S extends boolean | null | undefined | UserLikedArtistDefaultArgs> = $Result.GetResult<Prisma.$UserLikedArtistPayload, S>

  type UserLikedArtistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserLikedArtistFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserLikedArtistCountAggregateInputType | true
    }

  export interface UserLikedArtistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserLikedArtist'], meta: { name: 'UserLikedArtist' } }
    /**
     * Find zero or one UserLikedArtist that matches the filter.
     * @param {UserLikedArtistFindUniqueArgs} args - Arguments to find a UserLikedArtist
     * @example
     * // Get one UserLikedArtist
     * const userLikedArtist = await prisma.userLikedArtist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserLikedArtistFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedArtistFindUniqueArgs<ExtArgs>>
    ): Prisma__UserLikedArtistClient<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserLikedArtist that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserLikedArtistFindUniqueOrThrowArgs} args - Arguments to find a UserLikedArtist
     * @example
     * // Get one UserLikedArtist
     * const userLikedArtist = await prisma.userLikedArtist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserLikedArtistFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedArtistFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserLikedArtistClient<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserLikedArtist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedArtistFindFirstArgs} args - Arguments to find a UserLikedArtist
     * @example
     * // Get one UserLikedArtist
     * const userLikedArtist = await prisma.userLikedArtist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserLikedArtistFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedArtistFindFirstArgs<ExtArgs>>
    ): Prisma__UserLikedArtistClient<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserLikedArtist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedArtistFindFirstOrThrowArgs} args - Arguments to find a UserLikedArtist
     * @example
     * // Get one UserLikedArtist
     * const userLikedArtist = await prisma.userLikedArtist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserLikedArtistFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedArtistFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserLikedArtistClient<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserLikedArtists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedArtistFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserLikedArtists
     * const userLikedArtists = await prisma.userLikedArtist.findMany()
     * 
     * // Get first 10 UserLikedArtists
     * const userLikedArtists = await prisma.userLikedArtist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userLikedArtistWithIdOnly = await prisma.userLikedArtist.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserLikedArtistFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedArtistFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserLikedArtist.
     * @param {UserLikedArtistCreateArgs} args - Arguments to create a UserLikedArtist.
     * @example
     * // Create one UserLikedArtist
     * const UserLikedArtist = await prisma.userLikedArtist.create({
     *   data: {
     *     // ... data to create a UserLikedArtist
     *   }
     * })
     * 
    **/
    create<T extends UserLikedArtistCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedArtistCreateArgs<ExtArgs>>
    ): Prisma__UserLikedArtistClient<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserLikedArtists.
     *     @param {UserLikedArtistCreateManyArgs} args - Arguments to create many UserLikedArtists.
     *     @example
     *     // Create many UserLikedArtists
     *     const userLikedArtist = await prisma.userLikedArtist.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserLikedArtistCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedArtistCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserLikedArtist.
     * @param {UserLikedArtistDeleteArgs} args - Arguments to delete one UserLikedArtist.
     * @example
     * // Delete one UserLikedArtist
     * const UserLikedArtist = await prisma.userLikedArtist.delete({
     *   where: {
     *     // ... filter to delete one UserLikedArtist
     *   }
     * })
     * 
    **/
    delete<T extends UserLikedArtistDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedArtistDeleteArgs<ExtArgs>>
    ): Prisma__UserLikedArtistClient<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserLikedArtist.
     * @param {UserLikedArtistUpdateArgs} args - Arguments to update one UserLikedArtist.
     * @example
     * // Update one UserLikedArtist
     * const userLikedArtist = await prisma.userLikedArtist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserLikedArtistUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedArtistUpdateArgs<ExtArgs>>
    ): Prisma__UserLikedArtistClient<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserLikedArtists.
     * @param {UserLikedArtistDeleteManyArgs} args - Arguments to filter UserLikedArtists to delete.
     * @example
     * // Delete a few UserLikedArtists
     * const { count } = await prisma.userLikedArtist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserLikedArtistDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserLikedArtistDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserLikedArtists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedArtistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserLikedArtists
     * const userLikedArtist = await prisma.userLikedArtist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserLikedArtistUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedArtistUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserLikedArtist.
     * @param {UserLikedArtistUpsertArgs} args - Arguments to update or create a UserLikedArtist.
     * @example
     * // Update or create a UserLikedArtist
     * const userLikedArtist = await prisma.userLikedArtist.upsert({
     *   create: {
     *     // ... data to create a UserLikedArtist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserLikedArtist we want to update
     *   }
     * })
    **/
    upsert<T extends UserLikedArtistUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserLikedArtistUpsertArgs<ExtArgs>>
    ): Prisma__UserLikedArtistClient<$Result.GetResult<Prisma.$UserLikedArtistPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more UserLikedArtists that matches the filter.
     * @param {UserLikedArtistFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userLikedArtist = await prisma.userLikedArtist.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: UserLikedArtistFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserLikedArtist.
     * @param {UserLikedArtistAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userLikedArtist = await prisma.userLikedArtist.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: UserLikedArtistAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of UserLikedArtists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedArtistCountArgs} args - Arguments to filter UserLikedArtists to count.
     * @example
     * // Count the number of UserLikedArtists
     * const count = await prisma.userLikedArtist.count({
     *   where: {
     *     // ... the filter for the UserLikedArtists we want to count
     *   }
     * })
    **/
    count<T extends UserLikedArtistCountArgs>(
      args?: Subset<T, UserLikedArtistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserLikedArtistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserLikedArtist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedArtistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserLikedArtistAggregateArgs>(args: Subset<T, UserLikedArtistAggregateArgs>): Prisma.PrismaPromise<GetUserLikedArtistAggregateType<T>>

    /**
     * Group by UserLikedArtist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLikedArtistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserLikedArtistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserLikedArtistGroupByArgs['orderBy'] }
        : { orderBy?: UserLikedArtistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserLikedArtistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserLikedArtistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserLikedArtist model
   */
  readonly fields: UserLikedArtistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserLikedArtist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserLikedArtistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    likedArtist<T extends ArtistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArtistDefaultArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the UserLikedArtist model
   */ 
  interface UserLikedArtistFieldRefs {
    readonly id: FieldRef<"UserLikedArtist", 'String'>
    readonly userId: FieldRef<"UserLikedArtist", 'String'>
    readonly likedArtistId: FieldRef<"UserLikedArtist", 'String'>
  }
    

  // Custom InputTypes

  /**
   * UserLikedArtist findUnique
   */
  export type UserLikedArtistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedArtist to fetch.
     */
    where: UserLikedArtistWhereUniqueInput
  }


  /**
   * UserLikedArtist findUniqueOrThrow
   */
  export type UserLikedArtistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedArtist to fetch.
     */
    where: UserLikedArtistWhereUniqueInput
  }


  /**
   * UserLikedArtist findFirst
   */
  export type UserLikedArtistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedArtist to fetch.
     */
    where?: UserLikedArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedArtists to fetch.
     */
    orderBy?: UserLikedArtistOrderByWithRelationInput | UserLikedArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLikedArtists.
     */
    cursor?: UserLikedArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedArtists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLikedArtists.
     */
    distinct?: UserLikedArtistScalarFieldEnum | UserLikedArtistScalarFieldEnum[]
  }


  /**
   * UserLikedArtist findFirstOrThrow
   */
  export type UserLikedArtistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedArtist to fetch.
     */
    where?: UserLikedArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedArtists to fetch.
     */
    orderBy?: UserLikedArtistOrderByWithRelationInput | UserLikedArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLikedArtists.
     */
    cursor?: UserLikedArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedArtists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLikedArtists.
     */
    distinct?: UserLikedArtistScalarFieldEnum | UserLikedArtistScalarFieldEnum[]
  }


  /**
   * UserLikedArtist findMany
   */
  export type UserLikedArtistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    /**
     * Filter, which UserLikedArtists to fetch.
     */
    where?: UserLikedArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLikedArtists to fetch.
     */
    orderBy?: UserLikedArtistOrderByWithRelationInput | UserLikedArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserLikedArtists.
     */
    cursor?: UserLikedArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLikedArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLikedArtists.
     */
    skip?: number
    distinct?: UserLikedArtistScalarFieldEnum | UserLikedArtistScalarFieldEnum[]
  }


  /**
   * UserLikedArtist create
   */
  export type UserLikedArtistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    /**
     * The data needed to create a UserLikedArtist.
     */
    data: XOR<UserLikedArtistCreateInput, UserLikedArtistUncheckedCreateInput>
  }


  /**
   * UserLikedArtist createMany
   */
  export type UserLikedArtistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserLikedArtists.
     */
    data: UserLikedArtistCreateManyInput | UserLikedArtistCreateManyInput[]
  }


  /**
   * UserLikedArtist update
   */
  export type UserLikedArtistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    /**
     * The data needed to update a UserLikedArtist.
     */
    data: XOR<UserLikedArtistUpdateInput, UserLikedArtistUncheckedUpdateInput>
    /**
     * Choose, which UserLikedArtist to update.
     */
    where: UserLikedArtistWhereUniqueInput
  }


  /**
   * UserLikedArtist updateMany
   */
  export type UserLikedArtistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserLikedArtists.
     */
    data: XOR<UserLikedArtistUpdateManyMutationInput, UserLikedArtistUncheckedUpdateManyInput>
    /**
     * Filter which UserLikedArtists to update
     */
    where?: UserLikedArtistWhereInput
  }


  /**
   * UserLikedArtist upsert
   */
  export type UserLikedArtistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    /**
     * The filter to search for the UserLikedArtist to update in case it exists.
     */
    where: UserLikedArtistWhereUniqueInput
    /**
     * In case the UserLikedArtist found by the `where` argument doesn't exist, create a new UserLikedArtist with this data.
     */
    create: XOR<UserLikedArtistCreateInput, UserLikedArtistUncheckedCreateInput>
    /**
     * In case the UserLikedArtist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserLikedArtistUpdateInput, UserLikedArtistUncheckedUpdateInput>
  }


  /**
   * UserLikedArtist delete
   */
  export type UserLikedArtistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
    /**
     * Filter which UserLikedArtist to delete.
     */
    where: UserLikedArtistWhereUniqueInput
  }


  /**
   * UserLikedArtist deleteMany
   */
  export type UserLikedArtistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLikedArtists to delete
     */
    where?: UserLikedArtistWhereInput
  }


  /**
   * UserLikedArtist findRaw
   */
  export type UserLikedArtistFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * UserLikedArtist aggregateRaw
   */
  export type UserLikedArtistAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * UserLikedArtist without action
   */
  export type UserLikedArtistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLikedArtist
     */
    select?: UserLikedArtistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserLikedArtistInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const WebsiteProjectScalarFieldEnum: {
    id: 'id',
    img: 'img',
    title: 'title',
    genre: 'genre',
    technologies: 'technologies',
    description: 'description',
    release_date: 'release_date',
    link: 'link',
    likes: 'likes'
  };

  export type WebsiteProjectScalarFieldEnum = (typeof WebsiteProjectScalarFieldEnum)[keyof typeof WebsiteProjectScalarFieldEnum]


  export const WebsiteProjectCommentScalarFieldEnum: {
    id: 'id',
    comment: 'comment',
    websiteProjectId: 'websiteProjectId',
    likes: 'likes'
  };

  export type WebsiteProjectCommentScalarFieldEnum = (typeof WebsiteProjectCommentScalarFieldEnum)[keyof typeof WebsiteProjectCommentScalarFieldEnum]


  export const SongScalarFieldEnum: {
    id: 'id',
    img: 'img',
    title: 'title',
    albumName: 'albumName',
    artist: 'artist',
    genre: 'genre',
    releaseDate: 'releaseDate',
    duration: 'duration',
    plays: 'plays',
    song: 'song',
    likes: 'likes'
  };

  export type SongScalarFieldEnum = (typeof SongScalarFieldEnum)[keyof typeof SongScalarFieldEnum]


  export const SongCommentScalarFieldEnum: {
    id: 'id',
    comment: 'comment',
    songId: 'songId',
    likes: 'likes'
  };

  export type SongCommentScalarFieldEnum = (typeof SongCommentScalarFieldEnum)[keyof typeof SongCommentScalarFieldEnum]


  export const UserLikedSongScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    likedSongId: 'likedSongId'
  };

  export type UserLikedSongScalarFieldEnum = (typeof UserLikedSongScalarFieldEnum)[keyof typeof UserLikedSongScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserLikedWebsiteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    likedWebsiteId: 'likedWebsiteId'
  };

  export type UserLikedWebsiteScalarFieldEnum = (typeof UserLikedWebsiteScalarFieldEnum)[keyof typeof UserLikedWebsiteScalarFieldEnum]


  export const ArtistScalarFieldEnum: {
    id: 'id',
    img: 'img',
    title: 'title',
    genre: 'genre',
    description: 'description',
    releaseDate: 'releaseDate',
    likes: 'likes'
  };

  export type ArtistScalarFieldEnum = (typeof ArtistScalarFieldEnum)[keyof typeof ArtistScalarFieldEnum]


  export const ArtistCommentScalarFieldEnum: {
    id: 'id',
    comment: 'comment',
    artistId: 'artistId',
    likes: 'likes'
  };

  export type ArtistCommentScalarFieldEnum = (typeof ArtistCommentScalarFieldEnum)[keyof typeof ArtistCommentScalarFieldEnum]


  export const UserLikedArtistScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    likedArtistId: 'likedArtistId'
  };

  export type UserLikedArtistScalarFieldEnum = (typeof UserLikedArtistScalarFieldEnum)[keyof typeof UserLikedArtistScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type WebsiteProjectWhereInput = {
    AND?: WebsiteProjectWhereInput | WebsiteProjectWhereInput[]
    OR?: WebsiteProjectWhereInput[]
    NOT?: WebsiteProjectWhereInput | WebsiteProjectWhereInput[]
    id?: StringFilter<"WebsiteProject"> | string
    img?: StringFilter<"WebsiteProject"> | string
    title?: StringFilter<"WebsiteProject"> | string
    genre?: StringFilter<"WebsiteProject"> | string
    technologies?: StringFilter<"WebsiteProject"> | string
    description?: StringFilter<"WebsiteProject"> | string
    release_date?: StringFilter<"WebsiteProject"> | string
    link?: StringFilter<"WebsiteProject"> | string
    likes?: IntFilter<"WebsiteProject"> | number
    comments?: WebsiteProjectCommentListRelationFilter
    likedByUsers?: UserLikedWebsiteListRelationFilter
  }

  export type WebsiteProjectOrderByWithRelationInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    genre?: SortOrder
    technologies?: SortOrder
    description?: SortOrder
    release_date?: SortOrder
    link?: SortOrder
    likes?: SortOrder
    comments?: WebsiteProjectCommentOrderByRelationAggregateInput
    likedByUsers?: UserLikedWebsiteOrderByRelationAggregateInput
  }

  export type WebsiteProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebsiteProjectWhereInput | WebsiteProjectWhereInput[]
    OR?: WebsiteProjectWhereInput[]
    NOT?: WebsiteProjectWhereInput | WebsiteProjectWhereInput[]
    img?: StringFilter<"WebsiteProject"> | string
    title?: StringFilter<"WebsiteProject"> | string
    genre?: StringFilter<"WebsiteProject"> | string
    technologies?: StringFilter<"WebsiteProject"> | string
    description?: StringFilter<"WebsiteProject"> | string
    release_date?: StringFilter<"WebsiteProject"> | string
    link?: StringFilter<"WebsiteProject"> | string
    likes?: IntFilter<"WebsiteProject"> | number
    comments?: WebsiteProjectCommentListRelationFilter
    likedByUsers?: UserLikedWebsiteListRelationFilter
  }, "id">

  export type WebsiteProjectOrderByWithAggregationInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    genre?: SortOrder
    technologies?: SortOrder
    description?: SortOrder
    release_date?: SortOrder
    link?: SortOrder
    likes?: SortOrder
    _count?: WebsiteProjectCountOrderByAggregateInput
    _avg?: WebsiteProjectAvgOrderByAggregateInput
    _max?: WebsiteProjectMaxOrderByAggregateInput
    _min?: WebsiteProjectMinOrderByAggregateInput
    _sum?: WebsiteProjectSumOrderByAggregateInput
  }

  export type WebsiteProjectScalarWhereWithAggregatesInput = {
    AND?: WebsiteProjectScalarWhereWithAggregatesInput | WebsiteProjectScalarWhereWithAggregatesInput[]
    OR?: WebsiteProjectScalarWhereWithAggregatesInput[]
    NOT?: WebsiteProjectScalarWhereWithAggregatesInput | WebsiteProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebsiteProject"> | string
    img?: StringWithAggregatesFilter<"WebsiteProject"> | string
    title?: StringWithAggregatesFilter<"WebsiteProject"> | string
    genre?: StringWithAggregatesFilter<"WebsiteProject"> | string
    technologies?: StringWithAggregatesFilter<"WebsiteProject"> | string
    description?: StringWithAggregatesFilter<"WebsiteProject"> | string
    release_date?: StringWithAggregatesFilter<"WebsiteProject"> | string
    link?: StringWithAggregatesFilter<"WebsiteProject"> | string
    likes?: IntWithAggregatesFilter<"WebsiteProject"> | number
  }

  export type WebsiteProjectCommentWhereInput = {
    AND?: WebsiteProjectCommentWhereInput | WebsiteProjectCommentWhereInput[]
    OR?: WebsiteProjectCommentWhereInput[]
    NOT?: WebsiteProjectCommentWhereInput | WebsiteProjectCommentWhereInput[]
    id?: StringFilter<"WebsiteProjectComment"> | string
    comment?: StringFilter<"WebsiteProjectComment"> | string
    websiteProjectId?: StringFilter<"WebsiteProjectComment"> | string
    likes?: IntFilter<"WebsiteProjectComment"> | number
    websiteProject?: XOR<WebsiteProjectRelationFilter, WebsiteProjectWhereInput>
  }

  export type WebsiteProjectCommentOrderByWithRelationInput = {
    id?: SortOrder
    comment?: SortOrder
    websiteProjectId?: SortOrder
    likes?: SortOrder
    websiteProject?: WebsiteProjectOrderByWithRelationInput
  }

  export type WebsiteProjectCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebsiteProjectCommentWhereInput | WebsiteProjectCommentWhereInput[]
    OR?: WebsiteProjectCommentWhereInput[]
    NOT?: WebsiteProjectCommentWhereInput | WebsiteProjectCommentWhereInput[]
    comment?: StringFilter<"WebsiteProjectComment"> | string
    websiteProjectId?: StringFilter<"WebsiteProjectComment"> | string
    likes?: IntFilter<"WebsiteProjectComment"> | number
    websiteProject?: XOR<WebsiteProjectRelationFilter, WebsiteProjectWhereInput>
  }, "id">

  export type WebsiteProjectCommentOrderByWithAggregationInput = {
    id?: SortOrder
    comment?: SortOrder
    websiteProjectId?: SortOrder
    likes?: SortOrder
    _count?: WebsiteProjectCommentCountOrderByAggregateInput
    _avg?: WebsiteProjectCommentAvgOrderByAggregateInput
    _max?: WebsiteProjectCommentMaxOrderByAggregateInput
    _min?: WebsiteProjectCommentMinOrderByAggregateInput
    _sum?: WebsiteProjectCommentSumOrderByAggregateInput
  }

  export type WebsiteProjectCommentScalarWhereWithAggregatesInput = {
    AND?: WebsiteProjectCommentScalarWhereWithAggregatesInput | WebsiteProjectCommentScalarWhereWithAggregatesInput[]
    OR?: WebsiteProjectCommentScalarWhereWithAggregatesInput[]
    NOT?: WebsiteProjectCommentScalarWhereWithAggregatesInput | WebsiteProjectCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebsiteProjectComment"> | string
    comment?: StringWithAggregatesFilter<"WebsiteProjectComment"> | string
    websiteProjectId?: StringWithAggregatesFilter<"WebsiteProjectComment"> | string
    likes?: IntWithAggregatesFilter<"WebsiteProjectComment"> | number
  }

  export type SongWhereInput = {
    AND?: SongWhereInput | SongWhereInput[]
    OR?: SongWhereInput[]
    NOT?: SongWhereInput | SongWhereInput[]
    id?: StringFilter<"Song"> | string
    img?: StringFilter<"Song"> | string
    title?: StringFilter<"Song"> | string
    albumName?: StringFilter<"Song"> | string
    artist?: StringFilter<"Song"> | string
    genre?: StringFilter<"Song"> | string
    releaseDate?: StringFilter<"Song"> | string
    duration?: StringFilter<"Song"> | string
    plays?: IntFilter<"Song"> | number
    song?: StringFilter<"Song"> | string
    likes?: IntFilter<"Song"> | number
    comments?: SongCommentListRelationFilter
    likedByUsers?: UserLikedSongListRelationFilter
  }

  export type SongOrderByWithRelationInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    albumName?: SortOrder
    artist?: SortOrder
    genre?: SortOrder
    releaseDate?: SortOrder
    duration?: SortOrder
    plays?: SortOrder
    song?: SortOrder
    likes?: SortOrder
    comments?: SongCommentOrderByRelationAggregateInput
    likedByUsers?: UserLikedSongOrderByRelationAggregateInput
  }

  export type SongWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SongWhereInput | SongWhereInput[]
    OR?: SongWhereInput[]
    NOT?: SongWhereInput | SongWhereInput[]
    img?: StringFilter<"Song"> | string
    title?: StringFilter<"Song"> | string
    albumName?: StringFilter<"Song"> | string
    artist?: StringFilter<"Song"> | string
    genre?: StringFilter<"Song"> | string
    releaseDate?: StringFilter<"Song"> | string
    duration?: StringFilter<"Song"> | string
    plays?: IntFilter<"Song"> | number
    song?: StringFilter<"Song"> | string
    likes?: IntFilter<"Song"> | number
    comments?: SongCommentListRelationFilter
    likedByUsers?: UserLikedSongListRelationFilter
  }, "id">

  export type SongOrderByWithAggregationInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    albumName?: SortOrder
    artist?: SortOrder
    genre?: SortOrder
    releaseDate?: SortOrder
    duration?: SortOrder
    plays?: SortOrder
    song?: SortOrder
    likes?: SortOrder
    _count?: SongCountOrderByAggregateInput
    _avg?: SongAvgOrderByAggregateInput
    _max?: SongMaxOrderByAggregateInput
    _min?: SongMinOrderByAggregateInput
    _sum?: SongSumOrderByAggregateInput
  }

  export type SongScalarWhereWithAggregatesInput = {
    AND?: SongScalarWhereWithAggregatesInput | SongScalarWhereWithAggregatesInput[]
    OR?: SongScalarWhereWithAggregatesInput[]
    NOT?: SongScalarWhereWithAggregatesInput | SongScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Song"> | string
    img?: StringWithAggregatesFilter<"Song"> | string
    title?: StringWithAggregatesFilter<"Song"> | string
    albumName?: StringWithAggregatesFilter<"Song"> | string
    artist?: StringWithAggregatesFilter<"Song"> | string
    genre?: StringWithAggregatesFilter<"Song"> | string
    releaseDate?: StringWithAggregatesFilter<"Song"> | string
    duration?: StringWithAggregatesFilter<"Song"> | string
    plays?: IntWithAggregatesFilter<"Song"> | number
    song?: StringWithAggregatesFilter<"Song"> | string
    likes?: IntWithAggregatesFilter<"Song"> | number
  }

  export type SongCommentWhereInput = {
    AND?: SongCommentWhereInput | SongCommentWhereInput[]
    OR?: SongCommentWhereInput[]
    NOT?: SongCommentWhereInput | SongCommentWhereInput[]
    id?: StringFilter<"SongComment"> | string
    comment?: StringFilter<"SongComment"> | string
    songId?: StringFilter<"SongComment"> | string
    likes?: IntFilter<"SongComment"> | number
    song?: XOR<SongRelationFilter, SongWhereInput>
  }

  export type SongCommentOrderByWithRelationInput = {
    id?: SortOrder
    comment?: SortOrder
    songId?: SortOrder
    likes?: SortOrder
    song?: SongOrderByWithRelationInput
  }

  export type SongCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SongCommentWhereInput | SongCommentWhereInput[]
    OR?: SongCommentWhereInput[]
    NOT?: SongCommentWhereInput | SongCommentWhereInput[]
    comment?: StringFilter<"SongComment"> | string
    songId?: StringFilter<"SongComment"> | string
    likes?: IntFilter<"SongComment"> | number
    song?: XOR<SongRelationFilter, SongWhereInput>
  }, "id">

  export type SongCommentOrderByWithAggregationInput = {
    id?: SortOrder
    comment?: SortOrder
    songId?: SortOrder
    likes?: SortOrder
    _count?: SongCommentCountOrderByAggregateInput
    _avg?: SongCommentAvgOrderByAggregateInput
    _max?: SongCommentMaxOrderByAggregateInput
    _min?: SongCommentMinOrderByAggregateInput
    _sum?: SongCommentSumOrderByAggregateInput
  }

  export type SongCommentScalarWhereWithAggregatesInput = {
    AND?: SongCommentScalarWhereWithAggregatesInput | SongCommentScalarWhereWithAggregatesInput[]
    OR?: SongCommentScalarWhereWithAggregatesInput[]
    NOT?: SongCommentScalarWhereWithAggregatesInput | SongCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SongComment"> | string
    comment?: StringWithAggregatesFilter<"SongComment"> | string
    songId?: StringWithAggregatesFilter<"SongComment"> | string
    likes?: IntWithAggregatesFilter<"SongComment"> | number
  }

  export type UserLikedSongWhereInput = {
    AND?: UserLikedSongWhereInput | UserLikedSongWhereInput[]
    OR?: UserLikedSongWhereInput[]
    NOT?: UserLikedSongWhereInput | UserLikedSongWhereInput[]
    id?: StringFilter<"UserLikedSong"> | string
    userId?: StringFilter<"UserLikedSong"> | string
    likedSongId?: StringFilter<"UserLikedSong"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    likedSong?: XOR<SongRelationFilter, SongWhereInput>
  }

  export type UserLikedSongOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    likedSongId?: SortOrder
    user?: UserOrderByWithRelationInput
    likedSong?: SongOrderByWithRelationInput
  }

  export type UserLikedSongWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserLikedSongWhereInput | UserLikedSongWhereInput[]
    OR?: UserLikedSongWhereInput[]
    NOT?: UserLikedSongWhereInput | UserLikedSongWhereInput[]
    userId?: StringFilter<"UserLikedSong"> | string
    likedSongId?: StringFilter<"UserLikedSong"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    likedSong?: XOR<SongRelationFilter, SongWhereInput>
  }, "id">

  export type UserLikedSongOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    likedSongId?: SortOrder
    _count?: UserLikedSongCountOrderByAggregateInput
    _max?: UserLikedSongMaxOrderByAggregateInput
    _min?: UserLikedSongMinOrderByAggregateInput
  }

  export type UserLikedSongScalarWhereWithAggregatesInput = {
    AND?: UserLikedSongScalarWhereWithAggregatesInput | UserLikedSongScalarWhereWithAggregatesInput[]
    OR?: UserLikedSongScalarWhereWithAggregatesInput[]
    NOT?: UserLikedSongScalarWhereWithAggregatesInput | UserLikedSongScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserLikedSong"> | string
    userId?: StringWithAggregatesFilter<"UserLikedSong"> | string
    likedSongId?: StringWithAggregatesFilter<"UserLikedSong"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    address?: XOR<AddressNullableCompositeFilter, AddressObjectEqualityInput> | null
    likedWebsites?: UserLikedWebsiteListRelationFilter
    likedSongs?: UserLikedSongListRelationFilter
    likedArtists?: UserLikedArtistListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    address?: AddressOrderByInput
    likedWebsites?: UserLikedWebsiteOrderByRelationAggregateInput
    likedSongs?: UserLikedSongOrderByRelationAggregateInput
    likedArtists?: UserLikedArtistOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    address?: XOR<AddressNullableCompositeFilter, AddressObjectEqualityInput> | null
    likedWebsites?: UserLikedWebsiteListRelationFilter
    likedSongs?: UserLikedSongListRelationFilter
    likedArtists?: UserLikedArtistListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type UserLikedWebsiteWhereInput = {
    AND?: UserLikedWebsiteWhereInput | UserLikedWebsiteWhereInput[]
    OR?: UserLikedWebsiteWhereInput[]
    NOT?: UserLikedWebsiteWhereInput | UserLikedWebsiteWhereInput[]
    id?: StringFilter<"UserLikedWebsite"> | string
    userId?: StringFilter<"UserLikedWebsite"> | string
    likedWebsiteId?: StringFilter<"UserLikedWebsite"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    likedWebsite?: XOR<WebsiteProjectRelationFilter, WebsiteProjectWhereInput>
  }

  export type UserLikedWebsiteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    likedWebsiteId?: SortOrder
    user?: UserOrderByWithRelationInput
    likedWebsite?: WebsiteProjectOrderByWithRelationInput
  }

  export type UserLikedWebsiteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserLikedWebsiteWhereInput | UserLikedWebsiteWhereInput[]
    OR?: UserLikedWebsiteWhereInput[]
    NOT?: UserLikedWebsiteWhereInput | UserLikedWebsiteWhereInput[]
    userId?: StringFilter<"UserLikedWebsite"> | string
    likedWebsiteId?: StringFilter<"UserLikedWebsite"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    likedWebsite?: XOR<WebsiteProjectRelationFilter, WebsiteProjectWhereInput>
  }, "id">

  export type UserLikedWebsiteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    likedWebsiteId?: SortOrder
    _count?: UserLikedWebsiteCountOrderByAggregateInput
    _max?: UserLikedWebsiteMaxOrderByAggregateInput
    _min?: UserLikedWebsiteMinOrderByAggregateInput
  }

  export type UserLikedWebsiteScalarWhereWithAggregatesInput = {
    AND?: UserLikedWebsiteScalarWhereWithAggregatesInput | UserLikedWebsiteScalarWhereWithAggregatesInput[]
    OR?: UserLikedWebsiteScalarWhereWithAggregatesInput[]
    NOT?: UserLikedWebsiteScalarWhereWithAggregatesInput | UserLikedWebsiteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserLikedWebsite"> | string
    userId?: StringWithAggregatesFilter<"UserLikedWebsite"> | string
    likedWebsiteId?: StringWithAggregatesFilter<"UserLikedWebsite"> | string
  }

  export type ArtistWhereInput = {
    AND?: ArtistWhereInput | ArtistWhereInput[]
    OR?: ArtistWhereInput[]
    NOT?: ArtistWhereInput | ArtistWhereInput[]
    id?: StringFilter<"Artist"> | string
    img?: StringFilter<"Artist"> | string
    title?: StringFilter<"Artist"> | string
    genre?: StringFilter<"Artist"> | string
    description?: StringFilter<"Artist"> | string
    releaseDate?: StringFilter<"Artist"> | string
    likes?: IntFilter<"Artist"> | number
    comments?: ArtistCommentListRelationFilter
    likedByUsers?: UserLikedArtistListRelationFilter
  }

  export type ArtistOrderByWithRelationInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    releaseDate?: SortOrder
    likes?: SortOrder
    comments?: ArtistCommentOrderByRelationAggregateInput
    likedByUsers?: UserLikedArtistOrderByRelationAggregateInput
  }

  export type ArtistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArtistWhereInput | ArtistWhereInput[]
    OR?: ArtistWhereInput[]
    NOT?: ArtistWhereInput | ArtistWhereInput[]
    img?: StringFilter<"Artist"> | string
    title?: StringFilter<"Artist"> | string
    genre?: StringFilter<"Artist"> | string
    description?: StringFilter<"Artist"> | string
    releaseDate?: StringFilter<"Artist"> | string
    likes?: IntFilter<"Artist"> | number
    comments?: ArtistCommentListRelationFilter
    likedByUsers?: UserLikedArtistListRelationFilter
  }, "id">

  export type ArtistOrderByWithAggregationInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    releaseDate?: SortOrder
    likes?: SortOrder
    _count?: ArtistCountOrderByAggregateInput
    _avg?: ArtistAvgOrderByAggregateInput
    _max?: ArtistMaxOrderByAggregateInput
    _min?: ArtistMinOrderByAggregateInput
    _sum?: ArtistSumOrderByAggregateInput
  }

  export type ArtistScalarWhereWithAggregatesInput = {
    AND?: ArtistScalarWhereWithAggregatesInput | ArtistScalarWhereWithAggregatesInput[]
    OR?: ArtistScalarWhereWithAggregatesInput[]
    NOT?: ArtistScalarWhereWithAggregatesInput | ArtistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Artist"> | string
    img?: StringWithAggregatesFilter<"Artist"> | string
    title?: StringWithAggregatesFilter<"Artist"> | string
    genre?: StringWithAggregatesFilter<"Artist"> | string
    description?: StringWithAggregatesFilter<"Artist"> | string
    releaseDate?: StringWithAggregatesFilter<"Artist"> | string
    likes?: IntWithAggregatesFilter<"Artist"> | number
  }

  export type ArtistCommentWhereInput = {
    AND?: ArtistCommentWhereInput | ArtistCommentWhereInput[]
    OR?: ArtistCommentWhereInput[]
    NOT?: ArtistCommentWhereInput | ArtistCommentWhereInput[]
    id?: StringFilter<"ArtistComment"> | string
    comment?: StringFilter<"ArtistComment"> | string
    artistId?: StringFilter<"ArtistComment"> | string
    likes?: IntFilter<"ArtistComment"> | number
    artist?: XOR<ArtistRelationFilter, ArtistWhereInput>
  }

  export type ArtistCommentOrderByWithRelationInput = {
    id?: SortOrder
    comment?: SortOrder
    artistId?: SortOrder
    likes?: SortOrder
    artist?: ArtistOrderByWithRelationInput
  }

  export type ArtistCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArtistCommentWhereInput | ArtistCommentWhereInput[]
    OR?: ArtistCommentWhereInput[]
    NOT?: ArtistCommentWhereInput | ArtistCommentWhereInput[]
    comment?: StringFilter<"ArtistComment"> | string
    artistId?: StringFilter<"ArtistComment"> | string
    likes?: IntFilter<"ArtistComment"> | number
    artist?: XOR<ArtistRelationFilter, ArtistWhereInput>
  }, "id">

  export type ArtistCommentOrderByWithAggregationInput = {
    id?: SortOrder
    comment?: SortOrder
    artistId?: SortOrder
    likes?: SortOrder
    _count?: ArtistCommentCountOrderByAggregateInput
    _avg?: ArtistCommentAvgOrderByAggregateInput
    _max?: ArtistCommentMaxOrderByAggregateInput
    _min?: ArtistCommentMinOrderByAggregateInput
    _sum?: ArtistCommentSumOrderByAggregateInput
  }

  export type ArtistCommentScalarWhereWithAggregatesInput = {
    AND?: ArtistCommentScalarWhereWithAggregatesInput | ArtistCommentScalarWhereWithAggregatesInput[]
    OR?: ArtistCommentScalarWhereWithAggregatesInput[]
    NOT?: ArtistCommentScalarWhereWithAggregatesInput | ArtistCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArtistComment"> | string
    comment?: StringWithAggregatesFilter<"ArtistComment"> | string
    artistId?: StringWithAggregatesFilter<"ArtistComment"> | string
    likes?: IntWithAggregatesFilter<"ArtistComment"> | number
  }

  export type UserLikedArtistWhereInput = {
    AND?: UserLikedArtistWhereInput | UserLikedArtistWhereInput[]
    OR?: UserLikedArtistWhereInput[]
    NOT?: UserLikedArtistWhereInput | UserLikedArtistWhereInput[]
    id?: StringFilter<"UserLikedArtist"> | string
    userId?: StringFilter<"UserLikedArtist"> | string
    likedArtistId?: StringFilter<"UserLikedArtist"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    likedArtist?: XOR<ArtistRelationFilter, ArtistWhereInput>
  }

  export type UserLikedArtistOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    likedArtistId?: SortOrder
    user?: UserOrderByWithRelationInput
    likedArtist?: ArtistOrderByWithRelationInput
  }

  export type UserLikedArtistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserLikedArtistWhereInput | UserLikedArtistWhereInput[]
    OR?: UserLikedArtistWhereInput[]
    NOT?: UserLikedArtistWhereInput | UserLikedArtistWhereInput[]
    userId?: StringFilter<"UserLikedArtist"> | string
    likedArtistId?: StringFilter<"UserLikedArtist"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    likedArtist?: XOR<ArtistRelationFilter, ArtistWhereInput>
  }, "id">

  export type UserLikedArtistOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    likedArtistId?: SortOrder
    _count?: UserLikedArtistCountOrderByAggregateInput
    _max?: UserLikedArtistMaxOrderByAggregateInput
    _min?: UserLikedArtistMinOrderByAggregateInput
  }

  export type UserLikedArtistScalarWhereWithAggregatesInput = {
    AND?: UserLikedArtistScalarWhereWithAggregatesInput | UserLikedArtistScalarWhereWithAggregatesInput[]
    OR?: UserLikedArtistScalarWhereWithAggregatesInput[]
    NOT?: UserLikedArtistScalarWhereWithAggregatesInput | UserLikedArtistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserLikedArtist"> | string
    userId?: StringWithAggregatesFilter<"UserLikedArtist"> | string
    likedArtistId?: StringWithAggregatesFilter<"UserLikedArtist"> | string
  }

  export type WebsiteProjectCreateInput = {
    id?: string
    img: string
    title: string
    genre: string
    technologies: string
    description: string
    release_date: string
    link: string
    likes?: number
    comments?: WebsiteProjectCommentCreateNestedManyWithoutWebsiteProjectInput
    likedByUsers?: UserLikedWebsiteCreateNestedManyWithoutLikedWebsiteInput
  }

  export type WebsiteProjectUncheckedCreateInput = {
    id?: string
    img: string
    title: string
    genre: string
    technologies: string
    description: string
    release_date: string
    link: string
    likes?: number
    comments?: WebsiteProjectCommentUncheckedCreateNestedManyWithoutWebsiteProjectInput
    likedByUsers?: UserLikedWebsiteUncheckedCreateNestedManyWithoutLikedWebsiteInput
  }

  export type WebsiteProjectUpdateInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    release_date?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: WebsiteProjectCommentUpdateManyWithoutWebsiteProjectNestedInput
    likedByUsers?: UserLikedWebsiteUpdateManyWithoutLikedWebsiteNestedInput
  }

  export type WebsiteProjectUncheckedUpdateInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    release_date?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: WebsiteProjectCommentUncheckedUpdateManyWithoutWebsiteProjectNestedInput
    likedByUsers?: UserLikedWebsiteUncheckedUpdateManyWithoutLikedWebsiteNestedInput
  }

  export type WebsiteProjectCreateManyInput = {
    id?: string
    img: string
    title: string
    genre: string
    technologies: string
    description: string
    release_date: string
    link: string
    likes?: number
  }

  export type WebsiteProjectUpdateManyMutationInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    release_date?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type WebsiteProjectUncheckedUpdateManyInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    release_date?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type WebsiteProjectCommentCreateInput = {
    id?: string
    comment: string
    likes?: number
    websiteProject: WebsiteProjectCreateNestedOneWithoutCommentsInput
  }

  export type WebsiteProjectCommentUncheckedCreateInput = {
    id?: string
    comment: string
    websiteProjectId: string
    likes?: number
  }

  export type WebsiteProjectCommentUpdateInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    websiteProject?: WebsiteProjectUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type WebsiteProjectCommentUncheckedUpdateInput = {
    comment?: StringFieldUpdateOperationsInput | string
    websiteProjectId?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type WebsiteProjectCommentCreateManyInput = {
    id?: string
    comment: string
    websiteProjectId: string
    likes?: number
  }

  export type WebsiteProjectCommentUpdateManyMutationInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type WebsiteProjectCommentUncheckedUpdateManyInput = {
    comment?: StringFieldUpdateOperationsInput | string
    websiteProjectId?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type SongCreateInput = {
    id?: string
    img: string
    title: string
    albumName: string
    artist: string
    genre: string
    releaseDate: string
    duration: string
    plays?: number
    song: string
    likes?: number
    comments?: SongCommentCreateNestedManyWithoutSongInput
    likedByUsers?: UserLikedSongCreateNestedManyWithoutLikedSongInput
  }

  export type SongUncheckedCreateInput = {
    id?: string
    img: string
    title: string
    albumName: string
    artist: string
    genre: string
    releaseDate: string
    duration: string
    plays?: number
    song: string
    likes?: number
    comments?: SongCommentUncheckedCreateNestedManyWithoutSongInput
    likedByUsers?: UserLikedSongUncheckedCreateNestedManyWithoutLikedSongInput
  }

  export type SongUpdateInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    albumName?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    plays?: IntFieldUpdateOperationsInput | number
    song?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: SongCommentUpdateManyWithoutSongNestedInput
    likedByUsers?: UserLikedSongUpdateManyWithoutLikedSongNestedInput
  }

  export type SongUncheckedUpdateInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    albumName?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    plays?: IntFieldUpdateOperationsInput | number
    song?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: SongCommentUncheckedUpdateManyWithoutSongNestedInput
    likedByUsers?: UserLikedSongUncheckedUpdateManyWithoutLikedSongNestedInput
  }

  export type SongCreateManyInput = {
    id?: string
    img: string
    title: string
    albumName: string
    artist: string
    genre: string
    releaseDate: string
    duration: string
    plays?: number
    song: string
    likes?: number
  }

  export type SongUpdateManyMutationInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    albumName?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    plays?: IntFieldUpdateOperationsInput | number
    song?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type SongUncheckedUpdateManyInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    albumName?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    plays?: IntFieldUpdateOperationsInput | number
    song?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type SongCommentCreateInput = {
    id?: string
    comment: string
    likes?: number
    song: SongCreateNestedOneWithoutCommentsInput
  }

  export type SongCommentUncheckedCreateInput = {
    id?: string
    comment: string
    songId: string
    likes?: number
  }

  export type SongCommentUpdateInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    song?: SongUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type SongCommentUncheckedUpdateInput = {
    comment?: StringFieldUpdateOperationsInput | string
    songId?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type SongCommentCreateManyInput = {
    id?: string
    comment: string
    songId: string
    likes?: number
  }

  export type SongCommentUpdateManyMutationInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type SongCommentUncheckedUpdateManyInput = {
    comment?: StringFieldUpdateOperationsInput | string
    songId?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type UserLikedSongCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutLikedSongsInput
    likedSong: SongCreateNestedOneWithoutLikedByUsersInput
  }

  export type UserLikedSongUncheckedCreateInput = {
    id?: string
    userId: string
    likedSongId: string
  }

  export type UserLikedSongUpdateInput = {
    user?: UserUpdateOneRequiredWithoutLikedSongsNestedInput
    likedSong?: SongUpdateOneRequiredWithoutLikedByUsersNestedInput
  }

  export type UserLikedSongUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    likedSongId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedSongCreateManyInput = {
    id?: string
    userId: string
    likedSongId: string
  }

  export type UserLikedSongUpdateManyMutationInput = {

  }

  export type UserLikedSongUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    likedSongId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteCreateNestedManyWithoutUserInput
    likedSongs?: UserLikedSongCreateNestedManyWithoutUserInput
    likedArtists?: UserLikedArtistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteUncheckedCreateNestedManyWithoutUserInput
    likedSongs?: UserLikedSongUncheckedCreateNestedManyWithoutUserInput
    likedArtists?: UserLikedArtistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteUpdateManyWithoutUserNestedInput
    likedSongs?: UserLikedSongUpdateManyWithoutUserNestedInput
    likedArtists?: UserLikedArtistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteUncheckedUpdateManyWithoutUserNestedInput
    likedSongs?: UserLikedSongUncheckedUpdateManyWithoutUserNestedInput
    likedArtists?: UserLikedArtistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
  }

  export type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
  }

  export type UserLikedWebsiteCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutLikedWebsitesInput
    likedWebsite: WebsiteProjectCreateNestedOneWithoutLikedByUsersInput
  }

  export type UserLikedWebsiteUncheckedCreateInput = {
    id?: string
    userId: string
    likedWebsiteId: string
  }

  export type UserLikedWebsiteUpdateInput = {
    user?: UserUpdateOneRequiredWithoutLikedWebsitesNestedInput
    likedWebsite?: WebsiteProjectUpdateOneRequiredWithoutLikedByUsersNestedInput
  }

  export type UserLikedWebsiteUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    likedWebsiteId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedWebsiteCreateManyInput = {
    id?: string
    userId: string
    likedWebsiteId: string
  }

  export type UserLikedWebsiteUpdateManyMutationInput = {

  }

  export type UserLikedWebsiteUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    likedWebsiteId?: StringFieldUpdateOperationsInput | string
  }

  export type ArtistCreateInput = {
    id?: string
    img: string
    title: string
    genre: string
    description: string
    releaseDate: string
    likes?: number
    comments?: ArtistCommentCreateNestedManyWithoutArtistInput
    likedByUsers?: UserLikedArtistCreateNestedManyWithoutLikedArtistInput
  }

  export type ArtistUncheckedCreateInput = {
    id?: string
    img: string
    title: string
    genre: string
    description: string
    releaseDate: string
    likes?: number
    comments?: ArtistCommentUncheckedCreateNestedManyWithoutArtistInput
    likedByUsers?: UserLikedArtistUncheckedCreateNestedManyWithoutLikedArtistInput
  }

  export type ArtistUpdateInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: ArtistCommentUpdateManyWithoutArtistNestedInput
    likedByUsers?: UserLikedArtistUpdateManyWithoutLikedArtistNestedInput
  }

  export type ArtistUncheckedUpdateInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: ArtistCommentUncheckedUpdateManyWithoutArtistNestedInput
    likedByUsers?: UserLikedArtistUncheckedUpdateManyWithoutLikedArtistNestedInput
  }

  export type ArtistCreateManyInput = {
    id?: string
    img: string
    title: string
    genre: string
    description: string
    releaseDate: string
    likes?: number
  }

  export type ArtistUpdateManyMutationInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type ArtistUncheckedUpdateManyInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type ArtistCommentCreateInput = {
    id?: string
    comment: string
    likes?: number
    artist: ArtistCreateNestedOneWithoutCommentsInput
  }

  export type ArtistCommentUncheckedCreateInput = {
    id?: string
    comment: string
    artistId: string
    likes?: number
  }

  export type ArtistCommentUpdateInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    artist?: ArtistUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type ArtistCommentUncheckedUpdateInput = {
    comment?: StringFieldUpdateOperationsInput | string
    artistId?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type ArtistCommentCreateManyInput = {
    id?: string
    comment: string
    artistId: string
    likes?: number
  }

  export type ArtistCommentUpdateManyMutationInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type ArtistCommentUncheckedUpdateManyInput = {
    comment?: StringFieldUpdateOperationsInput | string
    artistId?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type UserLikedArtistCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutLikedArtistsInput
    likedArtist: ArtistCreateNestedOneWithoutLikedByUsersInput
  }

  export type UserLikedArtistUncheckedCreateInput = {
    id?: string
    userId: string
    likedArtistId: string
  }

  export type UserLikedArtistUpdateInput = {
    user?: UserUpdateOneRequiredWithoutLikedArtistsNestedInput
    likedArtist?: ArtistUpdateOneRequiredWithoutLikedByUsersNestedInput
  }

  export type UserLikedArtistUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    likedArtistId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedArtistCreateManyInput = {
    id?: string
    userId: string
    likedArtistId: string
  }

  export type UserLikedArtistUpdateManyMutationInput = {

  }

  export type UserLikedArtistUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    likedArtistId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type WebsiteProjectCommentListRelationFilter = {
    every?: WebsiteProjectCommentWhereInput
    some?: WebsiteProjectCommentWhereInput
    none?: WebsiteProjectCommentWhereInput
  }

  export type UserLikedWebsiteListRelationFilter = {
    every?: UserLikedWebsiteWhereInput
    some?: UserLikedWebsiteWhereInput
    none?: UserLikedWebsiteWhereInput
  }

  export type WebsiteProjectCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserLikedWebsiteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebsiteProjectCountOrderByAggregateInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    genre?: SortOrder
    technologies?: SortOrder
    description?: SortOrder
    release_date?: SortOrder
    link?: SortOrder
    likes?: SortOrder
  }

  export type WebsiteProjectAvgOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type WebsiteProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    genre?: SortOrder
    technologies?: SortOrder
    description?: SortOrder
    release_date?: SortOrder
    link?: SortOrder
    likes?: SortOrder
  }

  export type WebsiteProjectMinOrderByAggregateInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    genre?: SortOrder
    technologies?: SortOrder
    description?: SortOrder
    release_date?: SortOrder
    link?: SortOrder
    likes?: SortOrder
  }

  export type WebsiteProjectSumOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type WebsiteProjectRelationFilter = {
    is?: WebsiteProjectWhereInput
    isNot?: WebsiteProjectWhereInput
  }

  export type WebsiteProjectCommentCountOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    websiteProjectId?: SortOrder
    likes?: SortOrder
  }

  export type WebsiteProjectCommentAvgOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type WebsiteProjectCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    websiteProjectId?: SortOrder
    likes?: SortOrder
  }

  export type WebsiteProjectCommentMinOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    websiteProjectId?: SortOrder
    likes?: SortOrder
  }

  export type WebsiteProjectCommentSumOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type SongCommentListRelationFilter = {
    every?: SongCommentWhereInput
    some?: SongCommentWhereInput
    none?: SongCommentWhereInput
  }

  export type UserLikedSongListRelationFilter = {
    every?: UserLikedSongWhereInput
    some?: UserLikedSongWhereInput
    none?: UserLikedSongWhereInput
  }

  export type SongCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserLikedSongOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SongCountOrderByAggregateInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    albumName?: SortOrder
    artist?: SortOrder
    genre?: SortOrder
    releaseDate?: SortOrder
    duration?: SortOrder
    plays?: SortOrder
    song?: SortOrder
    likes?: SortOrder
  }

  export type SongAvgOrderByAggregateInput = {
    plays?: SortOrder
    likes?: SortOrder
  }

  export type SongMaxOrderByAggregateInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    albumName?: SortOrder
    artist?: SortOrder
    genre?: SortOrder
    releaseDate?: SortOrder
    duration?: SortOrder
    plays?: SortOrder
    song?: SortOrder
    likes?: SortOrder
  }

  export type SongMinOrderByAggregateInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    albumName?: SortOrder
    artist?: SortOrder
    genre?: SortOrder
    releaseDate?: SortOrder
    duration?: SortOrder
    plays?: SortOrder
    song?: SortOrder
    likes?: SortOrder
  }

  export type SongSumOrderByAggregateInput = {
    plays?: SortOrder
    likes?: SortOrder
  }

  export type SongRelationFilter = {
    is?: SongWhereInput
    isNot?: SongWhereInput
  }

  export type SongCommentCountOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    songId?: SortOrder
    likes?: SortOrder
  }

  export type SongCommentAvgOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type SongCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    songId?: SortOrder
    likes?: SortOrder
  }

  export type SongCommentMinOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    songId?: SortOrder
    likes?: SortOrder
  }

  export type SongCommentSumOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserLikedSongCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likedSongId?: SortOrder
  }

  export type UserLikedSongMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likedSongId?: SortOrder
  }

  export type UserLikedSongMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likedSongId?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type AddressNullableCompositeFilter = {
    equals?: AddressObjectEqualityInput | null
    is?: AddressWhereInput | null
    isNot?: AddressWhereInput | null
    isSet?: boolean
  }

  export type AddressObjectEqualityInput = {
    street: string
    city: string
    state: string
    zip: string
  }

  export type UserLikedArtistListRelationFilter = {
    every?: UserLikedArtistWhereInput
    some?: UserLikedArtistWhereInput
    none?: UserLikedArtistWhereInput
  }

  export type AddressOrderByInput = {
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
  }

  export type UserLikedArtistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type UserLikedWebsiteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likedWebsiteId?: SortOrder
  }

  export type UserLikedWebsiteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likedWebsiteId?: SortOrder
  }

  export type UserLikedWebsiteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likedWebsiteId?: SortOrder
  }

  export type ArtistCommentListRelationFilter = {
    every?: ArtistCommentWhereInput
    some?: ArtistCommentWhereInput
    none?: ArtistCommentWhereInput
  }

  export type ArtistCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArtistCountOrderByAggregateInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    releaseDate?: SortOrder
    likes?: SortOrder
  }

  export type ArtistAvgOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type ArtistMaxOrderByAggregateInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    releaseDate?: SortOrder
    likes?: SortOrder
  }

  export type ArtistMinOrderByAggregateInput = {
    id?: SortOrder
    img?: SortOrder
    title?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    releaseDate?: SortOrder
    likes?: SortOrder
  }

  export type ArtistSumOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type ArtistRelationFilter = {
    is?: ArtistWhereInput
    isNot?: ArtistWhereInput
  }

  export type ArtistCommentCountOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    artistId?: SortOrder
    likes?: SortOrder
  }

  export type ArtistCommentAvgOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type ArtistCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    artistId?: SortOrder
    likes?: SortOrder
  }

  export type ArtistCommentMinOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    artistId?: SortOrder
    likes?: SortOrder
  }

  export type ArtistCommentSumOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type UserLikedArtistCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likedArtistId?: SortOrder
  }

  export type UserLikedArtistMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likedArtistId?: SortOrder
  }

  export type UserLikedArtistMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likedArtistId?: SortOrder
  }

  export type WebsiteProjectCommentCreateNestedManyWithoutWebsiteProjectInput = {
    create?: XOR<WebsiteProjectCommentCreateWithoutWebsiteProjectInput, WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput> | WebsiteProjectCommentCreateWithoutWebsiteProjectInput[] | WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput[]
    connectOrCreate?: WebsiteProjectCommentCreateOrConnectWithoutWebsiteProjectInput | WebsiteProjectCommentCreateOrConnectWithoutWebsiteProjectInput[]
    createMany?: WebsiteProjectCommentCreateManyWebsiteProjectInputEnvelope
    connect?: WebsiteProjectCommentWhereUniqueInput | WebsiteProjectCommentWhereUniqueInput[]
  }

  export type UserLikedWebsiteCreateNestedManyWithoutLikedWebsiteInput = {
    create?: XOR<UserLikedWebsiteCreateWithoutLikedWebsiteInput, UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput> | UserLikedWebsiteCreateWithoutLikedWebsiteInput[] | UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput[]
    connectOrCreate?: UserLikedWebsiteCreateOrConnectWithoutLikedWebsiteInput | UserLikedWebsiteCreateOrConnectWithoutLikedWebsiteInput[]
    createMany?: UserLikedWebsiteCreateManyLikedWebsiteInputEnvelope
    connect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
  }

  export type WebsiteProjectCommentUncheckedCreateNestedManyWithoutWebsiteProjectInput = {
    create?: XOR<WebsiteProjectCommentCreateWithoutWebsiteProjectInput, WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput> | WebsiteProjectCommentCreateWithoutWebsiteProjectInput[] | WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput[]
    connectOrCreate?: WebsiteProjectCommentCreateOrConnectWithoutWebsiteProjectInput | WebsiteProjectCommentCreateOrConnectWithoutWebsiteProjectInput[]
    createMany?: WebsiteProjectCommentCreateManyWebsiteProjectInputEnvelope
    connect?: WebsiteProjectCommentWhereUniqueInput | WebsiteProjectCommentWhereUniqueInput[]
  }

  export type UserLikedWebsiteUncheckedCreateNestedManyWithoutLikedWebsiteInput = {
    create?: XOR<UserLikedWebsiteCreateWithoutLikedWebsiteInput, UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput> | UserLikedWebsiteCreateWithoutLikedWebsiteInput[] | UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput[]
    connectOrCreate?: UserLikedWebsiteCreateOrConnectWithoutLikedWebsiteInput | UserLikedWebsiteCreateOrConnectWithoutLikedWebsiteInput[]
    createMany?: UserLikedWebsiteCreateManyLikedWebsiteInputEnvelope
    connect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WebsiteProjectCommentUpdateManyWithoutWebsiteProjectNestedInput = {
    create?: XOR<WebsiteProjectCommentCreateWithoutWebsiteProjectInput, WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput> | WebsiteProjectCommentCreateWithoutWebsiteProjectInput[] | WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput[]
    connectOrCreate?: WebsiteProjectCommentCreateOrConnectWithoutWebsiteProjectInput | WebsiteProjectCommentCreateOrConnectWithoutWebsiteProjectInput[]
    upsert?: WebsiteProjectCommentUpsertWithWhereUniqueWithoutWebsiteProjectInput | WebsiteProjectCommentUpsertWithWhereUniqueWithoutWebsiteProjectInput[]
    createMany?: WebsiteProjectCommentCreateManyWebsiteProjectInputEnvelope
    set?: WebsiteProjectCommentWhereUniqueInput | WebsiteProjectCommentWhereUniqueInput[]
    disconnect?: WebsiteProjectCommentWhereUniqueInput | WebsiteProjectCommentWhereUniqueInput[]
    delete?: WebsiteProjectCommentWhereUniqueInput | WebsiteProjectCommentWhereUniqueInput[]
    connect?: WebsiteProjectCommentWhereUniqueInput | WebsiteProjectCommentWhereUniqueInput[]
    update?: WebsiteProjectCommentUpdateWithWhereUniqueWithoutWebsiteProjectInput | WebsiteProjectCommentUpdateWithWhereUniqueWithoutWebsiteProjectInput[]
    updateMany?: WebsiteProjectCommentUpdateManyWithWhereWithoutWebsiteProjectInput | WebsiteProjectCommentUpdateManyWithWhereWithoutWebsiteProjectInput[]
    deleteMany?: WebsiteProjectCommentScalarWhereInput | WebsiteProjectCommentScalarWhereInput[]
  }

  export type UserLikedWebsiteUpdateManyWithoutLikedWebsiteNestedInput = {
    create?: XOR<UserLikedWebsiteCreateWithoutLikedWebsiteInput, UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput> | UserLikedWebsiteCreateWithoutLikedWebsiteInput[] | UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput[]
    connectOrCreate?: UserLikedWebsiteCreateOrConnectWithoutLikedWebsiteInput | UserLikedWebsiteCreateOrConnectWithoutLikedWebsiteInput[]
    upsert?: UserLikedWebsiteUpsertWithWhereUniqueWithoutLikedWebsiteInput | UserLikedWebsiteUpsertWithWhereUniqueWithoutLikedWebsiteInput[]
    createMany?: UserLikedWebsiteCreateManyLikedWebsiteInputEnvelope
    set?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    disconnect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    delete?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    connect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    update?: UserLikedWebsiteUpdateWithWhereUniqueWithoutLikedWebsiteInput | UserLikedWebsiteUpdateWithWhereUniqueWithoutLikedWebsiteInput[]
    updateMany?: UserLikedWebsiteUpdateManyWithWhereWithoutLikedWebsiteInput | UserLikedWebsiteUpdateManyWithWhereWithoutLikedWebsiteInput[]
    deleteMany?: UserLikedWebsiteScalarWhereInput | UserLikedWebsiteScalarWhereInput[]
  }

  export type WebsiteProjectCommentUncheckedUpdateManyWithoutWebsiteProjectNestedInput = {
    create?: XOR<WebsiteProjectCommentCreateWithoutWebsiteProjectInput, WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput> | WebsiteProjectCommentCreateWithoutWebsiteProjectInput[] | WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput[]
    connectOrCreate?: WebsiteProjectCommentCreateOrConnectWithoutWebsiteProjectInput | WebsiteProjectCommentCreateOrConnectWithoutWebsiteProjectInput[]
    upsert?: WebsiteProjectCommentUpsertWithWhereUniqueWithoutWebsiteProjectInput | WebsiteProjectCommentUpsertWithWhereUniqueWithoutWebsiteProjectInput[]
    createMany?: WebsiteProjectCommentCreateManyWebsiteProjectInputEnvelope
    set?: WebsiteProjectCommentWhereUniqueInput | WebsiteProjectCommentWhereUniqueInput[]
    disconnect?: WebsiteProjectCommentWhereUniqueInput | WebsiteProjectCommentWhereUniqueInput[]
    delete?: WebsiteProjectCommentWhereUniqueInput | WebsiteProjectCommentWhereUniqueInput[]
    connect?: WebsiteProjectCommentWhereUniqueInput | WebsiteProjectCommentWhereUniqueInput[]
    update?: WebsiteProjectCommentUpdateWithWhereUniqueWithoutWebsiteProjectInput | WebsiteProjectCommentUpdateWithWhereUniqueWithoutWebsiteProjectInput[]
    updateMany?: WebsiteProjectCommentUpdateManyWithWhereWithoutWebsiteProjectInput | WebsiteProjectCommentUpdateManyWithWhereWithoutWebsiteProjectInput[]
    deleteMany?: WebsiteProjectCommentScalarWhereInput | WebsiteProjectCommentScalarWhereInput[]
  }

  export type UserLikedWebsiteUncheckedUpdateManyWithoutLikedWebsiteNestedInput = {
    create?: XOR<UserLikedWebsiteCreateWithoutLikedWebsiteInput, UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput> | UserLikedWebsiteCreateWithoutLikedWebsiteInput[] | UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput[]
    connectOrCreate?: UserLikedWebsiteCreateOrConnectWithoutLikedWebsiteInput | UserLikedWebsiteCreateOrConnectWithoutLikedWebsiteInput[]
    upsert?: UserLikedWebsiteUpsertWithWhereUniqueWithoutLikedWebsiteInput | UserLikedWebsiteUpsertWithWhereUniqueWithoutLikedWebsiteInput[]
    createMany?: UserLikedWebsiteCreateManyLikedWebsiteInputEnvelope
    set?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    disconnect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    delete?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    connect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    update?: UserLikedWebsiteUpdateWithWhereUniqueWithoutLikedWebsiteInput | UserLikedWebsiteUpdateWithWhereUniqueWithoutLikedWebsiteInput[]
    updateMany?: UserLikedWebsiteUpdateManyWithWhereWithoutLikedWebsiteInput | UserLikedWebsiteUpdateManyWithWhereWithoutLikedWebsiteInput[]
    deleteMany?: UserLikedWebsiteScalarWhereInput | UserLikedWebsiteScalarWhereInput[]
  }

  export type WebsiteProjectCreateNestedOneWithoutCommentsInput = {
    create?: XOR<WebsiteProjectCreateWithoutCommentsInput, WebsiteProjectUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: WebsiteProjectCreateOrConnectWithoutCommentsInput
    connect?: WebsiteProjectWhereUniqueInput
  }

  export type WebsiteProjectUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<WebsiteProjectCreateWithoutCommentsInput, WebsiteProjectUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: WebsiteProjectCreateOrConnectWithoutCommentsInput
    upsert?: WebsiteProjectUpsertWithoutCommentsInput
    connect?: WebsiteProjectWhereUniqueInput
    update?: XOR<XOR<WebsiteProjectUpdateToOneWithWhereWithoutCommentsInput, WebsiteProjectUpdateWithoutCommentsInput>, WebsiteProjectUncheckedUpdateWithoutCommentsInput>
  }

  export type SongCommentCreateNestedManyWithoutSongInput = {
    create?: XOR<SongCommentCreateWithoutSongInput, SongCommentUncheckedCreateWithoutSongInput> | SongCommentCreateWithoutSongInput[] | SongCommentUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongCommentCreateOrConnectWithoutSongInput | SongCommentCreateOrConnectWithoutSongInput[]
    createMany?: SongCommentCreateManySongInputEnvelope
    connect?: SongCommentWhereUniqueInput | SongCommentWhereUniqueInput[]
  }

  export type UserLikedSongCreateNestedManyWithoutLikedSongInput = {
    create?: XOR<UserLikedSongCreateWithoutLikedSongInput, UserLikedSongUncheckedCreateWithoutLikedSongInput> | UserLikedSongCreateWithoutLikedSongInput[] | UserLikedSongUncheckedCreateWithoutLikedSongInput[]
    connectOrCreate?: UserLikedSongCreateOrConnectWithoutLikedSongInput | UserLikedSongCreateOrConnectWithoutLikedSongInput[]
    createMany?: UserLikedSongCreateManyLikedSongInputEnvelope
    connect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
  }

  export type SongCommentUncheckedCreateNestedManyWithoutSongInput = {
    create?: XOR<SongCommentCreateWithoutSongInput, SongCommentUncheckedCreateWithoutSongInput> | SongCommentCreateWithoutSongInput[] | SongCommentUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongCommentCreateOrConnectWithoutSongInput | SongCommentCreateOrConnectWithoutSongInput[]
    createMany?: SongCommentCreateManySongInputEnvelope
    connect?: SongCommentWhereUniqueInput | SongCommentWhereUniqueInput[]
  }

  export type UserLikedSongUncheckedCreateNestedManyWithoutLikedSongInput = {
    create?: XOR<UserLikedSongCreateWithoutLikedSongInput, UserLikedSongUncheckedCreateWithoutLikedSongInput> | UserLikedSongCreateWithoutLikedSongInput[] | UserLikedSongUncheckedCreateWithoutLikedSongInput[]
    connectOrCreate?: UserLikedSongCreateOrConnectWithoutLikedSongInput | UserLikedSongCreateOrConnectWithoutLikedSongInput[]
    createMany?: UserLikedSongCreateManyLikedSongInputEnvelope
    connect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
  }

  export type SongCommentUpdateManyWithoutSongNestedInput = {
    create?: XOR<SongCommentCreateWithoutSongInput, SongCommentUncheckedCreateWithoutSongInput> | SongCommentCreateWithoutSongInput[] | SongCommentUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongCommentCreateOrConnectWithoutSongInput | SongCommentCreateOrConnectWithoutSongInput[]
    upsert?: SongCommentUpsertWithWhereUniqueWithoutSongInput | SongCommentUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: SongCommentCreateManySongInputEnvelope
    set?: SongCommentWhereUniqueInput | SongCommentWhereUniqueInput[]
    disconnect?: SongCommentWhereUniqueInput | SongCommentWhereUniqueInput[]
    delete?: SongCommentWhereUniqueInput | SongCommentWhereUniqueInput[]
    connect?: SongCommentWhereUniqueInput | SongCommentWhereUniqueInput[]
    update?: SongCommentUpdateWithWhereUniqueWithoutSongInput | SongCommentUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: SongCommentUpdateManyWithWhereWithoutSongInput | SongCommentUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: SongCommentScalarWhereInput | SongCommentScalarWhereInput[]
  }

  export type UserLikedSongUpdateManyWithoutLikedSongNestedInput = {
    create?: XOR<UserLikedSongCreateWithoutLikedSongInput, UserLikedSongUncheckedCreateWithoutLikedSongInput> | UserLikedSongCreateWithoutLikedSongInput[] | UserLikedSongUncheckedCreateWithoutLikedSongInput[]
    connectOrCreate?: UserLikedSongCreateOrConnectWithoutLikedSongInput | UserLikedSongCreateOrConnectWithoutLikedSongInput[]
    upsert?: UserLikedSongUpsertWithWhereUniqueWithoutLikedSongInput | UserLikedSongUpsertWithWhereUniqueWithoutLikedSongInput[]
    createMany?: UserLikedSongCreateManyLikedSongInputEnvelope
    set?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    disconnect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    delete?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    connect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    update?: UserLikedSongUpdateWithWhereUniqueWithoutLikedSongInput | UserLikedSongUpdateWithWhereUniqueWithoutLikedSongInput[]
    updateMany?: UserLikedSongUpdateManyWithWhereWithoutLikedSongInput | UserLikedSongUpdateManyWithWhereWithoutLikedSongInput[]
    deleteMany?: UserLikedSongScalarWhereInput | UserLikedSongScalarWhereInput[]
  }

  export type SongCommentUncheckedUpdateManyWithoutSongNestedInput = {
    create?: XOR<SongCommentCreateWithoutSongInput, SongCommentUncheckedCreateWithoutSongInput> | SongCommentCreateWithoutSongInput[] | SongCommentUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongCommentCreateOrConnectWithoutSongInput | SongCommentCreateOrConnectWithoutSongInput[]
    upsert?: SongCommentUpsertWithWhereUniqueWithoutSongInput | SongCommentUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: SongCommentCreateManySongInputEnvelope
    set?: SongCommentWhereUniqueInput | SongCommentWhereUniqueInput[]
    disconnect?: SongCommentWhereUniqueInput | SongCommentWhereUniqueInput[]
    delete?: SongCommentWhereUniqueInput | SongCommentWhereUniqueInput[]
    connect?: SongCommentWhereUniqueInput | SongCommentWhereUniqueInput[]
    update?: SongCommentUpdateWithWhereUniqueWithoutSongInput | SongCommentUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: SongCommentUpdateManyWithWhereWithoutSongInput | SongCommentUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: SongCommentScalarWhereInput | SongCommentScalarWhereInput[]
  }

  export type UserLikedSongUncheckedUpdateManyWithoutLikedSongNestedInput = {
    create?: XOR<UserLikedSongCreateWithoutLikedSongInput, UserLikedSongUncheckedCreateWithoutLikedSongInput> | UserLikedSongCreateWithoutLikedSongInput[] | UserLikedSongUncheckedCreateWithoutLikedSongInput[]
    connectOrCreate?: UserLikedSongCreateOrConnectWithoutLikedSongInput | UserLikedSongCreateOrConnectWithoutLikedSongInput[]
    upsert?: UserLikedSongUpsertWithWhereUniqueWithoutLikedSongInput | UserLikedSongUpsertWithWhereUniqueWithoutLikedSongInput[]
    createMany?: UserLikedSongCreateManyLikedSongInputEnvelope
    set?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    disconnect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    delete?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    connect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    update?: UserLikedSongUpdateWithWhereUniqueWithoutLikedSongInput | UserLikedSongUpdateWithWhereUniqueWithoutLikedSongInput[]
    updateMany?: UserLikedSongUpdateManyWithWhereWithoutLikedSongInput | UserLikedSongUpdateManyWithWhereWithoutLikedSongInput[]
    deleteMany?: UserLikedSongScalarWhereInput | UserLikedSongScalarWhereInput[]
  }

  export type SongCreateNestedOneWithoutCommentsInput = {
    create?: XOR<SongCreateWithoutCommentsInput, SongUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: SongCreateOrConnectWithoutCommentsInput
    connect?: SongWhereUniqueInput
  }

  export type SongUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<SongCreateWithoutCommentsInput, SongUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: SongCreateOrConnectWithoutCommentsInput
    upsert?: SongUpsertWithoutCommentsInput
    connect?: SongWhereUniqueInput
    update?: XOR<XOR<SongUpdateToOneWithWhereWithoutCommentsInput, SongUpdateWithoutCommentsInput>, SongUncheckedUpdateWithoutCommentsInput>
  }

  export type UserCreateNestedOneWithoutLikedSongsInput = {
    create?: XOR<UserCreateWithoutLikedSongsInput, UserUncheckedCreateWithoutLikedSongsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedSongsInput
    connect?: UserWhereUniqueInput
  }

  export type SongCreateNestedOneWithoutLikedByUsersInput = {
    create?: XOR<SongCreateWithoutLikedByUsersInput, SongUncheckedCreateWithoutLikedByUsersInput>
    connectOrCreate?: SongCreateOrConnectWithoutLikedByUsersInput
    connect?: SongWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLikedSongsNestedInput = {
    create?: XOR<UserCreateWithoutLikedSongsInput, UserUncheckedCreateWithoutLikedSongsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedSongsInput
    upsert?: UserUpsertWithoutLikedSongsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikedSongsInput, UserUpdateWithoutLikedSongsInput>, UserUncheckedUpdateWithoutLikedSongsInput>
  }

  export type SongUpdateOneRequiredWithoutLikedByUsersNestedInput = {
    create?: XOR<SongCreateWithoutLikedByUsersInput, SongUncheckedCreateWithoutLikedByUsersInput>
    connectOrCreate?: SongCreateOrConnectWithoutLikedByUsersInput
    upsert?: SongUpsertWithoutLikedByUsersInput
    connect?: SongWhereUniqueInput
    update?: XOR<XOR<SongUpdateToOneWithWhereWithoutLikedByUsersInput, SongUpdateWithoutLikedByUsersInput>, SongUncheckedUpdateWithoutLikedByUsersInput>
  }

  export type AddressNullableCreateEnvelopeInput = {
    set?: AddressCreateInput | null
  }

  export type AddressCreateInput = {
    street: string
    city: string
    state: string
    zip: string
  }

  export type UserLikedWebsiteCreateNestedManyWithoutUserInput = {
    create?: XOR<UserLikedWebsiteCreateWithoutUserInput, UserLikedWebsiteUncheckedCreateWithoutUserInput> | UserLikedWebsiteCreateWithoutUserInput[] | UserLikedWebsiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedWebsiteCreateOrConnectWithoutUserInput | UserLikedWebsiteCreateOrConnectWithoutUserInput[]
    createMany?: UserLikedWebsiteCreateManyUserInputEnvelope
    connect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
  }

  export type UserLikedSongCreateNestedManyWithoutUserInput = {
    create?: XOR<UserLikedSongCreateWithoutUserInput, UserLikedSongUncheckedCreateWithoutUserInput> | UserLikedSongCreateWithoutUserInput[] | UserLikedSongUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedSongCreateOrConnectWithoutUserInput | UserLikedSongCreateOrConnectWithoutUserInput[]
    createMany?: UserLikedSongCreateManyUserInputEnvelope
    connect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
  }

  export type UserLikedArtistCreateNestedManyWithoutUserInput = {
    create?: XOR<UserLikedArtistCreateWithoutUserInput, UserLikedArtistUncheckedCreateWithoutUserInput> | UserLikedArtistCreateWithoutUserInput[] | UserLikedArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedArtistCreateOrConnectWithoutUserInput | UserLikedArtistCreateOrConnectWithoutUserInput[]
    createMany?: UserLikedArtistCreateManyUserInputEnvelope
    connect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
  }

  export type UserLikedWebsiteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserLikedWebsiteCreateWithoutUserInput, UserLikedWebsiteUncheckedCreateWithoutUserInput> | UserLikedWebsiteCreateWithoutUserInput[] | UserLikedWebsiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedWebsiteCreateOrConnectWithoutUserInput | UserLikedWebsiteCreateOrConnectWithoutUserInput[]
    createMany?: UserLikedWebsiteCreateManyUserInputEnvelope
    connect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
  }

  export type UserLikedSongUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserLikedSongCreateWithoutUserInput, UserLikedSongUncheckedCreateWithoutUserInput> | UserLikedSongCreateWithoutUserInput[] | UserLikedSongUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedSongCreateOrConnectWithoutUserInput | UserLikedSongCreateOrConnectWithoutUserInput[]
    createMany?: UserLikedSongCreateManyUserInputEnvelope
    connect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
  }

  export type UserLikedArtistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserLikedArtistCreateWithoutUserInput, UserLikedArtistUncheckedCreateWithoutUserInput> | UserLikedArtistCreateWithoutUserInput[] | UserLikedArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedArtistCreateOrConnectWithoutUserInput | UserLikedArtistCreateOrConnectWithoutUserInput[]
    createMany?: UserLikedArtistCreateManyUserInputEnvelope
    connect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type AddressNullableUpdateEnvelopeInput = {
    set?: AddressCreateInput | null
    upsert?: AddressUpsertInput
    unset?: boolean
  }

  export type UserLikedWebsiteUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserLikedWebsiteCreateWithoutUserInput, UserLikedWebsiteUncheckedCreateWithoutUserInput> | UserLikedWebsiteCreateWithoutUserInput[] | UserLikedWebsiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedWebsiteCreateOrConnectWithoutUserInput | UserLikedWebsiteCreateOrConnectWithoutUserInput[]
    upsert?: UserLikedWebsiteUpsertWithWhereUniqueWithoutUserInput | UserLikedWebsiteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserLikedWebsiteCreateManyUserInputEnvelope
    set?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    disconnect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    delete?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    connect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    update?: UserLikedWebsiteUpdateWithWhereUniqueWithoutUserInput | UserLikedWebsiteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserLikedWebsiteUpdateManyWithWhereWithoutUserInput | UserLikedWebsiteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserLikedWebsiteScalarWhereInput | UserLikedWebsiteScalarWhereInput[]
  }

  export type UserLikedSongUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserLikedSongCreateWithoutUserInput, UserLikedSongUncheckedCreateWithoutUserInput> | UserLikedSongCreateWithoutUserInput[] | UserLikedSongUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedSongCreateOrConnectWithoutUserInput | UserLikedSongCreateOrConnectWithoutUserInput[]
    upsert?: UserLikedSongUpsertWithWhereUniqueWithoutUserInput | UserLikedSongUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserLikedSongCreateManyUserInputEnvelope
    set?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    disconnect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    delete?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    connect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    update?: UserLikedSongUpdateWithWhereUniqueWithoutUserInput | UserLikedSongUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserLikedSongUpdateManyWithWhereWithoutUserInput | UserLikedSongUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserLikedSongScalarWhereInput | UserLikedSongScalarWhereInput[]
  }

  export type UserLikedArtistUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserLikedArtistCreateWithoutUserInput, UserLikedArtistUncheckedCreateWithoutUserInput> | UserLikedArtistCreateWithoutUserInput[] | UserLikedArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedArtistCreateOrConnectWithoutUserInput | UserLikedArtistCreateOrConnectWithoutUserInput[]
    upsert?: UserLikedArtistUpsertWithWhereUniqueWithoutUserInput | UserLikedArtistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserLikedArtistCreateManyUserInputEnvelope
    set?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    disconnect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    delete?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    connect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    update?: UserLikedArtistUpdateWithWhereUniqueWithoutUserInput | UserLikedArtistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserLikedArtistUpdateManyWithWhereWithoutUserInput | UserLikedArtistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserLikedArtistScalarWhereInput | UserLikedArtistScalarWhereInput[]
  }

  export type UserLikedWebsiteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserLikedWebsiteCreateWithoutUserInput, UserLikedWebsiteUncheckedCreateWithoutUserInput> | UserLikedWebsiteCreateWithoutUserInput[] | UserLikedWebsiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedWebsiteCreateOrConnectWithoutUserInput | UserLikedWebsiteCreateOrConnectWithoutUserInput[]
    upsert?: UserLikedWebsiteUpsertWithWhereUniqueWithoutUserInput | UserLikedWebsiteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserLikedWebsiteCreateManyUserInputEnvelope
    set?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    disconnect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    delete?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    connect?: UserLikedWebsiteWhereUniqueInput | UserLikedWebsiteWhereUniqueInput[]
    update?: UserLikedWebsiteUpdateWithWhereUniqueWithoutUserInput | UserLikedWebsiteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserLikedWebsiteUpdateManyWithWhereWithoutUserInput | UserLikedWebsiteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserLikedWebsiteScalarWhereInput | UserLikedWebsiteScalarWhereInput[]
  }

  export type UserLikedSongUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserLikedSongCreateWithoutUserInput, UserLikedSongUncheckedCreateWithoutUserInput> | UserLikedSongCreateWithoutUserInput[] | UserLikedSongUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedSongCreateOrConnectWithoutUserInput | UserLikedSongCreateOrConnectWithoutUserInput[]
    upsert?: UserLikedSongUpsertWithWhereUniqueWithoutUserInput | UserLikedSongUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserLikedSongCreateManyUserInputEnvelope
    set?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    disconnect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    delete?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    connect?: UserLikedSongWhereUniqueInput | UserLikedSongWhereUniqueInput[]
    update?: UserLikedSongUpdateWithWhereUniqueWithoutUserInput | UserLikedSongUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserLikedSongUpdateManyWithWhereWithoutUserInput | UserLikedSongUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserLikedSongScalarWhereInput | UserLikedSongScalarWhereInput[]
  }

  export type UserLikedArtistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserLikedArtistCreateWithoutUserInput, UserLikedArtistUncheckedCreateWithoutUserInput> | UserLikedArtistCreateWithoutUserInput[] | UserLikedArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLikedArtistCreateOrConnectWithoutUserInput | UserLikedArtistCreateOrConnectWithoutUserInput[]
    upsert?: UserLikedArtistUpsertWithWhereUniqueWithoutUserInput | UserLikedArtistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserLikedArtistCreateManyUserInputEnvelope
    set?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    disconnect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    delete?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    connect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    update?: UserLikedArtistUpdateWithWhereUniqueWithoutUserInput | UserLikedArtistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserLikedArtistUpdateManyWithWhereWithoutUserInput | UserLikedArtistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserLikedArtistScalarWhereInput | UserLikedArtistScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutLikedWebsitesInput = {
    create?: XOR<UserCreateWithoutLikedWebsitesInput, UserUncheckedCreateWithoutLikedWebsitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedWebsitesInput
    connect?: UserWhereUniqueInput
  }

  export type WebsiteProjectCreateNestedOneWithoutLikedByUsersInput = {
    create?: XOR<WebsiteProjectCreateWithoutLikedByUsersInput, WebsiteProjectUncheckedCreateWithoutLikedByUsersInput>
    connectOrCreate?: WebsiteProjectCreateOrConnectWithoutLikedByUsersInput
    connect?: WebsiteProjectWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLikedWebsitesNestedInput = {
    create?: XOR<UserCreateWithoutLikedWebsitesInput, UserUncheckedCreateWithoutLikedWebsitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedWebsitesInput
    upsert?: UserUpsertWithoutLikedWebsitesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikedWebsitesInput, UserUpdateWithoutLikedWebsitesInput>, UserUncheckedUpdateWithoutLikedWebsitesInput>
  }

  export type WebsiteProjectUpdateOneRequiredWithoutLikedByUsersNestedInput = {
    create?: XOR<WebsiteProjectCreateWithoutLikedByUsersInput, WebsiteProjectUncheckedCreateWithoutLikedByUsersInput>
    connectOrCreate?: WebsiteProjectCreateOrConnectWithoutLikedByUsersInput
    upsert?: WebsiteProjectUpsertWithoutLikedByUsersInput
    connect?: WebsiteProjectWhereUniqueInput
    update?: XOR<XOR<WebsiteProjectUpdateToOneWithWhereWithoutLikedByUsersInput, WebsiteProjectUpdateWithoutLikedByUsersInput>, WebsiteProjectUncheckedUpdateWithoutLikedByUsersInput>
  }

  export type ArtistCommentCreateNestedManyWithoutArtistInput = {
    create?: XOR<ArtistCommentCreateWithoutArtistInput, ArtistCommentUncheckedCreateWithoutArtistInput> | ArtistCommentCreateWithoutArtistInput[] | ArtistCommentUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: ArtistCommentCreateOrConnectWithoutArtistInput | ArtistCommentCreateOrConnectWithoutArtistInput[]
    createMany?: ArtistCommentCreateManyArtistInputEnvelope
    connect?: ArtistCommentWhereUniqueInput | ArtistCommentWhereUniqueInput[]
  }

  export type UserLikedArtistCreateNestedManyWithoutLikedArtistInput = {
    create?: XOR<UserLikedArtistCreateWithoutLikedArtistInput, UserLikedArtistUncheckedCreateWithoutLikedArtistInput> | UserLikedArtistCreateWithoutLikedArtistInput[] | UserLikedArtistUncheckedCreateWithoutLikedArtistInput[]
    connectOrCreate?: UserLikedArtistCreateOrConnectWithoutLikedArtistInput | UserLikedArtistCreateOrConnectWithoutLikedArtistInput[]
    createMany?: UserLikedArtistCreateManyLikedArtistInputEnvelope
    connect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
  }

  export type ArtistCommentUncheckedCreateNestedManyWithoutArtistInput = {
    create?: XOR<ArtistCommentCreateWithoutArtistInput, ArtistCommentUncheckedCreateWithoutArtistInput> | ArtistCommentCreateWithoutArtistInput[] | ArtistCommentUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: ArtistCommentCreateOrConnectWithoutArtistInput | ArtistCommentCreateOrConnectWithoutArtistInput[]
    createMany?: ArtistCommentCreateManyArtistInputEnvelope
    connect?: ArtistCommentWhereUniqueInput | ArtistCommentWhereUniqueInput[]
  }

  export type UserLikedArtistUncheckedCreateNestedManyWithoutLikedArtistInput = {
    create?: XOR<UserLikedArtistCreateWithoutLikedArtistInput, UserLikedArtistUncheckedCreateWithoutLikedArtistInput> | UserLikedArtistCreateWithoutLikedArtistInput[] | UserLikedArtistUncheckedCreateWithoutLikedArtistInput[]
    connectOrCreate?: UserLikedArtistCreateOrConnectWithoutLikedArtistInput | UserLikedArtistCreateOrConnectWithoutLikedArtistInput[]
    createMany?: UserLikedArtistCreateManyLikedArtistInputEnvelope
    connect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
  }

  export type ArtistCommentUpdateManyWithoutArtistNestedInput = {
    create?: XOR<ArtistCommentCreateWithoutArtistInput, ArtistCommentUncheckedCreateWithoutArtistInput> | ArtistCommentCreateWithoutArtistInput[] | ArtistCommentUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: ArtistCommentCreateOrConnectWithoutArtistInput | ArtistCommentCreateOrConnectWithoutArtistInput[]
    upsert?: ArtistCommentUpsertWithWhereUniqueWithoutArtistInput | ArtistCommentUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: ArtistCommentCreateManyArtistInputEnvelope
    set?: ArtistCommentWhereUniqueInput | ArtistCommentWhereUniqueInput[]
    disconnect?: ArtistCommentWhereUniqueInput | ArtistCommentWhereUniqueInput[]
    delete?: ArtistCommentWhereUniqueInput | ArtistCommentWhereUniqueInput[]
    connect?: ArtistCommentWhereUniqueInput | ArtistCommentWhereUniqueInput[]
    update?: ArtistCommentUpdateWithWhereUniqueWithoutArtistInput | ArtistCommentUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: ArtistCommentUpdateManyWithWhereWithoutArtistInput | ArtistCommentUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: ArtistCommentScalarWhereInput | ArtistCommentScalarWhereInput[]
  }

  export type UserLikedArtistUpdateManyWithoutLikedArtistNestedInput = {
    create?: XOR<UserLikedArtistCreateWithoutLikedArtistInput, UserLikedArtistUncheckedCreateWithoutLikedArtistInput> | UserLikedArtistCreateWithoutLikedArtistInput[] | UserLikedArtistUncheckedCreateWithoutLikedArtistInput[]
    connectOrCreate?: UserLikedArtistCreateOrConnectWithoutLikedArtistInput | UserLikedArtistCreateOrConnectWithoutLikedArtistInput[]
    upsert?: UserLikedArtistUpsertWithWhereUniqueWithoutLikedArtistInput | UserLikedArtistUpsertWithWhereUniqueWithoutLikedArtistInput[]
    createMany?: UserLikedArtistCreateManyLikedArtistInputEnvelope
    set?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    disconnect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    delete?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    connect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    update?: UserLikedArtistUpdateWithWhereUniqueWithoutLikedArtistInput | UserLikedArtistUpdateWithWhereUniqueWithoutLikedArtistInput[]
    updateMany?: UserLikedArtistUpdateManyWithWhereWithoutLikedArtistInput | UserLikedArtistUpdateManyWithWhereWithoutLikedArtistInput[]
    deleteMany?: UserLikedArtistScalarWhereInput | UserLikedArtistScalarWhereInput[]
  }

  export type ArtistCommentUncheckedUpdateManyWithoutArtistNestedInput = {
    create?: XOR<ArtistCommentCreateWithoutArtistInput, ArtistCommentUncheckedCreateWithoutArtistInput> | ArtistCommentCreateWithoutArtistInput[] | ArtistCommentUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: ArtistCommentCreateOrConnectWithoutArtistInput | ArtistCommentCreateOrConnectWithoutArtistInput[]
    upsert?: ArtistCommentUpsertWithWhereUniqueWithoutArtistInput | ArtistCommentUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: ArtistCommentCreateManyArtistInputEnvelope
    set?: ArtistCommentWhereUniqueInput | ArtistCommentWhereUniqueInput[]
    disconnect?: ArtistCommentWhereUniqueInput | ArtistCommentWhereUniqueInput[]
    delete?: ArtistCommentWhereUniqueInput | ArtistCommentWhereUniqueInput[]
    connect?: ArtistCommentWhereUniqueInput | ArtistCommentWhereUniqueInput[]
    update?: ArtistCommentUpdateWithWhereUniqueWithoutArtistInput | ArtistCommentUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: ArtistCommentUpdateManyWithWhereWithoutArtistInput | ArtistCommentUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: ArtistCommentScalarWhereInput | ArtistCommentScalarWhereInput[]
  }

  export type UserLikedArtistUncheckedUpdateManyWithoutLikedArtistNestedInput = {
    create?: XOR<UserLikedArtistCreateWithoutLikedArtistInput, UserLikedArtistUncheckedCreateWithoutLikedArtistInput> | UserLikedArtistCreateWithoutLikedArtistInput[] | UserLikedArtistUncheckedCreateWithoutLikedArtistInput[]
    connectOrCreate?: UserLikedArtistCreateOrConnectWithoutLikedArtistInput | UserLikedArtistCreateOrConnectWithoutLikedArtistInput[]
    upsert?: UserLikedArtistUpsertWithWhereUniqueWithoutLikedArtistInput | UserLikedArtistUpsertWithWhereUniqueWithoutLikedArtistInput[]
    createMany?: UserLikedArtistCreateManyLikedArtistInputEnvelope
    set?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    disconnect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    delete?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    connect?: UserLikedArtistWhereUniqueInput | UserLikedArtistWhereUniqueInput[]
    update?: UserLikedArtistUpdateWithWhereUniqueWithoutLikedArtistInput | UserLikedArtistUpdateWithWhereUniqueWithoutLikedArtistInput[]
    updateMany?: UserLikedArtistUpdateManyWithWhereWithoutLikedArtistInput | UserLikedArtistUpdateManyWithWhereWithoutLikedArtistInput[]
    deleteMany?: UserLikedArtistScalarWhereInput | UserLikedArtistScalarWhereInput[]
  }

  export type ArtistCreateNestedOneWithoutCommentsInput = {
    create?: XOR<ArtistCreateWithoutCommentsInput, ArtistUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutCommentsInput
    connect?: ArtistWhereUniqueInput
  }

  export type ArtistUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<ArtistCreateWithoutCommentsInput, ArtistUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutCommentsInput
    upsert?: ArtistUpsertWithoutCommentsInput
    connect?: ArtistWhereUniqueInput
    update?: XOR<XOR<ArtistUpdateToOneWithWhereWithoutCommentsInput, ArtistUpdateWithoutCommentsInput>, ArtistUncheckedUpdateWithoutCommentsInput>
  }

  export type UserCreateNestedOneWithoutLikedArtistsInput = {
    create?: XOR<UserCreateWithoutLikedArtistsInput, UserUncheckedCreateWithoutLikedArtistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedArtistsInput
    connect?: UserWhereUniqueInput
  }

  export type ArtistCreateNestedOneWithoutLikedByUsersInput = {
    create?: XOR<ArtistCreateWithoutLikedByUsersInput, ArtistUncheckedCreateWithoutLikedByUsersInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutLikedByUsersInput
    connect?: ArtistWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLikedArtistsNestedInput = {
    create?: XOR<UserCreateWithoutLikedArtistsInput, UserUncheckedCreateWithoutLikedArtistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedArtistsInput
    upsert?: UserUpsertWithoutLikedArtistsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikedArtistsInput, UserUpdateWithoutLikedArtistsInput>, UserUncheckedUpdateWithoutLikedArtistsInput>
  }

  export type ArtistUpdateOneRequiredWithoutLikedByUsersNestedInput = {
    create?: XOR<ArtistCreateWithoutLikedByUsersInput, ArtistUncheckedCreateWithoutLikedByUsersInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutLikedByUsersInput
    upsert?: ArtistUpsertWithoutLikedByUsersInput
    connect?: ArtistWhereUniqueInput
    update?: XOR<XOR<ArtistUpdateToOneWithWhereWithoutLikedByUsersInput, ArtistUpdateWithoutLikedByUsersInput>, ArtistUncheckedUpdateWithoutLikedByUsersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    street?: StringFilter<"Address"> | string
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    zip?: StringFilter<"Address"> | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type WebsiteProjectCommentCreateWithoutWebsiteProjectInput = {
    id?: string
    comment: string
    likes?: number
  }

  export type WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput = {
    id?: string
    comment: string
    likes?: number
  }

  export type WebsiteProjectCommentCreateOrConnectWithoutWebsiteProjectInput = {
    where: WebsiteProjectCommentWhereUniqueInput
    create: XOR<WebsiteProjectCommentCreateWithoutWebsiteProjectInput, WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput>
  }

  export type WebsiteProjectCommentCreateManyWebsiteProjectInputEnvelope = {
    data: WebsiteProjectCommentCreateManyWebsiteProjectInput | WebsiteProjectCommentCreateManyWebsiteProjectInput[]
  }

  export type UserLikedWebsiteCreateWithoutLikedWebsiteInput = {
    id?: string
    user: UserCreateNestedOneWithoutLikedWebsitesInput
  }

  export type UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput = {
    id?: string
    userId: string
  }

  export type UserLikedWebsiteCreateOrConnectWithoutLikedWebsiteInput = {
    where: UserLikedWebsiteWhereUniqueInput
    create: XOR<UserLikedWebsiteCreateWithoutLikedWebsiteInput, UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput>
  }

  export type UserLikedWebsiteCreateManyLikedWebsiteInputEnvelope = {
    data: UserLikedWebsiteCreateManyLikedWebsiteInput | UserLikedWebsiteCreateManyLikedWebsiteInput[]
  }

  export type WebsiteProjectCommentUpsertWithWhereUniqueWithoutWebsiteProjectInput = {
    where: WebsiteProjectCommentWhereUniqueInput
    update: XOR<WebsiteProjectCommentUpdateWithoutWebsiteProjectInput, WebsiteProjectCommentUncheckedUpdateWithoutWebsiteProjectInput>
    create: XOR<WebsiteProjectCommentCreateWithoutWebsiteProjectInput, WebsiteProjectCommentUncheckedCreateWithoutWebsiteProjectInput>
  }

  export type WebsiteProjectCommentUpdateWithWhereUniqueWithoutWebsiteProjectInput = {
    where: WebsiteProjectCommentWhereUniqueInput
    data: XOR<WebsiteProjectCommentUpdateWithoutWebsiteProjectInput, WebsiteProjectCommentUncheckedUpdateWithoutWebsiteProjectInput>
  }

  export type WebsiteProjectCommentUpdateManyWithWhereWithoutWebsiteProjectInput = {
    where: WebsiteProjectCommentScalarWhereInput
    data: XOR<WebsiteProjectCommentUpdateManyMutationInput, WebsiteProjectCommentUncheckedUpdateManyWithoutWebsiteProjectInput>
  }

  export type WebsiteProjectCommentScalarWhereInput = {
    AND?: WebsiteProjectCommentScalarWhereInput | WebsiteProjectCommentScalarWhereInput[]
    OR?: WebsiteProjectCommentScalarWhereInput[]
    NOT?: WebsiteProjectCommentScalarWhereInput | WebsiteProjectCommentScalarWhereInput[]
    id?: StringFilter<"WebsiteProjectComment"> | string
    comment?: StringFilter<"WebsiteProjectComment"> | string
    websiteProjectId?: StringFilter<"WebsiteProjectComment"> | string
    likes?: IntFilter<"WebsiteProjectComment"> | number
  }

  export type UserLikedWebsiteUpsertWithWhereUniqueWithoutLikedWebsiteInput = {
    where: UserLikedWebsiteWhereUniqueInput
    update: XOR<UserLikedWebsiteUpdateWithoutLikedWebsiteInput, UserLikedWebsiteUncheckedUpdateWithoutLikedWebsiteInput>
    create: XOR<UserLikedWebsiteCreateWithoutLikedWebsiteInput, UserLikedWebsiteUncheckedCreateWithoutLikedWebsiteInput>
  }

  export type UserLikedWebsiteUpdateWithWhereUniqueWithoutLikedWebsiteInput = {
    where: UserLikedWebsiteWhereUniqueInput
    data: XOR<UserLikedWebsiteUpdateWithoutLikedWebsiteInput, UserLikedWebsiteUncheckedUpdateWithoutLikedWebsiteInput>
  }

  export type UserLikedWebsiteUpdateManyWithWhereWithoutLikedWebsiteInput = {
    where: UserLikedWebsiteScalarWhereInput
    data: XOR<UserLikedWebsiteUpdateManyMutationInput, UserLikedWebsiteUncheckedUpdateManyWithoutLikedWebsiteInput>
  }

  export type UserLikedWebsiteScalarWhereInput = {
    AND?: UserLikedWebsiteScalarWhereInput | UserLikedWebsiteScalarWhereInput[]
    OR?: UserLikedWebsiteScalarWhereInput[]
    NOT?: UserLikedWebsiteScalarWhereInput | UserLikedWebsiteScalarWhereInput[]
    id?: StringFilter<"UserLikedWebsite"> | string
    userId?: StringFilter<"UserLikedWebsite"> | string
    likedWebsiteId?: StringFilter<"UserLikedWebsite"> | string
  }

  export type WebsiteProjectCreateWithoutCommentsInput = {
    id?: string
    img: string
    title: string
    genre: string
    technologies: string
    description: string
    release_date: string
    link: string
    likes?: number
    likedByUsers?: UserLikedWebsiteCreateNestedManyWithoutLikedWebsiteInput
  }

  export type WebsiteProjectUncheckedCreateWithoutCommentsInput = {
    id?: string
    img: string
    title: string
    genre: string
    technologies: string
    description: string
    release_date: string
    link: string
    likes?: number
    likedByUsers?: UserLikedWebsiteUncheckedCreateNestedManyWithoutLikedWebsiteInput
  }

  export type WebsiteProjectCreateOrConnectWithoutCommentsInput = {
    where: WebsiteProjectWhereUniqueInput
    create: XOR<WebsiteProjectCreateWithoutCommentsInput, WebsiteProjectUncheckedCreateWithoutCommentsInput>
  }

  export type WebsiteProjectUpsertWithoutCommentsInput = {
    update: XOR<WebsiteProjectUpdateWithoutCommentsInput, WebsiteProjectUncheckedUpdateWithoutCommentsInput>
    create: XOR<WebsiteProjectCreateWithoutCommentsInput, WebsiteProjectUncheckedCreateWithoutCommentsInput>
    where?: WebsiteProjectWhereInput
  }

  export type WebsiteProjectUpdateToOneWithWhereWithoutCommentsInput = {
    where?: WebsiteProjectWhereInput
    data: XOR<WebsiteProjectUpdateWithoutCommentsInput, WebsiteProjectUncheckedUpdateWithoutCommentsInput>
  }

  export type WebsiteProjectUpdateWithoutCommentsInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    release_date?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    likedByUsers?: UserLikedWebsiteUpdateManyWithoutLikedWebsiteNestedInput
  }

  export type WebsiteProjectUncheckedUpdateWithoutCommentsInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    release_date?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    likedByUsers?: UserLikedWebsiteUncheckedUpdateManyWithoutLikedWebsiteNestedInput
  }

  export type SongCommentCreateWithoutSongInput = {
    id?: string
    comment: string
    likes?: number
  }

  export type SongCommentUncheckedCreateWithoutSongInput = {
    id?: string
    comment: string
    likes?: number
  }

  export type SongCommentCreateOrConnectWithoutSongInput = {
    where: SongCommentWhereUniqueInput
    create: XOR<SongCommentCreateWithoutSongInput, SongCommentUncheckedCreateWithoutSongInput>
  }

  export type SongCommentCreateManySongInputEnvelope = {
    data: SongCommentCreateManySongInput | SongCommentCreateManySongInput[]
  }

  export type UserLikedSongCreateWithoutLikedSongInput = {
    id?: string
    user: UserCreateNestedOneWithoutLikedSongsInput
  }

  export type UserLikedSongUncheckedCreateWithoutLikedSongInput = {
    id?: string
    userId: string
  }

  export type UserLikedSongCreateOrConnectWithoutLikedSongInput = {
    where: UserLikedSongWhereUniqueInput
    create: XOR<UserLikedSongCreateWithoutLikedSongInput, UserLikedSongUncheckedCreateWithoutLikedSongInput>
  }

  export type UserLikedSongCreateManyLikedSongInputEnvelope = {
    data: UserLikedSongCreateManyLikedSongInput | UserLikedSongCreateManyLikedSongInput[]
  }

  export type SongCommentUpsertWithWhereUniqueWithoutSongInput = {
    where: SongCommentWhereUniqueInput
    update: XOR<SongCommentUpdateWithoutSongInput, SongCommentUncheckedUpdateWithoutSongInput>
    create: XOR<SongCommentCreateWithoutSongInput, SongCommentUncheckedCreateWithoutSongInput>
  }

  export type SongCommentUpdateWithWhereUniqueWithoutSongInput = {
    where: SongCommentWhereUniqueInput
    data: XOR<SongCommentUpdateWithoutSongInput, SongCommentUncheckedUpdateWithoutSongInput>
  }

  export type SongCommentUpdateManyWithWhereWithoutSongInput = {
    where: SongCommentScalarWhereInput
    data: XOR<SongCommentUpdateManyMutationInput, SongCommentUncheckedUpdateManyWithoutSongInput>
  }

  export type SongCommentScalarWhereInput = {
    AND?: SongCommentScalarWhereInput | SongCommentScalarWhereInput[]
    OR?: SongCommentScalarWhereInput[]
    NOT?: SongCommentScalarWhereInput | SongCommentScalarWhereInput[]
    id?: StringFilter<"SongComment"> | string
    comment?: StringFilter<"SongComment"> | string
    songId?: StringFilter<"SongComment"> | string
    likes?: IntFilter<"SongComment"> | number
  }

  export type UserLikedSongUpsertWithWhereUniqueWithoutLikedSongInput = {
    where: UserLikedSongWhereUniqueInput
    update: XOR<UserLikedSongUpdateWithoutLikedSongInput, UserLikedSongUncheckedUpdateWithoutLikedSongInput>
    create: XOR<UserLikedSongCreateWithoutLikedSongInput, UserLikedSongUncheckedCreateWithoutLikedSongInput>
  }

  export type UserLikedSongUpdateWithWhereUniqueWithoutLikedSongInput = {
    where: UserLikedSongWhereUniqueInput
    data: XOR<UserLikedSongUpdateWithoutLikedSongInput, UserLikedSongUncheckedUpdateWithoutLikedSongInput>
  }

  export type UserLikedSongUpdateManyWithWhereWithoutLikedSongInput = {
    where: UserLikedSongScalarWhereInput
    data: XOR<UserLikedSongUpdateManyMutationInput, UserLikedSongUncheckedUpdateManyWithoutLikedSongInput>
  }

  export type UserLikedSongScalarWhereInput = {
    AND?: UserLikedSongScalarWhereInput | UserLikedSongScalarWhereInput[]
    OR?: UserLikedSongScalarWhereInput[]
    NOT?: UserLikedSongScalarWhereInput | UserLikedSongScalarWhereInput[]
    id?: StringFilter<"UserLikedSong"> | string
    userId?: StringFilter<"UserLikedSong"> | string
    likedSongId?: StringFilter<"UserLikedSong"> | string
  }

  export type SongCreateWithoutCommentsInput = {
    id?: string
    img: string
    title: string
    albumName: string
    artist: string
    genre: string
    releaseDate: string
    duration: string
    plays?: number
    song: string
    likes?: number
    likedByUsers?: UserLikedSongCreateNestedManyWithoutLikedSongInput
  }

  export type SongUncheckedCreateWithoutCommentsInput = {
    id?: string
    img: string
    title: string
    albumName: string
    artist: string
    genre: string
    releaseDate: string
    duration: string
    plays?: number
    song: string
    likes?: number
    likedByUsers?: UserLikedSongUncheckedCreateNestedManyWithoutLikedSongInput
  }

  export type SongCreateOrConnectWithoutCommentsInput = {
    where: SongWhereUniqueInput
    create: XOR<SongCreateWithoutCommentsInput, SongUncheckedCreateWithoutCommentsInput>
  }

  export type SongUpsertWithoutCommentsInput = {
    update: XOR<SongUpdateWithoutCommentsInput, SongUncheckedUpdateWithoutCommentsInput>
    create: XOR<SongCreateWithoutCommentsInput, SongUncheckedCreateWithoutCommentsInput>
    where?: SongWhereInput
  }

  export type SongUpdateToOneWithWhereWithoutCommentsInput = {
    where?: SongWhereInput
    data: XOR<SongUpdateWithoutCommentsInput, SongUncheckedUpdateWithoutCommentsInput>
  }

  export type SongUpdateWithoutCommentsInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    albumName?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    plays?: IntFieldUpdateOperationsInput | number
    song?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    likedByUsers?: UserLikedSongUpdateManyWithoutLikedSongNestedInput
  }

  export type SongUncheckedUpdateWithoutCommentsInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    albumName?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    plays?: IntFieldUpdateOperationsInput | number
    song?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    likedByUsers?: UserLikedSongUncheckedUpdateManyWithoutLikedSongNestedInput
  }

  export type UserCreateWithoutLikedSongsInput = {
    id?: string
    email: string
    name?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteCreateNestedManyWithoutUserInput
    likedArtists?: UserLikedArtistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikedSongsInput = {
    id?: string
    email: string
    name?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteUncheckedCreateNestedManyWithoutUserInput
    likedArtists?: UserLikedArtistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikedSongsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikedSongsInput, UserUncheckedCreateWithoutLikedSongsInput>
  }

  export type SongCreateWithoutLikedByUsersInput = {
    id?: string
    img: string
    title: string
    albumName: string
    artist: string
    genre: string
    releaseDate: string
    duration: string
    plays?: number
    song: string
    likes?: number
    comments?: SongCommentCreateNestedManyWithoutSongInput
  }

  export type SongUncheckedCreateWithoutLikedByUsersInput = {
    id?: string
    img: string
    title: string
    albumName: string
    artist: string
    genre: string
    releaseDate: string
    duration: string
    plays?: number
    song: string
    likes?: number
    comments?: SongCommentUncheckedCreateNestedManyWithoutSongInput
  }

  export type SongCreateOrConnectWithoutLikedByUsersInput = {
    where: SongWhereUniqueInput
    create: XOR<SongCreateWithoutLikedByUsersInput, SongUncheckedCreateWithoutLikedByUsersInput>
  }

  export type UserUpsertWithoutLikedSongsInput = {
    update: XOR<UserUpdateWithoutLikedSongsInput, UserUncheckedUpdateWithoutLikedSongsInput>
    create: XOR<UserCreateWithoutLikedSongsInput, UserUncheckedCreateWithoutLikedSongsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikedSongsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikedSongsInput, UserUncheckedUpdateWithoutLikedSongsInput>
  }

  export type UserUpdateWithoutLikedSongsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteUpdateManyWithoutUserNestedInput
    likedArtists?: UserLikedArtistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikedSongsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteUncheckedUpdateManyWithoutUserNestedInput
    likedArtists?: UserLikedArtistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SongUpsertWithoutLikedByUsersInput = {
    update: XOR<SongUpdateWithoutLikedByUsersInput, SongUncheckedUpdateWithoutLikedByUsersInput>
    create: XOR<SongCreateWithoutLikedByUsersInput, SongUncheckedCreateWithoutLikedByUsersInput>
    where?: SongWhereInput
  }

  export type SongUpdateToOneWithWhereWithoutLikedByUsersInput = {
    where?: SongWhereInput
    data: XOR<SongUpdateWithoutLikedByUsersInput, SongUncheckedUpdateWithoutLikedByUsersInput>
  }

  export type SongUpdateWithoutLikedByUsersInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    albumName?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    plays?: IntFieldUpdateOperationsInput | number
    song?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: SongCommentUpdateManyWithoutSongNestedInput
  }

  export type SongUncheckedUpdateWithoutLikedByUsersInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    albumName?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    plays?: IntFieldUpdateOperationsInput | number
    song?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: SongCommentUncheckedUpdateManyWithoutSongNestedInput
  }

  export type UserLikedWebsiteCreateWithoutUserInput = {
    id?: string
    likedWebsite: WebsiteProjectCreateNestedOneWithoutLikedByUsersInput
  }

  export type UserLikedWebsiteUncheckedCreateWithoutUserInput = {
    id?: string
    likedWebsiteId: string
  }

  export type UserLikedWebsiteCreateOrConnectWithoutUserInput = {
    where: UserLikedWebsiteWhereUniqueInput
    create: XOR<UserLikedWebsiteCreateWithoutUserInput, UserLikedWebsiteUncheckedCreateWithoutUserInput>
  }

  export type UserLikedWebsiteCreateManyUserInputEnvelope = {
    data: UserLikedWebsiteCreateManyUserInput | UserLikedWebsiteCreateManyUserInput[]
  }

  export type UserLikedSongCreateWithoutUserInput = {
    id?: string
    likedSong: SongCreateNestedOneWithoutLikedByUsersInput
  }

  export type UserLikedSongUncheckedCreateWithoutUserInput = {
    id?: string
    likedSongId: string
  }

  export type UserLikedSongCreateOrConnectWithoutUserInput = {
    where: UserLikedSongWhereUniqueInput
    create: XOR<UserLikedSongCreateWithoutUserInput, UserLikedSongUncheckedCreateWithoutUserInput>
  }

  export type UserLikedSongCreateManyUserInputEnvelope = {
    data: UserLikedSongCreateManyUserInput | UserLikedSongCreateManyUserInput[]
  }

  export type UserLikedArtistCreateWithoutUserInput = {
    id?: string
    likedArtist: ArtistCreateNestedOneWithoutLikedByUsersInput
  }

  export type UserLikedArtistUncheckedCreateWithoutUserInput = {
    id?: string
    likedArtistId: string
  }

  export type UserLikedArtistCreateOrConnectWithoutUserInput = {
    where: UserLikedArtistWhereUniqueInput
    create: XOR<UserLikedArtistCreateWithoutUserInput, UserLikedArtistUncheckedCreateWithoutUserInput>
  }

  export type UserLikedArtistCreateManyUserInputEnvelope = {
    data: UserLikedArtistCreateManyUserInput | UserLikedArtistCreateManyUserInput[]
  }

  export type AddressUpsertInput = {
    set: AddressCreateInput | null
    update: AddressUpdateInput
  }

  export type UserLikedWebsiteUpsertWithWhereUniqueWithoutUserInput = {
    where: UserLikedWebsiteWhereUniqueInput
    update: XOR<UserLikedWebsiteUpdateWithoutUserInput, UserLikedWebsiteUncheckedUpdateWithoutUserInput>
    create: XOR<UserLikedWebsiteCreateWithoutUserInput, UserLikedWebsiteUncheckedCreateWithoutUserInput>
  }

  export type UserLikedWebsiteUpdateWithWhereUniqueWithoutUserInput = {
    where: UserLikedWebsiteWhereUniqueInput
    data: XOR<UserLikedWebsiteUpdateWithoutUserInput, UserLikedWebsiteUncheckedUpdateWithoutUserInput>
  }

  export type UserLikedWebsiteUpdateManyWithWhereWithoutUserInput = {
    where: UserLikedWebsiteScalarWhereInput
    data: XOR<UserLikedWebsiteUpdateManyMutationInput, UserLikedWebsiteUncheckedUpdateManyWithoutUserInput>
  }

  export type UserLikedSongUpsertWithWhereUniqueWithoutUserInput = {
    where: UserLikedSongWhereUniqueInput
    update: XOR<UserLikedSongUpdateWithoutUserInput, UserLikedSongUncheckedUpdateWithoutUserInput>
    create: XOR<UserLikedSongCreateWithoutUserInput, UserLikedSongUncheckedCreateWithoutUserInput>
  }

  export type UserLikedSongUpdateWithWhereUniqueWithoutUserInput = {
    where: UserLikedSongWhereUniqueInput
    data: XOR<UserLikedSongUpdateWithoutUserInput, UserLikedSongUncheckedUpdateWithoutUserInput>
  }

  export type UserLikedSongUpdateManyWithWhereWithoutUserInput = {
    where: UserLikedSongScalarWhereInput
    data: XOR<UserLikedSongUpdateManyMutationInput, UserLikedSongUncheckedUpdateManyWithoutUserInput>
  }

  export type UserLikedArtistUpsertWithWhereUniqueWithoutUserInput = {
    where: UserLikedArtistWhereUniqueInput
    update: XOR<UserLikedArtistUpdateWithoutUserInput, UserLikedArtistUncheckedUpdateWithoutUserInput>
    create: XOR<UserLikedArtistCreateWithoutUserInput, UserLikedArtistUncheckedCreateWithoutUserInput>
  }

  export type UserLikedArtistUpdateWithWhereUniqueWithoutUserInput = {
    where: UserLikedArtistWhereUniqueInput
    data: XOR<UserLikedArtistUpdateWithoutUserInput, UserLikedArtistUncheckedUpdateWithoutUserInput>
  }

  export type UserLikedArtistUpdateManyWithWhereWithoutUserInput = {
    where: UserLikedArtistScalarWhereInput
    data: XOR<UserLikedArtistUpdateManyMutationInput, UserLikedArtistUncheckedUpdateManyWithoutUserInput>
  }

  export type UserLikedArtistScalarWhereInput = {
    AND?: UserLikedArtistScalarWhereInput | UserLikedArtistScalarWhereInput[]
    OR?: UserLikedArtistScalarWhereInput[]
    NOT?: UserLikedArtistScalarWhereInput | UserLikedArtistScalarWhereInput[]
    id?: StringFilter<"UserLikedArtist"> | string
    userId?: StringFilter<"UserLikedArtist"> | string
    likedArtistId?: StringFilter<"UserLikedArtist"> | string
  }

  export type UserCreateWithoutLikedWebsitesInput = {
    id?: string
    email: string
    name?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
    likedSongs?: UserLikedSongCreateNestedManyWithoutUserInput
    likedArtists?: UserLikedArtistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikedWebsitesInput = {
    id?: string
    email: string
    name?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
    likedSongs?: UserLikedSongUncheckedCreateNestedManyWithoutUserInput
    likedArtists?: UserLikedArtistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikedWebsitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikedWebsitesInput, UserUncheckedCreateWithoutLikedWebsitesInput>
  }

  export type WebsiteProjectCreateWithoutLikedByUsersInput = {
    id?: string
    img: string
    title: string
    genre: string
    technologies: string
    description: string
    release_date: string
    link: string
    likes?: number
    comments?: WebsiteProjectCommentCreateNestedManyWithoutWebsiteProjectInput
  }

  export type WebsiteProjectUncheckedCreateWithoutLikedByUsersInput = {
    id?: string
    img: string
    title: string
    genre: string
    technologies: string
    description: string
    release_date: string
    link: string
    likes?: number
    comments?: WebsiteProjectCommentUncheckedCreateNestedManyWithoutWebsiteProjectInput
  }

  export type WebsiteProjectCreateOrConnectWithoutLikedByUsersInput = {
    where: WebsiteProjectWhereUniqueInput
    create: XOR<WebsiteProjectCreateWithoutLikedByUsersInput, WebsiteProjectUncheckedCreateWithoutLikedByUsersInput>
  }

  export type UserUpsertWithoutLikedWebsitesInput = {
    update: XOR<UserUpdateWithoutLikedWebsitesInput, UserUncheckedUpdateWithoutLikedWebsitesInput>
    create: XOR<UserCreateWithoutLikedWebsitesInput, UserUncheckedCreateWithoutLikedWebsitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikedWebsitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikedWebsitesInput, UserUncheckedUpdateWithoutLikedWebsitesInput>
  }

  export type UserUpdateWithoutLikedWebsitesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
    likedSongs?: UserLikedSongUpdateManyWithoutUserNestedInput
    likedArtists?: UserLikedArtistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikedWebsitesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
    likedSongs?: UserLikedSongUncheckedUpdateManyWithoutUserNestedInput
    likedArtists?: UserLikedArtistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WebsiteProjectUpsertWithoutLikedByUsersInput = {
    update: XOR<WebsiteProjectUpdateWithoutLikedByUsersInput, WebsiteProjectUncheckedUpdateWithoutLikedByUsersInput>
    create: XOR<WebsiteProjectCreateWithoutLikedByUsersInput, WebsiteProjectUncheckedCreateWithoutLikedByUsersInput>
    where?: WebsiteProjectWhereInput
  }

  export type WebsiteProjectUpdateToOneWithWhereWithoutLikedByUsersInput = {
    where?: WebsiteProjectWhereInput
    data: XOR<WebsiteProjectUpdateWithoutLikedByUsersInput, WebsiteProjectUncheckedUpdateWithoutLikedByUsersInput>
  }

  export type WebsiteProjectUpdateWithoutLikedByUsersInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    release_date?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: WebsiteProjectCommentUpdateManyWithoutWebsiteProjectNestedInput
  }

  export type WebsiteProjectUncheckedUpdateWithoutLikedByUsersInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    release_date?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: WebsiteProjectCommentUncheckedUpdateManyWithoutWebsiteProjectNestedInput
  }

  export type ArtistCommentCreateWithoutArtistInput = {
    id?: string
    comment: string
    likes?: number
  }

  export type ArtistCommentUncheckedCreateWithoutArtistInput = {
    id?: string
    comment: string
    likes?: number
  }

  export type ArtistCommentCreateOrConnectWithoutArtistInput = {
    where: ArtistCommentWhereUniqueInput
    create: XOR<ArtistCommentCreateWithoutArtistInput, ArtistCommentUncheckedCreateWithoutArtistInput>
  }

  export type ArtistCommentCreateManyArtistInputEnvelope = {
    data: ArtistCommentCreateManyArtistInput | ArtistCommentCreateManyArtistInput[]
  }

  export type UserLikedArtistCreateWithoutLikedArtistInput = {
    id?: string
    user: UserCreateNestedOneWithoutLikedArtistsInput
  }

  export type UserLikedArtistUncheckedCreateWithoutLikedArtistInput = {
    id?: string
    userId: string
  }

  export type UserLikedArtistCreateOrConnectWithoutLikedArtistInput = {
    where: UserLikedArtistWhereUniqueInput
    create: XOR<UserLikedArtistCreateWithoutLikedArtistInput, UserLikedArtistUncheckedCreateWithoutLikedArtistInput>
  }

  export type UserLikedArtistCreateManyLikedArtistInputEnvelope = {
    data: UserLikedArtistCreateManyLikedArtistInput | UserLikedArtistCreateManyLikedArtistInput[]
  }

  export type ArtistCommentUpsertWithWhereUniqueWithoutArtistInput = {
    where: ArtistCommentWhereUniqueInput
    update: XOR<ArtistCommentUpdateWithoutArtistInput, ArtistCommentUncheckedUpdateWithoutArtistInput>
    create: XOR<ArtistCommentCreateWithoutArtistInput, ArtistCommentUncheckedCreateWithoutArtistInput>
  }

  export type ArtistCommentUpdateWithWhereUniqueWithoutArtistInput = {
    where: ArtistCommentWhereUniqueInput
    data: XOR<ArtistCommentUpdateWithoutArtistInput, ArtistCommentUncheckedUpdateWithoutArtistInput>
  }

  export type ArtistCommentUpdateManyWithWhereWithoutArtistInput = {
    where: ArtistCommentScalarWhereInput
    data: XOR<ArtistCommentUpdateManyMutationInput, ArtistCommentUncheckedUpdateManyWithoutArtistInput>
  }

  export type ArtistCommentScalarWhereInput = {
    AND?: ArtistCommentScalarWhereInput | ArtistCommentScalarWhereInput[]
    OR?: ArtistCommentScalarWhereInput[]
    NOT?: ArtistCommentScalarWhereInput | ArtistCommentScalarWhereInput[]
    id?: StringFilter<"ArtistComment"> | string
    comment?: StringFilter<"ArtistComment"> | string
    artistId?: StringFilter<"ArtistComment"> | string
    likes?: IntFilter<"ArtistComment"> | number
  }

  export type UserLikedArtistUpsertWithWhereUniqueWithoutLikedArtistInput = {
    where: UserLikedArtistWhereUniqueInput
    update: XOR<UserLikedArtistUpdateWithoutLikedArtistInput, UserLikedArtistUncheckedUpdateWithoutLikedArtistInput>
    create: XOR<UserLikedArtistCreateWithoutLikedArtistInput, UserLikedArtistUncheckedCreateWithoutLikedArtistInput>
  }

  export type UserLikedArtistUpdateWithWhereUniqueWithoutLikedArtistInput = {
    where: UserLikedArtistWhereUniqueInput
    data: XOR<UserLikedArtistUpdateWithoutLikedArtistInput, UserLikedArtistUncheckedUpdateWithoutLikedArtistInput>
  }

  export type UserLikedArtistUpdateManyWithWhereWithoutLikedArtistInput = {
    where: UserLikedArtistScalarWhereInput
    data: XOR<UserLikedArtistUpdateManyMutationInput, UserLikedArtistUncheckedUpdateManyWithoutLikedArtistInput>
  }

  export type ArtistCreateWithoutCommentsInput = {
    id?: string
    img: string
    title: string
    genre: string
    description: string
    releaseDate: string
    likes?: number
    likedByUsers?: UserLikedArtistCreateNestedManyWithoutLikedArtistInput
  }

  export type ArtistUncheckedCreateWithoutCommentsInput = {
    id?: string
    img: string
    title: string
    genre: string
    description: string
    releaseDate: string
    likes?: number
    likedByUsers?: UserLikedArtistUncheckedCreateNestedManyWithoutLikedArtistInput
  }

  export type ArtistCreateOrConnectWithoutCommentsInput = {
    where: ArtistWhereUniqueInput
    create: XOR<ArtistCreateWithoutCommentsInput, ArtistUncheckedCreateWithoutCommentsInput>
  }

  export type ArtistUpsertWithoutCommentsInput = {
    update: XOR<ArtistUpdateWithoutCommentsInput, ArtistUncheckedUpdateWithoutCommentsInput>
    create: XOR<ArtistCreateWithoutCommentsInput, ArtistUncheckedCreateWithoutCommentsInput>
    where?: ArtistWhereInput
  }

  export type ArtistUpdateToOneWithWhereWithoutCommentsInput = {
    where?: ArtistWhereInput
    data: XOR<ArtistUpdateWithoutCommentsInput, ArtistUncheckedUpdateWithoutCommentsInput>
  }

  export type ArtistUpdateWithoutCommentsInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    likedByUsers?: UserLikedArtistUpdateManyWithoutLikedArtistNestedInput
  }

  export type ArtistUncheckedUpdateWithoutCommentsInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    likedByUsers?: UserLikedArtistUncheckedUpdateManyWithoutLikedArtistNestedInput
  }

  export type UserCreateWithoutLikedArtistsInput = {
    id?: string
    email: string
    name?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteCreateNestedManyWithoutUserInput
    likedSongs?: UserLikedSongCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikedArtistsInput = {
    id?: string
    email: string
    name?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteUncheckedCreateNestedManyWithoutUserInput
    likedSongs?: UserLikedSongUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikedArtistsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikedArtistsInput, UserUncheckedCreateWithoutLikedArtistsInput>
  }

  export type ArtistCreateWithoutLikedByUsersInput = {
    id?: string
    img: string
    title: string
    genre: string
    description: string
    releaseDate: string
    likes?: number
    comments?: ArtistCommentCreateNestedManyWithoutArtistInput
  }

  export type ArtistUncheckedCreateWithoutLikedByUsersInput = {
    id?: string
    img: string
    title: string
    genre: string
    description: string
    releaseDate: string
    likes?: number
    comments?: ArtistCommentUncheckedCreateNestedManyWithoutArtistInput
  }

  export type ArtistCreateOrConnectWithoutLikedByUsersInput = {
    where: ArtistWhereUniqueInput
    create: XOR<ArtistCreateWithoutLikedByUsersInput, ArtistUncheckedCreateWithoutLikedByUsersInput>
  }

  export type UserUpsertWithoutLikedArtistsInput = {
    update: XOR<UserUpdateWithoutLikedArtistsInput, UserUncheckedUpdateWithoutLikedArtistsInput>
    create: XOR<UserCreateWithoutLikedArtistsInput, UserUncheckedCreateWithoutLikedArtistsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikedArtistsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikedArtistsInput, UserUncheckedUpdateWithoutLikedArtistsInput>
  }

  export type UserUpdateWithoutLikedArtistsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteUpdateManyWithoutUserNestedInput
    likedSongs?: UserLikedSongUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikedArtistsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
    likedWebsites?: UserLikedWebsiteUncheckedUpdateManyWithoutUserNestedInput
    likedSongs?: UserLikedSongUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArtistUpsertWithoutLikedByUsersInput = {
    update: XOR<ArtistUpdateWithoutLikedByUsersInput, ArtistUncheckedUpdateWithoutLikedByUsersInput>
    create: XOR<ArtistCreateWithoutLikedByUsersInput, ArtistUncheckedCreateWithoutLikedByUsersInput>
    where?: ArtistWhereInput
  }

  export type ArtistUpdateToOneWithWhereWithoutLikedByUsersInput = {
    where?: ArtistWhereInput
    data: XOR<ArtistUpdateWithoutLikedByUsersInput, ArtistUncheckedUpdateWithoutLikedByUsersInput>
  }

  export type ArtistUpdateWithoutLikedByUsersInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: ArtistCommentUpdateManyWithoutArtistNestedInput
  }

  export type ArtistUncheckedUpdateWithoutLikedByUsersInput = {
    img?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    releaseDate?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: ArtistCommentUncheckedUpdateManyWithoutArtistNestedInput
  }

  export type WebsiteProjectCommentCreateManyWebsiteProjectInput = {
    id?: string
    comment: string
    likes?: number
  }

  export type UserLikedWebsiteCreateManyLikedWebsiteInput = {
    id?: string
    userId: string
  }

  export type WebsiteProjectCommentUpdateWithoutWebsiteProjectInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type WebsiteProjectCommentUncheckedUpdateWithoutWebsiteProjectInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type WebsiteProjectCommentUncheckedUpdateManyWithoutWebsiteProjectInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type UserLikedWebsiteUpdateWithoutLikedWebsiteInput = {
    user?: UserUpdateOneRequiredWithoutLikedWebsitesNestedInput
  }

  export type UserLikedWebsiteUncheckedUpdateWithoutLikedWebsiteInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedWebsiteUncheckedUpdateManyWithoutLikedWebsiteInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SongCommentCreateManySongInput = {
    id?: string
    comment: string
    likes?: number
  }

  export type UserLikedSongCreateManyLikedSongInput = {
    id?: string
    userId: string
  }

  export type SongCommentUpdateWithoutSongInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type SongCommentUncheckedUpdateWithoutSongInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type SongCommentUncheckedUpdateManyWithoutSongInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type UserLikedSongUpdateWithoutLikedSongInput = {
    user?: UserUpdateOneRequiredWithoutLikedSongsNestedInput
  }

  export type UserLikedSongUncheckedUpdateWithoutLikedSongInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedSongUncheckedUpdateManyWithoutLikedSongInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedWebsiteCreateManyUserInput = {
    id?: string
    likedWebsiteId: string
  }

  export type UserLikedSongCreateManyUserInput = {
    id?: string
    likedSongId: string
  }

  export type UserLikedArtistCreateManyUserInput = {
    id?: string
    likedArtistId: string
  }

  export type AddressUpdateInput = {
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedWebsiteUpdateWithoutUserInput = {
    likedWebsite?: WebsiteProjectUpdateOneRequiredWithoutLikedByUsersNestedInput
  }

  export type UserLikedWebsiteUncheckedUpdateWithoutUserInput = {
    likedWebsiteId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedWebsiteUncheckedUpdateManyWithoutUserInput = {
    likedWebsiteId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedSongUpdateWithoutUserInput = {
    likedSong?: SongUpdateOneRequiredWithoutLikedByUsersNestedInput
  }

  export type UserLikedSongUncheckedUpdateWithoutUserInput = {
    likedSongId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedSongUncheckedUpdateManyWithoutUserInput = {
    likedSongId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedArtistUpdateWithoutUserInput = {
    likedArtist?: ArtistUpdateOneRequiredWithoutLikedByUsersNestedInput
  }

  export type UserLikedArtistUncheckedUpdateWithoutUserInput = {
    likedArtistId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedArtistUncheckedUpdateManyWithoutUserInput = {
    likedArtistId?: StringFieldUpdateOperationsInput | string
  }

  export type ArtistCommentCreateManyArtistInput = {
    id?: string
    comment: string
    likes?: number
  }

  export type UserLikedArtistCreateManyLikedArtistInput = {
    id?: string
    userId: string
  }

  export type ArtistCommentUpdateWithoutArtistInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type ArtistCommentUncheckedUpdateWithoutArtistInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type ArtistCommentUncheckedUpdateManyWithoutArtistInput = {
    comment?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
  }

  export type UserLikedArtistUpdateWithoutLikedArtistInput = {
    user?: UserUpdateOneRequiredWithoutLikedArtistsNestedInput
  }

  export type UserLikedArtistUncheckedUpdateWithoutLikedArtistInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserLikedArtistUncheckedUpdateManyWithoutLikedArtistInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use WebsiteProjectCountOutputTypeDefaultArgs instead
     */
    export type WebsiteProjectCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WebsiteProjectCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SongCountOutputTypeDefaultArgs instead
     */
    export type SongCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SongCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArtistCountOutputTypeDefaultArgs instead
     */
    export type ArtistCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArtistCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AddressDefaultArgs instead
     */
    export type AddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AddressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WebsiteProjectDefaultArgs instead
     */
    export type WebsiteProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WebsiteProjectDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WebsiteProjectCommentDefaultArgs instead
     */
    export type WebsiteProjectCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WebsiteProjectCommentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SongDefaultArgs instead
     */
    export type SongArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SongDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SongCommentDefaultArgs instead
     */
    export type SongCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SongCommentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserLikedSongDefaultArgs instead
     */
    export type UserLikedSongArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserLikedSongDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserLikedWebsiteDefaultArgs instead
     */
    export type UserLikedWebsiteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserLikedWebsiteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArtistDefaultArgs instead
     */
    export type ArtistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArtistDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArtistCommentDefaultArgs instead
     */
    export type ArtistCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArtistCommentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserLikedArtistDefaultArgs instead
     */
    export type UserLikedArtistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserLikedArtistDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}