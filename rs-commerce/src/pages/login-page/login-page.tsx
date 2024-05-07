import LoginPageForm from 'components/login-page-form/login-page-form';
import './login-page.css';

export default function LoginPage(): JSX.Element {
  return (
    <div className="login-page">
      <div className="login-page_wrapper">
        <LoginPageForm />
        <div className="login-page_image" />
      </div>
    </div>
  );
}
