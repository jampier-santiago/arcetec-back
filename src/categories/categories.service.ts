import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    createCategoryDto.name = createCategoryDto.name.toLowerCase().trim();

    if (!createCategoryDto.description)
      throw new BadRequestException('Field description is empty');

    if (!createCategoryDto.image)
      throw new BadRequestException('Field image is empty');

    try {
      const category = await this.categoryModel.create(createCategoryDto);

      return category;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    return await this.categoryModel.find({ wasDeleted: false });
  }

  async findOne(term: string) {
    let category: Category;

    // Find by id
    if (isValidObjectId(term))
      category = await this.categoryModel.findOne({
        _id: term,
        wasDeleted: false,
      });

    // Find by name
    if (!category)
      category = await this.categoryModel.findOne({
        name: term,
        wasDeleted: false,
      });

    if (!category) throw new NotFoundException(`Category not found`);

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    try {
      await category.updateOne(updateCategoryDto, { new: true });
    } catch (error) {
      this.handleException(error);
    }

    return { ...category.toJSON, ...updateCategoryDto };
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    try {
      await category.updateOne({ wasDeleted: true }, { new: true });
    } catch (error) {
      this.handleException(error);
    }

    return `The category was deleted succesfully`;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Category exist in db`);
    }

    throw new InternalServerErrorException(`Can't create category`);
  }
}
