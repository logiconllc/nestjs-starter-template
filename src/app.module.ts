import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpStatus, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { UserModule } from './modules/User/user.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
      formatError: (error: GraphQLFormattedError) => {
        const graphQLFormattedError = {
          message:
             error.message,
          code:
            error.extensions?.code || "SERVER_ERROR",
          statusCode: error.extensions?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          stacktrace: (process.env.ENV == "local" || process.env.ENV == "development") ? error.extensions?.stacktrace : null 
        };
        return graphQLFormattedError;
      },
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig)
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
