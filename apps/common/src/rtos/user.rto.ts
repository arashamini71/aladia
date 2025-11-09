import { ApiProperty } from '@nestjs/swagger';

export class UserRto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}
