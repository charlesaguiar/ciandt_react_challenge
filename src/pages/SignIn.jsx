import SignInForm from 'components/SignInForm';
import SignInHeader from 'components/SignInHeader';

export default function SignIn() {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-16 px-4 md:gap-36">
			<SignInHeader />
			<SignInForm />
		</div>
	);
}
