import { createPage } from "@ekino/rendr-rendering-nextjs";
import { createAggregatorLoader } from "@ekino/rendr-aggregator";
import { createApiLoader, createChainedLoader } from "@ekino/rendr-loader";
import { RequestCtx, BlockDefinition } from "@ekino/rendr-core";

import dynamic from "next/dynamic";

import RendrTemplate from "../templates/RendrTemplate";

// Configure components used on pages. A component is a standard React component.
const components = {
  "article.list": dynamic(() => import("../components/NestedBlocks")),
  "article.view": dynamic(() => import("../components/NestedBlocks")),
  "rendr.text": dynamic(() => import("../components/RendrText")),
  "rendr.footer": dynamic(() => import("../components/RendrFooter")),
  "rendr.header": dynamic(() => import("../components/RendrHeader"))
};

// Configure the template available for the page. A template is a standard React component.
const templates = {
  // rendr: dynamic(() => import("../templates/RendrTemplate"))
  rendr: RendrTemplate,
  default: RendrTemplate
};

// optional handlers, only use this if you need to add information into block
// ie: handlers aggregate values and set them into a block.
//  => Aggregation at the view level is not that good but can be useful in some cases.
const handlers = {
  "rendr.agencies": (block: BlockDefinition, ctx: RequestCtx) =>
    Promise.resolve(block)
};

// initialize related code required to make the page works.
const apiLoader = createApiLoader("http://localhost:3000/api");
const pageAggregator = createAggregatorLoader(handlers);

const loader = createChainedLoader([apiLoader, pageAggregator]);

export default createPage(components, templates, loader);
