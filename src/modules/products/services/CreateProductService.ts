import { Product } from './../typeorm/entities/Product';
import { AppError } from './../../../shared/errors/AppError';
import  {getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IRequest{
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService{

  public async execute({name, price, quantity}: IRequest){

    const productsRepository = getCustomRepository(ProductRepository);

    const productExists = await productsRepository.findByName(name);

    if(productExists){
      throw new AppError('Produto já cadastrado');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity
    })

    await productsRepository.save(product);

    return product;

  }
}
