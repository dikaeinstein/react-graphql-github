import { withState } from 'recompose';
import Issues from './Issues';
import { ISSUE_STATES } from './constants';

const enhancer = withState(
  'issueState',
  'onChangeIssueState',
  ISSUE_STATES.NONE,
);

export default enhancer(Issues);
