import AvatarImg from 'assets/avatar.png';

export default function Avatar() {
	return (
		<img
			className="border shadow-lg border-gray-300 rounded-full object-cover object-center w-[60px] h-[60px] cursor-pointer"
			src={AvatarImg}
			alt="user-avatar"
		/>
	);
}
