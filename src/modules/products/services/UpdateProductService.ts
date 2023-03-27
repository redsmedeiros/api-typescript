import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { Product } from './../typeorm/entities/Product';
import  {getCustomRepository } from 'typeorm';

interface IRequest{
  id: string;
  name: string;
  price: number;
  quantity: number;
}


export default class UpdateProductService{

  public async execute({id, name, price, quantity}: IRequest): Promise<Product>{

    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if(!product){
      throw new Error('Produto não encontrado');
    }

    const productExists = await productRepository.findByName(name);

    if(productExists && name !== product.name ){
      throw new Error('Produto já cadastrado');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.price = price;

    await productRepository.save(product);

    return product;
  }
}
