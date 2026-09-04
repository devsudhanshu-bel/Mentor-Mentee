
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model StudentProfile
 * 
 */
export type StudentProfile = $Result.DefaultSelection<Prisma.$StudentProfilePayload>
/**
 * Model StudentParentDetails
 * 
 */
export type StudentParentDetails = $Result.DefaultSelection<Prisma.$StudentParentDetailsPayload>
/**
 * Model StudentContactDetails
 * 
 */
export type StudentContactDetails = $Result.DefaultSelection<Prisma.$StudentContactDetailsPayload>
/**
 * Model StudentDocument
 * 
 */
export type StudentDocument = $Result.DefaultSelection<Prisma.$StudentDocumentPayload>
/**
 * Model AcademicSemester
 * 
 */
export type AcademicSemester = $Result.DefaultSelection<Prisma.$AcademicSemesterPayload>
/**
 * Model AcademicSubject
 * 
 */
export type AcademicSubject = $Result.DefaultSelection<Prisma.$AcademicSubjectPayload>
/**
 * Model AcademicBacklog
 * 
 */
export type AcademicBacklog = $Result.DefaultSelection<Prisma.$AcademicBacklogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  MENTOR: 'MENTOR',
  STUDENT: 'STUDENT'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const BloodGroup: {
  A_POSITIVE: 'A_POSITIVE',
  A_NEGATIVE: 'A_NEGATIVE',
  B_POSITIVE: 'B_POSITIVE',
  B_NEGATIVE: 'B_NEGATIVE',
  AB_POSITIVE: 'AB_POSITIVE',
  AB_NEGATIVE: 'AB_NEGATIVE',
  O_POSITIVE: 'O_POSITIVE',
  O_NEGATIVE: 'O_NEGATIVE'
};

export type BloodGroup = (typeof BloodGroup)[keyof typeof BloodGroup]


export const StudentType: {
  DAY_SCHOLAR: 'DAY_SCHOLAR',
  HOSTELLER: 'HOSTELLER'
};

export type StudentType = (typeof StudentType)[keyof typeof StudentType]


export const AddressType: {
  HOME: 'HOME',
  HOSTEL: 'HOSTEL',
  RENTED: 'RENTED',
  OTHER: 'OTHER'
};

export type AddressType = (typeof AddressType)[keyof typeof AddressType]


export const PreferredContactMethod: {
  MOBILE: 'MOBILE',
  EMAIL: 'EMAIL',
  WHATSAPP: 'WHATSAPP'
};

export type PreferredContactMethod = (typeof PreferredContactMethod)[keyof typeof PreferredContactMethod]


export const CommunicationEmailPreference: {
  UNIVERSITY_EMAIL: 'UNIVERSITY_EMAIL',
  PERSONAL_EMAIL: 'PERSONAL_EMAIL'
};

export type CommunicationEmailPreference = (typeof CommunicationEmailPreference)[keyof typeof CommunicationEmailPreference]


export const AcademicSemesterStatus: {
  LOCKED: 'LOCKED',
  CURRENT: 'CURRENT',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type AcademicSemesterStatus = (typeof AcademicSemesterStatus)[keyof typeof AcademicSemesterStatus]


export const AcademicEntryStatus: {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  VERIFIED: 'VERIFIED'
};

export type AcademicEntryStatus = (typeof AcademicEntryStatus)[keyof typeof AcademicEntryStatus]


export const DocumentCategory: {
  ACADEMICS: 'ACADEMICS',
  CERTIFICATES: 'CERTIFICATES',
  INTERNSHIPS: 'INTERNSHIPS',
  PROJECTS: 'PROJECTS',
  RESEARCH: 'RESEARCH',
  CO_CURRICULAR: 'CO_CURRICULAR',
  EXTRA_CURRICULAR: 'EXTRA_CURRICULAR',
  AWARDS: 'AWARDS',
  PERSONAL: 'PERSONAL',
  OTHER: 'OTHER'
};

export type DocumentCategory = (typeof DocumentCategory)[keyof typeof DocumentCategory]


export const AcademicBacklogStatus: {
  ACTIVE: 'ACTIVE',
  CLEARED: 'CLEARED'
};

export type AcademicBacklogStatus = (typeof AcademicBacklogStatus)[keyof typeof AcademicBacklogStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type BloodGroup = $Enums.BloodGroup

export const BloodGroup: typeof $Enums.BloodGroup

export type StudentType = $Enums.StudentType

export const StudentType: typeof $Enums.StudentType

export type AddressType = $Enums.AddressType

export const AddressType: typeof $Enums.AddressType

export type PreferredContactMethod = $Enums.PreferredContactMethod

export const PreferredContactMethod: typeof $Enums.PreferredContactMethod

export type CommunicationEmailPreference = $Enums.CommunicationEmailPreference

export const CommunicationEmailPreference: typeof $Enums.CommunicationEmailPreference

export type AcademicSemesterStatus = $Enums.AcademicSemesterStatus

export const AcademicSemesterStatus: typeof $Enums.AcademicSemesterStatus

export type AcademicEntryStatus = $Enums.AcademicEntryStatus

export const AcademicEntryStatus: typeof $Enums.AcademicEntryStatus

export type DocumentCategory = $Enums.DocumentCategory

export const DocumentCategory: typeof $Enums.DocumentCategory

export type AcademicBacklogStatus = $Enums.AcademicBacklogStatus

export const AcademicBacklogStatus: typeof $Enums.AcademicBacklogStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.studentProfile`: Exposes CRUD operations for the **StudentProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentProfiles
    * const studentProfiles = await prisma.studentProfile.findMany()
    * ```
    */
  get studentProfile(): Prisma.StudentProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.studentParentDetails`: Exposes CRUD operations for the **StudentParentDetails** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentParentDetails
    * const studentParentDetails = await prisma.studentParentDetails.findMany()
    * ```
    */
  get studentParentDetails(): Prisma.StudentParentDetailsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.studentContactDetails`: Exposes CRUD operations for the **StudentContactDetails** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentContactDetails
    * const studentContactDetails = await prisma.studentContactDetails.findMany()
    * ```
    */
  get studentContactDetails(): Prisma.StudentContactDetailsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.studentDocument`: Exposes CRUD operations for the **StudentDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentDocuments
    * const studentDocuments = await prisma.studentDocument.findMany()
    * ```
    */
  get studentDocument(): Prisma.StudentDocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academicSemester`: Exposes CRUD operations for the **AcademicSemester** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicSemesters
    * const academicSemesters = await prisma.academicSemester.findMany()
    * ```
    */
  get academicSemester(): Prisma.AcademicSemesterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academicSubject`: Exposes CRUD operations for the **AcademicSubject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicSubjects
    * const academicSubjects = await prisma.academicSubject.findMany()
    * ```
    */
  get academicSubject(): Prisma.AcademicSubjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academicBacklog`: Exposes CRUD operations for the **AcademicBacklog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicBacklogs
    * const academicBacklogs = await prisma.academicBacklog.findMany()
    * ```
    */
  get academicBacklog(): Prisma.AcademicBacklogDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    User: 'User',
    StudentProfile: 'StudentProfile',
    StudentParentDetails: 'StudentParentDetails',
    StudentContactDetails: 'StudentContactDetails',
    StudentDocument: 'StudentDocument',
    AcademicSemester: 'AcademicSemester',
    AcademicSubject: 'AcademicSubject',
    AcademicBacklog: 'AcademicBacklog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "studentProfile" | "studentParentDetails" | "studentContactDetails" | "studentDocument" | "academicSemester" | "academicSubject" | "academicBacklog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      StudentProfile: {
        payload: Prisma.$StudentProfilePayload<ExtArgs>
        fields: Prisma.StudentProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          findFirst: {
            args: Prisma.StudentProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          findMany: {
            args: Prisma.StudentProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>[]
          }
          create: {
            args: Prisma.StudentProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          createMany: {
            args: Prisma.StudentProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>[]
          }
          delete: {
            args: Prisma.StudentProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          update: {
            args: Prisma.StudentProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          deleteMany: {
            args: Prisma.StudentProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>[]
          }
          upsert: {
            args: Prisma.StudentProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          aggregate: {
            args: Prisma.StudentProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentProfile>
          }
          groupBy: {
            args: Prisma.StudentProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentProfileCountArgs<ExtArgs>
            result: $Utils.Optional<StudentProfileCountAggregateOutputType> | number
          }
        }
      }
      StudentParentDetails: {
        payload: Prisma.$StudentParentDetailsPayload<ExtArgs>
        fields: Prisma.StudentParentDetailsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentParentDetailsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentParentDetailsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload>
          }
          findFirst: {
            args: Prisma.StudentParentDetailsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentParentDetailsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload>
          }
          findMany: {
            args: Prisma.StudentParentDetailsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload>[]
          }
          create: {
            args: Prisma.StudentParentDetailsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload>
          }
          createMany: {
            args: Prisma.StudentParentDetailsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentParentDetailsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload>[]
          }
          delete: {
            args: Prisma.StudentParentDetailsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload>
          }
          update: {
            args: Prisma.StudentParentDetailsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload>
          }
          deleteMany: {
            args: Prisma.StudentParentDetailsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentParentDetailsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentParentDetailsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload>[]
          }
          upsert: {
            args: Prisma.StudentParentDetailsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentParentDetailsPayload>
          }
          aggregate: {
            args: Prisma.StudentParentDetailsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentParentDetails>
          }
          groupBy: {
            args: Prisma.StudentParentDetailsGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentParentDetailsGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentParentDetailsCountArgs<ExtArgs>
            result: $Utils.Optional<StudentParentDetailsCountAggregateOutputType> | number
          }
        }
      }
      StudentContactDetails: {
        payload: Prisma.$StudentContactDetailsPayload<ExtArgs>
        fields: Prisma.StudentContactDetailsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentContactDetailsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentContactDetailsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload>
          }
          findFirst: {
            args: Prisma.StudentContactDetailsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentContactDetailsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload>
          }
          findMany: {
            args: Prisma.StudentContactDetailsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload>[]
          }
          create: {
            args: Prisma.StudentContactDetailsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload>
          }
          createMany: {
            args: Prisma.StudentContactDetailsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentContactDetailsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload>[]
          }
          delete: {
            args: Prisma.StudentContactDetailsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload>
          }
          update: {
            args: Prisma.StudentContactDetailsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload>
          }
          deleteMany: {
            args: Prisma.StudentContactDetailsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentContactDetailsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentContactDetailsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload>[]
          }
          upsert: {
            args: Prisma.StudentContactDetailsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentContactDetailsPayload>
          }
          aggregate: {
            args: Prisma.StudentContactDetailsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentContactDetails>
          }
          groupBy: {
            args: Prisma.StudentContactDetailsGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentContactDetailsGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentContactDetailsCountArgs<ExtArgs>
            result: $Utils.Optional<StudentContactDetailsCountAggregateOutputType> | number
          }
        }
      }
      StudentDocument: {
        payload: Prisma.$StudentDocumentPayload<ExtArgs>
        fields: Prisma.StudentDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload>
          }
          findFirst: {
            args: Prisma.StudentDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload>
          }
          findMany: {
            args: Prisma.StudentDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload>[]
          }
          create: {
            args: Prisma.StudentDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload>
          }
          createMany: {
            args: Prisma.StudentDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload>[]
          }
          delete: {
            args: Prisma.StudentDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload>
          }
          update: {
            args: Prisma.StudentDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload>[]
          }
          upsert: {
            args: Prisma.StudentDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentDocumentPayload>
          }
          aggregate: {
            args: Prisma.StudentDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentDocument>
          }
          groupBy: {
            args: Prisma.StudentDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentDocumentCountAggregateOutputType> | number
          }
        }
      }
      AcademicSemester: {
        payload: Prisma.$AcademicSemesterPayload<ExtArgs>
        fields: Prisma.AcademicSemesterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicSemesterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicSemesterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload>
          }
          findFirst: {
            args: Prisma.AcademicSemesterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicSemesterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload>
          }
          findMany: {
            args: Prisma.AcademicSemesterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload>[]
          }
          create: {
            args: Prisma.AcademicSemesterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload>
          }
          createMany: {
            args: Prisma.AcademicSemesterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcademicSemesterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload>[]
          }
          delete: {
            args: Prisma.AcademicSemesterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload>
          }
          update: {
            args: Prisma.AcademicSemesterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload>
          }
          deleteMany: {
            args: Prisma.AcademicSemesterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicSemesterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AcademicSemesterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload>[]
          }
          upsert: {
            args: Prisma.AcademicSemesterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSemesterPayload>
          }
          aggregate: {
            args: Prisma.AcademicSemesterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicSemester>
          }
          groupBy: {
            args: Prisma.AcademicSemesterGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicSemesterGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicSemesterCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicSemesterCountAggregateOutputType> | number
          }
        }
      }
      AcademicSubject: {
        payload: Prisma.$AcademicSubjectPayload<ExtArgs>
        fields: Prisma.AcademicSubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicSubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicSubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload>
          }
          findFirst: {
            args: Prisma.AcademicSubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicSubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload>
          }
          findMany: {
            args: Prisma.AcademicSubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload>[]
          }
          create: {
            args: Prisma.AcademicSubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload>
          }
          createMany: {
            args: Prisma.AcademicSubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcademicSubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload>[]
          }
          delete: {
            args: Prisma.AcademicSubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload>
          }
          update: {
            args: Prisma.AcademicSubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload>
          }
          deleteMany: {
            args: Prisma.AcademicSubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicSubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AcademicSubjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload>[]
          }
          upsert: {
            args: Prisma.AcademicSubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicSubjectPayload>
          }
          aggregate: {
            args: Prisma.AcademicSubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicSubject>
          }
          groupBy: {
            args: Prisma.AcademicSubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicSubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicSubjectCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicSubjectCountAggregateOutputType> | number
          }
        }
      }
      AcademicBacklog: {
        payload: Prisma.$AcademicBacklogPayload<ExtArgs>
        fields: Prisma.AcademicBacklogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicBacklogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicBacklogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload>
          }
          findFirst: {
            args: Prisma.AcademicBacklogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicBacklogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload>
          }
          findMany: {
            args: Prisma.AcademicBacklogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload>[]
          }
          create: {
            args: Prisma.AcademicBacklogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload>
          }
          createMany: {
            args: Prisma.AcademicBacklogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcademicBacklogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload>[]
          }
          delete: {
            args: Prisma.AcademicBacklogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload>
          }
          update: {
            args: Prisma.AcademicBacklogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload>
          }
          deleteMany: {
            args: Prisma.AcademicBacklogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicBacklogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AcademicBacklogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload>[]
          }
          upsert: {
            args: Prisma.AcademicBacklogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicBacklogPayload>
          }
          aggregate: {
            args: Prisma.AcademicBacklogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicBacklog>
          }
          groupBy: {
            args: Prisma.AcademicBacklogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicBacklogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicBacklogCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicBacklogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    studentProfile?: StudentProfileOmit
    studentParentDetails?: StudentParentDetailsOmit
    studentContactDetails?: StudentContactDetailsOmit
    studentDocument?: StudentDocumentOmit
    academicSemester?: AcademicSemesterOmit
    academicSubject?: AcademicSubjectOmit
    academicBacklog?: AcademicBacklogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
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
   * Count Type StudentProfileCountOutputType
   */

  export type StudentProfileCountOutputType = {
    academicBacklogs: number
    academicSemesters: number
    documents: number
  }

  export type StudentProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academicBacklogs?: boolean | StudentProfileCountOutputTypeCountAcademicBacklogsArgs
    academicSemesters?: boolean | StudentProfileCountOutputTypeCountAcademicSemestersArgs
    documents?: boolean | StudentProfileCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * StudentProfileCountOutputType without action
   */
  export type StudentProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfileCountOutputType
     */
    select?: StudentProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentProfileCountOutputType without action
   */
  export type StudentProfileCountOutputTypeCountAcademicBacklogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicBacklogWhereInput
  }

  /**
   * StudentProfileCountOutputType without action
   */
  export type StudentProfileCountOutputTypeCountAcademicSemestersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicSemesterWhereInput
  }

  /**
   * StudentProfileCountOutputType without action
   */
  export type StudentProfileCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentDocumentWhereInput
  }


  /**
   * Count Type AcademicSemesterCountOutputType
   */

  export type AcademicSemesterCountOutputType = {
    subjects: number
  }

  export type AcademicSemesterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subjects?: boolean | AcademicSemesterCountOutputTypeCountSubjectsArgs
  }

  // Custom InputTypes
  /**
   * AcademicSemesterCountOutputType without action
   */
  export type AcademicSemesterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemesterCountOutputType
     */
    select?: AcademicSemesterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AcademicSemesterCountOutputType without action
   */
  export type AcademicSemesterCountOutputTypeCountSubjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicSubjectWhereInput
  }


  /**
   * Models
   */

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
    fullName: string | null
    username: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    username: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullName: number
    username: number
    email: number
    password: number
    role: number
    isActive: number
    lastLogin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    fullName?: true
    username?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullName?: true
    username?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullName?: true
    username?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
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
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive: boolean
    lastLogin: Date | null
    createdAt: Date
    updatedAt: Date
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
    fullName?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | User$studentProfileArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fullName?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "username" | "email" | "password" | "role" | "isActive" | "lastLogin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | User$studentProfileArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      studentProfile: Prisma.$StudentProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      username: string
      email: string
      password: string
      role: $Enums.Role
      isActive: boolean
      lastLogin: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    studentProfile<T extends User$studentProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$studentProfileArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.studentProfile
   */
  export type User$studentProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    where?: StudentProfileWhereInput
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model StudentProfile
   */

  export type AggregateStudentProfile = {
    _count: StudentProfileCountAggregateOutputType | null
    _avg: StudentProfileAvgAggregateOutputType | null
    _sum: StudentProfileSumAggregateOutputType | null
    _min: StudentProfileMinAggregateOutputType | null
    _max: StudentProfileMaxAggregateOutputType | null
  }

  export type StudentProfileAvgAggregateOutputType = {
    totalCredits: number | null
    currentCGPA: number | null
    overallAttendance: number | null
  }

  export type StudentProfileSumAggregateOutputType = {
    totalCredits: number | null
    currentCGPA: number | null
    overallAttendance: number | null
  }

  export type StudentProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    registerNumber: string | null
    admissionNumber: string | null
    profileImage: string | null
    dateOfBirth: Date | null
    gender: $Enums.Gender | null
    bloodGroup: $Enums.BloodGroup | null
    nationality: string | null
    religion: string | null
    department: string | null
    programme: string | null
    semester: string | null
    section: string | null
    studentType: $Enums.StudentType | null
    address: string | null
    permanentAddress: string | null
    yearsAtUniversity: string | null
    totalCredits: number | null
    currentCGPA: number | null
    overallAttendance: number | null
    academicStanding: string | null
    currentMentor: string | null
    createdAt: Date | null
    updatedAt: Date | null
    academicSetupCompleted: boolean | null
  }

  export type StudentProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    registerNumber: string | null
    admissionNumber: string | null
    profileImage: string | null
    dateOfBirth: Date | null
    gender: $Enums.Gender | null
    bloodGroup: $Enums.BloodGroup | null
    nationality: string | null
    religion: string | null
    department: string | null
    programme: string | null
    semester: string | null
    section: string | null
    studentType: $Enums.StudentType | null
    address: string | null
    permanentAddress: string | null
    yearsAtUniversity: string | null
    totalCredits: number | null
    currentCGPA: number | null
    overallAttendance: number | null
    academicStanding: string | null
    currentMentor: string | null
    createdAt: Date | null
    updatedAt: Date | null
    academicSetupCompleted: boolean | null
  }

  export type StudentProfileCountAggregateOutputType = {
    id: number
    userId: number
    registerNumber: number
    admissionNumber: number
    profileImage: number
    dateOfBirth: number
    gender: number
    bloodGroup: number
    nationality: number
    religion: number
    department: number
    programme: number
    semester: number
    section: number
    studentType: number
    address: number
    permanentAddress: number
    yearsAtUniversity: number
    totalCredits: number
    currentCGPA: number
    overallAttendance: number
    academicStanding: number
    currentMentor: number
    createdAt: number
    updatedAt: number
    academicSetupCompleted: number
    _all: number
  }


  export type StudentProfileAvgAggregateInputType = {
    totalCredits?: true
    currentCGPA?: true
    overallAttendance?: true
  }

  export type StudentProfileSumAggregateInputType = {
    totalCredits?: true
    currentCGPA?: true
    overallAttendance?: true
  }

  export type StudentProfileMinAggregateInputType = {
    id?: true
    userId?: true
    registerNumber?: true
    admissionNumber?: true
    profileImage?: true
    dateOfBirth?: true
    gender?: true
    bloodGroup?: true
    nationality?: true
    religion?: true
    department?: true
    programme?: true
    semester?: true
    section?: true
    studentType?: true
    address?: true
    permanentAddress?: true
    yearsAtUniversity?: true
    totalCredits?: true
    currentCGPA?: true
    overallAttendance?: true
    academicStanding?: true
    currentMentor?: true
    createdAt?: true
    updatedAt?: true
    academicSetupCompleted?: true
  }

  export type StudentProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    registerNumber?: true
    admissionNumber?: true
    profileImage?: true
    dateOfBirth?: true
    gender?: true
    bloodGroup?: true
    nationality?: true
    religion?: true
    department?: true
    programme?: true
    semester?: true
    section?: true
    studentType?: true
    address?: true
    permanentAddress?: true
    yearsAtUniversity?: true
    totalCredits?: true
    currentCGPA?: true
    overallAttendance?: true
    academicStanding?: true
    currentMentor?: true
    createdAt?: true
    updatedAt?: true
    academicSetupCompleted?: true
  }

  export type StudentProfileCountAggregateInputType = {
    id?: true
    userId?: true
    registerNumber?: true
    admissionNumber?: true
    profileImage?: true
    dateOfBirth?: true
    gender?: true
    bloodGroup?: true
    nationality?: true
    religion?: true
    department?: true
    programme?: true
    semester?: true
    section?: true
    studentType?: true
    address?: true
    permanentAddress?: true
    yearsAtUniversity?: true
    totalCredits?: true
    currentCGPA?: true
    overallAttendance?: true
    academicStanding?: true
    currentMentor?: true
    createdAt?: true
    updatedAt?: true
    academicSetupCompleted?: true
    _all?: true
  }

  export type StudentProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentProfile to aggregate.
     */
    where?: StudentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProfiles to fetch.
     */
    orderBy?: StudentProfileOrderByWithRelationInput | StudentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentProfiles
    **/
    _count?: true | StudentProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentProfileMaxAggregateInputType
  }

  export type GetStudentProfileAggregateType<T extends StudentProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentProfile[P]>
      : GetScalarType<T[P], AggregateStudentProfile[P]>
  }




  export type StudentProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentProfileWhereInput
    orderBy?: StudentProfileOrderByWithAggregationInput | StudentProfileOrderByWithAggregationInput[]
    by: StudentProfileScalarFieldEnum[] | StudentProfileScalarFieldEnum
    having?: StudentProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentProfileCountAggregateInputType | true
    _avg?: StudentProfileAvgAggregateInputType
    _sum?: StudentProfileSumAggregateInputType
    _min?: StudentProfileMinAggregateInputType
    _max?: StudentProfileMaxAggregateInputType
  }

  export type StudentProfileGroupByOutputType = {
    id: string
    userId: string
    registerNumber: string | null
    admissionNumber: string | null
    profileImage: string | null
    dateOfBirth: Date | null
    gender: $Enums.Gender | null
    bloodGroup: $Enums.BloodGroup | null
    nationality: string | null
    religion: string | null
    department: string | null
    programme: string | null
    semester: string | null
    section: string | null
    studentType: $Enums.StudentType | null
    address: string | null
    permanentAddress: string | null
    yearsAtUniversity: string | null
    totalCredits: number | null
    currentCGPA: number | null
    overallAttendance: number | null
    academicStanding: string | null
    currentMentor: string | null
    createdAt: Date
    updatedAt: Date
    academicSetupCompleted: boolean
    _count: StudentProfileCountAggregateOutputType | null
    _avg: StudentProfileAvgAggregateOutputType | null
    _sum: StudentProfileSumAggregateOutputType | null
    _min: StudentProfileMinAggregateOutputType | null
    _max: StudentProfileMaxAggregateOutputType | null
  }

  type GetStudentProfileGroupByPayload<T extends StudentProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentProfileGroupByOutputType[P]>
            : GetScalarType<T[P], StudentProfileGroupByOutputType[P]>
        }
      >
    >


  export type StudentProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    registerNumber?: boolean
    admissionNumber?: boolean
    profileImage?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    bloodGroup?: boolean
    nationality?: boolean
    religion?: boolean
    department?: boolean
    programme?: boolean
    semester?: boolean
    section?: boolean
    studentType?: boolean
    address?: boolean
    permanentAddress?: boolean
    yearsAtUniversity?: boolean
    totalCredits?: boolean
    currentCGPA?: boolean
    overallAttendance?: boolean
    academicStanding?: boolean
    currentMentor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    academicSetupCompleted?: boolean
    academicBacklogs?: boolean | StudentProfile$academicBacklogsArgs<ExtArgs>
    academicSemesters?: boolean | StudentProfile$academicSemestersArgs<ExtArgs>
    contactDetails?: boolean | StudentProfile$contactDetailsArgs<ExtArgs>
    documents?: boolean | StudentProfile$documentsArgs<ExtArgs>
    parentDetails?: boolean | StudentProfile$parentDetailsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | StudentProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProfile"]>

  export type StudentProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    registerNumber?: boolean
    admissionNumber?: boolean
    profileImage?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    bloodGroup?: boolean
    nationality?: boolean
    religion?: boolean
    department?: boolean
    programme?: boolean
    semester?: boolean
    section?: boolean
    studentType?: boolean
    address?: boolean
    permanentAddress?: boolean
    yearsAtUniversity?: boolean
    totalCredits?: boolean
    currentCGPA?: boolean
    overallAttendance?: boolean
    academicStanding?: boolean
    currentMentor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    academicSetupCompleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProfile"]>

  export type StudentProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    registerNumber?: boolean
    admissionNumber?: boolean
    profileImage?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    bloodGroup?: boolean
    nationality?: boolean
    religion?: boolean
    department?: boolean
    programme?: boolean
    semester?: boolean
    section?: boolean
    studentType?: boolean
    address?: boolean
    permanentAddress?: boolean
    yearsAtUniversity?: boolean
    totalCredits?: boolean
    currentCGPA?: boolean
    overallAttendance?: boolean
    academicStanding?: boolean
    currentMentor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    academicSetupCompleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProfile"]>

  export type StudentProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    registerNumber?: boolean
    admissionNumber?: boolean
    profileImage?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    bloodGroup?: boolean
    nationality?: boolean
    religion?: boolean
    department?: boolean
    programme?: boolean
    semester?: boolean
    section?: boolean
    studentType?: boolean
    address?: boolean
    permanentAddress?: boolean
    yearsAtUniversity?: boolean
    totalCredits?: boolean
    currentCGPA?: boolean
    overallAttendance?: boolean
    academicStanding?: boolean
    currentMentor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    academicSetupCompleted?: boolean
  }

  export type StudentProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "registerNumber" | "admissionNumber" | "profileImage" | "dateOfBirth" | "gender" | "bloodGroup" | "nationality" | "religion" | "department" | "programme" | "semester" | "section" | "studentType" | "address" | "permanentAddress" | "yearsAtUniversity" | "totalCredits" | "currentCGPA" | "overallAttendance" | "academicStanding" | "currentMentor" | "createdAt" | "updatedAt" | "academicSetupCompleted", ExtArgs["result"]["studentProfile"]>
  export type StudentProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academicBacklogs?: boolean | StudentProfile$academicBacklogsArgs<ExtArgs>
    academicSemesters?: boolean | StudentProfile$academicSemestersArgs<ExtArgs>
    contactDetails?: boolean | StudentProfile$contactDetailsArgs<ExtArgs>
    documents?: boolean | StudentProfile$documentsArgs<ExtArgs>
    parentDetails?: boolean | StudentProfile$parentDetailsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | StudentProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StudentProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StudentProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentProfile"
    objects: {
      academicBacklogs: Prisma.$AcademicBacklogPayload<ExtArgs>[]
      academicSemesters: Prisma.$AcademicSemesterPayload<ExtArgs>[]
      contactDetails: Prisma.$StudentContactDetailsPayload<ExtArgs> | null
      documents: Prisma.$StudentDocumentPayload<ExtArgs>[]
      parentDetails: Prisma.$StudentParentDetailsPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      registerNumber: string | null
      admissionNumber: string | null
      profileImage: string | null
      dateOfBirth: Date | null
      gender: $Enums.Gender | null
      bloodGroup: $Enums.BloodGroup | null
      nationality: string | null
      religion: string | null
      department: string | null
      programme: string | null
      semester: string | null
      section: string | null
      studentType: $Enums.StudentType | null
      address: string | null
      permanentAddress: string | null
      yearsAtUniversity: string | null
      totalCredits: number | null
      currentCGPA: number | null
      overallAttendance: number | null
      academicStanding: string | null
      currentMentor: string | null
      createdAt: Date
      updatedAt: Date
      academicSetupCompleted: boolean
    }, ExtArgs["result"]["studentProfile"]>
    composites: {}
  }

  type StudentProfileGetPayload<S extends boolean | null | undefined | StudentProfileDefaultArgs> = $Result.GetResult<Prisma.$StudentProfilePayload, S>

  type StudentProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentProfileCountAggregateInputType | true
    }

  export interface StudentProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentProfile'], meta: { name: 'StudentProfile' } }
    /**
     * Find zero or one StudentProfile that matches the filter.
     * @param {StudentProfileFindUniqueArgs} args - Arguments to find a StudentProfile
     * @example
     * // Get one StudentProfile
     * const studentProfile = await prisma.studentProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentProfileFindUniqueArgs>(args: SelectSubset<T, StudentProfileFindUniqueArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentProfileFindUniqueOrThrowArgs} args - Arguments to find a StudentProfile
     * @example
     * // Get one StudentProfile
     * const studentProfile = await prisma.studentProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileFindFirstArgs} args - Arguments to find a StudentProfile
     * @example
     * // Get one StudentProfile
     * const studentProfile = await prisma.studentProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentProfileFindFirstArgs>(args?: SelectSubset<T, StudentProfileFindFirstArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileFindFirstOrThrowArgs} args - Arguments to find a StudentProfile
     * @example
     * // Get one StudentProfile
     * const studentProfile = await prisma.studentProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentProfiles
     * const studentProfiles = await prisma.studentProfile.findMany()
     * 
     * // Get first 10 StudentProfiles
     * const studentProfiles = await prisma.studentProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentProfileWithIdOnly = await prisma.studentProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentProfileFindManyArgs>(args?: SelectSubset<T, StudentProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentProfile.
     * @param {StudentProfileCreateArgs} args - Arguments to create a StudentProfile.
     * @example
     * // Create one StudentProfile
     * const StudentProfile = await prisma.studentProfile.create({
     *   data: {
     *     // ... data to create a StudentProfile
     *   }
     * })
     * 
     */
    create<T extends StudentProfileCreateArgs>(args: SelectSubset<T, StudentProfileCreateArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentProfiles.
     * @param {StudentProfileCreateManyArgs} args - Arguments to create many StudentProfiles.
     * @example
     * // Create many StudentProfiles
     * const studentProfile = await prisma.studentProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentProfileCreateManyArgs>(args?: SelectSubset<T, StudentProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentProfiles and returns the data saved in the database.
     * @param {StudentProfileCreateManyAndReturnArgs} args - Arguments to create many StudentProfiles.
     * @example
     * // Create many StudentProfiles
     * const studentProfile = await prisma.studentProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentProfiles and only return the `id`
     * const studentProfileWithIdOnly = await prisma.studentProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentProfile.
     * @param {StudentProfileDeleteArgs} args - Arguments to delete one StudentProfile.
     * @example
     * // Delete one StudentProfile
     * const StudentProfile = await prisma.studentProfile.delete({
     *   where: {
     *     // ... filter to delete one StudentProfile
     *   }
     * })
     * 
     */
    delete<T extends StudentProfileDeleteArgs>(args: SelectSubset<T, StudentProfileDeleteArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentProfile.
     * @param {StudentProfileUpdateArgs} args - Arguments to update one StudentProfile.
     * @example
     * // Update one StudentProfile
     * const studentProfile = await prisma.studentProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentProfileUpdateArgs>(args: SelectSubset<T, StudentProfileUpdateArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentProfiles.
     * @param {StudentProfileDeleteManyArgs} args - Arguments to filter StudentProfiles to delete.
     * @example
     * // Delete a few StudentProfiles
     * const { count } = await prisma.studentProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentProfileDeleteManyArgs>(args?: SelectSubset<T, StudentProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentProfiles
     * const studentProfile = await prisma.studentProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentProfileUpdateManyArgs>(args: SelectSubset<T, StudentProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentProfiles and returns the data updated in the database.
     * @param {StudentProfileUpdateManyAndReturnArgs} args - Arguments to update many StudentProfiles.
     * @example
     * // Update many StudentProfiles
     * const studentProfile = await prisma.studentProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentProfiles and only return the `id`
     * const studentProfileWithIdOnly = await prisma.studentProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentProfile.
     * @param {StudentProfileUpsertArgs} args - Arguments to update or create a StudentProfile.
     * @example
     * // Update or create a StudentProfile
     * const studentProfile = await prisma.studentProfile.upsert({
     *   create: {
     *     // ... data to create a StudentProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentProfile we want to update
     *   }
     * })
     */
    upsert<T extends StudentProfileUpsertArgs>(args: SelectSubset<T, StudentProfileUpsertArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileCountArgs} args - Arguments to filter StudentProfiles to count.
     * @example
     * // Count the number of StudentProfiles
     * const count = await prisma.studentProfile.count({
     *   where: {
     *     // ... the filter for the StudentProfiles we want to count
     *   }
     * })
    **/
    count<T extends StudentProfileCountArgs>(
      args?: Subset<T, StudentProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentProfileAggregateArgs>(args: Subset<T, StudentProfileAggregateArgs>): Prisma.PrismaPromise<GetStudentProfileAggregateType<T>>

    /**
     * Group by StudentProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileGroupByArgs} args - Group by arguments.
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
      T extends StudentProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentProfileGroupByArgs['orderBy'] }
        : { orderBy?: StudentProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentProfile model
   */
  readonly fields: StudentProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    academicBacklogs<T extends StudentProfile$academicBacklogsArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfile$academicBacklogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    academicSemesters<T extends StudentProfile$academicSemestersArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfile$academicSemestersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contactDetails<T extends StudentProfile$contactDetailsArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfile$contactDetailsArgs<ExtArgs>>): Prisma__StudentContactDetailsClient<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    documents<T extends StudentProfile$documentsArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfile$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parentDetails<T extends StudentProfile$parentDetailsArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfile$parentDetailsArgs<ExtArgs>>): Prisma__StudentParentDetailsClient<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentProfile model
   */
  interface StudentProfileFieldRefs {
    readonly id: FieldRef<"StudentProfile", 'String'>
    readonly userId: FieldRef<"StudentProfile", 'String'>
    readonly registerNumber: FieldRef<"StudentProfile", 'String'>
    readonly admissionNumber: FieldRef<"StudentProfile", 'String'>
    readonly profileImage: FieldRef<"StudentProfile", 'String'>
    readonly dateOfBirth: FieldRef<"StudentProfile", 'DateTime'>
    readonly gender: FieldRef<"StudentProfile", 'Gender'>
    readonly bloodGroup: FieldRef<"StudentProfile", 'BloodGroup'>
    readonly nationality: FieldRef<"StudentProfile", 'String'>
    readonly religion: FieldRef<"StudentProfile", 'String'>
    readonly department: FieldRef<"StudentProfile", 'String'>
    readonly programme: FieldRef<"StudentProfile", 'String'>
    readonly semester: FieldRef<"StudentProfile", 'String'>
    readonly section: FieldRef<"StudentProfile", 'String'>
    readonly studentType: FieldRef<"StudentProfile", 'StudentType'>
    readonly address: FieldRef<"StudentProfile", 'String'>
    readonly permanentAddress: FieldRef<"StudentProfile", 'String'>
    readonly yearsAtUniversity: FieldRef<"StudentProfile", 'String'>
    readonly totalCredits: FieldRef<"StudentProfile", 'Int'>
    readonly currentCGPA: FieldRef<"StudentProfile", 'Float'>
    readonly overallAttendance: FieldRef<"StudentProfile", 'Float'>
    readonly academicStanding: FieldRef<"StudentProfile", 'String'>
    readonly currentMentor: FieldRef<"StudentProfile", 'String'>
    readonly createdAt: FieldRef<"StudentProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"StudentProfile", 'DateTime'>
    readonly academicSetupCompleted: FieldRef<"StudentProfile", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * StudentProfile findUnique
   */
  export type StudentProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter, which StudentProfile to fetch.
     */
    where: StudentProfileWhereUniqueInput
  }

  /**
   * StudentProfile findUniqueOrThrow
   */
  export type StudentProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter, which StudentProfile to fetch.
     */
    where: StudentProfileWhereUniqueInput
  }

  /**
   * StudentProfile findFirst
   */
  export type StudentProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter, which StudentProfile to fetch.
     */
    where?: StudentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProfiles to fetch.
     */
    orderBy?: StudentProfileOrderByWithRelationInput | StudentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentProfiles.
     */
    cursor?: StudentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentProfiles.
     */
    distinct?: StudentProfileScalarFieldEnum | StudentProfileScalarFieldEnum[]
  }

  /**
   * StudentProfile findFirstOrThrow
   */
  export type StudentProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter, which StudentProfile to fetch.
     */
    where?: StudentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProfiles to fetch.
     */
    orderBy?: StudentProfileOrderByWithRelationInput | StudentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentProfiles.
     */
    cursor?: StudentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentProfiles.
     */
    distinct?: StudentProfileScalarFieldEnum | StudentProfileScalarFieldEnum[]
  }

  /**
   * StudentProfile findMany
   */
  export type StudentProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter, which StudentProfiles to fetch.
     */
    where?: StudentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProfiles to fetch.
     */
    orderBy?: StudentProfileOrderByWithRelationInput | StudentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentProfiles.
     */
    cursor?: StudentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProfiles.
     */
    skip?: number
    distinct?: StudentProfileScalarFieldEnum | StudentProfileScalarFieldEnum[]
  }

  /**
   * StudentProfile create
   */
  export type StudentProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentProfile.
     */
    data: XOR<StudentProfileCreateInput, StudentProfileUncheckedCreateInput>
  }

  /**
   * StudentProfile createMany
   */
  export type StudentProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentProfiles.
     */
    data: StudentProfileCreateManyInput | StudentProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentProfile createManyAndReturn
   */
  export type StudentProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * The data used to create many StudentProfiles.
     */
    data: StudentProfileCreateManyInput | StudentProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentProfile update
   */
  export type StudentProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentProfile.
     */
    data: XOR<StudentProfileUpdateInput, StudentProfileUncheckedUpdateInput>
    /**
     * Choose, which StudentProfile to update.
     */
    where: StudentProfileWhereUniqueInput
  }

  /**
   * StudentProfile updateMany
   */
  export type StudentProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentProfiles.
     */
    data: XOR<StudentProfileUpdateManyMutationInput, StudentProfileUncheckedUpdateManyInput>
    /**
     * Filter which StudentProfiles to update
     */
    where?: StudentProfileWhereInput
    /**
     * Limit how many StudentProfiles to update.
     */
    limit?: number
  }

  /**
   * StudentProfile updateManyAndReturn
   */
  export type StudentProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * The data used to update StudentProfiles.
     */
    data: XOR<StudentProfileUpdateManyMutationInput, StudentProfileUncheckedUpdateManyInput>
    /**
     * Filter which StudentProfiles to update
     */
    where?: StudentProfileWhereInput
    /**
     * Limit how many StudentProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentProfile upsert
   */
  export type StudentProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentProfile to update in case it exists.
     */
    where: StudentProfileWhereUniqueInput
    /**
     * In case the StudentProfile found by the `where` argument doesn't exist, create a new StudentProfile with this data.
     */
    create: XOR<StudentProfileCreateInput, StudentProfileUncheckedCreateInput>
    /**
     * In case the StudentProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentProfileUpdateInput, StudentProfileUncheckedUpdateInput>
  }

  /**
   * StudentProfile delete
   */
  export type StudentProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter which StudentProfile to delete.
     */
    where: StudentProfileWhereUniqueInput
  }

  /**
   * StudentProfile deleteMany
   */
  export type StudentProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentProfiles to delete
     */
    where?: StudentProfileWhereInput
    /**
     * Limit how many StudentProfiles to delete.
     */
    limit?: number
  }

  /**
   * StudentProfile.academicBacklogs
   */
  export type StudentProfile$academicBacklogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
    where?: AcademicBacklogWhereInput
    orderBy?: AcademicBacklogOrderByWithRelationInput | AcademicBacklogOrderByWithRelationInput[]
    cursor?: AcademicBacklogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcademicBacklogScalarFieldEnum | AcademicBacklogScalarFieldEnum[]
  }

  /**
   * StudentProfile.academicSemesters
   */
  export type StudentProfile$academicSemestersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
    where?: AcademicSemesterWhereInput
    orderBy?: AcademicSemesterOrderByWithRelationInput | AcademicSemesterOrderByWithRelationInput[]
    cursor?: AcademicSemesterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcademicSemesterScalarFieldEnum | AcademicSemesterScalarFieldEnum[]
  }

  /**
   * StudentProfile.contactDetails
   */
  export type StudentProfile$contactDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
    where?: StudentContactDetailsWhereInput
  }

  /**
   * StudentProfile.documents
   */
  export type StudentProfile$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
    where?: StudentDocumentWhereInput
    orderBy?: StudentDocumentOrderByWithRelationInput | StudentDocumentOrderByWithRelationInput[]
    cursor?: StudentDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentDocumentScalarFieldEnum | StudentDocumentScalarFieldEnum[]
  }

  /**
   * StudentProfile.parentDetails
   */
  export type StudentProfile$parentDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
    where?: StudentParentDetailsWhereInput
  }

  /**
   * StudentProfile without action
   */
  export type StudentProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
  }


  /**
   * Model StudentParentDetails
   */

  export type AggregateStudentParentDetails = {
    _count: StudentParentDetailsCountAggregateOutputType | null
    _min: StudentParentDetailsMinAggregateOutputType | null
    _max: StudentParentDetailsMaxAggregateOutputType | null
  }

  export type StudentParentDetailsMinAggregateOutputType = {
    id: string | null
    studentProfileId: string | null
    fatherName: string | null
    fatherOccupation: string | null
    fatherCompany: string | null
    fatherAnnualIncome: string | null
    fatherQualification: string | null
    fatherEmail: string | null
    fatherPhone: string | null
    fatherAddress: string | null
    motherName: string | null
    motherOccupation: string | null
    motherQualification: string | null
    motherAnnualIncome: string | null
    motherEmail: string | null
    motherPhone: string | null
    motherAddress: string | null
    guardianName: string | null
    guardianRelationship: string | null
    guardianPhone: string | null
    guardianAlternatePhone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentParentDetailsMaxAggregateOutputType = {
    id: string | null
    studentProfileId: string | null
    fatherName: string | null
    fatherOccupation: string | null
    fatherCompany: string | null
    fatherAnnualIncome: string | null
    fatherQualification: string | null
    fatherEmail: string | null
    fatherPhone: string | null
    fatherAddress: string | null
    motherName: string | null
    motherOccupation: string | null
    motherQualification: string | null
    motherAnnualIncome: string | null
    motherEmail: string | null
    motherPhone: string | null
    motherAddress: string | null
    guardianName: string | null
    guardianRelationship: string | null
    guardianPhone: string | null
    guardianAlternatePhone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentParentDetailsCountAggregateOutputType = {
    id: number
    studentProfileId: number
    fatherName: number
    fatherOccupation: number
    fatherCompany: number
    fatherAnnualIncome: number
    fatherQualification: number
    fatherEmail: number
    fatherPhone: number
    fatherAddress: number
    motherName: number
    motherOccupation: number
    motherQualification: number
    motherAnnualIncome: number
    motherEmail: number
    motherPhone: number
    motherAddress: number
    guardianName: number
    guardianRelationship: number
    guardianPhone: number
    guardianAlternatePhone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentParentDetailsMinAggregateInputType = {
    id?: true
    studentProfileId?: true
    fatherName?: true
    fatherOccupation?: true
    fatherCompany?: true
    fatherAnnualIncome?: true
    fatherQualification?: true
    fatherEmail?: true
    fatherPhone?: true
    fatherAddress?: true
    motherName?: true
    motherOccupation?: true
    motherQualification?: true
    motherAnnualIncome?: true
    motherEmail?: true
    motherPhone?: true
    motherAddress?: true
    guardianName?: true
    guardianRelationship?: true
    guardianPhone?: true
    guardianAlternatePhone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentParentDetailsMaxAggregateInputType = {
    id?: true
    studentProfileId?: true
    fatherName?: true
    fatherOccupation?: true
    fatherCompany?: true
    fatherAnnualIncome?: true
    fatherQualification?: true
    fatherEmail?: true
    fatherPhone?: true
    fatherAddress?: true
    motherName?: true
    motherOccupation?: true
    motherQualification?: true
    motherAnnualIncome?: true
    motherEmail?: true
    motherPhone?: true
    motherAddress?: true
    guardianName?: true
    guardianRelationship?: true
    guardianPhone?: true
    guardianAlternatePhone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentParentDetailsCountAggregateInputType = {
    id?: true
    studentProfileId?: true
    fatherName?: true
    fatherOccupation?: true
    fatherCompany?: true
    fatherAnnualIncome?: true
    fatherQualification?: true
    fatherEmail?: true
    fatherPhone?: true
    fatherAddress?: true
    motherName?: true
    motherOccupation?: true
    motherQualification?: true
    motherAnnualIncome?: true
    motherEmail?: true
    motherPhone?: true
    motherAddress?: true
    guardianName?: true
    guardianRelationship?: true
    guardianPhone?: true
    guardianAlternatePhone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentParentDetailsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentParentDetails to aggregate.
     */
    where?: StudentParentDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentParentDetails to fetch.
     */
    orderBy?: StudentParentDetailsOrderByWithRelationInput | StudentParentDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentParentDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentParentDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentParentDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentParentDetails
    **/
    _count?: true | StudentParentDetailsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentParentDetailsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentParentDetailsMaxAggregateInputType
  }

  export type GetStudentParentDetailsAggregateType<T extends StudentParentDetailsAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentParentDetails]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentParentDetails[P]>
      : GetScalarType<T[P], AggregateStudentParentDetails[P]>
  }




  export type StudentParentDetailsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentParentDetailsWhereInput
    orderBy?: StudentParentDetailsOrderByWithAggregationInput | StudentParentDetailsOrderByWithAggregationInput[]
    by: StudentParentDetailsScalarFieldEnum[] | StudentParentDetailsScalarFieldEnum
    having?: StudentParentDetailsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentParentDetailsCountAggregateInputType | true
    _min?: StudentParentDetailsMinAggregateInputType
    _max?: StudentParentDetailsMaxAggregateInputType
  }

  export type StudentParentDetailsGroupByOutputType = {
    id: string
    studentProfileId: string
    fatherName: string | null
    fatherOccupation: string | null
    fatherCompany: string | null
    fatherAnnualIncome: string | null
    fatherQualification: string | null
    fatherEmail: string | null
    fatherPhone: string | null
    fatherAddress: string | null
    motherName: string | null
    motherOccupation: string | null
    motherQualification: string | null
    motherAnnualIncome: string | null
    motherEmail: string | null
    motherPhone: string | null
    motherAddress: string | null
    guardianName: string | null
    guardianRelationship: string | null
    guardianPhone: string | null
    guardianAlternatePhone: string | null
    createdAt: Date
    updatedAt: Date
    _count: StudentParentDetailsCountAggregateOutputType | null
    _min: StudentParentDetailsMinAggregateOutputType | null
    _max: StudentParentDetailsMaxAggregateOutputType | null
  }

  type GetStudentParentDetailsGroupByPayload<T extends StudentParentDetailsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentParentDetailsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentParentDetailsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentParentDetailsGroupByOutputType[P]>
            : GetScalarType<T[P], StudentParentDetailsGroupByOutputType[P]>
        }
      >
    >


  export type StudentParentDetailsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    fatherName?: boolean
    fatherOccupation?: boolean
    fatherCompany?: boolean
    fatherAnnualIncome?: boolean
    fatherQualification?: boolean
    fatherEmail?: boolean
    fatherPhone?: boolean
    fatherAddress?: boolean
    motherName?: boolean
    motherOccupation?: boolean
    motherQualification?: boolean
    motherAnnualIncome?: boolean
    motherEmail?: boolean
    motherPhone?: boolean
    motherAddress?: boolean
    guardianName?: boolean
    guardianRelationship?: boolean
    guardianPhone?: boolean
    guardianAlternatePhone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentParentDetails"]>

  export type StudentParentDetailsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    fatherName?: boolean
    fatherOccupation?: boolean
    fatherCompany?: boolean
    fatherAnnualIncome?: boolean
    fatherQualification?: boolean
    fatherEmail?: boolean
    fatherPhone?: boolean
    fatherAddress?: boolean
    motherName?: boolean
    motherOccupation?: boolean
    motherQualification?: boolean
    motherAnnualIncome?: boolean
    motherEmail?: boolean
    motherPhone?: boolean
    motherAddress?: boolean
    guardianName?: boolean
    guardianRelationship?: boolean
    guardianPhone?: boolean
    guardianAlternatePhone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentParentDetails"]>

  export type StudentParentDetailsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    fatherName?: boolean
    fatherOccupation?: boolean
    fatherCompany?: boolean
    fatherAnnualIncome?: boolean
    fatherQualification?: boolean
    fatherEmail?: boolean
    fatherPhone?: boolean
    fatherAddress?: boolean
    motherName?: boolean
    motherOccupation?: boolean
    motherQualification?: boolean
    motherAnnualIncome?: boolean
    motherEmail?: boolean
    motherPhone?: boolean
    motherAddress?: boolean
    guardianName?: boolean
    guardianRelationship?: boolean
    guardianPhone?: boolean
    guardianAlternatePhone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentParentDetails"]>

  export type StudentParentDetailsSelectScalar = {
    id?: boolean
    studentProfileId?: boolean
    fatherName?: boolean
    fatherOccupation?: boolean
    fatherCompany?: boolean
    fatherAnnualIncome?: boolean
    fatherQualification?: boolean
    fatherEmail?: boolean
    fatherPhone?: boolean
    fatherAddress?: boolean
    motherName?: boolean
    motherOccupation?: boolean
    motherQualification?: boolean
    motherAnnualIncome?: boolean
    motherEmail?: boolean
    motherPhone?: boolean
    motherAddress?: boolean
    guardianName?: boolean
    guardianRelationship?: boolean
    guardianPhone?: boolean
    guardianAlternatePhone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentParentDetailsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProfileId" | "fatherName" | "fatherOccupation" | "fatherCompany" | "fatherAnnualIncome" | "fatherQualification" | "fatherEmail" | "fatherPhone" | "fatherAddress" | "motherName" | "motherOccupation" | "motherQualification" | "motherAnnualIncome" | "motherEmail" | "motherPhone" | "motherAddress" | "guardianName" | "guardianRelationship" | "guardianPhone" | "guardianAlternatePhone" | "createdAt" | "updatedAt", ExtArgs["result"]["studentParentDetails"]>
  export type StudentParentDetailsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type StudentParentDetailsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type StudentParentDetailsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }

  export type $StudentParentDetailsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentParentDetails"
    objects: {
      studentProfile: Prisma.$StudentProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentProfileId: string
      fatherName: string | null
      fatherOccupation: string | null
      fatherCompany: string | null
      fatherAnnualIncome: string | null
      fatherQualification: string | null
      fatherEmail: string | null
      fatherPhone: string | null
      fatherAddress: string | null
      motherName: string | null
      motherOccupation: string | null
      motherQualification: string | null
      motherAnnualIncome: string | null
      motherEmail: string | null
      motherPhone: string | null
      motherAddress: string | null
      guardianName: string | null
      guardianRelationship: string | null
      guardianPhone: string | null
      guardianAlternatePhone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["studentParentDetails"]>
    composites: {}
  }

  type StudentParentDetailsGetPayload<S extends boolean | null | undefined | StudentParentDetailsDefaultArgs> = $Result.GetResult<Prisma.$StudentParentDetailsPayload, S>

  type StudentParentDetailsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentParentDetailsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentParentDetailsCountAggregateInputType | true
    }

  export interface StudentParentDetailsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentParentDetails'], meta: { name: 'StudentParentDetails' } }
    /**
     * Find zero or one StudentParentDetails that matches the filter.
     * @param {StudentParentDetailsFindUniqueArgs} args - Arguments to find a StudentParentDetails
     * @example
     * // Get one StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentParentDetailsFindUniqueArgs>(args: SelectSubset<T, StudentParentDetailsFindUniqueArgs<ExtArgs>>): Prisma__StudentParentDetailsClient<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentParentDetails that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentParentDetailsFindUniqueOrThrowArgs} args - Arguments to find a StudentParentDetails
     * @example
     * // Get one StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentParentDetailsFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentParentDetailsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentParentDetailsClient<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentParentDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentParentDetailsFindFirstArgs} args - Arguments to find a StudentParentDetails
     * @example
     * // Get one StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentParentDetailsFindFirstArgs>(args?: SelectSubset<T, StudentParentDetailsFindFirstArgs<ExtArgs>>): Prisma__StudentParentDetailsClient<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentParentDetails that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentParentDetailsFindFirstOrThrowArgs} args - Arguments to find a StudentParentDetails
     * @example
     * // Get one StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentParentDetailsFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentParentDetailsFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentParentDetailsClient<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentParentDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentParentDetailsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.findMany()
     * 
     * // Get first 10 StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentParentDetailsWithIdOnly = await prisma.studentParentDetails.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentParentDetailsFindManyArgs>(args?: SelectSubset<T, StudentParentDetailsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentParentDetails.
     * @param {StudentParentDetailsCreateArgs} args - Arguments to create a StudentParentDetails.
     * @example
     * // Create one StudentParentDetails
     * const StudentParentDetails = await prisma.studentParentDetails.create({
     *   data: {
     *     // ... data to create a StudentParentDetails
     *   }
     * })
     * 
     */
    create<T extends StudentParentDetailsCreateArgs>(args: SelectSubset<T, StudentParentDetailsCreateArgs<ExtArgs>>): Prisma__StudentParentDetailsClient<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentParentDetails.
     * @param {StudentParentDetailsCreateManyArgs} args - Arguments to create many StudentParentDetails.
     * @example
     * // Create many StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentParentDetailsCreateManyArgs>(args?: SelectSubset<T, StudentParentDetailsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentParentDetails and returns the data saved in the database.
     * @param {StudentParentDetailsCreateManyAndReturnArgs} args - Arguments to create many StudentParentDetails.
     * @example
     * // Create many StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentParentDetails and only return the `id`
     * const studentParentDetailsWithIdOnly = await prisma.studentParentDetails.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentParentDetailsCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentParentDetailsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentParentDetails.
     * @param {StudentParentDetailsDeleteArgs} args - Arguments to delete one StudentParentDetails.
     * @example
     * // Delete one StudentParentDetails
     * const StudentParentDetails = await prisma.studentParentDetails.delete({
     *   where: {
     *     // ... filter to delete one StudentParentDetails
     *   }
     * })
     * 
     */
    delete<T extends StudentParentDetailsDeleteArgs>(args: SelectSubset<T, StudentParentDetailsDeleteArgs<ExtArgs>>): Prisma__StudentParentDetailsClient<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentParentDetails.
     * @param {StudentParentDetailsUpdateArgs} args - Arguments to update one StudentParentDetails.
     * @example
     * // Update one StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentParentDetailsUpdateArgs>(args: SelectSubset<T, StudentParentDetailsUpdateArgs<ExtArgs>>): Prisma__StudentParentDetailsClient<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentParentDetails.
     * @param {StudentParentDetailsDeleteManyArgs} args - Arguments to filter StudentParentDetails to delete.
     * @example
     * // Delete a few StudentParentDetails
     * const { count } = await prisma.studentParentDetails.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentParentDetailsDeleteManyArgs>(args?: SelectSubset<T, StudentParentDetailsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentParentDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentParentDetailsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentParentDetailsUpdateManyArgs>(args: SelectSubset<T, StudentParentDetailsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentParentDetails and returns the data updated in the database.
     * @param {StudentParentDetailsUpdateManyAndReturnArgs} args - Arguments to update many StudentParentDetails.
     * @example
     * // Update many StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentParentDetails and only return the `id`
     * const studentParentDetailsWithIdOnly = await prisma.studentParentDetails.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentParentDetailsUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentParentDetailsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentParentDetails.
     * @param {StudentParentDetailsUpsertArgs} args - Arguments to update or create a StudentParentDetails.
     * @example
     * // Update or create a StudentParentDetails
     * const studentParentDetails = await prisma.studentParentDetails.upsert({
     *   create: {
     *     // ... data to create a StudentParentDetails
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentParentDetails we want to update
     *   }
     * })
     */
    upsert<T extends StudentParentDetailsUpsertArgs>(args: SelectSubset<T, StudentParentDetailsUpsertArgs<ExtArgs>>): Prisma__StudentParentDetailsClient<$Result.GetResult<Prisma.$StudentParentDetailsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentParentDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentParentDetailsCountArgs} args - Arguments to filter StudentParentDetails to count.
     * @example
     * // Count the number of StudentParentDetails
     * const count = await prisma.studentParentDetails.count({
     *   where: {
     *     // ... the filter for the StudentParentDetails we want to count
     *   }
     * })
    **/
    count<T extends StudentParentDetailsCountArgs>(
      args?: Subset<T, StudentParentDetailsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentParentDetailsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentParentDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentParentDetailsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentParentDetailsAggregateArgs>(args: Subset<T, StudentParentDetailsAggregateArgs>): Prisma.PrismaPromise<GetStudentParentDetailsAggregateType<T>>

    /**
     * Group by StudentParentDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentParentDetailsGroupByArgs} args - Group by arguments.
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
      T extends StudentParentDetailsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentParentDetailsGroupByArgs['orderBy'] }
        : { orderBy?: StudentParentDetailsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentParentDetailsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentParentDetailsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentParentDetails model
   */
  readonly fields: StudentParentDetailsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentParentDetails.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentParentDetailsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    studentProfile<T extends StudentProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfileDefaultArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentParentDetails model
   */
  interface StudentParentDetailsFieldRefs {
    readonly id: FieldRef<"StudentParentDetails", 'String'>
    readonly studentProfileId: FieldRef<"StudentParentDetails", 'String'>
    readonly fatherName: FieldRef<"StudentParentDetails", 'String'>
    readonly fatherOccupation: FieldRef<"StudentParentDetails", 'String'>
    readonly fatherCompany: FieldRef<"StudentParentDetails", 'String'>
    readonly fatherAnnualIncome: FieldRef<"StudentParentDetails", 'String'>
    readonly fatherQualification: FieldRef<"StudentParentDetails", 'String'>
    readonly fatherEmail: FieldRef<"StudentParentDetails", 'String'>
    readonly fatherPhone: FieldRef<"StudentParentDetails", 'String'>
    readonly fatherAddress: FieldRef<"StudentParentDetails", 'String'>
    readonly motherName: FieldRef<"StudentParentDetails", 'String'>
    readonly motherOccupation: FieldRef<"StudentParentDetails", 'String'>
    readonly motherQualification: FieldRef<"StudentParentDetails", 'String'>
    readonly motherAnnualIncome: FieldRef<"StudentParentDetails", 'String'>
    readonly motherEmail: FieldRef<"StudentParentDetails", 'String'>
    readonly motherPhone: FieldRef<"StudentParentDetails", 'String'>
    readonly motherAddress: FieldRef<"StudentParentDetails", 'String'>
    readonly guardianName: FieldRef<"StudentParentDetails", 'String'>
    readonly guardianRelationship: FieldRef<"StudentParentDetails", 'String'>
    readonly guardianPhone: FieldRef<"StudentParentDetails", 'String'>
    readonly guardianAlternatePhone: FieldRef<"StudentParentDetails", 'String'>
    readonly createdAt: FieldRef<"StudentParentDetails", 'DateTime'>
    readonly updatedAt: FieldRef<"StudentParentDetails", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudentParentDetails findUnique
   */
  export type StudentParentDetailsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
    /**
     * Filter, which StudentParentDetails to fetch.
     */
    where: StudentParentDetailsWhereUniqueInput
  }

  /**
   * StudentParentDetails findUniqueOrThrow
   */
  export type StudentParentDetailsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
    /**
     * Filter, which StudentParentDetails to fetch.
     */
    where: StudentParentDetailsWhereUniqueInput
  }

  /**
   * StudentParentDetails findFirst
   */
  export type StudentParentDetailsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
    /**
     * Filter, which StudentParentDetails to fetch.
     */
    where?: StudentParentDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentParentDetails to fetch.
     */
    orderBy?: StudentParentDetailsOrderByWithRelationInput | StudentParentDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentParentDetails.
     */
    cursor?: StudentParentDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentParentDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentParentDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentParentDetails.
     */
    distinct?: StudentParentDetailsScalarFieldEnum | StudentParentDetailsScalarFieldEnum[]
  }

  /**
   * StudentParentDetails findFirstOrThrow
   */
  export type StudentParentDetailsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
    /**
     * Filter, which StudentParentDetails to fetch.
     */
    where?: StudentParentDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentParentDetails to fetch.
     */
    orderBy?: StudentParentDetailsOrderByWithRelationInput | StudentParentDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentParentDetails.
     */
    cursor?: StudentParentDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentParentDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentParentDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentParentDetails.
     */
    distinct?: StudentParentDetailsScalarFieldEnum | StudentParentDetailsScalarFieldEnum[]
  }

  /**
   * StudentParentDetails findMany
   */
  export type StudentParentDetailsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
    /**
     * Filter, which StudentParentDetails to fetch.
     */
    where?: StudentParentDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentParentDetails to fetch.
     */
    orderBy?: StudentParentDetailsOrderByWithRelationInput | StudentParentDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentParentDetails.
     */
    cursor?: StudentParentDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentParentDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentParentDetails.
     */
    skip?: number
    distinct?: StudentParentDetailsScalarFieldEnum | StudentParentDetailsScalarFieldEnum[]
  }

  /**
   * StudentParentDetails create
   */
  export type StudentParentDetailsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentParentDetails.
     */
    data: XOR<StudentParentDetailsCreateInput, StudentParentDetailsUncheckedCreateInput>
  }

  /**
   * StudentParentDetails createMany
   */
  export type StudentParentDetailsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentParentDetails.
     */
    data: StudentParentDetailsCreateManyInput | StudentParentDetailsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentParentDetails createManyAndReturn
   */
  export type StudentParentDetailsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * The data used to create many StudentParentDetails.
     */
    data: StudentParentDetailsCreateManyInput | StudentParentDetailsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentParentDetails update
   */
  export type StudentParentDetailsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentParentDetails.
     */
    data: XOR<StudentParentDetailsUpdateInput, StudentParentDetailsUncheckedUpdateInput>
    /**
     * Choose, which StudentParentDetails to update.
     */
    where: StudentParentDetailsWhereUniqueInput
  }

  /**
   * StudentParentDetails updateMany
   */
  export type StudentParentDetailsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentParentDetails.
     */
    data: XOR<StudentParentDetailsUpdateManyMutationInput, StudentParentDetailsUncheckedUpdateManyInput>
    /**
     * Filter which StudentParentDetails to update
     */
    where?: StudentParentDetailsWhereInput
    /**
     * Limit how many StudentParentDetails to update.
     */
    limit?: number
  }

  /**
   * StudentParentDetails updateManyAndReturn
   */
  export type StudentParentDetailsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * The data used to update StudentParentDetails.
     */
    data: XOR<StudentParentDetailsUpdateManyMutationInput, StudentParentDetailsUncheckedUpdateManyInput>
    /**
     * Filter which StudentParentDetails to update
     */
    where?: StudentParentDetailsWhereInput
    /**
     * Limit how many StudentParentDetails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentParentDetails upsert
   */
  export type StudentParentDetailsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentParentDetails to update in case it exists.
     */
    where: StudentParentDetailsWhereUniqueInput
    /**
     * In case the StudentParentDetails found by the `where` argument doesn't exist, create a new StudentParentDetails with this data.
     */
    create: XOR<StudentParentDetailsCreateInput, StudentParentDetailsUncheckedCreateInput>
    /**
     * In case the StudentParentDetails was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentParentDetailsUpdateInput, StudentParentDetailsUncheckedUpdateInput>
  }

  /**
   * StudentParentDetails delete
   */
  export type StudentParentDetailsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
    /**
     * Filter which StudentParentDetails to delete.
     */
    where: StudentParentDetailsWhereUniqueInput
  }

  /**
   * StudentParentDetails deleteMany
   */
  export type StudentParentDetailsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentParentDetails to delete
     */
    where?: StudentParentDetailsWhereInput
    /**
     * Limit how many StudentParentDetails to delete.
     */
    limit?: number
  }

  /**
   * StudentParentDetails without action
   */
  export type StudentParentDetailsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentParentDetails
     */
    select?: StudentParentDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentParentDetails
     */
    omit?: StudentParentDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentParentDetailsInclude<ExtArgs> | null
  }


  /**
   * Model StudentContactDetails
   */

  export type AggregateStudentContactDetails = {
    _count: StudentContactDetailsCountAggregateOutputType | null
    _min: StudentContactDetailsMinAggregateOutputType | null
    _max: StudentContactDetailsMaxAggregateOutputType | null
  }

  export type StudentContactDetailsMinAggregateOutputType = {
    id: string | null
    studentProfileId: string | null
    permanentAddress: string | null
    currentAddress: string | null
    addressType: $Enums.AddressType | null
    durationAtCurrentAddress: string | null
    personalMobile: string | null
    alternateMobile: string | null
    personalEmail: string | null
    alternateEmail: string | null
    whatsappNumber: string | null
    telegramUsername: string | null
    linkedInProfile: string | null
    githubProfile: string | null
    preferredContactMethod: $Enums.PreferredContactMethod | null
    preferredContactTime: string | null
    communicationEmailPreference: $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentContactDetailsMaxAggregateOutputType = {
    id: string | null
    studentProfileId: string | null
    permanentAddress: string | null
    currentAddress: string | null
    addressType: $Enums.AddressType | null
    durationAtCurrentAddress: string | null
    personalMobile: string | null
    alternateMobile: string | null
    personalEmail: string | null
    alternateEmail: string | null
    whatsappNumber: string | null
    telegramUsername: string | null
    linkedInProfile: string | null
    githubProfile: string | null
    preferredContactMethod: $Enums.PreferredContactMethod | null
    preferredContactTime: string | null
    communicationEmailPreference: $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentContactDetailsCountAggregateOutputType = {
    id: number
    studentProfileId: number
    permanentAddress: number
    currentAddress: number
    addressType: number
    durationAtCurrentAddress: number
    personalMobile: number
    alternateMobile: number
    personalEmail: number
    alternateEmail: number
    whatsappNumber: number
    telegramUsername: number
    linkedInProfile: number
    githubProfile: number
    preferredContactMethod: number
    preferredContactTime: number
    communicationEmailPreference: number
    allowWhatsappCommunication: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentContactDetailsMinAggregateInputType = {
    id?: true
    studentProfileId?: true
    permanentAddress?: true
    currentAddress?: true
    addressType?: true
    durationAtCurrentAddress?: true
    personalMobile?: true
    alternateMobile?: true
    personalEmail?: true
    alternateEmail?: true
    whatsappNumber?: true
    telegramUsername?: true
    linkedInProfile?: true
    githubProfile?: true
    preferredContactMethod?: true
    preferredContactTime?: true
    communicationEmailPreference?: true
    allowWhatsappCommunication?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentContactDetailsMaxAggregateInputType = {
    id?: true
    studentProfileId?: true
    permanentAddress?: true
    currentAddress?: true
    addressType?: true
    durationAtCurrentAddress?: true
    personalMobile?: true
    alternateMobile?: true
    personalEmail?: true
    alternateEmail?: true
    whatsappNumber?: true
    telegramUsername?: true
    linkedInProfile?: true
    githubProfile?: true
    preferredContactMethod?: true
    preferredContactTime?: true
    communicationEmailPreference?: true
    allowWhatsappCommunication?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentContactDetailsCountAggregateInputType = {
    id?: true
    studentProfileId?: true
    permanentAddress?: true
    currentAddress?: true
    addressType?: true
    durationAtCurrentAddress?: true
    personalMobile?: true
    alternateMobile?: true
    personalEmail?: true
    alternateEmail?: true
    whatsappNumber?: true
    telegramUsername?: true
    linkedInProfile?: true
    githubProfile?: true
    preferredContactMethod?: true
    preferredContactTime?: true
    communicationEmailPreference?: true
    allowWhatsappCommunication?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentContactDetailsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentContactDetails to aggregate.
     */
    where?: StudentContactDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentContactDetails to fetch.
     */
    orderBy?: StudentContactDetailsOrderByWithRelationInput | StudentContactDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentContactDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentContactDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentContactDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentContactDetails
    **/
    _count?: true | StudentContactDetailsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentContactDetailsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentContactDetailsMaxAggregateInputType
  }

  export type GetStudentContactDetailsAggregateType<T extends StudentContactDetailsAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentContactDetails]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentContactDetails[P]>
      : GetScalarType<T[P], AggregateStudentContactDetails[P]>
  }




  export type StudentContactDetailsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentContactDetailsWhereInput
    orderBy?: StudentContactDetailsOrderByWithAggregationInput | StudentContactDetailsOrderByWithAggregationInput[]
    by: StudentContactDetailsScalarFieldEnum[] | StudentContactDetailsScalarFieldEnum
    having?: StudentContactDetailsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentContactDetailsCountAggregateInputType | true
    _min?: StudentContactDetailsMinAggregateInputType
    _max?: StudentContactDetailsMaxAggregateInputType
  }

  export type StudentContactDetailsGroupByOutputType = {
    id: string
    studentProfileId: string
    permanentAddress: string | null
    currentAddress: string | null
    addressType: $Enums.AddressType | null
    durationAtCurrentAddress: string | null
    personalMobile: string | null
    alternateMobile: string | null
    personalEmail: string | null
    alternateEmail: string | null
    whatsappNumber: string | null
    telegramUsername: string | null
    linkedInProfile: string | null
    githubProfile: string | null
    preferredContactMethod: $Enums.PreferredContactMethod | null
    preferredContactTime: string | null
    communicationEmailPreference: $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication: boolean
    createdAt: Date
    updatedAt: Date
    _count: StudentContactDetailsCountAggregateOutputType | null
    _min: StudentContactDetailsMinAggregateOutputType | null
    _max: StudentContactDetailsMaxAggregateOutputType | null
  }

  type GetStudentContactDetailsGroupByPayload<T extends StudentContactDetailsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentContactDetailsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentContactDetailsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentContactDetailsGroupByOutputType[P]>
            : GetScalarType<T[P], StudentContactDetailsGroupByOutputType[P]>
        }
      >
    >


  export type StudentContactDetailsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    permanentAddress?: boolean
    currentAddress?: boolean
    addressType?: boolean
    durationAtCurrentAddress?: boolean
    personalMobile?: boolean
    alternateMobile?: boolean
    personalEmail?: boolean
    alternateEmail?: boolean
    whatsappNumber?: boolean
    telegramUsername?: boolean
    linkedInProfile?: boolean
    githubProfile?: boolean
    preferredContactMethod?: boolean
    preferredContactTime?: boolean
    communicationEmailPreference?: boolean
    allowWhatsappCommunication?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentContactDetails"]>

  export type StudentContactDetailsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    permanentAddress?: boolean
    currentAddress?: boolean
    addressType?: boolean
    durationAtCurrentAddress?: boolean
    personalMobile?: boolean
    alternateMobile?: boolean
    personalEmail?: boolean
    alternateEmail?: boolean
    whatsappNumber?: boolean
    telegramUsername?: boolean
    linkedInProfile?: boolean
    githubProfile?: boolean
    preferredContactMethod?: boolean
    preferredContactTime?: boolean
    communicationEmailPreference?: boolean
    allowWhatsappCommunication?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentContactDetails"]>

  export type StudentContactDetailsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    permanentAddress?: boolean
    currentAddress?: boolean
    addressType?: boolean
    durationAtCurrentAddress?: boolean
    personalMobile?: boolean
    alternateMobile?: boolean
    personalEmail?: boolean
    alternateEmail?: boolean
    whatsappNumber?: boolean
    telegramUsername?: boolean
    linkedInProfile?: boolean
    githubProfile?: boolean
    preferredContactMethod?: boolean
    preferredContactTime?: boolean
    communicationEmailPreference?: boolean
    allowWhatsappCommunication?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentContactDetails"]>

  export type StudentContactDetailsSelectScalar = {
    id?: boolean
    studentProfileId?: boolean
    permanentAddress?: boolean
    currentAddress?: boolean
    addressType?: boolean
    durationAtCurrentAddress?: boolean
    personalMobile?: boolean
    alternateMobile?: boolean
    personalEmail?: boolean
    alternateEmail?: boolean
    whatsappNumber?: boolean
    telegramUsername?: boolean
    linkedInProfile?: boolean
    githubProfile?: boolean
    preferredContactMethod?: boolean
    preferredContactTime?: boolean
    communicationEmailPreference?: boolean
    allowWhatsappCommunication?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentContactDetailsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProfileId" | "permanentAddress" | "currentAddress" | "addressType" | "durationAtCurrentAddress" | "personalMobile" | "alternateMobile" | "personalEmail" | "alternateEmail" | "whatsappNumber" | "telegramUsername" | "linkedInProfile" | "githubProfile" | "preferredContactMethod" | "preferredContactTime" | "communicationEmailPreference" | "allowWhatsappCommunication" | "createdAt" | "updatedAt", ExtArgs["result"]["studentContactDetails"]>
  export type StudentContactDetailsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type StudentContactDetailsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type StudentContactDetailsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }

  export type $StudentContactDetailsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentContactDetails"
    objects: {
      studentProfile: Prisma.$StudentProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentProfileId: string
      permanentAddress: string | null
      currentAddress: string | null
      addressType: $Enums.AddressType | null
      durationAtCurrentAddress: string | null
      personalMobile: string | null
      alternateMobile: string | null
      personalEmail: string | null
      alternateEmail: string | null
      whatsappNumber: string | null
      telegramUsername: string | null
      linkedInProfile: string | null
      githubProfile: string | null
      preferredContactMethod: $Enums.PreferredContactMethod | null
      preferredContactTime: string | null
      communicationEmailPreference: $Enums.CommunicationEmailPreference | null
      allowWhatsappCommunication: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["studentContactDetails"]>
    composites: {}
  }

  type StudentContactDetailsGetPayload<S extends boolean | null | undefined | StudentContactDetailsDefaultArgs> = $Result.GetResult<Prisma.$StudentContactDetailsPayload, S>

  type StudentContactDetailsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentContactDetailsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentContactDetailsCountAggregateInputType | true
    }

  export interface StudentContactDetailsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentContactDetails'], meta: { name: 'StudentContactDetails' } }
    /**
     * Find zero or one StudentContactDetails that matches the filter.
     * @param {StudentContactDetailsFindUniqueArgs} args - Arguments to find a StudentContactDetails
     * @example
     * // Get one StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentContactDetailsFindUniqueArgs>(args: SelectSubset<T, StudentContactDetailsFindUniqueArgs<ExtArgs>>): Prisma__StudentContactDetailsClient<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentContactDetails that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentContactDetailsFindUniqueOrThrowArgs} args - Arguments to find a StudentContactDetails
     * @example
     * // Get one StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentContactDetailsFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentContactDetailsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentContactDetailsClient<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentContactDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentContactDetailsFindFirstArgs} args - Arguments to find a StudentContactDetails
     * @example
     * // Get one StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentContactDetailsFindFirstArgs>(args?: SelectSubset<T, StudentContactDetailsFindFirstArgs<ExtArgs>>): Prisma__StudentContactDetailsClient<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentContactDetails that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentContactDetailsFindFirstOrThrowArgs} args - Arguments to find a StudentContactDetails
     * @example
     * // Get one StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentContactDetailsFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentContactDetailsFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentContactDetailsClient<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentContactDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentContactDetailsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.findMany()
     * 
     * // Get first 10 StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentContactDetailsWithIdOnly = await prisma.studentContactDetails.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentContactDetailsFindManyArgs>(args?: SelectSubset<T, StudentContactDetailsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentContactDetails.
     * @param {StudentContactDetailsCreateArgs} args - Arguments to create a StudentContactDetails.
     * @example
     * // Create one StudentContactDetails
     * const StudentContactDetails = await prisma.studentContactDetails.create({
     *   data: {
     *     // ... data to create a StudentContactDetails
     *   }
     * })
     * 
     */
    create<T extends StudentContactDetailsCreateArgs>(args: SelectSubset<T, StudentContactDetailsCreateArgs<ExtArgs>>): Prisma__StudentContactDetailsClient<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentContactDetails.
     * @param {StudentContactDetailsCreateManyArgs} args - Arguments to create many StudentContactDetails.
     * @example
     * // Create many StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentContactDetailsCreateManyArgs>(args?: SelectSubset<T, StudentContactDetailsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentContactDetails and returns the data saved in the database.
     * @param {StudentContactDetailsCreateManyAndReturnArgs} args - Arguments to create many StudentContactDetails.
     * @example
     * // Create many StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentContactDetails and only return the `id`
     * const studentContactDetailsWithIdOnly = await prisma.studentContactDetails.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentContactDetailsCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentContactDetailsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentContactDetails.
     * @param {StudentContactDetailsDeleteArgs} args - Arguments to delete one StudentContactDetails.
     * @example
     * // Delete one StudentContactDetails
     * const StudentContactDetails = await prisma.studentContactDetails.delete({
     *   where: {
     *     // ... filter to delete one StudentContactDetails
     *   }
     * })
     * 
     */
    delete<T extends StudentContactDetailsDeleteArgs>(args: SelectSubset<T, StudentContactDetailsDeleteArgs<ExtArgs>>): Prisma__StudentContactDetailsClient<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentContactDetails.
     * @param {StudentContactDetailsUpdateArgs} args - Arguments to update one StudentContactDetails.
     * @example
     * // Update one StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentContactDetailsUpdateArgs>(args: SelectSubset<T, StudentContactDetailsUpdateArgs<ExtArgs>>): Prisma__StudentContactDetailsClient<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentContactDetails.
     * @param {StudentContactDetailsDeleteManyArgs} args - Arguments to filter StudentContactDetails to delete.
     * @example
     * // Delete a few StudentContactDetails
     * const { count } = await prisma.studentContactDetails.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentContactDetailsDeleteManyArgs>(args?: SelectSubset<T, StudentContactDetailsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentContactDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentContactDetailsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentContactDetailsUpdateManyArgs>(args: SelectSubset<T, StudentContactDetailsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentContactDetails and returns the data updated in the database.
     * @param {StudentContactDetailsUpdateManyAndReturnArgs} args - Arguments to update many StudentContactDetails.
     * @example
     * // Update many StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentContactDetails and only return the `id`
     * const studentContactDetailsWithIdOnly = await prisma.studentContactDetails.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentContactDetailsUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentContactDetailsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentContactDetails.
     * @param {StudentContactDetailsUpsertArgs} args - Arguments to update or create a StudentContactDetails.
     * @example
     * // Update or create a StudentContactDetails
     * const studentContactDetails = await prisma.studentContactDetails.upsert({
     *   create: {
     *     // ... data to create a StudentContactDetails
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentContactDetails we want to update
     *   }
     * })
     */
    upsert<T extends StudentContactDetailsUpsertArgs>(args: SelectSubset<T, StudentContactDetailsUpsertArgs<ExtArgs>>): Prisma__StudentContactDetailsClient<$Result.GetResult<Prisma.$StudentContactDetailsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentContactDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentContactDetailsCountArgs} args - Arguments to filter StudentContactDetails to count.
     * @example
     * // Count the number of StudentContactDetails
     * const count = await prisma.studentContactDetails.count({
     *   where: {
     *     // ... the filter for the StudentContactDetails we want to count
     *   }
     * })
    **/
    count<T extends StudentContactDetailsCountArgs>(
      args?: Subset<T, StudentContactDetailsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentContactDetailsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentContactDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentContactDetailsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentContactDetailsAggregateArgs>(args: Subset<T, StudentContactDetailsAggregateArgs>): Prisma.PrismaPromise<GetStudentContactDetailsAggregateType<T>>

    /**
     * Group by StudentContactDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentContactDetailsGroupByArgs} args - Group by arguments.
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
      T extends StudentContactDetailsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentContactDetailsGroupByArgs['orderBy'] }
        : { orderBy?: StudentContactDetailsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentContactDetailsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentContactDetailsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentContactDetails model
   */
  readonly fields: StudentContactDetailsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentContactDetails.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentContactDetailsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    studentProfile<T extends StudentProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfileDefaultArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentContactDetails model
   */
  interface StudentContactDetailsFieldRefs {
    readonly id: FieldRef<"StudentContactDetails", 'String'>
    readonly studentProfileId: FieldRef<"StudentContactDetails", 'String'>
    readonly permanentAddress: FieldRef<"StudentContactDetails", 'String'>
    readonly currentAddress: FieldRef<"StudentContactDetails", 'String'>
    readonly addressType: FieldRef<"StudentContactDetails", 'AddressType'>
    readonly durationAtCurrentAddress: FieldRef<"StudentContactDetails", 'String'>
    readonly personalMobile: FieldRef<"StudentContactDetails", 'String'>
    readonly alternateMobile: FieldRef<"StudentContactDetails", 'String'>
    readonly personalEmail: FieldRef<"StudentContactDetails", 'String'>
    readonly alternateEmail: FieldRef<"StudentContactDetails", 'String'>
    readonly whatsappNumber: FieldRef<"StudentContactDetails", 'String'>
    readonly telegramUsername: FieldRef<"StudentContactDetails", 'String'>
    readonly linkedInProfile: FieldRef<"StudentContactDetails", 'String'>
    readonly githubProfile: FieldRef<"StudentContactDetails", 'String'>
    readonly preferredContactMethod: FieldRef<"StudentContactDetails", 'PreferredContactMethod'>
    readonly preferredContactTime: FieldRef<"StudentContactDetails", 'String'>
    readonly communicationEmailPreference: FieldRef<"StudentContactDetails", 'CommunicationEmailPreference'>
    readonly allowWhatsappCommunication: FieldRef<"StudentContactDetails", 'Boolean'>
    readonly createdAt: FieldRef<"StudentContactDetails", 'DateTime'>
    readonly updatedAt: FieldRef<"StudentContactDetails", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudentContactDetails findUnique
   */
  export type StudentContactDetailsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
    /**
     * Filter, which StudentContactDetails to fetch.
     */
    where: StudentContactDetailsWhereUniqueInput
  }

  /**
   * StudentContactDetails findUniqueOrThrow
   */
  export type StudentContactDetailsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
    /**
     * Filter, which StudentContactDetails to fetch.
     */
    where: StudentContactDetailsWhereUniqueInput
  }

  /**
   * StudentContactDetails findFirst
   */
  export type StudentContactDetailsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
    /**
     * Filter, which StudentContactDetails to fetch.
     */
    where?: StudentContactDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentContactDetails to fetch.
     */
    orderBy?: StudentContactDetailsOrderByWithRelationInput | StudentContactDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentContactDetails.
     */
    cursor?: StudentContactDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentContactDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentContactDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentContactDetails.
     */
    distinct?: StudentContactDetailsScalarFieldEnum | StudentContactDetailsScalarFieldEnum[]
  }

  /**
   * StudentContactDetails findFirstOrThrow
   */
  export type StudentContactDetailsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
    /**
     * Filter, which StudentContactDetails to fetch.
     */
    where?: StudentContactDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentContactDetails to fetch.
     */
    orderBy?: StudentContactDetailsOrderByWithRelationInput | StudentContactDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentContactDetails.
     */
    cursor?: StudentContactDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentContactDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentContactDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentContactDetails.
     */
    distinct?: StudentContactDetailsScalarFieldEnum | StudentContactDetailsScalarFieldEnum[]
  }

  /**
   * StudentContactDetails findMany
   */
  export type StudentContactDetailsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
    /**
     * Filter, which StudentContactDetails to fetch.
     */
    where?: StudentContactDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentContactDetails to fetch.
     */
    orderBy?: StudentContactDetailsOrderByWithRelationInput | StudentContactDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentContactDetails.
     */
    cursor?: StudentContactDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentContactDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentContactDetails.
     */
    skip?: number
    distinct?: StudentContactDetailsScalarFieldEnum | StudentContactDetailsScalarFieldEnum[]
  }

  /**
   * StudentContactDetails create
   */
  export type StudentContactDetailsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentContactDetails.
     */
    data: XOR<StudentContactDetailsCreateInput, StudentContactDetailsUncheckedCreateInput>
  }

  /**
   * StudentContactDetails createMany
   */
  export type StudentContactDetailsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentContactDetails.
     */
    data: StudentContactDetailsCreateManyInput | StudentContactDetailsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentContactDetails createManyAndReturn
   */
  export type StudentContactDetailsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * The data used to create many StudentContactDetails.
     */
    data: StudentContactDetailsCreateManyInput | StudentContactDetailsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentContactDetails update
   */
  export type StudentContactDetailsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentContactDetails.
     */
    data: XOR<StudentContactDetailsUpdateInput, StudentContactDetailsUncheckedUpdateInput>
    /**
     * Choose, which StudentContactDetails to update.
     */
    where: StudentContactDetailsWhereUniqueInput
  }

  /**
   * StudentContactDetails updateMany
   */
  export type StudentContactDetailsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentContactDetails.
     */
    data: XOR<StudentContactDetailsUpdateManyMutationInput, StudentContactDetailsUncheckedUpdateManyInput>
    /**
     * Filter which StudentContactDetails to update
     */
    where?: StudentContactDetailsWhereInput
    /**
     * Limit how many StudentContactDetails to update.
     */
    limit?: number
  }

  /**
   * StudentContactDetails updateManyAndReturn
   */
  export type StudentContactDetailsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * The data used to update StudentContactDetails.
     */
    data: XOR<StudentContactDetailsUpdateManyMutationInput, StudentContactDetailsUncheckedUpdateManyInput>
    /**
     * Filter which StudentContactDetails to update
     */
    where?: StudentContactDetailsWhereInput
    /**
     * Limit how many StudentContactDetails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentContactDetails upsert
   */
  export type StudentContactDetailsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentContactDetails to update in case it exists.
     */
    where: StudentContactDetailsWhereUniqueInput
    /**
     * In case the StudentContactDetails found by the `where` argument doesn't exist, create a new StudentContactDetails with this data.
     */
    create: XOR<StudentContactDetailsCreateInput, StudentContactDetailsUncheckedCreateInput>
    /**
     * In case the StudentContactDetails was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentContactDetailsUpdateInput, StudentContactDetailsUncheckedUpdateInput>
  }

  /**
   * StudentContactDetails delete
   */
  export type StudentContactDetailsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
    /**
     * Filter which StudentContactDetails to delete.
     */
    where: StudentContactDetailsWhereUniqueInput
  }

  /**
   * StudentContactDetails deleteMany
   */
  export type StudentContactDetailsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentContactDetails to delete
     */
    where?: StudentContactDetailsWhereInput
    /**
     * Limit how many StudentContactDetails to delete.
     */
    limit?: number
  }

  /**
   * StudentContactDetails without action
   */
  export type StudentContactDetailsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentContactDetails
     */
    select?: StudentContactDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentContactDetails
     */
    omit?: StudentContactDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentContactDetailsInclude<ExtArgs> | null
  }


  /**
   * Model StudentDocument
   */

  export type AggregateStudentDocument = {
    _count: StudentDocumentCountAggregateOutputType | null
    _avg: StudentDocumentAvgAggregateOutputType | null
    _sum: StudentDocumentSumAggregateOutputType | null
    _min: StudentDocumentMinAggregateOutputType | null
    _max: StudentDocumentMaxAggregateOutputType | null
  }

  export type StudentDocumentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type StudentDocumentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type StudentDocumentMinAggregateOutputType = {
    id: string | null
    studentProfileId: string | null
    documentName: string | null
    category: $Enums.DocumentCategory | null
    description: string | null
    fileType: string | null
    fileSize: number | null
    cloudinaryPublicId: string | null
    fileUrl: string | null
    uploadedAt: Date | null
    updatedAt: Date | null
    resourceType: string | null
  }

  export type StudentDocumentMaxAggregateOutputType = {
    id: string | null
    studentProfileId: string | null
    documentName: string | null
    category: $Enums.DocumentCategory | null
    description: string | null
    fileType: string | null
    fileSize: number | null
    cloudinaryPublicId: string | null
    fileUrl: string | null
    uploadedAt: Date | null
    updatedAt: Date | null
    resourceType: string | null
  }

  export type StudentDocumentCountAggregateOutputType = {
    id: number
    studentProfileId: number
    documentName: number
    category: number
    description: number
    fileType: number
    fileSize: number
    cloudinaryPublicId: number
    fileUrl: number
    uploadedAt: number
    updatedAt: number
    resourceType: number
    _all: number
  }


  export type StudentDocumentAvgAggregateInputType = {
    fileSize?: true
  }

  export type StudentDocumentSumAggregateInputType = {
    fileSize?: true
  }

  export type StudentDocumentMinAggregateInputType = {
    id?: true
    studentProfileId?: true
    documentName?: true
    category?: true
    description?: true
    fileType?: true
    fileSize?: true
    cloudinaryPublicId?: true
    fileUrl?: true
    uploadedAt?: true
    updatedAt?: true
    resourceType?: true
  }

  export type StudentDocumentMaxAggregateInputType = {
    id?: true
    studentProfileId?: true
    documentName?: true
    category?: true
    description?: true
    fileType?: true
    fileSize?: true
    cloudinaryPublicId?: true
    fileUrl?: true
    uploadedAt?: true
    updatedAt?: true
    resourceType?: true
  }

  export type StudentDocumentCountAggregateInputType = {
    id?: true
    studentProfileId?: true
    documentName?: true
    category?: true
    description?: true
    fileType?: true
    fileSize?: true
    cloudinaryPublicId?: true
    fileUrl?: true
    uploadedAt?: true
    updatedAt?: true
    resourceType?: true
    _all?: true
  }

  export type StudentDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentDocument to aggregate.
     */
    where?: StudentDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentDocuments to fetch.
     */
    orderBy?: StudentDocumentOrderByWithRelationInput | StudentDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentDocuments
    **/
    _count?: true | StudentDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentDocumentMaxAggregateInputType
  }

  export type GetStudentDocumentAggregateType<T extends StudentDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentDocument[P]>
      : GetScalarType<T[P], AggregateStudentDocument[P]>
  }




  export type StudentDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentDocumentWhereInput
    orderBy?: StudentDocumentOrderByWithAggregationInput | StudentDocumentOrderByWithAggregationInput[]
    by: StudentDocumentScalarFieldEnum[] | StudentDocumentScalarFieldEnum
    having?: StudentDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentDocumentCountAggregateInputType | true
    _avg?: StudentDocumentAvgAggregateInputType
    _sum?: StudentDocumentSumAggregateInputType
    _min?: StudentDocumentMinAggregateInputType
    _max?: StudentDocumentMaxAggregateInputType
  }

  export type StudentDocumentGroupByOutputType = {
    id: string
    studentProfileId: string
    documentName: string
    category: $Enums.DocumentCategory
    description: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt: Date
    updatedAt: Date
    resourceType: string
    _count: StudentDocumentCountAggregateOutputType | null
    _avg: StudentDocumentAvgAggregateOutputType | null
    _sum: StudentDocumentSumAggregateOutputType | null
    _min: StudentDocumentMinAggregateOutputType | null
    _max: StudentDocumentMaxAggregateOutputType | null
  }

  type GetStudentDocumentGroupByPayload<T extends StudentDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentDocumentGroupByOutputType[P]>
        }
      >
    >


  export type StudentDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    documentName?: boolean
    category?: boolean
    description?: boolean
    fileType?: boolean
    fileSize?: boolean
    cloudinaryPublicId?: boolean
    fileUrl?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
    resourceType?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentDocument"]>

  export type StudentDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    documentName?: boolean
    category?: boolean
    description?: boolean
    fileType?: boolean
    fileSize?: boolean
    cloudinaryPublicId?: boolean
    fileUrl?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
    resourceType?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentDocument"]>

  export type StudentDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    documentName?: boolean
    category?: boolean
    description?: boolean
    fileType?: boolean
    fileSize?: boolean
    cloudinaryPublicId?: boolean
    fileUrl?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
    resourceType?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentDocument"]>

  export type StudentDocumentSelectScalar = {
    id?: boolean
    studentProfileId?: boolean
    documentName?: boolean
    category?: boolean
    description?: boolean
    fileType?: boolean
    fileSize?: boolean
    cloudinaryPublicId?: boolean
    fileUrl?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
    resourceType?: boolean
  }

  export type StudentDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProfileId" | "documentName" | "category" | "description" | "fileType" | "fileSize" | "cloudinaryPublicId" | "fileUrl" | "uploadedAt" | "updatedAt" | "resourceType", ExtArgs["result"]["studentDocument"]>
  export type StudentDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type StudentDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type StudentDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }

  export type $StudentDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentDocument"
    objects: {
      studentProfile: Prisma.$StudentProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentProfileId: string
      documentName: string
      category: $Enums.DocumentCategory
      description: string | null
      fileType: string
      fileSize: number
      cloudinaryPublicId: string
      fileUrl: string
      uploadedAt: Date
      updatedAt: Date
      resourceType: string
    }, ExtArgs["result"]["studentDocument"]>
    composites: {}
  }

  type StudentDocumentGetPayload<S extends boolean | null | undefined | StudentDocumentDefaultArgs> = $Result.GetResult<Prisma.$StudentDocumentPayload, S>

  type StudentDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentDocumentCountAggregateInputType | true
    }

  export interface StudentDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentDocument'], meta: { name: 'StudentDocument' } }
    /**
     * Find zero or one StudentDocument that matches the filter.
     * @param {StudentDocumentFindUniqueArgs} args - Arguments to find a StudentDocument
     * @example
     * // Get one StudentDocument
     * const studentDocument = await prisma.studentDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentDocumentFindUniqueArgs>(args: SelectSubset<T, StudentDocumentFindUniqueArgs<ExtArgs>>): Prisma__StudentDocumentClient<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentDocumentFindUniqueOrThrowArgs} args - Arguments to find a StudentDocument
     * @example
     * // Get one StudentDocument
     * const studentDocument = await prisma.studentDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentDocumentClient<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentDocumentFindFirstArgs} args - Arguments to find a StudentDocument
     * @example
     * // Get one StudentDocument
     * const studentDocument = await prisma.studentDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentDocumentFindFirstArgs>(args?: SelectSubset<T, StudentDocumentFindFirstArgs<ExtArgs>>): Prisma__StudentDocumentClient<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentDocumentFindFirstOrThrowArgs} args - Arguments to find a StudentDocument
     * @example
     * // Get one StudentDocument
     * const studentDocument = await prisma.studentDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentDocumentClient<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentDocuments
     * const studentDocuments = await prisma.studentDocument.findMany()
     * 
     * // Get first 10 StudentDocuments
     * const studentDocuments = await prisma.studentDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentDocumentWithIdOnly = await prisma.studentDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentDocumentFindManyArgs>(args?: SelectSubset<T, StudentDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentDocument.
     * @param {StudentDocumentCreateArgs} args - Arguments to create a StudentDocument.
     * @example
     * // Create one StudentDocument
     * const StudentDocument = await prisma.studentDocument.create({
     *   data: {
     *     // ... data to create a StudentDocument
     *   }
     * })
     * 
     */
    create<T extends StudentDocumentCreateArgs>(args: SelectSubset<T, StudentDocumentCreateArgs<ExtArgs>>): Prisma__StudentDocumentClient<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentDocuments.
     * @param {StudentDocumentCreateManyArgs} args - Arguments to create many StudentDocuments.
     * @example
     * // Create many StudentDocuments
     * const studentDocument = await prisma.studentDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentDocumentCreateManyArgs>(args?: SelectSubset<T, StudentDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentDocuments and returns the data saved in the database.
     * @param {StudentDocumentCreateManyAndReturnArgs} args - Arguments to create many StudentDocuments.
     * @example
     * // Create many StudentDocuments
     * const studentDocument = await prisma.studentDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentDocuments and only return the `id`
     * const studentDocumentWithIdOnly = await prisma.studentDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentDocument.
     * @param {StudentDocumentDeleteArgs} args - Arguments to delete one StudentDocument.
     * @example
     * // Delete one StudentDocument
     * const StudentDocument = await prisma.studentDocument.delete({
     *   where: {
     *     // ... filter to delete one StudentDocument
     *   }
     * })
     * 
     */
    delete<T extends StudentDocumentDeleteArgs>(args: SelectSubset<T, StudentDocumentDeleteArgs<ExtArgs>>): Prisma__StudentDocumentClient<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentDocument.
     * @param {StudentDocumentUpdateArgs} args - Arguments to update one StudentDocument.
     * @example
     * // Update one StudentDocument
     * const studentDocument = await prisma.studentDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentDocumentUpdateArgs>(args: SelectSubset<T, StudentDocumentUpdateArgs<ExtArgs>>): Prisma__StudentDocumentClient<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentDocuments.
     * @param {StudentDocumentDeleteManyArgs} args - Arguments to filter StudentDocuments to delete.
     * @example
     * // Delete a few StudentDocuments
     * const { count } = await prisma.studentDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDocumentDeleteManyArgs>(args?: SelectSubset<T, StudentDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentDocuments
     * const studentDocument = await prisma.studentDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentDocumentUpdateManyArgs>(args: SelectSubset<T, StudentDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentDocuments and returns the data updated in the database.
     * @param {StudentDocumentUpdateManyAndReturnArgs} args - Arguments to update many StudentDocuments.
     * @example
     * // Update many StudentDocuments
     * const studentDocument = await prisma.studentDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentDocuments and only return the `id`
     * const studentDocumentWithIdOnly = await prisma.studentDocument.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentDocument.
     * @param {StudentDocumentUpsertArgs} args - Arguments to update or create a StudentDocument.
     * @example
     * // Update or create a StudentDocument
     * const studentDocument = await prisma.studentDocument.upsert({
     *   create: {
     *     // ... data to create a StudentDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentDocument we want to update
     *   }
     * })
     */
    upsert<T extends StudentDocumentUpsertArgs>(args: SelectSubset<T, StudentDocumentUpsertArgs<ExtArgs>>): Prisma__StudentDocumentClient<$Result.GetResult<Prisma.$StudentDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentDocumentCountArgs} args - Arguments to filter StudentDocuments to count.
     * @example
     * // Count the number of StudentDocuments
     * const count = await prisma.studentDocument.count({
     *   where: {
     *     // ... the filter for the StudentDocuments we want to count
     *   }
     * })
    **/
    count<T extends StudentDocumentCountArgs>(
      args?: Subset<T, StudentDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentDocumentAggregateArgs>(args: Subset<T, StudentDocumentAggregateArgs>): Prisma.PrismaPromise<GetStudentDocumentAggregateType<T>>

    /**
     * Group by StudentDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentDocumentGroupByArgs} args - Group by arguments.
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
      T extends StudentDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentDocumentGroupByArgs['orderBy'] }
        : { orderBy?: StudentDocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentDocument model
   */
  readonly fields: StudentDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    studentProfile<T extends StudentProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfileDefaultArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentDocument model
   */
  interface StudentDocumentFieldRefs {
    readonly id: FieldRef<"StudentDocument", 'String'>
    readonly studentProfileId: FieldRef<"StudentDocument", 'String'>
    readonly documentName: FieldRef<"StudentDocument", 'String'>
    readonly category: FieldRef<"StudentDocument", 'DocumentCategory'>
    readonly description: FieldRef<"StudentDocument", 'String'>
    readonly fileType: FieldRef<"StudentDocument", 'String'>
    readonly fileSize: FieldRef<"StudentDocument", 'Int'>
    readonly cloudinaryPublicId: FieldRef<"StudentDocument", 'String'>
    readonly fileUrl: FieldRef<"StudentDocument", 'String'>
    readonly uploadedAt: FieldRef<"StudentDocument", 'DateTime'>
    readonly updatedAt: FieldRef<"StudentDocument", 'DateTime'>
    readonly resourceType: FieldRef<"StudentDocument", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StudentDocument findUnique
   */
  export type StudentDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
    /**
     * Filter, which StudentDocument to fetch.
     */
    where: StudentDocumentWhereUniqueInput
  }

  /**
   * StudentDocument findUniqueOrThrow
   */
  export type StudentDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
    /**
     * Filter, which StudentDocument to fetch.
     */
    where: StudentDocumentWhereUniqueInput
  }

  /**
   * StudentDocument findFirst
   */
  export type StudentDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
    /**
     * Filter, which StudentDocument to fetch.
     */
    where?: StudentDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentDocuments to fetch.
     */
    orderBy?: StudentDocumentOrderByWithRelationInput | StudentDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentDocuments.
     */
    cursor?: StudentDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentDocuments.
     */
    distinct?: StudentDocumentScalarFieldEnum | StudentDocumentScalarFieldEnum[]
  }

  /**
   * StudentDocument findFirstOrThrow
   */
  export type StudentDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
    /**
     * Filter, which StudentDocument to fetch.
     */
    where?: StudentDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentDocuments to fetch.
     */
    orderBy?: StudentDocumentOrderByWithRelationInput | StudentDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentDocuments.
     */
    cursor?: StudentDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentDocuments.
     */
    distinct?: StudentDocumentScalarFieldEnum | StudentDocumentScalarFieldEnum[]
  }

  /**
   * StudentDocument findMany
   */
  export type StudentDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
    /**
     * Filter, which StudentDocuments to fetch.
     */
    where?: StudentDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentDocuments to fetch.
     */
    orderBy?: StudentDocumentOrderByWithRelationInput | StudentDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentDocuments.
     */
    cursor?: StudentDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentDocuments.
     */
    skip?: number
    distinct?: StudentDocumentScalarFieldEnum | StudentDocumentScalarFieldEnum[]
  }

  /**
   * StudentDocument create
   */
  export type StudentDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentDocument.
     */
    data: XOR<StudentDocumentCreateInput, StudentDocumentUncheckedCreateInput>
  }

  /**
   * StudentDocument createMany
   */
  export type StudentDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentDocuments.
     */
    data: StudentDocumentCreateManyInput | StudentDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentDocument createManyAndReturn
   */
  export type StudentDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many StudentDocuments.
     */
    data: StudentDocumentCreateManyInput | StudentDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentDocument update
   */
  export type StudentDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentDocument.
     */
    data: XOR<StudentDocumentUpdateInput, StudentDocumentUncheckedUpdateInput>
    /**
     * Choose, which StudentDocument to update.
     */
    where: StudentDocumentWhereUniqueInput
  }

  /**
   * StudentDocument updateMany
   */
  export type StudentDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentDocuments.
     */
    data: XOR<StudentDocumentUpdateManyMutationInput, StudentDocumentUncheckedUpdateManyInput>
    /**
     * Filter which StudentDocuments to update
     */
    where?: StudentDocumentWhereInput
    /**
     * Limit how many StudentDocuments to update.
     */
    limit?: number
  }

  /**
   * StudentDocument updateManyAndReturn
   */
  export type StudentDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * The data used to update StudentDocuments.
     */
    data: XOR<StudentDocumentUpdateManyMutationInput, StudentDocumentUncheckedUpdateManyInput>
    /**
     * Filter which StudentDocuments to update
     */
    where?: StudentDocumentWhereInput
    /**
     * Limit how many StudentDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentDocument upsert
   */
  export type StudentDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentDocument to update in case it exists.
     */
    where: StudentDocumentWhereUniqueInput
    /**
     * In case the StudentDocument found by the `where` argument doesn't exist, create a new StudentDocument with this data.
     */
    create: XOR<StudentDocumentCreateInput, StudentDocumentUncheckedCreateInput>
    /**
     * In case the StudentDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentDocumentUpdateInput, StudentDocumentUncheckedUpdateInput>
  }

  /**
   * StudentDocument delete
   */
  export type StudentDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
    /**
     * Filter which StudentDocument to delete.
     */
    where: StudentDocumentWhereUniqueInput
  }

  /**
   * StudentDocument deleteMany
   */
  export type StudentDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentDocuments to delete
     */
    where?: StudentDocumentWhereInput
    /**
     * Limit how many StudentDocuments to delete.
     */
    limit?: number
  }

  /**
   * StudentDocument without action
   */
  export type StudentDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentDocument
     */
    select?: StudentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentDocument
     */
    omit?: StudentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentDocumentInclude<ExtArgs> | null
  }


  /**
   * Model AcademicSemester
   */

  export type AggregateAcademicSemester = {
    _count: AcademicSemesterCountAggregateOutputType | null
    _avg: AcademicSemesterAvgAggregateOutputType | null
    _sum: AcademicSemesterSumAggregateOutputType | null
    _min: AcademicSemesterMinAggregateOutputType | null
    _max: AcademicSemesterMaxAggregateOutputType | null
  }

  export type AcademicSemesterAvgAggregateOutputType = {
    semesterNumber: number | null
    sgpa: number | null
    totalCredits: number | null
    creditsEarned: number | null
    backlogs: number | null
  }

  export type AcademicSemesterSumAggregateOutputType = {
    semesterNumber: number | null
    sgpa: number | null
    totalCredits: number | null
    creditsEarned: number | null
    backlogs: number | null
  }

  export type AcademicSemesterMinAggregateOutputType = {
    id: string | null
    studentProfileId: string | null
    semesterNumber: number | null
    academicYear: string | null
    term: string | null
    status: $Enums.AcademicSemesterStatus | null
    entryStatus: $Enums.AcademicEntryStatus | null
    sgpa: number | null
    totalCredits: number | null
    creditsEarned: number | null
    backlogs: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcademicSemesterMaxAggregateOutputType = {
    id: string | null
    studentProfileId: string | null
    semesterNumber: number | null
    academicYear: string | null
    term: string | null
    status: $Enums.AcademicSemesterStatus | null
    entryStatus: $Enums.AcademicEntryStatus | null
    sgpa: number | null
    totalCredits: number | null
    creditsEarned: number | null
    backlogs: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcademicSemesterCountAggregateOutputType = {
    id: number
    studentProfileId: number
    semesterNumber: number
    academicYear: number
    term: number
    status: number
    entryStatus: number
    sgpa: number
    totalCredits: number
    creditsEarned: number
    backlogs: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AcademicSemesterAvgAggregateInputType = {
    semesterNumber?: true
    sgpa?: true
    totalCredits?: true
    creditsEarned?: true
    backlogs?: true
  }

  export type AcademicSemesterSumAggregateInputType = {
    semesterNumber?: true
    sgpa?: true
    totalCredits?: true
    creditsEarned?: true
    backlogs?: true
  }

  export type AcademicSemesterMinAggregateInputType = {
    id?: true
    studentProfileId?: true
    semesterNumber?: true
    academicYear?: true
    term?: true
    status?: true
    entryStatus?: true
    sgpa?: true
    totalCredits?: true
    creditsEarned?: true
    backlogs?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcademicSemesterMaxAggregateInputType = {
    id?: true
    studentProfileId?: true
    semesterNumber?: true
    academicYear?: true
    term?: true
    status?: true
    entryStatus?: true
    sgpa?: true
    totalCredits?: true
    creditsEarned?: true
    backlogs?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcademicSemesterCountAggregateInputType = {
    id?: true
    studentProfileId?: true
    semesterNumber?: true
    academicYear?: true
    term?: true
    status?: true
    entryStatus?: true
    sgpa?: true
    totalCredits?: true
    creditsEarned?: true
    backlogs?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AcademicSemesterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicSemester to aggregate.
     */
    where?: AcademicSemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicSemesters to fetch.
     */
    orderBy?: AcademicSemesterOrderByWithRelationInput | AcademicSemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicSemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicSemesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicSemesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicSemesters
    **/
    _count?: true | AcademicSemesterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcademicSemesterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcademicSemesterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicSemesterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicSemesterMaxAggregateInputType
  }

  export type GetAcademicSemesterAggregateType<T extends AcademicSemesterAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicSemester]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicSemester[P]>
      : GetScalarType<T[P], AggregateAcademicSemester[P]>
  }




  export type AcademicSemesterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicSemesterWhereInput
    orderBy?: AcademicSemesterOrderByWithAggregationInput | AcademicSemesterOrderByWithAggregationInput[]
    by: AcademicSemesterScalarFieldEnum[] | AcademicSemesterScalarFieldEnum
    having?: AcademicSemesterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicSemesterCountAggregateInputType | true
    _avg?: AcademicSemesterAvgAggregateInputType
    _sum?: AcademicSemesterSumAggregateInputType
    _min?: AcademicSemesterMinAggregateInputType
    _max?: AcademicSemesterMaxAggregateInputType
  }

  export type AcademicSemesterGroupByOutputType = {
    id: string
    studentProfileId: string
    semesterNumber: number
    academicYear: string | null
    term: string | null
    status: $Enums.AcademicSemesterStatus
    entryStatus: $Enums.AcademicEntryStatus
    sgpa: number | null
    totalCredits: number
    creditsEarned: number
    backlogs: number
    createdAt: Date
    updatedAt: Date
    _count: AcademicSemesterCountAggregateOutputType | null
    _avg: AcademicSemesterAvgAggregateOutputType | null
    _sum: AcademicSemesterSumAggregateOutputType | null
    _min: AcademicSemesterMinAggregateOutputType | null
    _max: AcademicSemesterMaxAggregateOutputType | null
  }

  type GetAcademicSemesterGroupByPayload<T extends AcademicSemesterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicSemesterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicSemesterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicSemesterGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicSemesterGroupByOutputType[P]>
        }
      >
    >


  export type AcademicSemesterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    semesterNumber?: boolean
    academicYear?: boolean
    term?: boolean
    status?: boolean
    entryStatus?: boolean
    sgpa?: boolean
    totalCredits?: boolean
    creditsEarned?: boolean
    backlogs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
    subjects?: boolean | AcademicSemester$subjectsArgs<ExtArgs>
    _count?: boolean | AcademicSemesterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicSemester"]>

  export type AcademicSemesterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    semesterNumber?: boolean
    academicYear?: boolean
    term?: boolean
    status?: boolean
    entryStatus?: boolean
    sgpa?: boolean
    totalCredits?: boolean
    creditsEarned?: boolean
    backlogs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicSemester"]>

  export type AcademicSemesterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    semesterNumber?: boolean
    academicYear?: boolean
    term?: boolean
    status?: boolean
    entryStatus?: boolean
    sgpa?: boolean
    totalCredits?: boolean
    creditsEarned?: boolean
    backlogs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicSemester"]>

  export type AcademicSemesterSelectScalar = {
    id?: boolean
    studentProfileId?: boolean
    semesterNumber?: boolean
    academicYear?: boolean
    term?: boolean
    status?: boolean
    entryStatus?: boolean
    sgpa?: boolean
    totalCredits?: boolean
    creditsEarned?: boolean
    backlogs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AcademicSemesterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProfileId" | "semesterNumber" | "academicYear" | "term" | "status" | "entryStatus" | "sgpa" | "totalCredits" | "creditsEarned" | "backlogs" | "createdAt" | "updatedAt", ExtArgs["result"]["academicSemester"]>
  export type AcademicSemesterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
    subjects?: boolean | AcademicSemester$subjectsArgs<ExtArgs>
    _count?: boolean | AcademicSemesterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AcademicSemesterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type AcademicSemesterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }

  export type $AcademicSemesterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicSemester"
    objects: {
      studentProfile: Prisma.$StudentProfilePayload<ExtArgs>
      subjects: Prisma.$AcademicSubjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentProfileId: string
      semesterNumber: number
      academicYear: string | null
      term: string | null
      status: $Enums.AcademicSemesterStatus
      entryStatus: $Enums.AcademicEntryStatus
      sgpa: number | null
      totalCredits: number
      creditsEarned: number
      backlogs: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["academicSemester"]>
    composites: {}
  }

  type AcademicSemesterGetPayload<S extends boolean | null | undefined | AcademicSemesterDefaultArgs> = $Result.GetResult<Prisma.$AcademicSemesterPayload, S>

  type AcademicSemesterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademicSemesterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademicSemesterCountAggregateInputType | true
    }

  export interface AcademicSemesterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicSemester'], meta: { name: 'AcademicSemester' } }
    /**
     * Find zero or one AcademicSemester that matches the filter.
     * @param {AcademicSemesterFindUniqueArgs} args - Arguments to find a AcademicSemester
     * @example
     * // Get one AcademicSemester
     * const academicSemester = await prisma.academicSemester.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicSemesterFindUniqueArgs>(args: SelectSubset<T, AcademicSemesterFindUniqueArgs<ExtArgs>>): Prisma__AcademicSemesterClient<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcademicSemester that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademicSemesterFindUniqueOrThrowArgs} args - Arguments to find a AcademicSemester
     * @example
     * // Get one AcademicSemester
     * const academicSemester = await prisma.academicSemester.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicSemesterFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicSemesterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicSemesterClient<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicSemester that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSemesterFindFirstArgs} args - Arguments to find a AcademicSemester
     * @example
     * // Get one AcademicSemester
     * const academicSemester = await prisma.academicSemester.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicSemesterFindFirstArgs>(args?: SelectSubset<T, AcademicSemesterFindFirstArgs<ExtArgs>>): Prisma__AcademicSemesterClient<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicSemester that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSemesterFindFirstOrThrowArgs} args - Arguments to find a AcademicSemester
     * @example
     * // Get one AcademicSemester
     * const academicSemester = await prisma.academicSemester.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicSemesterFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicSemesterFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicSemesterClient<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcademicSemesters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSemesterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicSemesters
     * const academicSemesters = await prisma.academicSemester.findMany()
     * 
     * // Get first 10 AcademicSemesters
     * const academicSemesters = await prisma.academicSemester.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academicSemesterWithIdOnly = await prisma.academicSemester.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcademicSemesterFindManyArgs>(args?: SelectSubset<T, AcademicSemesterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcademicSemester.
     * @param {AcademicSemesterCreateArgs} args - Arguments to create a AcademicSemester.
     * @example
     * // Create one AcademicSemester
     * const AcademicSemester = await prisma.academicSemester.create({
     *   data: {
     *     // ... data to create a AcademicSemester
     *   }
     * })
     * 
     */
    create<T extends AcademicSemesterCreateArgs>(args: SelectSubset<T, AcademicSemesterCreateArgs<ExtArgs>>): Prisma__AcademicSemesterClient<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcademicSemesters.
     * @param {AcademicSemesterCreateManyArgs} args - Arguments to create many AcademicSemesters.
     * @example
     * // Create many AcademicSemesters
     * const academicSemester = await prisma.academicSemester.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicSemesterCreateManyArgs>(args?: SelectSubset<T, AcademicSemesterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcademicSemesters and returns the data saved in the database.
     * @param {AcademicSemesterCreateManyAndReturnArgs} args - Arguments to create many AcademicSemesters.
     * @example
     * // Create many AcademicSemesters
     * const academicSemester = await prisma.academicSemester.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcademicSemesters and only return the `id`
     * const academicSemesterWithIdOnly = await prisma.academicSemester.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcademicSemesterCreateManyAndReturnArgs>(args?: SelectSubset<T, AcademicSemesterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AcademicSemester.
     * @param {AcademicSemesterDeleteArgs} args - Arguments to delete one AcademicSemester.
     * @example
     * // Delete one AcademicSemester
     * const AcademicSemester = await prisma.academicSemester.delete({
     *   where: {
     *     // ... filter to delete one AcademicSemester
     *   }
     * })
     * 
     */
    delete<T extends AcademicSemesterDeleteArgs>(args: SelectSubset<T, AcademicSemesterDeleteArgs<ExtArgs>>): Prisma__AcademicSemesterClient<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcademicSemester.
     * @param {AcademicSemesterUpdateArgs} args - Arguments to update one AcademicSemester.
     * @example
     * // Update one AcademicSemester
     * const academicSemester = await prisma.academicSemester.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicSemesterUpdateArgs>(args: SelectSubset<T, AcademicSemesterUpdateArgs<ExtArgs>>): Prisma__AcademicSemesterClient<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcademicSemesters.
     * @param {AcademicSemesterDeleteManyArgs} args - Arguments to filter AcademicSemesters to delete.
     * @example
     * // Delete a few AcademicSemesters
     * const { count } = await prisma.academicSemester.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicSemesterDeleteManyArgs>(args?: SelectSubset<T, AcademicSemesterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicSemesters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSemesterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicSemesters
     * const academicSemester = await prisma.academicSemester.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicSemesterUpdateManyArgs>(args: SelectSubset<T, AcademicSemesterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicSemesters and returns the data updated in the database.
     * @param {AcademicSemesterUpdateManyAndReturnArgs} args - Arguments to update many AcademicSemesters.
     * @example
     * // Update many AcademicSemesters
     * const academicSemester = await prisma.academicSemester.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AcademicSemesters and only return the `id`
     * const academicSemesterWithIdOnly = await prisma.academicSemester.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AcademicSemesterUpdateManyAndReturnArgs>(args: SelectSubset<T, AcademicSemesterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AcademicSemester.
     * @param {AcademicSemesterUpsertArgs} args - Arguments to update or create a AcademicSemester.
     * @example
     * // Update or create a AcademicSemester
     * const academicSemester = await prisma.academicSemester.upsert({
     *   create: {
     *     // ... data to create a AcademicSemester
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicSemester we want to update
     *   }
     * })
     */
    upsert<T extends AcademicSemesterUpsertArgs>(args: SelectSubset<T, AcademicSemesterUpsertArgs<ExtArgs>>): Prisma__AcademicSemesterClient<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcademicSemesters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSemesterCountArgs} args - Arguments to filter AcademicSemesters to count.
     * @example
     * // Count the number of AcademicSemesters
     * const count = await prisma.academicSemester.count({
     *   where: {
     *     // ... the filter for the AcademicSemesters we want to count
     *   }
     * })
    **/
    count<T extends AcademicSemesterCountArgs>(
      args?: Subset<T, AcademicSemesterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicSemesterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicSemester.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSemesterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AcademicSemesterAggregateArgs>(args: Subset<T, AcademicSemesterAggregateArgs>): Prisma.PrismaPromise<GetAcademicSemesterAggregateType<T>>

    /**
     * Group by AcademicSemester.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSemesterGroupByArgs} args - Group by arguments.
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
      T extends AcademicSemesterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicSemesterGroupByArgs['orderBy'] }
        : { orderBy?: AcademicSemesterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AcademicSemesterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicSemesterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicSemester model
   */
  readonly fields: AcademicSemesterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicSemester.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicSemesterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    studentProfile<T extends StudentProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfileDefaultArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subjects<T extends AcademicSemester$subjectsArgs<ExtArgs> = {}>(args?: Subset<T, AcademicSemester$subjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcademicSemester model
   */
  interface AcademicSemesterFieldRefs {
    readonly id: FieldRef<"AcademicSemester", 'String'>
    readonly studentProfileId: FieldRef<"AcademicSemester", 'String'>
    readonly semesterNumber: FieldRef<"AcademicSemester", 'Int'>
    readonly academicYear: FieldRef<"AcademicSemester", 'String'>
    readonly term: FieldRef<"AcademicSemester", 'String'>
    readonly status: FieldRef<"AcademicSemester", 'AcademicSemesterStatus'>
    readonly entryStatus: FieldRef<"AcademicSemester", 'AcademicEntryStatus'>
    readonly sgpa: FieldRef<"AcademicSemester", 'Float'>
    readonly totalCredits: FieldRef<"AcademicSemester", 'Int'>
    readonly creditsEarned: FieldRef<"AcademicSemester", 'Int'>
    readonly backlogs: FieldRef<"AcademicSemester", 'Int'>
    readonly createdAt: FieldRef<"AcademicSemester", 'DateTime'>
    readonly updatedAt: FieldRef<"AcademicSemester", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcademicSemester findUnique
   */
  export type AcademicSemesterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
    /**
     * Filter, which AcademicSemester to fetch.
     */
    where: AcademicSemesterWhereUniqueInput
  }

  /**
   * AcademicSemester findUniqueOrThrow
   */
  export type AcademicSemesterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
    /**
     * Filter, which AcademicSemester to fetch.
     */
    where: AcademicSemesterWhereUniqueInput
  }

  /**
   * AcademicSemester findFirst
   */
  export type AcademicSemesterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
    /**
     * Filter, which AcademicSemester to fetch.
     */
    where?: AcademicSemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicSemesters to fetch.
     */
    orderBy?: AcademicSemesterOrderByWithRelationInput | AcademicSemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicSemesters.
     */
    cursor?: AcademicSemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicSemesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicSemesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicSemesters.
     */
    distinct?: AcademicSemesterScalarFieldEnum | AcademicSemesterScalarFieldEnum[]
  }

  /**
   * AcademicSemester findFirstOrThrow
   */
  export type AcademicSemesterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
    /**
     * Filter, which AcademicSemester to fetch.
     */
    where?: AcademicSemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicSemesters to fetch.
     */
    orderBy?: AcademicSemesterOrderByWithRelationInput | AcademicSemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicSemesters.
     */
    cursor?: AcademicSemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicSemesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicSemesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicSemesters.
     */
    distinct?: AcademicSemesterScalarFieldEnum | AcademicSemesterScalarFieldEnum[]
  }

  /**
   * AcademicSemester findMany
   */
  export type AcademicSemesterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
    /**
     * Filter, which AcademicSemesters to fetch.
     */
    where?: AcademicSemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicSemesters to fetch.
     */
    orderBy?: AcademicSemesterOrderByWithRelationInput | AcademicSemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicSemesters.
     */
    cursor?: AcademicSemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicSemesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicSemesters.
     */
    skip?: number
    distinct?: AcademicSemesterScalarFieldEnum | AcademicSemesterScalarFieldEnum[]
  }

  /**
   * AcademicSemester create
   */
  export type AcademicSemesterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademicSemester.
     */
    data: XOR<AcademicSemesterCreateInput, AcademicSemesterUncheckedCreateInput>
  }

  /**
   * AcademicSemester createMany
   */
  export type AcademicSemesterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicSemesters.
     */
    data: AcademicSemesterCreateManyInput | AcademicSemesterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademicSemester createManyAndReturn
   */
  export type AcademicSemesterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * The data used to create many AcademicSemesters.
     */
    data: AcademicSemesterCreateManyInput | AcademicSemesterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicSemester update
   */
  export type AcademicSemesterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademicSemester.
     */
    data: XOR<AcademicSemesterUpdateInput, AcademicSemesterUncheckedUpdateInput>
    /**
     * Choose, which AcademicSemester to update.
     */
    where: AcademicSemesterWhereUniqueInput
  }

  /**
   * AcademicSemester updateMany
   */
  export type AcademicSemesterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicSemesters.
     */
    data: XOR<AcademicSemesterUpdateManyMutationInput, AcademicSemesterUncheckedUpdateManyInput>
    /**
     * Filter which AcademicSemesters to update
     */
    where?: AcademicSemesterWhereInput
    /**
     * Limit how many AcademicSemesters to update.
     */
    limit?: number
  }

  /**
   * AcademicSemester updateManyAndReturn
   */
  export type AcademicSemesterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * The data used to update AcademicSemesters.
     */
    data: XOR<AcademicSemesterUpdateManyMutationInput, AcademicSemesterUncheckedUpdateManyInput>
    /**
     * Filter which AcademicSemesters to update
     */
    where?: AcademicSemesterWhereInput
    /**
     * Limit how many AcademicSemesters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicSemester upsert
   */
  export type AcademicSemesterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademicSemester to update in case it exists.
     */
    where: AcademicSemesterWhereUniqueInput
    /**
     * In case the AcademicSemester found by the `where` argument doesn't exist, create a new AcademicSemester with this data.
     */
    create: XOR<AcademicSemesterCreateInput, AcademicSemesterUncheckedCreateInput>
    /**
     * In case the AcademicSemester was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicSemesterUpdateInput, AcademicSemesterUncheckedUpdateInput>
  }

  /**
   * AcademicSemester delete
   */
  export type AcademicSemesterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
    /**
     * Filter which AcademicSemester to delete.
     */
    where: AcademicSemesterWhereUniqueInput
  }

  /**
   * AcademicSemester deleteMany
   */
  export type AcademicSemesterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicSemesters to delete
     */
    where?: AcademicSemesterWhereInput
    /**
     * Limit how many AcademicSemesters to delete.
     */
    limit?: number
  }

  /**
   * AcademicSemester.subjects
   */
  export type AcademicSemester$subjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
    where?: AcademicSubjectWhereInput
    orderBy?: AcademicSubjectOrderByWithRelationInput | AcademicSubjectOrderByWithRelationInput[]
    cursor?: AcademicSubjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcademicSubjectScalarFieldEnum | AcademicSubjectScalarFieldEnum[]
  }

  /**
   * AcademicSemester without action
   */
  export type AcademicSemesterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSemester
     */
    select?: AcademicSemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSemester
     */
    omit?: AcademicSemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSemesterInclude<ExtArgs> | null
  }


  /**
   * Model AcademicSubject
   */

  export type AggregateAcademicSubject = {
    _count: AcademicSubjectCountAggregateOutputType | null
    _avg: AcademicSubjectAvgAggregateOutputType | null
    _sum: AcademicSubjectSumAggregateOutputType | null
    _min: AcademicSubjectMinAggregateOutputType | null
    _max: AcademicSubjectMaxAggregateOutputType | null
  }

  export type AcademicSubjectAvgAggregateOutputType = {
    credits: number | null
    cia1: number | null
    cia2: number | null
    cia3: number | null
    mse: number | null
    ese: number | null
    maximumMarks: number | null
    totalMarksObtained: number | null
    gradePoint: number | null
    attendance: number | null
    classesAttended: number | null
    classesHeld: number | null
  }

  export type AcademicSubjectSumAggregateOutputType = {
    credits: number | null
    cia1: number | null
    cia2: number | null
    cia3: number | null
    mse: number | null
    ese: number | null
    maximumMarks: number | null
    totalMarksObtained: number | null
    gradePoint: number | null
    attendance: number | null
    classesAttended: number | null
    classesHeld: number | null
  }

  export type AcademicSubjectMinAggregateOutputType = {
    id: string | null
    academicSemesterId: string | null
    courseCode: string | null
    courseName: string | null
    credits: number | null
    cia1: number | null
    cia2: number | null
    cia3: number | null
    mse: number | null
    ese: number | null
    maximumMarks: number | null
    totalMarksObtained: number | null
    grade: string | null
    gradePoint: number | null
    attendance: number | null
    createdAt: Date | null
    updatedAt: Date | null
    classesAttended: number | null
    classesHeld: number | null
  }

  export type AcademicSubjectMaxAggregateOutputType = {
    id: string | null
    academicSemesterId: string | null
    courseCode: string | null
    courseName: string | null
    credits: number | null
    cia1: number | null
    cia2: number | null
    cia3: number | null
    mse: number | null
    ese: number | null
    maximumMarks: number | null
    totalMarksObtained: number | null
    grade: string | null
    gradePoint: number | null
    attendance: number | null
    createdAt: Date | null
    updatedAt: Date | null
    classesAttended: number | null
    classesHeld: number | null
  }

  export type AcademicSubjectCountAggregateOutputType = {
    id: number
    academicSemesterId: number
    courseCode: number
    courseName: number
    credits: number
    cia1: number
    cia2: number
    cia3: number
    mse: number
    ese: number
    maximumMarks: number
    totalMarksObtained: number
    grade: number
    gradePoint: number
    attendance: number
    createdAt: number
    updatedAt: number
    classesAttended: number
    classesHeld: number
    _all: number
  }


  export type AcademicSubjectAvgAggregateInputType = {
    credits?: true
    cia1?: true
    cia2?: true
    cia3?: true
    mse?: true
    ese?: true
    maximumMarks?: true
    totalMarksObtained?: true
    gradePoint?: true
    attendance?: true
    classesAttended?: true
    classesHeld?: true
  }

  export type AcademicSubjectSumAggregateInputType = {
    credits?: true
    cia1?: true
    cia2?: true
    cia3?: true
    mse?: true
    ese?: true
    maximumMarks?: true
    totalMarksObtained?: true
    gradePoint?: true
    attendance?: true
    classesAttended?: true
    classesHeld?: true
  }

  export type AcademicSubjectMinAggregateInputType = {
    id?: true
    academicSemesterId?: true
    courseCode?: true
    courseName?: true
    credits?: true
    cia1?: true
    cia2?: true
    cia3?: true
    mse?: true
    ese?: true
    maximumMarks?: true
    totalMarksObtained?: true
    grade?: true
    gradePoint?: true
    attendance?: true
    createdAt?: true
    updatedAt?: true
    classesAttended?: true
    classesHeld?: true
  }

  export type AcademicSubjectMaxAggregateInputType = {
    id?: true
    academicSemesterId?: true
    courseCode?: true
    courseName?: true
    credits?: true
    cia1?: true
    cia2?: true
    cia3?: true
    mse?: true
    ese?: true
    maximumMarks?: true
    totalMarksObtained?: true
    grade?: true
    gradePoint?: true
    attendance?: true
    createdAt?: true
    updatedAt?: true
    classesAttended?: true
    classesHeld?: true
  }

  export type AcademicSubjectCountAggregateInputType = {
    id?: true
    academicSemesterId?: true
    courseCode?: true
    courseName?: true
    credits?: true
    cia1?: true
    cia2?: true
    cia3?: true
    mse?: true
    ese?: true
    maximumMarks?: true
    totalMarksObtained?: true
    grade?: true
    gradePoint?: true
    attendance?: true
    createdAt?: true
    updatedAt?: true
    classesAttended?: true
    classesHeld?: true
    _all?: true
  }

  export type AcademicSubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicSubject to aggregate.
     */
    where?: AcademicSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicSubjects to fetch.
     */
    orderBy?: AcademicSubjectOrderByWithRelationInput | AcademicSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicSubjects
    **/
    _count?: true | AcademicSubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcademicSubjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcademicSubjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicSubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicSubjectMaxAggregateInputType
  }

  export type GetAcademicSubjectAggregateType<T extends AcademicSubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicSubject[P]>
      : GetScalarType<T[P], AggregateAcademicSubject[P]>
  }




  export type AcademicSubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicSubjectWhereInput
    orderBy?: AcademicSubjectOrderByWithAggregationInput | AcademicSubjectOrderByWithAggregationInput[]
    by: AcademicSubjectScalarFieldEnum[] | AcademicSubjectScalarFieldEnum
    having?: AcademicSubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicSubjectCountAggregateInputType | true
    _avg?: AcademicSubjectAvgAggregateInputType
    _sum?: AcademicSubjectSumAggregateInputType
    _min?: AcademicSubjectMinAggregateInputType
    _max?: AcademicSubjectMaxAggregateInputType
  }

  export type AcademicSubjectGroupByOutputType = {
    id: string
    academicSemesterId: string
    courseCode: string
    courseName: string
    credits: number
    cia1: number | null
    cia2: number | null
    cia3: number | null
    mse: number | null
    ese: number | null
    maximumMarks: number | null
    totalMarksObtained: number | null
    grade: string | null
    gradePoint: number | null
    attendance: number | null
    createdAt: Date
    updatedAt: Date
    classesAttended: number
    classesHeld: number
    _count: AcademicSubjectCountAggregateOutputType | null
    _avg: AcademicSubjectAvgAggregateOutputType | null
    _sum: AcademicSubjectSumAggregateOutputType | null
    _min: AcademicSubjectMinAggregateOutputType | null
    _max: AcademicSubjectMaxAggregateOutputType | null
  }

  type GetAcademicSubjectGroupByPayload<T extends AcademicSubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicSubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicSubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicSubjectGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicSubjectGroupByOutputType[P]>
        }
      >
    >


  export type AcademicSubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    academicSemesterId?: boolean
    courseCode?: boolean
    courseName?: boolean
    credits?: boolean
    cia1?: boolean
    cia2?: boolean
    cia3?: boolean
    mse?: boolean
    ese?: boolean
    maximumMarks?: boolean
    totalMarksObtained?: boolean
    grade?: boolean
    gradePoint?: boolean
    attendance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classesAttended?: boolean
    classesHeld?: boolean
    academicSemester?: boolean | AcademicSemesterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicSubject"]>

  export type AcademicSubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    academicSemesterId?: boolean
    courseCode?: boolean
    courseName?: boolean
    credits?: boolean
    cia1?: boolean
    cia2?: boolean
    cia3?: boolean
    mse?: boolean
    ese?: boolean
    maximumMarks?: boolean
    totalMarksObtained?: boolean
    grade?: boolean
    gradePoint?: boolean
    attendance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classesAttended?: boolean
    classesHeld?: boolean
    academicSemester?: boolean | AcademicSemesterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicSubject"]>

  export type AcademicSubjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    academicSemesterId?: boolean
    courseCode?: boolean
    courseName?: boolean
    credits?: boolean
    cia1?: boolean
    cia2?: boolean
    cia3?: boolean
    mse?: boolean
    ese?: boolean
    maximumMarks?: boolean
    totalMarksObtained?: boolean
    grade?: boolean
    gradePoint?: boolean
    attendance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classesAttended?: boolean
    classesHeld?: boolean
    academicSemester?: boolean | AcademicSemesterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicSubject"]>

  export type AcademicSubjectSelectScalar = {
    id?: boolean
    academicSemesterId?: boolean
    courseCode?: boolean
    courseName?: boolean
    credits?: boolean
    cia1?: boolean
    cia2?: boolean
    cia3?: boolean
    mse?: boolean
    ese?: boolean
    maximumMarks?: boolean
    totalMarksObtained?: boolean
    grade?: boolean
    gradePoint?: boolean
    attendance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classesAttended?: boolean
    classesHeld?: boolean
  }

  export type AcademicSubjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "academicSemesterId" | "courseCode" | "courseName" | "credits" | "cia1" | "cia2" | "cia3" | "mse" | "ese" | "maximumMarks" | "totalMarksObtained" | "grade" | "gradePoint" | "attendance" | "createdAt" | "updatedAt" | "classesAttended" | "classesHeld", ExtArgs["result"]["academicSubject"]>
  export type AcademicSubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academicSemester?: boolean | AcademicSemesterDefaultArgs<ExtArgs>
  }
  export type AcademicSubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academicSemester?: boolean | AcademicSemesterDefaultArgs<ExtArgs>
  }
  export type AcademicSubjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academicSemester?: boolean | AcademicSemesterDefaultArgs<ExtArgs>
  }

  export type $AcademicSubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicSubject"
    objects: {
      academicSemester: Prisma.$AcademicSemesterPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      academicSemesterId: string
      courseCode: string
      courseName: string
      credits: number
      cia1: number | null
      cia2: number | null
      cia3: number | null
      mse: number | null
      ese: number | null
      maximumMarks: number | null
      totalMarksObtained: number | null
      grade: string | null
      gradePoint: number | null
      attendance: number | null
      createdAt: Date
      updatedAt: Date
      classesAttended: number
      classesHeld: number
    }, ExtArgs["result"]["academicSubject"]>
    composites: {}
  }

  type AcademicSubjectGetPayload<S extends boolean | null | undefined | AcademicSubjectDefaultArgs> = $Result.GetResult<Prisma.$AcademicSubjectPayload, S>

  type AcademicSubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademicSubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademicSubjectCountAggregateInputType | true
    }

  export interface AcademicSubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicSubject'], meta: { name: 'AcademicSubject' } }
    /**
     * Find zero or one AcademicSubject that matches the filter.
     * @param {AcademicSubjectFindUniqueArgs} args - Arguments to find a AcademicSubject
     * @example
     * // Get one AcademicSubject
     * const academicSubject = await prisma.academicSubject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicSubjectFindUniqueArgs>(args: SelectSubset<T, AcademicSubjectFindUniqueArgs<ExtArgs>>): Prisma__AcademicSubjectClient<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcademicSubject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademicSubjectFindUniqueOrThrowArgs} args - Arguments to find a AcademicSubject
     * @example
     * // Get one AcademicSubject
     * const academicSubject = await prisma.academicSubject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicSubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicSubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicSubjectClient<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicSubject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSubjectFindFirstArgs} args - Arguments to find a AcademicSubject
     * @example
     * // Get one AcademicSubject
     * const academicSubject = await prisma.academicSubject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicSubjectFindFirstArgs>(args?: SelectSubset<T, AcademicSubjectFindFirstArgs<ExtArgs>>): Prisma__AcademicSubjectClient<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicSubject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSubjectFindFirstOrThrowArgs} args - Arguments to find a AcademicSubject
     * @example
     * // Get one AcademicSubject
     * const academicSubject = await prisma.academicSubject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicSubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicSubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicSubjectClient<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcademicSubjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicSubjects
     * const academicSubjects = await prisma.academicSubject.findMany()
     * 
     * // Get first 10 AcademicSubjects
     * const academicSubjects = await prisma.academicSubject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academicSubjectWithIdOnly = await prisma.academicSubject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcademicSubjectFindManyArgs>(args?: SelectSubset<T, AcademicSubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcademicSubject.
     * @param {AcademicSubjectCreateArgs} args - Arguments to create a AcademicSubject.
     * @example
     * // Create one AcademicSubject
     * const AcademicSubject = await prisma.academicSubject.create({
     *   data: {
     *     // ... data to create a AcademicSubject
     *   }
     * })
     * 
     */
    create<T extends AcademicSubjectCreateArgs>(args: SelectSubset<T, AcademicSubjectCreateArgs<ExtArgs>>): Prisma__AcademicSubjectClient<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcademicSubjects.
     * @param {AcademicSubjectCreateManyArgs} args - Arguments to create many AcademicSubjects.
     * @example
     * // Create many AcademicSubjects
     * const academicSubject = await prisma.academicSubject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicSubjectCreateManyArgs>(args?: SelectSubset<T, AcademicSubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcademicSubjects and returns the data saved in the database.
     * @param {AcademicSubjectCreateManyAndReturnArgs} args - Arguments to create many AcademicSubjects.
     * @example
     * // Create many AcademicSubjects
     * const academicSubject = await prisma.academicSubject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcademicSubjects and only return the `id`
     * const academicSubjectWithIdOnly = await prisma.academicSubject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcademicSubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, AcademicSubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AcademicSubject.
     * @param {AcademicSubjectDeleteArgs} args - Arguments to delete one AcademicSubject.
     * @example
     * // Delete one AcademicSubject
     * const AcademicSubject = await prisma.academicSubject.delete({
     *   where: {
     *     // ... filter to delete one AcademicSubject
     *   }
     * })
     * 
     */
    delete<T extends AcademicSubjectDeleteArgs>(args: SelectSubset<T, AcademicSubjectDeleteArgs<ExtArgs>>): Prisma__AcademicSubjectClient<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcademicSubject.
     * @param {AcademicSubjectUpdateArgs} args - Arguments to update one AcademicSubject.
     * @example
     * // Update one AcademicSubject
     * const academicSubject = await prisma.academicSubject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicSubjectUpdateArgs>(args: SelectSubset<T, AcademicSubjectUpdateArgs<ExtArgs>>): Prisma__AcademicSubjectClient<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcademicSubjects.
     * @param {AcademicSubjectDeleteManyArgs} args - Arguments to filter AcademicSubjects to delete.
     * @example
     * // Delete a few AcademicSubjects
     * const { count } = await prisma.academicSubject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicSubjectDeleteManyArgs>(args?: SelectSubset<T, AcademicSubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicSubjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicSubjects
     * const academicSubject = await prisma.academicSubject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicSubjectUpdateManyArgs>(args: SelectSubset<T, AcademicSubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicSubjects and returns the data updated in the database.
     * @param {AcademicSubjectUpdateManyAndReturnArgs} args - Arguments to update many AcademicSubjects.
     * @example
     * // Update many AcademicSubjects
     * const academicSubject = await prisma.academicSubject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AcademicSubjects and only return the `id`
     * const academicSubjectWithIdOnly = await prisma.academicSubject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AcademicSubjectUpdateManyAndReturnArgs>(args: SelectSubset<T, AcademicSubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AcademicSubject.
     * @param {AcademicSubjectUpsertArgs} args - Arguments to update or create a AcademicSubject.
     * @example
     * // Update or create a AcademicSubject
     * const academicSubject = await prisma.academicSubject.upsert({
     *   create: {
     *     // ... data to create a AcademicSubject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicSubject we want to update
     *   }
     * })
     */
    upsert<T extends AcademicSubjectUpsertArgs>(args: SelectSubset<T, AcademicSubjectUpsertArgs<ExtArgs>>): Prisma__AcademicSubjectClient<$Result.GetResult<Prisma.$AcademicSubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcademicSubjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSubjectCountArgs} args - Arguments to filter AcademicSubjects to count.
     * @example
     * // Count the number of AcademicSubjects
     * const count = await prisma.academicSubject.count({
     *   where: {
     *     // ... the filter for the AcademicSubjects we want to count
     *   }
     * })
    **/
    count<T extends AcademicSubjectCountArgs>(
      args?: Subset<T, AcademicSubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicSubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicSubject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AcademicSubjectAggregateArgs>(args: Subset<T, AcademicSubjectAggregateArgs>): Prisma.PrismaPromise<GetAcademicSubjectAggregateType<T>>

    /**
     * Group by AcademicSubject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicSubjectGroupByArgs} args - Group by arguments.
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
      T extends AcademicSubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicSubjectGroupByArgs['orderBy'] }
        : { orderBy?: AcademicSubjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AcademicSubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicSubject model
   */
  readonly fields: AcademicSubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicSubject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicSubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    academicSemester<T extends AcademicSemesterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcademicSemesterDefaultArgs<ExtArgs>>): Prisma__AcademicSemesterClient<$Result.GetResult<Prisma.$AcademicSemesterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcademicSubject model
   */
  interface AcademicSubjectFieldRefs {
    readonly id: FieldRef<"AcademicSubject", 'String'>
    readonly academicSemesterId: FieldRef<"AcademicSubject", 'String'>
    readonly courseCode: FieldRef<"AcademicSubject", 'String'>
    readonly courseName: FieldRef<"AcademicSubject", 'String'>
    readonly credits: FieldRef<"AcademicSubject", 'Int'>
    readonly cia1: FieldRef<"AcademicSubject", 'Float'>
    readonly cia2: FieldRef<"AcademicSubject", 'Float'>
    readonly cia3: FieldRef<"AcademicSubject", 'Float'>
    readonly mse: FieldRef<"AcademicSubject", 'Float'>
    readonly ese: FieldRef<"AcademicSubject", 'Float'>
    readonly maximumMarks: FieldRef<"AcademicSubject", 'Float'>
    readonly totalMarksObtained: FieldRef<"AcademicSubject", 'Float'>
    readonly grade: FieldRef<"AcademicSubject", 'String'>
    readonly gradePoint: FieldRef<"AcademicSubject", 'Float'>
    readonly attendance: FieldRef<"AcademicSubject", 'Float'>
    readonly createdAt: FieldRef<"AcademicSubject", 'DateTime'>
    readonly updatedAt: FieldRef<"AcademicSubject", 'DateTime'>
    readonly classesAttended: FieldRef<"AcademicSubject", 'Int'>
    readonly classesHeld: FieldRef<"AcademicSubject", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AcademicSubject findUnique
   */
  export type AcademicSubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
    /**
     * Filter, which AcademicSubject to fetch.
     */
    where: AcademicSubjectWhereUniqueInput
  }

  /**
   * AcademicSubject findUniqueOrThrow
   */
  export type AcademicSubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
    /**
     * Filter, which AcademicSubject to fetch.
     */
    where: AcademicSubjectWhereUniqueInput
  }

  /**
   * AcademicSubject findFirst
   */
  export type AcademicSubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
    /**
     * Filter, which AcademicSubject to fetch.
     */
    where?: AcademicSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicSubjects to fetch.
     */
    orderBy?: AcademicSubjectOrderByWithRelationInput | AcademicSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicSubjects.
     */
    cursor?: AcademicSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicSubjects.
     */
    distinct?: AcademicSubjectScalarFieldEnum | AcademicSubjectScalarFieldEnum[]
  }

  /**
   * AcademicSubject findFirstOrThrow
   */
  export type AcademicSubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
    /**
     * Filter, which AcademicSubject to fetch.
     */
    where?: AcademicSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicSubjects to fetch.
     */
    orderBy?: AcademicSubjectOrderByWithRelationInput | AcademicSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicSubjects.
     */
    cursor?: AcademicSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicSubjects.
     */
    distinct?: AcademicSubjectScalarFieldEnum | AcademicSubjectScalarFieldEnum[]
  }

  /**
   * AcademicSubject findMany
   */
  export type AcademicSubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
    /**
     * Filter, which AcademicSubjects to fetch.
     */
    where?: AcademicSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicSubjects to fetch.
     */
    orderBy?: AcademicSubjectOrderByWithRelationInput | AcademicSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicSubjects.
     */
    cursor?: AcademicSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicSubjects.
     */
    skip?: number
    distinct?: AcademicSubjectScalarFieldEnum | AcademicSubjectScalarFieldEnum[]
  }

  /**
   * AcademicSubject create
   */
  export type AcademicSubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademicSubject.
     */
    data: XOR<AcademicSubjectCreateInput, AcademicSubjectUncheckedCreateInput>
  }

  /**
   * AcademicSubject createMany
   */
  export type AcademicSubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicSubjects.
     */
    data: AcademicSubjectCreateManyInput | AcademicSubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademicSubject createManyAndReturn
   */
  export type AcademicSubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * The data used to create many AcademicSubjects.
     */
    data: AcademicSubjectCreateManyInput | AcademicSubjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicSubject update
   */
  export type AcademicSubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademicSubject.
     */
    data: XOR<AcademicSubjectUpdateInput, AcademicSubjectUncheckedUpdateInput>
    /**
     * Choose, which AcademicSubject to update.
     */
    where: AcademicSubjectWhereUniqueInput
  }

  /**
   * AcademicSubject updateMany
   */
  export type AcademicSubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicSubjects.
     */
    data: XOR<AcademicSubjectUpdateManyMutationInput, AcademicSubjectUncheckedUpdateManyInput>
    /**
     * Filter which AcademicSubjects to update
     */
    where?: AcademicSubjectWhereInput
    /**
     * Limit how many AcademicSubjects to update.
     */
    limit?: number
  }

  /**
   * AcademicSubject updateManyAndReturn
   */
  export type AcademicSubjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * The data used to update AcademicSubjects.
     */
    data: XOR<AcademicSubjectUpdateManyMutationInput, AcademicSubjectUncheckedUpdateManyInput>
    /**
     * Filter which AcademicSubjects to update
     */
    where?: AcademicSubjectWhereInput
    /**
     * Limit how many AcademicSubjects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicSubject upsert
   */
  export type AcademicSubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademicSubject to update in case it exists.
     */
    where: AcademicSubjectWhereUniqueInput
    /**
     * In case the AcademicSubject found by the `where` argument doesn't exist, create a new AcademicSubject with this data.
     */
    create: XOR<AcademicSubjectCreateInput, AcademicSubjectUncheckedCreateInput>
    /**
     * In case the AcademicSubject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicSubjectUpdateInput, AcademicSubjectUncheckedUpdateInput>
  }

  /**
   * AcademicSubject delete
   */
  export type AcademicSubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
    /**
     * Filter which AcademicSubject to delete.
     */
    where: AcademicSubjectWhereUniqueInput
  }

  /**
   * AcademicSubject deleteMany
   */
  export type AcademicSubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicSubjects to delete
     */
    where?: AcademicSubjectWhereInput
    /**
     * Limit how many AcademicSubjects to delete.
     */
    limit?: number
  }

  /**
   * AcademicSubject without action
   */
  export type AcademicSubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicSubject
     */
    select?: AcademicSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicSubject
     */
    omit?: AcademicSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicSubjectInclude<ExtArgs> | null
  }


  /**
   * Model AcademicBacklog
   */

  export type AggregateAcademicBacklog = {
    _count: AcademicBacklogCountAggregateOutputType | null
    _avg: AcademicBacklogAvgAggregateOutputType | null
    _sum: AcademicBacklogSumAggregateOutputType | null
    _min: AcademicBacklogMinAggregateOutputType | null
    _max: AcademicBacklogMaxAggregateOutputType | null
  }

  export type AcademicBacklogAvgAggregateOutputType = {
    semesterNumber: number | null
    clearedSemesterNumber: number | null
    clearedMarks: number | null
  }

  export type AcademicBacklogSumAggregateOutputType = {
    semesterNumber: number | null
    clearedSemesterNumber: number | null
    clearedMarks: number | null
  }

  export type AcademicBacklogMinAggregateOutputType = {
    id: string | null
    studentProfileId: string | null
    subjectCode: string | null
    subjectName: string | null
    semesterNumber: number | null
    status: $Enums.AcademicBacklogStatus | null
    clearedSemesterNumber: number | null
    clearedGrade: string | null
    clearedMarks: number | null
    clearedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcademicBacklogMaxAggregateOutputType = {
    id: string | null
    studentProfileId: string | null
    subjectCode: string | null
    subjectName: string | null
    semesterNumber: number | null
    status: $Enums.AcademicBacklogStatus | null
    clearedSemesterNumber: number | null
    clearedGrade: string | null
    clearedMarks: number | null
    clearedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcademicBacklogCountAggregateOutputType = {
    id: number
    studentProfileId: number
    subjectCode: number
    subjectName: number
    semesterNumber: number
    status: number
    clearedSemesterNumber: number
    clearedGrade: number
    clearedMarks: number
    clearedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AcademicBacklogAvgAggregateInputType = {
    semesterNumber?: true
    clearedSemesterNumber?: true
    clearedMarks?: true
  }

  export type AcademicBacklogSumAggregateInputType = {
    semesterNumber?: true
    clearedSemesterNumber?: true
    clearedMarks?: true
  }

  export type AcademicBacklogMinAggregateInputType = {
    id?: true
    studentProfileId?: true
    subjectCode?: true
    subjectName?: true
    semesterNumber?: true
    status?: true
    clearedSemesterNumber?: true
    clearedGrade?: true
    clearedMarks?: true
    clearedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcademicBacklogMaxAggregateInputType = {
    id?: true
    studentProfileId?: true
    subjectCode?: true
    subjectName?: true
    semesterNumber?: true
    status?: true
    clearedSemesterNumber?: true
    clearedGrade?: true
    clearedMarks?: true
    clearedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcademicBacklogCountAggregateInputType = {
    id?: true
    studentProfileId?: true
    subjectCode?: true
    subjectName?: true
    semesterNumber?: true
    status?: true
    clearedSemesterNumber?: true
    clearedGrade?: true
    clearedMarks?: true
    clearedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AcademicBacklogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicBacklog to aggregate.
     */
    where?: AcademicBacklogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicBacklogs to fetch.
     */
    orderBy?: AcademicBacklogOrderByWithRelationInput | AcademicBacklogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicBacklogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicBacklogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicBacklogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicBacklogs
    **/
    _count?: true | AcademicBacklogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcademicBacklogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcademicBacklogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicBacklogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicBacklogMaxAggregateInputType
  }

  export type GetAcademicBacklogAggregateType<T extends AcademicBacklogAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicBacklog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicBacklog[P]>
      : GetScalarType<T[P], AggregateAcademicBacklog[P]>
  }




  export type AcademicBacklogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicBacklogWhereInput
    orderBy?: AcademicBacklogOrderByWithAggregationInput | AcademicBacklogOrderByWithAggregationInput[]
    by: AcademicBacklogScalarFieldEnum[] | AcademicBacklogScalarFieldEnum
    having?: AcademicBacklogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicBacklogCountAggregateInputType | true
    _avg?: AcademicBacklogAvgAggregateInputType
    _sum?: AcademicBacklogSumAggregateInputType
    _min?: AcademicBacklogMinAggregateInputType
    _max?: AcademicBacklogMaxAggregateInputType
  }

  export type AcademicBacklogGroupByOutputType = {
    id: string
    studentProfileId: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status: $Enums.AcademicBacklogStatus
    clearedSemesterNumber: number | null
    clearedGrade: string | null
    clearedMarks: number | null
    clearedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AcademicBacklogCountAggregateOutputType | null
    _avg: AcademicBacklogAvgAggregateOutputType | null
    _sum: AcademicBacklogSumAggregateOutputType | null
    _min: AcademicBacklogMinAggregateOutputType | null
    _max: AcademicBacklogMaxAggregateOutputType | null
  }

  type GetAcademicBacklogGroupByPayload<T extends AcademicBacklogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicBacklogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicBacklogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicBacklogGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicBacklogGroupByOutputType[P]>
        }
      >
    >


  export type AcademicBacklogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    subjectCode?: boolean
    subjectName?: boolean
    semesterNumber?: boolean
    status?: boolean
    clearedSemesterNumber?: boolean
    clearedGrade?: boolean
    clearedMarks?: boolean
    clearedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicBacklog"]>

  export type AcademicBacklogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    subjectCode?: boolean
    subjectName?: boolean
    semesterNumber?: boolean
    status?: boolean
    clearedSemesterNumber?: boolean
    clearedGrade?: boolean
    clearedMarks?: boolean
    clearedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicBacklog"]>

  export type AcademicBacklogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProfileId?: boolean
    subjectCode?: boolean
    subjectName?: boolean
    semesterNumber?: boolean
    status?: boolean
    clearedSemesterNumber?: boolean
    clearedGrade?: boolean
    clearedMarks?: boolean
    clearedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicBacklog"]>

  export type AcademicBacklogSelectScalar = {
    id?: boolean
    studentProfileId?: boolean
    subjectCode?: boolean
    subjectName?: boolean
    semesterNumber?: boolean
    status?: boolean
    clearedSemesterNumber?: boolean
    clearedGrade?: boolean
    clearedMarks?: boolean
    clearedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AcademicBacklogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProfileId" | "subjectCode" | "subjectName" | "semesterNumber" | "status" | "clearedSemesterNumber" | "clearedGrade" | "clearedMarks" | "clearedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["academicBacklog"]>
  export type AcademicBacklogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type AcademicBacklogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type AcademicBacklogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProfile?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }

  export type $AcademicBacklogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicBacklog"
    objects: {
      studentProfile: Prisma.$StudentProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentProfileId: string
      subjectCode: string
      subjectName: string
      semesterNumber: number
      status: $Enums.AcademicBacklogStatus
      clearedSemesterNumber: number | null
      clearedGrade: string | null
      clearedMarks: number | null
      clearedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["academicBacklog"]>
    composites: {}
  }

  type AcademicBacklogGetPayload<S extends boolean | null | undefined | AcademicBacklogDefaultArgs> = $Result.GetResult<Prisma.$AcademicBacklogPayload, S>

  type AcademicBacklogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademicBacklogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademicBacklogCountAggregateInputType | true
    }

  export interface AcademicBacklogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicBacklog'], meta: { name: 'AcademicBacklog' } }
    /**
     * Find zero or one AcademicBacklog that matches the filter.
     * @param {AcademicBacklogFindUniqueArgs} args - Arguments to find a AcademicBacklog
     * @example
     * // Get one AcademicBacklog
     * const academicBacklog = await prisma.academicBacklog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicBacklogFindUniqueArgs>(args: SelectSubset<T, AcademicBacklogFindUniqueArgs<ExtArgs>>): Prisma__AcademicBacklogClient<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcademicBacklog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademicBacklogFindUniqueOrThrowArgs} args - Arguments to find a AcademicBacklog
     * @example
     * // Get one AcademicBacklog
     * const academicBacklog = await prisma.academicBacklog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicBacklogFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicBacklogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicBacklogClient<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicBacklog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicBacklogFindFirstArgs} args - Arguments to find a AcademicBacklog
     * @example
     * // Get one AcademicBacklog
     * const academicBacklog = await prisma.academicBacklog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicBacklogFindFirstArgs>(args?: SelectSubset<T, AcademicBacklogFindFirstArgs<ExtArgs>>): Prisma__AcademicBacklogClient<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicBacklog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicBacklogFindFirstOrThrowArgs} args - Arguments to find a AcademicBacklog
     * @example
     * // Get one AcademicBacklog
     * const academicBacklog = await prisma.academicBacklog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicBacklogFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicBacklogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicBacklogClient<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcademicBacklogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicBacklogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicBacklogs
     * const academicBacklogs = await prisma.academicBacklog.findMany()
     * 
     * // Get first 10 AcademicBacklogs
     * const academicBacklogs = await prisma.academicBacklog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academicBacklogWithIdOnly = await prisma.academicBacklog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcademicBacklogFindManyArgs>(args?: SelectSubset<T, AcademicBacklogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcademicBacklog.
     * @param {AcademicBacklogCreateArgs} args - Arguments to create a AcademicBacklog.
     * @example
     * // Create one AcademicBacklog
     * const AcademicBacklog = await prisma.academicBacklog.create({
     *   data: {
     *     // ... data to create a AcademicBacklog
     *   }
     * })
     * 
     */
    create<T extends AcademicBacklogCreateArgs>(args: SelectSubset<T, AcademicBacklogCreateArgs<ExtArgs>>): Prisma__AcademicBacklogClient<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcademicBacklogs.
     * @param {AcademicBacklogCreateManyArgs} args - Arguments to create many AcademicBacklogs.
     * @example
     * // Create many AcademicBacklogs
     * const academicBacklog = await prisma.academicBacklog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicBacklogCreateManyArgs>(args?: SelectSubset<T, AcademicBacklogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcademicBacklogs and returns the data saved in the database.
     * @param {AcademicBacklogCreateManyAndReturnArgs} args - Arguments to create many AcademicBacklogs.
     * @example
     * // Create many AcademicBacklogs
     * const academicBacklog = await prisma.academicBacklog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcademicBacklogs and only return the `id`
     * const academicBacklogWithIdOnly = await prisma.academicBacklog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcademicBacklogCreateManyAndReturnArgs>(args?: SelectSubset<T, AcademicBacklogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AcademicBacklog.
     * @param {AcademicBacklogDeleteArgs} args - Arguments to delete one AcademicBacklog.
     * @example
     * // Delete one AcademicBacklog
     * const AcademicBacklog = await prisma.academicBacklog.delete({
     *   where: {
     *     // ... filter to delete one AcademicBacklog
     *   }
     * })
     * 
     */
    delete<T extends AcademicBacklogDeleteArgs>(args: SelectSubset<T, AcademicBacklogDeleteArgs<ExtArgs>>): Prisma__AcademicBacklogClient<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcademicBacklog.
     * @param {AcademicBacklogUpdateArgs} args - Arguments to update one AcademicBacklog.
     * @example
     * // Update one AcademicBacklog
     * const academicBacklog = await prisma.academicBacklog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicBacklogUpdateArgs>(args: SelectSubset<T, AcademicBacklogUpdateArgs<ExtArgs>>): Prisma__AcademicBacklogClient<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcademicBacklogs.
     * @param {AcademicBacklogDeleteManyArgs} args - Arguments to filter AcademicBacklogs to delete.
     * @example
     * // Delete a few AcademicBacklogs
     * const { count } = await prisma.academicBacklog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicBacklogDeleteManyArgs>(args?: SelectSubset<T, AcademicBacklogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicBacklogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicBacklogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicBacklogs
     * const academicBacklog = await prisma.academicBacklog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicBacklogUpdateManyArgs>(args: SelectSubset<T, AcademicBacklogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicBacklogs and returns the data updated in the database.
     * @param {AcademicBacklogUpdateManyAndReturnArgs} args - Arguments to update many AcademicBacklogs.
     * @example
     * // Update many AcademicBacklogs
     * const academicBacklog = await prisma.academicBacklog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AcademicBacklogs and only return the `id`
     * const academicBacklogWithIdOnly = await prisma.academicBacklog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AcademicBacklogUpdateManyAndReturnArgs>(args: SelectSubset<T, AcademicBacklogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AcademicBacklog.
     * @param {AcademicBacklogUpsertArgs} args - Arguments to update or create a AcademicBacklog.
     * @example
     * // Update or create a AcademicBacklog
     * const academicBacklog = await prisma.academicBacklog.upsert({
     *   create: {
     *     // ... data to create a AcademicBacklog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicBacklog we want to update
     *   }
     * })
     */
    upsert<T extends AcademicBacklogUpsertArgs>(args: SelectSubset<T, AcademicBacklogUpsertArgs<ExtArgs>>): Prisma__AcademicBacklogClient<$Result.GetResult<Prisma.$AcademicBacklogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcademicBacklogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicBacklogCountArgs} args - Arguments to filter AcademicBacklogs to count.
     * @example
     * // Count the number of AcademicBacklogs
     * const count = await prisma.academicBacklog.count({
     *   where: {
     *     // ... the filter for the AcademicBacklogs we want to count
     *   }
     * })
    **/
    count<T extends AcademicBacklogCountArgs>(
      args?: Subset<T, AcademicBacklogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicBacklogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicBacklog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicBacklogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AcademicBacklogAggregateArgs>(args: Subset<T, AcademicBacklogAggregateArgs>): Prisma.PrismaPromise<GetAcademicBacklogAggregateType<T>>

    /**
     * Group by AcademicBacklog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicBacklogGroupByArgs} args - Group by arguments.
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
      T extends AcademicBacklogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicBacklogGroupByArgs['orderBy'] }
        : { orderBy?: AcademicBacklogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AcademicBacklogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicBacklogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicBacklog model
   */
  readonly fields: AcademicBacklogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicBacklog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicBacklogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    studentProfile<T extends StudentProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfileDefaultArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcademicBacklog model
   */
  interface AcademicBacklogFieldRefs {
    readonly id: FieldRef<"AcademicBacklog", 'String'>
    readonly studentProfileId: FieldRef<"AcademicBacklog", 'String'>
    readonly subjectCode: FieldRef<"AcademicBacklog", 'String'>
    readonly subjectName: FieldRef<"AcademicBacklog", 'String'>
    readonly semesterNumber: FieldRef<"AcademicBacklog", 'Int'>
    readonly status: FieldRef<"AcademicBacklog", 'AcademicBacklogStatus'>
    readonly clearedSemesterNumber: FieldRef<"AcademicBacklog", 'Int'>
    readonly clearedGrade: FieldRef<"AcademicBacklog", 'String'>
    readonly clearedMarks: FieldRef<"AcademicBacklog", 'Float'>
    readonly clearedAt: FieldRef<"AcademicBacklog", 'DateTime'>
    readonly createdAt: FieldRef<"AcademicBacklog", 'DateTime'>
    readonly updatedAt: FieldRef<"AcademicBacklog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcademicBacklog findUnique
   */
  export type AcademicBacklogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
    /**
     * Filter, which AcademicBacklog to fetch.
     */
    where: AcademicBacklogWhereUniqueInput
  }

  /**
   * AcademicBacklog findUniqueOrThrow
   */
  export type AcademicBacklogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
    /**
     * Filter, which AcademicBacklog to fetch.
     */
    where: AcademicBacklogWhereUniqueInput
  }

  /**
   * AcademicBacklog findFirst
   */
  export type AcademicBacklogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
    /**
     * Filter, which AcademicBacklog to fetch.
     */
    where?: AcademicBacklogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicBacklogs to fetch.
     */
    orderBy?: AcademicBacklogOrderByWithRelationInput | AcademicBacklogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicBacklogs.
     */
    cursor?: AcademicBacklogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicBacklogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicBacklogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicBacklogs.
     */
    distinct?: AcademicBacklogScalarFieldEnum | AcademicBacklogScalarFieldEnum[]
  }

  /**
   * AcademicBacklog findFirstOrThrow
   */
  export type AcademicBacklogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
    /**
     * Filter, which AcademicBacklog to fetch.
     */
    where?: AcademicBacklogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicBacklogs to fetch.
     */
    orderBy?: AcademicBacklogOrderByWithRelationInput | AcademicBacklogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicBacklogs.
     */
    cursor?: AcademicBacklogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicBacklogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicBacklogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicBacklogs.
     */
    distinct?: AcademicBacklogScalarFieldEnum | AcademicBacklogScalarFieldEnum[]
  }

  /**
   * AcademicBacklog findMany
   */
  export type AcademicBacklogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
    /**
     * Filter, which AcademicBacklogs to fetch.
     */
    where?: AcademicBacklogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicBacklogs to fetch.
     */
    orderBy?: AcademicBacklogOrderByWithRelationInput | AcademicBacklogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicBacklogs.
     */
    cursor?: AcademicBacklogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicBacklogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicBacklogs.
     */
    skip?: number
    distinct?: AcademicBacklogScalarFieldEnum | AcademicBacklogScalarFieldEnum[]
  }

  /**
   * AcademicBacklog create
   */
  export type AcademicBacklogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademicBacklog.
     */
    data: XOR<AcademicBacklogCreateInput, AcademicBacklogUncheckedCreateInput>
  }

  /**
   * AcademicBacklog createMany
   */
  export type AcademicBacklogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicBacklogs.
     */
    data: AcademicBacklogCreateManyInput | AcademicBacklogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademicBacklog createManyAndReturn
   */
  export type AcademicBacklogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * The data used to create many AcademicBacklogs.
     */
    data: AcademicBacklogCreateManyInput | AcademicBacklogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicBacklog update
   */
  export type AcademicBacklogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademicBacklog.
     */
    data: XOR<AcademicBacklogUpdateInput, AcademicBacklogUncheckedUpdateInput>
    /**
     * Choose, which AcademicBacklog to update.
     */
    where: AcademicBacklogWhereUniqueInput
  }

  /**
   * AcademicBacklog updateMany
   */
  export type AcademicBacklogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicBacklogs.
     */
    data: XOR<AcademicBacklogUpdateManyMutationInput, AcademicBacklogUncheckedUpdateManyInput>
    /**
     * Filter which AcademicBacklogs to update
     */
    where?: AcademicBacklogWhereInput
    /**
     * Limit how many AcademicBacklogs to update.
     */
    limit?: number
  }

  /**
   * AcademicBacklog updateManyAndReturn
   */
  export type AcademicBacklogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * The data used to update AcademicBacklogs.
     */
    data: XOR<AcademicBacklogUpdateManyMutationInput, AcademicBacklogUncheckedUpdateManyInput>
    /**
     * Filter which AcademicBacklogs to update
     */
    where?: AcademicBacklogWhereInput
    /**
     * Limit how many AcademicBacklogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicBacklog upsert
   */
  export type AcademicBacklogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademicBacklog to update in case it exists.
     */
    where: AcademicBacklogWhereUniqueInput
    /**
     * In case the AcademicBacklog found by the `where` argument doesn't exist, create a new AcademicBacklog with this data.
     */
    create: XOR<AcademicBacklogCreateInput, AcademicBacklogUncheckedCreateInput>
    /**
     * In case the AcademicBacklog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicBacklogUpdateInput, AcademicBacklogUncheckedUpdateInput>
  }

  /**
   * AcademicBacklog delete
   */
  export type AcademicBacklogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
    /**
     * Filter which AcademicBacklog to delete.
     */
    where: AcademicBacklogWhereUniqueInput
  }

  /**
   * AcademicBacklog deleteMany
   */
  export type AcademicBacklogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicBacklogs to delete
     */
    where?: AcademicBacklogWhereInput
    /**
     * Limit how many AcademicBacklogs to delete.
     */
    limit?: number
  }

  /**
   * AcademicBacklog without action
   */
  export type AcademicBacklogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicBacklog
     */
    select?: AcademicBacklogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicBacklog
     */
    omit?: AcademicBacklogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicBacklogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    username: 'username',
    email: 'email',
    password: 'password',
    role: 'role',
    isActive: 'isActive',
    lastLogin: 'lastLogin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StudentProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    registerNumber: 'registerNumber',
    admissionNumber: 'admissionNumber',
    profileImage: 'profileImage',
    dateOfBirth: 'dateOfBirth',
    gender: 'gender',
    bloodGroup: 'bloodGroup',
    nationality: 'nationality',
    religion: 'religion',
    department: 'department',
    programme: 'programme',
    semester: 'semester',
    section: 'section',
    studentType: 'studentType',
    address: 'address',
    permanentAddress: 'permanentAddress',
    yearsAtUniversity: 'yearsAtUniversity',
    totalCredits: 'totalCredits',
    currentCGPA: 'currentCGPA',
    overallAttendance: 'overallAttendance',
    academicStanding: 'academicStanding',
    currentMentor: 'currentMentor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    academicSetupCompleted: 'academicSetupCompleted'
  };

  export type StudentProfileScalarFieldEnum = (typeof StudentProfileScalarFieldEnum)[keyof typeof StudentProfileScalarFieldEnum]


  export const StudentParentDetailsScalarFieldEnum: {
    id: 'id',
    studentProfileId: 'studentProfileId',
    fatherName: 'fatherName',
    fatherOccupation: 'fatherOccupation',
    fatherCompany: 'fatherCompany',
    fatherAnnualIncome: 'fatherAnnualIncome',
    fatherQualification: 'fatherQualification',
    fatherEmail: 'fatherEmail',
    fatherPhone: 'fatherPhone',
    fatherAddress: 'fatherAddress',
    motherName: 'motherName',
    motherOccupation: 'motherOccupation',
    motherQualification: 'motherQualification',
    motherAnnualIncome: 'motherAnnualIncome',
    motherEmail: 'motherEmail',
    motherPhone: 'motherPhone',
    motherAddress: 'motherAddress',
    guardianName: 'guardianName',
    guardianRelationship: 'guardianRelationship',
    guardianPhone: 'guardianPhone',
    guardianAlternatePhone: 'guardianAlternatePhone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentParentDetailsScalarFieldEnum = (typeof StudentParentDetailsScalarFieldEnum)[keyof typeof StudentParentDetailsScalarFieldEnum]


  export const StudentContactDetailsScalarFieldEnum: {
    id: 'id',
    studentProfileId: 'studentProfileId',
    permanentAddress: 'permanentAddress',
    currentAddress: 'currentAddress',
    addressType: 'addressType',
    durationAtCurrentAddress: 'durationAtCurrentAddress',
    personalMobile: 'personalMobile',
    alternateMobile: 'alternateMobile',
    personalEmail: 'personalEmail',
    alternateEmail: 'alternateEmail',
    whatsappNumber: 'whatsappNumber',
    telegramUsername: 'telegramUsername',
    linkedInProfile: 'linkedInProfile',
    githubProfile: 'githubProfile',
    preferredContactMethod: 'preferredContactMethod',
    preferredContactTime: 'preferredContactTime',
    communicationEmailPreference: 'communicationEmailPreference',
    allowWhatsappCommunication: 'allowWhatsappCommunication',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentContactDetailsScalarFieldEnum = (typeof StudentContactDetailsScalarFieldEnum)[keyof typeof StudentContactDetailsScalarFieldEnum]


  export const StudentDocumentScalarFieldEnum: {
    id: 'id',
    studentProfileId: 'studentProfileId',
    documentName: 'documentName',
    category: 'category',
    description: 'description',
    fileType: 'fileType',
    fileSize: 'fileSize',
    cloudinaryPublicId: 'cloudinaryPublicId',
    fileUrl: 'fileUrl',
    uploadedAt: 'uploadedAt',
    updatedAt: 'updatedAt',
    resourceType: 'resourceType'
  };

  export type StudentDocumentScalarFieldEnum = (typeof StudentDocumentScalarFieldEnum)[keyof typeof StudentDocumentScalarFieldEnum]


  export const AcademicSemesterScalarFieldEnum: {
    id: 'id',
    studentProfileId: 'studentProfileId',
    semesterNumber: 'semesterNumber',
    academicYear: 'academicYear',
    term: 'term',
    status: 'status',
    entryStatus: 'entryStatus',
    sgpa: 'sgpa',
    totalCredits: 'totalCredits',
    creditsEarned: 'creditsEarned',
    backlogs: 'backlogs',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AcademicSemesterScalarFieldEnum = (typeof AcademicSemesterScalarFieldEnum)[keyof typeof AcademicSemesterScalarFieldEnum]


  export const AcademicSubjectScalarFieldEnum: {
    id: 'id',
    academicSemesterId: 'academicSemesterId',
    courseCode: 'courseCode',
    courseName: 'courseName',
    credits: 'credits',
    cia1: 'cia1',
    cia2: 'cia2',
    cia3: 'cia3',
    mse: 'mse',
    ese: 'ese',
    maximumMarks: 'maximumMarks',
    totalMarksObtained: 'totalMarksObtained',
    grade: 'grade',
    gradePoint: 'gradePoint',
    attendance: 'attendance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    classesAttended: 'classesAttended',
    classesHeld: 'classesHeld'
  };

  export type AcademicSubjectScalarFieldEnum = (typeof AcademicSubjectScalarFieldEnum)[keyof typeof AcademicSubjectScalarFieldEnum]


  export const AcademicBacklogScalarFieldEnum: {
    id: 'id',
    studentProfileId: 'studentProfileId',
    subjectCode: 'subjectCode',
    subjectName: 'subjectName',
    semesterNumber: 'semesterNumber',
    status: 'status',
    clearedSemesterNumber: 'clearedSemesterNumber',
    clearedGrade: 'clearedGrade',
    clearedMarks: 'clearedMarks',
    clearedAt: 'clearedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AcademicBacklogScalarFieldEnum = (typeof AcademicBacklogScalarFieldEnum)[keyof typeof AcademicBacklogScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'BloodGroup'
   */
  export type EnumBloodGroupFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BloodGroup'>
    


  /**
   * Reference to a field of type 'BloodGroup[]'
   */
  export type ListEnumBloodGroupFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BloodGroup[]'>
    


  /**
   * Reference to a field of type 'StudentType'
   */
  export type EnumStudentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudentType'>
    


  /**
   * Reference to a field of type 'StudentType[]'
   */
  export type ListEnumStudentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudentType[]'>
    


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
   * Reference to a field of type 'AddressType'
   */
  export type EnumAddressTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AddressType'>
    


  /**
   * Reference to a field of type 'AddressType[]'
   */
  export type ListEnumAddressTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AddressType[]'>
    


  /**
   * Reference to a field of type 'PreferredContactMethod'
   */
  export type EnumPreferredContactMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PreferredContactMethod'>
    


  /**
   * Reference to a field of type 'PreferredContactMethod[]'
   */
  export type ListEnumPreferredContactMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PreferredContactMethod[]'>
    


  /**
   * Reference to a field of type 'CommunicationEmailPreference'
   */
  export type EnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunicationEmailPreference'>
    


  /**
   * Reference to a field of type 'CommunicationEmailPreference[]'
   */
  export type ListEnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunicationEmailPreference[]'>
    


  /**
   * Reference to a field of type 'DocumentCategory'
   */
  export type EnumDocumentCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentCategory'>
    


  /**
   * Reference to a field of type 'DocumentCategory[]'
   */
  export type ListEnumDocumentCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentCategory[]'>
    


  /**
   * Reference to a field of type 'AcademicSemesterStatus'
   */
  export type EnumAcademicSemesterStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcademicSemesterStatus'>
    


  /**
   * Reference to a field of type 'AcademicSemesterStatus[]'
   */
  export type ListEnumAcademicSemesterStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcademicSemesterStatus[]'>
    


  /**
   * Reference to a field of type 'AcademicEntryStatus'
   */
  export type EnumAcademicEntryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcademicEntryStatus'>
    


  /**
   * Reference to a field of type 'AcademicEntryStatus[]'
   */
  export type ListEnumAcademicEntryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcademicEntryStatus[]'>
    


  /**
   * Reference to a field of type 'AcademicBacklogStatus'
   */
  export type EnumAcademicBacklogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcademicBacklogStatus'>
    


  /**
   * Reference to a field of type 'AcademicBacklogStatus[]'
   */
  export type ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcademicBacklogStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    studentProfile?: XOR<StudentProfileNullableScalarRelationFilter, StudentProfileWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentProfile?: StudentProfileOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    studentProfile?: XOR<StudentProfileNullableScalarRelationFilter, StudentProfileWhereInput> | null
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StudentProfileWhereInput = {
    AND?: StudentProfileWhereInput | StudentProfileWhereInput[]
    OR?: StudentProfileWhereInput[]
    NOT?: StudentProfileWhereInput | StudentProfileWhereInput[]
    id?: StringFilter<"StudentProfile"> | string
    userId?: StringFilter<"StudentProfile"> | string
    registerNumber?: StringNullableFilter<"StudentProfile"> | string | null
    admissionNumber?: StringNullableFilter<"StudentProfile"> | string | null
    profileImage?: StringNullableFilter<"StudentProfile"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"StudentProfile"> | Date | string | null
    gender?: EnumGenderNullableFilter<"StudentProfile"> | $Enums.Gender | null
    bloodGroup?: EnumBloodGroupNullableFilter<"StudentProfile"> | $Enums.BloodGroup | null
    nationality?: StringNullableFilter<"StudentProfile"> | string | null
    religion?: StringNullableFilter<"StudentProfile"> | string | null
    department?: StringNullableFilter<"StudentProfile"> | string | null
    programme?: StringNullableFilter<"StudentProfile"> | string | null
    semester?: StringNullableFilter<"StudentProfile"> | string | null
    section?: StringNullableFilter<"StudentProfile"> | string | null
    studentType?: EnumStudentTypeNullableFilter<"StudentProfile"> | $Enums.StudentType | null
    address?: StringNullableFilter<"StudentProfile"> | string | null
    permanentAddress?: StringNullableFilter<"StudentProfile"> | string | null
    yearsAtUniversity?: StringNullableFilter<"StudentProfile"> | string | null
    totalCredits?: IntNullableFilter<"StudentProfile"> | number | null
    currentCGPA?: FloatNullableFilter<"StudentProfile"> | number | null
    overallAttendance?: FloatNullableFilter<"StudentProfile"> | number | null
    academicStanding?: StringNullableFilter<"StudentProfile"> | string | null
    currentMentor?: StringNullableFilter<"StudentProfile"> | string | null
    createdAt?: DateTimeFilter<"StudentProfile"> | Date | string
    updatedAt?: DateTimeFilter<"StudentProfile"> | Date | string
    academicSetupCompleted?: BoolFilter<"StudentProfile"> | boolean
    academicBacklogs?: AcademicBacklogListRelationFilter
    academicSemesters?: AcademicSemesterListRelationFilter
    contactDetails?: XOR<StudentContactDetailsNullableScalarRelationFilter, StudentContactDetailsWhereInput> | null
    documents?: StudentDocumentListRelationFilter
    parentDetails?: XOR<StudentParentDetailsNullableScalarRelationFilter, StudentParentDetailsWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type StudentProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    registerNumber?: SortOrderInput | SortOrder
    admissionNumber?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    religion?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    programme?: SortOrderInput | SortOrder
    semester?: SortOrderInput | SortOrder
    section?: SortOrderInput | SortOrder
    studentType?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    permanentAddress?: SortOrderInput | SortOrder
    yearsAtUniversity?: SortOrderInput | SortOrder
    totalCredits?: SortOrderInput | SortOrder
    currentCGPA?: SortOrderInput | SortOrder
    overallAttendance?: SortOrderInput | SortOrder
    academicStanding?: SortOrderInput | SortOrder
    currentMentor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    academicSetupCompleted?: SortOrder
    academicBacklogs?: AcademicBacklogOrderByRelationAggregateInput
    academicSemesters?: AcademicSemesterOrderByRelationAggregateInput
    contactDetails?: StudentContactDetailsOrderByWithRelationInput
    documents?: StudentDocumentOrderByRelationAggregateInput
    parentDetails?: StudentParentDetailsOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type StudentProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    registerNumber?: string
    admissionNumber?: string
    AND?: StudentProfileWhereInput | StudentProfileWhereInput[]
    OR?: StudentProfileWhereInput[]
    NOT?: StudentProfileWhereInput | StudentProfileWhereInput[]
    profileImage?: StringNullableFilter<"StudentProfile"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"StudentProfile"> | Date | string | null
    gender?: EnumGenderNullableFilter<"StudentProfile"> | $Enums.Gender | null
    bloodGroup?: EnumBloodGroupNullableFilter<"StudentProfile"> | $Enums.BloodGroup | null
    nationality?: StringNullableFilter<"StudentProfile"> | string | null
    religion?: StringNullableFilter<"StudentProfile"> | string | null
    department?: StringNullableFilter<"StudentProfile"> | string | null
    programme?: StringNullableFilter<"StudentProfile"> | string | null
    semester?: StringNullableFilter<"StudentProfile"> | string | null
    section?: StringNullableFilter<"StudentProfile"> | string | null
    studentType?: EnumStudentTypeNullableFilter<"StudentProfile"> | $Enums.StudentType | null
    address?: StringNullableFilter<"StudentProfile"> | string | null
    permanentAddress?: StringNullableFilter<"StudentProfile"> | string | null
    yearsAtUniversity?: StringNullableFilter<"StudentProfile"> | string | null
    totalCredits?: IntNullableFilter<"StudentProfile"> | number | null
    currentCGPA?: FloatNullableFilter<"StudentProfile"> | number | null
    overallAttendance?: FloatNullableFilter<"StudentProfile"> | number | null
    academicStanding?: StringNullableFilter<"StudentProfile"> | string | null
    currentMentor?: StringNullableFilter<"StudentProfile"> | string | null
    createdAt?: DateTimeFilter<"StudentProfile"> | Date | string
    updatedAt?: DateTimeFilter<"StudentProfile"> | Date | string
    academicSetupCompleted?: BoolFilter<"StudentProfile"> | boolean
    academicBacklogs?: AcademicBacklogListRelationFilter
    academicSemesters?: AcademicSemesterListRelationFilter
    contactDetails?: XOR<StudentContactDetailsNullableScalarRelationFilter, StudentContactDetailsWhereInput> | null
    documents?: StudentDocumentListRelationFilter
    parentDetails?: XOR<StudentParentDetailsNullableScalarRelationFilter, StudentParentDetailsWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "registerNumber" | "admissionNumber">

  export type StudentProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    registerNumber?: SortOrderInput | SortOrder
    admissionNumber?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    religion?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    programme?: SortOrderInput | SortOrder
    semester?: SortOrderInput | SortOrder
    section?: SortOrderInput | SortOrder
    studentType?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    permanentAddress?: SortOrderInput | SortOrder
    yearsAtUniversity?: SortOrderInput | SortOrder
    totalCredits?: SortOrderInput | SortOrder
    currentCGPA?: SortOrderInput | SortOrder
    overallAttendance?: SortOrderInput | SortOrder
    academicStanding?: SortOrderInput | SortOrder
    currentMentor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    academicSetupCompleted?: SortOrder
    _count?: StudentProfileCountOrderByAggregateInput
    _avg?: StudentProfileAvgOrderByAggregateInput
    _max?: StudentProfileMaxOrderByAggregateInput
    _min?: StudentProfileMinOrderByAggregateInput
    _sum?: StudentProfileSumOrderByAggregateInput
  }

  export type StudentProfileScalarWhereWithAggregatesInput = {
    AND?: StudentProfileScalarWhereWithAggregatesInput | StudentProfileScalarWhereWithAggregatesInput[]
    OR?: StudentProfileScalarWhereWithAggregatesInput[]
    NOT?: StudentProfileScalarWhereWithAggregatesInput | StudentProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentProfile"> | string
    userId?: StringWithAggregatesFilter<"StudentProfile"> | string
    registerNumber?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    admissionNumber?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    profileImage?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"StudentProfile"> | Date | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"StudentProfile"> | $Enums.Gender | null
    bloodGroup?: EnumBloodGroupNullableWithAggregatesFilter<"StudentProfile"> | $Enums.BloodGroup | null
    nationality?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    religion?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    department?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    programme?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    semester?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    section?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    studentType?: EnumStudentTypeNullableWithAggregatesFilter<"StudentProfile"> | $Enums.StudentType | null
    address?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    permanentAddress?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    yearsAtUniversity?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    totalCredits?: IntNullableWithAggregatesFilter<"StudentProfile"> | number | null
    currentCGPA?: FloatNullableWithAggregatesFilter<"StudentProfile"> | number | null
    overallAttendance?: FloatNullableWithAggregatesFilter<"StudentProfile"> | number | null
    academicStanding?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    currentMentor?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StudentProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StudentProfile"> | Date | string
    academicSetupCompleted?: BoolWithAggregatesFilter<"StudentProfile"> | boolean
  }

  export type StudentParentDetailsWhereInput = {
    AND?: StudentParentDetailsWhereInput | StudentParentDetailsWhereInput[]
    OR?: StudentParentDetailsWhereInput[]
    NOT?: StudentParentDetailsWhereInput | StudentParentDetailsWhereInput[]
    id?: StringFilter<"StudentParentDetails"> | string
    studentProfileId?: StringFilter<"StudentParentDetails"> | string
    fatherName?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherOccupation?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherCompany?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherAnnualIncome?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherQualification?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherEmail?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherPhone?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherAddress?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherName?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherOccupation?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherQualification?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherAnnualIncome?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherEmail?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherPhone?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherAddress?: StringNullableFilter<"StudentParentDetails"> | string | null
    guardianName?: StringNullableFilter<"StudentParentDetails"> | string | null
    guardianRelationship?: StringNullableFilter<"StudentParentDetails"> | string | null
    guardianPhone?: StringNullableFilter<"StudentParentDetails"> | string | null
    guardianAlternatePhone?: StringNullableFilter<"StudentParentDetails"> | string | null
    createdAt?: DateTimeFilter<"StudentParentDetails"> | Date | string
    updatedAt?: DateTimeFilter<"StudentParentDetails"> | Date | string
    studentProfile?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
  }

  export type StudentParentDetailsOrderByWithRelationInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    fatherName?: SortOrderInput | SortOrder
    fatherOccupation?: SortOrderInput | SortOrder
    fatherCompany?: SortOrderInput | SortOrder
    fatherAnnualIncome?: SortOrderInput | SortOrder
    fatherQualification?: SortOrderInput | SortOrder
    fatherEmail?: SortOrderInput | SortOrder
    fatherPhone?: SortOrderInput | SortOrder
    fatherAddress?: SortOrderInput | SortOrder
    motherName?: SortOrderInput | SortOrder
    motherOccupation?: SortOrderInput | SortOrder
    motherQualification?: SortOrderInput | SortOrder
    motherAnnualIncome?: SortOrderInput | SortOrder
    motherEmail?: SortOrderInput | SortOrder
    motherPhone?: SortOrderInput | SortOrder
    motherAddress?: SortOrderInput | SortOrder
    guardianName?: SortOrderInput | SortOrder
    guardianRelationship?: SortOrderInput | SortOrder
    guardianPhone?: SortOrderInput | SortOrder
    guardianAlternatePhone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentProfile?: StudentProfileOrderByWithRelationInput
  }

  export type StudentParentDetailsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentProfileId?: string
    AND?: StudentParentDetailsWhereInput | StudentParentDetailsWhereInput[]
    OR?: StudentParentDetailsWhereInput[]
    NOT?: StudentParentDetailsWhereInput | StudentParentDetailsWhereInput[]
    fatherName?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherOccupation?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherCompany?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherAnnualIncome?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherQualification?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherEmail?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherPhone?: StringNullableFilter<"StudentParentDetails"> | string | null
    fatherAddress?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherName?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherOccupation?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherQualification?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherAnnualIncome?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherEmail?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherPhone?: StringNullableFilter<"StudentParentDetails"> | string | null
    motherAddress?: StringNullableFilter<"StudentParentDetails"> | string | null
    guardianName?: StringNullableFilter<"StudentParentDetails"> | string | null
    guardianRelationship?: StringNullableFilter<"StudentParentDetails"> | string | null
    guardianPhone?: StringNullableFilter<"StudentParentDetails"> | string | null
    guardianAlternatePhone?: StringNullableFilter<"StudentParentDetails"> | string | null
    createdAt?: DateTimeFilter<"StudentParentDetails"> | Date | string
    updatedAt?: DateTimeFilter<"StudentParentDetails"> | Date | string
    studentProfile?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
  }, "id" | "studentProfileId">

  export type StudentParentDetailsOrderByWithAggregationInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    fatherName?: SortOrderInput | SortOrder
    fatherOccupation?: SortOrderInput | SortOrder
    fatherCompany?: SortOrderInput | SortOrder
    fatherAnnualIncome?: SortOrderInput | SortOrder
    fatherQualification?: SortOrderInput | SortOrder
    fatherEmail?: SortOrderInput | SortOrder
    fatherPhone?: SortOrderInput | SortOrder
    fatherAddress?: SortOrderInput | SortOrder
    motherName?: SortOrderInput | SortOrder
    motherOccupation?: SortOrderInput | SortOrder
    motherQualification?: SortOrderInput | SortOrder
    motherAnnualIncome?: SortOrderInput | SortOrder
    motherEmail?: SortOrderInput | SortOrder
    motherPhone?: SortOrderInput | SortOrder
    motherAddress?: SortOrderInput | SortOrder
    guardianName?: SortOrderInput | SortOrder
    guardianRelationship?: SortOrderInput | SortOrder
    guardianPhone?: SortOrderInput | SortOrder
    guardianAlternatePhone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentParentDetailsCountOrderByAggregateInput
    _max?: StudentParentDetailsMaxOrderByAggregateInput
    _min?: StudentParentDetailsMinOrderByAggregateInput
  }

  export type StudentParentDetailsScalarWhereWithAggregatesInput = {
    AND?: StudentParentDetailsScalarWhereWithAggregatesInput | StudentParentDetailsScalarWhereWithAggregatesInput[]
    OR?: StudentParentDetailsScalarWhereWithAggregatesInput[]
    NOT?: StudentParentDetailsScalarWhereWithAggregatesInput | StudentParentDetailsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentParentDetails"> | string
    studentProfileId?: StringWithAggregatesFilter<"StudentParentDetails"> | string
    fatherName?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    fatherOccupation?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    fatherCompany?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    fatherAnnualIncome?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    fatherQualification?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    fatherEmail?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    fatherPhone?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    fatherAddress?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    motherName?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    motherOccupation?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    motherQualification?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    motherAnnualIncome?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    motherEmail?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    motherPhone?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    motherAddress?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    guardianName?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    guardianRelationship?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    guardianPhone?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    guardianAlternatePhone?: StringNullableWithAggregatesFilter<"StudentParentDetails"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StudentParentDetails"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StudentParentDetails"> | Date | string
  }

  export type StudentContactDetailsWhereInput = {
    AND?: StudentContactDetailsWhereInput | StudentContactDetailsWhereInput[]
    OR?: StudentContactDetailsWhereInput[]
    NOT?: StudentContactDetailsWhereInput | StudentContactDetailsWhereInput[]
    id?: StringFilter<"StudentContactDetails"> | string
    studentProfileId?: StringFilter<"StudentContactDetails"> | string
    permanentAddress?: StringNullableFilter<"StudentContactDetails"> | string | null
    currentAddress?: StringNullableFilter<"StudentContactDetails"> | string | null
    addressType?: EnumAddressTypeNullableFilter<"StudentContactDetails"> | $Enums.AddressType | null
    durationAtCurrentAddress?: StringNullableFilter<"StudentContactDetails"> | string | null
    personalMobile?: StringNullableFilter<"StudentContactDetails"> | string | null
    alternateMobile?: StringNullableFilter<"StudentContactDetails"> | string | null
    personalEmail?: StringNullableFilter<"StudentContactDetails"> | string | null
    alternateEmail?: StringNullableFilter<"StudentContactDetails"> | string | null
    whatsappNumber?: StringNullableFilter<"StudentContactDetails"> | string | null
    telegramUsername?: StringNullableFilter<"StudentContactDetails"> | string | null
    linkedInProfile?: StringNullableFilter<"StudentContactDetails"> | string | null
    githubProfile?: StringNullableFilter<"StudentContactDetails"> | string | null
    preferredContactMethod?: EnumPreferredContactMethodNullableFilter<"StudentContactDetails"> | $Enums.PreferredContactMethod | null
    preferredContactTime?: StringNullableFilter<"StudentContactDetails"> | string | null
    communicationEmailPreference?: EnumCommunicationEmailPreferenceNullableFilter<"StudentContactDetails"> | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolFilter<"StudentContactDetails"> | boolean
    createdAt?: DateTimeFilter<"StudentContactDetails"> | Date | string
    updatedAt?: DateTimeFilter<"StudentContactDetails"> | Date | string
    studentProfile?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
  }

  export type StudentContactDetailsOrderByWithRelationInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    permanentAddress?: SortOrderInput | SortOrder
    currentAddress?: SortOrderInput | SortOrder
    addressType?: SortOrderInput | SortOrder
    durationAtCurrentAddress?: SortOrderInput | SortOrder
    personalMobile?: SortOrderInput | SortOrder
    alternateMobile?: SortOrderInput | SortOrder
    personalEmail?: SortOrderInput | SortOrder
    alternateEmail?: SortOrderInput | SortOrder
    whatsappNumber?: SortOrderInput | SortOrder
    telegramUsername?: SortOrderInput | SortOrder
    linkedInProfile?: SortOrderInput | SortOrder
    githubProfile?: SortOrderInput | SortOrder
    preferredContactMethod?: SortOrderInput | SortOrder
    preferredContactTime?: SortOrderInput | SortOrder
    communicationEmailPreference?: SortOrderInput | SortOrder
    allowWhatsappCommunication?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentProfile?: StudentProfileOrderByWithRelationInput
  }

  export type StudentContactDetailsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentProfileId?: string
    AND?: StudentContactDetailsWhereInput | StudentContactDetailsWhereInput[]
    OR?: StudentContactDetailsWhereInput[]
    NOT?: StudentContactDetailsWhereInput | StudentContactDetailsWhereInput[]
    permanentAddress?: StringNullableFilter<"StudentContactDetails"> | string | null
    currentAddress?: StringNullableFilter<"StudentContactDetails"> | string | null
    addressType?: EnumAddressTypeNullableFilter<"StudentContactDetails"> | $Enums.AddressType | null
    durationAtCurrentAddress?: StringNullableFilter<"StudentContactDetails"> | string | null
    personalMobile?: StringNullableFilter<"StudentContactDetails"> | string | null
    alternateMobile?: StringNullableFilter<"StudentContactDetails"> | string | null
    personalEmail?: StringNullableFilter<"StudentContactDetails"> | string | null
    alternateEmail?: StringNullableFilter<"StudentContactDetails"> | string | null
    whatsappNumber?: StringNullableFilter<"StudentContactDetails"> | string | null
    telegramUsername?: StringNullableFilter<"StudentContactDetails"> | string | null
    linkedInProfile?: StringNullableFilter<"StudentContactDetails"> | string | null
    githubProfile?: StringNullableFilter<"StudentContactDetails"> | string | null
    preferredContactMethod?: EnumPreferredContactMethodNullableFilter<"StudentContactDetails"> | $Enums.PreferredContactMethod | null
    preferredContactTime?: StringNullableFilter<"StudentContactDetails"> | string | null
    communicationEmailPreference?: EnumCommunicationEmailPreferenceNullableFilter<"StudentContactDetails"> | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolFilter<"StudentContactDetails"> | boolean
    createdAt?: DateTimeFilter<"StudentContactDetails"> | Date | string
    updatedAt?: DateTimeFilter<"StudentContactDetails"> | Date | string
    studentProfile?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
  }, "id" | "studentProfileId">

  export type StudentContactDetailsOrderByWithAggregationInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    permanentAddress?: SortOrderInput | SortOrder
    currentAddress?: SortOrderInput | SortOrder
    addressType?: SortOrderInput | SortOrder
    durationAtCurrentAddress?: SortOrderInput | SortOrder
    personalMobile?: SortOrderInput | SortOrder
    alternateMobile?: SortOrderInput | SortOrder
    personalEmail?: SortOrderInput | SortOrder
    alternateEmail?: SortOrderInput | SortOrder
    whatsappNumber?: SortOrderInput | SortOrder
    telegramUsername?: SortOrderInput | SortOrder
    linkedInProfile?: SortOrderInput | SortOrder
    githubProfile?: SortOrderInput | SortOrder
    preferredContactMethod?: SortOrderInput | SortOrder
    preferredContactTime?: SortOrderInput | SortOrder
    communicationEmailPreference?: SortOrderInput | SortOrder
    allowWhatsappCommunication?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentContactDetailsCountOrderByAggregateInput
    _max?: StudentContactDetailsMaxOrderByAggregateInput
    _min?: StudentContactDetailsMinOrderByAggregateInput
  }

  export type StudentContactDetailsScalarWhereWithAggregatesInput = {
    AND?: StudentContactDetailsScalarWhereWithAggregatesInput | StudentContactDetailsScalarWhereWithAggregatesInput[]
    OR?: StudentContactDetailsScalarWhereWithAggregatesInput[]
    NOT?: StudentContactDetailsScalarWhereWithAggregatesInput | StudentContactDetailsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentContactDetails"> | string
    studentProfileId?: StringWithAggregatesFilter<"StudentContactDetails"> | string
    permanentAddress?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    currentAddress?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    addressType?: EnumAddressTypeNullableWithAggregatesFilter<"StudentContactDetails"> | $Enums.AddressType | null
    durationAtCurrentAddress?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    personalMobile?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    alternateMobile?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    personalEmail?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    alternateEmail?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    whatsappNumber?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    telegramUsername?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    linkedInProfile?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    githubProfile?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    preferredContactMethod?: EnumPreferredContactMethodNullableWithAggregatesFilter<"StudentContactDetails"> | $Enums.PreferredContactMethod | null
    preferredContactTime?: StringNullableWithAggregatesFilter<"StudentContactDetails"> | string | null
    communicationEmailPreference?: EnumCommunicationEmailPreferenceNullableWithAggregatesFilter<"StudentContactDetails"> | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolWithAggregatesFilter<"StudentContactDetails"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"StudentContactDetails"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StudentContactDetails"> | Date | string
  }

  export type StudentDocumentWhereInput = {
    AND?: StudentDocumentWhereInput | StudentDocumentWhereInput[]
    OR?: StudentDocumentWhereInput[]
    NOT?: StudentDocumentWhereInput | StudentDocumentWhereInput[]
    id?: StringFilter<"StudentDocument"> | string
    studentProfileId?: StringFilter<"StudentDocument"> | string
    documentName?: StringFilter<"StudentDocument"> | string
    category?: EnumDocumentCategoryFilter<"StudentDocument"> | $Enums.DocumentCategory
    description?: StringNullableFilter<"StudentDocument"> | string | null
    fileType?: StringFilter<"StudentDocument"> | string
    fileSize?: IntFilter<"StudentDocument"> | number
    cloudinaryPublicId?: StringFilter<"StudentDocument"> | string
    fileUrl?: StringFilter<"StudentDocument"> | string
    uploadedAt?: DateTimeFilter<"StudentDocument"> | Date | string
    updatedAt?: DateTimeFilter<"StudentDocument"> | Date | string
    resourceType?: StringFilter<"StudentDocument"> | string
    studentProfile?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
  }

  export type StudentDocumentOrderByWithRelationInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    documentName?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    cloudinaryPublicId?: SortOrder
    fileUrl?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
    resourceType?: SortOrder
    studentProfile?: StudentProfileOrderByWithRelationInput
  }

  export type StudentDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StudentDocumentWhereInput | StudentDocumentWhereInput[]
    OR?: StudentDocumentWhereInput[]
    NOT?: StudentDocumentWhereInput | StudentDocumentWhereInput[]
    studentProfileId?: StringFilter<"StudentDocument"> | string
    documentName?: StringFilter<"StudentDocument"> | string
    category?: EnumDocumentCategoryFilter<"StudentDocument"> | $Enums.DocumentCategory
    description?: StringNullableFilter<"StudentDocument"> | string | null
    fileType?: StringFilter<"StudentDocument"> | string
    fileSize?: IntFilter<"StudentDocument"> | number
    cloudinaryPublicId?: StringFilter<"StudentDocument"> | string
    fileUrl?: StringFilter<"StudentDocument"> | string
    uploadedAt?: DateTimeFilter<"StudentDocument"> | Date | string
    updatedAt?: DateTimeFilter<"StudentDocument"> | Date | string
    resourceType?: StringFilter<"StudentDocument"> | string
    studentProfile?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
  }, "id">

  export type StudentDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    documentName?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    cloudinaryPublicId?: SortOrder
    fileUrl?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
    resourceType?: SortOrder
    _count?: StudentDocumentCountOrderByAggregateInput
    _avg?: StudentDocumentAvgOrderByAggregateInput
    _max?: StudentDocumentMaxOrderByAggregateInput
    _min?: StudentDocumentMinOrderByAggregateInput
    _sum?: StudentDocumentSumOrderByAggregateInput
  }

  export type StudentDocumentScalarWhereWithAggregatesInput = {
    AND?: StudentDocumentScalarWhereWithAggregatesInput | StudentDocumentScalarWhereWithAggregatesInput[]
    OR?: StudentDocumentScalarWhereWithAggregatesInput[]
    NOT?: StudentDocumentScalarWhereWithAggregatesInput | StudentDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentDocument"> | string
    studentProfileId?: StringWithAggregatesFilter<"StudentDocument"> | string
    documentName?: StringWithAggregatesFilter<"StudentDocument"> | string
    category?: EnumDocumentCategoryWithAggregatesFilter<"StudentDocument"> | $Enums.DocumentCategory
    description?: StringNullableWithAggregatesFilter<"StudentDocument"> | string | null
    fileType?: StringWithAggregatesFilter<"StudentDocument"> | string
    fileSize?: IntWithAggregatesFilter<"StudentDocument"> | number
    cloudinaryPublicId?: StringWithAggregatesFilter<"StudentDocument"> | string
    fileUrl?: StringWithAggregatesFilter<"StudentDocument"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"StudentDocument"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StudentDocument"> | Date | string
    resourceType?: StringWithAggregatesFilter<"StudentDocument"> | string
  }

  export type AcademicSemesterWhereInput = {
    AND?: AcademicSemesterWhereInput | AcademicSemesterWhereInput[]
    OR?: AcademicSemesterWhereInput[]
    NOT?: AcademicSemesterWhereInput | AcademicSemesterWhereInput[]
    id?: StringFilter<"AcademicSemester"> | string
    studentProfileId?: StringFilter<"AcademicSemester"> | string
    semesterNumber?: IntFilter<"AcademicSemester"> | number
    academicYear?: StringNullableFilter<"AcademicSemester"> | string | null
    term?: StringNullableFilter<"AcademicSemester"> | string | null
    status?: EnumAcademicSemesterStatusFilter<"AcademicSemester"> | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFilter<"AcademicSemester"> | $Enums.AcademicEntryStatus
    sgpa?: FloatNullableFilter<"AcademicSemester"> | number | null
    totalCredits?: IntFilter<"AcademicSemester"> | number
    creditsEarned?: IntFilter<"AcademicSemester"> | number
    backlogs?: IntFilter<"AcademicSemester"> | number
    createdAt?: DateTimeFilter<"AcademicSemester"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicSemester"> | Date | string
    studentProfile?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
    subjects?: AcademicSubjectListRelationFilter
  }

  export type AcademicSemesterOrderByWithRelationInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    semesterNumber?: SortOrder
    academicYear?: SortOrderInput | SortOrder
    term?: SortOrderInput | SortOrder
    status?: SortOrder
    entryStatus?: SortOrder
    sgpa?: SortOrderInput | SortOrder
    totalCredits?: SortOrder
    creditsEarned?: SortOrder
    backlogs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentProfile?: StudentProfileOrderByWithRelationInput
    subjects?: AcademicSubjectOrderByRelationAggregateInput
  }

  export type AcademicSemesterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentProfileId_semesterNumber?: AcademicSemesterStudentProfileIdSemesterNumberCompoundUniqueInput
    AND?: AcademicSemesterWhereInput | AcademicSemesterWhereInput[]
    OR?: AcademicSemesterWhereInput[]
    NOT?: AcademicSemesterWhereInput | AcademicSemesterWhereInput[]
    studentProfileId?: StringFilter<"AcademicSemester"> | string
    semesterNumber?: IntFilter<"AcademicSemester"> | number
    academicYear?: StringNullableFilter<"AcademicSemester"> | string | null
    term?: StringNullableFilter<"AcademicSemester"> | string | null
    status?: EnumAcademicSemesterStatusFilter<"AcademicSemester"> | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFilter<"AcademicSemester"> | $Enums.AcademicEntryStatus
    sgpa?: FloatNullableFilter<"AcademicSemester"> | number | null
    totalCredits?: IntFilter<"AcademicSemester"> | number
    creditsEarned?: IntFilter<"AcademicSemester"> | number
    backlogs?: IntFilter<"AcademicSemester"> | number
    createdAt?: DateTimeFilter<"AcademicSemester"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicSemester"> | Date | string
    studentProfile?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
    subjects?: AcademicSubjectListRelationFilter
  }, "id" | "studentProfileId_semesterNumber">

  export type AcademicSemesterOrderByWithAggregationInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    semesterNumber?: SortOrder
    academicYear?: SortOrderInput | SortOrder
    term?: SortOrderInput | SortOrder
    status?: SortOrder
    entryStatus?: SortOrder
    sgpa?: SortOrderInput | SortOrder
    totalCredits?: SortOrder
    creditsEarned?: SortOrder
    backlogs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AcademicSemesterCountOrderByAggregateInput
    _avg?: AcademicSemesterAvgOrderByAggregateInput
    _max?: AcademicSemesterMaxOrderByAggregateInput
    _min?: AcademicSemesterMinOrderByAggregateInput
    _sum?: AcademicSemesterSumOrderByAggregateInput
  }

  export type AcademicSemesterScalarWhereWithAggregatesInput = {
    AND?: AcademicSemesterScalarWhereWithAggregatesInput | AcademicSemesterScalarWhereWithAggregatesInput[]
    OR?: AcademicSemesterScalarWhereWithAggregatesInput[]
    NOT?: AcademicSemesterScalarWhereWithAggregatesInput | AcademicSemesterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcademicSemester"> | string
    studentProfileId?: StringWithAggregatesFilter<"AcademicSemester"> | string
    semesterNumber?: IntWithAggregatesFilter<"AcademicSemester"> | number
    academicYear?: StringNullableWithAggregatesFilter<"AcademicSemester"> | string | null
    term?: StringNullableWithAggregatesFilter<"AcademicSemester"> | string | null
    status?: EnumAcademicSemesterStatusWithAggregatesFilter<"AcademicSemester"> | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusWithAggregatesFilter<"AcademicSemester"> | $Enums.AcademicEntryStatus
    sgpa?: FloatNullableWithAggregatesFilter<"AcademicSemester"> | number | null
    totalCredits?: IntWithAggregatesFilter<"AcademicSemester"> | number
    creditsEarned?: IntWithAggregatesFilter<"AcademicSemester"> | number
    backlogs?: IntWithAggregatesFilter<"AcademicSemester"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AcademicSemester"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcademicSemester"> | Date | string
  }

  export type AcademicSubjectWhereInput = {
    AND?: AcademicSubjectWhereInput | AcademicSubjectWhereInput[]
    OR?: AcademicSubjectWhereInput[]
    NOT?: AcademicSubjectWhereInput | AcademicSubjectWhereInput[]
    id?: StringFilter<"AcademicSubject"> | string
    academicSemesterId?: StringFilter<"AcademicSubject"> | string
    courseCode?: StringFilter<"AcademicSubject"> | string
    courseName?: StringFilter<"AcademicSubject"> | string
    credits?: IntFilter<"AcademicSubject"> | number
    cia1?: FloatNullableFilter<"AcademicSubject"> | number | null
    cia2?: FloatNullableFilter<"AcademicSubject"> | number | null
    cia3?: FloatNullableFilter<"AcademicSubject"> | number | null
    mse?: FloatNullableFilter<"AcademicSubject"> | number | null
    ese?: FloatNullableFilter<"AcademicSubject"> | number | null
    maximumMarks?: FloatNullableFilter<"AcademicSubject"> | number | null
    totalMarksObtained?: FloatNullableFilter<"AcademicSubject"> | number | null
    grade?: StringNullableFilter<"AcademicSubject"> | string | null
    gradePoint?: FloatNullableFilter<"AcademicSubject"> | number | null
    attendance?: FloatNullableFilter<"AcademicSubject"> | number | null
    createdAt?: DateTimeFilter<"AcademicSubject"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicSubject"> | Date | string
    classesAttended?: IntFilter<"AcademicSubject"> | number
    classesHeld?: IntFilter<"AcademicSubject"> | number
    academicSemester?: XOR<AcademicSemesterScalarRelationFilter, AcademicSemesterWhereInput>
  }

  export type AcademicSubjectOrderByWithRelationInput = {
    id?: SortOrder
    academicSemesterId?: SortOrder
    courseCode?: SortOrder
    courseName?: SortOrder
    credits?: SortOrder
    cia1?: SortOrderInput | SortOrder
    cia2?: SortOrderInput | SortOrder
    cia3?: SortOrderInput | SortOrder
    mse?: SortOrderInput | SortOrder
    ese?: SortOrderInput | SortOrder
    maximumMarks?: SortOrderInput | SortOrder
    totalMarksObtained?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    gradePoint?: SortOrderInput | SortOrder
    attendance?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classesAttended?: SortOrder
    classesHeld?: SortOrder
    academicSemester?: AcademicSemesterOrderByWithRelationInput
  }

  export type AcademicSubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AcademicSubjectWhereInput | AcademicSubjectWhereInput[]
    OR?: AcademicSubjectWhereInput[]
    NOT?: AcademicSubjectWhereInput | AcademicSubjectWhereInput[]
    academicSemesterId?: StringFilter<"AcademicSubject"> | string
    courseCode?: StringFilter<"AcademicSubject"> | string
    courseName?: StringFilter<"AcademicSubject"> | string
    credits?: IntFilter<"AcademicSubject"> | number
    cia1?: FloatNullableFilter<"AcademicSubject"> | number | null
    cia2?: FloatNullableFilter<"AcademicSubject"> | number | null
    cia3?: FloatNullableFilter<"AcademicSubject"> | number | null
    mse?: FloatNullableFilter<"AcademicSubject"> | number | null
    ese?: FloatNullableFilter<"AcademicSubject"> | number | null
    maximumMarks?: FloatNullableFilter<"AcademicSubject"> | number | null
    totalMarksObtained?: FloatNullableFilter<"AcademicSubject"> | number | null
    grade?: StringNullableFilter<"AcademicSubject"> | string | null
    gradePoint?: FloatNullableFilter<"AcademicSubject"> | number | null
    attendance?: FloatNullableFilter<"AcademicSubject"> | number | null
    createdAt?: DateTimeFilter<"AcademicSubject"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicSubject"> | Date | string
    classesAttended?: IntFilter<"AcademicSubject"> | number
    classesHeld?: IntFilter<"AcademicSubject"> | number
    academicSemester?: XOR<AcademicSemesterScalarRelationFilter, AcademicSemesterWhereInput>
  }, "id">

  export type AcademicSubjectOrderByWithAggregationInput = {
    id?: SortOrder
    academicSemesterId?: SortOrder
    courseCode?: SortOrder
    courseName?: SortOrder
    credits?: SortOrder
    cia1?: SortOrderInput | SortOrder
    cia2?: SortOrderInput | SortOrder
    cia3?: SortOrderInput | SortOrder
    mse?: SortOrderInput | SortOrder
    ese?: SortOrderInput | SortOrder
    maximumMarks?: SortOrderInput | SortOrder
    totalMarksObtained?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    gradePoint?: SortOrderInput | SortOrder
    attendance?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classesAttended?: SortOrder
    classesHeld?: SortOrder
    _count?: AcademicSubjectCountOrderByAggregateInput
    _avg?: AcademicSubjectAvgOrderByAggregateInput
    _max?: AcademicSubjectMaxOrderByAggregateInput
    _min?: AcademicSubjectMinOrderByAggregateInput
    _sum?: AcademicSubjectSumOrderByAggregateInput
  }

  export type AcademicSubjectScalarWhereWithAggregatesInput = {
    AND?: AcademicSubjectScalarWhereWithAggregatesInput | AcademicSubjectScalarWhereWithAggregatesInput[]
    OR?: AcademicSubjectScalarWhereWithAggregatesInput[]
    NOT?: AcademicSubjectScalarWhereWithAggregatesInput | AcademicSubjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcademicSubject"> | string
    academicSemesterId?: StringWithAggregatesFilter<"AcademicSubject"> | string
    courseCode?: StringWithAggregatesFilter<"AcademicSubject"> | string
    courseName?: StringWithAggregatesFilter<"AcademicSubject"> | string
    credits?: IntWithAggregatesFilter<"AcademicSubject"> | number
    cia1?: FloatNullableWithAggregatesFilter<"AcademicSubject"> | number | null
    cia2?: FloatNullableWithAggregatesFilter<"AcademicSubject"> | number | null
    cia3?: FloatNullableWithAggregatesFilter<"AcademicSubject"> | number | null
    mse?: FloatNullableWithAggregatesFilter<"AcademicSubject"> | number | null
    ese?: FloatNullableWithAggregatesFilter<"AcademicSubject"> | number | null
    maximumMarks?: FloatNullableWithAggregatesFilter<"AcademicSubject"> | number | null
    totalMarksObtained?: FloatNullableWithAggregatesFilter<"AcademicSubject"> | number | null
    grade?: StringNullableWithAggregatesFilter<"AcademicSubject"> | string | null
    gradePoint?: FloatNullableWithAggregatesFilter<"AcademicSubject"> | number | null
    attendance?: FloatNullableWithAggregatesFilter<"AcademicSubject"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"AcademicSubject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcademicSubject"> | Date | string
    classesAttended?: IntWithAggregatesFilter<"AcademicSubject"> | number
    classesHeld?: IntWithAggregatesFilter<"AcademicSubject"> | number
  }

  export type AcademicBacklogWhereInput = {
    AND?: AcademicBacklogWhereInput | AcademicBacklogWhereInput[]
    OR?: AcademicBacklogWhereInput[]
    NOT?: AcademicBacklogWhereInput | AcademicBacklogWhereInput[]
    id?: StringFilter<"AcademicBacklog"> | string
    studentProfileId?: StringFilter<"AcademicBacklog"> | string
    subjectCode?: StringFilter<"AcademicBacklog"> | string
    subjectName?: StringFilter<"AcademicBacklog"> | string
    semesterNumber?: IntFilter<"AcademicBacklog"> | number
    status?: EnumAcademicBacklogStatusFilter<"AcademicBacklog"> | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: IntNullableFilter<"AcademicBacklog"> | number | null
    clearedGrade?: StringNullableFilter<"AcademicBacklog"> | string | null
    clearedMarks?: FloatNullableFilter<"AcademicBacklog"> | number | null
    clearedAt?: DateTimeNullableFilter<"AcademicBacklog"> | Date | string | null
    createdAt?: DateTimeFilter<"AcademicBacklog"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicBacklog"> | Date | string
    studentProfile?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
  }

  export type AcademicBacklogOrderByWithRelationInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    subjectCode?: SortOrder
    subjectName?: SortOrder
    semesterNumber?: SortOrder
    status?: SortOrder
    clearedSemesterNumber?: SortOrderInput | SortOrder
    clearedGrade?: SortOrderInput | SortOrder
    clearedMarks?: SortOrderInput | SortOrder
    clearedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentProfile?: StudentProfileOrderByWithRelationInput
  }

  export type AcademicBacklogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AcademicBacklogWhereInput | AcademicBacklogWhereInput[]
    OR?: AcademicBacklogWhereInput[]
    NOT?: AcademicBacklogWhereInput | AcademicBacklogWhereInput[]
    studentProfileId?: StringFilter<"AcademicBacklog"> | string
    subjectCode?: StringFilter<"AcademicBacklog"> | string
    subjectName?: StringFilter<"AcademicBacklog"> | string
    semesterNumber?: IntFilter<"AcademicBacklog"> | number
    status?: EnumAcademicBacklogStatusFilter<"AcademicBacklog"> | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: IntNullableFilter<"AcademicBacklog"> | number | null
    clearedGrade?: StringNullableFilter<"AcademicBacklog"> | string | null
    clearedMarks?: FloatNullableFilter<"AcademicBacklog"> | number | null
    clearedAt?: DateTimeNullableFilter<"AcademicBacklog"> | Date | string | null
    createdAt?: DateTimeFilter<"AcademicBacklog"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicBacklog"> | Date | string
    studentProfile?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
  }, "id">

  export type AcademicBacklogOrderByWithAggregationInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    subjectCode?: SortOrder
    subjectName?: SortOrder
    semesterNumber?: SortOrder
    status?: SortOrder
    clearedSemesterNumber?: SortOrderInput | SortOrder
    clearedGrade?: SortOrderInput | SortOrder
    clearedMarks?: SortOrderInput | SortOrder
    clearedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AcademicBacklogCountOrderByAggregateInput
    _avg?: AcademicBacklogAvgOrderByAggregateInput
    _max?: AcademicBacklogMaxOrderByAggregateInput
    _min?: AcademicBacklogMinOrderByAggregateInput
    _sum?: AcademicBacklogSumOrderByAggregateInput
  }

  export type AcademicBacklogScalarWhereWithAggregatesInput = {
    AND?: AcademicBacklogScalarWhereWithAggregatesInput | AcademicBacklogScalarWhereWithAggregatesInput[]
    OR?: AcademicBacklogScalarWhereWithAggregatesInput[]
    NOT?: AcademicBacklogScalarWhereWithAggregatesInput | AcademicBacklogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcademicBacklog"> | string
    studentProfileId?: StringWithAggregatesFilter<"AcademicBacklog"> | string
    subjectCode?: StringWithAggregatesFilter<"AcademicBacklog"> | string
    subjectName?: StringWithAggregatesFilter<"AcademicBacklog"> | string
    semesterNumber?: IntWithAggregatesFilter<"AcademicBacklog"> | number
    status?: EnumAcademicBacklogStatusWithAggregatesFilter<"AcademicBacklog"> | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: IntNullableWithAggregatesFilter<"AcademicBacklog"> | number | null
    clearedGrade?: StringNullableWithAggregatesFilter<"AcademicBacklog"> | string | null
    clearedMarks?: FloatNullableWithAggregatesFilter<"AcademicBacklog"> | number | null
    clearedAt?: DateTimeNullableWithAggregatesFilter<"AcademicBacklog"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AcademicBacklog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcademicBacklog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProfile?: StudentProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProfile?: StudentProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProfile?: StudentProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProfile?: StudentProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentProfileCreateInput = {
    id?: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogCreateNestedManyWithoutStudentProfileInput
    academicSemesters?: AcademicSemesterCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsCreateNestedOneWithoutStudentProfileInput
    documents?: StudentDocumentCreateNestedManyWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsCreateNestedOneWithoutStudentProfileInput
    user: UserCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileUncheckedCreateInput = {
    id?: string
    userId: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogUncheckedCreateNestedManyWithoutStudentProfileInput
    academicSemesters?: AcademicSemesterUncheckedCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
    documents?: StudentDocumentUncheckedCreateNestedManyWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUpdateManyWithoutStudentProfileNestedInput
    academicSemesters?: AcademicSemesterUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUpdateOneWithoutStudentProfileNestedInput
    documents?: StudentDocumentUpdateManyWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUpdateOneWithoutStudentProfileNestedInput
    user?: UserUpdateOneRequiredWithoutStudentProfileNestedInput
  }

  export type StudentProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUncheckedUpdateManyWithoutStudentProfileNestedInput
    academicSemesters?: AcademicSemesterUncheckedUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
    documents?: StudentDocumentUncheckedUpdateManyWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
  }

  export type StudentProfileCreateManyInput = {
    id?: string
    userId: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
  }

  export type StudentProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StudentProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StudentParentDetailsCreateInput = {
    id?: string
    fatherName?: string | null
    fatherOccupation?: string | null
    fatherCompany?: string | null
    fatherAnnualIncome?: string | null
    fatherQualification?: string | null
    fatherEmail?: string | null
    fatherPhone?: string | null
    fatherAddress?: string | null
    motherName?: string | null
    motherOccupation?: string | null
    motherQualification?: string | null
    motherAnnualIncome?: string | null
    motherEmail?: string | null
    motherPhone?: string | null
    motherAddress?: string | null
    guardianName?: string | null
    guardianRelationship?: string | null
    guardianPhone?: string | null
    guardianAlternatePhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProfile: StudentProfileCreateNestedOneWithoutParentDetailsInput
  }

  export type StudentParentDetailsUncheckedCreateInput = {
    id?: string
    studentProfileId: string
    fatherName?: string | null
    fatherOccupation?: string | null
    fatherCompany?: string | null
    fatherAnnualIncome?: string | null
    fatherQualification?: string | null
    fatherEmail?: string | null
    fatherPhone?: string | null
    fatherAddress?: string | null
    motherName?: string | null
    motherOccupation?: string | null
    motherQualification?: string | null
    motherAnnualIncome?: string | null
    motherEmail?: string | null
    motherPhone?: string | null
    motherAddress?: string | null
    guardianName?: string | null
    guardianRelationship?: string | null
    guardianPhone?: string | null
    guardianAlternatePhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentParentDetailsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    fatherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    fatherCompany?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    fatherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    fatherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    fatherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    motherName?: NullableStringFieldUpdateOperationsInput | string | null
    motherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    motherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    motherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    motherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    motherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    motherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianRelationship?: NullableStringFieldUpdateOperationsInput | string | null
    guardianPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guardianAlternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProfile?: StudentProfileUpdateOneRequiredWithoutParentDetailsNestedInput
  }

  export type StudentParentDetailsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    fatherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    fatherCompany?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    fatherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    fatherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    fatherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    motherName?: NullableStringFieldUpdateOperationsInput | string | null
    motherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    motherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    motherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    motherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    motherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    motherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianRelationship?: NullableStringFieldUpdateOperationsInput | string | null
    guardianPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guardianAlternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentParentDetailsCreateManyInput = {
    id?: string
    studentProfileId: string
    fatherName?: string | null
    fatherOccupation?: string | null
    fatherCompany?: string | null
    fatherAnnualIncome?: string | null
    fatherQualification?: string | null
    fatherEmail?: string | null
    fatherPhone?: string | null
    fatherAddress?: string | null
    motherName?: string | null
    motherOccupation?: string | null
    motherQualification?: string | null
    motherAnnualIncome?: string | null
    motherEmail?: string | null
    motherPhone?: string | null
    motherAddress?: string | null
    guardianName?: string | null
    guardianRelationship?: string | null
    guardianPhone?: string | null
    guardianAlternatePhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentParentDetailsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    fatherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    fatherCompany?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    fatherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    fatherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    fatherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    motherName?: NullableStringFieldUpdateOperationsInput | string | null
    motherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    motherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    motherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    motherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    motherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    motherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianRelationship?: NullableStringFieldUpdateOperationsInput | string | null
    guardianPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guardianAlternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentParentDetailsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    fatherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    fatherCompany?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    fatherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    fatherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    fatherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    motherName?: NullableStringFieldUpdateOperationsInput | string | null
    motherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    motherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    motherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    motherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    motherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    motherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianRelationship?: NullableStringFieldUpdateOperationsInput | string | null
    guardianPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guardianAlternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentContactDetailsCreateInput = {
    id?: string
    permanentAddress?: string | null
    currentAddress?: string | null
    addressType?: $Enums.AddressType | null
    durationAtCurrentAddress?: string | null
    personalMobile?: string | null
    alternateMobile?: string | null
    personalEmail?: string | null
    alternateEmail?: string | null
    whatsappNumber?: string | null
    telegramUsername?: string | null
    linkedInProfile?: string | null
    githubProfile?: string | null
    preferredContactMethod?: $Enums.PreferredContactMethod | null
    preferredContactTime?: string | null
    communicationEmailPreference?: $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProfile: StudentProfileCreateNestedOneWithoutContactDetailsInput
  }

  export type StudentContactDetailsUncheckedCreateInput = {
    id?: string
    studentProfileId: string
    permanentAddress?: string | null
    currentAddress?: string | null
    addressType?: $Enums.AddressType | null
    durationAtCurrentAddress?: string | null
    personalMobile?: string | null
    alternateMobile?: string | null
    personalEmail?: string | null
    alternateEmail?: string | null
    whatsappNumber?: string | null
    telegramUsername?: string | null
    linkedInProfile?: string | null
    githubProfile?: string | null
    preferredContactMethod?: $Enums.PreferredContactMethod | null
    preferredContactTime?: string | null
    communicationEmailPreference?: $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentContactDetailsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    addressType?: NullableEnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType | null
    durationAtCurrentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personalMobile?: NullableStringFieldUpdateOperationsInput | string | null
    alternateMobile?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInProfile?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContactMethod?: NullableEnumPreferredContactMethodFieldUpdateOperationsInput | $Enums.PreferredContactMethod | null
    preferredContactTime?: NullableStringFieldUpdateOperationsInput | string | null
    communicationEmailPreference?: NullableEnumCommunicationEmailPreferenceFieldUpdateOperationsInput | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProfile?: StudentProfileUpdateOneRequiredWithoutContactDetailsNestedInput
  }

  export type StudentContactDetailsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    addressType?: NullableEnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType | null
    durationAtCurrentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personalMobile?: NullableStringFieldUpdateOperationsInput | string | null
    alternateMobile?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInProfile?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContactMethod?: NullableEnumPreferredContactMethodFieldUpdateOperationsInput | $Enums.PreferredContactMethod | null
    preferredContactTime?: NullableStringFieldUpdateOperationsInput | string | null
    communicationEmailPreference?: NullableEnumCommunicationEmailPreferenceFieldUpdateOperationsInput | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentContactDetailsCreateManyInput = {
    id?: string
    studentProfileId: string
    permanentAddress?: string | null
    currentAddress?: string | null
    addressType?: $Enums.AddressType | null
    durationAtCurrentAddress?: string | null
    personalMobile?: string | null
    alternateMobile?: string | null
    personalEmail?: string | null
    alternateEmail?: string | null
    whatsappNumber?: string | null
    telegramUsername?: string | null
    linkedInProfile?: string | null
    githubProfile?: string | null
    preferredContactMethod?: $Enums.PreferredContactMethod | null
    preferredContactTime?: string | null
    communicationEmailPreference?: $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentContactDetailsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    addressType?: NullableEnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType | null
    durationAtCurrentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personalMobile?: NullableStringFieldUpdateOperationsInput | string | null
    alternateMobile?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInProfile?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContactMethod?: NullableEnumPreferredContactMethodFieldUpdateOperationsInput | $Enums.PreferredContactMethod | null
    preferredContactTime?: NullableStringFieldUpdateOperationsInput | string | null
    communicationEmailPreference?: NullableEnumCommunicationEmailPreferenceFieldUpdateOperationsInput | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentContactDetailsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    addressType?: NullableEnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType | null
    durationAtCurrentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personalMobile?: NullableStringFieldUpdateOperationsInput | string | null
    alternateMobile?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInProfile?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContactMethod?: NullableEnumPreferredContactMethodFieldUpdateOperationsInput | $Enums.PreferredContactMethod | null
    preferredContactTime?: NullableStringFieldUpdateOperationsInput | string | null
    communicationEmailPreference?: NullableEnumCommunicationEmailPreferenceFieldUpdateOperationsInput | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentDocumentCreateInput = {
    id?: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt?: Date | string
    resourceType: string
    studentProfile: StudentProfileCreateNestedOneWithoutDocumentsInput
  }

  export type StudentDocumentUncheckedCreateInput = {
    id?: string
    studentProfileId: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt?: Date | string
    resourceType: string
  }

  export type StudentDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentName?: StringFieldUpdateOperationsInput | string
    category?: EnumDocumentCategoryFieldUpdateOperationsInput | $Enums.DocumentCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    cloudinaryPublicId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resourceType?: StringFieldUpdateOperationsInput | string
    studentProfile?: StudentProfileUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type StudentDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    documentName?: StringFieldUpdateOperationsInput | string
    category?: EnumDocumentCategoryFieldUpdateOperationsInput | $Enums.DocumentCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    cloudinaryPublicId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resourceType?: StringFieldUpdateOperationsInput | string
  }

  export type StudentDocumentCreateManyInput = {
    id?: string
    studentProfileId: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt?: Date | string
    resourceType: string
  }

  export type StudentDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentName?: StringFieldUpdateOperationsInput | string
    category?: EnumDocumentCategoryFieldUpdateOperationsInput | $Enums.DocumentCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    cloudinaryPublicId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resourceType?: StringFieldUpdateOperationsInput | string
  }

  export type StudentDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    documentName?: StringFieldUpdateOperationsInput | string
    category?: EnumDocumentCategoryFieldUpdateOperationsInput | $Enums.DocumentCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    cloudinaryPublicId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resourceType?: StringFieldUpdateOperationsInput | string
  }

  export type AcademicSemesterCreateInput = {
    id?: string
    semesterNumber: number
    academicYear?: string | null
    term?: string | null
    status?: $Enums.AcademicSemesterStatus
    entryStatus?: $Enums.AcademicEntryStatus
    sgpa?: number | null
    totalCredits?: number
    creditsEarned?: number
    backlogs?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProfile: StudentProfileCreateNestedOneWithoutAcademicSemestersInput
    subjects?: AcademicSubjectCreateNestedManyWithoutAcademicSemesterInput
  }

  export type AcademicSemesterUncheckedCreateInput = {
    id?: string
    studentProfileId: string
    semesterNumber: number
    academicYear?: string | null
    term?: string | null
    status?: $Enums.AcademicSemesterStatus
    entryStatus?: $Enums.AcademicEntryStatus
    sgpa?: number | null
    totalCredits?: number
    creditsEarned?: number
    backlogs?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: AcademicSubjectUncheckedCreateNestedManyWithoutAcademicSemesterInput
  }

  export type AcademicSemesterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAcademicSemesterStatusFieldUpdateOperationsInput | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFieldUpdateOperationsInput | $Enums.AcademicEntryStatus
    sgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCredits?: IntFieldUpdateOperationsInput | number
    creditsEarned?: IntFieldUpdateOperationsInput | number
    backlogs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProfile?: StudentProfileUpdateOneRequiredWithoutAcademicSemestersNestedInput
    subjects?: AcademicSubjectUpdateManyWithoutAcademicSemesterNestedInput
  }

  export type AcademicSemesterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAcademicSemesterStatusFieldUpdateOperationsInput | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFieldUpdateOperationsInput | $Enums.AcademicEntryStatus
    sgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCredits?: IntFieldUpdateOperationsInput | number
    creditsEarned?: IntFieldUpdateOperationsInput | number
    backlogs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: AcademicSubjectUncheckedUpdateManyWithoutAcademicSemesterNestedInput
  }

  export type AcademicSemesterCreateManyInput = {
    id?: string
    studentProfileId: string
    semesterNumber: number
    academicYear?: string | null
    term?: string | null
    status?: $Enums.AcademicSemesterStatus
    entryStatus?: $Enums.AcademicEntryStatus
    sgpa?: number | null
    totalCredits?: number
    creditsEarned?: number
    backlogs?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicSemesterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAcademicSemesterStatusFieldUpdateOperationsInput | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFieldUpdateOperationsInput | $Enums.AcademicEntryStatus
    sgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCredits?: IntFieldUpdateOperationsInput | number
    creditsEarned?: IntFieldUpdateOperationsInput | number
    backlogs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicSemesterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAcademicSemesterStatusFieldUpdateOperationsInput | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFieldUpdateOperationsInput | $Enums.AcademicEntryStatus
    sgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCredits?: IntFieldUpdateOperationsInput | number
    creditsEarned?: IntFieldUpdateOperationsInput | number
    backlogs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicSubjectCreateInput = {
    id?: string
    courseCode: string
    courseName: string
    credits: number
    cia1?: number | null
    cia2?: number | null
    cia3?: number | null
    mse?: number | null
    ese?: number | null
    maximumMarks?: number | null
    totalMarksObtained?: number | null
    grade?: string | null
    gradePoint?: number | null
    attendance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classesAttended?: number
    classesHeld?: number
    academicSemester: AcademicSemesterCreateNestedOneWithoutSubjectsInput
  }

  export type AcademicSubjectUncheckedCreateInput = {
    id?: string
    academicSemesterId: string
    courseCode: string
    courseName: string
    credits: number
    cia1?: number | null
    cia2?: number | null
    cia3?: number | null
    mse?: number | null
    ese?: number | null
    maximumMarks?: number | null
    totalMarksObtained?: number | null
    grade?: string | null
    gradePoint?: number | null
    attendance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classesAttended?: number
    classesHeld?: number
  }

  export type AcademicSubjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    courseName?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    cia1?: NullableFloatFieldUpdateOperationsInput | number | null
    cia2?: NullableFloatFieldUpdateOperationsInput | number | null
    cia3?: NullableFloatFieldUpdateOperationsInput | number | null
    mse?: NullableFloatFieldUpdateOperationsInput | number | null
    ese?: NullableFloatFieldUpdateOperationsInput | number | null
    maximumMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    totalMarksObtained?: NullableFloatFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    gradePoint?: NullableFloatFieldUpdateOperationsInput | number | null
    attendance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesAttended?: IntFieldUpdateOperationsInput | number
    classesHeld?: IntFieldUpdateOperationsInput | number
    academicSemester?: AcademicSemesterUpdateOneRequiredWithoutSubjectsNestedInput
  }

  export type AcademicSubjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    academicSemesterId?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    courseName?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    cia1?: NullableFloatFieldUpdateOperationsInput | number | null
    cia2?: NullableFloatFieldUpdateOperationsInput | number | null
    cia3?: NullableFloatFieldUpdateOperationsInput | number | null
    mse?: NullableFloatFieldUpdateOperationsInput | number | null
    ese?: NullableFloatFieldUpdateOperationsInput | number | null
    maximumMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    totalMarksObtained?: NullableFloatFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    gradePoint?: NullableFloatFieldUpdateOperationsInput | number | null
    attendance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesAttended?: IntFieldUpdateOperationsInput | number
    classesHeld?: IntFieldUpdateOperationsInput | number
  }

  export type AcademicSubjectCreateManyInput = {
    id?: string
    academicSemesterId: string
    courseCode: string
    courseName: string
    credits: number
    cia1?: number | null
    cia2?: number | null
    cia3?: number | null
    mse?: number | null
    ese?: number | null
    maximumMarks?: number | null
    totalMarksObtained?: number | null
    grade?: string | null
    gradePoint?: number | null
    attendance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classesAttended?: number
    classesHeld?: number
  }

  export type AcademicSubjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    courseName?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    cia1?: NullableFloatFieldUpdateOperationsInput | number | null
    cia2?: NullableFloatFieldUpdateOperationsInput | number | null
    cia3?: NullableFloatFieldUpdateOperationsInput | number | null
    mse?: NullableFloatFieldUpdateOperationsInput | number | null
    ese?: NullableFloatFieldUpdateOperationsInput | number | null
    maximumMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    totalMarksObtained?: NullableFloatFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    gradePoint?: NullableFloatFieldUpdateOperationsInput | number | null
    attendance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesAttended?: IntFieldUpdateOperationsInput | number
    classesHeld?: IntFieldUpdateOperationsInput | number
  }

  export type AcademicSubjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    academicSemesterId?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    courseName?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    cia1?: NullableFloatFieldUpdateOperationsInput | number | null
    cia2?: NullableFloatFieldUpdateOperationsInput | number | null
    cia3?: NullableFloatFieldUpdateOperationsInput | number | null
    mse?: NullableFloatFieldUpdateOperationsInput | number | null
    ese?: NullableFloatFieldUpdateOperationsInput | number | null
    maximumMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    totalMarksObtained?: NullableFloatFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    gradePoint?: NullableFloatFieldUpdateOperationsInput | number | null
    attendance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesAttended?: IntFieldUpdateOperationsInput | number
    classesHeld?: IntFieldUpdateOperationsInput | number
  }

  export type AcademicBacklogCreateInput = {
    id?: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status?: $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: number | null
    clearedGrade?: string | null
    clearedMarks?: number | null
    clearedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProfile: StudentProfileCreateNestedOneWithoutAcademicBacklogsInput
  }

  export type AcademicBacklogUncheckedCreateInput = {
    id?: string
    studentProfileId: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status?: $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: number | null
    clearedGrade?: string | null
    clearedMarks?: number | null
    clearedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicBacklogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjectCode?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAcademicBacklogStatusFieldUpdateOperationsInput | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    clearedGrade?: NullableStringFieldUpdateOperationsInput | string | null
    clearedMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    clearedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProfile?: StudentProfileUpdateOneRequiredWithoutAcademicBacklogsNestedInput
  }

  export type AcademicBacklogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    subjectCode?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAcademicBacklogStatusFieldUpdateOperationsInput | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    clearedGrade?: NullableStringFieldUpdateOperationsInput | string | null
    clearedMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    clearedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicBacklogCreateManyInput = {
    id?: string
    studentProfileId: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status?: $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: number | null
    clearedGrade?: string | null
    clearedMarks?: number | null
    clearedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicBacklogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjectCode?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAcademicBacklogStatusFieldUpdateOperationsInput | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    clearedGrade?: NullableStringFieldUpdateOperationsInput | string | null
    clearedMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    clearedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicBacklogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    subjectCode?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAcademicBacklogStatusFieldUpdateOperationsInput | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    clearedGrade?: NullableStringFieldUpdateOperationsInput | string | null
    clearedMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    clearedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StudentProfileNullableScalarRelationFilter = {
    is?: StudentProfileWhereInput | null
    isNot?: StudentProfileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
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
  }

  export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type EnumBloodGroupNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.BloodGroup | EnumBloodGroupFieldRefInput<$PrismaModel> | null
    in?: $Enums.BloodGroup[] | ListEnumBloodGroupFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BloodGroup[] | ListEnumBloodGroupFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBloodGroupNullableFilter<$PrismaModel> | $Enums.BloodGroup | null
  }

  export type EnumStudentTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentType | EnumStudentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.StudentType[] | ListEnumStudentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StudentType[] | ListEnumStudentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStudentTypeNullableFilter<$PrismaModel> | $Enums.StudentType | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AcademicBacklogListRelationFilter = {
    every?: AcademicBacklogWhereInput
    some?: AcademicBacklogWhereInput
    none?: AcademicBacklogWhereInput
  }

  export type AcademicSemesterListRelationFilter = {
    every?: AcademicSemesterWhereInput
    some?: AcademicSemesterWhereInput
    none?: AcademicSemesterWhereInput
  }

  export type StudentContactDetailsNullableScalarRelationFilter = {
    is?: StudentContactDetailsWhereInput | null
    isNot?: StudentContactDetailsWhereInput | null
  }

  export type StudentDocumentListRelationFilter = {
    every?: StudentDocumentWhereInput
    some?: StudentDocumentWhereInput
    none?: StudentDocumentWhereInput
  }

  export type StudentParentDetailsNullableScalarRelationFilter = {
    is?: StudentParentDetailsWhereInput | null
    isNot?: StudentParentDetailsWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AcademicBacklogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcademicSemesterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    registerNumber?: SortOrder
    admissionNumber?: SortOrder
    profileImage?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    bloodGroup?: SortOrder
    nationality?: SortOrder
    religion?: SortOrder
    department?: SortOrder
    programme?: SortOrder
    semester?: SortOrder
    section?: SortOrder
    studentType?: SortOrder
    address?: SortOrder
    permanentAddress?: SortOrder
    yearsAtUniversity?: SortOrder
    totalCredits?: SortOrder
    currentCGPA?: SortOrder
    overallAttendance?: SortOrder
    academicStanding?: SortOrder
    currentMentor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    academicSetupCompleted?: SortOrder
  }

  export type StudentProfileAvgOrderByAggregateInput = {
    totalCredits?: SortOrder
    currentCGPA?: SortOrder
    overallAttendance?: SortOrder
  }

  export type StudentProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    registerNumber?: SortOrder
    admissionNumber?: SortOrder
    profileImage?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    bloodGroup?: SortOrder
    nationality?: SortOrder
    religion?: SortOrder
    department?: SortOrder
    programme?: SortOrder
    semester?: SortOrder
    section?: SortOrder
    studentType?: SortOrder
    address?: SortOrder
    permanentAddress?: SortOrder
    yearsAtUniversity?: SortOrder
    totalCredits?: SortOrder
    currentCGPA?: SortOrder
    overallAttendance?: SortOrder
    academicStanding?: SortOrder
    currentMentor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    academicSetupCompleted?: SortOrder
  }

  export type StudentProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    registerNumber?: SortOrder
    admissionNumber?: SortOrder
    profileImage?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    bloodGroup?: SortOrder
    nationality?: SortOrder
    religion?: SortOrder
    department?: SortOrder
    programme?: SortOrder
    semester?: SortOrder
    section?: SortOrder
    studentType?: SortOrder
    address?: SortOrder
    permanentAddress?: SortOrder
    yearsAtUniversity?: SortOrder
    totalCredits?: SortOrder
    currentCGPA?: SortOrder
    overallAttendance?: SortOrder
    academicStanding?: SortOrder
    currentMentor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    academicSetupCompleted?: SortOrder
  }

  export type StudentProfileSumOrderByAggregateInput = {
    totalCredits?: SortOrder
    currentCGPA?: SortOrder
    overallAttendance?: SortOrder
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
  }

  export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type EnumBloodGroupNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BloodGroup | EnumBloodGroupFieldRefInput<$PrismaModel> | null
    in?: $Enums.BloodGroup[] | ListEnumBloodGroupFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BloodGroup[] | ListEnumBloodGroupFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBloodGroupNullableWithAggregatesFilter<$PrismaModel> | $Enums.BloodGroup | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumBloodGroupNullableFilter<$PrismaModel>
    _max?: NestedEnumBloodGroupNullableFilter<$PrismaModel>
  }

  export type EnumStudentTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentType | EnumStudentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.StudentType[] | ListEnumStudentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StudentType[] | ListEnumStudentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStudentTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.StudentType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumStudentTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumStudentTypeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StudentProfileScalarRelationFilter = {
    is?: StudentProfileWhereInput
    isNot?: StudentProfileWhereInput
  }

  export type StudentParentDetailsCountOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    fatherName?: SortOrder
    fatherOccupation?: SortOrder
    fatherCompany?: SortOrder
    fatherAnnualIncome?: SortOrder
    fatherQualification?: SortOrder
    fatherEmail?: SortOrder
    fatherPhone?: SortOrder
    fatherAddress?: SortOrder
    motherName?: SortOrder
    motherOccupation?: SortOrder
    motherQualification?: SortOrder
    motherAnnualIncome?: SortOrder
    motherEmail?: SortOrder
    motherPhone?: SortOrder
    motherAddress?: SortOrder
    guardianName?: SortOrder
    guardianRelationship?: SortOrder
    guardianPhone?: SortOrder
    guardianAlternatePhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentParentDetailsMaxOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    fatherName?: SortOrder
    fatherOccupation?: SortOrder
    fatherCompany?: SortOrder
    fatherAnnualIncome?: SortOrder
    fatherQualification?: SortOrder
    fatherEmail?: SortOrder
    fatherPhone?: SortOrder
    fatherAddress?: SortOrder
    motherName?: SortOrder
    motherOccupation?: SortOrder
    motherQualification?: SortOrder
    motherAnnualIncome?: SortOrder
    motherEmail?: SortOrder
    motherPhone?: SortOrder
    motherAddress?: SortOrder
    guardianName?: SortOrder
    guardianRelationship?: SortOrder
    guardianPhone?: SortOrder
    guardianAlternatePhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentParentDetailsMinOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    fatherName?: SortOrder
    fatherOccupation?: SortOrder
    fatherCompany?: SortOrder
    fatherAnnualIncome?: SortOrder
    fatherQualification?: SortOrder
    fatherEmail?: SortOrder
    fatherPhone?: SortOrder
    fatherAddress?: SortOrder
    motherName?: SortOrder
    motherOccupation?: SortOrder
    motherQualification?: SortOrder
    motherAnnualIncome?: SortOrder
    motherEmail?: SortOrder
    motherPhone?: SortOrder
    motherAddress?: SortOrder
    guardianName?: SortOrder
    guardianRelationship?: SortOrder
    guardianPhone?: SortOrder
    guardianAlternatePhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAddressTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AddressType | EnumAddressTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAddressTypeNullableFilter<$PrismaModel> | $Enums.AddressType | null
  }

  export type EnumPreferredContactMethodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferredContactMethod | EnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PreferredContactMethod[] | ListEnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PreferredContactMethod[] | ListEnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPreferredContactMethodNullableFilter<$PrismaModel> | $Enums.PreferredContactMethod | null
  }

  export type EnumCommunicationEmailPreferenceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationEmailPreference | EnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.CommunicationEmailPreference[] | ListEnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CommunicationEmailPreference[] | ListEnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCommunicationEmailPreferenceNullableFilter<$PrismaModel> | $Enums.CommunicationEmailPreference | null
  }

  export type StudentContactDetailsCountOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    permanentAddress?: SortOrder
    currentAddress?: SortOrder
    addressType?: SortOrder
    durationAtCurrentAddress?: SortOrder
    personalMobile?: SortOrder
    alternateMobile?: SortOrder
    personalEmail?: SortOrder
    alternateEmail?: SortOrder
    whatsappNumber?: SortOrder
    telegramUsername?: SortOrder
    linkedInProfile?: SortOrder
    githubProfile?: SortOrder
    preferredContactMethod?: SortOrder
    preferredContactTime?: SortOrder
    communicationEmailPreference?: SortOrder
    allowWhatsappCommunication?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentContactDetailsMaxOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    permanentAddress?: SortOrder
    currentAddress?: SortOrder
    addressType?: SortOrder
    durationAtCurrentAddress?: SortOrder
    personalMobile?: SortOrder
    alternateMobile?: SortOrder
    personalEmail?: SortOrder
    alternateEmail?: SortOrder
    whatsappNumber?: SortOrder
    telegramUsername?: SortOrder
    linkedInProfile?: SortOrder
    githubProfile?: SortOrder
    preferredContactMethod?: SortOrder
    preferredContactTime?: SortOrder
    communicationEmailPreference?: SortOrder
    allowWhatsappCommunication?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentContactDetailsMinOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    permanentAddress?: SortOrder
    currentAddress?: SortOrder
    addressType?: SortOrder
    durationAtCurrentAddress?: SortOrder
    personalMobile?: SortOrder
    alternateMobile?: SortOrder
    personalEmail?: SortOrder
    alternateEmail?: SortOrder
    whatsappNumber?: SortOrder
    telegramUsername?: SortOrder
    linkedInProfile?: SortOrder
    githubProfile?: SortOrder
    preferredContactMethod?: SortOrder
    preferredContactTime?: SortOrder
    communicationEmailPreference?: SortOrder
    allowWhatsappCommunication?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAddressTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AddressType | EnumAddressTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAddressTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.AddressType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAddressTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumAddressTypeNullableFilter<$PrismaModel>
  }

  export type EnumPreferredContactMethodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferredContactMethod | EnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PreferredContactMethod[] | ListEnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PreferredContactMethod[] | ListEnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPreferredContactMethodNullableWithAggregatesFilter<$PrismaModel> | $Enums.PreferredContactMethod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPreferredContactMethodNullableFilter<$PrismaModel>
    _max?: NestedEnumPreferredContactMethodNullableFilter<$PrismaModel>
  }

  export type EnumCommunicationEmailPreferenceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationEmailPreference | EnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.CommunicationEmailPreference[] | ListEnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CommunicationEmailPreference[] | ListEnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCommunicationEmailPreferenceNullableWithAggregatesFilter<$PrismaModel> | $Enums.CommunicationEmailPreference | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCommunicationEmailPreferenceNullableFilter<$PrismaModel>
    _max?: NestedEnumCommunicationEmailPreferenceNullableFilter<$PrismaModel>
  }

  export type EnumDocumentCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentCategory | EnumDocumentCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentCategory[] | ListEnumDocumentCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentCategory[] | ListEnumDocumentCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentCategoryFilter<$PrismaModel> | $Enums.DocumentCategory
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

  export type StudentDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    documentName?: SortOrder
    category?: SortOrder
    description?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    cloudinaryPublicId?: SortOrder
    fileUrl?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
    resourceType?: SortOrder
  }

  export type StudentDocumentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type StudentDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    documentName?: SortOrder
    category?: SortOrder
    description?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    cloudinaryPublicId?: SortOrder
    fileUrl?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
    resourceType?: SortOrder
  }

  export type StudentDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    documentName?: SortOrder
    category?: SortOrder
    description?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    cloudinaryPublicId?: SortOrder
    fileUrl?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
    resourceType?: SortOrder
  }

  export type StudentDocumentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type EnumDocumentCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentCategory | EnumDocumentCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentCategory[] | ListEnumDocumentCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentCategory[] | ListEnumDocumentCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentCategoryWithAggregatesFilter<$PrismaModel> | $Enums.DocumentCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentCategoryFilter<$PrismaModel>
    _max?: NestedEnumDocumentCategoryFilter<$PrismaModel>
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

  export type EnumAcademicSemesterStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicSemesterStatus | EnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicSemesterStatus[] | ListEnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicSemesterStatus[] | ListEnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicSemesterStatusFilter<$PrismaModel> | $Enums.AcademicSemesterStatus
  }

  export type EnumAcademicEntryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicEntryStatus | EnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicEntryStatus[] | ListEnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicEntryStatus[] | ListEnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicEntryStatusFilter<$PrismaModel> | $Enums.AcademicEntryStatus
  }

  export type AcademicSubjectListRelationFilter = {
    every?: AcademicSubjectWhereInput
    some?: AcademicSubjectWhereInput
    none?: AcademicSubjectWhereInput
  }

  export type AcademicSubjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcademicSemesterStudentProfileIdSemesterNumberCompoundUniqueInput = {
    studentProfileId: string
    semesterNumber: number
  }

  export type AcademicSemesterCountOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    semesterNumber?: SortOrder
    academicYear?: SortOrder
    term?: SortOrder
    status?: SortOrder
    entryStatus?: SortOrder
    sgpa?: SortOrder
    totalCredits?: SortOrder
    creditsEarned?: SortOrder
    backlogs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicSemesterAvgOrderByAggregateInput = {
    semesterNumber?: SortOrder
    sgpa?: SortOrder
    totalCredits?: SortOrder
    creditsEarned?: SortOrder
    backlogs?: SortOrder
  }

  export type AcademicSemesterMaxOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    semesterNumber?: SortOrder
    academicYear?: SortOrder
    term?: SortOrder
    status?: SortOrder
    entryStatus?: SortOrder
    sgpa?: SortOrder
    totalCredits?: SortOrder
    creditsEarned?: SortOrder
    backlogs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicSemesterMinOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    semesterNumber?: SortOrder
    academicYear?: SortOrder
    term?: SortOrder
    status?: SortOrder
    entryStatus?: SortOrder
    sgpa?: SortOrder
    totalCredits?: SortOrder
    creditsEarned?: SortOrder
    backlogs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicSemesterSumOrderByAggregateInput = {
    semesterNumber?: SortOrder
    sgpa?: SortOrder
    totalCredits?: SortOrder
    creditsEarned?: SortOrder
    backlogs?: SortOrder
  }

  export type EnumAcademicSemesterStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicSemesterStatus | EnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicSemesterStatus[] | ListEnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicSemesterStatus[] | ListEnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicSemesterStatusWithAggregatesFilter<$PrismaModel> | $Enums.AcademicSemesterStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcademicSemesterStatusFilter<$PrismaModel>
    _max?: NestedEnumAcademicSemesterStatusFilter<$PrismaModel>
  }

  export type EnumAcademicEntryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicEntryStatus | EnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicEntryStatus[] | ListEnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicEntryStatus[] | ListEnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicEntryStatusWithAggregatesFilter<$PrismaModel> | $Enums.AcademicEntryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcademicEntryStatusFilter<$PrismaModel>
    _max?: NestedEnumAcademicEntryStatusFilter<$PrismaModel>
  }

  export type AcademicSemesterScalarRelationFilter = {
    is?: AcademicSemesterWhereInput
    isNot?: AcademicSemesterWhereInput
  }

  export type AcademicSubjectCountOrderByAggregateInput = {
    id?: SortOrder
    academicSemesterId?: SortOrder
    courseCode?: SortOrder
    courseName?: SortOrder
    credits?: SortOrder
    cia1?: SortOrder
    cia2?: SortOrder
    cia3?: SortOrder
    mse?: SortOrder
    ese?: SortOrder
    maximumMarks?: SortOrder
    totalMarksObtained?: SortOrder
    grade?: SortOrder
    gradePoint?: SortOrder
    attendance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classesAttended?: SortOrder
    classesHeld?: SortOrder
  }

  export type AcademicSubjectAvgOrderByAggregateInput = {
    credits?: SortOrder
    cia1?: SortOrder
    cia2?: SortOrder
    cia3?: SortOrder
    mse?: SortOrder
    ese?: SortOrder
    maximumMarks?: SortOrder
    totalMarksObtained?: SortOrder
    gradePoint?: SortOrder
    attendance?: SortOrder
    classesAttended?: SortOrder
    classesHeld?: SortOrder
  }

  export type AcademicSubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    academicSemesterId?: SortOrder
    courseCode?: SortOrder
    courseName?: SortOrder
    credits?: SortOrder
    cia1?: SortOrder
    cia2?: SortOrder
    cia3?: SortOrder
    mse?: SortOrder
    ese?: SortOrder
    maximumMarks?: SortOrder
    totalMarksObtained?: SortOrder
    grade?: SortOrder
    gradePoint?: SortOrder
    attendance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classesAttended?: SortOrder
    classesHeld?: SortOrder
  }

  export type AcademicSubjectMinOrderByAggregateInput = {
    id?: SortOrder
    academicSemesterId?: SortOrder
    courseCode?: SortOrder
    courseName?: SortOrder
    credits?: SortOrder
    cia1?: SortOrder
    cia2?: SortOrder
    cia3?: SortOrder
    mse?: SortOrder
    ese?: SortOrder
    maximumMarks?: SortOrder
    totalMarksObtained?: SortOrder
    grade?: SortOrder
    gradePoint?: SortOrder
    attendance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classesAttended?: SortOrder
    classesHeld?: SortOrder
  }

  export type AcademicSubjectSumOrderByAggregateInput = {
    credits?: SortOrder
    cia1?: SortOrder
    cia2?: SortOrder
    cia3?: SortOrder
    mse?: SortOrder
    ese?: SortOrder
    maximumMarks?: SortOrder
    totalMarksObtained?: SortOrder
    gradePoint?: SortOrder
    attendance?: SortOrder
    classesAttended?: SortOrder
    classesHeld?: SortOrder
  }

  export type EnumAcademicBacklogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicBacklogStatus | EnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel> | $Enums.AcademicBacklogStatus
  }

  export type AcademicBacklogCountOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    subjectCode?: SortOrder
    subjectName?: SortOrder
    semesterNumber?: SortOrder
    status?: SortOrder
    clearedSemesterNumber?: SortOrder
    clearedGrade?: SortOrder
    clearedMarks?: SortOrder
    clearedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicBacklogAvgOrderByAggregateInput = {
    semesterNumber?: SortOrder
    clearedSemesterNumber?: SortOrder
    clearedMarks?: SortOrder
  }

  export type AcademicBacklogMaxOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    subjectCode?: SortOrder
    subjectName?: SortOrder
    semesterNumber?: SortOrder
    status?: SortOrder
    clearedSemesterNumber?: SortOrder
    clearedGrade?: SortOrder
    clearedMarks?: SortOrder
    clearedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicBacklogMinOrderByAggregateInput = {
    id?: SortOrder
    studentProfileId?: SortOrder
    subjectCode?: SortOrder
    subjectName?: SortOrder
    semesterNumber?: SortOrder
    status?: SortOrder
    clearedSemesterNumber?: SortOrder
    clearedGrade?: SortOrder
    clearedMarks?: SortOrder
    clearedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicBacklogSumOrderByAggregateInput = {
    semesterNumber?: SortOrder
    clearedSemesterNumber?: SortOrder
    clearedMarks?: SortOrder
  }

  export type EnumAcademicBacklogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicBacklogStatus | EnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicBacklogStatusWithAggregatesFilter<$PrismaModel> | $Enums.AcademicBacklogStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel>
    _max?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel>
  }

  export type StudentProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutUserInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type StudentProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutUserInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StudentProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutUserInput
    upsert?: StudentProfileUpsertWithoutUserInput
    disconnect?: StudentProfileWhereInput | boolean
    delete?: StudentProfileWhereInput | boolean
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutUserInput, StudentProfileUpdateWithoutUserInput>, StudentProfileUncheckedUpdateWithoutUserInput>
  }

  export type StudentProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutUserInput
    upsert?: StudentProfileUpsertWithoutUserInput
    disconnect?: StudentProfileWhereInput | boolean
    delete?: StudentProfileWhereInput | boolean
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutUserInput, StudentProfileUpdateWithoutUserInput>, StudentProfileUncheckedUpdateWithoutUserInput>
  }

  export type AcademicBacklogCreateNestedManyWithoutStudentProfileInput = {
    create?: XOR<AcademicBacklogCreateWithoutStudentProfileInput, AcademicBacklogUncheckedCreateWithoutStudentProfileInput> | AcademicBacklogCreateWithoutStudentProfileInput[] | AcademicBacklogUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: AcademicBacklogCreateOrConnectWithoutStudentProfileInput | AcademicBacklogCreateOrConnectWithoutStudentProfileInput[]
    createMany?: AcademicBacklogCreateManyStudentProfileInputEnvelope
    connect?: AcademicBacklogWhereUniqueInput | AcademicBacklogWhereUniqueInput[]
  }

  export type AcademicSemesterCreateNestedManyWithoutStudentProfileInput = {
    create?: XOR<AcademicSemesterCreateWithoutStudentProfileInput, AcademicSemesterUncheckedCreateWithoutStudentProfileInput> | AcademicSemesterCreateWithoutStudentProfileInput[] | AcademicSemesterUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: AcademicSemesterCreateOrConnectWithoutStudentProfileInput | AcademicSemesterCreateOrConnectWithoutStudentProfileInput[]
    createMany?: AcademicSemesterCreateManyStudentProfileInputEnvelope
    connect?: AcademicSemesterWhereUniqueInput | AcademicSemesterWhereUniqueInput[]
  }

  export type StudentContactDetailsCreateNestedOneWithoutStudentProfileInput = {
    create?: XOR<StudentContactDetailsCreateWithoutStudentProfileInput, StudentContactDetailsUncheckedCreateWithoutStudentProfileInput>
    connectOrCreate?: StudentContactDetailsCreateOrConnectWithoutStudentProfileInput
    connect?: StudentContactDetailsWhereUniqueInput
  }

  export type StudentDocumentCreateNestedManyWithoutStudentProfileInput = {
    create?: XOR<StudentDocumentCreateWithoutStudentProfileInput, StudentDocumentUncheckedCreateWithoutStudentProfileInput> | StudentDocumentCreateWithoutStudentProfileInput[] | StudentDocumentUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: StudentDocumentCreateOrConnectWithoutStudentProfileInput | StudentDocumentCreateOrConnectWithoutStudentProfileInput[]
    createMany?: StudentDocumentCreateManyStudentProfileInputEnvelope
    connect?: StudentDocumentWhereUniqueInput | StudentDocumentWhereUniqueInput[]
  }

  export type StudentParentDetailsCreateNestedOneWithoutStudentProfileInput = {
    create?: XOR<StudentParentDetailsCreateWithoutStudentProfileInput, StudentParentDetailsUncheckedCreateWithoutStudentProfileInput>
    connectOrCreate?: StudentParentDetailsCreateOrConnectWithoutStudentProfileInput
    connect?: StudentParentDetailsWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStudentProfileInput = {
    create?: XOR<UserCreateWithoutStudentProfileInput, UserUncheckedCreateWithoutStudentProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentProfileInput
    connect?: UserWhereUniqueInput
  }

  export type AcademicBacklogUncheckedCreateNestedManyWithoutStudentProfileInput = {
    create?: XOR<AcademicBacklogCreateWithoutStudentProfileInput, AcademicBacklogUncheckedCreateWithoutStudentProfileInput> | AcademicBacklogCreateWithoutStudentProfileInput[] | AcademicBacklogUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: AcademicBacklogCreateOrConnectWithoutStudentProfileInput | AcademicBacklogCreateOrConnectWithoutStudentProfileInput[]
    createMany?: AcademicBacklogCreateManyStudentProfileInputEnvelope
    connect?: AcademicBacklogWhereUniqueInput | AcademicBacklogWhereUniqueInput[]
  }

  export type AcademicSemesterUncheckedCreateNestedManyWithoutStudentProfileInput = {
    create?: XOR<AcademicSemesterCreateWithoutStudentProfileInput, AcademicSemesterUncheckedCreateWithoutStudentProfileInput> | AcademicSemesterCreateWithoutStudentProfileInput[] | AcademicSemesterUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: AcademicSemesterCreateOrConnectWithoutStudentProfileInput | AcademicSemesterCreateOrConnectWithoutStudentProfileInput[]
    createMany?: AcademicSemesterCreateManyStudentProfileInputEnvelope
    connect?: AcademicSemesterWhereUniqueInput | AcademicSemesterWhereUniqueInput[]
  }

  export type StudentContactDetailsUncheckedCreateNestedOneWithoutStudentProfileInput = {
    create?: XOR<StudentContactDetailsCreateWithoutStudentProfileInput, StudentContactDetailsUncheckedCreateWithoutStudentProfileInput>
    connectOrCreate?: StudentContactDetailsCreateOrConnectWithoutStudentProfileInput
    connect?: StudentContactDetailsWhereUniqueInput
  }

  export type StudentDocumentUncheckedCreateNestedManyWithoutStudentProfileInput = {
    create?: XOR<StudentDocumentCreateWithoutStudentProfileInput, StudentDocumentUncheckedCreateWithoutStudentProfileInput> | StudentDocumentCreateWithoutStudentProfileInput[] | StudentDocumentUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: StudentDocumentCreateOrConnectWithoutStudentProfileInput | StudentDocumentCreateOrConnectWithoutStudentProfileInput[]
    createMany?: StudentDocumentCreateManyStudentProfileInputEnvelope
    connect?: StudentDocumentWhereUniqueInput | StudentDocumentWhereUniqueInput[]
  }

  export type StudentParentDetailsUncheckedCreateNestedOneWithoutStudentProfileInput = {
    create?: XOR<StudentParentDetailsCreateWithoutStudentProfileInput, StudentParentDetailsUncheckedCreateWithoutStudentProfileInput>
    connectOrCreate?: StudentParentDetailsCreateOrConnectWithoutStudentProfileInput
    connect?: StudentParentDetailsWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null
  }

  export type NullableEnumBloodGroupFieldUpdateOperationsInput = {
    set?: $Enums.BloodGroup | null
  }

  export type NullableEnumStudentTypeFieldUpdateOperationsInput = {
    set?: $Enums.StudentType | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AcademicBacklogUpdateManyWithoutStudentProfileNestedInput = {
    create?: XOR<AcademicBacklogCreateWithoutStudentProfileInput, AcademicBacklogUncheckedCreateWithoutStudentProfileInput> | AcademicBacklogCreateWithoutStudentProfileInput[] | AcademicBacklogUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: AcademicBacklogCreateOrConnectWithoutStudentProfileInput | AcademicBacklogCreateOrConnectWithoutStudentProfileInput[]
    upsert?: AcademicBacklogUpsertWithWhereUniqueWithoutStudentProfileInput | AcademicBacklogUpsertWithWhereUniqueWithoutStudentProfileInput[]
    createMany?: AcademicBacklogCreateManyStudentProfileInputEnvelope
    set?: AcademicBacklogWhereUniqueInput | AcademicBacklogWhereUniqueInput[]
    disconnect?: AcademicBacklogWhereUniqueInput | AcademicBacklogWhereUniqueInput[]
    delete?: AcademicBacklogWhereUniqueInput | AcademicBacklogWhereUniqueInput[]
    connect?: AcademicBacklogWhereUniqueInput | AcademicBacklogWhereUniqueInput[]
    update?: AcademicBacklogUpdateWithWhereUniqueWithoutStudentProfileInput | AcademicBacklogUpdateWithWhereUniqueWithoutStudentProfileInput[]
    updateMany?: AcademicBacklogUpdateManyWithWhereWithoutStudentProfileInput | AcademicBacklogUpdateManyWithWhereWithoutStudentProfileInput[]
    deleteMany?: AcademicBacklogScalarWhereInput | AcademicBacklogScalarWhereInput[]
  }

  export type AcademicSemesterUpdateManyWithoutStudentProfileNestedInput = {
    create?: XOR<AcademicSemesterCreateWithoutStudentProfileInput, AcademicSemesterUncheckedCreateWithoutStudentProfileInput> | AcademicSemesterCreateWithoutStudentProfileInput[] | AcademicSemesterUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: AcademicSemesterCreateOrConnectWithoutStudentProfileInput | AcademicSemesterCreateOrConnectWithoutStudentProfileInput[]
    upsert?: AcademicSemesterUpsertWithWhereUniqueWithoutStudentProfileInput | AcademicSemesterUpsertWithWhereUniqueWithoutStudentProfileInput[]
    createMany?: AcademicSemesterCreateManyStudentProfileInputEnvelope
    set?: AcademicSemesterWhereUniqueInput | AcademicSemesterWhereUniqueInput[]
    disconnect?: AcademicSemesterWhereUniqueInput | AcademicSemesterWhereUniqueInput[]
    delete?: AcademicSemesterWhereUniqueInput | AcademicSemesterWhereUniqueInput[]
    connect?: AcademicSemesterWhereUniqueInput | AcademicSemesterWhereUniqueInput[]
    update?: AcademicSemesterUpdateWithWhereUniqueWithoutStudentProfileInput | AcademicSemesterUpdateWithWhereUniqueWithoutStudentProfileInput[]
    updateMany?: AcademicSemesterUpdateManyWithWhereWithoutStudentProfileInput | AcademicSemesterUpdateManyWithWhereWithoutStudentProfileInput[]
    deleteMany?: AcademicSemesterScalarWhereInput | AcademicSemesterScalarWhereInput[]
  }

  export type StudentContactDetailsUpdateOneWithoutStudentProfileNestedInput = {
    create?: XOR<StudentContactDetailsCreateWithoutStudentProfileInput, StudentContactDetailsUncheckedCreateWithoutStudentProfileInput>
    connectOrCreate?: StudentContactDetailsCreateOrConnectWithoutStudentProfileInput
    upsert?: StudentContactDetailsUpsertWithoutStudentProfileInput
    disconnect?: StudentContactDetailsWhereInput | boolean
    delete?: StudentContactDetailsWhereInput | boolean
    connect?: StudentContactDetailsWhereUniqueInput
    update?: XOR<XOR<StudentContactDetailsUpdateToOneWithWhereWithoutStudentProfileInput, StudentContactDetailsUpdateWithoutStudentProfileInput>, StudentContactDetailsUncheckedUpdateWithoutStudentProfileInput>
  }

  export type StudentDocumentUpdateManyWithoutStudentProfileNestedInput = {
    create?: XOR<StudentDocumentCreateWithoutStudentProfileInput, StudentDocumentUncheckedCreateWithoutStudentProfileInput> | StudentDocumentCreateWithoutStudentProfileInput[] | StudentDocumentUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: StudentDocumentCreateOrConnectWithoutStudentProfileInput | StudentDocumentCreateOrConnectWithoutStudentProfileInput[]
    upsert?: StudentDocumentUpsertWithWhereUniqueWithoutStudentProfileInput | StudentDocumentUpsertWithWhereUniqueWithoutStudentProfileInput[]
    createMany?: StudentDocumentCreateManyStudentProfileInputEnvelope
    set?: StudentDocumentWhereUniqueInput | StudentDocumentWhereUniqueInput[]
    disconnect?: StudentDocumentWhereUniqueInput | StudentDocumentWhereUniqueInput[]
    delete?: StudentDocumentWhereUniqueInput | StudentDocumentWhereUniqueInput[]
    connect?: StudentDocumentWhereUniqueInput | StudentDocumentWhereUniqueInput[]
    update?: StudentDocumentUpdateWithWhereUniqueWithoutStudentProfileInput | StudentDocumentUpdateWithWhereUniqueWithoutStudentProfileInput[]
    updateMany?: StudentDocumentUpdateManyWithWhereWithoutStudentProfileInput | StudentDocumentUpdateManyWithWhereWithoutStudentProfileInput[]
    deleteMany?: StudentDocumentScalarWhereInput | StudentDocumentScalarWhereInput[]
  }

  export type StudentParentDetailsUpdateOneWithoutStudentProfileNestedInput = {
    create?: XOR<StudentParentDetailsCreateWithoutStudentProfileInput, StudentParentDetailsUncheckedCreateWithoutStudentProfileInput>
    connectOrCreate?: StudentParentDetailsCreateOrConnectWithoutStudentProfileInput
    upsert?: StudentParentDetailsUpsertWithoutStudentProfileInput
    disconnect?: StudentParentDetailsWhereInput | boolean
    delete?: StudentParentDetailsWhereInput | boolean
    connect?: StudentParentDetailsWhereUniqueInput
    update?: XOR<XOR<StudentParentDetailsUpdateToOneWithWhereWithoutStudentProfileInput, StudentParentDetailsUpdateWithoutStudentProfileInput>, StudentParentDetailsUncheckedUpdateWithoutStudentProfileInput>
  }

  export type UserUpdateOneRequiredWithoutStudentProfileNestedInput = {
    create?: XOR<UserCreateWithoutStudentProfileInput, UserUncheckedCreateWithoutStudentProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentProfileInput
    upsert?: UserUpsertWithoutStudentProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentProfileInput, UserUpdateWithoutStudentProfileInput>, UserUncheckedUpdateWithoutStudentProfileInput>
  }

  export type AcademicBacklogUncheckedUpdateManyWithoutStudentProfileNestedInput = {
    create?: XOR<AcademicBacklogCreateWithoutStudentProfileInput, AcademicBacklogUncheckedCreateWithoutStudentProfileInput> | AcademicBacklogCreateWithoutStudentProfileInput[] | AcademicBacklogUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: AcademicBacklogCreateOrConnectWithoutStudentProfileInput | AcademicBacklogCreateOrConnectWithoutStudentProfileInput[]
    upsert?: AcademicBacklogUpsertWithWhereUniqueWithoutStudentProfileInput | AcademicBacklogUpsertWithWhereUniqueWithoutStudentProfileInput[]
    createMany?: AcademicBacklogCreateManyStudentProfileInputEnvelope
    set?: AcademicBacklogWhereUniqueInput | AcademicBacklogWhereUniqueInput[]
    disconnect?: AcademicBacklogWhereUniqueInput | AcademicBacklogWhereUniqueInput[]
    delete?: AcademicBacklogWhereUniqueInput | AcademicBacklogWhereUniqueInput[]
    connect?: AcademicBacklogWhereUniqueInput | AcademicBacklogWhereUniqueInput[]
    update?: AcademicBacklogUpdateWithWhereUniqueWithoutStudentProfileInput | AcademicBacklogUpdateWithWhereUniqueWithoutStudentProfileInput[]
    updateMany?: AcademicBacklogUpdateManyWithWhereWithoutStudentProfileInput | AcademicBacklogUpdateManyWithWhereWithoutStudentProfileInput[]
    deleteMany?: AcademicBacklogScalarWhereInput | AcademicBacklogScalarWhereInput[]
  }

  export type AcademicSemesterUncheckedUpdateManyWithoutStudentProfileNestedInput = {
    create?: XOR<AcademicSemesterCreateWithoutStudentProfileInput, AcademicSemesterUncheckedCreateWithoutStudentProfileInput> | AcademicSemesterCreateWithoutStudentProfileInput[] | AcademicSemesterUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: AcademicSemesterCreateOrConnectWithoutStudentProfileInput | AcademicSemesterCreateOrConnectWithoutStudentProfileInput[]
    upsert?: AcademicSemesterUpsertWithWhereUniqueWithoutStudentProfileInput | AcademicSemesterUpsertWithWhereUniqueWithoutStudentProfileInput[]
    createMany?: AcademicSemesterCreateManyStudentProfileInputEnvelope
    set?: AcademicSemesterWhereUniqueInput | AcademicSemesterWhereUniqueInput[]
    disconnect?: AcademicSemesterWhereUniqueInput | AcademicSemesterWhereUniqueInput[]
    delete?: AcademicSemesterWhereUniqueInput | AcademicSemesterWhereUniqueInput[]
    connect?: AcademicSemesterWhereUniqueInput | AcademicSemesterWhereUniqueInput[]
    update?: AcademicSemesterUpdateWithWhereUniqueWithoutStudentProfileInput | AcademicSemesterUpdateWithWhereUniqueWithoutStudentProfileInput[]
    updateMany?: AcademicSemesterUpdateManyWithWhereWithoutStudentProfileInput | AcademicSemesterUpdateManyWithWhereWithoutStudentProfileInput[]
    deleteMany?: AcademicSemesterScalarWhereInput | AcademicSemesterScalarWhereInput[]
  }

  export type StudentContactDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput = {
    create?: XOR<StudentContactDetailsCreateWithoutStudentProfileInput, StudentContactDetailsUncheckedCreateWithoutStudentProfileInput>
    connectOrCreate?: StudentContactDetailsCreateOrConnectWithoutStudentProfileInput
    upsert?: StudentContactDetailsUpsertWithoutStudentProfileInput
    disconnect?: StudentContactDetailsWhereInput | boolean
    delete?: StudentContactDetailsWhereInput | boolean
    connect?: StudentContactDetailsWhereUniqueInput
    update?: XOR<XOR<StudentContactDetailsUpdateToOneWithWhereWithoutStudentProfileInput, StudentContactDetailsUpdateWithoutStudentProfileInput>, StudentContactDetailsUncheckedUpdateWithoutStudentProfileInput>
  }

  export type StudentDocumentUncheckedUpdateManyWithoutStudentProfileNestedInput = {
    create?: XOR<StudentDocumentCreateWithoutStudentProfileInput, StudentDocumentUncheckedCreateWithoutStudentProfileInput> | StudentDocumentCreateWithoutStudentProfileInput[] | StudentDocumentUncheckedCreateWithoutStudentProfileInput[]
    connectOrCreate?: StudentDocumentCreateOrConnectWithoutStudentProfileInput | StudentDocumentCreateOrConnectWithoutStudentProfileInput[]
    upsert?: StudentDocumentUpsertWithWhereUniqueWithoutStudentProfileInput | StudentDocumentUpsertWithWhereUniqueWithoutStudentProfileInput[]
    createMany?: StudentDocumentCreateManyStudentProfileInputEnvelope
    set?: StudentDocumentWhereUniqueInput | StudentDocumentWhereUniqueInput[]
    disconnect?: StudentDocumentWhereUniqueInput | StudentDocumentWhereUniqueInput[]
    delete?: StudentDocumentWhereUniqueInput | StudentDocumentWhereUniqueInput[]
    connect?: StudentDocumentWhereUniqueInput | StudentDocumentWhereUniqueInput[]
    update?: StudentDocumentUpdateWithWhereUniqueWithoutStudentProfileInput | StudentDocumentUpdateWithWhereUniqueWithoutStudentProfileInput[]
    updateMany?: StudentDocumentUpdateManyWithWhereWithoutStudentProfileInput | StudentDocumentUpdateManyWithWhereWithoutStudentProfileInput[]
    deleteMany?: StudentDocumentScalarWhereInput | StudentDocumentScalarWhereInput[]
  }

  export type StudentParentDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput = {
    create?: XOR<StudentParentDetailsCreateWithoutStudentProfileInput, StudentParentDetailsUncheckedCreateWithoutStudentProfileInput>
    connectOrCreate?: StudentParentDetailsCreateOrConnectWithoutStudentProfileInput
    upsert?: StudentParentDetailsUpsertWithoutStudentProfileInput
    disconnect?: StudentParentDetailsWhereInput | boolean
    delete?: StudentParentDetailsWhereInput | boolean
    connect?: StudentParentDetailsWhereUniqueInput
    update?: XOR<XOR<StudentParentDetailsUpdateToOneWithWhereWithoutStudentProfileInput, StudentParentDetailsUpdateWithoutStudentProfileInput>, StudentParentDetailsUncheckedUpdateWithoutStudentProfileInput>
  }

  export type StudentProfileCreateNestedOneWithoutParentDetailsInput = {
    create?: XOR<StudentProfileCreateWithoutParentDetailsInput, StudentProfileUncheckedCreateWithoutParentDetailsInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutParentDetailsInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type StudentProfileUpdateOneRequiredWithoutParentDetailsNestedInput = {
    create?: XOR<StudentProfileCreateWithoutParentDetailsInput, StudentProfileUncheckedCreateWithoutParentDetailsInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutParentDetailsInput
    upsert?: StudentProfileUpsertWithoutParentDetailsInput
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutParentDetailsInput, StudentProfileUpdateWithoutParentDetailsInput>, StudentProfileUncheckedUpdateWithoutParentDetailsInput>
  }

  export type StudentProfileCreateNestedOneWithoutContactDetailsInput = {
    create?: XOR<StudentProfileCreateWithoutContactDetailsInput, StudentProfileUncheckedCreateWithoutContactDetailsInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutContactDetailsInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type NullableEnumAddressTypeFieldUpdateOperationsInput = {
    set?: $Enums.AddressType | null
  }

  export type NullableEnumPreferredContactMethodFieldUpdateOperationsInput = {
    set?: $Enums.PreferredContactMethod | null
  }

  export type NullableEnumCommunicationEmailPreferenceFieldUpdateOperationsInput = {
    set?: $Enums.CommunicationEmailPreference | null
  }

  export type StudentProfileUpdateOneRequiredWithoutContactDetailsNestedInput = {
    create?: XOR<StudentProfileCreateWithoutContactDetailsInput, StudentProfileUncheckedCreateWithoutContactDetailsInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutContactDetailsInput
    upsert?: StudentProfileUpsertWithoutContactDetailsInput
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutContactDetailsInput, StudentProfileUpdateWithoutContactDetailsInput>, StudentProfileUncheckedUpdateWithoutContactDetailsInput>
  }

  export type StudentProfileCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<StudentProfileCreateWithoutDocumentsInput, StudentProfileUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutDocumentsInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type EnumDocumentCategoryFieldUpdateOperationsInput = {
    set?: $Enums.DocumentCategory
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StudentProfileUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<StudentProfileCreateWithoutDocumentsInput, StudentProfileUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutDocumentsInput
    upsert?: StudentProfileUpsertWithoutDocumentsInput
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutDocumentsInput, StudentProfileUpdateWithoutDocumentsInput>, StudentProfileUncheckedUpdateWithoutDocumentsInput>
  }

  export type StudentProfileCreateNestedOneWithoutAcademicSemestersInput = {
    create?: XOR<StudentProfileCreateWithoutAcademicSemestersInput, StudentProfileUncheckedCreateWithoutAcademicSemestersInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutAcademicSemestersInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type AcademicSubjectCreateNestedManyWithoutAcademicSemesterInput = {
    create?: XOR<AcademicSubjectCreateWithoutAcademicSemesterInput, AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput> | AcademicSubjectCreateWithoutAcademicSemesterInput[] | AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput[]
    connectOrCreate?: AcademicSubjectCreateOrConnectWithoutAcademicSemesterInput | AcademicSubjectCreateOrConnectWithoutAcademicSemesterInput[]
    createMany?: AcademicSubjectCreateManyAcademicSemesterInputEnvelope
    connect?: AcademicSubjectWhereUniqueInput | AcademicSubjectWhereUniqueInput[]
  }

  export type AcademicSubjectUncheckedCreateNestedManyWithoutAcademicSemesterInput = {
    create?: XOR<AcademicSubjectCreateWithoutAcademicSemesterInput, AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput> | AcademicSubjectCreateWithoutAcademicSemesterInput[] | AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput[]
    connectOrCreate?: AcademicSubjectCreateOrConnectWithoutAcademicSemesterInput | AcademicSubjectCreateOrConnectWithoutAcademicSemesterInput[]
    createMany?: AcademicSubjectCreateManyAcademicSemesterInputEnvelope
    connect?: AcademicSubjectWhereUniqueInput | AcademicSubjectWhereUniqueInput[]
  }

  export type EnumAcademicSemesterStatusFieldUpdateOperationsInput = {
    set?: $Enums.AcademicSemesterStatus
  }

  export type EnumAcademicEntryStatusFieldUpdateOperationsInput = {
    set?: $Enums.AcademicEntryStatus
  }

  export type StudentProfileUpdateOneRequiredWithoutAcademicSemestersNestedInput = {
    create?: XOR<StudentProfileCreateWithoutAcademicSemestersInput, StudentProfileUncheckedCreateWithoutAcademicSemestersInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutAcademicSemestersInput
    upsert?: StudentProfileUpsertWithoutAcademicSemestersInput
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutAcademicSemestersInput, StudentProfileUpdateWithoutAcademicSemestersInput>, StudentProfileUncheckedUpdateWithoutAcademicSemestersInput>
  }

  export type AcademicSubjectUpdateManyWithoutAcademicSemesterNestedInput = {
    create?: XOR<AcademicSubjectCreateWithoutAcademicSemesterInput, AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput> | AcademicSubjectCreateWithoutAcademicSemesterInput[] | AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput[]
    connectOrCreate?: AcademicSubjectCreateOrConnectWithoutAcademicSemesterInput | AcademicSubjectCreateOrConnectWithoutAcademicSemesterInput[]
    upsert?: AcademicSubjectUpsertWithWhereUniqueWithoutAcademicSemesterInput | AcademicSubjectUpsertWithWhereUniqueWithoutAcademicSemesterInput[]
    createMany?: AcademicSubjectCreateManyAcademicSemesterInputEnvelope
    set?: AcademicSubjectWhereUniqueInput | AcademicSubjectWhereUniqueInput[]
    disconnect?: AcademicSubjectWhereUniqueInput | AcademicSubjectWhereUniqueInput[]
    delete?: AcademicSubjectWhereUniqueInput | AcademicSubjectWhereUniqueInput[]
    connect?: AcademicSubjectWhereUniqueInput | AcademicSubjectWhereUniqueInput[]
    update?: AcademicSubjectUpdateWithWhereUniqueWithoutAcademicSemesterInput | AcademicSubjectUpdateWithWhereUniqueWithoutAcademicSemesterInput[]
    updateMany?: AcademicSubjectUpdateManyWithWhereWithoutAcademicSemesterInput | AcademicSubjectUpdateManyWithWhereWithoutAcademicSemesterInput[]
    deleteMany?: AcademicSubjectScalarWhereInput | AcademicSubjectScalarWhereInput[]
  }

  export type AcademicSubjectUncheckedUpdateManyWithoutAcademicSemesterNestedInput = {
    create?: XOR<AcademicSubjectCreateWithoutAcademicSemesterInput, AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput> | AcademicSubjectCreateWithoutAcademicSemesterInput[] | AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput[]
    connectOrCreate?: AcademicSubjectCreateOrConnectWithoutAcademicSemesterInput | AcademicSubjectCreateOrConnectWithoutAcademicSemesterInput[]
    upsert?: AcademicSubjectUpsertWithWhereUniqueWithoutAcademicSemesterInput | AcademicSubjectUpsertWithWhereUniqueWithoutAcademicSemesterInput[]
    createMany?: AcademicSubjectCreateManyAcademicSemesterInputEnvelope
    set?: AcademicSubjectWhereUniqueInput | AcademicSubjectWhereUniqueInput[]
    disconnect?: AcademicSubjectWhereUniqueInput | AcademicSubjectWhereUniqueInput[]
    delete?: AcademicSubjectWhereUniqueInput | AcademicSubjectWhereUniqueInput[]
    connect?: AcademicSubjectWhereUniqueInput | AcademicSubjectWhereUniqueInput[]
    update?: AcademicSubjectUpdateWithWhereUniqueWithoutAcademicSemesterInput | AcademicSubjectUpdateWithWhereUniqueWithoutAcademicSemesterInput[]
    updateMany?: AcademicSubjectUpdateManyWithWhereWithoutAcademicSemesterInput | AcademicSubjectUpdateManyWithWhereWithoutAcademicSemesterInput[]
    deleteMany?: AcademicSubjectScalarWhereInput | AcademicSubjectScalarWhereInput[]
  }

  export type AcademicSemesterCreateNestedOneWithoutSubjectsInput = {
    create?: XOR<AcademicSemesterCreateWithoutSubjectsInput, AcademicSemesterUncheckedCreateWithoutSubjectsInput>
    connectOrCreate?: AcademicSemesterCreateOrConnectWithoutSubjectsInput
    connect?: AcademicSemesterWhereUniqueInput
  }

  export type AcademicSemesterUpdateOneRequiredWithoutSubjectsNestedInput = {
    create?: XOR<AcademicSemesterCreateWithoutSubjectsInput, AcademicSemesterUncheckedCreateWithoutSubjectsInput>
    connectOrCreate?: AcademicSemesterCreateOrConnectWithoutSubjectsInput
    upsert?: AcademicSemesterUpsertWithoutSubjectsInput
    connect?: AcademicSemesterWhereUniqueInput
    update?: XOR<XOR<AcademicSemesterUpdateToOneWithWhereWithoutSubjectsInput, AcademicSemesterUpdateWithoutSubjectsInput>, AcademicSemesterUncheckedUpdateWithoutSubjectsInput>
  }

  export type StudentProfileCreateNestedOneWithoutAcademicBacklogsInput = {
    create?: XOR<StudentProfileCreateWithoutAcademicBacklogsInput, StudentProfileUncheckedCreateWithoutAcademicBacklogsInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutAcademicBacklogsInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type EnumAcademicBacklogStatusFieldUpdateOperationsInput = {
    set?: $Enums.AcademicBacklogStatus
  }

  export type StudentProfileUpdateOneRequiredWithoutAcademicBacklogsNestedInput = {
    create?: XOR<StudentProfileCreateWithoutAcademicBacklogsInput, StudentProfileUncheckedCreateWithoutAcademicBacklogsInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutAcademicBacklogsInput
    upsert?: StudentProfileUpsertWithoutAcademicBacklogsInput
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutAcademicBacklogsInput, StudentProfileUpdateWithoutAcademicBacklogsInput>, StudentProfileUncheckedUpdateWithoutAcademicBacklogsInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
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
  }

  export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type NestedEnumBloodGroupNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.BloodGroup | EnumBloodGroupFieldRefInput<$PrismaModel> | null
    in?: $Enums.BloodGroup[] | ListEnumBloodGroupFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BloodGroup[] | ListEnumBloodGroupFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBloodGroupNullableFilter<$PrismaModel> | $Enums.BloodGroup | null
  }

  export type NestedEnumStudentTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentType | EnumStudentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.StudentType[] | ListEnumStudentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StudentType[] | ListEnumStudentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStudentTypeNullableFilter<$PrismaModel> | $Enums.StudentType | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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
  }

  export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type NestedEnumBloodGroupNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BloodGroup | EnumBloodGroupFieldRefInput<$PrismaModel> | null
    in?: $Enums.BloodGroup[] | ListEnumBloodGroupFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BloodGroup[] | ListEnumBloodGroupFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBloodGroupNullableWithAggregatesFilter<$PrismaModel> | $Enums.BloodGroup | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumBloodGroupNullableFilter<$PrismaModel>
    _max?: NestedEnumBloodGroupNullableFilter<$PrismaModel>
  }

  export type NestedEnumStudentTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentType | EnumStudentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.StudentType[] | ListEnumStudentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StudentType[] | ListEnumStudentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStudentTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.StudentType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumStudentTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumStudentTypeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumAddressTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AddressType | EnumAddressTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAddressTypeNullableFilter<$PrismaModel> | $Enums.AddressType | null
  }

  export type NestedEnumPreferredContactMethodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferredContactMethod | EnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PreferredContactMethod[] | ListEnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PreferredContactMethod[] | ListEnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPreferredContactMethodNullableFilter<$PrismaModel> | $Enums.PreferredContactMethod | null
  }

  export type NestedEnumCommunicationEmailPreferenceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationEmailPreference | EnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.CommunicationEmailPreference[] | ListEnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CommunicationEmailPreference[] | ListEnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCommunicationEmailPreferenceNullableFilter<$PrismaModel> | $Enums.CommunicationEmailPreference | null
  }

  export type NestedEnumAddressTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AddressType | EnumAddressTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AddressType[] | ListEnumAddressTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAddressTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.AddressType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAddressTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumAddressTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPreferredContactMethodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferredContactMethod | EnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PreferredContactMethod[] | ListEnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PreferredContactMethod[] | ListEnumPreferredContactMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPreferredContactMethodNullableWithAggregatesFilter<$PrismaModel> | $Enums.PreferredContactMethod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPreferredContactMethodNullableFilter<$PrismaModel>
    _max?: NestedEnumPreferredContactMethodNullableFilter<$PrismaModel>
  }

  export type NestedEnumCommunicationEmailPreferenceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationEmailPreference | EnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.CommunicationEmailPreference[] | ListEnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CommunicationEmailPreference[] | ListEnumCommunicationEmailPreferenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCommunicationEmailPreferenceNullableWithAggregatesFilter<$PrismaModel> | $Enums.CommunicationEmailPreference | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCommunicationEmailPreferenceNullableFilter<$PrismaModel>
    _max?: NestedEnumCommunicationEmailPreferenceNullableFilter<$PrismaModel>
  }

  export type NestedEnumDocumentCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentCategory | EnumDocumentCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentCategory[] | ListEnumDocumentCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentCategory[] | ListEnumDocumentCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentCategoryFilter<$PrismaModel> | $Enums.DocumentCategory
  }

  export type NestedEnumDocumentCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentCategory | EnumDocumentCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentCategory[] | ListEnumDocumentCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentCategory[] | ListEnumDocumentCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentCategoryWithAggregatesFilter<$PrismaModel> | $Enums.DocumentCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentCategoryFilter<$PrismaModel>
    _max?: NestedEnumDocumentCategoryFilter<$PrismaModel>
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

  export type NestedEnumAcademicSemesterStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicSemesterStatus | EnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicSemesterStatus[] | ListEnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicSemesterStatus[] | ListEnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicSemesterStatusFilter<$PrismaModel> | $Enums.AcademicSemesterStatus
  }

  export type NestedEnumAcademicEntryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicEntryStatus | EnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicEntryStatus[] | ListEnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicEntryStatus[] | ListEnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicEntryStatusFilter<$PrismaModel> | $Enums.AcademicEntryStatus
  }

  export type NestedEnumAcademicSemesterStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicSemesterStatus | EnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicSemesterStatus[] | ListEnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicSemesterStatus[] | ListEnumAcademicSemesterStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicSemesterStatusWithAggregatesFilter<$PrismaModel> | $Enums.AcademicSemesterStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcademicSemesterStatusFilter<$PrismaModel>
    _max?: NestedEnumAcademicSemesterStatusFilter<$PrismaModel>
  }

  export type NestedEnumAcademicEntryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicEntryStatus | EnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicEntryStatus[] | ListEnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicEntryStatus[] | ListEnumAcademicEntryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicEntryStatusWithAggregatesFilter<$PrismaModel> | $Enums.AcademicEntryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcademicEntryStatusFilter<$PrismaModel>
    _max?: NestedEnumAcademicEntryStatusFilter<$PrismaModel>
  }

  export type NestedEnumAcademicBacklogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicBacklogStatus | EnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel> | $Enums.AcademicBacklogStatus
  }

  export type NestedEnumAcademicBacklogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicBacklogStatus | EnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicBacklogStatusWithAggregatesFilter<$PrismaModel> | $Enums.AcademicBacklogStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel>
    _max?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel>
  }

  export type StudentProfileCreateWithoutUserInput = {
    id?: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogCreateNestedManyWithoutStudentProfileInput
    academicSemesters?: AcademicSemesterCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsCreateNestedOneWithoutStudentProfileInput
    documents?: StudentDocumentCreateNestedManyWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileUncheckedCreateWithoutUserInput = {
    id?: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogUncheckedCreateNestedManyWithoutStudentProfileInput
    academicSemesters?: AcademicSemesterUncheckedCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
    documents?: StudentDocumentUncheckedCreateNestedManyWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileCreateOrConnectWithoutUserInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
  }

  export type StudentProfileUpsertWithoutUserInput = {
    update: XOR<StudentProfileUpdateWithoutUserInput, StudentProfileUncheckedUpdateWithoutUserInput>
    create: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
    where?: StudentProfileWhereInput
  }

  export type StudentProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: StudentProfileWhereInput
    data: XOR<StudentProfileUpdateWithoutUserInput, StudentProfileUncheckedUpdateWithoutUserInput>
  }

  export type StudentProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUpdateManyWithoutStudentProfileNestedInput
    academicSemesters?: AcademicSemesterUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUpdateOneWithoutStudentProfileNestedInput
    documents?: StudentDocumentUpdateManyWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUpdateOneWithoutStudentProfileNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUncheckedUpdateManyWithoutStudentProfileNestedInput
    academicSemesters?: AcademicSemesterUncheckedUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
    documents?: StudentDocumentUncheckedUpdateManyWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
  }

  export type AcademicBacklogCreateWithoutStudentProfileInput = {
    id?: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status?: $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: number | null
    clearedGrade?: string | null
    clearedMarks?: number | null
    clearedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicBacklogUncheckedCreateWithoutStudentProfileInput = {
    id?: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status?: $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: number | null
    clearedGrade?: string | null
    clearedMarks?: number | null
    clearedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicBacklogCreateOrConnectWithoutStudentProfileInput = {
    where: AcademicBacklogWhereUniqueInput
    create: XOR<AcademicBacklogCreateWithoutStudentProfileInput, AcademicBacklogUncheckedCreateWithoutStudentProfileInput>
  }

  export type AcademicBacklogCreateManyStudentProfileInputEnvelope = {
    data: AcademicBacklogCreateManyStudentProfileInput | AcademicBacklogCreateManyStudentProfileInput[]
    skipDuplicates?: boolean
  }

  export type AcademicSemesterCreateWithoutStudentProfileInput = {
    id?: string
    semesterNumber: number
    academicYear?: string | null
    term?: string | null
    status?: $Enums.AcademicSemesterStatus
    entryStatus?: $Enums.AcademicEntryStatus
    sgpa?: number | null
    totalCredits?: number
    creditsEarned?: number
    backlogs?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: AcademicSubjectCreateNestedManyWithoutAcademicSemesterInput
  }

  export type AcademicSemesterUncheckedCreateWithoutStudentProfileInput = {
    id?: string
    semesterNumber: number
    academicYear?: string | null
    term?: string | null
    status?: $Enums.AcademicSemesterStatus
    entryStatus?: $Enums.AcademicEntryStatus
    sgpa?: number | null
    totalCredits?: number
    creditsEarned?: number
    backlogs?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: AcademicSubjectUncheckedCreateNestedManyWithoutAcademicSemesterInput
  }

  export type AcademicSemesterCreateOrConnectWithoutStudentProfileInput = {
    where: AcademicSemesterWhereUniqueInput
    create: XOR<AcademicSemesterCreateWithoutStudentProfileInput, AcademicSemesterUncheckedCreateWithoutStudentProfileInput>
  }

  export type AcademicSemesterCreateManyStudentProfileInputEnvelope = {
    data: AcademicSemesterCreateManyStudentProfileInput | AcademicSemesterCreateManyStudentProfileInput[]
    skipDuplicates?: boolean
  }

  export type StudentContactDetailsCreateWithoutStudentProfileInput = {
    id?: string
    permanentAddress?: string | null
    currentAddress?: string | null
    addressType?: $Enums.AddressType | null
    durationAtCurrentAddress?: string | null
    personalMobile?: string | null
    alternateMobile?: string | null
    personalEmail?: string | null
    alternateEmail?: string | null
    whatsappNumber?: string | null
    telegramUsername?: string | null
    linkedInProfile?: string | null
    githubProfile?: string | null
    preferredContactMethod?: $Enums.PreferredContactMethod | null
    preferredContactTime?: string | null
    communicationEmailPreference?: $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentContactDetailsUncheckedCreateWithoutStudentProfileInput = {
    id?: string
    permanentAddress?: string | null
    currentAddress?: string | null
    addressType?: $Enums.AddressType | null
    durationAtCurrentAddress?: string | null
    personalMobile?: string | null
    alternateMobile?: string | null
    personalEmail?: string | null
    alternateEmail?: string | null
    whatsappNumber?: string | null
    telegramUsername?: string | null
    linkedInProfile?: string | null
    githubProfile?: string | null
    preferredContactMethod?: $Enums.PreferredContactMethod | null
    preferredContactTime?: string | null
    communicationEmailPreference?: $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentContactDetailsCreateOrConnectWithoutStudentProfileInput = {
    where: StudentContactDetailsWhereUniqueInput
    create: XOR<StudentContactDetailsCreateWithoutStudentProfileInput, StudentContactDetailsUncheckedCreateWithoutStudentProfileInput>
  }

  export type StudentDocumentCreateWithoutStudentProfileInput = {
    id?: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt?: Date | string
    resourceType: string
  }

  export type StudentDocumentUncheckedCreateWithoutStudentProfileInput = {
    id?: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt?: Date | string
    resourceType: string
  }

  export type StudentDocumentCreateOrConnectWithoutStudentProfileInput = {
    where: StudentDocumentWhereUniqueInput
    create: XOR<StudentDocumentCreateWithoutStudentProfileInput, StudentDocumentUncheckedCreateWithoutStudentProfileInput>
  }

  export type StudentDocumentCreateManyStudentProfileInputEnvelope = {
    data: StudentDocumentCreateManyStudentProfileInput | StudentDocumentCreateManyStudentProfileInput[]
    skipDuplicates?: boolean
  }

  export type StudentParentDetailsCreateWithoutStudentProfileInput = {
    id?: string
    fatherName?: string | null
    fatherOccupation?: string | null
    fatherCompany?: string | null
    fatherAnnualIncome?: string | null
    fatherQualification?: string | null
    fatherEmail?: string | null
    fatherPhone?: string | null
    fatherAddress?: string | null
    motherName?: string | null
    motherOccupation?: string | null
    motherQualification?: string | null
    motherAnnualIncome?: string | null
    motherEmail?: string | null
    motherPhone?: string | null
    motherAddress?: string | null
    guardianName?: string | null
    guardianRelationship?: string | null
    guardianPhone?: string | null
    guardianAlternatePhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentParentDetailsUncheckedCreateWithoutStudentProfileInput = {
    id?: string
    fatherName?: string | null
    fatherOccupation?: string | null
    fatherCompany?: string | null
    fatherAnnualIncome?: string | null
    fatherQualification?: string | null
    fatherEmail?: string | null
    fatherPhone?: string | null
    fatherAddress?: string | null
    motherName?: string | null
    motherOccupation?: string | null
    motherQualification?: string | null
    motherAnnualIncome?: string | null
    motherEmail?: string | null
    motherPhone?: string | null
    motherAddress?: string | null
    guardianName?: string | null
    guardianRelationship?: string | null
    guardianPhone?: string | null
    guardianAlternatePhone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentParentDetailsCreateOrConnectWithoutStudentProfileInput = {
    where: StudentParentDetailsWhereUniqueInput
    create: XOR<StudentParentDetailsCreateWithoutStudentProfileInput, StudentParentDetailsUncheckedCreateWithoutStudentProfileInput>
  }

  export type UserCreateWithoutStudentProfileInput = {
    id?: string
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutStudentProfileInput = {
    id?: string
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutStudentProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentProfileInput, UserUncheckedCreateWithoutStudentProfileInput>
  }

  export type AcademicBacklogUpsertWithWhereUniqueWithoutStudentProfileInput = {
    where: AcademicBacklogWhereUniqueInput
    update: XOR<AcademicBacklogUpdateWithoutStudentProfileInput, AcademicBacklogUncheckedUpdateWithoutStudentProfileInput>
    create: XOR<AcademicBacklogCreateWithoutStudentProfileInput, AcademicBacklogUncheckedCreateWithoutStudentProfileInput>
  }

  export type AcademicBacklogUpdateWithWhereUniqueWithoutStudentProfileInput = {
    where: AcademicBacklogWhereUniqueInput
    data: XOR<AcademicBacklogUpdateWithoutStudentProfileInput, AcademicBacklogUncheckedUpdateWithoutStudentProfileInput>
  }

  export type AcademicBacklogUpdateManyWithWhereWithoutStudentProfileInput = {
    where: AcademicBacklogScalarWhereInput
    data: XOR<AcademicBacklogUpdateManyMutationInput, AcademicBacklogUncheckedUpdateManyWithoutStudentProfileInput>
  }

  export type AcademicBacklogScalarWhereInput = {
    AND?: AcademicBacklogScalarWhereInput | AcademicBacklogScalarWhereInput[]
    OR?: AcademicBacklogScalarWhereInput[]
    NOT?: AcademicBacklogScalarWhereInput | AcademicBacklogScalarWhereInput[]
    id?: StringFilter<"AcademicBacklog"> | string
    studentProfileId?: StringFilter<"AcademicBacklog"> | string
    subjectCode?: StringFilter<"AcademicBacklog"> | string
    subjectName?: StringFilter<"AcademicBacklog"> | string
    semesterNumber?: IntFilter<"AcademicBacklog"> | number
    status?: EnumAcademicBacklogStatusFilter<"AcademicBacklog"> | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: IntNullableFilter<"AcademicBacklog"> | number | null
    clearedGrade?: StringNullableFilter<"AcademicBacklog"> | string | null
    clearedMarks?: FloatNullableFilter<"AcademicBacklog"> | number | null
    clearedAt?: DateTimeNullableFilter<"AcademicBacklog"> | Date | string | null
    createdAt?: DateTimeFilter<"AcademicBacklog"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicBacklog"> | Date | string
  }

  export type AcademicSemesterUpsertWithWhereUniqueWithoutStudentProfileInput = {
    where: AcademicSemesterWhereUniqueInput
    update: XOR<AcademicSemesterUpdateWithoutStudentProfileInput, AcademicSemesterUncheckedUpdateWithoutStudentProfileInput>
    create: XOR<AcademicSemesterCreateWithoutStudentProfileInput, AcademicSemesterUncheckedCreateWithoutStudentProfileInput>
  }

  export type AcademicSemesterUpdateWithWhereUniqueWithoutStudentProfileInput = {
    where: AcademicSemesterWhereUniqueInput
    data: XOR<AcademicSemesterUpdateWithoutStudentProfileInput, AcademicSemesterUncheckedUpdateWithoutStudentProfileInput>
  }

  export type AcademicSemesterUpdateManyWithWhereWithoutStudentProfileInput = {
    where: AcademicSemesterScalarWhereInput
    data: XOR<AcademicSemesterUpdateManyMutationInput, AcademicSemesterUncheckedUpdateManyWithoutStudentProfileInput>
  }

  export type AcademicSemesterScalarWhereInput = {
    AND?: AcademicSemesterScalarWhereInput | AcademicSemesterScalarWhereInput[]
    OR?: AcademicSemesterScalarWhereInput[]
    NOT?: AcademicSemesterScalarWhereInput | AcademicSemesterScalarWhereInput[]
    id?: StringFilter<"AcademicSemester"> | string
    studentProfileId?: StringFilter<"AcademicSemester"> | string
    semesterNumber?: IntFilter<"AcademicSemester"> | number
    academicYear?: StringNullableFilter<"AcademicSemester"> | string | null
    term?: StringNullableFilter<"AcademicSemester"> | string | null
    status?: EnumAcademicSemesterStatusFilter<"AcademicSemester"> | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFilter<"AcademicSemester"> | $Enums.AcademicEntryStatus
    sgpa?: FloatNullableFilter<"AcademicSemester"> | number | null
    totalCredits?: IntFilter<"AcademicSemester"> | number
    creditsEarned?: IntFilter<"AcademicSemester"> | number
    backlogs?: IntFilter<"AcademicSemester"> | number
    createdAt?: DateTimeFilter<"AcademicSemester"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicSemester"> | Date | string
  }

  export type StudentContactDetailsUpsertWithoutStudentProfileInput = {
    update: XOR<StudentContactDetailsUpdateWithoutStudentProfileInput, StudentContactDetailsUncheckedUpdateWithoutStudentProfileInput>
    create: XOR<StudentContactDetailsCreateWithoutStudentProfileInput, StudentContactDetailsUncheckedCreateWithoutStudentProfileInput>
    where?: StudentContactDetailsWhereInput
  }

  export type StudentContactDetailsUpdateToOneWithWhereWithoutStudentProfileInput = {
    where?: StudentContactDetailsWhereInput
    data: XOR<StudentContactDetailsUpdateWithoutStudentProfileInput, StudentContactDetailsUncheckedUpdateWithoutStudentProfileInput>
  }

  export type StudentContactDetailsUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    addressType?: NullableEnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType | null
    durationAtCurrentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personalMobile?: NullableStringFieldUpdateOperationsInput | string | null
    alternateMobile?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInProfile?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContactMethod?: NullableEnumPreferredContactMethodFieldUpdateOperationsInput | $Enums.PreferredContactMethod | null
    preferredContactTime?: NullableStringFieldUpdateOperationsInput | string | null
    communicationEmailPreference?: NullableEnumCommunicationEmailPreferenceFieldUpdateOperationsInput | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentContactDetailsUncheckedUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    addressType?: NullableEnumAddressTypeFieldUpdateOperationsInput | $Enums.AddressType | null
    durationAtCurrentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personalMobile?: NullableStringFieldUpdateOperationsInput | string | null
    alternateMobile?: NullableStringFieldUpdateOperationsInput | string | null
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInProfile?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContactMethod?: NullableEnumPreferredContactMethodFieldUpdateOperationsInput | $Enums.PreferredContactMethod | null
    preferredContactTime?: NullableStringFieldUpdateOperationsInput | string | null
    communicationEmailPreference?: NullableEnumCommunicationEmailPreferenceFieldUpdateOperationsInput | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentDocumentUpsertWithWhereUniqueWithoutStudentProfileInput = {
    where: StudentDocumentWhereUniqueInput
    update: XOR<StudentDocumentUpdateWithoutStudentProfileInput, StudentDocumentUncheckedUpdateWithoutStudentProfileInput>
    create: XOR<StudentDocumentCreateWithoutStudentProfileInput, StudentDocumentUncheckedCreateWithoutStudentProfileInput>
  }

  export type StudentDocumentUpdateWithWhereUniqueWithoutStudentProfileInput = {
    where: StudentDocumentWhereUniqueInput
    data: XOR<StudentDocumentUpdateWithoutStudentProfileInput, StudentDocumentUncheckedUpdateWithoutStudentProfileInput>
  }

  export type StudentDocumentUpdateManyWithWhereWithoutStudentProfileInput = {
    where: StudentDocumentScalarWhereInput
    data: XOR<StudentDocumentUpdateManyMutationInput, StudentDocumentUncheckedUpdateManyWithoutStudentProfileInput>
  }

  export type StudentDocumentScalarWhereInput = {
    AND?: StudentDocumentScalarWhereInput | StudentDocumentScalarWhereInput[]
    OR?: StudentDocumentScalarWhereInput[]
    NOT?: StudentDocumentScalarWhereInput | StudentDocumentScalarWhereInput[]
    id?: StringFilter<"StudentDocument"> | string
    studentProfileId?: StringFilter<"StudentDocument"> | string
    documentName?: StringFilter<"StudentDocument"> | string
    category?: EnumDocumentCategoryFilter<"StudentDocument"> | $Enums.DocumentCategory
    description?: StringNullableFilter<"StudentDocument"> | string | null
    fileType?: StringFilter<"StudentDocument"> | string
    fileSize?: IntFilter<"StudentDocument"> | number
    cloudinaryPublicId?: StringFilter<"StudentDocument"> | string
    fileUrl?: StringFilter<"StudentDocument"> | string
    uploadedAt?: DateTimeFilter<"StudentDocument"> | Date | string
    updatedAt?: DateTimeFilter<"StudentDocument"> | Date | string
    resourceType?: StringFilter<"StudentDocument"> | string
  }

  export type StudentParentDetailsUpsertWithoutStudentProfileInput = {
    update: XOR<StudentParentDetailsUpdateWithoutStudentProfileInput, StudentParentDetailsUncheckedUpdateWithoutStudentProfileInput>
    create: XOR<StudentParentDetailsCreateWithoutStudentProfileInput, StudentParentDetailsUncheckedCreateWithoutStudentProfileInput>
    where?: StudentParentDetailsWhereInput
  }

  export type StudentParentDetailsUpdateToOneWithWhereWithoutStudentProfileInput = {
    where?: StudentParentDetailsWhereInput
    data: XOR<StudentParentDetailsUpdateWithoutStudentProfileInput, StudentParentDetailsUncheckedUpdateWithoutStudentProfileInput>
  }

  export type StudentParentDetailsUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    fatherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    fatherCompany?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    fatherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    fatherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    fatherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    motherName?: NullableStringFieldUpdateOperationsInput | string | null
    motherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    motherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    motherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    motherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    motherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    motherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianRelationship?: NullableStringFieldUpdateOperationsInput | string | null
    guardianPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guardianAlternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentParentDetailsUncheckedUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    fatherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    fatherCompany?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    fatherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    fatherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    fatherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    fatherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    motherName?: NullableStringFieldUpdateOperationsInput | string | null
    motherOccupation?: NullableStringFieldUpdateOperationsInput | string | null
    motherQualification?: NullableStringFieldUpdateOperationsInput | string | null
    motherAnnualIncome?: NullableStringFieldUpdateOperationsInput | string | null
    motherEmail?: NullableStringFieldUpdateOperationsInput | string | null
    motherPhone?: NullableStringFieldUpdateOperationsInput | string | null
    motherAddress?: NullableStringFieldUpdateOperationsInput | string | null
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianRelationship?: NullableStringFieldUpdateOperationsInput | string | null
    guardianPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guardianAlternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutStudentProfileInput = {
    update: XOR<UserUpdateWithoutStudentProfileInput, UserUncheckedUpdateWithoutStudentProfileInput>
    create: XOR<UserCreateWithoutStudentProfileInput, UserUncheckedCreateWithoutStudentProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudentProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudentProfileInput, UserUncheckedUpdateWithoutStudentProfileInput>
  }

  export type UserUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentProfileCreateWithoutParentDetailsInput = {
    id?: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogCreateNestedManyWithoutStudentProfileInput
    academicSemesters?: AcademicSemesterCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsCreateNestedOneWithoutStudentProfileInput
    documents?: StudentDocumentCreateNestedManyWithoutStudentProfileInput
    user: UserCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileUncheckedCreateWithoutParentDetailsInput = {
    id?: string
    userId: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogUncheckedCreateNestedManyWithoutStudentProfileInput
    academicSemesters?: AcademicSemesterUncheckedCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
    documents?: StudentDocumentUncheckedCreateNestedManyWithoutStudentProfileInput
  }

  export type StudentProfileCreateOrConnectWithoutParentDetailsInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutParentDetailsInput, StudentProfileUncheckedCreateWithoutParentDetailsInput>
  }

  export type StudentProfileUpsertWithoutParentDetailsInput = {
    update: XOR<StudentProfileUpdateWithoutParentDetailsInput, StudentProfileUncheckedUpdateWithoutParentDetailsInput>
    create: XOR<StudentProfileCreateWithoutParentDetailsInput, StudentProfileUncheckedCreateWithoutParentDetailsInput>
    where?: StudentProfileWhereInput
  }

  export type StudentProfileUpdateToOneWithWhereWithoutParentDetailsInput = {
    where?: StudentProfileWhereInput
    data: XOR<StudentProfileUpdateWithoutParentDetailsInput, StudentProfileUncheckedUpdateWithoutParentDetailsInput>
  }

  export type StudentProfileUpdateWithoutParentDetailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUpdateManyWithoutStudentProfileNestedInput
    academicSemesters?: AcademicSemesterUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUpdateOneWithoutStudentProfileNestedInput
    documents?: StudentDocumentUpdateManyWithoutStudentProfileNestedInput
    user?: UserUpdateOneRequiredWithoutStudentProfileNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutParentDetailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUncheckedUpdateManyWithoutStudentProfileNestedInput
    academicSemesters?: AcademicSemesterUncheckedUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
    documents?: StudentDocumentUncheckedUpdateManyWithoutStudentProfileNestedInput
  }

  export type StudentProfileCreateWithoutContactDetailsInput = {
    id?: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogCreateNestedManyWithoutStudentProfileInput
    academicSemesters?: AcademicSemesterCreateNestedManyWithoutStudentProfileInput
    documents?: StudentDocumentCreateNestedManyWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsCreateNestedOneWithoutStudentProfileInput
    user: UserCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileUncheckedCreateWithoutContactDetailsInput = {
    id?: string
    userId: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogUncheckedCreateNestedManyWithoutStudentProfileInput
    academicSemesters?: AcademicSemesterUncheckedCreateNestedManyWithoutStudentProfileInput
    documents?: StudentDocumentUncheckedCreateNestedManyWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileCreateOrConnectWithoutContactDetailsInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutContactDetailsInput, StudentProfileUncheckedCreateWithoutContactDetailsInput>
  }

  export type StudentProfileUpsertWithoutContactDetailsInput = {
    update: XOR<StudentProfileUpdateWithoutContactDetailsInput, StudentProfileUncheckedUpdateWithoutContactDetailsInput>
    create: XOR<StudentProfileCreateWithoutContactDetailsInput, StudentProfileUncheckedCreateWithoutContactDetailsInput>
    where?: StudentProfileWhereInput
  }

  export type StudentProfileUpdateToOneWithWhereWithoutContactDetailsInput = {
    where?: StudentProfileWhereInput
    data: XOR<StudentProfileUpdateWithoutContactDetailsInput, StudentProfileUncheckedUpdateWithoutContactDetailsInput>
  }

  export type StudentProfileUpdateWithoutContactDetailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUpdateManyWithoutStudentProfileNestedInput
    academicSemesters?: AcademicSemesterUpdateManyWithoutStudentProfileNestedInput
    documents?: StudentDocumentUpdateManyWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUpdateOneWithoutStudentProfileNestedInput
    user?: UserUpdateOneRequiredWithoutStudentProfileNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutContactDetailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUncheckedUpdateManyWithoutStudentProfileNestedInput
    academicSemesters?: AcademicSemesterUncheckedUpdateManyWithoutStudentProfileNestedInput
    documents?: StudentDocumentUncheckedUpdateManyWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
  }

  export type StudentProfileCreateWithoutDocumentsInput = {
    id?: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogCreateNestedManyWithoutStudentProfileInput
    academicSemesters?: AcademicSemesterCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsCreateNestedOneWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsCreateNestedOneWithoutStudentProfileInput
    user: UserCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileUncheckedCreateWithoutDocumentsInput = {
    id?: string
    userId: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogUncheckedCreateNestedManyWithoutStudentProfileInput
    academicSemesters?: AcademicSemesterUncheckedCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileCreateOrConnectWithoutDocumentsInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutDocumentsInput, StudentProfileUncheckedCreateWithoutDocumentsInput>
  }

  export type StudentProfileUpsertWithoutDocumentsInput = {
    update: XOR<StudentProfileUpdateWithoutDocumentsInput, StudentProfileUncheckedUpdateWithoutDocumentsInput>
    create: XOR<StudentProfileCreateWithoutDocumentsInput, StudentProfileUncheckedCreateWithoutDocumentsInput>
    where?: StudentProfileWhereInput
  }

  export type StudentProfileUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: StudentProfileWhereInput
    data: XOR<StudentProfileUpdateWithoutDocumentsInput, StudentProfileUncheckedUpdateWithoutDocumentsInput>
  }

  export type StudentProfileUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUpdateManyWithoutStudentProfileNestedInput
    academicSemesters?: AcademicSemesterUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUpdateOneWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUpdateOneWithoutStudentProfileNestedInput
    user?: UserUpdateOneRequiredWithoutStudentProfileNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUncheckedUpdateManyWithoutStudentProfileNestedInput
    academicSemesters?: AcademicSemesterUncheckedUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
  }

  export type StudentProfileCreateWithoutAcademicSemestersInput = {
    id?: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsCreateNestedOneWithoutStudentProfileInput
    documents?: StudentDocumentCreateNestedManyWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsCreateNestedOneWithoutStudentProfileInput
    user: UserCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileUncheckedCreateWithoutAcademicSemestersInput = {
    id?: string
    userId: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicBacklogs?: AcademicBacklogUncheckedCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
    documents?: StudentDocumentUncheckedCreateNestedManyWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileCreateOrConnectWithoutAcademicSemestersInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutAcademicSemestersInput, StudentProfileUncheckedCreateWithoutAcademicSemestersInput>
  }

  export type AcademicSubjectCreateWithoutAcademicSemesterInput = {
    id?: string
    courseCode: string
    courseName: string
    credits: number
    cia1?: number | null
    cia2?: number | null
    cia3?: number | null
    mse?: number | null
    ese?: number | null
    maximumMarks?: number | null
    totalMarksObtained?: number | null
    grade?: string | null
    gradePoint?: number | null
    attendance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classesAttended?: number
    classesHeld?: number
  }

  export type AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput = {
    id?: string
    courseCode: string
    courseName: string
    credits: number
    cia1?: number | null
    cia2?: number | null
    cia3?: number | null
    mse?: number | null
    ese?: number | null
    maximumMarks?: number | null
    totalMarksObtained?: number | null
    grade?: string | null
    gradePoint?: number | null
    attendance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classesAttended?: number
    classesHeld?: number
  }

  export type AcademicSubjectCreateOrConnectWithoutAcademicSemesterInput = {
    where: AcademicSubjectWhereUniqueInput
    create: XOR<AcademicSubjectCreateWithoutAcademicSemesterInput, AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput>
  }

  export type AcademicSubjectCreateManyAcademicSemesterInputEnvelope = {
    data: AcademicSubjectCreateManyAcademicSemesterInput | AcademicSubjectCreateManyAcademicSemesterInput[]
    skipDuplicates?: boolean
  }

  export type StudentProfileUpsertWithoutAcademicSemestersInput = {
    update: XOR<StudentProfileUpdateWithoutAcademicSemestersInput, StudentProfileUncheckedUpdateWithoutAcademicSemestersInput>
    create: XOR<StudentProfileCreateWithoutAcademicSemestersInput, StudentProfileUncheckedCreateWithoutAcademicSemestersInput>
    where?: StudentProfileWhereInput
  }

  export type StudentProfileUpdateToOneWithWhereWithoutAcademicSemestersInput = {
    where?: StudentProfileWhereInput
    data: XOR<StudentProfileUpdateWithoutAcademicSemestersInput, StudentProfileUncheckedUpdateWithoutAcademicSemestersInput>
  }

  export type StudentProfileUpdateWithoutAcademicSemestersInput = {
    id?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUpdateOneWithoutStudentProfileNestedInput
    documents?: StudentDocumentUpdateManyWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUpdateOneWithoutStudentProfileNestedInput
    user?: UserUpdateOneRequiredWithoutStudentProfileNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutAcademicSemestersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicBacklogs?: AcademicBacklogUncheckedUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
    documents?: StudentDocumentUncheckedUpdateManyWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
  }

  export type AcademicSubjectUpsertWithWhereUniqueWithoutAcademicSemesterInput = {
    where: AcademicSubjectWhereUniqueInput
    update: XOR<AcademicSubjectUpdateWithoutAcademicSemesterInput, AcademicSubjectUncheckedUpdateWithoutAcademicSemesterInput>
    create: XOR<AcademicSubjectCreateWithoutAcademicSemesterInput, AcademicSubjectUncheckedCreateWithoutAcademicSemesterInput>
  }

  export type AcademicSubjectUpdateWithWhereUniqueWithoutAcademicSemesterInput = {
    where: AcademicSubjectWhereUniqueInput
    data: XOR<AcademicSubjectUpdateWithoutAcademicSemesterInput, AcademicSubjectUncheckedUpdateWithoutAcademicSemesterInput>
  }

  export type AcademicSubjectUpdateManyWithWhereWithoutAcademicSemesterInput = {
    where: AcademicSubjectScalarWhereInput
    data: XOR<AcademicSubjectUpdateManyMutationInput, AcademicSubjectUncheckedUpdateManyWithoutAcademicSemesterInput>
  }

  export type AcademicSubjectScalarWhereInput = {
    AND?: AcademicSubjectScalarWhereInput | AcademicSubjectScalarWhereInput[]
    OR?: AcademicSubjectScalarWhereInput[]
    NOT?: AcademicSubjectScalarWhereInput | AcademicSubjectScalarWhereInput[]
    id?: StringFilter<"AcademicSubject"> | string
    academicSemesterId?: StringFilter<"AcademicSubject"> | string
    courseCode?: StringFilter<"AcademicSubject"> | string
    courseName?: StringFilter<"AcademicSubject"> | string
    credits?: IntFilter<"AcademicSubject"> | number
    cia1?: FloatNullableFilter<"AcademicSubject"> | number | null
    cia2?: FloatNullableFilter<"AcademicSubject"> | number | null
    cia3?: FloatNullableFilter<"AcademicSubject"> | number | null
    mse?: FloatNullableFilter<"AcademicSubject"> | number | null
    ese?: FloatNullableFilter<"AcademicSubject"> | number | null
    maximumMarks?: FloatNullableFilter<"AcademicSubject"> | number | null
    totalMarksObtained?: FloatNullableFilter<"AcademicSubject"> | number | null
    grade?: StringNullableFilter<"AcademicSubject"> | string | null
    gradePoint?: FloatNullableFilter<"AcademicSubject"> | number | null
    attendance?: FloatNullableFilter<"AcademicSubject"> | number | null
    createdAt?: DateTimeFilter<"AcademicSubject"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicSubject"> | Date | string
    classesAttended?: IntFilter<"AcademicSubject"> | number
    classesHeld?: IntFilter<"AcademicSubject"> | number
  }

  export type AcademicSemesterCreateWithoutSubjectsInput = {
    id?: string
    semesterNumber: number
    academicYear?: string | null
    term?: string | null
    status?: $Enums.AcademicSemesterStatus
    entryStatus?: $Enums.AcademicEntryStatus
    sgpa?: number | null
    totalCredits?: number
    creditsEarned?: number
    backlogs?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProfile: StudentProfileCreateNestedOneWithoutAcademicSemestersInput
  }

  export type AcademicSemesterUncheckedCreateWithoutSubjectsInput = {
    id?: string
    studentProfileId: string
    semesterNumber: number
    academicYear?: string | null
    term?: string | null
    status?: $Enums.AcademicSemesterStatus
    entryStatus?: $Enums.AcademicEntryStatus
    sgpa?: number | null
    totalCredits?: number
    creditsEarned?: number
    backlogs?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicSemesterCreateOrConnectWithoutSubjectsInput = {
    where: AcademicSemesterWhereUniqueInput
    create: XOR<AcademicSemesterCreateWithoutSubjectsInput, AcademicSemesterUncheckedCreateWithoutSubjectsInput>
  }

  export type AcademicSemesterUpsertWithoutSubjectsInput = {
    update: XOR<AcademicSemesterUpdateWithoutSubjectsInput, AcademicSemesterUncheckedUpdateWithoutSubjectsInput>
    create: XOR<AcademicSemesterCreateWithoutSubjectsInput, AcademicSemesterUncheckedCreateWithoutSubjectsInput>
    where?: AcademicSemesterWhereInput
  }

  export type AcademicSemesterUpdateToOneWithWhereWithoutSubjectsInput = {
    where?: AcademicSemesterWhereInput
    data: XOR<AcademicSemesterUpdateWithoutSubjectsInput, AcademicSemesterUncheckedUpdateWithoutSubjectsInput>
  }

  export type AcademicSemesterUpdateWithoutSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAcademicSemesterStatusFieldUpdateOperationsInput | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFieldUpdateOperationsInput | $Enums.AcademicEntryStatus
    sgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCredits?: IntFieldUpdateOperationsInput | number
    creditsEarned?: IntFieldUpdateOperationsInput | number
    backlogs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProfile?: StudentProfileUpdateOneRequiredWithoutAcademicSemestersNestedInput
  }

  export type AcademicSemesterUncheckedUpdateWithoutSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProfileId?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAcademicSemesterStatusFieldUpdateOperationsInput | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFieldUpdateOperationsInput | $Enums.AcademicEntryStatus
    sgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCredits?: IntFieldUpdateOperationsInput | number
    creditsEarned?: IntFieldUpdateOperationsInput | number
    backlogs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentProfileCreateWithoutAcademicBacklogsInput = {
    id?: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicSemesters?: AcademicSemesterCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsCreateNestedOneWithoutStudentProfileInput
    documents?: StudentDocumentCreateNestedManyWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsCreateNestedOneWithoutStudentProfileInput
    user: UserCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileUncheckedCreateWithoutAcademicBacklogsInput = {
    id?: string
    userId: string
    registerNumber?: string | null
    admissionNumber?: string | null
    profileImage?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender | null
    bloodGroup?: $Enums.BloodGroup | null
    nationality?: string | null
    religion?: string | null
    department?: string | null
    programme?: string | null
    semester?: string | null
    section?: string | null
    studentType?: $Enums.StudentType | null
    address?: string | null
    permanentAddress?: string | null
    yearsAtUniversity?: string | null
    totalCredits?: number | null
    currentCGPA?: number | null
    overallAttendance?: number | null
    academicStanding?: string | null
    currentMentor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    academicSetupCompleted?: boolean
    academicSemesters?: AcademicSemesterUncheckedCreateNestedManyWithoutStudentProfileInput
    contactDetails?: StudentContactDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
    documents?: StudentDocumentUncheckedCreateNestedManyWithoutStudentProfileInput
    parentDetails?: StudentParentDetailsUncheckedCreateNestedOneWithoutStudentProfileInput
  }

  export type StudentProfileCreateOrConnectWithoutAcademicBacklogsInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutAcademicBacklogsInput, StudentProfileUncheckedCreateWithoutAcademicBacklogsInput>
  }

  export type StudentProfileUpsertWithoutAcademicBacklogsInput = {
    update: XOR<StudentProfileUpdateWithoutAcademicBacklogsInput, StudentProfileUncheckedUpdateWithoutAcademicBacklogsInput>
    create: XOR<StudentProfileCreateWithoutAcademicBacklogsInput, StudentProfileUncheckedCreateWithoutAcademicBacklogsInput>
    where?: StudentProfileWhereInput
  }

  export type StudentProfileUpdateToOneWithWhereWithoutAcademicBacklogsInput = {
    where?: StudentProfileWhereInput
    data: XOR<StudentProfileUpdateWithoutAcademicBacklogsInput, StudentProfileUncheckedUpdateWithoutAcademicBacklogsInput>
  }

  export type StudentProfileUpdateWithoutAcademicBacklogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicSemesters?: AcademicSemesterUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUpdateOneWithoutStudentProfileNestedInput
    documents?: StudentDocumentUpdateManyWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUpdateOneWithoutStudentProfileNestedInput
    user?: UserUpdateOneRequiredWithoutStudentProfileNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutAcademicBacklogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registerNumber?: NullableStringFieldUpdateOperationsInput | string | null
    admissionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bloodGroup?: NullableEnumBloodGroupFieldUpdateOperationsInput | $Enums.BloodGroup | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    programme?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    studentType?: NullableEnumStudentTypeFieldUpdateOperationsInput | $Enums.StudentType | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    yearsAtUniversity?: NullableStringFieldUpdateOperationsInput | string | null
    totalCredits?: NullableIntFieldUpdateOperationsInput | number | null
    currentCGPA?: NullableFloatFieldUpdateOperationsInput | number | null
    overallAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableStringFieldUpdateOperationsInput | string | null
    currentMentor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicSetupCompleted?: BoolFieldUpdateOperationsInput | boolean
    academicSemesters?: AcademicSemesterUncheckedUpdateManyWithoutStudentProfileNestedInput
    contactDetails?: StudentContactDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
    documents?: StudentDocumentUncheckedUpdateManyWithoutStudentProfileNestedInput
    parentDetails?: StudentParentDetailsUncheckedUpdateOneWithoutStudentProfileNestedInput
  }

  export type AcademicBacklogCreateManyStudentProfileInput = {
    id?: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status?: $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: number | null
    clearedGrade?: string | null
    clearedMarks?: number | null
    clearedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicSemesterCreateManyStudentProfileInput = {
    id?: string
    semesterNumber: number
    academicYear?: string | null
    term?: string | null
    status?: $Enums.AcademicSemesterStatus
    entryStatus?: $Enums.AcademicEntryStatus
    sgpa?: number | null
    totalCredits?: number
    creditsEarned?: number
    backlogs?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentDocumentCreateManyStudentProfileInput = {
    id?: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt?: Date | string
    resourceType: string
  }

  export type AcademicBacklogUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjectCode?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAcademicBacklogStatusFieldUpdateOperationsInput | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    clearedGrade?: NullableStringFieldUpdateOperationsInput | string | null
    clearedMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    clearedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicBacklogUncheckedUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjectCode?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAcademicBacklogStatusFieldUpdateOperationsInput | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    clearedGrade?: NullableStringFieldUpdateOperationsInput | string | null
    clearedMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    clearedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicBacklogUncheckedUpdateManyWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjectCode?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumAcademicBacklogStatusFieldUpdateOperationsInput | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    clearedGrade?: NullableStringFieldUpdateOperationsInput | string | null
    clearedMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    clearedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicSemesterUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAcademicSemesterStatusFieldUpdateOperationsInput | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFieldUpdateOperationsInput | $Enums.AcademicEntryStatus
    sgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCredits?: IntFieldUpdateOperationsInput | number
    creditsEarned?: IntFieldUpdateOperationsInput | number
    backlogs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: AcademicSubjectUpdateManyWithoutAcademicSemesterNestedInput
  }

  export type AcademicSemesterUncheckedUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAcademicSemesterStatusFieldUpdateOperationsInput | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFieldUpdateOperationsInput | $Enums.AcademicEntryStatus
    sgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCredits?: IntFieldUpdateOperationsInput | number
    creditsEarned?: IntFieldUpdateOperationsInput | number
    backlogs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: AcademicSubjectUncheckedUpdateManyWithoutAcademicSemesterNestedInput
  }

  export type AcademicSemesterUncheckedUpdateManyWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    semesterNumber?: IntFieldUpdateOperationsInput | number
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAcademicSemesterStatusFieldUpdateOperationsInput | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFieldUpdateOperationsInput | $Enums.AcademicEntryStatus
    sgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCredits?: IntFieldUpdateOperationsInput | number
    creditsEarned?: IntFieldUpdateOperationsInput | number
    backlogs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentDocumentUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentName?: StringFieldUpdateOperationsInput | string
    category?: EnumDocumentCategoryFieldUpdateOperationsInput | $Enums.DocumentCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    cloudinaryPublicId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resourceType?: StringFieldUpdateOperationsInput | string
  }

  export type StudentDocumentUncheckedUpdateWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentName?: StringFieldUpdateOperationsInput | string
    category?: EnumDocumentCategoryFieldUpdateOperationsInput | $Enums.DocumentCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    cloudinaryPublicId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resourceType?: StringFieldUpdateOperationsInput | string
  }

  export type StudentDocumentUncheckedUpdateManyWithoutStudentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentName?: StringFieldUpdateOperationsInput | string
    category?: EnumDocumentCategoryFieldUpdateOperationsInput | $Enums.DocumentCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    cloudinaryPublicId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resourceType?: StringFieldUpdateOperationsInput | string
  }

  export type AcademicSubjectCreateManyAcademicSemesterInput = {
    id?: string
    courseCode: string
    courseName: string
    credits: number
    cia1?: number | null
    cia2?: number | null
    cia3?: number | null
    mse?: number | null
    ese?: number | null
    maximumMarks?: number | null
    totalMarksObtained?: number | null
    grade?: string | null
    gradePoint?: number | null
    attendance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classesAttended?: number
    classesHeld?: number
  }

  export type AcademicSubjectUpdateWithoutAcademicSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    courseName?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    cia1?: NullableFloatFieldUpdateOperationsInput | number | null
    cia2?: NullableFloatFieldUpdateOperationsInput | number | null
    cia3?: NullableFloatFieldUpdateOperationsInput | number | null
    mse?: NullableFloatFieldUpdateOperationsInput | number | null
    ese?: NullableFloatFieldUpdateOperationsInput | number | null
    maximumMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    totalMarksObtained?: NullableFloatFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    gradePoint?: NullableFloatFieldUpdateOperationsInput | number | null
    attendance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesAttended?: IntFieldUpdateOperationsInput | number
    classesHeld?: IntFieldUpdateOperationsInput | number
  }

  export type AcademicSubjectUncheckedUpdateWithoutAcademicSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    courseName?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    cia1?: NullableFloatFieldUpdateOperationsInput | number | null
    cia2?: NullableFloatFieldUpdateOperationsInput | number | null
    cia3?: NullableFloatFieldUpdateOperationsInput | number | null
    mse?: NullableFloatFieldUpdateOperationsInput | number | null
    ese?: NullableFloatFieldUpdateOperationsInput | number | null
    maximumMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    totalMarksObtained?: NullableFloatFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    gradePoint?: NullableFloatFieldUpdateOperationsInput | number | null
    attendance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesAttended?: IntFieldUpdateOperationsInput | number
    classesHeld?: IntFieldUpdateOperationsInput | number
  }

  export type AcademicSubjectUncheckedUpdateManyWithoutAcademicSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseCode?: StringFieldUpdateOperationsInput | string
    courseName?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    cia1?: NullableFloatFieldUpdateOperationsInput | number | null
    cia2?: NullableFloatFieldUpdateOperationsInput | number | null
    cia3?: NullableFloatFieldUpdateOperationsInput | number | null
    mse?: NullableFloatFieldUpdateOperationsInput | number | null
    ese?: NullableFloatFieldUpdateOperationsInput | number | null
    maximumMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    totalMarksObtained?: NullableFloatFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    gradePoint?: NullableFloatFieldUpdateOperationsInput | number | null
    attendance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesAttended?: IntFieldUpdateOperationsInput | number
    classesHeld?: IntFieldUpdateOperationsInput | number
  }



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