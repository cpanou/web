import { Product } from './Product';
import { User } from './user';

export class Order {
    id: number;
    status: string;
    submittedDate: Date;
    processedDate: Date;
    user: User;
    productList: Product[];
}