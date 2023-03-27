import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import  {getCustomRepository } from 'typeorm';

interface IRequest{
  id: string
}

export class DeleteProductService{

  public async execute({id}: IRequest): Promise<void>{

    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if(!product){
      throw new Error('Produto não encontrado');
    }

    await productRepository.remove(product);
  }
}
