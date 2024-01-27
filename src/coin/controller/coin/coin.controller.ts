import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import { CoinService } from '../../service/coin/coin.service';
import { CoinDto } from '../../dto/coin.dto';
import { TransactionDto } from 'src/coin/dto/transaction.dto';
import { TransactionHistoryDto } from 'src/coin/dto/transactionHistory.dto';
@Controller('coins')
export class CoinController {
    constructor(private readonly coinsService: CoinService) { }

    @Get()
    getStableCoins(): { data: CoinDto[]; statusCode: number } {
        try {
            const stableCoins = this.coinsService.getStableCoins();
            if (stableCoins.length === 0) {
                throw new HttpException('No stable coins found', HttpStatus.NOT_FOUND);
            }

            return { data: stableCoins, statusCode: HttpStatus.OK };
        } catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('/transactions/send')
    createTransaction(
        @Body() transactionDto: TransactionDto,
    ): { data: CoinDto } {
        try {
            const updatedStableCoin = this.coinsService.createTransaction(
                transactionDto,
            );
            return { data: updatedStableCoin };
        } catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('/transactions')
    getTransactionHistory(): { data: TransactionHistoryDto[]; statusCode: number } {
        try {
            const transactionHistory = this.coinsService.getTransactionHistory();
            if (transactionHistory.length === 0) {
                throw new HttpException('No transaction history found', HttpStatus.NOT_FOUND);
            }

            return { data: transactionHistory, statusCode: HttpStatus.OK };
        } catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
