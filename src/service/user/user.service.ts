import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../model/schema/user.schema';
import { CreateUserDto } from '../../model/dto/user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactDto } from '../../model/dto/contact-dto';

@Injectable()
export class UserService {
  private key = 'key';

  constructor(@InjectModel(User.name) private readonly userModel:Model<User>) {}

  async retrieveUser(key:string): Promise<User | undefined> {
    try {
      if (key) {
        const user = await this.userModel.findOne({key:key}).exec();
        return user;
      }
    } catch (error) {
      console.error(`Error retrieving user: ${error}`);
    }
    return undefined;
  }

  async createUserIfDontExist(session) {
    if(!session.userId){
      const newKey = uuidv4();
      session.userId = newKey;
      this.createUser(newKey);
    } 
  }

  async createUser(key:string) {
    const user: CreateUserDto = {
      key: key,
      logged: new Date().toISOString(),
      contacts: [],
    };
    return await this.userModel.create(user);
  }

  async saveUserContact(contact:ContactDto, session) {
    try {
      let user = await this.userModel.findOne({ key: session.userId }).exec();
      if (!user) {
        user = await this.createUser(uuidv4() + "_cookie_less");
      }
      user.contacts.push(contact);
      await user.save();
    } catch (error) {
      console.error(`Error saving user contact: ${error}`);
    }
  }  
}

