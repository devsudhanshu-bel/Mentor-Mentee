
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
 * Model academic_backlogs
 * 
 */
export type academic_backlogs = $Result.DefaultSelection<Prisma.$academic_backlogsPayload>
/**
 * Model academic_semesters
 * 
 */
export type academic_semesters = $Result.DefaultSelection<Prisma.$academic_semestersPayload>
/**
 * Model academic_subjects
 * 
 */
export type academic_subjects = $Result.DefaultSelection<Prisma.$academic_subjectsPayload>
/**
 * Model student_contact_details
 * 
 */
export type student_contact_details = $Result.DefaultSelection<Prisma.$student_contact_detailsPayload>
/**
 * Model student_documents
 * 
 */
export type student_documents = $Result.DefaultSelection<Prisma.$student_documentsPayload>
/**
 * Model student_parent_details
 * 
 */
export type student_parent_details = $Result.DefaultSelection<Prisma.$student_parent_detailsPayload>
/**
 * Model student_profiles
 * 
 */
export type student_profiles = $Result.DefaultSelection<Prisma.$student_profilesPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const AcademicBacklogStatus: {
  ACTIVE: 'ACTIVE',
  CLEARED: 'CLEARED'
};

export type AcademicBacklogStatus = (typeof AcademicBacklogStatus)[keyof typeof AcademicBacklogStatus]


export const AcademicEntryStatus: {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  VERIFIED: 'VERIFIED'
};

export type AcademicEntryStatus = (typeof AcademicEntryStatus)[keyof typeof AcademicEntryStatus]


export const AcademicSemesterStatus: {
  LOCKED: 'LOCKED',
  CURRENT: 'CURRENT',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type AcademicSemesterStatus = (typeof AcademicSemesterStatus)[keyof typeof AcademicSemesterStatus]


export const AddressType: {
  HOME: 'HOME',
  HOSTEL: 'HOSTEL',
  RENTED: 'RENTED',
  OTHER: 'OTHER'
};

export type AddressType = (typeof AddressType)[keyof typeof AddressType]


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


export const CommunicationEmailPreference: {
  UNIVERSITY_EMAIL: 'UNIVERSITY_EMAIL',
  PERSONAL_EMAIL: 'PERSONAL_EMAIL'
};

export type CommunicationEmailPreference = (typeof CommunicationEmailPreference)[keyof typeof CommunicationEmailPreference]


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


export const PreferredContactMethod: {
  MOBILE: 'MOBILE',
  EMAIL: 'EMAIL',
  WHATSAPP: 'WHATSAPP'
};

export type PreferredContactMethod = (typeof PreferredContactMethod)[keyof typeof PreferredContactMethod]


export const Role: {
  ADMIN: 'ADMIN',
  MENTOR: 'MENTOR',
  STUDENT: 'STUDENT'
};

export type Role = (typeof Role)[keyof typeof Role]


export const StudentType: {
  DAY_SCHOLAR: 'DAY_SCHOLAR',
  HOSTELLER: 'HOSTELLER'
};

export type StudentType = (typeof StudentType)[keyof typeof StudentType]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type AcademicBacklogStatus = $Enums.AcademicBacklogStatus

export const AcademicBacklogStatus: typeof $Enums.AcademicBacklogStatus

export type AcademicEntryStatus = $Enums.AcademicEntryStatus

export const AcademicEntryStatus: typeof $Enums.AcademicEntryStatus

export type AcademicSemesterStatus = $Enums.AcademicSemesterStatus

export const AcademicSemesterStatus: typeof $Enums.AcademicSemesterStatus

export type AddressType = $Enums.AddressType

export const AddressType: typeof $Enums.AddressType

export type BloodGroup = $Enums.BloodGroup

export const BloodGroup: typeof $Enums.BloodGroup

export type CommunicationEmailPreference = $Enums.CommunicationEmailPreference

export const CommunicationEmailPreference: typeof $Enums.CommunicationEmailPreference

export type DocumentCategory = $Enums.DocumentCategory

export const DocumentCategory: typeof $Enums.DocumentCategory

export type PreferredContactMethod = $Enums.PreferredContactMethod

export const PreferredContactMethod: typeof $Enums.PreferredContactMethod

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type StudentType = $Enums.StudentType

export const StudentType: typeof $Enums.StudentType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Academic_backlogs
 * const academic_backlogs = await prisma.academic_backlogs.findMany()
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
   * // Fetch zero or more Academic_backlogs
   * const academic_backlogs = await prisma.academic_backlogs.findMany()
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
   * `prisma.academic_backlogs`: Exposes CRUD operations for the **academic_backlogs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Academic_backlogs
    * const academic_backlogs = await prisma.academic_backlogs.findMany()
    * ```
    */
  get academic_backlogs(): Prisma.academic_backlogsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academic_semesters`: Exposes CRUD operations for the **academic_semesters** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Academic_semesters
    * const academic_semesters = await prisma.academic_semesters.findMany()
    * ```
    */
  get academic_semesters(): Prisma.academic_semestersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academic_subjects`: Exposes CRUD operations for the **academic_subjects** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Academic_subjects
    * const academic_subjects = await prisma.academic_subjects.findMany()
    * ```
    */
  get academic_subjects(): Prisma.academic_subjectsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student_contact_details`: Exposes CRUD operations for the **student_contact_details** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Student_contact_details
    * const student_contact_details = await prisma.student_contact_details.findMany()
    * ```
    */
  get student_contact_details(): Prisma.student_contact_detailsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student_documents`: Exposes CRUD operations for the **student_documents** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Student_documents
    * const student_documents = await prisma.student_documents.findMany()
    * ```
    */
  get student_documents(): Prisma.student_documentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student_parent_details`: Exposes CRUD operations for the **student_parent_details** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Student_parent_details
    * const student_parent_details = await prisma.student_parent_details.findMany()
    * ```
    */
  get student_parent_details(): Prisma.student_parent_detailsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student_profiles`: Exposes CRUD operations for the **student_profiles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Student_profiles
    * const student_profiles = await prisma.student_profiles.findMany()
    * ```
    */
  get student_profiles(): Prisma.student_profilesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
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
    academic_backlogs: 'academic_backlogs',
    academic_semesters: 'academic_semesters',
    academic_subjects: 'academic_subjects',
    student_contact_details: 'student_contact_details',
    student_documents: 'student_documents',
    student_parent_details: 'student_parent_details',
    student_profiles: 'student_profiles',
    users: 'users'
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
      modelProps: "academic_backlogs" | "academic_semesters" | "academic_subjects" | "student_contact_details" | "student_documents" | "student_parent_details" | "student_profiles" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      academic_backlogs: {
        payload: Prisma.$academic_backlogsPayload<ExtArgs>
        fields: Prisma.academic_backlogsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.academic_backlogsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.academic_backlogsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload>
          }
          findFirst: {
            args: Prisma.academic_backlogsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.academic_backlogsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload>
          }
          findMany: {
            args: Prisma.academic_backlogsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload>[]
          }
          create: {
            args: Prisma.academic_backlogsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload>
          }
          createMany: {
            args: Prisma.academic_backlogsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.academic_backlogsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload>[]
          }
          delete: {
            args: Prisma.academic_backlogsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload>
          }
          update: {
            args: Prisma.academic_backlogsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload>
          }
          deleteMany: {
            args: Prisma.academic_backlogsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.academic_backlogsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.academic_backlogsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload>[]
          }
          upsert: {
            args: Prisma.academic_backlogsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_backlogsPayload>
          }
          aggregate: {
            args: Prisma.Academic_backlogsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademic_backlogs>
          }
          groupBy: {
            args: Prisma.academic_backlogsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Academic_backlogsGroupByOutputType>[]
          }
          count: {
            args: Prisma.academic_backlogsCountArgs<ExtArgs>
            result: $Utils.Optional<Academic_backlogsCountAggregateOutputType> | number
          }
        }
      }
      academic_semesters: {
        payload: Prisma.$academic_semestersPayload<ExtArgs>
        fields: Prisma.academic_semestersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.academic_semestersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.academic_semestersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload>
          }
          findFirst: {
            args: Prisma.academic_semestersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.academic_semestersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload>
          }
          findMany: {
            args: Prisma.academic_semestersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload>[]
          }
          create: {
            args: Prisma.academic_semestersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload>
          }
          createMany: {
            args: Prisma.academic_semestersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.academic_semestersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload>[]
          }
          delete: {
            args: Prisma.academic_semestersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload>
          }
          update: {
            args: Prisma.academic_semestersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload>
          }
          deleteMany: {
            args: Prisma.academic_semestersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.academic_semestersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.academic_semestersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload>[]
          }
          upsert: {
            args: Prisma.academic_semestersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_semestersPayload>
          }
          aggregate: {
            args: Prisma.Academic_semestersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademic_semesters>
          }
          groupBy: {
            args: Prisma.academic_semestersGroupByArgs<ExtArgs>
            result: $Utils.Optional<Academic_semestersGroupByOutputType>[]
          }
          count: {
            args: Prisma.academic_semestersCountArgs<ExtArgs>
            result: $Utils.Optional<Academic_semestersCountAggregateOutputType> | number
          }
        }
      }
      academic_subjects: {
        payload: Prisma.$academic_subjectsPayload<ExtArgs>
        fields: Prisma.academic_subjectsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.academic_subjectsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.academic_subjectsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload>
          }
          findFirst: {
            args: Prisma.academic_subjectsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.academic_subjectsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload>
          }
          findMany: {
            args: Prisma.academic_subjectsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload>[]
          }
          create: {
            args: Prisma.academic_subjectsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload>
          }
          createMany: {
            args: Prisma.academic_subjectsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.academic_subjectsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload>[]
          }
          delete: {
            args: Prisma.academic_subjectsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload>
          }
          update: {
            args: Prisma.academic_subjectsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload>
          }
          deleteMany: {
            args: Prisma.academic_subjectsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.academic_subjectsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.academic_subjectsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload>[]
          }
          upsert: {
            args: Prisma.academic_subjectsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$academic_subjectsPayload>
          }
          aggregate: {
            args: Prisma.Academic_subjectsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademic_subjects>
          }
          groupBy: {
            args: Prisma.academic_subjectsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Academic_subjectsGroupByOutputType>[]
          }
          count: {
            args: Prisma.academic_subjectsCountArgs<ExtArgs>
            result: $Utils.Optional<Academic_subjectsCountAggregateOutputType> | number
          }
        }
      }
      student_contact_details: {
        payload: Prisma.$student_contact_detailsPayload<ExtArgs>
        fields: Prisma.student_contact_detailsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.student_contact_detailsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.student_contact_detailsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload>
          }
          findFirst: {
            args: Prisma.student_contact_detailsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.student_contact_detailsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload>
          }
          findMany: {
            args: Prisma.student_contact_detailsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload>[]
          }
          create: {
            args: Prisma.student_contact_detailsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload>
          }
          createMany: {
            args: Prisma.student_contact_detailsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.student_contact_detailsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload>[]
          }
          delete: {
            args: Prisma.student_contact_detailsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload>
          }
          update: {
            args: Prisma.student_contact_detailsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload>
          }
          deleteMany: {
            args: Prisma.student_contact_detailsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.student_contact_detailsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.student_contact_detailsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload>[]
          }
          upsert: {
            args: Prisma.student_contact_detailsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_contact_detailsPayload>
          }
          aggregate: {
            args: Prisma.Student_contact_detailsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent_contact_details>
          }
          groupBy: {
            args: Prisma.student_contact_detailsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Student_contact_detailsGroupByOutputType>[]
          }
          count: {
            args: Prisma.student_contact_detailsCountArgs<ExtArgs>
            result: $Utils.Optional<Student_contact_detailsCountAggregateOutputType> | number
          }
        }
      }
      student_documents: {
        payload: Prisma.$student_documentsPayload<ExtArgs>
        fields: Prisma.student_documentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.student_documentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.student_documentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload>
          }
          findFirst: {
            args: Prisma.student_documentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.student_documentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload>
          }
          findMany: {
            args: Prisma.student_documentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload>[]
          }
          create: {
            args: Prisma.student_documentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload>
          }
          createMany: {
            args: Prisma.student_documentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.student_documentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload>[]
          }
          delete: {
            args: Prisma.student_documentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload>
          }
          update: {
            args: Prisma.student_documentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload>
          }
          deleteMany: {
            args: Prisma.student_documentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.student_documentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.student_documentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload>[]
          }
          upsert: {
            args: Prisma.student_documentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_documentsPayload>
          }
          aggregate: {
            args: Prisma.Student_documentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent_documents>
          }
          groupBy: {
            args: Prisma.student_documentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Student_documentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.student_documentsCountArgs<ExtArgs>
            result: $Utils.Optional<Student_documentsCountAggregateOutputType> | number
          }
        }
      }
      student_parent_details: {
        payload: Prisma.$student_parent_detailsPayload<ExtArgs>
        fields: Prisma.student_parent_detailsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.student_parent_detailsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.student_parent_detailsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload>
          }
          findFirst: {
            args: Prisma.student_parent_detailsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.student_parent_detailsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload>
          }
          findMany: {
            args: Prisma.student_parent_detailsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload>[]
          }
          create: {
            args: Prisma.student_parent_detailsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload>
          }
          createMany: {
            args: Prisma.student_parent_detailsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.student_parent_detailsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload>[]
          }
          delete: {
            args: Prisma.student_parent_detailsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload>
          }
          update: {
            args: Prisma.student_parent_detailsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload>
          }
          deleteMany: {
            args: Prisma.student_parent_detailsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.student_parent_detailsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.student_parent_detailsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload>[]
          }
          upsert: {
            args: Prisma.student_parent_detailsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_parent_detailsPayload>
          }
          aggregate: {
            args: Prisma.Student_parent_detailsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent_parent_details>
          }
          groupBy: {
            args: Prisma.student_parent_detailsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Student_parent_detailsGroupByOutputType>[]
          }
          count: {
            args: Prisma.student_parent_detailsCountArgs<ExtArgs>
            result: $Utils.Optional<Student_parent_detailsCountAggregateOutputType> | number
          }
        }
      }
      student_profiles: {
        payload: Prisma.$student_profilesPayload<ExtArgs>
        fields: Prisma.student_profilesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.student_profilesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.student_profilesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload>
          }
          findFirst: {
            args: Prisma.student_profilesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.student_profilesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload>
          }
          findMany: {
            args: Prisma.student_profilesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload>[]
          }
          create: {
            args: Prisma.student_profilesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload>
          }
          createMany: {
            args: Prisma.student_profilesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.student_profilesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload>[]
          }
          delete: {
            args: Prisma.student_profilesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload>
          }
          update: {
            args: Prisma.student_profilesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload>
          }
          deleteMany: {
            args: Prisma.student_profilesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.student_profilesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.student_profilesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload>[]
          }
          upsert: {
            args: Prisma.student_profilesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$student_profilesPayload>
          }
          aggregate: {
            args: Prisma.Student_profilesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent_profiles>
          }
          groupBy: {
            args: Prisma.student_profilesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Student_profilesGroupByOutputType>[]
          }
          count: {
            args: Prisma.student_profilesCountArgs<ExtArgs>
            result: $Utils.Optional<Student_profilesCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
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
    academic_backlogs?: academic_backlogsOmit
    academic_semesters?: academic_semestersOmit
    academic_subjects?: academic_subjectsOmit
    student_contact_details?: student_contact_detailsOmit
    student_documents?: student_documentsOmit
    student_parent_details?: student_parent_detailsOmit
    student_profiles?: student_profilesOmit
    users?: usersOmit
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
   * Count Type Academic_semestersCountOutputType
   */

  export type Academic_semestersCountOutputType = {
    academic_subjects: number
  }

  export type Academic_semestersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academic_subjects?: boolean | Academic_semestersCountOutputTypeCountAcademic_subjectsArgs
  }

  // Custom InputTypes
  /**
   * Academic_semestersCountOutputType without action
   */
  export type Academic_semestersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academic_semestersCountOutputType
     */
    select?: Academic_semestersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Academic_semestersCountOutputType without action
   */
  export type Academic_semestersCountOutputTypeCountAcademic_subjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: academic_subjectsWhereInput
  }


  /**
   * Count Type Student_profilesCountOutputType
   */

  export type Student_profilesCountOutputType = {
    academic_backlogs: number
    academic_semesters: number
    student_documents: number
  }

  export type Student_profilesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academic_backlogs?: boolean | Student_profilesCountOutputTypeCountAcademic_backlogsArgs
    academic_semesters?: boolean | Student_profilesCountOutputTypeCountAcademic_semestersArgs
    student_documents?: boolean | Student_profilesCountOutputTypeCountStudent_documentsArgs
  }

  // Custom InputTypes
  /**
   * Student_profilesCountOutputType without action
   */
  export type Student_profilesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student_profilesCountOutputType
     */
    select?: Student_profilesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Student_profilesCountOutputType without action
   */
  export type Student_profilesCountOutputTypeCountAcademic_backlogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: academic_backlogsWhereInput
  }

  /**
   * Student_profilesCountOutputType without action
   */
  export type Student_profilesCountOutputTypeCountAcademic_semestersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: academic_semestersWhereInput
  }

  /**
   * Student_profilesCountOutputType without action
   */
  export type Student_profilesCountOutputTypeCountStudent_documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: student_documentsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model academic_backlogs
   */

  export type AggregateAcademic_backlogs = {
    _count: Academic_backlogsCountAggregateOutputType | null
    _avg: Academic_backlogsAvgAggregateOutputType | null
    _sum: Academic_backlogsSumAggregateOutputType | null
    _min: Academic_backlogsMinAggregateOutputType | null
    _max: Academic_backlogsMaxAggregateOutputType | null
  }

  export type Academic_backlogsAvgAggregateOutputType = {
    semesterNumber: number | null
    clearedSemesterNumber: number | null
    clearedMarks: number | null
  }

  export type Academic_backlogsSumAggregateOutputType = {
    semesterNumber: number | null
    clearedSemesterNumber: number | null
    clearedMarks: number | null
  }

  export type Academic_backlogsMinAggregateOutputType = {
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

  export type Academic_backlogsMaxAggregateOutputType = {
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

  export type Academic_backlogsCountAggregateOutputType = {
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


  export type Academic_backlogsAvgAggregateInputType = {
    semesterNumber?: true
    clearedSemesterNumber?: true
    clearedMarks?: true
  }

  export type Academic_backlogsSumAggregateInputType = {
    semesterNumber?: true
    clearedSemesterNumber?: true
    clearedMarks?: true
  }

  export type Academic_backlogsMinAggregateInputType = {
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

  export type Academic_backlogsMaxAggregateInputType = {
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

  export type Academic_backlogsCountAggregateInputType = {
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

  export type Academic_backlogsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which academic_backlogs to aggregate.
     */
    where?: academic_backlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_backlogs to fetch.
     */
    orderBy?: academic_backlogsOrderByWithRelationInput | academic_backlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: academic_backlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_backlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_backlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned academic_backlogs
    **/
    _count?: true | Academic_backlogsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Academic_backlogsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Academic_backlogsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Academic_backlogsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Academic_backlogsMaxAggregateInputType
  }

  export type GetAcademic_backlogsAggregateType<T extends Academic_backlogsAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademic_backlogs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademic_backlogs[P]>
      : GetScalarType<T[P], AggregateAcademic_backlogs[P]>
  }




  export type academic_backlogsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: academic_backlogsWhereInput
    orderBy?: academic_backlogsOrderByWithAggregationInput | academic_backlogsOrderByWithAggregationInput[]
    by: Academic_backlogsScalarFieldEnum[] | Academic_backlogsScalarFieldEnum
    having?: academic_backlogsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Academic_backlogsCountAggregateInputType | true
    _avg?: Academic_backlogsAvgAggregateInputType
    _sum?: Academic_backlogsSumAggregateInputType
    _min?: Academic_backlogsMinAggregateInputType
    _max?: Academic_backlogsMaxAggregateInputType
  }

  export type Academic_backlogsGroupByOutputType = {
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
    _count: Academic_backlogsCountAggregateOutputType | null
    _avg: Academic_backlogsAvgAggregateOutputType | null
    _sum: Academic_backlogsSumAggregateOutputType | null
    _min: Academic_backlogsMinAggregateOutputType | null
    _max: Academic_backlogsMaxAggregateOutputType | null
  }

  type GetAcademic_backlogsGroupByPayload<T extends academic_backlogsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Academic_backlogsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Academic_backlogsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Academic_backlogsGroupByOutputType[P]>
            : GetScalarType<T[P], Academic_backlogsGroupByOutputType[P]>
        }
      >
    >


  export type academic_backlogsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academic_backlogs"]>

  export type academic_backlogsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academic_backlogs"]>

  export type academic_backlogsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academic_backlogs"]>

  export type academic_backlogsSelectScalar = {
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

  export type academic_backlogsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProfileId" | "subjectCode" | "subjectName" | "semesterNumber" | "status" | "clearedSemesterNumber" | "clearedGrade" | "clearedMarks" | "clearedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["academic_backlogs"]>
  export type academic_backlogsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }
  export type academic_backlogsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }
  export type academic_backlogsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }

  export type $academic_backlogsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "academic_backlogs"
    objects: {
      student_profiles: Prisma.$student_profilesPayload<ExtArgs>
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
    }, ExtArgs["result"]["academic_backlogs"]>
    composites: {}
  }

  type academic_backlogsGetPayload<S extends boolean | null | undefined | academic_backlogsDefaultArgs> = $Result.GetResult<Prisma.$academic_backlogsPayload, S>

  type academic_backlogsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<academic_backlogsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Academic_backlogsCountAggregateInputType | true
    }

  export interface academic_backlogsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['academic_backlogs'], meta: { name: 'academic_backlogs' } }
    /**
     * Find zero or one Academic_backlogs that matches the filter.
     * @param {academic_backlogsFindUniqueArgs} args - Arguments to find a Academic_backlogs
     * @example
     * // Get one Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends academic_backlogsFindUniqueArgs>(args: SelectSubset<T, academic_backlogsFindUniqueArgs<ExtArgs>>): Prisma__academic_backlogsClient<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Academic_backlogs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {academic_backlogsFindUniqueOrThrowArgs} args - Arguments to find a Academic_backlogs
     * @example
     * // Get one Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends academic_backlogsFindUniqueOrThrowArgs>(args: SelectSubset<T, academic_backlogsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__academic_backlogsClient<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Academic_backlogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_backlogsFindFirstArgs} args - Arguments to find a Academic_backlogs
     * @example
     * // Get one Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends academic_backlogsFindFirstArgs>(args?: SelectSubset<T, academic_backlogsFindFirstArgs<ExtArgs>>): Prisma__academic_backlogsClient<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Academic_backlogs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_backlogsFindFirstOrThrowArgs} args - Arguments to find a Academic_backlogs
     * @example
     * // Get one Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends academic_backlogsFindFirstOrThrowArgs>(args?: SelectSubset<T, academic_backlogsFindFirstOrThrowArgs<ExtArgs>>): Prisma__academic_backlogsClient<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Academic_backlogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_backlogsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.findMany()
     * 
     * // Get first 10 Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academic_backlogsWithIdOnly = await prisma.academic_backlogs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends academic_backlogsFindManyArgs>(args?: SelectSubset<T, academic_backlogsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Academic_backlogs.
     * @param {academic_backlogsCreateArgs} args - Arguments to create a Academic_backlogs.
     * @example
     * // Create one Academic_backlogs
     * const Academic_backlogs = await prisma.academic_backlogs.create({
     *   data: {
     *     // ... data to create a Academic_backlogs
     *   }
     * })
     * 
     */
    create<T extends academic_backlogsCreateArgs>(args: SelectSubset<T, academic_backlogsCreateArgs<ExtArgs>>): Prisma__academic_backlogsClient<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Academic_backlogs.
     * @param {academic_backlogsCreateManyArgs} args - Arguments to create many Academic_backlogs.
     * @example
     * // Create many Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends academic_backlogsCreateManyArgs>(args?: SelectSubset<T, academic_backlogsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Academic_backlogs and returns the data saved in the database.
     * @param {academic_backlogsCreateManyAndReturnArgs} args - Arguments to create many Academic_backlogs.
     * @example
     * // Create many Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Academic_backlogs and only return the `id`
     * const academic_backlogsWithIdOnly = await prisma.academic_backlogs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends academic_backlogsCreateManyAndReturnArgs>(args?: SelectSubset<T, academic_backlogsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Academic_backlogs.
     * @param {academic_backlogsDeleteArgs} args - Arguments to delete one Academic_backlogs.
     * @example
     * // Delete one Academic_backlogs
     * const Academic_backlogs = await prisma.academic_backlogs.delete({
     *   where: {
     *     // ... filter to delete one Academic_backlogs
     *   }
     * })
     * 
     */
    delete<T extends academic_backlogsDeleteArgs>(args: SelectSubset<T, academic_backlogsDeleteArgs<ExtArgs>>): Prisma__academic_backlogsClient<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Academic_backlogs.
     * @param {academic_backlogsUpdateArgs} args - Arguments to update one Academic_backlogs.
     * @example
     * // Update one Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends academic_backlogsUpdateArgs>(args: SelectSubset<T, academic_backlogsUpdateArgs<ExtArgs>>): Prisma__academic_backlogsClient<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Academic_backlogs.
     * @param {academic_backlogsDeleteManyArgs} args - Arguments to filter Academic_backlogs to delete.
     * @example
     * // Delete a few Academic_backlogs
     * const { count } = await prisma.academic_backlogs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends academic_backlogsDeleteManyArgs>(args?: SelectSubset<T, academic_backlogsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Academic_backlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_backlogsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends academic_backlogsUpdateManyArgs>(args: SelectSubset<T, academic_backlogsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Academic_backlogs and returns the data updated in the database.
     * @param {academic_backlogsUpdateManyAndReturnArgs} args - Arguments to update many Academic_backlogs.
     * @example
     * // Update many Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Academic_backlogs and only return the `id`
     * const academic_backlogsWithIdOnly = await prisma.academic_backlogs.updateManyAndReturn({
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
    updateManyAndReturn<T extends academic_backlogsUpdateManyAndReturnArgs>(args: SelectSubset<T, academic_backlogsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Academic_backlogs.
     * @param {academic_backlogsUpsertArgs} args - Arguments to update or create a Academic_backlogs.
     * @example
     * // Update or create a Academic_backlogs
     * const academic_backlogs = await prisma.academic_backlogs.upsert({
     *   create: {
     *     // ... data to create a Academic_backlogs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Academic_backlogs we want to update
     *   }
     * })
     */
    upsert<T extends academic_backlogsUpsertArgs>(args: SelectSubset<T, academic_backlogsUpsertArgs<ExtArgs>>): Prisma__academic_backlogsClient<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Academic_backlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_backlogsCountArgs} args - Arguments to filter Academic_backlogs to count.
     * @example
     * // Count the number of Academic_backlogs
     * const count = await prisma.academic_backlogs.count({
     *   where: {
     *     // ... the filter for the Academic_backlogs we want to count
     *   }
     * })
    **/
    count<T extends academic_backlogsCountArgs>(
      args?: Subset<T, academic_backlogsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Academic_backlogsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Academic_backlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Academic_backlogsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Academic_backlogsAggregateArgs>(args: Subset<T, Academic_backlogsAggregateArgs>): Prisma.PrismaPromise<GetAcademic_backlogsAggregateType<T>>

    /**
     * Group by Academic_backlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_backlogsGroupByArgs} args - Group by arguments.
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
      T extends academic_backlogsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: academic_backlogsGroupByArgs['orderBy'] }
        : { orderBy?: academic_backlogsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, academic_backlogsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademic_backlogsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the academic_backlogs model
   */
  readonly fields: academic_backlogsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for academic_backlogs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__academic_backlogsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student_profiles<T extends student_profilesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, student_profilesDefaultArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the academic_backlogs model
   */
  interface academic_backlogsFieldRefs {
    readonly id: FieldRef<"academic_backlogs", 'String'>
    readonly studentProfileId: FieldRef<"academic_backlogs", 'String'>
    readonly subjectCode: FieldRef<"academic_backlogs", 'String'>
    readonly subjectName: FieldRef<"academic_backlogs", 'String'>
    readonly semesterNumber: FieldRef<"academic_backlogs", 'Int'>
    readonly status: FieldRef<"academic_backlogs", 'AcademicBacklogStatus'>
    readonly clearedSemesterNumber: FieldRef<"academic_backlogs", 'Int'>
    readonly clearedGrade: FieldRef<"academic_backlogs", 'String'>
    readonly clearedMarks: FieldRef<"academic_backlogs", 'Float'>
    readonly clearedAt: FieldRef<"academic_backlogs", 'DateTime'>
    readonly createdAt: FieldRef<"academic_backlogs", 'DateTime'>
    readonly updatedAt: FieldRef<"academic_backlogs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * academic_backlogs findUnique
   */
  export type academic_backlogsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
    /**
     * Filter, which academic_backlogs to fetch.
     */
    where: academic_backlogsWhereUniqueInput
  }

  /**
   * academic_backlogs findUniqueOrThrow
   */
  export type academic_backlogsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
    /**
     * Filter, which academic_backlogs to fetch.
     */
    where: academic_backlogsWhereUniqueInput
  }

  /**
   * academic_backlogs findFirst
   */
  export type academic_backlogsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
    /**
     * Filter, which academic_backlogs to fetch.
     */
    where?: academic_backlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_backlogs to fetch.
     */
    orderBy?: academic_backlogsOrderByWithRelationInput | academic_backlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for academic_backlogs.
     */
    cursor?: academic_backlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_backlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_backlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of academic_backlogs.
     */
    distinct?: Academic_backlogsScalarFieldEnum | Academic_backlogsScalarFieldEnum[]
  }

  /**
   * academic_backlogs findFirstOrThrow
   */
  export type academic_backlogsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
    /**
     * Filter, which academic_backlogs to fetch.
     */
    where?: academic_backlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_backlogs to fetch.
     */
    orderBy?: academic_backlogsOrderByWithRelationInput | academic_backlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for academic_backlogs.
     */
    cursor?: academic_backlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_backlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_backlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of academic_backlogs.
     */
    distinct?: Academic_backlogsScalarFieldEnum | Academic_backlogsScalarFieldEnum[]
  }

  /**
   * academic_backlogs findMany
   */
  export type academic_backlogsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
    /**
     * Filter, which academic_backlogs to fetch.
     */
    where?: academic_backlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_backlogs to fetch.
     */
    orderBy?: academic_backlogsOrderByWithRelationInput | academic_backlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing academic_backlogs.
     */
    cursor?: academic_backlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_backlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_backlogs.
     */
    skip?: number
    distinct?: Academic_backlogsScalarFieldEnum | Academic_backlogsScalarFieldEnum[]
  }

  /**
   * academic_backlogs create
   */
  export type academic_backlogsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
    /**
     * The data needed to create a academic_backlogs.
     */
    data: XOR<academic_backlogsCreateInput, academic_backlogsUncheckedCreateInput>
  }

  /**
   * academic_backlogs createMany
   */
  export type academic_backlogsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many academic_backlogs.
     */
    data: academic_backlogsCreateManyInput | academic_backlogsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * academic_backlogs createManyAndReturn
   */
  export type academic_backlogsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * The data used to create many academic_backlogs.
     */
    data: academic_backlogsCreateManyInput | academic_backlogsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * academic_backlogs update
   */
  export type academic_backlogsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
    /**
     * The data needed to update a academic_backlogs.
     */
    data: XOR<academic_backlogsUpdateInput, academic_backlogsUncheckedUpdateInput>
    /**
     * Choose, which academic_backlogs to update.
     */
    where: academic_backlogsWhereUniqueInput
  }

  /**
   * academic_backlogs updateMany
   */
  export type academic_backlogsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update academic_backlogs.
     */
    data: XOR<academic_backlogsUpdateManyMutationInput, academic_backlogsUncheckedUpdateManyInput>
    /**
     * Filter which academic_backlogs to update
     */
    where?: academic_backlogsWhereInput
    /**
     * Limit how many academic_backlogs to update.
     */
    limit?: number
  }

  /**
   * academic_backlogs updateManyAndReturn
   */
  export type academic_backlogsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * The data used to update academic_backlogs.
     */
    data: XOR<academic_backlogsUpdateManyMutationInput, academic_backlogsUncheckedUpdateManyInput>
    /**
     * Filter which academic_backlogs to update
     */
    where?: academic_backlogsWhereInput
    /**
     * Limit how many academic_backlogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * academic_backlogs upsert
   */
  export type academic_backlogsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
    /**
     * The filter to search for the academic_backlogs to update in case it exists.
     */
    where: academic_backlogsWhereUniqueInput
    /**
     * In case the academic_backlogs found by the `where` argument doesn't exist, create a new academic_backlogs with this data.
     */
    create: XOR<academic_backlogsCreateInput, academic_backlogsUncheckedCreateInput>
    /**
     * In case the academic_backlogs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<academic_backlogsUpdateInput, academic_backlogsUncheckedUpdateInput>
  }

  /**
   * academic_backlogs delete
   */
  export type academic_backlogsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
    /**
     * Filter which academic_backlogs to delete.
     */
    where: academic_backlogsWhereUniqueInput
  }

  /**
   * academic_backlogs deleteMany
   */
  export type academic_backlogsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which academic_backlogs to delete
     */
    where?: academic_backlogsWhereInput
    /**
     * Limit how many academic_backlogs to delete.
     */
    limit?: number
  }

  /**
   * academic_backlogs without action
   */
  export type academic_backlogsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
  }


  /**
   * Model academic_semesters
   */

  export type AggregateAcademic_semesters = {
    _count: Academic_semestersCountAggregateOutputType | null
    _avg: Academic_semestersAvgAggregateOutputType | null
    _sum: Academic_semestersSumAggregateOutputType | null
    _min: Academic_semestersMinAggregateOutputType | null
    _max: Academic_semestersMaxAggregateOutputType | null
  }

  export type Academic_semestersAvgAggregateOutputType = {
    semesterNumber: number | null
    sgpa: number | null
    totalCredits: number | null
    creditsEarned: number | null
    backlogs: number | null
  }

  export type Academic_semestersSumAggregateOutputType = {
    semesterNumber: number | null
    sgpa: number | null
    totalCredits: number | null
    creditsEarned: number | null
    backlogs: number | null
  }

  export type Academic_semestersMinAggregateOutputType = {
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

  export type Academic_semestersMaxAggregateOutputType = {
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

  export type Academic_semestersCountAggregateOutputType = {
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


  export type Academic_semestersAvgAggregateInputType = {
    semesterNumber?: true
    sgpa?: true
    totalCredits?: true
    creditsEarned?: true
    backlogs?: true
  }

  export type Academic_semestersSumAggregateInputType = {
    semesterNumber?: true
    sgpa?: true
    totalCredits?: true
    creditsEarned?: true
    backlogs?: true
  }

  export type Academic_semestersMinAggregateInputType = {
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

  export type Academic_semestersMaxAggregateInputType = {
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

  export type Academic_semestersCountAggregateInputType = {
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

  export type Academic_semestersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which academic_semesters to aggregate.
     */
    where?: academic_semestersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_semesters to fetch.
     */
    orderBy?: academic_semestersOrderByWithRelationInput | academic_semestersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: academic_semestersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_semesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned academic_semesters
    **/
    _count?: true | Academic_semestersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Academic_semestersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Academic_semestersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Academic_semestersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Academic_semestersMaxAggregateInputType
  }

  export type GetAcademic_semestersAggregateType<T extends Academic_semestersAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademic_semesters]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademic_semesters[P]>
      : GetScalarType<T[P], AggregateAcademic_semesters[P]>
  }




  export type academic_semestersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: academic_semestersWhereInput
    orderBy?: academic_semestersOrderByWithAggregationInput | academic_semestersOrderByWithAggregationInput[]
    by: Academic_semestersScalarFieldEnum[] | Academic_semestersScalarFieldEnum
    having?: academic_semestersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Academic_semestersCountAggregateInputType | true
    _avg?: Academic_semestersAvgAggregateInputType
    _sum?: Academic_semestersSumAggregateInputType
    _min?: Academic_semestersMinAggregateInputType
    _max?: Academic_semestersMaxAggregateInputType
  }

  export type Academic_semestersGroupByOutputType = {
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
    _count: Academic_semestersCountAggregateOutputType | null
    _avg: Academic_semestersAvgAggregateOutputType | null
    _sum: Academic_semestersSumAggregateOutputType | null
    _min: Academic_semestersMinAggregateOutputType | null
    _max: Academic_semestersMaxAggregateOutputType | null
  }

  type GetAcademic_semestersGroupByPayload<T extends academic_semestersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Academic_semestersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Academic_semestersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Academic_semestersGroupByOutputType[P]>
            : GetScalarType<T[P], Academic_semestersGroupByOutputType[P]>
        }
      >
    >


  export type academic_semestersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
    academic_subjects?: boolean | academic_semesters$academic_subjectsArgs<ExtArgs>
    _count?: boolean | Academic_semestersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academic_semesters"]>

  export type academic_semestersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academic_semesters"]>

  export type academic_semestersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academic_semesters"]>

  export type academic_semestersSelectScalar = {
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

  export type academic_semestersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProfileId" | "semesterNumber" | "academicYear" | "term" | "status" | "entryStatus" | "sgpa" | "totalCredits" | "creditsEarned" | "backlogs" | "createdAt" | "updatedAt", ExtArgs["result"]["academic_semesters"]>
  export type academic_semestersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
    academic_subjects?: boolean | academic_semesters$academic_subjectsArgs<ExtArgs>
    _count?: boolean | Academic_semestersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type academic_semestersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }
  export type academic_semestersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }

  export type $academic_semestersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "academic_semesters"
    objects: {
      student_profiles: Prisma.$student_profilesPayload<ExtArgs>
      academic_subjects: Prisma.$academic_subjectsPayload<ExtArgs>[]
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
    }, ExtArgs["result"]["academic_semesters"]>
    composites: {}
  }

  type academic_semestersGetPayload<S extends boolean | null | undefined | academic_semestersDefaultArgs> = $Result.GetResult<Prisma.$academic_semestersPayload, S>

  type academic_semestersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<academic_semestersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Academic_semestersCountAggregateInputType | true
    }

  export interface academic_semestersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['academic_semesters'], meta: { name: 'academic_semesters' } }
    /**
     * Find zero or one Academic_semesters that matches the filter.
     * @param {academic_semestersFindUniqueArgs} args - Arguments to find a Academic_semesters
     * @example
     * // Get one Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends academic_semestersFindUniqueArgs>(args: SelectSubset<T, academic_semestersFindUniqueArgs<ExtArgs>>): Prisma__academic_semestersClient<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Academic_semesters that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {academic_semestersFindUniqueOrThrowArgs} args - Arguments to find a Academic_semesters
     * @example
     * // Get one Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends academic_semestersFindUniqueOrThrowArgs>(args: SelectSubset<T, academic_semestersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__academic_semestersClient<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Academic_semesters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_semestersFindFirstArgs} args - Arguments to find a Academic_semesters
     * @example
     * // Get one Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends academic_semestersFindFirstArgs>(args?: SelectSubset<T, academic_semestersFindFirstArgs<ExtArgs>>): Prisma__academic_semestersClient<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Academic_semesters that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_semestersFindFirstOrThrowArgs} args - Arguments to find a Academic_semesters
     * @example
     * // Get one Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends academic_semestersFindFirstOrThrowArgs>(args?: SelectSubset<T, academic_semestersFindFirstOrThrowArgs<ExtArgs>>): Prisma__academic_semestersClient<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Academic_semesters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_semestersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.findMany()
     * 
     * // Get first 10 Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academic_semestersWithIdOnly = await prisma.academic_semesters.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends academic_semestersFindManyArgs>(args?: SelectSubset<T, academic_semestersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Academic_semesters.
     * @param {academic_semestersCreateArgs} args - Arguments to create a Academic_semesters.
     * @example
     * // Create one Academic_semesters
     * const Academic_semesters = await prisma.academic_semesters.create({
     *   data: {
     *     // ... data to create a Academic_semesters
     *   }
     * })
     * 
     */
    create<T extends academic_semestersCreateArgs>(args: SelectSubset<T, academic_semestersCreateArgs<ExtArgs>>): Prisma__academic_semestersClient<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Academic_semesters.
     * @param {academic_semestersCreateManyArgs} args - Arguments to create many Academic_semesters.
     * @example
     * // Create many Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends academic_semestersCreateManyArgs>(args?: SelectSubset<T, academic_semestersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Academic_semesters and returns the data saved in the database.
     * @param {academic_semestersCreateManyAndReturnArgs} args - Arguments to create many Academic_semesters.
     * @example
     * // Create many Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Academic_semesters and only return the `id`
     * const academic_semestersWithIdOnly = await prisma.academic_semesters.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends academic_semestersCreateManyAndReturnArgs>(args?: SelectSubset<T, academic_semestersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Academic_semesters.
     * @param {academic_semestersDeleteArgs} args - Arguments to delete one Academic_semesters.
     * @example
     * // Delete one Academic_semesters
     * const Academic_semesters = await prisma.academic_semesters.delete({
     *   where: {
     *     // ... filter to delete one Academic_semesters
     *   }
     * })
     * 
     */
    delete<T extends academic_semestersDeleteArgs>(args: SelectSubset<T, academic_semestersDeleteArgs<ExtArgs>>): Prisma__academic_semestersClient<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Academic_semesters.
     * @param {academic_semestersUpdateArgs} args - Arguments to update one Academic_semesters.
     * @example
     * // Update one Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends academic_semestersUpdateArgs>(args: SelectSubset<T, academic_semestersUpdateArgs<ExtArgs>>): Prisma__academic_semestersClient<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Academic_semesters.
     * @param {academic_semestersDeleteManyArgs} args - Arguments to filter Academic_semesters to delete.
     * @example
     * // Delete a few Academic_semesters
     * const { count } = await prisma.academic_semesters.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends academic_semestersDeleteManyArgs>(args?: SelectSubset<T, academic_semestersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Academic_semesters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_semestersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends academic_semestersUpdateManyArgs>(args: SelectSubset<T, academic_semestersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Academic_semesters and returns the data updated in the database.
     * @param {academic_semestersUpdateManyAndReturnArgs} args - Arguments to update many Academic_semesters.
     * @example
     * // Update many Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Academic_semesters and only return the `id`
     * const academic_semestersWithIdOnly = await prisma.academic_semesters.updateManyAndReturn({
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
    updateManyAndReturn<T extends academic_semestersUpdateManyAndReturnArgs>(args: SelectSubset<T, academic_semestersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Academic_semesters.
     * @param {academic_semestersUpsertArgs} args - Arguments to update or create a Academic_semesters.
     * @example
     * // Update or create a Academic_semesters
     * const academic_semesters = await prisma.academic_semesters.upsert({
     *   create: {
     *     // ... data to create a Academic_semesters
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Academic_semesters we want to update
     *   }
     * })
     */
    upsert<T extends academic_semestersUpsertArgs>(args: SelectSubset<T, academic_semestersUpsertArgs<ExtArgs>>): Prisma__academic_semestersClient<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Academic_semesters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_semestersCountArgs} args - Arguments to filter Academic_semesters to count.
     * @example
     * // Count the number of Academic_semesters
     * const count = await prisma.academic_semesters.count({
     *   where: {
     *     // ... the filter for the Academic_semesters we want to count
     *   }
     * })
    **/
    count<T extends academic_semestersCountArgs>(
      args?: Subset<T, academic_semestersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Academic_semestersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Academic_semesters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Academic_semestersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Academic_semestersAggregateArgs>(args: Subset<T, Academic_semestersAggregateArgs>): Prisma.PrismaPromise<GetAcademic_semestersAggregateType<T>>

    /**
     * Group by Academic_semesters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_semestersGroupByArgs} args - Group by arguments.
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
      T extends academic_semestersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: academic_semestersGroupByArgs['orderBy'] }
        : { orderBy?: academic_semestersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, academic_semestersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademic_semestersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the academic_semesters model
   */
  readonly fields: academic_semestersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for academic_semesters.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__academic_semestersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student_profiles<T extends student_profilesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, student_profilesDefaultArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    academic_subjects<T extends academic_semesters$academic_subjectsArgs<ExtArgs> = {}>(args?: Subset<T, academic_semesters$academic_subjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the academic_semesters model
   */
  interface academic_semestersFieldRefs {
    readonly id: FieldRef<"academic_semesters", 'String'>
    readonly studentProfileId: FieldRef<"academic_semesters", 'String'>
    readonly semesterNumber: FieldRef<"academic_semesters", 'Int'>
    readonly academicYear: FieldRef<"academic_semesters", 'String'>
    readonly term: FieldRef<"academic_semesters", 'String'>
    readonly status: FieldRef<"academic_semesters", 'AcademicSemesterStatus'>
    readonly entryStatus: FieldRef<"academic_semesters", 'AcademicEntryStatus'>
    readonly sgpa: FieldRef<"academic_semesters", 'Float'>
    readonly totalCredits: FieldRef<"academic_semesters", 'Int'>
    readonly creditsEarned: FieldRef<"academic_semesters", 'Int'>
    readonly backlogs: FieldRef<"academic_semesters", 'Int'>
    readonly createdAt: FieldRef<"academic_semesters", 'DateTime'>
    readonly updatedAt: FieldRef<"academic_semesters", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * academic_semesters findUnique
   */
  export type academic_semestersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
    /**
     * Filter, which academic_semesters to fetch.
     */
    where: academic_semestersWhereUniqueInput
  }

  /**
   * academic_semesters findUniqueOrThrow
   */
  export type academic_semestersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
    /**
     * Filter, which academic_semesters to fetch.
     */
    where: academic_semestersWhereUniqueInput
  }

  /**
   * academic_semesters findFirst
   */
  export type academic_semestersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
    /**
     * Filter, which academic_semesters to fetch.
     */
    where?: academic_semestersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_semesters to fetch.
     */
    orderBy?: academic_semestersOrderByWithRelationInput | academic_semestersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for academic_semesters.
     */
    cursor?: academic_semestersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_semesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of academic_semesters.
     */
    distinct?: Academic_semestersScalarFieldEnum | Academic_semestersScalarFieldEnum[]
  }

  /**
   * academic_semesters findFirstOrThrow
   */
  export type academic_semestersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
    /**
     * Filter, which academic_semesters to fetch.
     */
    where?: academic_semestersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_semesters to fetch.
     */
    orderBy?: academic_semestersOrderByWithRelationInput | academic_semestersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for academic_semesters.
     */
    cursor?: academic_semestersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_semesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of academic_semesters.
     */
    distinct?: Academic_semestersScalarFieldEnum | Academic_semestersScalarFieldEnum[]
  }

  /**
   * academic_semesters findMany
   */
  export type academic_semestersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
    /**
     * Filter, which academic_semesters to fetch.
     */
    where?: academic_semestersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_semesters to fetch.
     */
    orderBy?: academic_semestersOrderByWithRelationInput | academic_semestersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing academic_semesters.
     */
    cursor?: academic_semestersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_semesters.
     */
    skip?: number
    distinct?: Academic_semestersScalarFieldEnum | Academic_semestersScalarFieldEnum[]
  }

  /**
   * academic_semesters create
   */
  export type academic_semestersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
    /**
     * The data needed to create a academic_semesters.
     */
    data: XOR<academic_semestersCreateInput, academic_semestersUncheckedCreateInput>
  }

  /**
   * academic_semesters createMany
   */
  export type academic_semestersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many academic_semesters.
     */
    data: academic_semestersCreateManyInput | academic_semestersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * academic_semesters createManyAndReturn
   */
  export type academic_semestersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * The data used to create many academic_semesters.
     */
    data: academic_semestersCreateManyInput | academic_semestersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * academic_semesters update
   */
  export type academic_semestersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
    /**
     * The data needed to update a academic_semesters.
     */
    data: XOR<academic_semestersUpdateInput, academic_semestersUncheckedUpdateInput>
    /**
     * Choose, which academic_semesters to update.
     */
    where: academic_semestersWhereUniqueInput
  }

  /**
   * academic_semesters updateMany
   */
  export type academic_semestersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update academic_semesters.
     */
    data: XOR<academic_semestersUpdateManyMutationInput, academic_semestersUncheckedUpdateManyInput>
    /**
     * Filter which academic_semesters to update
     */
    where?: academic_semestersWhereInput
    /**
     * Limit how many academic_semesters to update.
     */
    limit?: number
  }

  /**
   * academic_semesters updateManyAndReturn
   */
  export type academic_semestersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * The data used to update academic_semesters.
     */
    data: XOR<academic_semestersUpdateManyMutationInput, academic_semestersUncheckedUpdateManyInput>
    /**
     * Filter which academic_semesters to update
     */
    where?: academic_semestersWhereInput
    /**
     * Limit how many academic_semesters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * academic_semesters upsert
   */
  export type academic_semestersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
    /**
     * The filter to search for the academic_semesters to update in case it exists.
     */
    where: academic_semestersWhereUniqueInput
    /**
     * In case the academic_semesters found by the `where` argument doesn't exist, create a new academic_semesters with this data.
     */
    create: XOR<academic_semestersCreateInput, academic_semestersUncheckedCreateInput>
    /**
     * In case the academic_semesters was found with the provided `where` argument, update it with this data.
     */
    update: XOR<academic_semestersUpdateInput, academic_semestersUncheckedUpdateInput>
  }

  /**
   * academic_semesters delete
   */
  export type academic_semestersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
    /**
     * Filter which academic_semesters to delete.
     */
    where: academic_semestersWhereUniqueInput
  }

  /**
   * academic_semesters deleteMany
   */
  export type academic_semestersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which academic_semesters to delete
     */
    where?: academic_semestersWhereInput
    /**
     * Limit how many academic_semesters to delete.
     */
    limit?: number
  }

  /**
   * academic_semesters.academic_subjects
   */
  export type academic_semesters$academic_subjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
    where?: academic_subjectsWhereInput
    orderBy?: academic_subjectsOrderByWithRelationInput | academic_subjectsOrderByWithRelationInput[]
    cursor?: academic_subjectsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Academic_subjectsScalarFieldEnum | Academic_subjectsScalarFieldEnum[]
  }

  /**
   * academic_semesters without action
   */
  export type academic_semestersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
  }


  /**
   * Model academic_subjects
   */

  export type AggregateAcademic_subjects = {
    _count: Academic_subjectsCountAggregateOutputType | null
    _avg: Academic_subjectsAvgAggregateOutputType | null
    _sum: Academic_subjectsSumAggregateOutputType | null
    _min: Academic_subjectsMinAggregateOutputType | null
    _max: Academic_subjectsMaxAggregateOutputType | null
  }

  export type Academic_subjectsAvgAggregateOutputType = {
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

  export type Academic_subjectsSumAggregateOutputType = {
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

  export type Academic_subjectsMinAggregateOutputType = {
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

  export type Academic_subjectsMaxAggregateOutputType = {
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

  export type Academic_subjectsCountAggregateOutputType = {
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


  export type Academic_subjectsAvgAggregateInputType = {
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

  export type Academic_subjectsSumAggregateInputType = {
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

  export type Academic_subjectsMinAggregateInputType = {
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

  export type Academic_subjectsMaxAggregateInputType = {
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

  export type Academic_subjectsCountAggregateInputType = {
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

  export type Academic_subjectsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which academic_subjects to aggregate.
     */
    where?: academic_subjectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_subjects to fetch.
     */
    orderBy?: academic_subjectsOrderByWithRelationInput | academic_subjectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: academic_subjectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned academic_subjects
    **/
    _count?: true | Academic_subjectsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Academic_subjectsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Academic_subjectsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Academic_subjectsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Academic_subjectsMaxAggregateInputType
  }

  export type GetAcademic_subjectsAggregateType<T extends Academic_subjectsAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademic_subjects]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademic_subjects[P]>
      : GetScalarType<T[P], AggregateAcademic_subjects[P]>
  }




  export type academic_subjectsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: academic_subjectsWhereInput
    orderBy?: academic_subjectsOrderByWithAggregationInput | academic_subjectsOrderByWithAggregationInput[]
    by: Academic_subjectsScalarFieldEnum[] | Academic_subjectsScalarFieldEnum
    having?: academic_subjectsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Academic_subjectsCountAggregateInputType | true
    _avg?: Academic_subjectsAvgAggregateInputType
    _sum?: Academic_subjectsSumAggregateInputType
    _min?: Academic_subjectsMinAggregateInputType
    _max?: Academic_subjectsMaxAggregateInputType
  }

  export type Academic_subjectsGroupByOutputType = {
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
    _count: Academic_subjectsCountAggregateOutputType | null
    _avg: Academic_subjectsAvgAggregateOutputType | null
    _sum: Academic_subjectsSumAggregateOutputType | null
    _min: Academic_subjectsMinAggregateOutputType | null
    _max: Academic_subjectsMaxAggregateOutputType | null
  }

  type GetAcademic_subjectsGroupByPayload<T extends academic_subjectsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Academic_subjectsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Academic_subjectsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Academic_subjectsGroupByOutputType[P]>
            : GetScalarType<T[P], Academic_subjectsGroupByOutputType[P]>
        }
      >
    >


  export type academic_subjectsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    academic_semesters?: boolean | academic_semestersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academic_subjects"]>

  export type academic_subjectsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    academic_semesters?: boolean | academic_semestersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academic_subjects"]>

  export type academic_subjectsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    academic_semesters?: boolean | academic_semestersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academic_subjects"]>

  export type academic_subjectsSelectScalar = {
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

  export type academic_subjectsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "academicSemesterId" | "courseCode" | "courseName" | "credits" | "cia1" | "cia2" | "cia3" | "mse" | "ese" | "maximumMarks" | "totalMarksObtained" | "grade" | "gradePoint" | "attendance" | "createdAt" | "updatedAt" | "classesAttended" | "classesHeld", ExtArgs["result"]["academic_subjects"]>
  export type academic_subjectsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academic_semesters?: boolean | academic_semestersDefaultArgs<ExtArgs>
  }
  export type academic_subjectsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academic_semesters?: boolean | academic_semestersDefaultArgs<ExtArgs>
  }
  export type academic_subjectsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academic_semesters?: boolean | academic_semestersDefaultArgs<ExtArgs>
  }

  export type $academic_subjectsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "academic_subjects"
    objects: {
      academic_semesters: Prisma.$academic_semestersPayload<ExtArgs>
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
    }, ExtArgs["result"]["academic_subjects"]>
    composites: {}
  }

  type academic_subjectsGetPayload<S extends boolean | null | undefined | academic_subjectsDefaultArgs> = $Result.GetResult<Prisma.$academic_subjectsPayload, S>

  type academic_subjectsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<academic_subjectsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Academic_subjectsCountAggregateInputType | true
    }

  export interface academic_subjectsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['academic_subjects'], meta: { name: 'academic_subjects' } }
    /**
     * Find zero or one Academic_subjects that matches the filter.
     * @param {academic_subjectsFindUniqueArgs} args - Arguments to find a Academic_subjects
     * @example
     * // Get one Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends academic_subjectsFindUniqueArgs>(args: SelectSubset<T, academic_subjectsFindUniqueArgs<ExtArgs>>): Prisma__academic_subjectsClient<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Academic_subjects that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {academic_subjectsFindUniqueOrThrowArgs} args - Arguments to find a Academic_subjects
     * @example
     * // Get one Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends academic_subjectsFindUniqueOrThrowArgs>(args: SelectSubset<T, academic_subjectsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__academic_subjectsClient<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Academic_subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_subjectsFindFirstArgs} args - Arguments to find a Academic_subjects
     * @example
     * // Get one Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends academic_subjectsFindFirstArgs>(args?: SelectSubset<T, academic_subjectsFindFirstArgs<ExtArgs>>): Prisma__academic_subjectsClient<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Academic_subjects that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_subjectsFindFirstOrThrowArgs} args - Arguments to find a Academic_subjects
     * @example
     * // Get one Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends academic_subjectsFindFirstOrThrowArgs>(args?: SelectSubset<T, academic_subjectsFindFirstOrThrowArgs<ExtArgs>>): Prisma__academic_subjectsClient<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Academic_subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_subjectsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.findMany()
     * 
     * // Get first 10 Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academic_subjectsWithIdOnly = await prisma.academic_subjects.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends academic_subjectsFindManyArgs>(args?: SelectSubset<T, academic_subjectsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Academic_subjects.
     * @param {academic_subjectsCreateArgs} args - Arguments to create a Academic_subjects.
     * @example
     * // Create one Academic_subjects
     * const Academic_subjects = await prisma.academic_subjects.create({
     *   data: {
     *     // ... data to create a Academic_subjects
     *   }
     * })
     * 
     */
    create<T extends academic_subjectsCreateArgs>(args: SelectSubset<T, academic_subjectsCreateArgs<ExtArgs>>): Prisma__academic_subjectsClient<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Academic_subjects.
     * @param {academic_subjectsCreateManyArgs} args - Arguments to create many Academic_subjects.
     * @example
     * // Create many Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends academic_subjectsCreateManyArgs>(args?: SelectSubset<T, academic_subjectsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Academic_subjects and returns the data saved in the database.
     * @param {academic_subjectsCreateManyAndReturnArgs} args - Arguments to create many Academic_subjects.
     * @example
     * // Create many Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Academic_subjects and only return the `id`
     * const academic_subjectsWithIdOnly = await prisma.academic_subjects.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends academic_subjectsCreateManyAndReturnArgs>(args?: SelectSubset<T, academic_subjectsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Academic_subjects.
     * @param {academic_subjectsDeleteArgs} args - Arguments to delete one Academic_subjects.
     * @example
     * // Delete one Academic_subjects
     * const Academic_subjects = await prisma.academic_subjects.delete({
     *   where: {
     *     // ... filter to delete one Academic_subjects
     *   }
     * })
     * 
     */
    delete<T extends academic_subjectsDeleteArgs>(args: SelectSubset<T, academic_subjectsDeleteArgs<ExtArgs>>): Prisma__academic_subjectsClient<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Academic_subjects.
     * @param {academic_subjectsUpdateArgs} args - Arguments to update one Academic_subjects.
     * @example
     * // Update one Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends academic_subjectsUpdateArgs>(args: SelectSubset<T, academic_subjectsUpdateArgs<ExtArgs>>): Prisma__academic_subjectsClient<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Academic_subjects.
     * @param {academic_subjectsDeleteManyArgs} args - Arguments to filter Academic_subjects to delete.
     * @example
     * // Delete a few Academic_subjects
     * const { count } = await prisma.academic_subjects.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends academic_subjectsDeleteManyArgs>(args?: SelectSubset<T, academic_subjectsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Academic_subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_subjectsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends academic_subjectsUpdateManyArgs>(args: SelectSubset<T, academic_subjectsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Academic_subjects and returns the data updated in the database.
     * @param {academic_subjectsUpdateManyAndReturnArgs} args - Arguments to update many Academic_subjects.
     * @example
     * // Update many Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Academic_subjects and only return the `id`
     * const academic_subjectsWithIdOnly = await prisma.academic_subjects.updateManyAndReturn({
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
    updateManyAndReturn<T extends academic_subjectsUpdateManyAndReturnArgs>(args: SelectSubset<T, academic_subjectsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Academic_subjects.
     * @param {academic_subjectsUpsertArgs} args - Arguments to update or create a Academic_subjects.
     * @example
     * // Update or create a Academic_subjects
     * const academic_subjects = await prisma.academic_subjects.upsert({
     *   create: {
     *     // ... data to create a Academic_subjects
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Academic_subjects we want to update
     *   }
     * })
     */
    upsert<T extends academic_subjectsUpsertArgs>(args: SelectSubset<T, academic_subjectsUpsertArgs<ExtArgs>>): Prisma__academic_subjectsClient<$Result.GetResult<Prisma.$academic_subjectsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Academic_subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_subjectsCountArgs} args - Arguments to filter Academic_subjects to count.
     * @example
     * // Count the number of Academic_subjects
     * const count = await prisma.academic_subjects.count({
     *   where: {
     *     // ... the filter for the Academic_subjects we want to count
     *   }
     * })
    **/
    count<T extends academic_subjectsCountArgs>(
      args?: Subset<T, academic_subjectsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Academic_subjectsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Academic_subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Academic_subjectsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Academic_subjectsAggregateArgs>(args: Subset<T, Academic_subjectsAggregateArgs>): Prisma.PrismaPromise<GetAcademic_subjectsAggregateType<T>>

    /**
     * Group by Academic_subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {academic_subjectsGroupByArgs} args - Group by arguments.
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
      T extends academic_subjectsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: academic_subjectsGroupByArgs['orderBy'] }
        : { orderBy?: academic_subjectsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, academic_subjectsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademic_subjectsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the academic_subjects model
   */
  readonly fields: academic_subjectsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for academic_subjects.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__academic_subjectsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    academic_semesters<T extends academic_semestersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, academic_semestersDefaultArgs<ExtArgs>>): Prisma__academic_semestersClient<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the academic_subjects model
   */
  interface academic_subjectsFieldRefs {
    readonly id: FieldRef<"academic_subjects", 'String'>
    readonly academicSemesterId: FieldRef<"academic_subjects", 'String'>
    readonly courseCode: FieldRef<"academic_subjects", 'String'>
    readonly courseName: FieldRef<"academic_subjects", 'String'>
    readonly credits: FieldRef<"academic_subjects", 'Int'>
    readonly cia1: FieldRef<"academic_subjects", 'Float'>
    readonly cia2: FieldRef<"academic_subjects", 'Float'>
    readonly cia3: FieldRef<"academic_subjects", 'Float'>
    readonly mse: FieldRef<"academic_subjects", 'Float'>
    readonly ese: FieldRef<"academic_subjects", 'Float'>
    readonly maximumMarks: FieldRef<"academic_subjects", 'Float'>
    readonly totalMarksObtained: FieldRef<"academic_subjects", 'Float'>
    readonly grade: FieldRef<"academic_subjects", 'String'>
    readonly gradePoint: FieldRef<"academic_subjects", 'Float'>
    readonly attendance: FieldRef<"academic_subjects", 'Float'>
    readonly createdAt: FieldRef<"academic_subjects", 'DateTime'>
    readonly updatedAt: FieldRef<"academic_subjects", 'DateTime'>
    readonly classesAttended: FieldRef<"academic_subjects", 'Int'>
    readonly classesHeld: FieldRef<"academic_subjects", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * academic_subjects findUnique
   */
  export type academic_subjectsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
    /**
     * Filter, which academic_subjects to fetch.
     */
    where: academic_subjectsWhereUniqueInput
  }

  /**
   * academic_subjects findUniqueOrThrow
   */
  export type academic_subjectsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
    /**
     * Filter, which academic_subjects to fetch.
     */
    where: academic_subjectsWhereUniqueInput
  }

  /**
   * academic_subjects findFirst
   */
  export type academic_subjectsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
    /**
     * Filter, which academic_subjects to fetch.
     */
    where?: academic_subjectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_subjects to fetch.
     */
    orderBy?: academic_subjectsOrderByWithRelationInput | academic_subjectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for academic_subjects.
     */
    cursor?: academic_subjectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of academic_subjects.
     */
    distinct?: Academic_subjectsScalarFieldEnum | Academic_subjectsScalarFieldEnum[]
  }

  /**
   * academic_subjects findFirstOrThrow
   */
  export type academic_subjectsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
    /**
     * Filter, which academic_subjects to fetch.
     */
    where?: academic_subjectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_subjects to fetch.
     */
    orderBy?: academic_subjectsOrderByWithRelationInput | academic_subjectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for academic_subjects.
     */
    cursor?: academic_subjectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of academic_subjects.
     */
    distinct?: Academic_subjectsScalarFieldEnum | Academic_subjectsScalarFieldEnum[]
  }

  /**
   * academic_subjects findMany
   */
  export type academic_subjectsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
    /**
     * Filter, which academic_subjects to fetch.
     */
    where?: academic_subjectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of academic_subjects to fetch.
     */
    orderBy?: academic_subjectsOrderByWithRelationInput | academic_subjectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing academic_subjects.
     */
    cursor?: academic_subjectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` academic_subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` academic_subjects.
     */
    skip?: number
    distinct?: Academic_subjectsScalarFieldEnum | Academic_subjectsScalarFieldEnum[]
  }

  /**
   * academic_subjects create
   */
  export type academic_subjectsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
    /**
     * The data needed to create a academic_subjects.
     */
    data: XOR<academic_subjectsCreateInput, academic_subjectsUncheckedCreateInput>
  }

  /**
   * academic_subjects createMany
   */
  export type academic_subjectsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many academic_subjects.
     */
    data: academic_subjectsCreateManyInput | academic_subjectsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * academic_subjects createManyAndReturn
   */
  export type academic_subjectsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * The data used to create many academic_subjects.
     */
    data: academic_subjectsCreateManyInput | academic_subjectsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * academic_subjects update
   */
  export type academic_subjectsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
    /**
     * The data needed to update a academic_subjects.
     */
    data: XOR<academic_subjectsUpdateInput, academic_subjectsUncheckedUpdateInput>
    /**
     * Choose, which academic_subjects to update.
     */
    where: academic_subjectsWhereUniqueInput
  }

  /**
   * academic_subjects updateMany
   */
  export type academic_subjectsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update academic_subjects.
     */
    data: XOR<academic_subjectsUpdateManyMutationInput, academic_subjectsUncheckedUpdateManyInput>
    /**
     * Filter which academic_subjects to update
     */
    where?: academic_subjectsWhereInput
    /**
     * Limit how many academic_subjects to update.
     */
    limit?: number
  }

  /**
   * academic_subjects updateManyAndReturn
   */
  export type academic_subjectsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * The data used to update academic_subjects.
     */
    data: XOR<academic_subjectsUpdateManyMutationInput, academic_subjectsUncheckedUpdateManyInput>
    /**
     * Filter which academic_subjects to update
     */
    where?: academic_subjectsWhereInput
    /**
     * Limit how many academic_subjects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * academic_subjects upsert
   */
  export type academic_subjectsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
    /**
     * The filter to search for the academic_subjects to update in case it exists.
     */
    where: academic_subjectsWhereUniqueInput
    /**
     * In case the academic_subjects found by the `where` argument doesn't exist, create a new academic_subjects with this data.
     */
    create: XOR<academic_subjectsCreateInput, academic_subjectsUncheckedCreateInput>
    /**
     * In case the academic_subjects was found with the provided `where` argument, update it with this data.
     */
    update: XOR<academic_subjectsUpdateInput, academic_subjectsUncheckedUpdateInput>
  }

  /**
   * academic_subjects delete
   */
  export type academic_subjectsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
    /**
     * Filter which academic_subjects to delete.
     */
    where: academic_subjectsWhereUniqueInput
  }

  /**
   * academic_subjects deleteMany
   */
  export type academic_subjectsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which academic_subjects to delete
     */
    where?: academic_subjectsWhereInput
    /**
     * Limit how many academic_subjects to delete.
     */
    limit?: number
  }

  /**
   * academic_subjects without action
   */
  export type academic_subjectsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_subjects
     */
    select?: academic_subjectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_subjects
     */
    omit?: academic_subjectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_subjectsInclude<ExtArgs> | null
  }


  /**
   * Model student_contact_details
   */

  export type AggregateStudent_contact_details = {
    _count: Student_contact_detailsCountAggregateOutputType | null
    _min: Student_contact_detailsMinAggregateOutputType | null
    _max: Student_contact_detailsMaxAggregateOutputType | null
  }

  export type Student_contact_detailsMinAggregateOutputType = {
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

  export type Student_contact_detailsMaxAggregateOutputType = {
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

  export type Student_contact_detailsCountAggregateOutputType = {
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


  export type Student_contact_detailsMinAggregateInputType = {
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

  export type Student_contact_detailsMaxAggregateInputType = {
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

  export type Student_contact_detailsCountAggregateInputType = {
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

  export type Student_contact_detailsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which student_contact_details to aggregate.
     */
    where?: student_contact_detailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_contact_details to fetch.
     */
    orderBy?: student_contact_detailsOrderByWithRelationInput | student_contact_detailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: student_contact_detailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_contact_details from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_contact_details.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned student_contact_details
    **/
    _count?: true | Student_contact_detailsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Student_contact_detailsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Student_contact_detailsMaxAggregateInputType
  }

  export type GetStudent_contact_detailsAggregateType<T extends Student_contact_detailsAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent_contact_details]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent_contact_details[P]>
      : GetScalarType<T[P], AggregateStudent_contact_details[P]>
  }




  export type student_contact_detailsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: student_contact_detailsWhereInput
    orderBy?: student_contact_detailsOrderByWithAggregationInput | student_contact_detailsOrderByWithAggregationInput[]
    by: Student_contact_detailsScalarFieldEnum[] | Student_contact_detailsScalarFieldEnum
    having?: student_contact_detailsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Student_contact_detailsCountAggregateInputType | true
    _min?: Student_contact_detailsMinAggregateInputType
    _max?: Student_contact_detailsMaxAggregateInputType
  }

  export type Student_contact_detailsGroupByOutputType = {
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
    _count: Student_contact_detailsCountAggregateOutputType | null
    _min: Student_contact_detailsMinAggregateOutputType | null
    _max: Student_contact_detailsMaxAggregateOutputType | null
  }

  type GetStudent_contact_detailsGroupByPayload<T extends student_contact_detailsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Student_contact_detailsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Student_contact_detailsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Student_contact_detailsGroupByOutputType[P]>
            : GetScalarType<T[P], Student_contact_detailsGroupByOutputType[P]>
        }
      >
    >


  export type student_contact_detailsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_contact_details"]>

  export type student_contact_detailsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_contact_details"]>

  export type student_contact_detailsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_contact_details"]>

  export type student_contact_detailsSelectScalar = {
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

  export type student_contact_detailsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProfileId" | "permanentAddress" | "currentAddress" | "addressType" | "durationAtCurrentAddress" | "personalMobile" | "alternateMobile" | "personalEmail" | "alternateEmail" | "whatsappNumber" | "telegramUsername" | "linkedInProfile" | "githubProfile" | "preferredContactMethod" | "preferredContactTime" | "communicationEmailPreference" | "allowWhatsappCommunication" | "createdAt" | "updatedAt", ExtArgs["result"]["student_contact_details"]>
  export type student_contact_detailsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }
  export type student_contact_detailsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }
  export type student_contact_detailsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }

  export type $student_contact_detailsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "student_contact_details"
    objects: {
      student_profiles: Prisma.$student_profilesPayload<ExtArgs>
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
    }, ExtArgs["result"]["student_contact_details"]>
    composites: {}
  }

  type student_contact_detailsGetPayload<S extends boolean | null | undefined | student_contact_detailsDefaultArgs> = $Result.GetResult<Prisma.$student_contact_detailsPayload, S>

  type student_contact_detailsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<student_contact_detailsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Student_contact_detailsCountAggregateInputType | true
    }

  export interface student_contact_detailsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['student_contact_details'], meta: { name: 'student_contact_details' } }
    /**
     * Find zero or one Student_contact_details that matches the filter.
     * @param {student_contact_detailsFindUniqueArgs} args - Arguments to find a Student_contact_details
     * @example
     * // Get one Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends student_contact_detailsFindUniqueArgs>(args: SelectSubset<T, student_contact_detailsFindUniqueArgs<ExtArgs>>): Prisma__student_contact_detailsClient<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student_contact_details that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {student_contact_detailsFindUniqueOrThrowArgs} args - Arguments to find a Student_contact_details
     * @example
     * // Get one Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends student_contact_detailsFindUniqueOrThrowArgs>(args: SelectSubset<T, student_contact_detailsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__student_contact_detailsClient<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student_contact_details that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_contact_detailsFindFirstArgs} args - Arguments to find a Student_contact_details
     * @example
     * // Get one Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends student_contact_detailsFindFirstArgs>(args?: SelectSubset<T, student_contact_detailsFindFirstArgs<ExtArgs>>): Prisma__student_contact_detailsClient<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student_contact_details that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_contact_detailsFindFirstOrThrowArgs} args - Arguments to find a Student_contact_details
     * @example
     * // Get one Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends student_contact_detailsFindFirstOrThrowArgs>(args?: SelectSubset<T, student_contact_detailsFindFirstOrThrowArgs<ExtArgs>>): Prisma__student_contact_detailsClient<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Student_contact_details that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_contact_detailsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.findMany()
     * 
     * // Get first 10 Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const student_contact_detailsWithIdOnly = await prisma.student_contact_details.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends student_contact_detailsFindManyArgs>(args?: SelectSubset<T, student_contact_detailsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student_contact_details.
     * @param {student_contact_detailsCreateArgs} args - Arguments to create a Student_contact_details.
     * @example
     * // Create one Student_contact_details
     * const Student_contact_details = await prisma.student_contact_details.create({
     *   data: {
     *     // ... data to create a Student_contact_details
     *   }
     * })
     * 
     */
    create<T extends student_contact_detailsCreateArgs>(args: SelectSubset<T, student_contact_detailsCreateArgs<ExtArgs>>): Prisma__student_contact_detailsClient<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Student_contact_details.
     * @param {student_contact_detailsCreateManyArgs} args - Arguments to create many Student_contact_details.
     * @example
     * // Create many Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends student_contact_detailsCreateManyArgs>(args?: SelectSubset<T, student_contact_detailsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Student_contact_details and returns the data saved in the database.
     * @param {student_contact_detailsCreateManyAndReturnArgs} args - Arguments to create many Student_contact_details.
     * @example
     * // Create many Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Student_contact_details and only return the `id`
     * const student_contact_detailsWithIdOnly = await prisma.student_contact_details.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends student_contact_detailsCreateManyAndReturnArgs>(args?: SelectSubset<T, student_contact_detailsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student_contact_details.
     * @param {student_contact_detailsDeleteArgs} args - Arguments to delete one Student_contact_details.
     * @example
     * // Delete one Student_contact_details
     * const Student_contact_details = await prisma.student_contact_details.delete({
     *   where: {
     *     // ... filter to delete one Student_contact_details
     *   }
     * })
     * 
     */
    delete<T extends student_contact_detailsDeleteArgs>(args: SelectSubset<T, student_contact_detailsDeleteArgs<ExtArgs>>): Prisma__student_contact_detailsClient<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student_contact_details.
     * @param {student_contact_detailsUpdateArgs} args - Arguments to update one Student_contact_details.
     * @example
     * // Update one Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends student_contact_detailsUpdateArgs>(args: SelectSubset<T, student_contact_detailsUpdateArgs<ExtArgs>>): Prisma__student_contact_detailsClient<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Student_contact_details.
     * @param {student_contact_detailsDeleteManyArgs} args - Arguments to filter Student_contact_details to delete.
     * @example
     * // Delete a few Student_contact_details
     * const { count } = await prisma.student_contact_details.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends student_contact_detailsDeleteManyArgs>(args?: SelectSubset<T, student_contact_detailsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Student_contact_details.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_contact_detailsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends student_contact_detailsUpdateManyArgs>(args: SelectSubset<T, student_contact_detailsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Student_contact_details and returns the data updated in the database.
     * @param {student_contact_detailsUpdateManyAndReturnArgs} args - Arguments to update many Student_contact_details.
     * @example
     * // Update many Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Student_contact_details and only return the `id`
     * const student_contact_detailsWithIdOnly = await prisma.student_contact_details.updateManyAndReturn({
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
    updateManyAndReturn<T extends student_contact_detailsUpdateManyAndReturnArgs>(args: SelectSubset<T, student_contact_detailsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student_contact_details.
     * @param {student_contact_detailsUpsertArgs} args - Arguments to update or create a Student_contact_details.
     * @example
     * // Update or create a Student_contact_details
     * const student_contact_details = await prisma.student_contact_details.upsert({
     *   create: {
     *     // ... data to create a Student_contact_details
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student_contact_details we want to update
     *   }
     * })
     */
    upsert<T extends student_contact_detailsUpsertArgs>(args: SelectSubset<T, student_contact_detailsUpsertArgs<ExtArgs>>): Prisma__student_contact_detailsClient<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Student_contact_details.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_contact_detailsCountArgs} args - Arguments to filter Student_contact_details to count.
     * @example
     * // Count the number of Student_contact_details
     * const count = await prisma.student_contact_details.count({
     *   where: {
     *     // ... the filter for the Student_contact_details we want to count
     *   }
     * })
    **/
    count<T extends student_contact_detailsCountArgs>(
      args?: Subset<T, student_contact_detailsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Student_contact_detailsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student_contact_details.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_contact_detailsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Student_contact_detailsAggregateArgs>(args: Subset<T, Student_contact_detailsAggregateArgs>): Prisma.PrismaPromise<GetStudent_contact_detailsAggregateType<T>>

    /**
     * Group by Student_contact_details.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_contact_detailsGroupByArgs} args - Group by arguments.
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
      T extends student_contact_detailsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: student_contact_detailsGroupByArgs['orderBy'] }
        : { orderBy?: student_contact_detailsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, student_contact_detailsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudent_contact_detailsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the student_contact_details model
   */
  readonly fields: student_contact_detailsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for student_contact_details.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__student_contact_detailsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student_profiles<T extends student_profilesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, student_profilesDefaultArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the student_contact_details model
   */
  interface student_contact_detailsFieldRefs {
    readonly id: FieldRef<"student_contact_details", 'String'>
    readonly studentProfileId: FieldRef<"student_contact_details", 'String'>
    readonly permanentAddress: FieldRef<"student_contact_details", 'String'>
    readonly currentAddress: FieldRef<"student_contact_details", 'String'>
    readonly addressType: FieldRef<"student_contact_details", 'AddressType'>
    readonly durationAtCurrentAddress: FieldRef<"student_contact_details", 'String'>
    readonly personalMobile: FieldRef<"student_contact_details", 'String'>
    readonly alternateMobile: FieldRef<"student_contact_details", 'String'>
    readonly personalEmail: FieldRef<"student_contact_details", 'String'>
    readonly alternateEmail: FieldRef<"student_contact_details", 'String'>
    readonly whatsappNumber: FieldRef<"student_contact_details", 'String'>
    readonly telegramUsername: FieldRef<"student_contact_details", 'String'>
    readonly linkedInProfile: FieldRef<"student_contact_details", 'String'>
    readonly githubProfile: FieldRef<"student_contact_details", 'String'>
    readonly preferredContactMethod: FieldRef<"student_contact_details", 'PreferredContactMethod'>
    readonly preferredContactTime: FieldRef<"student_contact_details", 'String'>
    readonly communicationEmailPreference: FieldRef<"student_contact_details", 'CommunicationEmailPreference'>
    readonly allowWhatsappCommunication: FieldRef<"student_contact_details", 'Boolean'>
    readonly createdAt: FieldRef<"student_contact_details", 'DateTime'>
    readonly updatedAt: FieldRef<"student_contact_details", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * student_contact_details findUnique
   */
  export type student_contact_detailsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
    /**
     * Filter, which student_contact_details to fetch.
     */
    where: student_contact_detailsWhereUniqueInput
  }

  /**
   * student_contact_details findUniqueOrThrow
   */
  export type student_contact_detailsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
    /**
     * Filter, which student_contact_details to fetch.
     */
    where: student_contact_detailsWhereUniqueInput
  }

  /**
   * student_contact_details findFirst
   */
  export type student_contact_detailsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
    /**
     * Filter, which student_contact_details to fetch.
     */
    where?: student_contact_detailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_contact_details to fetch.
     */
    orderBy?: student_contact_detailsOrderByWithRelationInput | student_contact_detailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for student_contact_details.
     */
    cursor?: student_contact_detailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_contact_details from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_contact_details.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of student_contact_details.
     */
    distinct?: Student_contact_detailsScalarFieldEnum | Student_contact_detailsScalarFieldEnum[]
  }

  /**
   * student_contact_details findFirstOrThrow
   */
  export type student_contact_detailsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
    /**
     * Filter, which student_contact_details to fetch.
     */
    where?: student_contact_detailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_contact_details to fetch.
     */
    orderBy?: student_contact_detailsOrderByWithRelationInput | student_contact_detailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for student_contact_details.
     */
    cursor?: student_contact_detailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_contact_details from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_contact_details.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of student_contact_details.
     */
    distinct?: Student_contact_detailsScalarFieldEnum | Student_contact_detailsScalarFieldEnum[]
  }

  /**
   * student_contact_details findMany
   */
  export type student_contact_detailsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
    /**
     * Filter, which student_contact_details to fetch.
     */
    where?: student_contact_detailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_contact_details to fetch.
     */
    orderBy?: student_contact_detailsOrderByWithRelationInput | student_contact_detailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing student_contact_details.
     */
    cursor?: student_contact_detailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_contact_details from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_contact_details.
     */
    skip?: number
    distinct?: Student_contact_detailsScalarFieldEnum | Student_contact_detailsScalarFieldEnum[]
  }

  /**
   * student_contact_details create
   */
  export type student_contact_detailsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
    /**
     * The data needed to create a student_contact_details.
     */
    data: XOR<student_contact_detailsCreateInput, student_contact_detailsUncheckedCreateInput>
  }

  /**
   * student_contact_details createMany
   */
  export type student_contact_detailsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many student_contact_details.
     */
    data: student_contact_detailsCreateManyInput | student_contact_detailsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * student_contact_details createManyAndReturn
   */
  export type student_contact_detailsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * The data used to create many student_contact_details.
     */
    data: student_contact_detailsCreateManyInput | student_contact_detailsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * student_contact_details update
   */
  export type student_contact_detailsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
    /**
     * The data needed to update a student_contact_details.
     */
    data: XOR<student_contact_detailsUpdateInput, student_contact_detailsUncheckedUpdateInput>
    /**
     * Choose, which student_contact_details to update.
     */
    where: student_contact_detailsWhereUniqueInput
  }

  /**
   * student_contact_details updateMany
   */
  export type student_contact_detailsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update student_contact_details.
     */
    data: XOR<student_contact_detailsUpdateManyMutationInput, student_contact_detailsUncheckedUpdateManyInput>
    /**
     * Filter which student_contact_details to update
     */
    where?: student_contact_detailsWhereInput
    /**
     * Limit how many student_contact_details to update.
     */
    limit?: number
  }

  /**
   * student_contact_details updateManyAndReturn
   */
  export type student_contact_detailsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * The data used to update student_contact_details.
     */
    data: XOR<student_contact_detailsUpdateManyMutationInput, student_contact_detailsUncheckedUpdateManyInput>
    /**
     * Filter which student_contact_details to update
     */
    where?: student_contact_detailsWhereInput
    /**
     * Limit how many student_contact_details to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * student_contact_details upsert
   */
  export type student_contact_detailsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
    /**
     * The filter to search for the student_contact_details to update in case it exists.
     */
    where: student_contact_detailsWhereUniqueInput
    /**
     * In case the student_contact_details found by the `where` argument doesn't exist, create a new student_contact_details with this data.
     */
    create: XOR<student_contact_detailsCreateInput, student_contact_detailsUncheckedCreateInput>
    /**
     * In case the student_contact_details was found with the provided `where` argument, update it with this data.
     */
    update: XOR<student_contact_detailsUpdateInput, student_contact_detailsUncheckedUpdateInput>
  }

  /**
   * student_contact_details delete
   */
  export type student_contact_detailsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
    /**
     * Filter which student_contact_details to delete.
     */
    where: student_contact_detailsWhereUniqueInput
  }

  /**
   * student_contact_details deleteMany
   */
  export type student_contact_detailsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which student_contact_details to delete
     */
    where?: student_contact_detailsWhereInput
    /**
     * Limit how many student_contact_details to delete.
     */
    limit?: number
  }

  /**
   * student_contact_details without action
   */
  export type student_contact_detailsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
  }


  /**
   * Model student_documents
   */

  export type AggregateStudent_documents = {
    _count: Student_documentsCountAggregateOutputType | null
    _avg: Student_documentsAvgAggregateOutputType | null
    _sum: Student_documentsSumAggregateOutputType | null
    _min: Student_documentsMinAggregateOutputType | null
    _max: Student_documentsMaxAggregateOutputType | null
  }

  export type Student_documentsAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type Student_documentsSumAggregateOutputType = {
    fileSize: number | null
  }

  export type Student_documentsMinAggregateOutputType = {
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

  export type Student_documentsMaxAggregateOutputType = {
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

  export type Student_documentsCountAggregateOutputType = {
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


  export type Student_documentsAvgAggregateInputType = {
    fileSize?: true
  }

  export type Student_documentsSumAggregateInputType = {
    fileSize?: true
  }

  export type Student_documentsMinAggregateInputType = {
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

  export type Student_documentsMaxAggregateInputType = {
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

  export type Student_documentsCountAggregateInputType = {
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

  export type Student_documentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which student_documents to aggregate.
     */
    where?: student_documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_documents to fetch.
     */
    orderBy?: student_documentsOrderByWithRelationInput | student_documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: student_documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned student_documents
    **/
    _count?: true | Student_documentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Student_documentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Student_documentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Student_documentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Student_documentsMaxAggregateInputType
  }

  export type GetStudent_documentsAggregateType<T extends Student_documentsAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent_documents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent_documents[P]>
      : GetScalarType<T[P], AggregateStudent_documents[P]>
  }




  export type student_documentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: student_documentsWhereInput
    orderBy?: student_documentsOrderByWithAggregationInput | student_documentsOrderByWithAggregationInput[]
    by: Student_documentsScalarFieldEnum[] | Student_documentsScalarFieldEnum
    having?: student_documentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Student_documentsCountAggregateInputType | true
    _avg?: Student_documentsAvgAggregateInputType
    _sum?: Student_documentsSumAggregateInputType
    _min?: Student_documentsMinAggregateInputType
    _max?: Student_documentsMaxAggregateInputType
  }

  export type Student_documentsGroupByOutputType = {
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
    _count: Student_documentsCountAggregateOutputType | null
    _avg: Student_documentsAvgAggregateOutputType | null
    _sum: Student_documentsSumAggregateOutputType | null
    _min: Student_documentsMinAggregateOutputType | null
    _max: Student_documentsMaxAggregateOutputType | null
  }

  type GetStudent_documentsGroupByPayload<T extends student_documentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Student_documentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Student_documentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Student_documentsGroupByOutputType[P]>
            : GetScalarType<T[P], Student_documentsGroupByOutputType[P]>
        }
      >
    >


  export type student_documentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_documents"]>

  export type student_documentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_documents"]>

  export type student_documentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_documents"]>

  export type student_documentsSelectScalar = {
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

  export type student_documentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProfileId" | "documentName" | "category" | "description" | "fileType" | "fileSize" | "cloudinaryPublicId" | "fileUrl" | "uploadedAt" | "updatedAt" | "resourceType", ExtArgs["result"]["student_documents"]>
  export type student_documentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }
  export type student_documentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }
  export type student_documentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }

  export type $student_documentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "student_documents"
    objects: {
      student_profiles: Prisma.$student_profilesPayload<ExtArgs>
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
    }, ExtArgs["result"]["student_documents"]>
    composites: {}
  }

  type student_documentsGetPayload<S extends boolean | null | undefined | student_documentsDefaultArgs> = $Result.GetResult<Prisma.$student_documentsPayload, S>

  type student_documentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<student_documentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Student_documentsCountAggregateInputType | true
    }

  export interface student_documentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['student_documents'], meta: { name: 'student_documents' } }
    /**
     * Find zero or one Student_documents that matches the filter.
     * @param {student_documentsFindUniqueArgs} args - Arguments to find a Student_documents
     * @example
     * // Get one Student_documents
     * const student_documents = await prisma.student_documents.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends student_documentsFindUniqueArgs>(args: SelectSubset<T, student_documentsFindUniqueArgs<ExtArgs>>): Prisma__student_documentsClient<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student_documents that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {student_documentsFindUniqueOrThrowArgs} args - Arguments to find a Student_documents
     * @example
     * // Get one Student_documents
     * const student_documents = await prisma.student_documents.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends student_documentsFindUniqueOrThrowArgs>(args: SelectSubset<T, student_documentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__student_documentsClient<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student_documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_documentsFindFirstArgs} args - Arguments to find a Student_documents
     * @example
     * // Get one Student_documents
     * const student_documents = await prisma.student_documents.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends student_documentsFindFirstArgs>(args?: SelectSubset<T, student_documentsFindFirstArgs<ExtArgs>>): Prisma__student_documentsClient<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student_documents that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_documentsFindFirstOrThrowArgs} args - Arguments to find a Student_documents
     * @example
     * // Get one Student_documents
     * const student_documents = await prisma.student_documents.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends student_documentsFindFirstOrThrowArgs>(args?: SelectSubset<T, student_documentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__student_documentsClient<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Student_documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_documentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Student_documents
     * const student_documents = await prisma.student_documents.findMany()
     * 
     * // Get first 10 Student_documents
     * const student_documents = await prisma.student_documents.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const student_documentsWithIdOnly = await prisma.student_documents.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends student_documentsFindManyArgs>(args?: SelectSubset<T, student_documentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student_documents.
     * @param {student_documentsCreateArgs} args - Arguments to create a Student_documents.
     * @example
     * // Create one Student_documents
     * const Student_documents = await prisma.student_documents.create({
     *   data: {
     *     // ... data to create a Student_documents
     *   }
     * })
     * 
     */
    create<T extends student_documentsCreateArgs>(args: SelectSubset<T, student_documentsCreateArgs<ExtArgs>>): Prisma__student_documentsClient<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Student_documents.
     * @param {student_documentsCreateManyArgs} args - Arguments to create many Student_documents.
     * @example
     * // Create many Student_documents
     * const student_documents = await prisma.student_documents.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends student_documentsCreateManyArgs>(args?: SelectSubset<T, student_documentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Student_documents and returns the data saved in the database.
     * @param {student_documentsCreateManyAndReturnArgs} args - Arguments to create many Student_documents.
     * @example
     * // Create many Student_documents
     * const student_documents = await prisma.student_documents.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Student_documents and only return the `id`
     * const student_documentsWithIdOnly = await prisma.student_documents.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends student_documentsCreateManyAndReturnArgs>(args?: SelectSubset<T, student_documentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student_documents.
     * @param {student_documentsDeleteArgs} args - Arguments to delete one Student_documents.
     * @example
     * // Delete one Student_documents
     * const Student_documents = await prisma.student_documents.delete({
     *   where: {
     *     // ... filter to delete one Student_documents
     *   }
     * })
     * 
     */
    delete<T extends student_documentsDeleteArgs>(args: SelectSubset<T, student_documentsDeleteArgs<ExtArgs>>): Prisma__student_documentsClient<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student_documents.
     * @param {student_documentsUpdateArgs} args - Arguments to update one Student_documents.
     * @example
     * // Update one Student_documents
     * const student_documents = await prisma.student_documents.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends student_documentsUpdateArgs>(args: SelectSubset<T, student_documentsUpdateArgs<ExtArgs>>): Prisma__student_documentsClient<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Student_documents.
     * @param {student_documentsDeleteManyArgs} args - Arguments to filter Student_documents to delete.
     * @example
     * // Delete a few Student_documents
     * const { count } = await prisma.student_documents.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends student_documentsDeleteManyArgs>(args?: SelectSubset<T, student_documentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Student_documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_documentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Student_documents
     * const student_documents = await prisma.student_documents.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends student_documentsUpdateManyArgs>(args: SelectSubset<T, student_documentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Student_documents and returns the data updated in the database.
     * @param {student_documentsUpdateManyAndReturnArgs} args - Arguments to update many Student_documents.
     * @example
     * // Update many Student_documents
     * const student_documents = await prisma.student_documents.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Student_documents and only return the `id`
     * const student_documentsWithIdOnly = await prisma.student_documents.updateManyAndReturn({
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
    updateManyAndReturn<T extends student_documentsUpdateManyAndReturnArgs>(args: SelectSubset<T, student_documentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student_documents.
     * @param {student_documentsUpsertArgs} args - Arguments to update or create a Student_documents.
     * @example
     * // Update or create a Student_documents
     * const student_documents = await prisma.student_documents.upsert({
     *   create: {
     *     // ... data to create a Student_documents
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student_documents we want to update
     *   }
     * })
     */
    upsert<T extends student_documentsUpsertArgs>(args: SelectSubset<T, student_documentsUpsertArgs<ExtArgs>>): Prisma__student_documentsClient<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Student_documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_documentsCountArgs} args - Arguments to filter Student_documents to count.
     * @example
     * // Count the number of Student_documents
     * const count = await prisma.student_documents.count({
     *   where: {
     *     // ... the filter for the Student_documents we want to count
     *   }
     * })
    **/
    count<T extends student_documentsCountArgs>(
      args?: Subset<T, student_documentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Student_documentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student_documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_documentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Student_documentsAggregateArgs>(args: Subset<T, Student_documentsAggregateArgs>): Prisma.PrismaPromise<GetStudent_documentsAggregateType<T>>

    /**
     * Group by Student_documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_documentsGroupByArgs} args - Group by arguments.
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
      T extends student_documentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: student_documentsGroupByArgs['orderBy'] }
        : { orderBy?: student_documentsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, student_documentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudent_documentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the student_documents model
   */
  readonly fields: student_documentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for student_documents.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__student_documentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student_profiles<T extends student_profilesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, student_profilesDefaultArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the student_documents model
   */
  interface student_documentsFieldRefs {
    readonly id: FieldRef<"student_documents", 'String'>
    readonly studentProfileId: FieldRef<"student_documents", 'String'>
    readonly documentName: FieldRef<"student_documents", 'String'>
    readonly category: FieldRef<"student_documents", 'DocumentCategory'>
    readonly description: FieldRef<"student_documents", 'String'>
    readonly fileType: FieldRef<"student_documents", 'String'>
    readonly fileSize: FieldRef<"student_documents", 'Int'>
    readonly cloudinaryPublicId: FieldRef<"student_documents", 'String'>
    readonly fileUrl: FieldRef<"student_documents", 'String'>
    readonly uploadedAt: FieldRef<"student_documents", 'DateTime'>
    readonly updatedAt: FieldRef<"student_documents", 'DateTime'>
    readonly resourceType: FieldRef<"student_documents", 'String'>
  }
    

  // Custom InputTypes
  /**
   * student_documents findUnique
   */
  export type student_documentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
    /**
     * Filter, which student_documents to fetch.
     */
    where: student_documentsWhereUniqueInput
  }

  /**
   * student_documents findUniqueOrThrow
   */
  export type student_documentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
    /**
     * Filter, which student_documents to fetch.
     */
    where: student_documentsWhereUniqueInput
  }

  /**
   * student_documents findFirst
   */
  export type student_documentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
    /**
     * Filter, which student_documents to fetch.
     */
    where?: student_documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_documents to fetch.
     */
    orderBy?: student_documentsOrderByWithRelationInput | student_documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for student_documents.
     */
    cursor?: student_documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of student_documents.
     */
    distinct?: Student_documentsScalarFieldEnum | Student_documentsScalarFieldEnum[]
  }

  /**
   * student_documents findFirstOrThrow
   */
  export type student_documentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
    /**
     * Filter, which student_documents to fetch.
     */
    where?: student_documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_documents to fetch.
     */
    orderBy?: student_documentsOrderByWithRelationInput | student_documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for student_documents.
     */
    cursor?: student_documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of student_documents.
     */
    distinct?: Student_documentsScalarFieldEnum | Student_documentsScalarFieldEnum[]
  }

  /**
   * student_documents findMany
   */
  export type student_documentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
    /**
     * Filter, which student_documents to fetch.
     */
    where?: student_documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_documents to fetch.
     */
    orderBy?: student_documentsOrderByWithRelationInput | student_documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing student_documents.
     */
    cursor?: student_documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_documents.
     */
    skip?: number
    distinct?: Student_documentsScalarFieldEnum | Student_documentsScalarFieldEnum[]
  }

  /**
   * student_documents create
   */
  export type student_documentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
    /**
     * The data needed to create a student_documents.
     */
    data: XOR<student_documentsCreateInput, student_documentsUncheckedCreateInput>
  }

  /**
   * student_documents createMany
   */
  export type student_documentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many student_documents.
     */
    data: student_documentsCreateManyInput | student_documentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * student_documents createManyAndReturn
   */
  export type student_documentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * The data used to create many student_documents.
     */
    data: student_documentsCreateManyInput | student_documentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * student_documents update
   */
  export type student_documentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
    /**
     * The data needed to update a student_documents.
     */
    data: XOR<student_documentsUpdateInput, student_documentsUncheckedUpdateInput>
    /**
     * Choose, which student_documents to update.
     */
    where: student_documentsWhereUniqueInput
  }

  /**
   * student_documents updateMany
   */
  export type student_documentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update student_documents.
     */
    data: XOR<student_documentsUpdateManyMutationInput, student_documentsUncheckedUpdateManyInput>
    /**
     * Filter which student_documents to update
     */
    where?: student_documentsWhereInput
    /**
     * Limit how many student_documents to update.
     */
    limit?: number
  }

  /**
   * student_documents updateManyAndReturn
   */
  export type student_documentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * The data used to update student_documents.
     */
    data: XOR<student_documentsUpdateManyMutationInput, student_documentsUncheckedUpdateManyInput>
    /**
     * Filter which student_documents to update
     */
    where?: student_documentsWhereInput
    /**
     * Limit how many student_documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * student_documents upsert
   */
  export type student_documentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
    /**
     * The filter to search for the student_documents to update in case it exists.
     */
    where: student_documentsWhereUniqueInput
    /**
     * In case the student_documents found by the `where` argument doesn't exist, create a new student_documents with this data.
     */
    create: XOR<student_documentsCreateInput, student_documentsUncheckedCreateInput>
    /**
     * In case the student_documents was found with the provided `where` argument, update it with this data.
     */
    update: XOR<student_documentsUpdateInput, student_documentsUncheckedUpdateInput>
  }

  /**
   * student_documents delete
   */
  export type student_documentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
    /**
     * Filter which student_documents to delete.
     */
    where: student_documentsWhereUniqueInput
  }

  /**
   * student_documents deleteMany
   */
  export type student_documentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which student_documents to delete
     */
    where?: student_documentsWhereInput
    /**
     * Limit how many student_documents to delete.
     */
    limit?: number
  }

  /**
   * student_documents without action
   */
  export type student_documentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
  }


  /**
   * Model student_parent_details
   */

  export type AggregateStudent_parent_details = {
    _count: Student_parent_detailsCountAggregateOutputType | null
    _min: Student_parent_detailsMinAggregateOutputType | null
    _max: Student_parent_detailsMaxAggregateOutputType | null
  }

  export type Student_parent_detailsMinAggregateOutputType = {
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

  export type Student_parent_detailsMaxAggregateOutputType = {
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

  export type Student_parent_detailsCountAggregateOutputType = {
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


  export type Student_parent_detailsMinAggregateInputType = {
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

  export type Student_parent_detailsMaxAggregateInputType = {
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

  export type Student_parent_detailsCountAggregateInputType = {
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

  export type Student_parent_detailsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which student_parent_details to aggregate.
     */
    where?: student_parent_detailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_parent_details to fetch.
     */
    orderBy?: student_parent_detailsOrderByWithRelationInput | student_parent_detailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: student_parent_detailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_parent_details from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_parent_details.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned student_parent_details
    **/
    _count?: true | Student_parent_detailsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Student_parent_detailsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Student_parent_detailsMaxAggregateInputType
  }

  export type GetStudent_parent_detailsAggregateType<T extends Student_parent_detailsAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent_parent_details]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent_parent_details[P]>
      : GetScalarType<T[P], AggregateStudent_parent_details[P]>
  }




  export type student_parent_detailsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: student_parent_detailsWhereInput
    orderBy?: student_parent_detailsOrderByWithAggregationInput | student_parent_detailsOrderByWithAggregationInput[]
    by: Student_parent_detailsScalarFieldEnum[] | Student_parent_detailsScalarFieldEnum
    having?: student_parent_detailsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Student_parent_detailsCountAggregateInputType | true
    _min?: Student_parent_detailsMinAggregateInputType
    _max?: Student_parent_detailsMaxAggregateInputType
  }

  export type Student_parent_detailsGroupByOutputType = {
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
    _count: Student_parent_detailsCountAggregateOutputType | null
    _min: Student_parent_detailsMinAggregateOutputType | null
    _max: Student_parent_detailsMaxAggregateOutputType | null
  }

  type GetStudent_parent_detailsGroupByPayload<T extends student_parent_detailsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Student_parent_detailsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Student_parent_detailsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Student_parent_detailsGroupByOutputType[P]>
            : GetScalarType<T[P], Student_parent_detailsGroupByOutputType[P]>
        }
      >
    >


  export type student_parent_detailsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_parent_details"]>

  export type student_parent_detailsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_parent_details"]>

  export type student_parent_detailsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_parent_details"]>

  export type student_parent_detailsSelectScalar = {
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

  export type student_parent_detailsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProfileId" | "fatherName" | "fatherOccupation" | "fatherCompany" | "fatherAnnualIncome" | "fatherQualification" | "fatherEmail" | "fatherPhone" | "fatherAddress" | "motherName" | "motherOccupation" | "motherQualification" | "motherAnnualIncome" | "motherEmail" | "motherPhone" | "motherAddress" | "guardianName" | "guardianRelationship" | "guardianPhone" | "guardianAlternatePhone" | "createdAt" | "updatedAt", ExtArgs["result"]["student_parent_details"]>
  export type student_parent_detailsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }
  export type student_parent_detailsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }
  export type student_parent_detailsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | student_profilesDefaultArgs<ExtArgs>
  }

  export type $student_parent_detailsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "student_parent_details"
    objects: {
      student_profiles: Prisma.$student_profilesPayload<ExtArgs>
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
    }, ExtArgs["result"]["student_parent_details"]>
    composites: {}
  }

  type student_parent_detailsGetPayload<S extends boolean | null | undefined | student_parent_detailsDefaultArgs> = $Result.GetResult<Prisma.$student_parent_detailsPayload, S>

  type student_parent_detailsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<student_parent_detailsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Student_parent_detailsCountAggregateInputType | true
    }

  export interface student_parent_detailsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['student_parent_details'], meta: { name: 'student_parent_details' } }
    /**
     * Find zero or one Student_parent_details that matches the filter.
     * @param {student_parent_detailsFindUniqueArgs} args - Arguments to find a Student_parent_details
     * @example
     * // Get one Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends student_parent_detailsFindUniqueArgs>(args: SelectSubset<T, student_parent_detailsFindUniqueArgs<ExtArgs>>): Prisma__student_parent_detailsClient<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student_parent_details that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {student_parent_detailsFindUniqueOrThrowArgs} args - Arguments to find a Student_parent_details
     * @example
     * // Get one Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends student_parent_detailsFindUniqueOrThrowArgs>(args: SelectSubset<T, student_parent_detailsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__student_parent_detailsClient<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student_parent_details that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_parent_detailsFindFirstArgs} args - Arguments to find a Student_parent_details
     * @example
     * // Get one Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends student_parent_detailsFindFirstArgs>(args?: SelectSubset<T, student_parent_detailsFindFirstArgs<ExtArgs>>): Prisma__student_parent_detailsClient<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student_parent_details that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_parent_detailsFindFirstOrThrowArgs} args - Arguments to find a Student_parent_details
     * @example
     * // Get one Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends student_parent_detailsFindFirstOrThrowArgs>(args?: SelectSubset<T, student_parent_detailsFindFirstOrThrowArgs<ExtArgs>>): Prisma__student_parent_detailsClient<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Student_parent_details that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_parent_detailsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.findMany()
     * 
     * // Get first 10 Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const student_parent_detailsWithIdOnly = await prisma.student_parent_details.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends student_parent_detailsFindManyArgs>(args?: SelectSubset<T, student_parent_detailsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student_parent_details.
     * @param {student_parent_detailsCreateArgs} args - Arguments to create a Student_parent_details.
     * @example
     * // Create one Student_parent_details
     * const Student_parent_details = await prisma.student_parent_details.create({
     *   data: {
     *     // ... data to create a Student_parent_details
     *   }
     * })
     * 
     */
    create<T extends student_parent_detailsCreateArgs>(args: SelectSubset<T, student_parent_detailsCreateArgs<ExtArgs>>): Prisma__student_parent_detailsClient<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Student_parent_details.
     * @param {student_parent_detailsCreateManyArgs} args - Arguments to create many Student_parent_details.
     * @example
     * // Create many Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends student_parent_detailsCreateManyArgs>(args?: SelectSubset<T, student_parent_detailsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Student_parent_details and returns the data saved in the database.
     * @param {student_parent_detailsCreateManyAndReturnArgs} args - Arguments to create many Student_parent_details.
     * @example
     * // Create many Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Student_parent_details and only return the `id`
     * const student_parent_detailsWithIdOnly = await prisma.student_parent_details.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends student_parent_detailsCreateManyAndReturnArgs>(args?: SelectSubset<T, student_parent_detailsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student_parent_details.
     * @param {student_parent_detailsDeleteArgs} args - Arguments to delete one Student_parent_details.
     * @example
     * // Delete one Student_parent_details
     * const Student_parent_details = await prisma.student_parent_details.delete({
     *   where: {
     *     // ... filter to delete one Student_parent_details
     *   }
     * })
     * 
     */
    delete<T extends student_parent_detailsDeleteArgs>(args: SelectSubset<T, student_parent_detailsDeleteArgs<ExtArgs>>): Prisma__student_parent_detailsClient<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student_parent_details.
     * @param {student_parent_detailsUpdateArgs} args - Arguments to update one Student_parent_details.
     * @example
     * // Update one Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends student_parent_detailsUpdateArgs>(args: SelectSubset<T, student_parent_detailsUpdateArgs<ExtArgs>>): Prisma__student_parent_detailsClient<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Student_parent_details.
     * @param {student_parent_detailsDeleteManyArgs} args - Arguments to filter Student_parent_details to delete.
     * @example
     * // Delete a few Student_parent_details
     * const { count } = await prisma.student_parent_details.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends student_parent_detailsDeleteManyArgs>(args?: SelectSubset<T, student_parent_detailsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Student_parent_details.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_parent_detailsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends student_parent_detailsUpdateManyArgs>(args: SelectSubset<T, student_parent_detailsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Student_parent_details and returns the data updated in the database.
     * @param {student_parent_detailsUpdateManyAndReturnArgs} args - Arguments to update many Student_parent_details.
     * @example
     * // Update many Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Student_parent_details and only return the `id`
     * const student_parent_detailsWithIdOnly = await prisma.student_parent_details.updateManyAndReturn({
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
    updateManyAndReturn<T extends student_parent_detailsUpdateManyAndReturnArgs>(args: SelectSubset<T, student_parent_detailsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student_parent_details.
     * @param {student_parent_detailsUpsertArgs} args - Arguments to update or create a Student_parent_details.
     * @example
     * // Update or create a Student_parent_details
     * const student_parent_details = await prisma.student_parent_details.upsert({
     *   create: {
     *     // ... data to create a Student_parent_details
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student_parent_details we want to update
     *   }
     * })
     */
    upsert<T extends student_parent_detailsUpsertArgs>(args: SelectSubset<T, student_parent_detailsUpsertArgs<ExtArgs>>): Prisma__student_parent_detailsClient<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Student_parent_details.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_parent_detailsCountArgs} args - Arguments to filter Student_parent_details to count.
     * @example
     * // Count the number of Student_parent_details
     * const count = await prisma.student_parent_details.count({
     *   where: {
     *     // ... the filter for the Student_parent_details we want to count
     *   }
     * })
    **/
    count<T extends student_parent_detailsCountArgs>(
      args?: Subset<T, student_parent_detailsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Student_parent_detailsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student_parent_details.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_parent_detailsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Student_parent_detailsAggregateArgs>(args: Subset<T, Student_parent_detailsAggregateArgs>): Prisma.PrismaPromise<GetStudent_parent_detailsAggregateType<T>>

    /**
     * Group by Student_parent_details.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_parent_detailsGroupByArgs} args - Group by arguments.
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
      T extends student_parent_detailsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: student_parent_detailsGroupByArgs['orderBy'] }
        : { orderBy?: student_parent_detailsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, student_parent_detailsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudent_parent_detailsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the student_parent_details model
   */
  readonly fields: student_parent_detailsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for student_parent_details.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__student_parent_detailsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student_profiles<T extends student_profilesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, student_profilesDefaultArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the student_parent_details model
   */
  interface student_parent_detailsFieldRefs {
    readonly id: FieldRef<"student_parent_details", 'String'>
    readonly studentProfileId: FieldRef<"student_parent_details", 'String'>
    readonly fatherName: FieldRef<"student_parent_details", 'String'>
    readonly fatherOccupation: FieldRef<"student_parent_details", 'String'>
    readonly fatherCompany: FieldRef<"student_parent_details", 'String'>
    readonly fatherAnnualIncome: FieldRef<"student_parent_details", 'String'>
    readonly fatherQualification: FieldRef<"student_parent_details", 'String'>
    readonly fatherEmail: FieldRef<"student_parent_details", 'String'>
    readonly fatherPhone: FieldRef<"student_parent_details", 'String'>
    readonly fatherAddress: FieldRef<"student_parent_details", 'String'>
    readonly motherName: FieldRef<"student_parent_details", 'String'>
    readonly motherOccupation: FieldRef<"student_parent_details", 'String'>
    readonly motherQualification: FieldRef<"student_parent_details", 'String'>
    readonly motherAnnualIncome: FieldRef<"student_parent_details", 'String'>
    readonly motherEmail: FieldRef<"student_parent_details", 'String'>
    readonly motherPhone: FieldRef<"student_parent_details", 'String'>
    readonly motherAddress: FieldRef<"student_parent_details", 'String'>
    readonly guardianName: FieldRef<"student_parent_details", 'String'>
    readonly guardianRelationship: FieldRef<"student_parent_details", 'String'>
    readonly guardianPhone: FieldRef<"student_parent_details", 'String'>
    readonly guardianAlternatePhone: FieldRef<"student_parent_details", 'String'>
    readonly createdAt: FieldRef<"student_parent_details", 'DateTime'>
    readonly updatedAt: FieldRef<"student_parent_details", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * student_parent_details findUnique
   */
  export type student_parent_detailsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
    /**
     * Filter, which student_parent_details to fetch.
     */
    where: student_parent_detailsWhereUniqueInput
  }

  /**
   * student_parent_details findUniqueOrThrow
   */
  export type student_parent_detailsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
    /**
     * Filter, which student_parent_details to fetch.
     */
    where: student_parent_detailsWhereUniqueInput
  }

  /**
   * student_parent_details findFirst
   */
  export type student_parent_detailsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
    /**
     * Filter, which student_parent_details to fetch.
     */
    where?: student_parent_detailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_parent_details to fetch.
     */
    orderBy?: student_parent_detailsOrderByWithRelationInput | student_parent_detailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for student_parent_details.
     */
    cursor?: student_parent_detailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_parent_details from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_parent_details.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of student_parent_details.
     */
    distinct?: Student_parent_detailsScalarFieldEnum | Student_parent_detailsScalarFieldEnum[]
  }

  /**
   * student_parent_details findFirstOrThrow
   */
  export type student_parent_detailsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
    /**
     * Filter, which student_parent_details to fetch.
     */
    where?: student_parent_detailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_parent_details to fetch.
     */
    orderBy?: student_parent_detailsOrderByWithRelationInput | student_parent_detailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for student_parent_details.
     */
    cursor?: student_parent_detailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_parent_details from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_parent_details.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of student_parent_details.
     */
    distinct?: Student_parent_detailsScalarFieldEnum | Student_parent_detailsScalarFieldEnum[]
  }

  /**
   * student_parent_details findMany
   */
  export type student_parent_detailsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
    /**
     * Filter, which student_parent_details to fetch.
     */
    where?: student_parent_detailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_parent_details to fetch.
     */
    orderBy?: student_parent_detailsOrderByWithRelationInput | student_parent_detailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing student_parent_details.
     */
    cursor?: student_parent_detailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_parent_details from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_parent_details.
     */
    skip?: number
    distinct?: Student_parent_detailsScalarFieldEnum | Student_parent_detailsScalarFieldEnum[]
  }

  /**
   * student_parent_details create
   */
  export type student_parent_detailsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
    /**
     * The data needed to create a student_parent_details.
     */
    data: XOR<student_parent_detailsCreateInput, student_parent_detailsUncheckedCreateInput>
  }

  /**
   * student_parent_details createMany
   */
  export type student_parent_detailsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many student_parent_details.
     */
    data: student_parent_detailsCreateManyInput | student_parent_detailsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * student_parent_details createManyAndReturn
   */
  export type student_parent_detailsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * The data used to create many student_parent_details.
     */
    data: student_parent_detailsCreateManyInput | student_parent_detailsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * student_parent_details update
   */
  export type student_parent_detailsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
    /**
     * The data needed to update a student_parent_details.
     */
    data: XOR<student_parent_detailsUpdateInput, student_parent_detailsUncheckedUpdateInput>
    /**
     * Choose, which student_parent_details to update.
     */
    where: student_parent_detailsWhereUniqueInput
  }

  /**
   * student_parent_details updateMany
   */
  export type student_parent_detailsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update student_parent_details.
     */
    data: XOR<student_parent_detailsUpdateManyMutationInput, student_parent_detailsUncheckedUpdateManyInput>
    /**
     * Filter which student_parent_details to update
     */
    where?: student_parent_detailsWhereInput
    /**
     * Limit how many student_parent_details to update.
     */
    limit?: number
  }

  /**
   * student_parent_details updateManyAndReturn
   */
  export type student_parent_detailsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * The data used to update student_parent_details.
     */
    data: XOR<student_parent_detailsUpdateManyMutationInput, student_parent_detailsUncheckedUpdateManyInput>
    /**
     * Filter which student_parent_details to update
     */
    where?: student_parent_detailsWhereInput
    /**
     * Limit how many student_parent_details to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * student_parent_details upsert
   */
  export type student_parent_detailsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
    /**
     * The filter to search for the student_parent_details to update in case it exists.
     */
    where: student_parent_detailsWhereUniqueInput
    /**
     * In case the student_parent_details found by the `where` argument doesn't exist, create a new student_parent_details with this data.
     */
    create: XOR<student_parent_detailsCreateInput, student_parent_detailsUncheckedCreateInput>
    /**
     * In case the student_parent_details was found with the provided `where` argument, update it with this data.
     */
    update: XOR<student_parent_detailsUpdateInput, student_parent_detailsUncheckedUpdateInput>
  }

  /**
   * student_parent_details delete
   */
  export type student_parent_detailsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
    /**
     * Filter which student_parent_details to delete.
     */
    where: student_parent_detailsWhereUniqueInput
  }

  /**
   * student_parent_details deleteMany
   */
  export type student_parent_detailsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which student_parent_details to delete
     */
    where?: student_parent_detailsWhereInput
    /**
     * Limit how many student_parent_details to delete.
     */
    limit?: number
  }

  /**
   * student_parent_details without action
   */
  export type student_parent_detailsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
  }


  /**
   * Model student_profiles
   */

  export type AggregateStudent_profiles = {
    _count: Student_profilesCountAggregateOutputType | null
    _avg: Student_profilesAvgAggregateOutputType | null
    _sum: Student_profilesSumAggregateOutputType | null
    _min: Student_profilesMinAggregateOutputType | null
    _max: Student_profilesMaxAggregateOutputType | null
  }

  export type Student_profilesAvgAggregateOutputType = {
    totalCredits: number | null
    currentCGPA: number | null
    overallAttendance: number | null
  }

  export type Student_profilesSumAggregateOutputType = {
    totalCredits: number | null
    currentCGPA: number | null
    overallAttendance: number | null
  }

  export type Student_profilesMinAggregateOutputType = {
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

  export type Student_profilesMaxAggregateOutputType = {
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

  export type Student_profilesCountAggregateOutputType = {
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


  export type Student_profilesAvgAggregateInputType = {
    totalCredits?: true
    currentCGPA?: true
    overallAttendance?: true
  }

  export type Student_profilesSumAggregateInputType = {
    totalCredits?: true
    currentCGPA?: true
    overallAttendance?: true
  }

  export type Student_profilesMinAggregateInputType = {
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

  export type Student_profilesMaxAggregateInputType = {
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

  export type Student_profilesCountAggregateInputType = {
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

  export type Student_profilesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which student_profiles to aggregate.
     */
    where?: student_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_profiles to fetch.
     */
    orderBy?: student_profilesOrderByWithRelationInput | student_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: student_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned student_profiles
    **/
    _count?: true | Student_profilesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Student_profilesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Student_profilesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Student_profilesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Student_profilesMaxAggregateInputType
  }

  export type GetStudent_profilesAggregateType<T extends Student_profilesAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent_profiles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent_profiles[P]>
      : GetScalarType<T[P], AggregateStudent_profiles[P]>
  }




  export type student_profilesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: student_profilesWhereInput
    orderBy?: student_profilesOrderByWithAggregationInput | student_profilesOrderByWithAggregationInput[]
    by: Student_profilesScalarFieldEnum[] | Student_profilesScalarFieldEnum
    having?: student_profilesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Student_profilesCountAggregateInputType | true
    _avg?: Student_profilesAvgAggregateInputType
    _sum?: Student_profilesSumAggregateInputType
    _min?: Student_profilesMinAggregateInputType
    _max?: Student_profilesMaxAggregateInputType
  }

  export type Student_profilesGroupByOutputType = {
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
    _count: Student_profilesCountAggregateOutputType | null
    _avg: Student_profilesAvgAggregateOutputType | null
    _sum: Student_profilesSumAggregateOutputType | null
    _min: Student_profilesMinAggregateOutputType | null
    _max: Student_profilesMaxAggregateOutputType | null
  }

  type GetStudent_profilesGroupByPayload<T extends student_profilesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Student_profilesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Student_profilesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Student_profilesGroupByOutputType[P]>
            : GetScalarType<T[P], Student_profilesGroupByOutputType[P]>
        }
      >
    >


  export type student_profilesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    academic_backlogs?: boolean | student_profiles$academic_backlogsArgs<ExtArgs>
    academic_semesters?: boolean | student_profiles$academic_semestersArgs<ExtArgs>
    student_contact_details?: boolean | student_profiles$student_contact_detailsArgs<ExtArgs>
    student_documents?: boolean | student_profiles$student_documentsArgs<ExtArgs>
    student_parent_details?: boolean | student_profiles$student_parent_detailsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | Student_profilesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_profiles"]>

  export type student_profilesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_profiles"]>

  export type student_profilesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student_profiles"]>

  export type student_profilesSelectScalar = {
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

  export type student_profilesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "registerNumber" | "admissionNumber" | "profileImage" | "dateOfBirth" | "gender" | "bloodGroup" | "nationality" | "religion" | "department" | "programme" | "semester" | "section" | "studentType" | "address" | "permanentAddress" | "yearsAtUniversity" | "totalCredits" | "currentCGPA" | "overallAttendance" | "academicStanding" | "currentMentor" | "createdAt" | "updatedAt" | "academicSetupCompleted", ExtArgs["result"]["student_profiles"]>
  export type student_profilesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academic_backlogs?: boolean | student_profiles$academic_backlogsArgs<ExtArgs>
    academic_semesters?: boolean | student_profiles$academic_semestersArgs<ExtArgs>
    student_contact_details?: boolean | student_profiles$student_contact_detailsArgs<ExtArgs>
    student_documents?: boolean | student_profiles$student_documentsArgs<ExtArgs>
    student_parent_details?: boolean | student_profiles$student_parent_detailsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | Student_profilesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type student_profilesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type student_profilesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $student_profilesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "student_profiles"
    objects: {
      academic_backlogs: Prisma.$academic_backlogsPayload<ExtArgs>[]
      academic_semesters: Prisma.$academic_semestersPayload<ExtArgs>[]
      student_contact_details: Prisma.$student_contact_detailsPayload<ExtArgs> | null
      student_documents: Prisma.$student_documentsPayload<ExtArgs>[]
      student_parent_details: Prisma.$student_parent_detailsPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs>
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
    }, ExtArgs["result"]["student_profiles"]>
    composites: {}
  }

  type student_profilesGetPayload<S extends boolean | null | undefined | student_profilesDefaultArgs> = $Result.GetResult<Prisma.$student_profilesPayload, S>

  type student_profilesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<student_profilesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Student_profilesCountAggregateInputType | true
    }

  export interface student_profilesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['student_profiles'], meta: { name: 'student_profiles' } }
    /**
     * Find zero or one Student_profiles that matches the filter.
     * @param {student_profilesFindUniqueArgs} args - Arguments to find a Student_profiles
     * @example
     * // Get one Student_profiles
     * const student_profiles = await prisma.student_profiles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends student_profilesFindUniqueArgs>(args: SelectSubset<T, student_profilesFindUniqueArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student_profiles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {student_profilesFindUniqueOrThrowArgs} args - Arguments to find a Student_profiles
     * @example
     * // Get one Student_profiles
     * const student_profiles = await prisma.student_profiles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends student_profilesFindUniqueOrThrowArgs>(args: SelectSubset<T, student_profilesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_profilesFindFirstArgs} args - Arguments to find a Student_profiles
     * @example
     * // Get one Student_profiles
     * const student_profiles = await prisma.student_profiles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends student_profilesFindFirstArgs>(args?: SelectSubset<T, student_profilesFindFirstArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student_profiles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_profilesFindFirstOrThrowArgs} args - Arguments to find a Student_profiles
     * @example
     * // Get one Student_profiles
     * const student_profiles = await prisma.student_profiles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends student_profilesFindFirstOrThrowArgs>(args?: SelectSubset<T, student_profilesFindFirstOrThrowArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Student_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_profilesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Student_profiles
     * const student_profiles = await prisma.student_profiles.findMany()
     * 
     * // Get first 10 Student_profiles
     * const student_profiles = await prisma.student_profiles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const student_profilesWithIdOnly = await prisma.student_profiles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends student_profilesFindManyArgs>(args?: SelectSubset<T, student_profilesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student_profiles.
     * @param {student_profilesCreateArgs} args - Arguments to create a Student_profiles.
     * @example
     * // Create one Student_profiles
     * const Student_profiles = await prisma.student_profiles.create({
     *   data: {
     *     // ... data to create a Student_profiles
     *   }
     * })
     * 
     */
    create<T extends student_profilesCreateArgs>(args: SelectSubset<T, student_profilesCreateArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Student_profiles.
     * @param {student_profilesCreateManyArgs} args - Arguments to create many Student_profiles.
     * @example
     * // Create many Student_profiles
     * const student_profiles = await prisma.student_profiles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends student_profilesCreateManyArgs>(args?: SelectSubset<T, student_profilesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Student_profiles and returns the data saved in the database.
     * @param {student_profilesCreateManyAndReturnArgs} args - Arguments to create many Student_profiles.
     * @example
     * // Create many Student_profiles
     * const student_profiles = await prisma.student_profiles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Student_profiles and only return the `id`
     * const student_profilesWithIdOnly = await prisma.student_profiles.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends student_profilesCreateManyAndReturnArgs>(args?: SelectSubset<T, student_profilesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student_profiles.
     * @param {student_profilesDeleteArgs} args - Arguments to delete one Student_profiles.
     * @example
     * // Delete one Student_profiles
     * const Student_profiles = await prisma.student_profiles.delete({
     *   where: {
     *     // ... filter to delete one Student_profiles
     *   }
     * })
     * 
     */
    delete<T extends student_profilesDeleteArgs>(args: SelectSubset<T, student_profilesDeleteArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student_profiles.
     * @param {student_profilesUpdateArgs} args - Arguments to update one Student_profiles.
     * @example
     * // Update one Student_profiles
     * const student_profiles = await prisma.student_profiles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends student_profilesUpdateArgs>(args: SelectSubset<T, student_profilesUpdateArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Student_profiles.
     * @param {student_profilesDeleteManyArgs} args - Arguments to filter Student_profiles to delete.
     * @example
     * // Delete a few Student_profiles
     * const { count } = await prisma.student_profiles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends student_profilesDeleteManyArgs>(args?: SelectSubset<T, student_profilesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Student_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_profilesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Student_profiles
     * const student_profiles = await prisma.student_profiles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends student_profilesUpdateManyArgs>(args: SelectSubset<T, student_profilesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Student_profiles and returns the data updated in the database.
     * @param {student_profilesUpdateManyAndReturnArgs} args - Arguments to update many Student_profiles.
     * @example
     * // Update many Student_profiles
     * const student_profiles = await prisma.student_profiles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Student_profiles and only return the `id`
     * const student_profilesWithIdOnly = await prisma.student_profiles.updateManyAndReturn({
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
    updateManyAndReturn<T extends student_profilesUpdateManyAndReturnArgs>(args: SelectSubset<T, student_profilesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student_profiles.
     * @param {student_profilesUpsertArgs} args - Arguments to update or create a Student_profiles.
     * @example
     * // Update or create a Student_profiles
     * const student_profiles = await prisma.student_profiles.upsert({
     *   create: {
     *     // ... data to create a Student_profiles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student_profiles we want to update
     *   }
     * })
     */
    upsert<T extends student_profilesUpsertArgs>(args: SelectSubset<T, student_profilesUpsertArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Student_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_profilesCountArgs} args - Arguments to filter Student_profiles to count.
     * @example
     * // Count the number of Student_profiles
     * const count = await prisma.student_profiles.count({
     *   where: {
     *     // ... the filter for the Student_profiles we want to count
     *   }
     * })
    **/
    count<T extends student_profilesCountArgs>(
      args?: Subset<T, student_profilesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Student_profilesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Student_profilesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Student_profilesAggregateArgs>(args: Subset<T, Student_profilesAggregateArgs>): Prisma.PrismaPromise<GetStudent_profilesAggregateType<T>>

    /**
     * Group by Student_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {student_profilesGroupByArgs} args - Group by arguments.
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
      T extends student_profilesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: student_profilesGroupByArgs['orderBy'] }
        : { orderBy?: student_profilesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, student_profilesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudent_profilesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the student_profiles model
   */
  readonly fields: student_profilesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for student_profiles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__student_profilesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    academic_backlogs<T extends student_profiles$academic_backlogsArgs<ExtArgs> = {}>(args?: Subset<T, student_profiles$academic_backlogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_backlogsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    academic_semesters<T extends student_profiles$academic_semestersArgs<ExtArgs> = {}>(args?: Subset<T, student_profiles$academic_semestersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$academic_semestersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    student_contact_details<T extends student_profiles$student_contact_detailsArgs<ExtArgs> = {}>(args?: Subset<T, student_profiles$student_contact_detailsArgs<ExtArgs>>): Prisma__student_contact_detailsClient<$Result.GetResult<Prisma.$student_contact_detailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    student_documents<T extends student_profiles$student_documentsArgs<ExtArgs> = {}>(args?: Subset<T, student_profiles$student_documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$student_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    student_parent_details<T extends student_profiles$student_parent_detailsArgs<ExtArgs> = {}>(args?: Subset<T, student_profiles$student_parent_detailsArgs<ExtArgs>>): Prisma__student_parent_detailsClient<$Result.GetResult<Prisma.$student_parent_detailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the student_profiles model
   */
  interface student_profilesFieldRefs {
    readonly id: FieldRef<"student_profiles", 'String'>
    readonly userId: FieldRef<"student_profiles", 'String'>
    readonly registerNumber: FieldRef<"student_profiles", 'String'>
    readonly admissionNumber: FieldRef<"student_profiles", 'String'>
    readonly profileImage: FieldRef<"student_profiles", 'String'>
    readonly dateOfBirth: FieldRef<"student_profiles", 'DateTime'>
    readonly gender: FieldRef<"student_profiles", 'Gender'>
    readonly bloodGroup: FieldRef<"student_profiles", 'BloodGroup'>
    readonly nationality: FieldRef<"student_profiles", 'String'>
    readonly religion: FieldRef<"student_profiles", 'String'>
    readonly department: FieldRef<"student_profiles", 'String'>
    readonly programme: FieldRef<"student_profiles", 'String'>
    readonly semester: FieldRef<"student_profiles", 'String'>
    readonly section: FieldRef<"student_profiles", 'String'>
    readonly studentType: FieldRef<"student_profiles", 'StudentType'>
    readonly address: FieldRef<"student_profiles", 'String'>
    readonly permanentAddress: FieldRef<"student_profiles", 'String'>
    readonly yearsAtUniversity: FieldRef<"student_profiles", 'String'>
    readonly totalCredits: FieldRef<"student_profiles", 'Int'>
    readonly currentCGPA: FieldRef<"student_profiles", 'Float'>
    readonly overallAttendance: FieldRef<"student_profiles", 'Float'>
    readonly academicStanding: FieldRef<"student_profiles", 'String'>
    readonly currentMentor: FieldRef<"student_profiles", 'String'>
    readonly createdAt: FieldRef<"student_profiles", 'DateTime'>
    readonly updatedAt: FieldRef<"student_profiles", 'DateTime'>
    readonly academicSetupCompleted: FieldRef<"student_profiles", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * student_profiles findUnique
   */
  export type student_profilesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
    /**
     * Filter, which student_profiles to fetch.
     */
    where: student_profilesWhereUniqueInput
  }

  /**
   * student_profiles findUniqueOrThrow
   */
  export type student_profilesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
    /**
     * Filter, which student_profiles to fetch.
     */
    where: student_profilesWhereUniqueInput
  }

  /**
   * student_profiles findFirst
   */
  export type student_profilesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
    /**
     * Filter, which student_profiles to fetch.
     */
    where?: student_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_profiles to fetch.
     */
    orderBy?: student_profilesOrderByWithRelationInput | student_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for student_profiles.
     */
    cursor?: student_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of student_profiles.
     */
    distinct?: Student_profilesScalarFieldEnum | Student_profilesScalarFieldEnum[]
  }

  /**
   * student_profiles findFirstOrThrow
   */
  export type student_profilesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
    /**
     * Filter, which student_profiles to fetch.
     */
    where?: student_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_profiles to fetch.
     */
    orderBy?: student_profilesOrderByWithRelationInput | student_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for student_profiles.
     */
    cursor?: student_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of student_profiles.
     */
    distinct?: Student_profilesScalarFieldEnum | Student_profilesScalarFieldEnum[]
  }

  /**
   * student_profiles findMany
   */
  export type student_profilesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
    /**
     * Filter, which student_profiles to fetch.
     */
    where?: student_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of student_profiles to fetch.
     */
    orderBy?: student_profilesOrderByWithRelationInput | student_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing student_profiles.
     */
    cursor?: student_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` student_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` student_profiles.
     */
    skip?: number
    distinct?: Student_profilesScalarFieldEnum | Student_profilesScalarFieldEnum[]
  }

  /**
   * student_profiles create
   */
  export type student_profilesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
    /**
     * The data needed to create a student_profiles.
     */
    data: XOR<student_profilesCreateInput, student_profilesUncheckedCreateInput>
  }

  /**
   * student_profiles createMany
   */
  export type student_profilesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many student_profiles.
     */
    data: student_profilesCreateManyInput | student_profilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * student_profiles createManyAndReturn
   */
  export type student_profilesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * The data used to create many student_profiles.
     */
    data: student_profilesCreateManyInput | student_profilesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * student_profiles update
   */
  export type student_profilesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
    /**
     * The data needed to update a student_profiles.
     */
    data: XOR<student_profilesUpdateInput, student_profilesUncheckedUpdateInput>
    /**
     * Choose, which student_profiles to update.
     */
    where: student_profilesWhereUniqueInput
  }

  /**
   * student_profiles updateMany
   */
  export type student_profilesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update student_profiles.
     */
    data: XOR<student_profilesUpdateManyMutationInput, student_profilesUncheckedUpdateManyInput>
    /**
     * Filter which student_profiles to update
     */
    where?: student_profilesWhereInput
    /**
     * Limit how many student_profiles to update.
     */
    limit?: number
  }

  /**
   * student_profiles updateManyAndReturn
   */
  export type student_profilesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * The data used to update student_profiles.
     */
    data: XOR<student_profilesUpdateManyMutationInput, student_profilesUncheckedUpdateManyInput>
    /**
     * Filter which student_profiles to update
     */
    where?: student_profilesWhereInput
    /**
     * Limit how many student_profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * student_profiles upsert
   */
  export type student_profilesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
    /**
     * The filter to search for the student_profiles to update in case it exists.
     */
    where: student_profilesWhereUniqueInput
    /**
     * In case the student_profiles found by the `where` argument doesn't exist, create a new student_profiles with this data.
     */
    create: XOR<student_profilesCreateInput, student_profilesUncheckedCreateInput>
    /**
     * In case the student_profiles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<student_profilesUpdateInput, student_profilesUncheckedUpdateInput>
  }

  /**
   * student_profiles delete
   */
  export type student_profilesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
    /**
     * Filter which student_profiles to delete.
     */
    where: student_profilesWhereUniqueInput
  }

  /**
   * student_profiles deleteMany
   */
  export type student_profilesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which student_profiles to delete
     */
    where?: student_profilesWhereInput
    /**
     * Limit how many student_profiles to delete.
     */
    limit?: number
  }

  /**
   * student_profiles.academic_backlogs
   */
  export type student_profiles$academic_backlogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_backlogs
     */
    select?: academic_backlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_backlogs
     */
    omit?: academic_backlogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_backlogsInclude<ExtArgs> | null
    where?: academic_backlogsWhereInput
    orderBy?: academic_backlogsOrderByWithRelationInput | academic_backlogsOrderByWithRelationInput[]
    cursor?: academic_backlogsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Academic_backlogsScalarFieldEnum | Academic_backlogsScalarFieldEnum[]
  }

  /**
   * student_profiles.academic_semesters
   */
  export type student_profiles$academic_semestersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the academic_semesters
     */
    select?: academic_semestersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the academic_semesters
     */
    omit?: academic_semestersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: academic_semestersInclude<ExtArgs> | null
    where?: academic_semestersWhereInput
    orderBy?: academic_semestersOrderByWithRelationInput | academic_semestersOrderByWithRelationInput[]
    cursor?: academic_semestersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Academic_semestersScalarFieldEnum | Academic_semestersScalarFieldEnum[]
  }

  /**
   * student_profiles.student_contact_details
   */
  export type student_profiles$student_contact_detailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_contact_details
     */
    select?: student_contact_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_contact_details
     */
    omit?: student_contact_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_contact_detailsInclude<ExtArgs> | null
    where?: student_contact_detailsWhereInput
  }

  /**
   * student_profiles.student_documents
   */
  export type student_profiles$student_documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_documents
     */
    select?: student_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_documents
     */
    omit?: student_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_documentsInclude<ExtArgs> | null
    where?: student_documentsWhereInput
    orderBy?: student_documentsOrderByWithRelationInput | student_documentsOrderByWithRelationInput[]
    cursor?: student_documentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Student_documentsScalarFieldEnum | Student_documentsScalarFieldEnum[]
  }

  /**
   * student_profiles.student_parent_details
   */
  export type student_profiles$student_parent_detailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_parent_details
     */
    select?: student_parent_detailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_parent_details
     */
    omit?: student_parent_detailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_parent_detailsInclude<ExtArgs> | null
    where?: student_parent_detailsWhereInput
  }

  /**
   * student_profiles without action
   */
  export type student_profilesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
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

  export type UsersMaxAggregateOutputType = {
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

  export type UsersCountAggregateOutputType = {
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


  export type UsersMinAggregateInputType = {
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

  export type UsersMaxAggregateInputType = {
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

  export type UsersCountAggregateInputType = {
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

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
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
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    student_profiles?: boolean | users$student_profilesArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
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

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "username" | "email" | "password" | "role" | "isActive" | "lastLogin" | "createdAt" | "updatedAt", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student_profiles?: boolean | users$student_profilesArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      student_profiles: Prisma.$student_profilesPayload<ExtArgs> | null
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
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
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
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student_profiles<T extends users$student_profilesArgs<ExtArgs> = {}>(args?: Subset<T, users$student_profilesArgs<ExtArgs>>): Prisma__student_profilesClient<$Result.GetResult<Prisma.$student_profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly fullName: FieldRef<"users", 'String'>
    readonly username: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'Role'>
    readonly isActive: FieldRef<"users", 'Boolean'>
    readonly lastLogin: FieldRef<"users", 'DateTime'>
    readonly createdAt: FieldRef<"users", 'DateTime'>
    readonly updatedAt: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.student_profiles
   */
  export type users$student_profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the student_profiles
     */
    select?: student_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the student_profiles
     */
    omit?: student_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: student_profilesInclude<ExtArgs> | null
    where?: student_profilesWhereInput
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
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


  export const Academic_backlogsScalarFieldEnum: {
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

  export type Academic_backlogsScalarFieldEnum = (typeof Academic_backlogsScalarFieldEnum)[keyof typeof Academic_backlogsScalarFieldEnum]


  export const Academic_semestersScalarFieldEnum: {
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

  export type Academic_semestersScalarFieldEnum = (typeof Academic_semestersScalarFieldEnum)[keyof typeof Academic_semestersScalarFieldEnum]


  export const Academic_subjectsScalarFieldEnum: {
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

  export type Academic_subjectsScalarFieldEnum = (typeof Academic_subjectsScalarFieldEnum)[keyof typeof Academic_subjectsScalarFieldEnum]


  export const Student_contact_detailsScalarFieldEnum: {
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

  export type Student_contact_detailsScalarFieldEnum = (typeof Student_contact_detailsScalarFieldEnum)[keyof typeof Student_contact_detailsScalarFieldEnum]


  export const Student_documentsScalarFieldEnum: {
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

  export type Student_documentsScalarFieldEnum = (typeof Student_documentsScalarFieldEnum)[keyof typeof Student_documentsScalarFieldEnum]


  export const Student_parent_detailsScalarFieldEnum: {
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

  export type Student_parent_detailsScalarFieldEnum = (typeof Student_parent_detailsScalarFieldEnum)[keyof typeof Student_parent_detailsScalarFieldEnum]


  export const Student_profilesScalarFieldEnum: {
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

  export type Student_profilesScalarFieldEnum = (typeof Student_profilesScalarFieldEnum)[keyof typeof Student_profilesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
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

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'AcademicBacklogStatus'
   */
  export type EnumAcademicBacklogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcademicBacklogStatus'>
    


  /**
   * Reference to a field of type 'AcademicBacklogStatus[]'
   */
  export type ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcademicBacklogStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DocumentCategory'
   */
  export type EnumDocumentCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentCategory'>
    


  /**
   * Reference to a field of type 'DocumentCategory[]'
   */
  export type ListEnumDocumentCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentCategory[]'>
    


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    
  /**
   * Deep Input Types
   */


  export type academic_backlogsWhereInput = {
    AND?: academic_backlogsWhereInput | academic_backlogsWhereInput[]
    OR?: academic_backlogsWhereInput[]
    NOT?: academic_backlogsWhereInput | academic_backlogsWhereInput[]
    id?: StringFilter<"academic_backlogs"> | string
    studentProfileId?: StringFilter<"academic_backlogs"> | string
    subjectCode?: StringFilter<"academic_backlogs"> | string
    subjectName?: StringFilter<"academic_backlogs"> | string
    semesterNumber?: IntFilter<"academic_backlogs"> | number
    status?: EnumAcademicBacklogStatusFilter<"academic_backlogs"> | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: IntNullableFilter<"academic_backlogs"> | number | null
    clearedGrade?: StringNullableFilter<"academic_backlogs"> | string | null
    clearedMarks?: FloatNullableFilter<"academic_backlogs"> | number | null
    clearedAt?: DateTimeNullableFilter<"academic_backlogs"> | Date | string | null
    createdAt?: DateTimeFilter<"academic_backlogs"> | Date | string
    updatedAt?: DateTimeFilter<"academic_backlogs"> | Date | string
    student_profiles?: XOR<Student_profilesScalarRelationFilter, student_profilesWhereInput>
  }

  export type academic_backlogsOrderByWithRelationInput = {
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
    student_profiles?: student_profilesOrderByWithRelationInput
  }

  export type academic_backlogsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: academic_backlogsWhereInput | academic_backlogsWhereInput[]
    OR?: academic_backlogsWhereInput[]
    NOT?: academic_backlogsWhereInput | academic_backlogsWhereInput[]
    studentProfileId?: StringFilter<"academic_backlogs"> | string
    subjectCode?: StringFilter<"academic_backlogs"> | string
    subjectName?: StringFilter<"academic_backlogs"> | string
    semesterNumber?: IntFilter<"academic_backlogs"> | number
    status?: EnumAcademicBacklogStatusFilter<"academic_backlogs"> | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: IntNullableFilter<"academic_backlogs"> | number | null
    clearedGrade?: StringNullableFilter<"academic_backlogs"> | string | null
    clearedMarks?: FloatNullableFilter<"academic_backlogs"> | number | null
    clearedAt?: DateTimeNullableFilter<"academic_backlogs"> | Date | string | null
    createdAt?: DateTimeFilter<"academic_backlogs"> | Date | string
    updatedAt?: DateTimeFilter<"academic_backlogs"> | Date | string
    student_profiles?: XOR<Student_profilesScalarRelationFilter, student_profilesWhereInput>
  }, "id">

  export type academic_backlogsOrderByWithAggregationInput = {
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
    _count?: academic_backlogsCountOrderByAggregateInput
    _avg?: academic_backlogsAvgOrderByAggregateInput
    _max?: academic_backlogsMaxOrderByAggregateInput
    _min?: academic_backlogsMinOrderByAggregateInput
    _sum?: academic_backlogsSumOrderByAggregateInput
  }

  export type academic_backlogsScalarWhereWithAggregatesInput = {
    AND?: academic_backlogsScalarWhereWithAggregatesInput | academic_backlogsScalarWhereWithAggregatesInput[]
    OR?: academic_backlogsScalarWhereWithAggregatesInput[]
    NOT?: academic_backlogsScalarWhereWithAggregatesInput | academic_backlogsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"academic_backlogs"> | string
    studentProfileId?: StringWithAggregatesFilter<"academic_backlogs"> | string
    subjectCode?: StringWithAggregatesFilter<"academic_backlogs"> | string
    subjectName?: StringWithAggregatesFilter<"academic_backlogs"> | string
    semesterNumber?: IntWithAggregatesFilter<"academic_backlogs"> | number
    status?: EnumAcademicBacklogStatusWithAggregatesFilter<"academic_backlogs"> | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: IntNullableWithAggregatesFilter<"academic_backlogs"> | number | null
    clearedGrade?: StringNullableWithAggregatesFilter<"academic_backlogs"> | string | null
    clearedMarks?: FloatNullableWithAggregatesFilter<"academic_backlogs"> | number | null
    clearedAt?: DateTimeNullableWithAggregatesFilter<"academic_backlogs"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"academic_backlogs"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"academic_backlogs"> | Date | string
  }

  export type academic_semestersWhereInput = {
    AND?: academic_semestersWhereInput | academic_semestersWhereInput[]
    OR?: academic_semestersWhereInput[]
    NOT?: academic_semestersWhereInput | academic_semestersWhereInput[]
    id?: StringFilter<"academic_semesters"> | string
    studentProfileId?: StringFilter<"academic_semesters"> | string
    semesterNumber?: IntFilter<"academic_semesters"> | number
    academicYear?: StringNullableFilter<"academic_semesters"> | string | null
    term?: StringNullableFilter<"academic_semesters"> | string | null
    status?: EnumAcademicSemesterStatusFilter<"academic_semesters"> | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFilter<"academic_semesters"> | $Enums.AcademicEntryStatus
    sgpa?: FloatNullableFilter<"academic_semesters"> | number | null
    totalCredits?: IntFilter<"academic_semesters"> | number
    creditsEarned?: IntFilter<"academic_semesters"> | number
    backlogs?: IntFilter<"academic_semesters"> | number
    createdAt?: DateTimeFilter<"academic_semesters"> | Date | string
    updatedAt?: DateTimeFilter<"academic_semesters"> | Date | string
    student_profiles?: XOR<Student_profilesScalarRelationFilter, student_profilesWhereInput>
    academic_subjects?: Academic_subjectsListRelationFilter
  }

  export type academic_semestersOrderByWithRelationInput = {
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
    student_profiles?: student_profilesOrderByWithRelationInput
    academic_subjects?: academic_subjectsOrderByRelationAggregateInput
  }

  export type academic_semestersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentProfileId_semesterNumber?: academic_semestersStudentProfileIdSemesterNumberCompoundUniqueInput
    AND?: academic_semestersWhereInput | academic_semestersWhereInput[]
    OR?: academic_semestersWhereInput[]
    NOT?: academic_semestersWhereInput | academic_semestersWhereInput[]
    studentProfileId?: StringFilter<"academic_semesters"> | string
    semesterNumber?: IntFilter<"academic_semesters"> | number
    academicYear?: StringNullableFilter<"academic_semesters"> | string | null
    term?: StringNullableFilter<"academic_semesters"> | string | null
    status?: EnumAcademicSemesterStatusFilter<"academic_semesters"> | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFilter<"academic_semesters"> | $Enums.AcademicEntryStatus
    sgpa?: FloatNullableFilter<"academic_semesters"> | number | null
    totalCredits?: IntFilter<"academic_semesters"> | number
    creditsEarned?: IntFilter<"academic_semesters"> | number
    backlogs?: IntFilter<"academic_semesters"> | number
    createdAt?: DateTimeFilter<"academic_semesters"> | Date | string
    updatedAt?: DateTimeFilter<"academic_semesters"> | Date | string
    student_profiles?: XOR<Student_profilesScalarRelationFilter, student_profilesWhereInput>
    academic_subjects?: Academic_subjectsListRelationFilter
  }, "id" | "studentProfileId_semesterNumber">

  export type academic_semestersOrderByWithAggregationInput = {
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
    _count?: academic_semestersCountOrderByAggregateInput
    _avg?: academic_semestersAvgOrderByAggregateInput
    _max?: academic_semestersMaxOrderByAggregateInput
    _min?: academic_semestersMinOrderByAggregateInput
    _sum?: academic_semestersSumOrderByAggregateInput
  }

  export type academic_semestersScalarWhereWithAggregatesInput = {
    AND?: academic_semestersScalarWhereWithAggregatesInput | academic_semestersScalarWhereWithAggregatesInput[]
    OR?: academic_semestersScalarWhereWithAggregatesInput[]
    NOT?: academic_semestersScalarWhereWithAggregatesInput | academic_semestersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"academic_semesters"> | string
    studentProfileId?: StringWithAggregatesFilter<"academic_semesters"> | string
    semesterNumber?: IntWithAggregatesFilter<"academic_semesters"> | number
    academicYear?: StringNullableWithAggregatesFilter<"academic_semesters"> | string | null
    term?: StringNullableWithAggregatesFilter<"academic_semesters"> | string | null
    status?: EnumAcademicSemesterStatusWithAggregatesFilter<"academic_semesters"> | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusWithAggregatesFilter<"academic_semesters"> | $Enums.AcademicEntryStatus
    sgpa?: FloatNullableWithAggregatesFilter<"academic_semesters"> | number | null
    totalCredits?: IntWithAggregatesFilter<"academic_semesters"> | number
    creditsEarned?: IntWithAggregatesFilter<"academic_semesters"> | number
    backlogs?: IntWithAggregatesFilter<"academic_semesters"> | number
    createdAt?: DateTimeWithAggregatesFilter<"academic_semesters"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"academic_semesters"> | Date | string
  }

  export type academic_subjectsWhereInput = {
    AND?: academic_subjectsWhereInput | academic_subjectsWhereInput[]
    OR?: academic_subjectsWhereInput[]
    NOT?: academic_subjectsWhereInput | academic_subjectsWhereInput[]
    id?: StringFilter<"academic_subjects"> | string
    academicSemesterId?: StringFilter<"academic_subjects"> | string
    courseCode?: StringFilter<"academic_subjects"> | string
    courseName?: StringFilter<"academic_subjects"> | string
    credits?: IntFilter<"academic_subjects"> | number
    cia1?: FloatNullableFilter<"academic_subjects"> | number | null
    cia2?: FloatNullableFilter<"academic_subjects"> | number | null
    cia3?: FloatNullableFilter<"academic_subjects"> | number | null
    mse?: FloatNullableFilter<"academic_subjects"> | number | null
    ese?: FloatNullableFilter<"academic_subjects"> | number | null
    maximumMarks?: FloatNullableFilter<"academic_subjects"> | number | null
    totalMarksObtained?: FloatNullableFilter<"academic_subjects"> | number | null
    grade?: StringNullableFilter<"academic_subjects"> | string | null
    gradePoint?: FloatNullableFilter<"academic_subjects"> | number | null
    attendance?: FloatNullableFilter<"academic_subjects"> | number | null
    createdAt?: DateTimeFilter<"academic_subjects"> | Date | string
    updatedAt?: DateTimeFilter<"academic_subjects"> | Date | string
    classesAttended?: IntFilter<"academic_subjects"> | number
    classesHeld?: IntFilter<"academic_subjects"> | number
    academic_semesters?: XOR<Academic_semestersScalarRelationFilter, academic_semestersWhereInput>
  }

  export type academic_subjectsOrderByWithRelationInput = {
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
    academic_semesters?: academic_semestersOrderByWithRelationInput
  }

  export type academic_subjectsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: academic_subjectsWhereInput | academic_subjectsWhereInput[]
    OR?: academic_subjectsWhereInput[]
    NOT?: academic_subjectsWhereInput | academic_subjectsWhereInput[]
    academicSemesterId?: StringFilter<"academic_subjects"> | string
    courseCode?: StringFilter<"academic_subjects"> | string
    courseName?: StringFilter<"academic_subjects"> | string
    credits?: IntFilter<"academic_subjects"> | number
    cia1?: FloatNullableFilter<"academic_subjects"> | number | null
    cia2?: FloatNullableFilter<"academic_subjects"> | number | null
    cia3?: FloatNullableFilter<"academic_subjects"> | number | null
    mse?: FloatNullableFilter<"academic_subjects"> | number | null
    ese?: FloatNullableFilter<"academic_subjects"> | number | null
    maximumMarks?: FloatNullableFilter<"academic_subjects"> | number | null
    totalMarksObtained?: FloatNullableFilter<"academic_subjects"> | number | null
    grade?: StringNullableFilter<"academic_subjects"> | string | null
    gradePoint?: FloatNullableFilter<"academic_subjects"> | number | null
    attendance?: FloatNullableFilter<"academic_subjects"> | number | null
    createdAt?: DateTimeFilter<"academic_subjects"> | Date | string
    updatedAt?: DateTimeFilter<"academic_subjects"> | Date | string
    classesAttended?: IntFilter<"academic_subjects"> | number
    classesHeld?: IntFilter<"academic_subjects"> | number
    academic_semesters?: XOR<Academic_semestersScalarRelationFilter, academic_semestersWhereInput>
  }, "id">

  export type academic_subjectsOrderByWithAggregationInput = {
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
    _count?: academic_subjectsCountOrderByAggregateInput
    _avg?: academic_subjectsAvgOrderByAggregateInput
    _max?: academic_subjectsMaxOrderByAggregateInput
    _min?: academic_subjectsMinOrderByAggregateInput
    _sum?: academic_subjectsSumOrderByAggregateInput
  }

  export type academic_subjectsScalarWhereWithAggregatesInput = {
    AND?: academic_subjectsScalarWhereWithAggregatesInput | academic_subjectsScalarWhereWithAggregatesInput[]
    OR?: academic_subjectsScalarWhereWithAggregatesInput[]
    NOT?: academic_subjectsScalarWhereWithAggregatesInput | academic_subjectsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"academic_subjects"> | string
    academicSemesterId?: StringWithAggregatesFilter<"academic_subjects"> | string
    courseCode?: StringWithAggregatesFilter<"academic_subjects"> | string
    courseName?: StringWithAggregatesFilter<"academic_subjects"> | string
    credits?: IntWithAggregatesFilter<"academic_subjects"> | number
    cia1?: FloatNullableWithAggregatesFilter<"academic_subjects"> | number | null
    cia2?: FloatNullableWithAggregatesFilter<"academic_subjects"> | number | null
    cia3?: FloatNullableWithAggregatesFilter<"academic_subjects"> | number | null
    mse?: FloatNullableWithAggregatesFilter<"academic_subjects"> | number | null
    ese?: FloatNullableWithAggregatesFilter<"academic_subjects"> | number | null
    maximumMarks?: FloatNullableWithAggregatesFilter<"academic_subjects"> | number | null
    totalMarksObtained?: FloatNullableWithAggregatesFilter<"academic_subjects"> | number | null
    grade?: StringNullableWithAggregatesFilter<"academic_subjects"> | string | null
    gradePoint?: FloatNullableWithAggregatesFilter<"academic_subjects"> | number | null
    attendance?: FloatNullableWithAggregatesFilter<"academic_subjects"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"academic_subjects"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"academic_subjects"> | Date | string
    classesAttended?: IntWithAggregatesFilter<"academic_subjects"> | number
    classesHeld?: IntWithAggregatesFilter<"academic_subjects"> | number
  }

  export type student_contact_detailsWhereInput = {
    AND?: student_contact_detailsWhereInput | student_contact_detailsWhereInput[]
    OR?: student_contact_detailsWhereInput[]
    NOT?: student_contact_detailsWhereInput | student_contact_detailsWhereInput[]
    id?: StringFilter<"student_contact_details"> | string
    studentProfileId?: StringFilter<"student_contact_details"> | string
    permanentAddress?: StringNullableFilter<"student_contact_details"> | string | null
    currentAddress?: StringNullableFilter<"student_contact_details"> | string | null
    addressType?: EnumAddressTypeNullableFilter<"student_contact_details"> | $Enums.AddressType | null
    durationAtCurrentAddress?: StringNullableFilter<"student_contact_details"> | string | null
    personalMobile?: StringNullableFilter<"student_contact_details"> | string | null
    alternateMobile?: StringNullableFilter<"student_contact_details"> | string | null
    personalEmail?: StringNullableFilter<"student_contact_details"> | string | null
    alternateEmail?: StringNullableFilter<"student_contact_details"> | string | null
    whatsappNumber?: StringNullableFilter<"student_contact_details"> | string | null
    telegramUsername?: StringNullableFilter<"student_contact_details"> | string | null
    linkedInProfile?: StringNullableFilter<"student_contact_details"> | string | null
    githubProfile?: StringNullableFilter<"student_contact_details"> | string | null
    preferredContactMethod?: EnumPreferredContactMethodNullableFilter<"student_contact_details"> | $Enums.PreferredContactMethod | null
    preferredContactTime?: StringNullableFilter<"student_contact_details"> | string | null
    communicationEmailPreference?: EnumCommunicationEmailPreferenceNullableFilter<"student_contact_details"> | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolFilter<"student_contact_details"> | boolean
    createdAt?: DateTimeFilter<"student_contact_details"> | Date | string
    updatedAt?: DateTimeFilter<"student_contact_details"> | Date | string
    student_profiles?: XOR<Student_profilesScalarRelationFilter, student_profilesWhereInput>
  }

  export type student_contact_detailsOrderByWithRelationInput = {
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
    student_profiles?: student_profilesOrderByWithRelationInput
  }

  export type student_contact_detailsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentProfileId?: string
    AND?: student_contact_detailsWhereInput | student_contact_detailsWhereInput[]
    OR?: student_contact_detailsWhereInput[]
    NOT?: student_contact_detailsWhereInput | student_contact_detailsWhereInput[]
    permanentAddress?: StringNullableFilter<"student_contact_details"> | string | null
    currentAddress?: StringNullableFilter<"student_contact_details"> | string | null
    addressType?: EnumAddressTypeNullableFilter<"student_contact_details"> | $Enums.AddressType | null
    durationAtCurrentAddress?: StringNullableFilter<"student_contact_details"> | string | null
    personalMobile?: StringNullableFilter<"student_contact_details"> | string | null
    alternateMobile?: StringNullableFilter<"student_contact_details"> | string | null
    personalEmail?: StringNullableFilter<"student_contact_details"> | string | null
    alternateEmail?: StringNullableFilter<"student_contact_details"> | string | null
    whatsappNumber?: StringNullableFilter<"student_contact_details"> | string | null
    telegramUsername?: StringNullableFilter<"student_contact_details"> | string | null
    linkedInProfile?: StringNullableFilter<"student_contact_details"> | string | null
    githubProfile?: StringNullableFilter<"student_contact_details"> | string | null
    preferredContactMethod?: EnumPreferredContactMethodNullableFilter<"student_contact_details"> | $Enums.PreferredContactMethod | null
    preferredContactTime?: StringNullableFilter<"student_contact_details"> | string | null
    communicationEmailPreference?: EnumCommunicationEmailPreferenceNullableFilter<"student_contact_details"> | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolFilter<"student_contact_details"> | boolean
    createdAt?: DateTimeFilter<"student_contact_details"> | Date | string
    updatedAt?: DateTimeFilter<"student_contact_details"> | Date | string
    student_profiles?: XOR<Student_profilesScalarRelationFilter, student_profilesWhereInput>
  }, "id" | "studentProfileId">

  export type student_contact_detailsOrderByWithAggregationInput = {
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
    _count?: student_contact_detailsCountOrderByAggregateInput
    _max?: student_contact_detailsMaxOrderByAggregateInput
    _min?: student_contact_detailsMinOrderByAggregateInput
  }

  export type student_contact_detailsScalarWhereWithAggregatesInput = {
    AND?: student_contact_detailsScalarWhereWithAggregatesInput | student_contact_detailsScalarWhereWithAggregatesInput[]
    OR?: student_contact_detailsScalarWhereWithAggregatesInput[]
    NOT?: student_contact_detailsScalarWhereWithAggregatesInput | student_contact_detailsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"student_contact_details"> | string
    studentProfileId?: StringWithAggregatesFilter<"student_contact_details"> | string
    permanentAddress?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    currentAddress?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    addressType?: EnumAddressTypeNullableWithAggregatesFilter<"student_contact_details"> | $Enums.AddressType | null
    durationAtCurrentAddress?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    personalMobile?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    alternateMobile?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    personalEmail?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    alternateEmail?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    whatsappNumber?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    telegramUsername?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    linkedInProfile?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    githubProfile?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    preferredContactMethod?: EnumPreferredContactMethodNullableWithAggregatesFilter<"student_contact_details"> | $Enums.PreferredContactMethod | null
    preferredContactTime?: StringNullableWithAggregatesFilter<"student_contact_details"> | string | null
    communicationEmailPreference?: EnumCommunicationEmailPreferenceNullableWithAggregatesFilter<"student_contact_details"> | $Enums.CommunicationEmailPreference | null
    allowWhatsappCommunication?: BoolWithAggregatesFilter<"student_contact_details"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"student_contact_details"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"student_contact_details"> | Date | string
  }

  export type student_documentsWhereInput = {
    AND?: student_documentsWhereInput | student_documentsWhereInput[]
    OR?: student_documentsWhereInput[]
    NOT?: student_documentsWhereInput | student_documentsWhereInput[]
    id?: StringFilter<"student_documents"> | string
    studentProfileId?: StringFilter<"student_documents"> | string
    documentName?: StringFilter<"student_documents"> | string
    category?: EnumDocumentCategoryFilter<"student_documents"> | $Enums.DocumentCategory
    description?: StringNullableFilter<"student_documents"> | string | null
    fileType?: StringFilter<"student_documents"> | string
    fileSize?: IntFilter<"student_documents"> | number
    cloudinaryPublicId?: StringFilter<"student_documents"> | string
    fileUrl?: StringFilter<"student_documents"> | string
    uploadedAt?: DateTimeFilter<"student_documents"> | Date | string
    updatedAt?: DateTimeFilter<"student_documents"> | Date | string
    resourceType?: StringFilter<"student_documents"> | string
    student_profiles?: XOR<Student_profilesScalarRelationFilter, student_profilesWhereInput>
  }

  export type student_documentsOrderByWithRelationInput = {
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
    student_profiles?: student_profilesOrderByWithRelationInput
  }

  export type student_documentsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: student_documentsWhereInput | student_documentsWhereInput[]
    OR?: student_documentsWhereInput[]
    NOT?: student_documentsWhereInput | student_documentsWhereInput[]
    studentProfileId?: StringFilter<"student_documents"> | string
    documentName?: StringFilter<"student_documents"> | string
    category?: EnumDocumentCategoryFilter<"student_documents"> | $Enums.DocumentCategory
    description?: StringNullableFilter<"student_documents"> | string | null
    fileType?: StringFilter<"student_documents"> | string
    fileSize?: IntFilter<"student_documents"> | number
    cloudinaryPublicId?: StringFilter<"student_documents"> | string
    fileUrl?: StringFilter<"student_documents"> | string
    uploadedAt?: DateTimeFilter<"student_documents"> | Date | string
    updatedAt?: DateTimeFilter<"student_documents"> | Date | string
    resourceType?: StringFilter<"student_documents"> | string
    student_profiles?: XOR<Student_profilesScalarRelationFilter, student_profilesWhereInput>
  }, "id">

  export type student_documentsOrderByWithAggregationInput = {
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
    _count?: student_documentsCountOrderByAggregateInput
    _avg?: student_documentsAvgOrderByAggregateInput
    _max?: student_documentsMaxOrderByAggregateInput
    _min?: student_documentsMinOrderByAggregateInput
    _sum?: student_documentsSumOrderByAggregateInput
  }

  export type student_documentsScalarWhereWithAggregatesInput = {
    AND?: student_documentsScalarWhereWithAggregatesInput | student_documentsScalarWhereWithAggregatesInput[]
    OR?: student_documentsScalarWhereWithAggregatesInput[]
    NOT?: student_documentsScalarWhereWithAggregatesInput | student_documentsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"student_documents"> | string
    studentProfileId?: StringWithAggregatesFilter<"student_documents"> | string
    documentName?: StringWithAggregatesFilter<"student_documents"> | string
    category?: EnumDocumentCategoryWithAggregatesFilter<"student_documents"> | $Enums.DocumentCategory
    description?: StringNullableWithAggregatesFilter<"student_documents"> | string | null
    fileType?: StringWithAggregatesFilter<"student_documents"> | string
    fileSize?: IntWithAggregatesFilter<"student_documents"> | number
    cloudinaryPublicId?: StringWithAggregatesFilter<"student_documents"> | string
    fileUrl?: StringWithAggregatesFilter<"student_documents"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"student_documents"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"student_documents"> | Date | string
    resourceType?: StringWithAggregatesFilter<"student_documents"> | string
  }

  export type student_parent_detailsWhereInput = {
    AND?: student_parent_detailsWhereInput | student_parent_detailsWhereInput[]
    OR?: student_parent_detailsWhereInput[]
    NOT?: student_parent_detailsWhereInput | student_parent_detailsWhereInput[]
    id?: StringFilter<"student_parent_details"> | string
    studentProfileId?: StringFilter<"student_parent_details"> | string
    fatherName?: StringNullableFilter<"student_parent_details"> | string | null
    fatherOccupation?: StringNullableFilter<"student_parent_details"> | string | null
    fatherCompany?: StringNullableFilter<"student_parent_details"> | string | null
    fatherAnnualIncome?: StringNullableFilter<"student_parent_details"> | string | null
    fatherQualification?: StringNullableFilter<"student_parent_details"> | string | null
    fatherEmail?: StringNullableFilter<"student_parent_details"> | string | null
    fatherPhone?: StringNullableFilter<"student_parent_details"> | string | null
    fatherAddress?: StringNullableFilter<"student_parent_details"> | string | null
    motherName?: StringNullableFilter<"student_parent_details"> | string | null
    motherOccupation?: StringNullableFilter<"student_parent_details"> | string | null
    motherQualification?: StringNullableFilter<"student_parent_details"> | string | null
    motherAnnualIncome?: StringNullableFilter<"student_parent_details"> | string | null
    motherEmail?: StringNullableFilter<"student_parent_details"> | string | null
    motherPhone?: StringNullableFilter<"student_parent_details"> | string | null
    motherAddress?: StringNullableFilter<"student_parent_details"> | string | null
    guardianName?: StringNullableFilter<"student_parent_details"> | string | null
    guardianRelationship?: StringNullableFilter<"student_parent_details"> | string | null
    guardianPhone?: StringNullableFilter<"student_parent_details"> | string | null
    guardianAlternatePhone?: StringNullableFilter<"student_parent_details"> | string | null
    createdAt?: DateTimeFilter<"student_parent_details"> | Date | string
    updatedAt?: DateTimeFilter<"student_parent_details"> | Date | string
    student_profiles?: XOR<Student_profilesScalarRelationFilter, student_profilesWhereInput>
  }

  export type student_parent_detailsOrderByWithRelationInput = {
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
    student_profiles?: student_profilesOrderByWithRelationInput
  }

  export type student_parent_detailsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentProfileId?: string
    AND?: student_parent_detailsWhereInput | student_parent_detailsWhereInput[]
    OR?: student_parent_detailsWhereInput[]
    NOT?: student_parent_detailsWhereInput | student_parent_detailsWhereInput[]
    fatherName?: StringNullableFilter<"student_parent_details"> | string | null
    fatherOccupation?: StringNullableFilter<"student_parent_details"> | string | null
    fatherCompany?: StringNullableFilter<"student_parent_details"> | string | null
    fatherAnnualIncome?: StringNullableFilter<"student_parent_details"> | string | null
    fatherQualification?: StringNullableFilter<"student_parent_details"> | string | null
    fatherEmail?: StringNullableFilter<"student_parent_details"> | string | null
    fatherPhone?: StringNullableFilter<"student_parent_details"> | string | null
    fatherAddress?: StringNullableFilter<"student_parent_details"> | string | null
    motherName?: StringNullableFilter<"student_parent_details"> | string | null
    motherOccupation?: StringNullableFilter<"student_parent_details"> | string | null
    motherQualification?: StringNullableFilter<"student_parent_details"> | string | null
    motherAnnualIncome?: StringNullableFilter<"student_parent_details"> | string | null
    motherEmail?: StringNullableFilter<"student_parent_details"> | string | null
    motherPhone?: StringNullableFilter<"student_parent_details"> | string | null
    motherAddress?: StringNullableFilter<"student_parent_details"> | string | null
    guardianName?: StringNullableFilter<"student_parent_details"> | string | null
    guardianRelationship?: StringNullableFilter<"student_parent_details"> | string | null
    guardianPhone?: StringNullableFilter<"student_parent_details"> | string | null
    guardianAlternatePhone?: StringNullableFilter<"student_parent_details"> | string | null
    createdAt?: DateTimeFilter<"student_parent_details"> | Date | string
    updatedAt?: DateTimeFilter<"student_parent_details"> | Date | string
    student_profiles?: XOR<Student_profilesScalarRelationFilter, student_profilesWhereInput>
  }, "id" | "studentProfileId">

  export type student_parent_detailsOrderByWithAggregationInput = {
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
    _count?: student_parent_detailsCountOrderByAggregateInput
    _max?: student_parent_detailsMaxOrderByAggregateInput
    _min?: student_parent_detailsMinOrderByAggregateInput
  }

  export type student_parent_detailsScalarWhereWithAggregatesInput = {
    AND?: student_parent_detailsScalarWhereWithAggregatesInput | student_parent_detailsScalarWhereWithAggregatesInput[]
    OR?: student_parent_detailsScalarWhereWithAggregatesInput[]
    NOT?: student_parent_detailsScalarWhereWithAggregatesInput | student_parent_detailsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"student_parent_details"> | string
    studentProfileId?: StringWithAggregatesFilter<"student_parent_details"> | string
    fatherName?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    fatherOccupation?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    fatherCompany?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    fatherAnnualIncome?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    fatherQualification?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    fatherEmail?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    fatherPhone?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    fatherAddress?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    motherName?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    motherOccupation?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    motherQualification?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    motherAnnualIncome?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    motherEmail?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    motherPhone?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    motherAddress?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    guardianName?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    guardianRelationship?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    guardianPhone?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    guardianAlternatePhone?: StringNullableWithAggregatesFilter<"student_parent_details"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"student_parent_details"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"student_parent_details"> | Date | string
  }

  export type student_profilesWhereInput = {
    AND?: student_profilesWhereInput | student_profilesWhereInput[]
    OR?: student_profilesWhereInput[]
    NOT?: student_profilesWhereInput | student_profilesWhereInput[]
    id?: StringFilter<"student_profiles"> | string
    userId?: StringFilter<"student_profiles"> | string
    registerNumber?: StringNullableFilter<"student_profiles"> | string | null
    admissionNumber?: StringNullableFilter<"student_profiles"> | string | null
    profileImage?: StringNullableFilter<"student_profiles"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"student_profiles"> | Date | string | null
    gender?: EnumGenderNullableFilter<"student_profiles"> | $Enums.Gender | null
    bloodGroup?: EnumBloodGroupNullableFilter<"student_profiles"> | $Enums.BloodGroup | null
    nationality?: StringNullableFilter<"student_profiles"> | string | null
    religion?: StringNullableFilter<"student_profiles"> | string | null
    department?: StringNullableFilter<"student_profiles"> | string | null
    programme?: StringNullableFilter<"student_profiles"> | string | null
    semester?: StringNullableFilter<"student_profiles"> | string | null
    section?: StringNullableFilter<"student_profiles"> | string | null
    studentType?: EnumStudentTypeNullableFilter<"student_profiles"> | $Enums.StudentType | null
    address?: StringNullableFilter<"student_profiles"> | string | null
    permanentAddress?: StringNullableFilter<"student_profiles"> | string | null
    yearsAtUniversity?: StringNullableFilter<"student_profiles"> | string | null
    totalCredits?: IntNullableFilter<"student_profiles"> | number | null
    currentCGPA?: FloatNullableFilter<"student_profiles"> | number | null
    overallAttendance?: FloatNullableFilter<"student_profiles"> | number | null
    academicStanding?: StringNullableFilter<"student_profiles"> | string | null
    currentMentor?: StringNullableFilter<"student_profiles"> | string | null
    createdAt?: DateTimeFilter<"student_profiles"> | Date | string
    updatedAt?: DateTimeFilter<"student_profiles"> | Date | string
    academicSetupCompleted?: BoolFilter<"student_profiles"> | boolean
    academic_backlogs?: Academic_backlogsListRelationFilter
    academic_semesters?: Academic_semestersListRelationFilter
    student_contact_details?: XOR<Student_contact_detailsNullableScalarRelationFilter, student_contact_detailsWhereInput> | null
    student_documents?: Student_documentsListRelationFilter
    student_parent_details?: XOR<Student_parent_detailsNullableScalarRelationFilter, student_parent_detailsWhereInput> | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type student_profilesOrderByWithRelationInput = {
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
    academic_backlogs?: academic_backlogsOrderByRelationAggregateInput
    academic_semesters?: academic_semestersOrderByRelationAggregateInput
    student_contact_details?: student_contact_detailsOrderByWithRelationInput
    student_documents?: student_documentsOrderByRelationAggregateInput
    student_parent_details?: student_parent_detailsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type student_profilesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    registerNumber?: string
    admissionNumber?: string
    AND?: student_profilesWhereInput | student_profilesWhereInput[]
    OR?: student_profilesWhereInput[]
    NOT?: student_profilesWhereInput | student_profilesWhereInput[]
    profileImage?: StringNullableFilter<"student_profiles"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"student_profiles"> | Date | string | null
    gender?: EnumGenderNullableFilter<"student_profiles"> | $Enums.Gender | null
    bloodGroup?: EnumBloodGroupNullableFilter<"student_profiles"> | $Enums.BloodGroup | null
    nationality?: StringNullableFilter<"student_profiles"> | string | null
    religion?: StringNullableFilter<"student_profiles"> | string | null
    department?: StringNullableFilter<"student_profiles"> | string | null
    programme?: StringNullableFilter<"student_profiles"> | string | null
    semester?: StringNullableFilter<"student_profiles"> | string | null
    section?: StringNullableFilter<"student_profiles"> | string | null
    studentType?: EnumStudentTypeNullableFilter<"student_profiles"> | $Enums.StudentType | null
    address?: StringNullableFilter<"student_profiles"> | string | null
    permanentAddress?: StringNullableFilter<"student_profiles"> | string | null
    yearsAtUniversity?: StringNullableFilter<"student_profiles"> | string | null
    totalCredits?: IntNullableFilter<"student_profiles"> | number | null
    currentCGPA?: FloatNullableFilter<"student_profiles"> | number | null
    overallAttendance?: FloatNullableFilter<"student_profiles"> | number | null
    academicStanding?: StringNullableFilter<"student_profiles"> | string | null
    currentMentor?: StringNullableFilter<"student_profiles"> | string | null
    createdAt?: DateTimeFilter<"student_profiles"> | Date | string
    updatedAt?: DateTimeFilter<"student_profiles"> | Date | string
    academicSetupCompleted?: BoolFilter<"student_profiles"> | boolean
    academic_backlogs?: Academic_backlogsListRelationFilter
    academic_semesters?: Academic_semestersListRelationFilter
    student_contact_details?: XOR<Student_contact_detailsNullableScalarRelationFilter, student_contact_detailsWhereInput> | null
    student_documents?: Student_documentsListRelationFilter
    student_parent_details?: XOR<Student_parent_detailsNullableScalarRelationFilter, student_parent_detailsWhereInput> | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "userId" | "registerNumber" | "admissionNumber">

  export type student_profilesOrderByWithAggregationInput = {
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
    _count?: student_profilesCountOrderByAggregateInput
    _avg?: student_profilesAvgOrderByAggregateInput
    _max?: student_profilesMaxOrderByAggregateInput
    _min?: student_profilesMinOrderByAggregateInput
    _sum?: student_profilesSumOrderByAggregateInput
  }

  export type student_profilesScalarWhereWithAggregatesInput = {
    AND?: student_profilesScalarWhereWithAggregatesInput | student_profilesScalarWhereWithAggregatesInput[]
    OR?: student_profilesScalarWhereWithAggregatesInput[]
    NOT?: student_profilesScalarWhereWithAggregatesInput | student_profilesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"student_profiles"> | string
    userId?: StringWithAggregatesFilter<"student_profiles"> | string
    registerNumber?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    admissionNumber?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    profileImage?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"student_profiles"> | Date | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"student_profiles"> | $Enums.Gender | null
    bloodGroup?: EnumBloodGroupNullableWithAggregatesFilter<"student_profiles"> | $Enums.BloodGroup | null
    nationality?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    religion?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    department?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    programme?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    semester?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    section?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    studentType?: EnumStudentTypeNullableWithAggregatesFilter<"student_profiles"> | $Enums.StudentType | null
    address?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    permanentAddress?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    yearsAtUniversity?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    totalCredits?: IntNullableWithAggregatesFilter<"student_profiles"> | number | null
    currentCGPA?: FloatNullableWithAggregatesFilter<"student_profiles"> | number | null
    overallAttendance?: FloatNullableWithAggregatesFilter<"student_profiles"> | number | null
    academicStanding?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    currentMentor?: StringNullableWithAggregatesFilter<"student_profiles"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"student_profiles"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"student_profiles"> | Date | string
    academicSetupCompleted?: BoolWithAggregatesFilter<"student_profiles"> | boolean
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    fullName?: StringFilter<"users"> | string
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: EnumRoleFilter<"users"> | $Enums.Role
    isActive?: BoolFilter<"users"> | boolean
    lastLogin?: DateTimeNullableFilter<"users"> | Date | string | null
    createdAt?: DateTimeFilter<"users"> | Date | string
    updatedAt?: DateTimeFilter<"users"> | Date | string
    student_profiles?: XOR<Student_profilesNullableScalarRelationFilter, student_profilesWhereInput> | null
  }

  export type usersOrderByWithRelationInput = {
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
    student_profiles?: student_profilesOrderByWithRelationInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    fullName?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: EnumRoleFilter<"users"> | $Enums.Role
    isActive?: BoolFilter<"users"> | boolean
    lastLogin?: DateTimeNullableFilter<"users"> | Date | string | null
    createdAt?: DateTimeFilter<"users"> | Date | string
    updatedAt?: DateTimeFilter<"users"> | Date | string
    student_profiles?: XOR<Student_profilesNullableScalarRelationFilter, student_profilesWhereInput> | null
  }, "id" | "username" | "email">

  export type usersOrderByWithAggregationInput = {
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
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    fullName?: StringWithAggregatesFilter<"users"> | string
    username?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    role?: EnumRoleWithAggregatesFilter<"users"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"users"> | boolean
    lastLogin?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type academic_backlogsCreateInput = {
    id: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status?: $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: number | null
    clearedGrade?: string | null
    clearedMarks?: number | null
    clearedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    student_profiles: student_profilesCreateNestedOneWithoutAcademic_backlogsInput
  }

  export type academic_backlogsUncheckedCreateInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type academic_backlogsUpdateInput = {
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
    student_profiles?: student_profilesUpdateOneRequiredWithoutAcademic_backlogsNestedInput
  }

  export type academic_backlogsUncheckedUpdateInput = {
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

  export type academic_backlogsCreateManyInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type academic_backlogsUpdateManyMutationInput = {
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

  export type academic_backlogsUncheckedUpdateManyInput = {
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

  export type academic_semestersCreateInput = {
    id: string
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
    updatedAt: Date | string
    student_profiles: student_profilesCreateNestedOneWithoutAcademic_semestersInput
    academic_subjects?: academic_subjectsCreateNestedManyWithoutAcademic_semestersInput
  }

  export type academic_semestersUncheckedCreateInput = {
    id: string
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
    updatedAt: Date | string
    academic_subjects?: academic_subjectsUncheckedCreateNestedManyWithoutAcademic_semestersInput
  }

  export type academic_semestersUpdateInput = {
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
    student_profiles?: student_profilesUpdateOneRequiredWithoutAcademic_semestersNestedInput
    academic_subjects?: academic_subjectsUpdateManyWithoutAcademic_semestersNestedInput
  }

  export type academic_semestersUncheckedUpdateInput = {
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
    academic_subjects?: academic_subjectsUncheckedUpdateManyWithoutAcademic_semestersNestedInput
  }

  export type academic_semestersCreateManyInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type academic_semestersUpdateManyMutationInput = {
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

  export type academic_semestersUncheckedUpdateManyInput = {
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

  export type academic_subjectsCreateInput = {
    id: string
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
    updatedAt: Date | string
    classesAttended?: number
    classesHeld?: number
    academic_semesters: academic_semestersCreateNestedOneWithoutAcademic_subjectsInput
  }

  export type academic_subjectsUncheckedCreateInput = {
    id: string
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
    updatedAt: Date | string
    classesAttended?: number
    classesHeld?: number
  }

  export type academic_subjectsUpdateInput = {
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
    academic_semesters?: academic_semestersUpdateOneRequiredWithoutAcademic_subjectsNestedInput
  }

  export type academic_subjectsUncheckedUpdateInput = {
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

  export type academic_subjectsCreateManyInput = {
    id: string
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
    updatedAt: Date | string
    classesAttended?: number
    classesHeld?: number
  }

  export type academic_subjectsUpdateManyMutationInput = {
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

  export type academic_subjectsUncheckedUpdateManyInput = {
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

  export type student_contact_detailsCreateInput = {
    id: string
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
    updatedAt: Date | string
    student_profiles: student_profilesCreateNestedOneWithoutStudent_contact_detailsInput
  }

  export type student_contact_detailsUncheckedCreateInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type student_contact_detailsUpdateInput = {
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
    student_profiles?: student_profilesUpdateOneRequiredWithoutStudent_contact_detailsNestedInput
  }

  export type student_contact_detailsUncheckedUpdateInput = {
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

  export type student_contact_detailsCreateManyInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type student_contact_detailsUpdateManyMutationInput = {
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

  export type student_contact_detailsUncheckedUpdateManyInput = {
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

  export type student_documentsCreateInput = {
    id: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt: Date | string
    resourceType: string
    student_profiles: student_profilesCreateNestedOneWithoutStudent_documentsInput
  }

  export type student_documentsUncheckedCreateInput = {
    id: string
    studentProfileId: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt: Date | string
    resourceType: string
  }

  export type student_documentsUpdateInput = {
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
    student_profiles?: student_profilesUpdateOneRequiredWithoutStudent_documentsNestedInput
  }

  export type student_documentsUncheckedUpdateInput = {
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

  export type student_documentsCreateManyInput = {
    id: string
    studentProfileId: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt: Date | string
    resourceType: string
  }

  export type student_documentsUpdateManyMutationInput = {
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

  export type student_documentsUncheckedUpdateManyInput = {
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

  export type student_parent_detailsCreateInput = {
    id: string
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
    updatedAt: Date | string
    student_profiles: student_profilesCreateNestedOneWithoutStudent_parent_detailsInput
  }

  export type student_parent_detailsUncheckedCreateInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type student_parent_detailsUpdateInput = {
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
    student_profiles?: student_profilesUpdateOneRequiredWithoutStudent_parent_detailsNestedInput
  }

  export type student_parent_detailsUncheckedUpdateInput = {
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

  export type student_parent_detailsCreateManyInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type student_parent_detailsUpdateManyMutationInput = {
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

  export type student_parent_detailsUncheckedUpdateManyInput = {
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

  export type student_profilesCreateInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsCreateNestedManyWithoutStudent_profilesInput
    academic_semesters?: academic_semestersCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsCreateNestedOneWithoutStudent_profilesInput
    student_documents?: student_documentsCreateNestedManyWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsCreateNestedOneWithoutStudent_profilesInput
    users: usersCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesUncheckedCreateInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsUncheckedCreateNestedManyWithoutStudent_profilesInput
    academic_semesters?: academic_semestersUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
    student_documents?: student_documentsUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesUpdateInput = {
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
    academic_backlogs?: academic_backlogsUpdateManyWithoutStudent_profilesNestedInput
    academic_semesters?: academic_semestersUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUpdateOneWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUpdateManyWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUpdateOneWithoutStudent_profilesNestedInput
    users?: usersUpdateOneRequiredWithoutStudent_profilesNestedInput
  }

  export type student_profilesUncheckedUpdateInput = {
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
    academic_backlogs?: academic_backlogsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    academic_semesters?: academic_semestersUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
  }

  export type student_profilesCreateManyInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
  }

  export type student_profilesUpdateManyMutationInput = {
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

  export type student_profilesUncheckedUpdateManyInput = {
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

  export type usersCreateInput = {
    id: string
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    student_profiles?: student_profilesCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id: string
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    student_profiles?: student_profilesUncheckedCreateNestedOneWithoutUsersInput
  }

  export type usersUpdateInput = {
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
    student_profiles?: student_profilesUpdateOneWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
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
    student_profiles?: student_profilesUncheckedUpdateOneWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id: string
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type usersUpdateManyMutationInput = {
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

  export type usersUncheckedUpdateManyInput = {
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

  export type EnumAcademicBacklogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicBacklogStatus | EnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel> | $Enums.AcademicBacklogStatus
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

  export type Student_profilesScalarRelationFilter = {
    is?: student_profilesWhereInput
    isNot?: student_profilesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type academic_backlogsCountOrderByAggregateInput = {
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

  export type academic_backlogsAvgOrderByAggregateInput = {
    semesterNumber?: SortOrder
    clearedSemesterNumber?: SortOrder
    clearedMarks?: SortOrder
  }

  export type academic_backlogsMaxOrderByAggregateInput = {
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

  export type academic_backlogsMinOrderByAggregateInput = {
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

  export type academic_backlogsSumOrderByAggregateInput = {
    semesterNumber?: SortOrder
    clearedSemesterNumber?: SortOrder
    clearedMarks?: SortOrder
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

  export type EnumAcademicBacklogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicBacklogStatus | EnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicBacklogStatusWithAggregatesFilter<$PrismaModel> | $Enums.AcademicBacklogStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel>
    _max?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel>
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

  export type Academic_subjectsListRelationFilter = {
    every?: academic_subjectsWhereInput
    some?: academic_subjectsWhereInput
    none?: academic_subjectsWhereInput
  }

  export type academic_subjectsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type academic_semestersStudentProfileIdSemesterNumberCompoundUniqueInput = {
    studentProfileId: string
    semesterNumber: number
  }

  export type academic_semestersCountOrderByAggregateInput = {
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

  export type academic_semestersAvgOrderByAggregateInput = {
    semesterNumber?: SortOrder
    sgpa?: SortOrder
    totalCredits?: SortOrder
    creditsEarned?: SortOrder
    backlogs?: SortOrder
  }

  export type academic_semestersMaxOrderByAggregateInput = {
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

  export type academic_semestersMinOrderByAggregateInput = {
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

  export type academic_semestersSumOrderByAggregateInput = {
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

  export type Academic_semestersScalarRelationFilter = {
    is?: academic_semestersWhereInput
    isNot?: academic_semestersWhereInput
  }

  export type academic_subjectsCountOrderByAggregateInput = {
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

  export type academic_subjectsAvgOrderByAggregateInput = {
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

  export type academic_subjectsMaxOrderByAggregateInput = {
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

  export type academic_subjectsMinOrderByAggregateInput = {
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

  export type academic_subjectsSumOrderByAggregateInput = {
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type student_contact_detailsCountOrderByAggregateInput = {
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

  export type student_contact_detailsMaxOrderByAggregateInput = {
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

  export type student_contact_detailsMinOrderByAggregateInput = {
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumDocumentCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentCategory | EnumDocumentCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentCategory[] | ListEnumDocumentCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentCategory[] | ListEnumDocumentCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentCategoryFilter<$PrismaModel> | $Enums.DocumentCategory
  }

  export type student_documentsCountOrderByAggregateInput = {
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

  export type student_documentsAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type student_documentsMaxOrderByAggregateInput = {
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

  export type student_documentsMinOrderByAggregateInput = {
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

  export type student_documentsSumOrderByAggregateInput = {
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

  export type student_parent_detailsCountOrderByAggregateInput = {
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

  export type student_parent_detailsMaxOrderByAggregateInput = {
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

  export type student_parent_detailsMinOrderByAggregateInput = {
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

  export type Academic_backlogsListRelationFilter = {
    every?: academic_backlogsWhereInput
    some?: academic_backlogsWhereInput
    none?: academic_backlogsWhereInput
  }

  export type Academic_semestersListRelationFilter = {
    every?: academic_semestersWhereInput
    some?: academic_semestersWhereInput
    none?: academic_semestersWhereInput
  }

  export type Student_contact_detailsNullableScalarRelationFilter = {
    is?: student_contact_detailsWhereInput | null
    isNot?: student_contact_detailsWhereInput | null
  }

  export type Student_documentsListRelationFilter = {
    every?: student_documentsWhereInput
    some?: student_documentsWhereInput
    none?: student_documentsWhereInput
  }

  export type Student_parent_detailsNullableScalarRelationFilter = {
    is?: student_parent_detailsWhereInput | null
    isNot?: student_parent_detailsWhereInput | null
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type academic_backlogsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type academic_semestersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type student_documentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type student_profilesCountOrderByAggregateInput = {
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

  export type student_profilesAvgOrderByAggregateInput = {
    totalCredits?: SortOrder
    currentCGPA?: SortOrder
    overallAttendance?: SortOrder
  }

  export type student_profilesMaxOrderByAggregateInput = {
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

  export type student_profilesMinOrderByAggregateInput = {
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

  export type student_profilesSumOrderByAggregateInput = {
    totalCredits?: SortOrder
    currentCGPA?: SortOrder
    overallAttendance?: SortOrder
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type Student_profilesNullableScalarRelationFilter = {
    is?: student_profilesWhereInput | null
    isNot?: student_profilesWhereInput | null
  }

  export type usersCountOrderByAggregateInput = {
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

  export type usersMaxOrderByAggregateInput = {
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

  export type usersMinOrderByAggregateInput = {
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type student_profilesCreateNestedOneWithoutAcademic_backlogsInput = {
    create?: XOR<student_profilesCreateWithoutAcademic_backlogsInput, student_profilesUncheckedCreateWithoutAcademic_backlogsInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutAcademic_backlogsInput
    connect?: student_profilesWhereUniqueInput
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

  export type EnumAcademicBacklogStatusFieldUpdateOperationsInput = {
    set?: $Enums.AcademicBacklogStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type student_profilesUpdateOneRequiredWithoutAcademic_backlogsNestedInput = {
    create?: XOR<student_profilesCreateWithoutAcademic_backlogsInput, student_profilesUncheckedCreateWithoutAcademic_backlogsInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutAcademic_backlogsInput
    upsert?: student_profilesUpsertWithoutAcademic_backlogsInput
    connect?: student_profilesWhereUniqueInput
    update?: XOR<XOR<student_profilesUpdateToOneWithWhereWithoutAcademic_backlogsInput, student_profilesUpdateWithoutAcademic_backlogsInput>, student_profilesUncheckedUpdateWithoutAcademic_backlogsInput>
  }

  export type student_profilesCreateNestedOneWithoutAcademic_semestersInput = {
    create?: XOR<student_profilesCreateWithoutAcademic_semestersInput, student_profilesUncheckedCreateWithoutAcademic_semestersInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutAcademic_semestersInput
    connect?: student_profilesWhereUniqueInput
  }

  export type academic_subjectsCreateNestedManyWithoutAcademic_semestersInput = {
    create?: XOR<academic_subjectsCreateWithoutAcademic_semestersInput, academic_subjectsUncheckedCreateWithoutAcademic_semestersInput> | academic_subjectsCreateWithoutAcademic_semestersInput[] | academic_subjectsUncheckedCreateWithoutAcademic_semestersInput[]
    connectOrCreate?: academic_subjectsCreateOrConnectWithoutAcademic_semestersInput | academic_subjectsCreateOrConnectWithoutAcademic_semestersInput[]
    createMany?: academic_subjectsCreateManyAcademic_semestersInputEnvelope
    connect?: academic_subjectsWhereUniqueInput | academic_subjectsWhereUniqueInput[]
  }

  export type academic_subjectsUncheckedCreateNestedManyWithoutAcademic_semestersInput = {
    create?: XOR<academic_subjectsCreateWithoutAcademic_semestersInput, academic_subjectsUncheckedCreateWithoutAcademic_semestersInput> | academic_subjectsCreateWithoutAcademic_semestersInput[] | academic_subjectsUncheckedCreateWithoutAcademic_semestersInput[]
    connectOrCreate?: academic_subjectsCreateOrConnectWithoutAcademic_semestersInput | academic_subjectsCreateOrConnectWithoutAcademic_semestersInput[]
    createMany?: academic_subjectsCreateManyAcademic_semestersInputEnvelope
    connect?: academic_subjectsWhereUniqueInput | academic_subjectsWhereUniqueInput[]
  }

  export type EnumAcademicSemesterStatusFieldUpdateOperationsInput = {
    set?: $Enums.AcademicSemesterStatus
  }

  export type EnumAcademicEntryStatusFieldUpdateOperationsInput = {
    set?: $Enums.AcademicEntryStatus
  }

  export type student_profilesUpdateOneRequiredWithoutAcademic_semestersNestedInput = {
    create?: XOR<student_profilesCreateWithoutAcademic_semestersInput, student_profilesUncheckedCreateWithoutAcademic_semestersInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutAcademic_semestersInput
    upsert?: student_profilesUpsertWithoutAcademic_semestersInput
    connect?: student_profilesWhereUniqueInput
    update?: XOR<XOR<student_profilesUpdateToOneWithWhereWithoutAcademic_semestersInput, student_profilesUpdateWithoutAcademic_semestersInput>, student_profilesUncheckedUpdateWithoutAcademic_semestersInput>
  }

  export type academic_subjectsUpdateManyWithoutAcademic_semestersNestedInput = {
    create?: XOR<academic_subjectsCreateWithoutAcademic_semestersInput, academic_subjectsUncheckedCreateWithoutAcademic_semestersInput> | academic_subjectsCreateWithoutAcademic_semestersInput[] | academic_subjectsUncheckedCreateWithoutAcademic_semestersInput[]
    connectOrCreate?: academic_subjectsCreateOrConnectWithoutAcademic_semestersInput | academic_subjectsCreateOrConnectWithoutAcademic_semestersInput[]
    upsert?: academic_subjectsUpsertWithWhereUniqueWithoutAcademic_semestersInput | academic_subjectsUpsertWithWhereUniqueWithoutAcademic_semestersInput[]
    createMany?: academic_subjectsCreateManyAcademic_semestersInputEnvelope
    set?: academic_subjectsWhereUniqueInput | academic_subjectsWhereUniqueInput[]
    disconnect?: academic_subjectsWhereUniqueInput | academic_subjectsWhereUniqueInput[]
    delete?: academic_subjectsWhereUniqueInput | academic_subjectsWhereUniqueInput[]
    connect?: academic_subjectsWhereUniqueInput | academic_subjectsWhereUniqueInput[]
    update?: academic_subjectsUpdateWithWhereUniqueWithoutAcademic_semestersInput | academic_subjectsUpdateWithWhereUniqueWithoutAcademic_semestersInput[]
    updateMany?: academic_subjectsUpdateManyWithWhereWithoutAcademic_semestersInput | academic_subjectsUpdateManyWithWhereWithoutAcademic_semestersInput[]
    deleteMany?: academic_subjectsScalarWhereInput | academic_subjectsScalarWhereInput[]
  }

  export type academic_subjectsUncheckedUpdateManyWithoutAcademic_semestersNestedInput = {
    create?: XOR<academic_subjectsCreateWithoutAcademic_semestersInput, academic_subjectsUncheckedCreateWithoutAcademic_semestersInput> | academic_subjectsCreateWithoutAcademic_semestersInput[] | academic_subjectsUncheckedCreateWithoutAcademic_semestersInput[]
    connectOrCreate?: academic_subjectsCreateOrConnectWithoutAcademic_semestersInput | academic_subjectsCreateOrConnectWithoutAcademic_semestersInput[]
    upsert?: academic_subjectsUpsertWithWhereUniqueWithoutAcademic_semestersInput | academic_subjectsUpsertWithWhereUniqueWithoutAcademic_semestersInput[]
    createMany?: academic_subjectsCreateManyAcademic_semestersInputEnvelope
    set?: academic_subjectsWhereUniqueInput | academic_subjectsWhereUniqueInput[]
    disconnect?: academic_subjectsWhereUniqueInput | academic_subjectsWhereUniqueInput[]
    delete?: academic_subjectsWhereUniqueInput | academic_subjectsWhereUniqueInput[]
    connect?: academic_subjectsWhereUniqueInput | academic_subjectsWhereUniqueInput[]
    update?: academic_subjectsUpdateWithWhereUniqueWithoutAcademic_semestersInput | academic_subjectsUpdateWithWhereUniqueWithoutAcademic_semestersInput[]
    updateMany?: academic_subjectsUpdateManyWithWhereWithoutAcademic_semestersInput | academic_subjectsUpdateManyWithWhereWithoutAcademic_semestersInput[]
    deleteMany?: academic_subjectsScalarWhereInput | academic_subjectsScalarWhereInput[]
  }

  export type academic_semestersCreateNestedOneWithoutAcademic_subjectsInput = {
    create?: XOR<academic_semestersCreateWithoutAcademic_subjectsInput, academic_semestersUncheckedCreateWithoutAcademic_subjectsInput>
    connectOrCreate?: academic_semestersCreateOrConnectWithoutAcademic_subjectsInput
    connect?: academic_semestersWhereUniqueInput
  }

  export type academic_semestersUpdateOneRequiredWithoutAcademic_subjectsNestedInput = {
    create?: XOR<academic_semestersCreateWithoutAcademic_subjectsInput, academic_semestersUncheckedCreateWithoutAcademic_subjectsInput>
    connectOrCreate?: academic_semestersCreateOrConnectWithoutAcademic_subjectsInput
    upsert?: academic_semestersUpsertWithoutAcademic_subjectsInput
    connect?: academic_semestersWhereUniqueInput
    update?: XOR<XOR<academic_semestersUpdateToOneWithWhereWithoutAcademic_subjectsInput, academic_semestersUpdateWithoutAcademic_subjectsInput>, academic_semestersUncheckedUpdateWithoutAcademic_subjectsInput>
  }

  export type student_profilesCreateNestedOneWithoutStudent_contact_detailsInput = {
    create?: XOR<student_profilesCreateWithoutStudent_contact_detailsInput, student_profilesUncheckedCreateWithoutStudent_contact_detailsInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutStudent_contact_detailsInput
    connect?: student_profilesWhereUniqueInput
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

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type student_profilesUpdateOneRequiredWithoutStudent_contact_detailsNestedInput = {
    create?: XOR<student_profilesCreateWithoutStudent_contact_detailsInput, student_profilesUncheckedCreateWithoutStudent_contact_detailsInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutStudent_contact_detailsInput
    upsert?: student_profilesUpsertWithoutStudent_contact_detailsInput
    connect?: student_profilesWhereUniqueInput
    update?: XOR<XOR<student_profilesUpdateToOneWithWhereWithoutStudent_contact_detailsInput, student_profilesUpdateWithoutStudent_contact_detailsInput>, student_profilesUncheckedUpdateWithoutStudent_contact_detailsInput>
  }

  export type student_profilesCreateNestedOneWithoutStudent_documentsInput = {
    create?: XOR<student_profilesCreateWithoutStudent_documentsInput, student_profilesUncheckedCreateWithoutStudent_documentsInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutStudent_documentsInput
    connect?: student_profilesWhereUniqueInput
  }

  export type EnumDocumentCategoryFieldUpdateOperationsInput = {
    set?: $Enums.DocumentCategory
  }

  export type student_profilesUpdateOneRequiredWithoutStudent_documentsNestedInput = {
    create?: XOR<student_profilesCreateWithoutStudent_documentsInput, student_profilesUncheckedCreateWithoutStudent_documentsInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutStudent_documentsInput
    upsert?: student_profilesUpsertWithoutStudent_documentsInput
    connect?: student_profilesWhereUniqueInput
    update?: XOR<XOR<student_profilesUpdateToOneWithWhereWithoutStudent_documentsInput, student_profilesUpdateWithoutStudent_documentsInput>, student_profilesUncheckedUpdateWithoutStudent_documentsInput>
  }

  export type student_profilesCreateNestedOneWithoutStudent_parent_detailsInput = {
    create?: XOR<student_profilesCreateWithoutStudent_parent_detailsInput, student_profilesUncheckedCreateWithoutStudent_parent_detailsInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutStudent_parent_detailsInput
    connect?: student_profilesWhereUniqueInput
  }

  export type student_profilesUpdateOneRequiredWithoutStudent_parent_detailsNestedInput = {
    create?: XOR<student_profilesCreateWithoutStudent_parent_detailsInput, student_profilesUncheckedCreateWithoutStudent_parent_detailsInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutStudent_parent_detailsInput
    upsert?: student_profilesUpsertWithoutStudent_parent_detailsInput
    connect?: student_profilesWhereUniqueInput
    update?: XOR<XOR<student_profilesUpdateToOneWithWhereWithoutStudent_parent_detailsInput, student_profilesUpdateWithoutStudent_parent_detailsInput>, student_profilesUncheckedUpdateWithoutStudent_parent_detailsInput>
  }

  export type academic_backlogsCreateNestedManyWithoutStudent_profilesInput = {
    create?: XOR<academic_backlogsCreateWithoutStudent_profilesInput, academic_backlogsUncheckedCreateWithoutStudent_profilesInput> | academic_backlogsCreateWithoutStudent_profilesInput[] | academic_backlogsUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: academic_backlogsCreateOrConnectWithoutStudent_profilesInput | academic_backlogsCreateOrConnectWithoutStudent_profilesInput[]
    createMany?: academic_backlogsCreateManyStudent_profilesInputEnvelope
    connect?: academic_backlogsWhereUniqueInput | academic_backlogsWhereUniqueInput[]
  }

  export type academic_semestersCreateNestedManyWithoutStudent_profilesInput = {
    create?: XOR<academic_semestersCreateWithoutStudent_profilesInput, academic_semestersUncheckedCreateWithoutStudent_profilesInput> | academic_semestersCreateWithoutStudent_profilesInput[] | academic_semestersUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: academic_semestersCreateOrConnectWithoutStudent_profilesInput | academic_semestersCreateOrConnectWithoutStudent_profilesInput[]
    createMany?: academic_semestersCreateManyStudent_profilesInputEnvelope
    connect?: academic_semestersWhereUniqueInput | academic_semestersWhereUniqueInput[]
  }

  export type student_contact_detailsCreateNestedOneWithoutStudent_profilesInput = {
    create?: XOR<student_contact_detailsCreateWithoutStudent_profilesInput, student_contact_detailsUncheckedCreateWithoutStudent_profilesInput>
    connectOrCreate?: student_contact_detailsCreateOrConnectWithoutStudent_profilesInput
    connect?: student_contact_detailsWhereUniqueInput
  }

  export type student_documentsCreateNestedManyWithoutStudent_profilesInput = {
    create?: XOR<student_documentsCreateWithoutStudent_profilesInput, student_documentsUncheckedCreateWithoutStudent_profilesInput> | student_documentsCreateWithoutStudent_profilesInput[] | student_documentsUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: student_documentsCreateOrConnectWithoutStudent_profilesInput | student_documentsCreateOrConnectWithoutStudent_profilesInput[]
    createMany?: student_documentsCreateManyStudent_profilesInputEnvelope
    connect?: student_documentsWhereUniqueInput | student_documentsWhereUniqueInput[]
  }

  export type student_parent_detailsCreateNestedOneWithoutStudent_profilesInput = {
    create?: XOR<student_parent_detailsCreateWithoutStudent_profilesInput, student_parent_detailsUncheckedCreateWithoutStudent_profilesInput>
    connectOrCreate?: student_parent_detailsCreateOrConnectWithoutStudent_profilesInput
    connect?: student_parent_detailsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutStudent_profilesInput = {
    create?: XOR<usersCreateWithoutStudent_profilesInput, usersUncheckedCreateWithoutStudent_profilesInput>
    connectOrCreate?: usersCreateOrConnectWithoutStudent_profilesInput
    connect?: usersWhereUniqueInput
  }

  export type academic_backlogsUncheckedCreateNestedManyWithoutStudent_profilesInput = {
    create?: XOR<academic_backlogsCreateWithoutStudent_profilesInput, academic_backlogsUncheckedCreateWithoutStudent_profilesInput> | academic_backlogsCreateWithoutStudent_profilesInput[] | academic_backlogsUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: academic_backlogsCreateOrConnectWithoutStudent_profilesInput | academic_backlogsCreateOrConnectWithoutStudent_profilesInput[]
    createMany?: academic_backlogsCreateManyStudent_profilesInputEnvelope
    connect?: academic_backlogsWhereUniqueInput | academic_backlogsWhereUniqueInput[]
  }

  export type academic_semestersUncheckedCreateNestedManyWithoutStudent_profilesInput = {
    create?: XOR<academic_semestersCreateWithoutStudent_profilesInput, academic_semestersUncheckedCreateWithoutStudent_profilesInput> | academic_semestersCreateWithoutStudent_profilesInput[] | academic_semestersUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: academic_semestersCreateOrConnectWithoutStudent_profilesInput | academic_semestersCreateOrConnectWithoutStudent_profilesInput[]
    createMany?: academic_semestersCreateManyStudent_profilesInputEnvelope
    connect?: academic_semestersWhereUniqueInput | academic_semestersWhereUniqueInput[]
  }

  export type student_contact_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput = {
    create?: XOR<student_contact_detailsCreateWithoutStudent_profilesInput, student_contact_detailsUncheckedCreateWithoutStudent_profilesInput>
    connectOrCreate?: student_contact_detailsCreateOrConnectWithoutStudent_profilesInput
    connect?: student_contact_detailsWhereUniqueInput
  }

  export type student_documentsUncheckedCreateNestedManyWithoutStudent_profilesInput = {
    create?: XOR<student_documentsCreateWithoutStudent_profilesInput, student_documentsUncheckedCreateWithoutStudent_profilesInput> | student_documentsCreateWithoutStudent_profilesInput[] | student_documentsUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: student_documentsCreateOrConnectWithoutStudent_profilesInput | student_documentsCreateOrConnectWithoutStudent_profilesInput[]
    createMany?: student_documentsCreateManyStudent_profilesInputEnvelope
    connect?: student_documentsWhereUniqueInput | student_documentsWhereUniqueInput[]
  }

  export type student_parent_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput = {
    create?: XOR<student_parent_detailsCreateWithoutStudent_profilesInput, student_parent_detailsUncheckedCreateWithoutStudent_profilesInput>
    connectOrCreate?: student_parent_detailsCreateOrConnectWithoutStudent_profilesInput
    connect?: student_parent_detailsWhereUniqueInput
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

  export type academic_backlogsUpdateManyWithoutStudent_profilesNestedInput = {
    create?: XOR<academic_backlogsCreateWithoutStudent_profilesInput, academic_backlogsUncheckedCreateWithoutStudent_profilesInput> | academic_backlogsCreateWithoutStudent_profilesInput[] | academic_backlogsUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: academic_backlogsCreateOrConnectWithoutStudent_profilesInput | academic_backlogsCreateOrConnectWithoutStudent_profilesInput[]
    upsert?: academic_backlogsUpsertWithWhereUniqueWithoutStudent_profilesInput | academic_backlogsUpsertWithWhereUniqueWithoutStudent_profilesInput[]
    createMany?: academic_backlogsCreateManyStudent_profilesInputEnvelope
    set?: academic_backlogsWhereUniqueInput | academic_backlogsWhereUniqueInput[]
    disconnect?: academic_backlogsWhereUniqueInput | academic_backlogsWhereUniqueInput[]
    delete?: academic_backlogsWhereUniqueInput | academic_backlogsWhereUniqueInput[]
    connect?: academic_backlogsWhereUniqueInput | academic_backlogsWhereUniqueInput[]
    update?: academic_backlogsUpdateWithWhereUniqueWithoutStudent_profilesInput | academic_backlogsUpdateWithWhereUniqueWithoutStudent_profilesInput[]
    updateMany?: academic_backlogsUpdateManyWithWhereWithoutStudent_profilesInput | academic_backlogsUpdateManyWithWhereWithoutStudent_profilesInput[]
    deleteMany?: academic_backlogsScalarWhereInput | academic_backlogsScalarWhereInput[]
  }

  export type academic_semestersUpdateManyWithoutStudent_profilesNestedInput = {
    create?: XOR<academic_semestersCreateWithoutStudent_profilesInput, academic_semestersUncheckedCreateWithoutStudent_profilesInput> | academic_semestersCreateWithoutStudent_profilesInput[] | academic_semestersUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: academic_semestersCreateOrConnectWithoutStudent_profilesInput | academic_semestersCreateOrConnectWithoutStudent_profilesInput[]
    upsert?: academic_semestersUpsertWithWhereUniqueWithoutStudent_profilesInput | academic_semestersUpsertWithWhereUniqueWithoutStudent_profilesInput[]
    createMany?: academic_semestersCreateManyStudent_profilesInputEnvelope
    set?: academic_semestersWhereUniqueInput | academic_semestersWhereUniqueInput[]
    disconnect?: academic_semestersWhereUniqueInput | academic_semestersWhereUniqueInput[]
    delete?: academic_semestersWhereUniqueInput | academic_semestersWhereUniqueInput[]
    connect?: academic_semestersWhereUniqueInput | academic_semestersWhereUniqueInput[]
    update?: academic_semestersUpdateWithWhereUniqueWithoutStudent_profilesInput | academic_semestersUpdateWithWhereUniqueWithoutStudent_profilesInput[]
    updateMany?: academic_semestersUpdateManyWithWhereWithoutStudent_profilesInput | academic_semestersUpdateManyWithWhereWithoutStudent_profilesInput[]
    deleteMany?: academic_semestersScalarWhereInput | academic_semestersScalarWhereInput[]
  }

  export type student_contact_detailsUpdateOneWithoutStudent_profilesNestedInput = {
    create?: XOR<student_contact_detailsCreateWithoutStudent_profilesInput, student_contact_detailsUncheckedCreateWithoutStudent_profilesInput>
    connectOrCreate?: student_contact_detailsCreateOrConnectWithoutStudent_profilesInput
    upsert?: student_contact_detailsUpsertWithoutStudent_profilesInput
    disconnect?: student_contact_detailsWhereInput | boolean
    delete?: student_contact_detailsWhereInput | boolean
    connect?: student_contact_detailsWhereUniqueInput
    update?: XOR<XOR<student_contact_detailsUpdateToOneWithWhereWithoutStudent_profilesInput, student_contact_detailsUpdateWithoutStudent_profilesInput>, student_contact_detailsUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type student_documentsUpdateManyWithoutStudent_profilesNestedInput = {
    create?: XOR<student_documentsCreateWithoutStudent_profilesInput, student_documentsUncheckedCreateWithoutStudent_profilesInput> | student_documentsCreateWithoutStudent_profilesInput[] | student_documentsUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: student_documentsCreateOrConnectWithoutStudent_profilesInput | student_documentsCreateOrConnectWithoutStudent_profilesInput[]
    upsert?: student_documentsUpsertWithWhereUniqueWithoutStudent_profilesInput | student_documentsUpsertWithWhereUniqueWithoutStudent_profilesInput[]
    createMany?: student_documentsCreateManyStudent_profilesInputEnvelope
    set?: student_documentsWhereUniqueInput | student_documentsWhereUniqueInput[]
    disconnect?: student_documentsWhereUniqueInput | student_documentsWhereUniqueInput[]
    delete?: student_documentsWhereUniqueInput | student_documentsWhereUniqueInput[]
    connect?: student_documentsWhereUniqueInput | student_documentsWhereUniqueInput[]
    update?: student_documentsUpdateWithWhereUniqueWithoutStudent_profilesInput | student_documentsUpdateWithWhereUniqueWithoutStudent_profilesInput[]
    updateMany?: student_documentsUpdateManyWithWhereWithoutStudent_profilesInput | student_documentsUpdateManyWithWhereWithoutStudent_profilesInput[]
    deleteMany?: student_documentsScalarWhereInput | student_documentsScalarWhereInput[]
  }

  export type student_parent_detailsUpdateOneWithoutStudent_profilesNestedInput = {
    create?: XOR<student_parent_detailsCreateWithoutStudent_profilesInput, student_parent_detailsUncheckedCreateWithoutStudent_profilesInput>
    connectOrCreate?: student_parent_detailsCreateOrConnectWithoutStudent_profilesInput
    upsert?: student_parent_detailsUpsertWithoutStudent_profilesInput
    disconnect?: student_parent_detailsWhereInput | boolean
    delete?: student_parent_detailsWhereInput | boolean
    connect?: student_parent_detailsWhereUniqueInput
    update?: XOR<XOR<student_parent_detailsUpdateToOneWithWhereWithoutStudent_profilesInput, student_parent_detailsUpdateWithoutStudent_profilesInput>, student_parent_detailsUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type usersUpdateOneRequiredWithoutStudent_profilesNestedInput = {
    create?: XOR<usersCreateWithoutStudent_profilesInput, usersUncheckedCreateWithoutStudent_profilesInput>
    connectOrCreate?: usersCreateOrConnectWithoutStudent_profilesInput
    upsert?: usersUpsertWithoutStudent_profilesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutStudent_profilesInput, usersUpdateWithoutStudent_profilesInput>, usersUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type academic_backlogsUncheckedUpdateManyWithoutStudent_profilesNestedInput = {
    create?: XOR<academic_backlogsCreateWithoutStudent_profilesInput, academic_backlogsUncheckedCreateWithoutStudent_profilesInput> | academic_backlogsCreateWithoutStudent_profilesInput[] | academic_backlogsUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: academic_backlogsCreateOrConnectWithoutStudent_profilesInput | academic_backlogsCreateOrConnectWithoutStudent_profilesInput[]
    upsert?: academic_backlogsUpsertWithWhereUniqueWithoutStudent_profilesInput | academic_backlogsUpsertWithWhereUniqueWithoutStudent_profilesInput[]
    createMany?: academic_backlogsCreateManyStudent_profilesInputEnvelope
    set?: academic_backlogsWhereUniqueInput | academic_backlogsWhereUniqueInput[]
    disconnect?: academic_backlogsWhereUniqueInput | academic_backlogsWhereUniqueInput[]
    delete?: academic_backlogsWhereUniqueInput | academic_backlogsWhereUniqueInput[]
    connect?: academic_backlogsWhereUniqueInput | academic_backlogsWhereUniqueInput[]
    update?: academic_backlogsUpdateWithWhereUniqueWithoutStudent_profilesInput | academic_backlogsUpdateWithWhereUniqueWithoutStudent_profilesInput[]
    updateMany?: academic_backlogsUpdateManyWithWhereWithoutStudent_profilesInput | academic_backlogsUpdateManyWithWhereWithoutStudent_profilesInput[]
    deleteMany?: academic_backlogsScalarWhereInput | academic_backlogsScalarWhereInput[]
  }

  export type academic_semestersUncheckedUpdateManyWithoutStudent_profilesNestedInput = {
    create?: XOR<academic_semestersCreateWithoutStudent_profilesInput, academic_semestersUncheckedCreateWithoutStudent_profilesInput> | academic_semestersCreateWithoutStudent_profilesInput[] | academic_semestersUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: academic_semestersCreateOrConnectWithoutStudent_profilesInput | academic_semestersCreateOrConnectWithoutStudent_profilesInput[]
    upsert?: academic_semestersUpsertWithWhereUniqueWithoutStudent_profilesInput | academic_semestersUpsertWithWhereUniqueWithoutStudent_profilesInput[]
    createMany?: academic_semestersCreateManyStudent_profilesInputEnvelope
    set?: academic_semestersWhereUniqueInput | academic_semestersWhereUniqueInput[]
    disconnect?: academic_semestersWhereUniqueInput | academic_semestersWhereUniqueInput[]
    delete?: academic_semestersWhereUniqueInput | academic_semestersWhereUniqueInput[]
    connect?: academic_semestersWhereUniqueInput | academic_semestersWhereUniqueInput[]
    update?: academic_semestersUpdateWithWhereUniqueWithoutStudent_profilesInput | academic_semestersUpdateWithWhereUniqueWithoutStudent_profilesInput[]
    updateMany?: academic_semestersUpdateManyWithWhereWithoutStudent_profilesInput | academic_semestersUpdateManyWithWhereWithoutStudent_profilesInput[]
    deleteMany?: academic_semestersScalarWhereInput | academic_semestersScalarWhereInput[]
  }

  export type student_contact_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput = {
    create?: XOR<student_contact_detailsCreateWithoutStudent_profilesInput, student_contact_detailsUncheckedCreateWithoutStudent_profilesInput>
    connectOrCreate?: student_contact_detailsCreateOrConnectWithoutStudent_profilesInput
    upsert?: student_contact_detailsUpsertWithoutStudent_profilesInput
    disconnect?: student_contact_detailsWhereInput | boolean
    delete?: student_contact_detailsWhereInput | boolean
    connect?: student_contact_detailsWhereUniqueInput
    update?: XOR<XOR<student_contact_detailsUpdateToOneWithWhereWithoutStudent_profilesInput, student_contact_detailsUpdateWithoutStudent_profilesInput>, student_contact_detailsUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type student_documentsUncheckedUpdateManyWithoutStudent_profilesNestedInput = {
    create?: XOR<student_documentsCreateWithoutStudent_profilesInput, student_documentsUncheckedCreateWithoutStudent_profilesInput> | student_documentsCreateWithoutStudent_profilesInput[] | student_documentsUncheckedCreateWithoutStudent_profilesInput[]
    connectOrCreate?: student_documentsCreateOrConnectWithoutStudent_profilesInput | student_documentsCreateOrConnectWithoutStudent_profilesInput[]
    upsert?: student_documentsUpsertWithWhereUniqueWithoutStudent_profilesInput | student_documentsUpsertWithWhereUniqueWithoutStudent_profilesInput[]
    createMany?: student_documentsCreateManyStudent_profilesInputEnvelope
    set?: student_documentsWhereUniqueInput | student_documentsWhereUniqueInput[]
    disconnect?: student_documentsWhereUniqueInput | student_documentsWhereUniqueInput[]
    delete?: student_documentsWhereUniqueInput | student_documentsWhereUniqueInput[]
    connect?: student_documentsWhereUniqueInput | student_documentsWhereUniqueInput[]
    update?: student_documentsUpdateWithWhereUniqueWithoutStudent_profilesInput | student_documentsUpdateWithWhereUniqueWithoutStudent_profilesInput[]
    updateMany?: student_documentsUpdateManyWithWhereWithoutStudent_profilesInput | student_documentsUpdateManyWithWhereWithoutStudent_profilesInput[]
    deleteMany?: student_documentsScalarWhereInput | student_documentsScalarWhereInput[]
  }

  export type student_parent_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput = {
    create?: XOR<student_parent_detailsCreateWithoutStudent_profilesInput, student_parent_detailsUncheckedCreateWithoutStudent_profilesInput>
    connectOrCreate?: student_parent_detailsCreateOrConnectWithoutStudent_profilesInput
    upsert?: student_parent_detailsUpsertWithoutStudent_profilesInput
    disconnect?: student_parent_detailsWhereInput | boolean
    delete?: student_parent_detailsWhereInput | boolean
    connect?: student_parent_detailsWhereUniqueInput
    update?: XOR<XOR<student_parent_detailsUpdateToOneWithWhereWithoutStudent_profilesInput, student_parent_detailsUpdateWithoutStudent_profilesInput>, student_parent_detailsUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type student_profilesCreateNestedOneWithoutUsersInput = {
    create?: XOR<student_profilesCreateWithoutUsersInput, student_profilesUncheckedCreateWithoutUsersInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutUsersInput
    connect?: student_profilesWhereUniqueInput
  }

  export type student_profilesUncheckedCreateNestedOneWithoutUsersInput = {
    create?: XOR<student_profilesCreateWithoutUsersInput, student_profilesUncheckedCreateWithoutUsersInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutUsersInput
    connect?: student_profilesWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type student_profilesUpdateOneWithoutUsersNestedInput = {
    create?: XOR<student_profilesCreateWithoutUsersInput, student_profilesUncheckedCreateWithoutUsersInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutUsersInput
    upsert?: student_profilesUpsertWithoutUsersInput
    disconnect?: student_profilesWhereInput | boolean
    delete?: student_profilesWhereInput | boolean
    connect?: student_profilesWhereUniqueInput
    update?: XOR<XOR<student_profilesUpdateToOneWithWhereWithoutUsersInput, student_profilesUpdateWithoutUsersInput>, student_profilesUncheckedUpdateWithoutUsersInput>
  }

  export type student_profilesUncheckedUpdateOneWithoutUsersNestedInput = {
    create?: XOR<student_profilesCreateWithoutUsersInput, student_profilesUncheckedCreateWithoutUsersInput>
    connectOrCreate?: student_profilesCreateOrConnectWithoutUsersInput
    upsert?: student_profilesUpsertWithoutUsersInput
    disconnect?: student_profilesWhereInput | boolean
    delete?: student_profilesWhereInput | boolean
    connect?: student_profilesWhereUniqueInput
    update?: XOR<XOR<student_profilesUpdateToOneWithWhereWithoutUsersInput, student_profilesUpdateWithoutUsersInput>, student_profilesUncheckedUpdateWithoutUsersInput>
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

  export type NestedEnumAcademicBacklogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicBacklogStatus | EnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel> | $Enums.AcademicBacklogStatus
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

  export type NestedEnumAcademicBacklogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicBacklogStatus | EnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AcademicBacklogStatus[] | ListEnumAcademicBacklogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAcademicBacklogStatusWithAggregatesFilter<$PrismaModel> | $Enums.AcademicBacklogStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel>
    _max?: NestedEnumAcademicBacklogStatusFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type student_profilesCreateWithoutAcademic_backlogsInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_semesters?: academic_semestersCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsCreateNestedOneWithoutStudent_profilesInput
    student_documents?: student_documentsCreateNestedManyWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsCreateNestedOneWithoutStudent_profilesInput
    users: usersCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesUncheckedCreateWithoutAcademic_backlogsInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_semesters?: academic_semestersUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
    student_documents?: student_documentsUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesCreateOrConnectWithoutAcademic_backlogsInput = {
    where: student_profilesWhereUniqueInput
    create: XOR<student_profilesCreateWithoutAcademic_backlogsInput, student_profilesUncheckedCreateWithoutAcademic_backlogsInput>
  }

  export type student_profilesUpsertWithoutAcademic_backlogsInput = {
    update: XOR<student_profilesUpdateWithoutAcademic_backlogsInput, student_profilesUncheckedUpdateWithoutAcademic_backlogsInput>
    create: XOR<student_profilesCreateWithoutAcademic_backlogsInput, student_profilesUncheckedCreateWithoutAcademic_backlogsInput>
    where?: student_profilesWhereInput
  }

  export type student_profilesUpdateToOneWithWhereWithoutAcademic_backlogsInput = {
    where?: student_profilesWhereInput
    data: XOR<student_profilesUpdateWithoutAcademic_backlogsInput, student_profilesUncheckedUpdateWithoutAcademic_backlogsInput>
  }

  export type student_profilesUpdateWithoutAcademic_backlogsInput = {
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
    academic_semesters?: academic_semestersUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUpdateOneWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUpdateManyWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUpdateOneWithoutStudent_profilesNestedInput
    users?: usersUpdateOneRequiredWithoutStudent_profilesNestedInput
  }

  export type student_profilesUncheckedUpdateWithoutAcademic_backlogsInput = {
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
    academic_semesters?: academic_semestersUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
  }

  export type student_profilesCreateWithoutAcademic_semestersInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsCreateNestedOneWithoutStudent_profilesInput
    student_documents?: student_documentsCreateNestedManyWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsCreateNestedOneWithoutStudent_profilesInput
    users: usersCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesUncheckedCreateWithoutAcademic_semestersInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
    student_documents?: student_documentsUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesCreateOrConnectWithoutAcademic_semestersInput = {
    where: student_profilesWhereUniqueInput
    create: XOR<student_profilesCreateWithoutAcademic_semestersInput, student_profilesUncheckedCreateWithoutAcademic_semestersInput>
  }

  export type academic_subjectsCreateWithoutAcademic_semestersInput = {
    id: string
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
    updatedAt: Date | string
    classesAttended?: number
    classesHeld?: number
  }

  export type academic_subjectsUncheckedCreateWithoutAcademic_semestersInput = {
    id: string
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
    updatedAt: Date | string
    classesAttended?: number
    classesHeld?: number
  }

  export type academic_subjectsCreateOrConnectWithoutAcademic_semestersInput = {
    where: academic_subjectsWhereUniqueInput
    create: XOR<academic_subjectsCreateWithoutAcademic_semestersInput, academic_subjectsUncheckedCreateWithoutAcademic_semestersInput>
  }

  export type academic_subjectsCreateManyAcademic_semestersInputEnvelope = {
    data: academic_subjectsCreateManyAcademic_semestersInput | academic_subjectsCreateManyAcademic_semestersInput[]
    skipDuplicates?: boolean
  }

  export type student_profilesUpsertWithoutAcademic_semestersInput = {
    update: XOR<student_profilesUpdateWithoutAcademic_semestersInput, student_profilesUncheckedUpdateWithoutAcademic_semestersInput>
    create: XOR<student_profilesCreateWithoutAcademic_semestersInput, student_profilesUncheckedCreateWithoutAcademic_semestersInput>
    where?: student_profilesWhereInput
  }

  export type student_profilesUpdateToOneWithWhereWithoutAcademic_semestersInput = {
    where?: student_profilesWhereInput
    data: XOR<student_profilesUpdateWithoutAcademic_semestersInput, student_profilesUncheckedUpdateWithoutAcademic_semestersInput>
  }

  export type student_profilesUpdateWithoutAcademic_semestersInput = {
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
    academic_backlogs?: academic_backlogsUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUpdateOneWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUpdateManyWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUpdateOneWithoutStudent_profilesNestedInput
    users?: usersUpdateOneRequiredWithoutStudent_profilesNestedInput
  }

  export type student_profilesUncheckedUpdateWithoutAcademic_semestersInput = {
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
    academic_backlogs?: academic_backlogsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
  }

  export type academic_subjectsUpsertWithWhereUniqueWithoutAcademic_semestersInput = {
    where: academic_subjectsWhereUniqueInput
    update: XOR<academic_subjectsUpdateWithoutAcademic_semestersInput, academic_subjectsUncheckedUpdateWithoutAcademic_semestersInput>
    create: XOR<academic_subjectsCreateWithoutAcademic_semestersInput, academic_subjectsUncheckedCreateWithoutAcademic_semestersInput>
  }

  export type academic_subjectsUpdateWithWhereUniqueWithoutAcademic_semestersInput = {
    where: academic_subjectsWhereUniqueInput
    data: XOR<academic_subjectsUpdateWithoutAcademic_semestersInput, academic_subjectsUncheckedUpdateWithoutAcademic_semestersInput>
  }

  export type academic_subjectsUpdateManyWithWhereWithoutAcademic_semestersInput = {
    where: academic_subjectsScalarWhereInput
    data: XOR<academic_subjectsUpdateManyMutationInput, academic_subjectsUncheckedUpdateManyWithoutAcademic_semestersInput>
  }

  export type academic_subjectsScalarWhereInput = {
    AND?: academic_subjectsScalarWhereInput | academic_subjectsScalarWhereInput[]
    OR?: academic_subjectsScalarWhereInput[]
    NOT?: academic_subjectsScalarWhereInput | academic_subjectsScalarWhereInput[]
    id?: StringFilter<"academic_subjects"> | string
    academicSemesterId?: StringFilter<"academic_subjects"> | string
    courseCode?: StringFilter<"academic_subjects"> | string
    courseName?: StringFilter<"academic_subjects"> | string
    credits?: IntFilter<"academic_subjects"> | number
    cia1?: FloatNullableFilter<"academic_subjects"> | number | null
    cia2?: FloatNullableFilter<"academic_subjects"> | number | null
    cia3?: FloatNullableFilter<"academic_subjects"> | number | null
    mse?: FloatNullableFilter<"academic_subjects"> | number | null
    ese?: FloatNullableFilter<"academic_subjects"> | number | null
    maximumMarks?: FloatNullableFilter<"academic_subjects"> | number | null
    totalMarksObtained?: FloatNullableFilter<"academic_subjects"> | number | null
    grade?: StringNullableFilter<"academic_subjects"> | string | null
    gradePoint?: FloatNullableFilter<"academic_subjects"> | number | null
    attendance?: FloatNullableFilter<"academic_subjects"> | number | null
    createdAt?: DateTimeFilter<"academic_subjects"> | Date | string
    updatedAt?: DateTimeFilter<"academic_subjects"> | Date | string
    classesAttended?: IntFilter<"academic_subjects"> | number
    classesHeld?: IntFilter<"academic_subjects"> | number
  }

  export type academic_semestersCreateWithoutAcademic_subjectsInput = {
    id: string
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
    updatedAt: Date | string
    student_profiles: student_profilesCreateNestedOneWithoutAcademic_semestersInput
  }

  export type academic_semestersUncheckedCreateWithoutAcademic_subjectsInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type academic_semestersCreateOrConnectWithoutAcademic_subjectsInput = {
    where: academic_semestersWhereUniqueInput
    create: XOR<academic_semestersCreateWithoutAcademic_subjectsInput, academic_semestersUncheckedCreateWithoutAcademic_subjectsInput>
  }

  export type academic_semestersUpsertWithoutAcademic_subjectsInput = {
    update: XOR<academic_semestersUpdateWithoutAcademic_subjectsInput, academic_semestersUncheckedUpdateWithoutAcademic_subjectsInput>
    create: XOR<academic_semestersCreateWithoutAcademic_subjectsInput, academic_semestersUncheckedCreateWithoutAcademic_subjectsInput>
    where?: academic_semestersWhereInput
  }

  export type academic_semestersUpdateToOneWithWhereWithoutAcademic_subjectsInput = {
    where?: academic_semestersWhereInput
    data: XOR<academic_semestersUpdateWithoutAcademic_subjectsInput, academic_semestersUncheckedUpdateWithoutAcademic_subjectsInput>
  }

  export type academic_semestersUpdateWithoutAcademic_subjectsInput = {
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
    student_profiles?: student_profilesUpdateOneRequiredWithoutAcademic_semestersNestedInput
  }

  export type academic_semestersUncheckedUpdateWithoutAcademic_subjectsInput = {
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

  export type student_profilesCreateWithoutStudent_contact_detailsInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsCreateNestedManyWithoutStudent_profilesInput
    academic_semesters?: academic_semestersCreateNestedManyWithoutStudent_profilesInput
    student_documents?: student_documentsCreateNestedManyWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsCreateNestedOneWithoutStudent_profilesInput
    users: usersCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesUncheckedCreateWithoutStudent_contact_detailsInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsUncheckedCreateNestedManyWithoutStudent_profilesInput
    academic_semesters?: academic_semestersUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_documents?: student_documentsUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesCreateOrConnectWithoutStudent_contact_detailsInput = {
    where: student_profilesWhereUniqueInput
    create: XOR<student_profilesCreateWithoutStudent_contact_detailsInput, student_profilesUncheckedCreateWithoutStudent_contact_detailsInput>
  }

  export type student_profilesUpsertWithoutStudent_contact_detailsInput = {
    update: XOR<student_profilesUpdateWithoutStudent_contact_detailsInput, student_profilesUncheckedUpdateWithoutStudent_contact_detailsInput>
    create: XOR<student_profilesCreateWithoutStudent_contact_detailsInput, student_profilesUncheckedCreateWithoutStudent_contact_detailsInput>
    where?: student_profilesWhereInput
  }

  export type student_profilesUpdateToOneWithWhereWithoutStudent_contact_detailsInput = {
    where?: student_profilesWhereInput
    data: XOR<student_profilesUpdateWithoutStudent_contact_detailsInput, student_profilesUncheckedUpdateWithoutStudent_contact_detailsInput>
  }

  export type student_profilesUpdateWithoutStudent_contact_detailsInput = {
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
    academic_backlogs?: academic_backlogsUpdateManyWithoutStudent_profilesNestedInput
    academic_semesters?: academic_semestersUpdateManyWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUpdateManyWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUpdateOneWithoutStudent_profilesNestedInput
    users?: usersUpdateOneRequiredWithoutStudent_profilesNestedInput
  }

  export type student_profilesUncheckedUpdateWithoutStudent_contact_detailsInput = {
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
    academic_backlogs?: academic_backlogsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    academic_semesters?: academic_semestersUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
  }

  export type student_profilesCreateWithoutStudent_documentsInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsCreateNestedManyWithoutStudent_profilesInput
    academic_semesters?: academic_semestersCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsCreateNestedOneWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsCreateNestedOneWithoutStudent_profilesInput
    users: usersCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesUncheckedCreateWithoutStudent_documentsInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsUncheckedCreateNestedManyWithoutStudent_profilesInput
    academic_semesters?: academic_semestersUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesCreateOrConnectWithoutStudent_documentsInput = {
    where: student_profilesWhereUniqueInput
    create: XOR<student_profilesCreateWithoutStudent_documentsInput, student_profilesUncheckedCreateWithoutStudent_documentsInput>
  }

  export type student_profilesUpsertWithoutStudent_documentsInput = {
    update: XOR<student_profilesUpdateWithoutStudent_documentsInput, student_profilesUncheckedUpdateWithoutStudent_documentsInput>
    create: XOR<student_profilesCreateWithoutStudent_documentsInput, student_profilesUncheckedCreateWithoutStudent_documentsInput>
    where?: student_profilesWhereInput
  }

  export type student_profilesUpdateToOneWithWhereWithoutStudent_documentsInput = {
    where?: student_profilesWhereInput
    data: XOR<student_profilesUpdateWithoutStudent_documentsInput, student_profilesUncheckedUpdateWithoutStudent_documentsInput>
  }

  export type student_profilesUpdateWithoutStudent_documentsInput = {
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
    academic_backlogs?: academic_backlogsUpdateManyWithoutStudent_profilesNestedInput
    academic_semesters?: academic_semestersUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUpdateOneWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUpdateOneWithoutStudent_profilesNestedInput
    users?: usersUpdateOneRequiredWithoutStudent_profilesNestedInput
  }

  export type student_profilesUncheckedUpdateWithoutStudent_documentsInput = {
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
    academic_backlogs?: academic_backlogsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    academic_semesters?: academic_semestersUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
  }

  export type student_profilesCreateWithoutStudent_parent_detailsInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsCreateNestedManyWithoutStudent_profilesInput
    academic_semesters?: academic_semestersCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsCreateNestedOneWithoutStudent_profilesInput
    student_documents?: student_documentsCreateNestedManyWithoutStudent_profilesInput
    users: usersCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesUncheckedCreateWithoutStudent_parent_detailsInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsUncheckedCreateNestedManyWithoutStudent_profilesInput
    academic_semesters?: academic_semestersUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
    student_documents?: student_documentsUncheckedCreateNestedManyWithoutStudent_profilesInput
  }

  export type student_profilesCreateOrConnectWithoutStudent_parent_detailsInput = {
    where: student_profilesWhereUniqueInput
    create: XOR<student_profilesCreateWithoutStudent_parent_detailsInput, student_profilesUncheckedCreateWithoutStudent_parent_detailsInput>
  }

  export type student_profilesUpsertWithoutStudent_parent_detailsInput = {
    update: XOR<student_profilesUpdateWithoutStudent_parent_detailsInput, student_profilesUncheckedUpdateWithoutStudent_parent_detailsInput>
    create: XOR<student_profilesCreateWithoutStudent_parent_detailsInput, student_profilesUncheckedCreateWithoutStudent_parent_detailsInput>
    where?: student_profilesWhereInput
  }

  export type student_profilesUpdateToOneWithWhereWithoutStudent_parent_detailsInput = {
    where?: student_profilesWhereInput
    data: XOR<student_profilesUpdateWithoutStudent_parent_detailsInput, student_profilesUncheckedUpdateWithoutStudent_parent_detailsInput>
  }

  export type student_profilesUpdateWithoutStudent_parent_detailsInput = {
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
    academic_backlogs?: academic_backlogsUpdateManyWithoutStudent_profilesNestedInput
    academic_semesters?: academic_semestersUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUpdateOneWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUpdateManyWithoutStudent_profilesNestedInput
    users?: usersUpdateOneRequiredWithoutStudent_profilesNestedInput
  }

  export type student_profilesUncheckedUpdateWithoutStudent_parent_detailsInput = {
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
    academic_backlogs?: academic_backlogsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    academic_semesters?: academic_semestersUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUncheckedUpdateManyWithoutStudent_profilesNestedInput
  }

  export type academic_backlogsCreateWithoutStudent_profilesInput = {
    id: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status?: $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: number | null
    clearedGrade?: string | null
    clearedMarks?: number | null
    clearedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type academic_backlogsUncheckedCreateWithoutStudent_profilesInput = {
    id: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status?: $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: number | null
    clearedGrade?: string | null
    clearedMarks?: number | null
    clearedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type academic_backlogsCreateOrConnectWithoutStudent_profilesInput = {
    where: academic_backlogsWhereUniqueInput
    create: XOR<academic_backlogsCreateWithoutStudent_profilesInput, academic_backlogsUncheckedCreateWithoutStudent_profilesInput>
  }

  export type academic_backlogsCreateManyStudent_profilesInputEnvelope = {
    data: academic_backlogsCreateManyStudent_profilesInput | academic_backlogsCreateManyStudent_profilesInput[]
    skipDuplicates?: boolean
  }

  export type academic_semestersCreateWithoutStudent_profilesInput = {
    id: string
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
    updatedAt: Date | string
    academic_subjects?: academic_subjectsCreateNestedManyWithoutAcademic_semestersInput
  }

  export type academic_semestersUncheckedCreateWithoutStudent_profilesInput = {
    id: string
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
    updatedAt: Date | string
    academic_subjects?: academic_subjectsUncheckedCreateNestedManyWithoutAcademic_semestersInput
  }

  export type academic_semestersCreateOrConnectWithoutStudent_profilesInput = {
    where: academic_semestersWhereUniqueInput
    create: XOR<academic_semestersCreateWithoutStudent_profilesInput, academic_semestersUncheckedCreateWithoutStudent_profilesInput>
  }

  export type academic_semestersCreateManyStudent_profilesInputEnvelope = {
    data: academic_semestersCreateManyStudent_profilesInput | academic_semestersCreateManyStudent_profilesInput[]
    skipDuplicates?: boolean
  }

  export type student_contact_detailsCreateWithoutStudent_profilesInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type student_contact_detailsUncheckedCreateWithoutStudent_profilesInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type student_contact_detailsCreateOrConnectWithoutStudent_profilesInput = {
    where: student_contact_detailsWhereUniqueInput
    create: XOR<student_contact_detailsCreateWithoutStudent_profilesInput, student_contact_detailsUncheckedCreateWithoutStudent_profilesInput>
  }

  export type student_documentsCreateWithoutStudent_profilesInput = {
    id: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt: Date | string
    resourceType: string
  }

  export type student_documentsUncheckedCreateWithoutStudent_profilesInput = {
    id: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt: Date | string
    resourceType: string
  }

  export type student_documentsCreateOrConnectWithoutStudent_profilesInput = {
    where: student_documentsWhereUniqueInput
    create: XOR<student_documentsCreateWithoutStudent_profilesInput, student_documentsUncheckedCreateWithoutStudent_profilesInput>
  }

  export type student_documentsCreateManyStudent_profilesInputEnvelope = {
    data: student_documentsCreateManyStudent_profilesInput | student_documentsCreateManyStudent_profilesInput[]
    skipDuplicates?: boolean
  }

  export type student_parent_detailsCreateWithoutStudent_profilesInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type student_parent_detailsUncheckedCreateWithoutStudent_profilesInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type student_parent_detailsCreateOrConnectWithoutStudent_profilesInput = {
    where: student_parent_detailsWhereUniqueInput
    create: XOR<student_parent_detailsCreateWithoutStudent_profilesInput, student_parent_detailsUncheckedCreateWithoutStudent_profilesInput>
  }

  export type usersCreateWithoutStudent_profilesInput = {
    id: string
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type usersUncheckedCreateWithoutStudent_profilesInput = {
    id: string
    fullName: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type usersCreateOrConnectWithoutStudent_profilesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutStudent_profilesInput, usersUncheckedCreateWithoutStudent_profilesInput>
  }

  export type academic_backlogsUpsertWithWhereUniqueWithoutStudent_profilesInput = {
    where: academic_backlogsWhereUniqueInput
    update: XOR<academic_backlogsUpdateWithoutStudent_profilesInput, academic_backlogsUncheckedUpdateWithoutStudent_profilesInput>
    create: XOR<academic_backlogsCreateWithoutStudent_profilesInput, academic_backlogsUncheckedCreateWithoutStudent_profilesInput>
  }

  export type academic_backlogsUpdateWithWhereUniqueWithoutStudent_profilesInput = {
    where: academic_backlogsWhereUniqueInput
    data: XOR<academic_backlogsUpdateWithoutStudent_profilesInput, academic_backlogsUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type academic_backlogsUpdateManyWithWhereWithoutStudent_profilesInput = {
    where: academic_backlogsScalarWhereInput
    data: XOR<academic_backlogsUpdateManyMutationInput, academic_backlogsUncheckedUpdateManyWithoutStudent_profilesInput>
  }

  export type academic_backlogsScalarWhereInput = {
    AND?: academic_backlogsScalarWhereInput | academic_backlogsScalarWhereInput[]
    OR?: academic_backlogsScalarWhereInput[]
    NOT?: academic_backlogsScalarWhereInput | academic_backlogsScalarWhereInput[]
    id?: StringFilter<"academic_backlogs"> | string
    studentProfileId?: StringFilter<"academic_backlogs"> | string
    subjectCode?: StringFilter<"academic_backlogs"> | string
    subjectName?: StringFilter<"academic_backlogs"> | string
    semesterNumber?: IntFilter<"academic_backlogs"> | number
    status?: EnumAcademicBacklogStatusFilter<"academic_backlogs"> | $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: IntNullableFilter<"academic_backlogs"> | number | null
    clearedGrade?: StringNullableFilter<"academic_backlogs"> | string | null
    clearedMarks?: FloatNullableFilter<"academic_backlogs"> | number | null
    clearedAt?: DateTimeNullableFilter<"academic_backlogs"> | Date | string | null
    createdAt?: DateTimeFilter<"academic_backlogs"> | Date | string
    updatedAt?: DateTimeFilter<"academic_backlogs"> | Date | string
  }

  export type academic_semestersUpsertWithWhereUniqueWithoutStudent_profilesInput = {
    where: academic_semestersWhereUniqueInput
    update: XOR<academic_semestersUpdateWithoutStudent_profilesInput, academic_semestersUncheckedUpdateWithoutStudent_profilesInput>
    create: XOR<academic_semestersCreateWithoutStudent_profilesInput, academic_semestersUncheckedCreateWithoutStudent_profilesInput>
  }

  export type academic_semestersUpdateWithWhereUniqueWithoutStudent_profilesInput = {
    where: academic_semestersWhereUniqueInput
    data: XOR<academic_semestersUpdateWithoutStudent_profilesInput, academic_semestersUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type academic_semestersUpdateManyWithWhereWithoutStudent_profilesInput = {
    where: academic_semestersScalarWhereInput
    data: XOR<academic_semestersUpdateManyMutationInput, academic_semestersUncheckedUpdateManyWithoutStudent_profilesInput>
  }

  export type academic_semestersScalarWhereInput = {
    AND?: academic_semestersScalarWhereInput | academic_semestersScalarWhereInput[]
    OR?: academic_semestersScalarWhereInput[]
    NOT?: academic_semestersScalarWhereInput | academic_semestersScalarWhereInput[]
    id?: StringFilter<"academic_semesters"> | string
    studentProfileId?: StringFilter<"academic_semesters"> | string
    semesterNumber?: IntFilter<"academic_semesters"> | number
    academicYear?: StringNullableFilter<"academic_semesters"> | string | null
    term?: StringNullableFilter<"academic_semesters"> | string | null
    status?: EnumAcademicSemesterStatusFilter<"academic_semesters"> | $Enums.AcademicSemesterStatus
    entryStatus?: EnumAcademicEntryStatusFilter<"academic_semesters"> | $Enums.AcademicEntryStatus
    sgpa?: FloatNullableFilter<"academic_semesters"> | number | null
    totalCredits?: IntFilter<"academic_semesters"> | number
    creditsEarned?: IntFilter<"academic_semesters"> | number
    backlogs?: IntFilter<"academic_semesters"> | number
    createdAt?: DateTimeFilter<"academic_semesters"> | Date | string
    updatedAt?: DateTimeFilter<"academic_semesters"> | Date | string
  }

  export type student_contact_detailsUpsertWithoutStudent_profilesInput = {
    update: XOR<student_contact_detailsUpdateWithoutStudent_profilesInput, student_contact_detailsUncheckedUpdateWithoutStudent_profilesInput>
    create: XOR<student_contact_detailsCreateWithoutStudent_profilesInput, student_contact_detailsUncheckedCreateWithoutStudent_profilesInput>
    where?: student_contact_detailsWhereInput
  }

  export type student_contact_detailsUpdateToOneWithWhereWithoutStudent_profilesInput = {
    where?: student_contact_detailsWhereInput
    data: XOR<student_contact_detailsUpdateWithoutStudent_profilesInput, student_contact_detailsUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type student_contact_detailsUpdateWithoutStudent_profilesInput = {
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

  export type student_contact_detailsUncheckedUpdateWithoutStudent_profilesInput = {
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

  export type student_documentsUpsertWithWhereUniqueWithoutStudent_profilesInput = {
    where: student_documentsWhereUniqueInput
    update: XOR<student_documentsUpdateWithoutStudent_profilesInput, student_documentsUncheckedUpdateWithoutStudent_profilesInput>
    create: XOR<student_documentsCreateWithoutStudent_profilesInput, student_documentsUncheckedCreateWithoutStudent_profilesInput>
  }

  export type student_documentsUpdateWithWhereUniqueWithoutStudent_profilesInput = {
    where: student_documentsWhereUniqueInput
    data: XOR<student_documentsUpdateWithoutStudent_profilesInput, student_documentsUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type student_documentsUpdateManyWithWhereWithoutStudent_profilesInput = {
    where: student_documentsScalarWhereInput
    data: XOR<student_documentsUpdateManyMutationInput, student_documentsUncheckedUpdateManyWithoutStudent_profilesInput>
  }

  export type student_documentsScalarWhereInput = {
    AND?: student_documentsScalarWhereInput | student_documentsScalarWhereInput[]
    OR?: student_documentsScalarWhereInput[]
    NOT?: student_documentsScalarWhereInput | student_documentsScalarWhereInput[]
    id?: StringFilter<"student_documents"> | string
    studentProfileId?: StringFilter<"student_documents"> | string
    documentName?: StringFilter<"student_documents"> | string
    category?: EnumDocumentCategoryFilter<"student_documents"> | $Enums.DocumentCategory
    description?: StringNullableFilter<"student_documents"> | string | null
    fileType?: StringFilter<"student_documents"> | string
    fileSize?: IntFilter<"student_documents"> | number
    cloudinaryPublicId?: StringFilter<"student_documents"> | string
    fileUrl?: StringFilter<"student_documents"> | string
    uploadedAt?: DateTimeFilter<"student_documents"> | Date | string
    updatedAt?: DateTimeFilter<"student_documents"> | Date | string
    resourceType?: StringFilter<"student_documents"> | string
  }

  export type student_parent_detailsUpsertWithoutStudent_profilesInput = {
    update: XOR<student_parent_detailsUpdateWithoutStudent_profilesInput, student_parent_detailsUncheckedUpdateWithoutStudent_profilesInput>
    create: XOR<student_parent_detailsCreateWithoutStudent_profilesInput, student_parent_detailsUncheckedCreateWithoutStudent_profilesInput>
    where?: student_parent_detailsWhereInput
  }

  export type student_parent_detailsUpdateToOneWithWhereWithoutStudent_profilesInput = {
    where?: student_parent_detailsWhereInput
    data: XOR<student_parent_detailsUpdateWithoutStudent_profilesInput, student_parent_detailsUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type student_parent_detailsUpdateWithoutStudent_profilesInput = {
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

  export type student_parent_detailsUncheckedUpdateWithoutStudent_profilesInput = {
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

  export type usersUpsertWithoutStudent_profilesInput = {
    update: XOR<usersUpdateWithoutStudent_profilesInput, usersUncheckedUpdateWithoutStudent_profilesInput>
    create: XOR<usersCreateWithoutStudent_profilesInput, usersUncheckedCreateWithoutStudent_profilesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutStudent_profilesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutStudent_profilesInput, usersUncheckedUpdateWithoutStudent_profilesInput>
  }

  export type usersUpdateWithoutStudent_profilesInput = {
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

  export type usersUncheckedUpdateWithoutStudent_profilesInput = {
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

  export type student_profilesCreateWithoutUsersInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsCreateNestedManyWithoutStudent_profilesInput
    academic_semesters?: academic_semestersCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsCreateNestedOneWithoutStudent_profilesInput
    student_documents?: student_documentsCreateNestedManyWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesUncheckedCreateWithoutUsersInput = {
    id: string
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
    updatedAt: Date | string
    academicSetupCompleted?: boolean
    academic_backlogs?: academic_backlogsUncheckedCreateNestedManyWithoutStudent_profilesInput
    academic_semesters?: academic_semestersUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_contact_details?: student_contact_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
    student_documents?: student_documentsUncheckedCreateNestedManyWithoutStudent_profilesInput
    student_parent_details?: student_parent_detailsUncheckedCreateNestedOneWithoutStudent_profilesInput
  }

  export type student_profilesCreateOrConnectWithoutUsersInput = {
    where: student_profilesWhereUniqueInput
    create: XOR<student_profilesCreateWithoutUsersInput, student_profilesUncheckedCreateWithoutUsersInput>
  }

  export type student_profilesUpsertWithoutUsersInput = {
    update: XOR<student_profilesUpdateWithoutUsersInput, student_profilesUncheckedUpdateWithoutUsersInput>
    create: XOR<student_profilesCreateWithoutUsersInput, student_profilesUncheckedCreateWithoutUsersInput>
    where?: student_profilesWhereInput
  }

  export type student_profilesUpdateToOneWithWhereWithoutUsersInput = {
    where?: student_profilesWhereInput
    data: XOR<student_profilesUpdateWithoutUsersInput, student_profilesUncheckedUpdateWithoutUsersInput>
  }

  export type student_profilesUpdateWithoutUsersInput = {
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
    academic_backlogs?: academic_backlogsUpdateManyWithoutStudent_profilesNestedInput
    academic_semesters?: academic_semestersUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUpdateOneWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUpdateManyWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUpdateOneWithoutStudent_profilesNestedInput
  }

  export type student_profilesUncheckedUpdateWithoutUsersInput = {
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
    academic_backlogs?: academic_backlogsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    academic_semesters?: academic_semestersUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_contact_details?: student_contact_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
    student_documents?: student_documentsUncheckedUpdateManyWithoutStudent_profilesNestedInput
    student_parent_details?: student_parent_detailsUncheckedUpdateOneWithoutStudent_profilesNestedInput
  }

  export type academic_subjectsCreateManyAcademic_semestersInput = {
    id: string
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
    updatedAt: Date | string
    classesAttended?: number
    classesHeld?: number
  }

  export type academic_subjectsUpdateWithoutAcademic_semestersInput = {
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

  export type academic_subjectsUncheckedUpdateWithoutAcademic_semestersInput = {
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

  export type academic_subjectsUncheckedUpdateManyWithoutAcademic_semestersInput = {
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

  export type academic_backlogsCreateManyStudent_profilesInput = {
    id: string
    subjectCode: string
    subjectName: string
    semesterNumber: number
    status?: $Enums.AcademicBacklogStatus
    clearedSemesterNumber?: number | null
    clearedGrade?: string | null
    clearedMarks?: number | null
    clearedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type academic_semestersCreateManyStudent_profilesInput = {
    id: string
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
    updatedAt: Date | string
  }

  export type student_documentsCreateManyStudent_profilesInput = {
    id: string
    documentName: string
    category: $Enums.DocumentCategory
    description?: string | null
    fileType: string
    fileSize: number
    cloudinaryPublicId: string
    fileUrl: string
    uploadedAt?: Date | string
    updatedAt: Date | string
    resourceType: string
  }

  export type academic_backlogsUpdateWithoutStudent_profilesInput = {
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

  export type academic_backlogsUncheckedUpdateWithoutStudent_profilesInput = {
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

  export type academic_backlogsUncheckedUpdateManyWithoutStudent_profilesInput = {
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

  export type academic_semestersUpdateWithoutStudent_profilesInput = {
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
    academic_subjects?: academic_subjectsUpdateManyWithoutAcademic_semestersNestedInput
  }

  export type academic_semestersUncheckedUpdateWithoutStudent_profilesInput = {
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
    academic_subjects?: academic_subjectsUncheckedUpdateManyWithoutAcademic_semestersNestedInput
  }

  export type academic_semestersUncheckedUpdateManyWithoutStudent_profilesInput = {
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

  export type student_documentsUpdateWithoutStudent_profilesInput = {
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

  export type student_documentsUncheckedUpdateWithoutStudent_profilesInput = {
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

  export type student_documentsUncheckedUpdateManyWithoutStudent_profilesInput = {
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