// Packages
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

// Services
import { HandleErrorsService } from '../common/services/handle-errors/handle-errors.service';

// DTO
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// Entities
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    private readonly handleErrorsService: HandleErrorsService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    createCategoryDto.name = createCategoryDto.name.toLowerCase().trim();

    try {
      const category = await this.categoryModel.create(createCategoryDto);

      return category;
    } catch (error) {
      this.handleErrorsService.handleException(error, `Can't create category`);
    }
  }

  async findAll() {
    // Show only active categories
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
        name: term.toLowerCase().trim(),
        wasDeleted: false,
      });

    if (!category) throw new NotFoundException(`Category not found`);

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (updateCategoryDto.name)
      updateCategoryDto.name = updateCategoryDto.name.toLowerCase();

    try {
      await category.updateOne(updateCategoryDto, { new: true });
    } catch (error) {
      this.handleErrorsService.handleException(error, `Can't update category`);
    }

    return { ...category.toJSON, ...updateCategoryDto };
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    // Change the variable in charge of the category state
    try {
      await category.updateOne({ wasDeleted: true }, { new: true });
      return { message: `The category was deleted succesfully` };
    } catch (error) {
      this.handleErrorsService.handleException(error, `Can't remove category`);
    }
  }
}
