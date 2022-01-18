import { Module } from '@nestjs/common';
import { LectureModule } from './lectures/lecture.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LectureModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'class-creator-DB',
        };
      },
    }),
  ],
})
export class AppModule {}
