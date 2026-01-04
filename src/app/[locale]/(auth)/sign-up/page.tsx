import AuthClientWrapper from '../auth-client-wrapper';
import { withContentStyles } from '@/shared/UI';

const AuthClientPage = withContentStyles(AuthClientWrapper);

export default function SignUpPage() {
  return <AuthClientPage />;
}
