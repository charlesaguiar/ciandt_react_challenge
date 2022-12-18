import { useRef, useState } from 'react';
import { useAuthContext } from 'contexts/AuthContext';
import Button from 'components/Button';
import Input from 'components/Input';

export default function SignInForm() {
	const { signIn } = useAuthContext();
	const trainerRef = useRef('');

	const [error, setError] = useState();

	const onSubmit = (e) => {
		e.preventDefault();

		if (!trainerRef.current?.value) {
			setError('Trainer name must be provided.');
			return;
		}

		signIn(trainerRef.current.value);
	};

	return (
		<form
			className="flex flex-col gap-8 min-w-[300px] max-w-[500px] md:min-w-[400px]"
			onSubmit={onSubmit}
		>
			<div>
				<h1 className="text-4xl font-bold mb-2">Welcome, trainer!</h1>
				<h3 className="text-sm">Are you ready to catch&#39;em all?</h3>
			</div>

			<Input
				id="trainer-name"
				label="Your name"
				placeholder="Trainer name"
				ref={trainerRef}
				error={error}
			/>
			<Button type="submit">Start collecting pokemóns!</Button>
		</form>
	);
}
