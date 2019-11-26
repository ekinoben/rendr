// Core modules
import { createContext, Page } from '@ekino/rendr-core';
import { createApiLoader, createChainedLoader } from '@ekino/rendr-loader';
import {
  createBlockRegistry,
  createTemplateRegistry,
  ComponentList,
  createBlockRenderer,
  createContainerRenderer,
} from '@ekino/rendr-template-react';

import config from './config';

// Components.
import {Footer, Header, Jumbotron, TextBlock} from './components';

// Navigation
import {pushWrapperScreen} from './navigation';

// Screens.
import {DefaultScreen} from './screens';


const loader = createChainedLoader([
  createApiLoader(config.base),
]);

export const blocks = {
  'rendr.header': Header,
  'rendr.text': TextBlock,
  'rendr.footer': Footer,
  'rendr.jumbotron': Jumbotron,
};

export const templates = {
  default: DefaultScreen,
  rendr: DefaultScreen,
};

export const createPage = (blocks: ComponentList, templates: ComponentList) => {
  const blockRegistry = createBlockRegistry(blocks);
  const templateRegistry = createTemplateRegistry(templates);
  const blockRenderer = createBlockRenderer(blockRegistry);
  const containerRenderer = createContainerRenderer(blockRenderer);

  return { templateRegistry, containerRenderer };
}

export const navigate = async (url) => {
    const ctx = createContext({url: url});
    const page = await loader(ctx, new Page(), () => null);

    pushWrapperScreen(page);

    return page;
};

