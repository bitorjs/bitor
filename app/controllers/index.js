import D from '../../react-inject/decorators';

import Demo from '../view/demo';

@D.namespace('/')
export default class {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/')
  index() {
    this.ctx.render(Demo)
  }
}