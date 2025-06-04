import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { Test } from '@nestjs/testing';

const mockGroceryService = {
  findAll: jest.fn().mockResolvedValue([]),
};

describe('GroceryController', () => {
  let controller: GroceryController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [GroceryController],
      providers: [
        { provide: GroceryService, useValue: mockGroceryService },
        AuthGuard,
      ],
    }).compile();

    controller = module.get<GroceryController>(GroceryController);
  });

  it('should return an array of groceries', async () => {
    const groceries = await controller.findAll();
    expect(groceries).toEqual([]);
  });
});
