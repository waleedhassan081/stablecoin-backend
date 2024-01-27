import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Coin } from '../../interface/coin/coin.interface';
import { TransactionDto } from 'src/coin/dto/transaction.dto';
import { TransactionHistoryDto } from 'src/coin/dto/transactionHistory.dto';
import { readJsonFile, writeJsonFile } from 'src/utilities/helper';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { TransactionStatus } from 'src/utilities/constants';

@Injectable()
export class CoinService {
    private readonly stableCoins: Coin[];
    constructor() {
        this.stableCoins = readJsonFile('../../stablecoins.json');
    }

    getStableCoins(): Coin[] {
        return this.stableCoins;
    }

    createTransaction(transactionDto: TransactionDto): Coin {
        const stableCoin = this.stableCoins.find((coin) => coin.id === transactionDto.id);

        if (!stableCoin) {
            throw new HttpException('Stable coin not found', HttpStatus.NOT_FOUND);
        }

        if (transactionDto.amount > stableCoin.balance) {
            throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
        }

        stableCoin.balance -= transactionDto.amount;

        // Record the transaction
        this.recordTransaction(stableCoin, transactionDto);

        // Write to file (simulate a persistent storage)
        writeFileSync(join(__dirname, '..', '..', '../../stable-coins.json'), JSON.stringify(this.stableCoins, null, 2), 'utf8');


        return stableCoin;
    }

    getTransactionHistory(): TransactionHistoryDto[] {
        return readJsonFile('../../transaction-history.json');
    }
    private recordTransaction(
        stableCoin: Coin,
        transactionDto: TransactionDto,
    ): void {
        const transactionHistory = this.loadTransactionHistory();

        // Add the transaction to the history
        const transactionRecord = {
            senderId: stableCoin.id,
            symbol: stableCoin.symbol,
            sender: stableCoin.address,
            recipient: transactionDto.recipientAddress,
            amount: transactionDto.amount,
            network: stableCoin.blockchain.network,
            networkFee: `0 ${stableCoin.symbol}`,
            txId: uuidv4(),
            status: TransactionStatus.COMPLETED,
            date: new Date().toISOString(),
        };

        transactionHistory.push(transactionRecord);

        // Write the updated transaction history to the file
        writeFileSync(
            join(__dirname, '..', '..', '../../transaction-history.json'),
            JSON.stringify(transactionHistory, null, 2),
            'utf8',
        );
    }

    private loadTransactionHistory(): any[] {
        try {
            const filePath = join(__dirname, '..', '..', '../../transaction-history.json');
            const data = readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // If the file doesn't exist, create an empty array
                writeFileSync(join(__dirname, '..', '..', '../../transaction-history.json'), '[]', 'utf8');
                return [];
            }
            console.error(`Error loading transaction history: ${error.message}`);
            // If there's an error other than file not found, return an empty array
            return [];
        }
    }

}
