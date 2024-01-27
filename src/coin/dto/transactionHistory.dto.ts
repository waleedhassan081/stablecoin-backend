import { IsNumber, IsString, IsNotEmpty, Min } from 'class-validator';

export class TransactionHistoryDto {

  @IsNumber()
  @IsNotEmpty()
  senderId: number;

  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Amount must be a positive number' })
  amount: number;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsString()
  @IsNotEmpty()
  network: string;

  @IsString()
  @IsNotEmpty()
  networkFee: string;

  @IsString()
  @IsNotEmpty()
  txId: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}