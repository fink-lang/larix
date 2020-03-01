import {curr_loc, next_loc} from '@fink/prattler';


export const get_next_line_indentation = (ctx)=> {
  const curr = curr_loc(ctx);
  const next = next_loc(ctx);

  if (curr.end.line < next.start.line) {
    return next.start.column;
  }

  return 0;
};


export const indentation = ({indent})=> indent[0];


export const pop_indentation = (ctx, ind)=> {
  while (ctx.indent[0] > ind) {
    const [, ...indent] = ctx.indent;
    ctx = {...ctx, indent};
  }
  return ctx;
};


export const push_indentation = (ctx, ind)=> (
  {...ctx, indent: [ind, ...ctx.indent]}
);


export const next_is_unindented = (ctx)=> (
  // TODO: test that next token is aligned with any of the indentations
  next_loc(ctx).start.column < indentation(ctx)
);


export const curr_next_adjecent = (ctx)=> {
  const curr = curr_loc(ctx);
  const next = next_loc(ctx);

  return (
    curr.end.line === next.start.line
    && curr.end.column === next.start.column
  );
};


export const init_indentation = (ctx)=> ({
  ...ctx,
  indent: [1]
});
