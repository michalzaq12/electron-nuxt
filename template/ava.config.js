{{#e2e}}
import e2e from './test/e2e/ava.config';
{{/e2e}}
{{#unit}}
import unit from './test/unit/ava.config';
{{/unit}}

const TEST_TYPE = process.env.TEST_TYPE;

export default TEST_TYPE === 'e2e' ? e2e : unit;
