// Packages
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';

// Entities
import { User } from '../entities/users.entity';

// Interaces
import { JwtPayload } from './../interfaces/jwt-payload.interfaces';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    // Validate user existence
    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException('Token not valid');

    if (user.wasDeleted) throw new UnauthorizedException('User is inactive');

    return user;
  }
}
