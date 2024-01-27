import { IsNumber, IsString, IsNotEmpty, Min } from 'class-validator';

export class TransactionDto {

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  recipientAddress: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Amount must be a positive number' })
  amount: number;
}