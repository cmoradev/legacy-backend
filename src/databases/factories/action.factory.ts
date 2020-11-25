import { define } from 'typeorm-seeding';
import { Action } from '../../school-colegio-ingles/actions/entities/action.entity';
import Faker from 'faker';

define(Action, (faker: typeof Faker) => {
  const action = new Action();
  action.name = faker.name.jobTitle();
  return action;
});
