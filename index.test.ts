import { registerRootComponent } from 'expo';
import App from './App';

jest.mock('expo', () => ({
  registerRootComponent: jest.fn(),
}));

describe('Index entry point', () => {
  it('registers root component', () => {
    require('./index');
    expect(registerRootComponent).toHaveBeenCalledWith(App);
  });
});
