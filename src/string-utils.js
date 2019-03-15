import {curr_loc, next_loc} from '@fink/prattler';


export const unindent_text = (text, ind)=> (
  text
    .split(/\n/g)
    .slice(ind === 0 ? 0 : 1)
    .map((line)=> line.slice(ind))
    .join('\n')
);


export const strip_block = (strings, ...parts)=> {
  const [, ...lines] = String.raw({raw: strings}, ...parts).split('\n');
  const ind = lines[0].search(/[^ ]/);
  const str = lines.map((lne)=> lne.slice(ind)).join('\n');
  return str;
};

