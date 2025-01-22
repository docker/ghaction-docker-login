import * as actionsToolkit from '@docker/actions-toolkit';

import * as context from './context';
import * as docker from './docker';
import * as stateHelper from './state-helper';

export async function main(): Promise<void> {
  const input: context.Inputs = context.getInputs();
  stateHelper.setRegistry(input.registry);
  stateHelper.setLogout(input.logout);
  await docker.login(input.registry, input.username, input.password, input.ecr, input.attempts);
}

async function post(): Promise<void> {
  if (!stateHelper.logout) {
    return;
  }
  await docker.logout(stateHelper.registry);
}

actionsToolkit.run(main, post);
