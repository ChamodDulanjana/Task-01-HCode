import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import {FileUpload, GraphQLUpload} from "graphql-upload-ts";


@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  // Simple Query to satisfy the GraphQL schema requirement
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => Boolean)
  async uploadCsvFile(@Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload): Promise<boolean> {
    return this.uploadService.uploadCsvFile(file);
  }

}
