import { Product } from './../typeorm/entities/Product';
import  {getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

export class ListProductService{

  public async execute(): Promise<Product[]>{

    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();

    return products;

  }
}
