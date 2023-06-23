// Packages
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

// Services
import { HandleErrorsService } from 'common/services/handle-errors/handle-errors.service';

// Entities
import { User } from './entities/users.entity';

// Interfaces
import { JwtPayload } from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly handleErrorsService: HandleErrorsService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      userData.email = userData.email.toLowerCase().trim();

      // Create user with encrypted password
      const { name, email, id } = await this.userModel.create({
        ...userData,
        password: hashSync(password, 10),
      });

      return { name, email, id, token: this.getJwt({ email }) };
    } catch (error) {
      this.handleErrorsService.handleException(error, `Can't create user`);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    // Search user
    const user = await this.userModel.findOne({
      email: email.toLowerCase().trim(),
      wasDeleted: false,
    });

    if (!user) throw new UnauthorizedException(`Credentials are not valid`);

    // Compare with encrypted password
    if (!compareSync(password, user.password))
      throw new UnauthorizedException(`Credentials are not valid`);

    return {
      email: user.email,
      id: user.id,
      name: user.name,
      token: this.getJwt({ email: user.email }),
    };
  }

  private getJwt(payload: JwtPayload) {
    // Generate jwt
    return this.jwtService.sign(payload);
  }
}
