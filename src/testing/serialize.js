
const str_type_op = ({type, op, loc: {start, end}})=> (
  op && op !== type
    ? `${type} ${op} (${start.line}:${start.column}-${end.line}:${end.column})`
    : `${type} (${start.line}:${start.column}-${end.line}:${end.column})`
);


const serialize_block = (node, serialize, indent)=> {
  const head = str_type_op(node);

  if (node.args) {
    const args = node.args.map((expr)=> serialize(expr, `${indent}  `));
    const exprs = node.exprs.map((expr)=> serialize(expr, `${indent}  `));
    const arg_str = `${args.join('\n')}\n`;

    return (
      `${indent}${head}\n${arg_str}${indent}  :\n${exprs.join('\n')}`
    );
  }

  const exprs = node.exprs.map((expr)=> serialize(expr, `${indent}  `));
  return `${indent}${head}\n${exprs.join('\n')}`;
};


const serialize_call = (node, serialize, indent)=> {
  const head = str_type_op(node);

  const callee = serialize(node.callee, `${indent}  `);
  const args = node.args.map((expr)=> serialize(expr, `${indent}  `));
  const arg_str = args.length ? `${args.join('\n')}\n` : '';

  return (
    `${indent}${head}\n${callee}\n${arg_str}`
  );
};


const serialize_infix = (node, serialize, indent)=> {
  const head = str_type_op(node);

  if (node.left && node.right) {
    const left = serialize(node.left, `${indent}  `);
    const right = serialize(node.right, `${indent}  `);

    return `${indent}${head}\n${left}\n${right}`;

  } else /* istanbul ignore else */ if (node.key && node.value) {
    const left = serialize(node.key, `${indent}  `);
    const right = serialize(node.value, `${indent}  `);

    return `${indent}${head}\n${left}\n${right}`;
  }
};


const serialize_prefix = (node, serialize, indent)=> {
  const head = str_type_op(node);
  const right = serialize(node.right, `${indent}  `);
  return `${indent}${head}\n${right}`;
};


const serialize_str = (node, serialize, indent)=> {
  const head = str_type_op(node);
  const tag = node.tag ? ` ${node.tag.value}` : '';

  const [lne, ...lns] = node.parts.join('').split('\n');
  const str = [lne, ...lns.map((ln)=> `${indent}  ${ln}`)].join('\n');

  return `${indent}${head}\n${indent}  ${tag}\`${str}\``;
};


const serialize_regex = (node, serialize, indent)=> {
  const head = str_type_op(node);
  return `${indent}${head}\n${indent}  /${node.pattern}/${node.flags}`;
};


const serialize_other = (node, serialize, indent)=> {
  const head = str_type_op(node);
  return `${indent}${head} ${node.value}`;
};


// eslint-disable-next-line max-statements
const serialize_jsx = (node, serialize, indent)=> {
  const head = str_type_op(node);

  if (node.type === 'jsx-elem') {
    const props = node.props.map((expr)=> serialize(expr, `${indent}  `));
    const children = node.children.map((expr)=> serialize(expr, `${indent}  `));

    const props_str = props.length ? `\n${props.join('\n')}` : '';
    const children_str = children.length
      ? `\n${indent}  :\n${children.join('\n')}`
      : '';

    return `${indent}${head} ${node.name}${props_str}${children_str}`;

  } else if (node.type === 'jsx-attr') {
    const value = serialize(node.value, `${indent}  `);
    return `${indent}${head} ${node.name}\n${indent}  ${value}`;

  } else if (node.type === 'jsx-text') {
    return `${indent}${head}\n${indent}  ${JSON.stringify(node.value)}`;

  } else if (node.type === 'jsx-string') {
    return `${indent}${head}\n${indent}  '${node.value}'`;

  } else /* istanbul ignore else */ if (node.type === 'jsx-expr-container') {
    const expr = serialize(node.expr, `${indent}  `);
    return `${indent}${head}\n${expr}`;
  }

  /* istanbul ignore next */
  throw new Error(node);
};

// eslint-disable-next-line complexity, max-statements
export const serialize = (node, indent='')=> {
  if (node === null) {
    return null;
  }

  const head = str_type_op(node);

  if (node.type.startsWith('jsx-')) {
    return serialize_jsx(node, serialize, indent);

  } if (node.type === 'regex') {
    return serialize_regex(node, serialize, indent);

  } else if ((node.left && node.right) || (node.key && node.value)) {
    return serialize_infix(node, serialize, indent);

  } else if (node.right) {
    return serialize_prefix(node, serialize, indent);

  } else if (node.exprs) {
    return serialize_block(node, serialize, indent);

  } else if (node.value) {
    return serialize_other(node, serialize, indent);

  } else if (node.parts) {
    return serialize_str(node, serialize, indent);

  } else /* istanbul ignore else */ if (node.callee) {
    return serialize_call(node, serialize, indent);

  }

  /* istanbul ignore next */
  throw new Error(`cannot serialize ${head}`);
};

