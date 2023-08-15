import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User, UserSchema } from '../../model/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';


describe('UserService', () => {
  let userService: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const key = 'testKey1';
    const user = await userService.createUser(key);
    expect(user).toBeDefined();
    expect(user.key).toBeDefined();
    expect(user.key).toEqual(key);
  });

  it('should retrieve a user', async () => {
    const key = 'testKey2';
    const user = await userService.createUser(key);
    const retrievedUser = await userService.retrieveUser(user.key);
    expect(retrievedUser).toBeDefined();
    expect(retrievedUser.key).toEqual(user.key);
  });
  
  afterAll(async () => {
    await module.close();
  });
});

